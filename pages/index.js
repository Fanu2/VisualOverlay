import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [overlayImage, setOverlayImage] = useState(null);
  const [opacity, setOpacity] = useState(1);
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(20);
  const [fontColor, setFontColor] = useState('#000');

  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackgroundImage(URL.createObjectURL(file));
    }
  };

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
        <input type="file" accept="image/*" onChange={handleBackgroundChange} />
        <input type="file" accept="image/*" onChange={handleOverlayChange} />
        <input type="range" min="0" max="1" step="0.1" value={opacity} onChange={(e) => setOpacity(e.target.value)} />
        <input type="text" placeholder="Text" value={text} onChange={(e) => setText(e.target.value)} />
        <input type="number" min="10" max="100" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />
        <input type="color" value={fontColor} onChange={(e) => setFontColor(e.target.value)} />
      </div>
      <div className={styles.canvas} style={{ backgroundImage: `url(${backgroundImage})`, opacity }}>
        {overlayImage && (
          <Rnd
            bounds="parent"
            default={{
              x: 0,
              y: 0,
              width: 100,
              height: 100,
            }}
          >
            <img src={overlayImage} alt="Overlay" className={styles.overlayImage} />
          </Rnd>
        )}
        {text && (
          <div className={styles.textOverlay} style={{ fontSize: `${fontSize}px`, color: fontColor }}>
            {text}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
