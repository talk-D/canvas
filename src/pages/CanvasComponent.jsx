import React, { useRef, useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import { FigureIcon, BasicIcon, ImageIcon, TextIcon } from '../icons/MenuIcon';

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [frameColor, setFrameColor] = useState('#ffffff');
  const [shapes, setShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState();
  const [keysPressed, setKeysPressed] = useState({});
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizing, setResizing] = useState(false);
  const [selectedColor, setSelectedColor] = useState(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  const [showColorPicker, setShowColorPicker] = useState(false);
  // 왼쪽 메뉴바 아이콘 눌렀을 때 메뉴 열고 닫기
  const [selectedFigureIcon, setSelectedFigureIcon] = useState(false);
  const [selectedBasicIcon, setSelectedBasicIcon] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = frameColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    shapes.forEach(shape => {
      context.fillStyle = shape.color;
      if (shape.type === 'rectangle') {
        context.fillRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === 'ellipse') {
        context.beginPath();
        context.ellipse(shape.x + shape.width / 2, shape.y + shape.height / 2, shape.width / 2, shape.height / 2, 0, 0, 2 * Math.PI);
        context.fill();
      } else if (shape.type === 'polygon' || shape.type === 'star' || shape.type === 'triangle') {
        context.beginPath();
        shape.points.forEach((point, index) => {
          if (index === 0) {
            context.moveTo(point.x, point.y);
          } else {
            context.lineTo(point.x, point.y);
          }
        });
        context.closePath();
        context.fill();
      } else if (shape.type === 'svg') {
        const img = new Image();
        img.src = shape.src;
        img.onload = () => {
          context.drawImage(img, shape.x, shape.y, shape.width, shape.height);
        };
      }

      if (shape === selectedShape) {
        context.strokeStyle = '#FF9900';
        context.lineWidth = 3;
        if (shape.type === 'rectangle') {
          context.strokeRect(shape.x, shape.y, shape.width, shape.height);
        } else if (shape.type === 'ellipse') {
          context.beginPath();
          context.ellipse(shape.x + shape.width / 2, shape.y + shape.height / 2, shape.width / 2, shape.height / 2, 0, 0, 2 * Math.PI);
          context.stroke();
        } else if (shape.type === 'polygon' || shape.type === 'star' || shape.type === 'triangle') {
          context.beginPath();
          shape.points.forEach((point, index) => {
            if (index === 0) {
              context.moveTo(point.x, point.y);
            } else {
              context.lineTo(point.x, point.y);
            }
          });
          context.closePath();
          context.stroke();
        } else if (shape.type === 'svg') {
          context.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }

        context.fillStyle = '#FF9900';
        context.fillRect(shape.x + shape.width - 5, shape.y + shape.height - 5, 10, 10);
      }
    });
  }, [shapes, selectedShape, frameColor]);

  const handleChangeComplete = (color) => {
    setFrameColor(color.hex);
  };

  const handleFocus = () => {
    canvasRef.current.style.outline = '3px solid #FF9900';
  };

  const handleBlur = () => {
    canvasRef.current.style.outline = '1px solid #FFBB6D';
  };

  const addRectangle = () => {
    const newRect = {
      id: shapes.length,
      type: 'rectangle',
      x: 100,
      y: 100,
      width: 50,
      height: 50,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
    };
    setShapes(prevShapes => [...prevShapes, newRect]);
  };

  const addEllipse = () => {
    const newEllipse = {
      id: shapes.length,
      type: 'ellipse',
      x: 100,
      y: 100,
      width: 50,
      height: 50,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
    };
    setShapes(prevShapes => [...prevShapes, newEllipse]);
  };

  const addPolygon = () => {
    const newPolygon = {
      id: shapes.length,
      type: 'polygon',
      x: 100,
      y: 100,
      points: [
        { x: 100, y: 100 },
        { x: 150, y: 120 },
        { x: 130, y: 170 },
        { x: 70, y: 170 },
        { x: 50, y: 120 },
      ],
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
    };
    setShapes(prevShapes => [...prevShapes, newPolygon]);
  };

  const addStar = () => {
    const newStar = {
      id: shapes.length,
      type: 'star',
      x: 100,
      y: 100,
      points: calculateStarPoints(100, 100, 5, 30, 15),
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
    };
    setShapes(prevShapes => [...prevShapes, newStar]);
  };

  const addTriangle = () => {
    const newTriangle = {
      id: shapes.length,
      type: 'triangle',
      x: 100,
      y: 100,
      points: [
        { x: 100, y: 50 },
        { x: 50, y: 150 },
        { x: 150, y: 150 }
      ],
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
    };
    setShapes(prevShapes => [...prevShapes, newTriangle]);
  };

  const calculateStarPoints = (centerX, centerY, arms, outerRadius, innerRadius) => {
    const points = [];
    const angle = Math.PI / arms;
    for (let i = 0; i < 2 * arms; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const pointX = centerX + Math.cos(i * angle) * radius;
      const pointY = centerY + Math.sin(i * angle) * radius;
      points.push({ x: pointX, y: pointY });
    }
    return points;
  };

  const addSvg = () => {
    const newSvg = {
      id: shapes.length,
      type: 'svg',
      x: 100,
      y: 100,
      width: 50,
      height: 50,
      color : 'green',
      src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"/></svg>' // currentColor를 사용하여 색상 변경 가능
    };
    setShapes(prevShapes => [...prevShapes, newSvg]);
  };

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const context = canvas.getContext('2d');

    const clickedShape = shapes.slice().reverse().find(
      shape => shape.type === 'rectangle'
        ? x >= shape.x && x <= shape.x + shape.width && y >= shape.y && y <= shape.y + shape.height
        : shape.type === 'ellipse'
          ? Math.pow(x - (shape.x + shape.width / 2), 2) / Math.pow(shape.width / 2, 2) + Math.pow(y - (shape.y + shape.height / 2), 2) / Math.pow(shape.height / 2, 2) <= 1
          : shape.type === 'svg'
            ? x >= shape.x && x <= shape.x + shape.width && y >= shape.y && y <= shape.y + shape.height
            : context.isPointInPath(createPolygonPath(shape.points), x, y)
    );
    if (clickedShape) {
      handleBlur();
      setSelectedShape(clickedShape);
      setSelectedColor(clickedShape.color || '#000000'); // Ensure color is set for SVG shapes
    } else {
      setSelectedShape(null);
      canvasRef.current.focus();
    }
  };

  const bringToFront = () => {
    if (selectedShape) {
      setShapes(prevShapes => {
        const otherShapes = prevShapes.filter(shape => shape !== selectedShape);
        return [...otherShapes, selectedShape];
      });
    }
  };

  const moveSelectedShape = (dx, dy) => {
    if (selectedShape) {
      const updatedShape = {
        ...selectedShape,
        x: selectedShape.x + dx,
        y: selectedShape.y + dy
      };
      if (selectedShape.type === 'polygon' || selectedShape.type === 'star' || selectedShape.type === 'triangle') {
        updatedShape.points = updatedShape.points.map(point => ({
          x: point.x + dx,
          y: point.y + dy
        }));
      }
      const updatedShapes = shapes.map(shape =>
        shape === selectedShape ? updatedShape : shape
      );
      setShapes(updatedShapes);
      setSelectedShape(updatedShape);
    }
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const context = canvas.getContext('2d');

    const resizeHandleClicked = (shape) => {
      return x >= shape.x + shape.width - 5 && x <= shape.x + shape.width + 5 &&
             y >= shape.y + shape.height - 5 && y <= shape.y + shape.height + 5;
    };

    if (selectedShape && resizeHandleClicked(selectedShape)) {
      setResizing(true);
    } else {
      const clickedShape = shapes.slice().reverse().find(
        shape => shape.type === 'rectangle'
          ? x >= shape.x && x <= shape.x + shape.width && y >= shape.y && y <= shape.y + shape.height
          : shape.type === 'ellipse'
            ? Math.pow(x - (shape.x + shape.width / 2), 2) / Math.pow(shape.width / 2, 2) + Math.pow(y - (shape.y + shape.height / 2), 2) / Math.pow(shape.height / 2, 2) <= 1
            : shape.type === 'svg'
              ? x >= shape.x && x <= shape.x + shape.width && y >= shape.y && y <= shape.y + shape.height
              : context.isPointInPath(createPolygonPath(shape.points), x, y)
      );
      if (clickedShape) {
        setSelectedShape(clickedShape);
        setDragging(true);
        if (clickedShape.type === 'polygon' || clickedShape.type === 'star' || clickedShape.type === 'triangle') {
          const offsetX = x - clickedShape.points[0].x;
          const offsetY = y - clickedShape.points[0].y;
          setDragOffset({ x: offsetX, y: offsetY });
        } else {
          setDragOffset({ x: x - clickedShape.x, y: y - clickedShape.y });
        }
      }
    }
  };

  
  const handleMouseMove = (e) => {
    if (dragging && selectedShape) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (selectedShape.type === 'polygon' || selectedShape.type === 'star' || selectedShape.type === 'triangle') {
        moveSelectedShape(x - selectedShape.points[0].x - dragOffset.x, y - selectedShape.points[0].y - dragOffset.y);
      } else {
        moveSelectedShape(x - selectedShape.x - dragOffset.x, y - selectedShape.y - dragOffset.y);
      }
    } else if (resizing && selectedShape) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      resizeSelectedShape(x - (selectedShape.x + selectedShape.width), y - (selectedShape.y + selectedShape.height));
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    setResizing(false);
  };

  const handleKeyDown = (e) => {
    setKeysPressed(prev => ({ ...prev, [e.key]: true }));

    if (selectedShape) {
      switch (e.key) {
        case 'ArrowUp':
          moveSelectedShape(0, -5);
          break;
        case 'ArrowDown':
          moveSelectedShape(0, 5);
          break;
        case 'ArrowLeft':
          moveSelectedShape(-5, 0);
          break;
        case 'ArrowRight':
          moveSelectedShape(5, 0);
          break;
        default:
          break;
      }
    }
  };

  const resizeSelectedShape = (dw, dh) => {
    if (selectedShape) {
      const updatedShape = {
        ...selectedShape,
        width: Math.max(10, selectedShape.width + dw),
        height: Math.max(10, selectedShape.height + dh)
      };
      /*
      if (selectedShape.type === 'polygon' || selectedShape.type === 'star' || selectedShape.type === 'triangle') {
        const scaleX = updatedShape.width / selectedShape.width;
        const scaleY = updatedShape.height / selectedShape.height;
        updatedShape.points = selectedShape.points.map(point => ({
          x: selectedShape.x + (point.x - selectedShape.x) * scaleX,
          y: selectedShape.y + (point.y - selectedShape.y) * scaleY
        }));
      }*/
      const updatedShapes = shapes.map(shape =>
        shape === selectedShape ? updatedShape : shape
      );
      setShapes(updatedShapes);
      setSelectedShape(updatedShape);
    }
  };

  const handleKeyUp = (e) => {
    setKeysPressed(prev => ({ ...prev, [e.key]: false }));
  };

  const clearShapes = () => {
    setShapes([]);
    setSelectedShape(null);
  };

  const deleteSelectedShape = () => {
    if (selectedShape) {
      setShapes(prevShapes => prevShapes.filter(shape => shape !== selectedShape));
      setSelectedShape(null);
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    if (selectedShape) {
      const updatedShapes = shapes.map(shape =>
        shape.id === selectedShape.id ? { ...shape, color: color.hex } : shape
      );
      setShapes(updatedShapes);
      setSelectedShape(prev => ({ ...prev, color: color.hex }));
  
      // Update the SVG src if the shape is an SVG
      if (selectedShape && selectedShape.type === 'svg') {
        // SVG 코드를 파싱하여 fill 속성을 변경
        const svgElement = new DOMParser().parseFromString(selectedShape.src, "image/svg+xml").documentElement;
        svgElement.setAttribute('fill', color.hex);
        // 변경된 SVG 코드를 다시 문자열로 변환
        const updatedSvgSrc = new XMLSerializer().serializeToString(svgElement);
        // 변경된 SVG 코드를 selectedShape의 src 속성에 할당
        const updatedSvg = {
          ...selectedShape,
          src: updatedSvgSrc
        };
        // shapes 배열에서 선택된 도형만 변경된 SVG로 교체
        setShapes(prevShapes => prevShapes.map(shape =>
          shape.id === selectedShape.id ? updatedSvg : shape
        ));
        setSelectedShape(updatedSvg);
      }
    }
  };
  
  
  
  
  const handleSelectedFigureIcon = () => {
    setSelectedFigureIcon(!selectedFigureIcon);
  }

  const handleSelectedBasicIcon = () => {
    setSelectedBasicIcon(!selectedBasicIcon);
  }
  

  const handleColorPickerIconClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  const createPolygonPath = (points) => {
    const path = new Path2D();
    points.forEach((point, index) => {
      if (index === 0) {
        path.moveTo(point.x, point.y);
      } else {
        path.lineTo(point.x, point.y);
      }
    });
    path.closePath();
    return path;
  };

  return (
    <div className='container'>
      <div className='left-menubar'>
        <div className='menu-icon' onClick={handleSelectedFigureIcon}>
          <FigureIcon />
        </div>
        <div className='menu-icon' onClick={handleSelectedBasicIcon}>
          <BasicIcon />
        </div>
        <div className='menu-icon'>
          <ImageIcon />
        </div>
        <div className='menu-icon'>
          <TextIcon />
        </div>
      </div>
      { selectedFigureIcon && (
        <div className='left-drawer'>
        <div onClick={addRectangle} className='drawer-icon'>
          Rectangle
        </div>
        <div onClick={addEllipse} className='drawer-icon'>
          Ellipse
        </div>
        <div onClick={addPolygon} className='drawer-icon'>
          Polygon
        </div>
        <div onClick={addStar} className='drawer-icon'>
          Star
        </div>
        <div onClick={addTriangle} className='drawer-icon'>
          삼각형
        </div>
        
        <button onClick={clearShapes}>캔버스 초기화</button>
        <button onClick={deleteSelectedShape}>선택 도형 삭제</button>
      </div>
    )}
    { selectedBasicIcon && (
      <div className='left-drawer'>
        <div onClick={addSvg} className='drawer-icon'>
          svg 추가
        </div>
        <button onClick={clearShapes}>캔버스 초기화</button>
        <button onClick={deleteSelectedShape}>선택 도형 삭제</button>
      </div>
    )}
      
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
      {selectedShape && (
        <div className='color-picker-box'>
          <img
            onClick={handleColorPickerIconClick}
            alt='색상 선택'
            src='/color-picker.png'
            className='color-picker-icon'
          />
          {showColorPicker && (
            <ChromePicker
              color={selectedColor}
              onChange={handleColorChange}
            />
          )}
          <ChromePicker color={frameColor} onChangeComplete={handleChangeComplete} />
          {selectedShape && <button onClick={bringToFront}>레이어 top</button>}
        </div>
      )}
    </div>
  );
};

export default CanvasComponent;
