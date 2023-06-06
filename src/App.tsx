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
