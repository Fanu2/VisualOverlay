import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import Image from 'next/image'; // Importing the Next.js Image component
import styles from '../styles/Home.module.css';

const Home = () => {
  // State management for the component
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [overlayImage, setOverlayImage] = useState(null);
  const [opacity, setOpacity] = useState(1);
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(20);
  const [fontColor, setFontColor] = useState('#000');

  // Handler to set the background image
  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackgroundImage(URL.createObjectURL(file));
    }
  };

  // Handler to set the overlay image
  const handleOverlayChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOverlayImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className={styles.container}>
      <h1>Image Overlay Tool</h1>
      <div className={styles.controls}>
        <input
          type="file"
          accept="image/*"
          onChange={handleBackgroundChange}
          className={styles.fileInput}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleOverlayChange}
          className={styles.fileInput}
        />
        
        <label>
          Background Opacity:
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={opacity}
            onChange={(e) => setOpacity(e.target.value)}
            className={styles.rangeInput}
          />
        </label>

        <input
          type="text"
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={styles.textInput}
        />

        <label>
          Font Size:
          <input
            type="number"
            min="10"
            max="100"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className={styles.numberInput}
          />
        </label>

        <input
          type="color"
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
          className={styles.colorInput}
        />
      </div>

      <div
        className={styles.canvas}
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          opacity,
        }}
      >
        {overlayImage && (
          <Rnd
            bounds="parent"
            default={{
              x: 0,
              y: 0,
              width: 500,
              height: 500,
            }}
          >
            <Image
              src={overlayImage}
              alt="Overlay"
              layout="fill" // Fill the bounds of the Rnd component
              objectFit="contain" // Ensures the overlay image fits within the Rnd bounds
              className={styles.overlayImage}
            />
          </Rnd>
        )}
        {text && (
          <div
            className={styles.textOverlay}
            style={{
              fontSize: `${fontSize}px`,
              color: fontColor,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {text}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
