"use client";

import React, { useRef, useState } from "react";
import styles from "./image-picker.module.css";
import Image from "next/image";

const ImagePicker = ({ label, name }) => {
  const [pickedImage, setPickedImage] = useState(null);
  const imagePicker = useRef();

  const handlePickClick = () => {
    imagePicker.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className={styles.picker}>
      <label htmlFor="image">{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {!pickedImage && <p>No image picked yet!</p>}
          {pickedImage && <Image src={pickedImage} alt="user picked" fill />}
        </div>
        <input
          className={styles.input}
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          name={name}
          onChange={handleImageChange}
          ref={imagePicker}
          required
        />
        <button
          className={styles.button}
          type="button"
          onClick={handlePickClick}
        >
          Image Picker
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
