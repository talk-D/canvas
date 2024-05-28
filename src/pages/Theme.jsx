import React, { useState, useRef } from 'react';
import '../styles/Theme.css';
import { ChromePicker } from 'react-color';
import { FigureIcon, BasicIcon, ImageIcon, TextIcon } from '../icons/MenuIcon';
import TextEditor from './TextEditor';
import ImageUploader from './ImageUploader';

const Theme = () => {
  const [frameColor, setFrameColor] = useState('#ffffff');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showColorPickerBox, setShowColorPickerBox] = useState(false);
  const [rectangles, setRectangles] = useState([]);
  const [texts, setTexts] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedFigureId, setSelectedFigureId] = useState(-1);
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [draggingText, setDraggingText] = useState(null);
  const [draggingImage, setDraggingImage] = useState(null);
  const [resizingImage, setResizingImage] = useState(null);

  const frameRef = useRef(null);
  const ChromePickerRef = useRef(null);

  const handleRectangleIconClick = () => {
    const newRectangle = {
      id: rectangles.length,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      top: 0,
      left: 0,
      width: 150,
      height: 150,
    };
    setRectangles([...rectangles, newRectangle]);
  };

  const handleContainerClick = (e) => {
    if (e.target.classList.contains('container')) {
      if (frameRef.current) {
        frameRef.current.style.border = 'none';
      }
      setShowColorPickerBox(false);
      setShowColorPicker(false);
      setSelectedFigureId(-1);
    }
  };

  const handleFrameClick = (e) => {
    if (e.target.classList.contains('frame')) {
      if (frameRef.current) {
        frameRef.current.style.border = '3px solid #FF9900';
      }
      setShowColorPickerBox(true);
      setSelectedFigureId(-1);
    }
  };

  const handleColorChange = (color) => {
    setFrameColor(color.hex);
  };

  const handleColorPickerIconClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleTextIconClick = () => {
    setShowTextEditor(!showTextEditor);
  };

  const handleImageIconClick = () => {
    setShowImageUploader(!showImageUploader);
  };

  const handleSaveText = (text) => {
    const newText = {
      id: texts.length,
      content: text,
      top: 50,
      left: 50,
    };
    setTexts([...texts, newText]);
    setShowTextEditor(false);
  };

  const handleMouseDown = (e, id, type) => {
    if (type === 'text') {
      setDraggingText(id);
    } else if (type === 'image') {
      setDraggingImage(id);
    }
  };

  const handleMouseMove = (e) => {
    if (draggingText !== null) {
      const updatedTexts = texts.map((text) => {
        if (text.id === draggingText) {
          return {
            ...text,
            top: e.clientY - frameRef.current.getBoundingClientRect().top,
            left: e.clientX - frameRef.current.getBoundingClientRect().left,
          };
        }
        return text;
      });
      setTexts(updatedTexts);
    } else if (draggingImage !== null) {
      const updatedImages = images.map((image) => {
        if (image.id === draggingImage) {
          return {
            ...image,
            top: e.clientY - frameRef.current.getBoundingClientRect().top,
            left: e.clientX - frameRef.current.getBoundingClientRect().left,
          };
        }
        return image;
      });
      setImages(updatedImages);
    } else if (resizingImage !== null) {
      const updatedImages = images.map((image) => {
        if (image.id === resizingImage) {
          return {
            ...image,
            width: Math.max(50, e.clientX - frameRef.current.getBoundingClientRect().left - image.left),
            height: Math.max(50, e.clientY - frameRef.current.getBoundingClientRect().top - image.top),
          };
        }
        return image;
      });
      setImages(updatedImages);
    }
  };

  const handleMouseUp = () => {
    setDraggingText(null);
    setDraggingImage(null);
    setResizingImage(null);
  };

  const handleImageClick = (image) => {
    const newImage = {
      id: images.length,
      src: image,
      top: 50,
      left: 50,
      width: 100,
      height: 100,
    };
    setImages([...images, newImage]);
  };

  const handleResizeMouseDown = (e, id) => {
    e.stopPropagation();
    setResizingImage(id);
  };

  return (
    <div className='container' onClick={handleContainerClick} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      {showColorPickerBox &&
        <div className='color-picker-box'>
          <img onClick={handleColorPickerIconClick} alt='색상 선택' src='/color-picker.png' className="color-picker-icon" />
          {showColorPicker &&
            <ChromePicker
              ref={ChromePickerRef}
              color={frameColor}
              onChange={handleColorChange}
            />}
        </div>}
      <div className='left-menubar'>
        <div className='menu-icon' onClick={handleRectangleIconClick}>
          <FigureIcon />
        </div>
        <div className='menu-icon'>
          <BasicIcon />
        </div>
        <div className='menu-icon' onClick={handleImageIconClick}>
          <ImageIcon />
        </div>
        <div className='menu-icon' onClick={handleTextIconClick}>
          <TextIcon />
        </div>
      </div>
      <div className='left-drawer'>
        {showTextEditor ? (
          <TextEditor onSave={handleSaveText} />
        ) : showImageUploader ? (
          <ImageUploader onImageClick={handleImageClick} />
        ) : (
          <>
            <div onClick={handleRectangleIconClick} className='drawer-icon'>
              Rectangle
            </div>
            <div className='drawer-icon'>
              Ellipse
            </div>
            <div className='drawer-icon'>
              Polygon
            </div>
            <div className='drawer-icon'>
              Star
            </div>
          </>
        )}
      </div>
      <div
        ref={frameRef}
        onClick={handleFrameClick}
        className='frame'
        style={{ backgroundColor: frameColor }}
      >
        {rectangles.map((rectangle) => (
          <div
            className='rectangle'
            key={rectangle.id}
            style={{
              position: 'absolute',
              zIndex: rectangle.id,
              top: `${rectangle.top}px`,
              left: `${rectangle.left}px`,
              width: `${rectangle.width}px`,
              height: `${rectangle.height}px`,
              backgroundColor: rectangle.color,
              border: selectedFigureId === rectangle.id ? '3px solid #FF9900' : 'none',
            }}
          />
        ))}
        {texts.map((text) => (
          <div
            key={text.id}
            onMouseDown={(e) => handleMouseDown(e, text.id, 'text')}
            style={{
              position: 'absolute',
              top: `${text.top}px`,
              left: `${text.left}px`,
              cursor: 'move',
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: text.content }} />
          </div>
        ))}
        {images.map((image) => (
          <div
            key={image.id}
            style={{
              position: 'absolute',
              top: `${image.top}px`,
              left: `${image.left}px`,
              width: `${image.width}px`,
              height: `${image.height}px`,
              cursor: 'move',
              border: '1px solid #ccc',
            }}
            onMouseDown={(e) => handleMouseDown(e, image.id, 'image')}
          >
            <img src={image.src} alt={`uploaded-${image.id}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '10px',
                height: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                cursor: 'nwse-resize',
              }}
              onMouseDown={(e) => handleResizeMouseDown(e, image.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Theme;
