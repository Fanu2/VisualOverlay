import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import Image from 'next/image'; // Importing the Next.js Image component
import styles from '../styles/Home.module.css';

const Home = () => {
  // State management for the component
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [overlayImages, setOverlayImages] = useState([]); // Allow multiple overlay images
  const [opacity, setOpacity] = useState(1);
  const [textInstances, setTextInstances] = useState([]); // Array to hold multiple text instances
  const [inputText, setInputText] = useState(''); // State for the text input
  const [fontColor, setFontColor] = useState('#000');
  const [fontSize, setFontSize] = useState(20);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);

  // Handler to set the background image
  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackgroundImage(URL.createObjectURL(file));
    }
  };

  // Handler to set overlay images
  const handleOverlayChange = (e) => {
    const files = Array.from(e.target.files);
    const newOverlayImages = files.map((file) => URL.createObjectURL(file));
    setOverlayImages((prevImages) => [...prevImages, ...newOverlayImages]);
  };

  // Function to add a new text instance
  const addTextInstance = () => {
    if (inputText.trim() === '') return; // Prevent adding empty text
    const newTextInstance = {
      id: Date.now(),
      text: inputText,
      position: { x: 0, y: 0 },
      fontSize: fontSize,
      isBold,
      isItalic,
      isUnderlined,
    };
    setTextInstances((prevInstances) => [...prevInstances, newTextInstance]);
    setInputText(''); // Clear the input field after adding text
  };

  // Function to reset the canvas
  const resetCanvas = () => {
    setBackgroundImage(null);
    setOverlayImages([]);
    setOpacity(1);
    setTextInstances([]);
    setInputText('');
    setFontColor('#000');
    setFontSize(20);
    setIsBold(false);
    setIsItalic(false);
    setIsUnderlined(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Image Overlay Tool</h1>
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
          multiple // Allow multiple overlay images
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

        <select
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
          className={styles.numberInput}
        >
          <option value={20}>20</option>
          <option value={25}>25</option>
          <option value={30}>30</option>
          <option value={35}>35</option>
          <option value={40}>40</option>
          <option value={45}>45</option>
          <option value={50}>50</option>
          <option value={55}>55</option>
          <option value={60}>60</option>
          <option value={65}>65</option>
          <option value={70}>70</option>
          <option value={75}>75</option>
          <option value={80}>80</option>
          <option value={85}>85</option>
          <option value={90}>90</option>
          <option value={95}>95</option>
          <option value={100}>100</option>
        </select>

        <input
          type="color"
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
          className={styles.colorInput}
        />

        <label>
          <input
            type="checkbox"
            checked={isBold}
            onChange={() => setIsBold(!isBold)}
          />
          Bold
        </label>
        <label>
          <input
            type="checkbox"
            checked={isItalic}
            onChange={() => setIsItalic(!isItalic)}
          />
          Italic
        </label>
        <label>
          <input
            type="checkbox"
            checked={isUnderlined}
            onChange={() => setIsUnderlined(!isUnderlined)}
          />
          Underline
        </label>

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your text here"
          className={styles.textInput} // Add custom styles if needed
        />

        <button onClick={addTextInstance} className={styles.addTextButton}>
          Add Text
        </button>

        <button onClick={resetCanvas} className={styles.resetButton}>
          Reset
        </button>
      </div>

      <div
        className={styles.canvas}
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          opacity,
        }}
      >
        {overlayImages.map((overlayImage, index) => (
          <Rnd
            key={index}
            bounds="parent"
            default={{
              x: 0,
              y: 0,
              width: 500,
              height: 500,
            }}
            enableResizing={true} // Enable resizing for overlay image
          >
            <Image
              src={overlayImage}
              alt={`Overlay ${index + 1}`}
              layout="fill" // Fill the bounds of the Rnd component
              objectFit="contain" // Ensures the overlay image fits within the Rnd bounds
              className={styles.overlayImage}
            />
          </Rnd>
        ))}

        {textInstances.map((instance) => (
          <Rnd
            key={instance.id}
            bounds="parent"
            defaultPosition={instance.position}
            onDragStop={(e, d) =>
              setTextInstances((prevInstances) =>
                prevInstances.map((text) =>
                  text.id === instance.id ? { ...text, position: { x: d.x, y: d.y } } : text
                )
              )
            }
            enableResizing={false}
          >
            <div
              className={styles.textOverlay}
              style={{
                fontSize: `${instance.fontSize}px`,
                color: fontColor,
                fontWeight: instance.isBold ? 'bold' : 'normal',
                fontStyle: instance.isItalic ? 'italic' : 'normal',
                textDecoration: instance.isUnderlined ? 'underline' : 'none',
                cursor: 'move',
                userSelect: 'none',
              }}
            >
              {instance.text}
            </div>
          </Rnd>
        ))}
      </div>
    </div>
  );
};

export default Home;
