import React, { useState, useRef } from 'react';
import '../styles/Theme.css';
import { ChromePicker } from 'react-color';
import { FigureIcon, BasicIcon, ImageIcon, TextIcon } from '../icons/MenuIcon';

const Theme = () => {
    const [frameColor, setFrameColor] = useState('#ffffff');
    // 색상 선택기 표시 여부
    const [showColorPicker, setShowColorPicker] = useState(false);
    // 색상 선택기 박스(상단바) 표시 여부
    const [showColorPickerBox, setShowColorPickerBox] = useState(false);

    // 여러 사각형의 id, 색상, 위치, 크기 정보를 가지는 배열
    const [rectangles, setRectangles] = useState([]);
    // 사용자가 선택한 도형의 id
    const [selectedFigureId, setSelectedFigureId] = useState(-1);

    // 프레임의 참조
    const frameRef = useRef(null);
    // 색상 선택기의 참조
    const ChromePickerRef = useRef(null);

    // 도형 아이콘을 클릭하면 실행하는 함수
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

    // 영역 밖을 클릭하면 실행하는 함수
    const handleContainerClick = (e) => {
        if (e.target.classList.contains('container')) {
            frameRef.current.style.border = 'none';
            setShowColorPickerBox(false);
            setShowColorPicker(false);
            setSelectedFigureId(-1);
        }
    };

    // 영역 안(프레임)을 클릭하면 실행하는 함수
    const handleFrameClick = (e) => {
        if (e.target.classList.contains('frame')) {
            frameRef.current.style.border = '3px solid #FF9900';
            setShowColorPickerBox(true);
            setSelectedFigureId(-1);
        }
    };

    // 색상을 변경하는 함수
    const handleColorChange = (color) => {
        setFrameColor(color.hex);
    };

    // 색상 변경 아이콘을 클릭하면 실행하는 함수
    const handleColorPickerIconClick = () => {
        setShowColorPicker(!showColorPicker);
    };

    return (


        
        <div className='container' onClick={handleContainerClick}>

            {/* showColorPickerBox가 true이면 ColorPickerBox(상단바)를 보여줍니다. */}
            {showColorPickerBox &&
            <div className='color-picker-box'>
                <img onClick={handleColorPickerIconClick} alt='색상 선택' src='/color-picker.png' className="color-picker-icon" />
                {/* showColorPicker가 true이면 ColorPicker(색상선택기)를 보여줍니다. */}
                {showColorPicker &&
                <ChromePicker
                    ref={ChromePickerRef}
                    color={frameColor}
                    onChange={handleColorChange}
                />}
            </div>}
            {/* 왼쪽 메뉴바 */}
            <div className='left-menubar'>
                <div className='menu-icon'>
                    <FigureIcon />
                </div>
                <div className='menu-icon'>
                    <BasicIcon />
                </div>
                <div className='menu-icon'>
                    <ImageIcon />
                </div>
                <div className='menu-icon'>
                    <TextIcon />
                </div>
            </div>
            {/* 도형 아이콘 클릭 시 노출되는 Drawer, 추후 열고 닫는 기능 구현 필요 */}
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
            {/* 사용자가 생성한 사각형을 모두 화면에 생성 */}
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
                />
            ))}
            </div>
        </div>
    );
}

export default Theme;