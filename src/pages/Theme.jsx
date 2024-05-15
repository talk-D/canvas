import React, { useEffect, useState, useRef } from 'react';
import '../styles/Theme.css';
import { ChromePicker } from 'react-color';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { FigureIcon, BasicIcon, StorageIcon, TextIcon } from '../icons/MenuIcon';

const Theme = () => {
    const [frameColor, setFrameColor] = useState('#ffffff');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showColorPickerBox, setShowColorPickerBox] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const [rectangles, setRectangles] = useState([]);
    const [selectedFigureId, setSelectedFigureId] = useState(-1);

    const frameRef = useRef(null);
    const ChromePickerRef = useRef(null);

    const downloadFrame = () => {
        domtoimage
            .toSvg(document.querySelector('.frame'))
            .then((blob) => {
            saveAs(blob, 'mytheme.svg');
        });
    };

    const handleRectangleIconClick = () => {
        const newRectangle = {
            id: rectangles.length,
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
            top: 0,
            left: 0,
            width: 150,
            height: 150,
        };
      
        setRectangles([...rectangles, newRectangle]);
    };

    const handleRectangleMouseDown = (id) => {
        setSelectedFigureId(id);
        setIsDragging(true);
    };

    const handleContainerClick = (e) => {
        if (e.target.classList.contains('container')) {
            frameRef.current.style.border = 'none';
            setShowColorPickerBox(false);
            setShowColorPicker(false);
            setSelectedFigureId(-1);
        }
    };

    const handleFrameClick = (e) => {
        if (e.target.classList.contains('frame')) {
            frameRef.current.style.border = '3px solid #FF9900';
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

    const moveFigure = (e) => {
        if (!isDragging || selectedFigureId === null) return;
        
        const newRectangles = rectangles.map((rectangle) => {
            if (rectangle.id === selectedFigureId) {
                console.log('x', e.clientX);
                console.log('y', e.clientY);
                console.log(rectangle);
                return {
                  ...rectangle,
                  left: e.clientX - rectangle.width / 2,
                  top: e.clientY - rectangle.height / 2,
                };
            } else {
                return rectangle;
            }
        });

        setRectangles(newRectangles);
    }

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      moveFigure(e);
    };
  
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
      
        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
        };

    }, [isDragging, selectedFigureId, rectangles, handleMouseMove]);
      

    return (
        <div className='container' onClick={handleContainerClick}>
            {showColorPickerBox &&
            <div className='color-picker-box'>
                <img onClick={handleColorPickerIconClick} alt='색상 선택' src='color-picker.png' className="color-picker-icon" />
                {showColorPicker &&
                <ChromePicker
                    ref={ChromePickerRef}
                    color={frameColor}
                    onChange={handleColorChange}
                />}
            </div>}
            <div className='left-menubar'>
                <div className='menu-icon'>
                    <FigureIcon />
                </div>
                <div className='menu-icon'>
                    <BasicIcon />
                </div>
                <div className='menu-icon'>
                    <TextIcon />
                </div>
                <div className='menu-icon'>
                    <StorageIcon />
                </div>
            </div>
            <div className='left-drawer'>
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
            </div>
            <div ref={frameRef} onClick={handleFrameClick} className='frame' style={{ backgroundColor: frameColor }}>
            {rectangles.map((rectangle) => (
                <div
                    className='rectangle'
                    key={rectangle.id}
                    style={{
                        position: 'absolute',
                        zIndex: rectangle.id,
                        top: `0px`,
                        left: `0px`,
                        width: `${rectangle.width}px`,
                        height: `${rectangle.height}px`,
                        backgroundColor: rectangle.color,
                        border: selectedFigureId === rectangle.id ? '3px solid #FF9900' : 'none',
                    }}
                    onMouseDown={() => handleRectangleMouseDown(rectangle.id)}
                />
            ))}
            </div>
        </div>
    );
}

export default Theme;