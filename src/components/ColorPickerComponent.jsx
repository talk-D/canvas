// src/components/ColorPickerComponent.js
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import '../styles/Theme.css'

const ColorPickerComponent = ({ currentColor, currentColor2, onColorChange,onColorChange2, bringToFront, deleteSelectedShape, clearShapes }) => {

    const [showCanvasColorPicker, setShowCanvasColorPicker] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
  
    const handleCanvasColorPickerIconClick = ()=>{
        setShowCanvasColorPicker(!showCanvasColorPicker);
    }
    const handleColorPickerIconClick = () => {
        setShowColorPicker(!showColorPicker);
    };

    return (
        <div className='color-picker-container'>
            <div className='color-picker-header'>
            <span>배경 색상</span>
            <img
            onClick={handleCanvasColorPickerIconClick}
            alt='배경 색상 선택'
            src='/color-picker.png'
            className='color-picker-icon'
            />
        </div>
        {showCanvasColorPicker && (
            <div className='color-picker'>
            <SketchPicker
                color={currentColor2}
                onChange={color => onColorChange2(color.hex)}
            />
        </div>
        )}
            
        <div className='color-picker-header'>
            <span>도형 색상</span>
            <img
            onClick={handleColorPickerIconClick}
            alt='도형 색상 선택'
            src='/color-picker.png'
            className='color-picker-icon'
            />
        </div>
        {showColorPicker && (
            <div className='color-picker'>
            <SketchPicker
                color={currentColor}
                onChange={color => onColorChange(color.hex)}
            />
            </div>
        )}
        <button className='drawer-icon-button' onClick={bringToFront}>Layer Top</button>
        <button className='drawer-icon-button' onClick={deleteSelectedShape}>선택 도형 삭제</button>
        <button className='drawer-icon-button' onClick={clearShapes}>캔버스 초기화</button>
        </div>
    );
};
export default ColorPickerComponent;