import React, { useRef, useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import { FigureIcon, BasicIcon, ImageIcon, TextIcon } from '../icons/MenuIcon';

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [frameColor, setFrameColor] = useState('#ffffff');//캔버스 바탕색 변수
  const [rectangles, setRectangles] = useState([]); // 도형들을 저장하는 상태
  const [selectedRect, setSelectedRect] = useState(null); // 선택된 도형을 저장하는 상태
  const [keysPressed, setKeysPressed] = useState({}); // 키가 눌린 상태를 저장하는 상태
  const [dragging, setDragging] = useState(false); // 드래그 상태를 저장하는 상태
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 }); // 드래그 오프셋을 저장하는 상태
  const [selectedColor, setSelectedColor] = useState(); // 선택 도형의 컬러 초기화
  const [showColorPicker, setShowColorPicker] = useState(false); // 색상 선택기 표시 여부
  const [showColorPickerBox, setShowColorPickerBox] = useState(false); // 색상 선택기 박스(상단바) 표시 여부
  const [rectWidth, setRectWidth] = useState(50);
  const [rectHeight, setRectHeight] = useState(50);

  // 도형이 변경될 때 마다 다시 그리기
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
    context.fillStyle = frameColor;// 캔버스 배경색을 흰색으로 설정
    context.fillRect(0, 0, canvas.width, canvas.height);

    rectangles.forEach(rect => {
      context.fillStyle = rect.color;
      context.fillRect(rect.x, rect.y, rect.width, rect.height); // 도형 그리기
      
    });
    if (selectedRect) {
      context.strokeStyle = '#FF9900'; // 선택된 도형의 윤곽선 색상
      context.lineWidth = 3;
      context.strokeRect(selectedRect.x, selectedRect.y, selectedRect.width, selectedRect.height); // 선택된 도형의 윤곽선 그리기  
      
    }
  }, [rectangles, selectedRect, frameColor]);

  useEffect(() => {
    if (selectedRect) {
      setRectWidth(selectedRect.width);
      setRectHeight(selectedRect.height);
    }
  }, [selectedRect]);

  const handleChangeComplete = (color) => {
    setFrameColor(color.hex);
  };

  const handleFocus = () => {
    canvasRef.current.style.outline = '3px solid #FF9900';
  };
  const handleBlur = () => {
    canvasRef.current.style.outline = '1px solid #FFBB6D';
  };

  // 사각형 추가하기
  const addRectangle = () => {
    const newRect = {
      id: rectangles.length,
      x: 100,
      y: 100,
      width: 50,
      height: 50,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    };
    setRectangles(prevRectangles => [...prevRectangles, newRect]); // 새로운 도형 추가
  };

  // 캔버스를 클릭했을 때 이벤트
  const handleClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // 클릭된 위치에 있는 도형을 찾습니다.
    const clickedRect = rectangles.find(
      rect => x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height
    );
    if (clickedRect) {
      // 도형을 클릭했을 때는 포커스를 설정하지 않습니다.
      handleBlur();
      setSelectedRect(clickedRect);
    } else {
      setSelectedRect(null);
      // 도형이 아닌 캔버스를 클릭했을 때만 포커스를 설정합니다.
      canvasRef.current.focus();
    }
  };

  //선택된 도형을 맨 위로 올리는 함수
  const bringToFront = () => {
    if (selectedRect) {
      setRectangles(prevRectangles => {
        const otherRectangles = prevRectangles.filter(rect => rect !== selectedRect);
        return [...otherRectangles, selectedRect]; // 선택된 도형을 배열의 끝으로 이동
      });
    }
  };
  
  // 키보드로 선택 도형 움직이기위해 인자값 전달 받아 넘김
  const moveSelectedRect = (dx, dy) => {
    if (selectedRect) {
      const updatedRect = {
        ...selectedRect,
        x: selectedRect.x + dx,
        y: selectedRect.y + dy
      };
      // `selectedRect`의 변경 사항을 `rectangles` 배열에 반영
      const updatedRectangles = rectangles.map(rect => 
        rect === selectedRect ? updatedRect : rect
      );
      setRectangles(updatedRectangles);
      setSelectedRect(updatedRect); // 선택된 도형의 위치 업데이트
    }
  };

  // 도형을 마우스로 눌렀을 때 이벤트. 마우스 드래그로 도형을 이동시키기 위함
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const clickedRect = rectangles.find(
      rect => x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height
    );

    if (clickedRect) {
      setSelectedRect(clickedRect);
      setDragging(true);
      setDragOffset({ x: x - clickedRect.x, y: y - clickedRect.y });
    }
  };

  // 마우스로 도형 옮기기
  const handleMouseMove = (e) => {
    if (dragging && selectedRect) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      moveSelectedRect(x - selectedRect.x - dragOffset.x, y - selectedRect.y - dragOffset.y);
    }
  };
  // 마우스 뗐을 때
  const handleMouseUp = () => {
    setDragging(false);
  };

  // 키보드로 도형 옮기기
  const handleKeyDown = (e) => {
    setKeysPressed(prev => ({ ...prev, [e.key]: true }));

    if (selectedRect) {
      switch (e.key) {
        case 'ArrowUp':
          if(keysPressed['Shift']) {
            resizeSelectedRect(0, -5); // Shift + 화살표 위 => 높이 감소
          } else {
            moveSelectedRect(0, -5); // 위쪽으로 이동
          }
          break;
        case 'ArrowDown':
          if(keysPressed['Shift']) {
            resizeSelectedRect(0, 5); // Shift + 화살표 아래 => 높이 증가
          } else {
            moveSelectedRect(0, 5); // 아래쪽으로 이동
          }
          break;
        case 'ArrowLeft':
          if(keysPressed['Shift']) {
            resizeSelectedRect(-5, 0); // Shift + 화살표 왼쪽 => 너비 감소
          } else {
            moveSelectedRect(-5, 0); // 왼쪽으로 이동
          }
          break;
        case 'ArrowRight':
          if(keysPressed['Shift']) {
            resizeSelectedRect(5, 0); // Shift + 화살표 오른쪽 => 너비 증가
          } else {
            moveSelectedRect(5, 0); // 오른쪽으로 이동
          }
          break;
        default:
          break;
      }
    }
  };

  // 도형의 크기 설정
  const resizeSelectedRect = (dw, dh) => {
    if (selectedRect) {
      const updatedRect = {
        ...selectedRect,
        width: Math.max(10, selectedRect.width + dw), // 최소 너비를 10으로 설정
        height: Math.max(10, selectedRect.height + dh) // 최소 높이를 10으로 설정
      };
      // `selectedRect`의 변경 사항을 `rectangles` 배열에 반영
      const updatedRectangles = rectangles.map(rect => 
        rect === selectedRect ? updatedRect : rect
      );
      setRectangles(updatedRectangles);
      setSelectedRect(updatedRect); // 선택된 도형의 크기 업데이트
    }
  };

  // 키보드 뗐을 때
  const handleKeyUp = (e) => {
    setKeysPressed(prev => ({ ...prev, [e.key]: false }));
  };

  // 클리어 버튼으로 캔버스 청소하기
  const clearRectangles = () => {
    setRectangles([]); // 모든 도형 제거
    setSelectedRect(null); // 선택된 도형 해제
  };
  
  // 선택 도형 컬러 변경
  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    // 선택된 도형의 색상을 업데이트합니다.
    if (selectedRect) {
      const updatedRectangles = rectangles.map(rect => 
        rect.id === selectedRect.id ? { ...rect, color: color.hex } : rect
      );
      setRectangles(updatedRectangles);
      setSelectedRect(prev => ({ ...prev, color: color.hex })); // 선택된 도형의 색상 업데이트
    }
  }
  // 색상 변경 아이콘을 클릭하면 실행하는 함수
  const handleColorPickerIconClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  // 도형 너비 조절
  const handleWidthChange = (event) => {
    const newWidth = event.target.value;
    setRectWidth(newWidth);
    if (selectedRect) {
      const updatedRectangles = rectangles.map(rect => 
        rect === selectedRect ? { ...rect, width: newWidth } : rect
      );
      setRectangles(updatedRectangles);
      setSelectedRect({ ...selectedRect, width: newWidth });
    }
  };
  // 도형 높이 조절
  const handleHeightChange = (event) => {
    const newHeight = event.target.value;
    setRectHeight(newHeight);
    if (selectedRect) {
      const updatedRectangles = rectangles.map(rect => 
        rect === selectedRect ? { ...rect, height: newHeight } : rect
      );
      setRectangles(updatedRectangles);
      setSelectedRect({ ...selectedRect, height: newHeight });
    }
  };

  return (
    <div className='container'>

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
          <div onClick={addRectangle} className='drawer-icon'>
              Rectangle
          </div>
          <div onClick={ ()=>{} } className='drawer-icon'>
              Ellipse
          </div>
          <div className='drawer-icon'>
              Polygon
          </div>
          <div className='drawer-icon'>
              Star
          </div>
          <button onClick={clearRectangles}>Clear Rectangles</button>
      </div>

      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        style={{ border: '1px solid #FFBB6D' }}
        onClick={handleClick}
        tabIndex={0}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <ChromePicker color={frameColor} onChangeComplete={handleChangeComplete} />
      {/* showColorPickerBox가 true이면 ColorPickerBox(상단바)를 보여줍니다. */}
      {selectedRect &&
      <div className='color-picker-box'>
      <img onClick={handleColorPickerIconClick} alt='색상 선택' src='/color-picker.png' className="color-picker-icon" />
        {showColorPicker && (
          <ChromePicker
            color={selectedColor}
            onChange={handleColorChange}
          />
        )}
        <label>
          Width:
          <input
            type="range"
            min="10"
            max="200"
            value={rectWidth}
            onChange={handleWidthChange}
          />
        </label>
        {selectedRect && <button onClick={bringToFront}>레이어 top</button>}
      </div>
      }

    </div>
  );
};

export default CanvasComponent;
