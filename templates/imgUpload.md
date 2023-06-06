# 이미지 업로드 기능

<br/>
<br/>

## 기능 구현

<a href="#"><img src="https://github.com/eunbaming/weather-app/assets/110072947/228b436f-81d0-4c58-bba4-7f0a05fbee41" style="width: 400px; height: 250px"></a>
<a href="#"><img src="https://github.com/eunbaming/weather-app/assets/110072947/08bcbc88-2916-496c-a888-97c01157cb5e" style="width: 400px; height: 250px"></a>

<br/>

### App.tsx

```typescript
import React, { useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import BlackImg from "./assets/blank-profile-picture.webp";

function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<any>(BlackImg);
  const [imageFile, setImageFile] = useState();

  const onClickImg = () => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  };

  const fileOnload = (event: any) => {
    if (!event.target.files) {
      return;
    }
    if (event.target.files[0]) {
      setImageFile(event.target.files[0]);
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);

      return new Promise<void>((resolve) => {
        reader.onload = () => {
          setImageUrl(reader.result || null);
          resolve();
        };
      });
    }
  };

  return (
    <div>
      <div className="container">
        <img src={imageUrl} onClick={onClickImg} />
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={fileOnload}
        />
      </div>
    </div>
  );
}

export default App;
```

 <br/>

### CSS

```css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.container img {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
}
.container input {
  position: absolute;
  display: none;
}
```
<br/>
<br/>

## CSS | object-fit

대체되는 요소의 내용(img, video, object, svg 태그 등과 같은)이 지정된 너비와 높이에 맞게 장착되는 방식을 지정한다.
<br/>
이는 프로필 이미지나 고정된 크기의 썸네일을 출력하는 다양한 경우처럼 제각각의 크기를 가진 요소를 넘겨받아 비율을 유지한 채로 일정한 크기로 재가공하는 경우에 유용하다고 할 수 있다.
(background-size 속성과 유사)

- contain : 내용이 종횡비를 유지하면서 요소에 정의된 너비와 높이안에서 가능한한 많이 확대(scale up)시킨다.

<br/>
<br/>

## FileReader

기본적으로 FileReader는 File, Blob 객체를 핸들링하는데 사용된다.
<br/>
File, Blob 객체를 사용해 특정 파일을 읽어들여 자바스크립트에서 파일에 접근할 수 있도록 도와주는 도구이다.
기본적으로 EventTarget을 상속받았기에 EventListener를 부착해줄 수 있다.

<br/>
<br/>

### readAsDataURL

readAsDataURL을 통해 파일을 URL로 만들 수 있다. 파일 정보를 주소처럼 사용할 수 있게 된다.

<br/>
<br/>

### onload

FileReader가 성공적으로 파일을 읽어들였을 때 트리거 되는 이벤트 핸들러이다.
이 핸들러 내부에 우리가 원하는 이미지 프리뷰 로직을 넣어주면 된다.

<br/>
<br/>
<br/>
<br/>
<br/>

### 참고, 출처

https://velog.io/@hye_rin/React-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C%ED%95%98%EA%B3%A0-%EB%AF%B8%EB%A6%AC%EB%B3%B4%EA%B8%B0
<br/>
https://webdir.tistory.com/486
<br/>
https://nukw0n-dev.tistory.com/30
