import React, { useRef, useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import { FigureIcon, BasicIcon, ImageIcon, TextIcon } from '../icons/MenuIcon';

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [frameColor, setFrameColor] = useState('#ffffff');
  const [shapes, setShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);
  const [keysPressed, setKeysPressed] = useState({});
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizing, setResizing] = useState(false);
  const [selectedColor, setSelectedColor] = useState();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showColorPickerBox, setShowColorPickerBox] = useState(false);

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
      } else if (shape.type === 'polygon' || shape.type === 'star') {
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
        } else if (shape.type === 'polygon' || shape.type === 'star') {
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
        }

        context.fillStyle = '#FF9900';
        if (shape.type !== 'polygon' && shape.type !== 'star') {
          context.fillRect(shape.x + shape.width - 5, shape.y + shape.height - 5, 10, 10); // resize handle
        } else {
          const bbox = getBoundingBox(shape.points);
          context.fillRect(bbox.x + bbox.width - 5, bbox.y + bbox.height - 5, 10, 10); // resize handle for polygons and stars
        }
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
        { x: 100, y: 90 },
        { x: 140, y: 120 },
        { x: 120, y: 160 },
        { x: 80, y: 160 },
        { x: 60, y: 120 },
      ],
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
    };
    setShapes(prevShapes => [...prevShapes, newPolygon]);
  };

  const addStar = () => {
    const points = calculateStarPoints(5, 50, 25);
    const newStar = {
      id: shapes.length,
      type: 'star',
      x: 100,
      y: 100,
      points: points,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
    };
    setShapes(prevShapes => [...prevShapes, newStar]);
  };

  const calculateStarPoints = (points, outerRadius, innerRadius) => {
    const angle = Math.PI / points;
    const starPoints = [];
    for (let i = 0; i < 2 * points; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const pointX = 100 + radius * Math.sin(i * angle);
      const pointY = 100 - radius * Math.cos(i * angle);
      starPoints.push({ x: pointX, y: pointY });
    }
    return starPoints;
  };

  const getBoundingBox = (points) => {
    const xs = points.map(point => point.x);
    const ys = points.map(point => point.y);
    const x = Math.min(...xs);
    const y = Math.min(...ys);
    const width = Math.max(...xs) - x;
    const height = Math.max(...ys) - y;
    return { x, y, width, height };
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
          : context.isPointInPath(createPolygonPath(shape.points), x, y)
    );
    if (clickedShape) {
      handleBlur();
      setSelectedShape(clickedShape);
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
      if (selectedShape.type === 'polygon' || selectedShape.type === 'star') {
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

    if (selectedShape && (selectedShape.type === 'polygon' || selectedShape.type === 'star')) {
      const bbox = getBoundingBox(selectedShape.points);
      if (x >= bbox.x + bbox.width - 5 && x <= bbox.x + bbox.width + 5 &&
        y >= bbox.y + bbox.height - 5 && y <= bbox.y + bbox.height + 5) {
        setResizing(true);
      } else {
        const clickedShape = shapes.slice().reverse().find(
          shape => shape.type === 'rectangle'
            ? x >= shape.x && x <= shape.x + shape.width && y >= shape.y && y <= shape.y + shape.height
            : shape.type === 'ellipse'
              ? Math.pow(x - (shape.x + shape.width / 2), 2) / Math.pow(shape.width / 2, 2) + Math.pow(y - (shape.y + shape.height / 2), 2) / Math.pow(shape.height / 2, 2) <= 1
              : context.isPointInPath(createPolygonPath(shape.points), x, y)
        );
        if (clickedShape) {
          setSelectedShape(clickedShape);
          setDragging(true);
          setDragOffset({ x: x - clickedShape.x, y: y - clickedShape.y });
        }
      }
    } else {
      if (selectedShape && x >= selectedShape.x + selectedShape.width - 5 && x <= selectedShape.x + selectedShape.width + 5 &&
        y >= selectedShape.y + selectedShape.height - 5 && y <= selectedShape.y + selectedShape.height + 5) {
        setResizing(true);
      } else {
        const clickedShape = shapes.slice().reverse().find(
          shape => shape.type === 'rectangle'
            ? x >= shape.x && x <= shape.x + shape.width && y >= shape.y && y <= shape.y + shape.height
            : shape.type === 'ellipse'
              ? Math.pow(x - (shape.x + shape.width / 2), 2) / Math.pow(shape.width / 2, 2) + Math.pow(y - (shape.y + shape.height / 2), 2) / Math.pow(shape.height / 2, 2) <= 1
              : context.isPointInPath(createPolygonPath(shape.points), x, y)
        );
        if (clickedShape) {
          setSelectedShape(clickedShape);
          setDragging(true);
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

      moveSelectedShape(x - selectedShape.x - dragOffset.x, y - selectedShape.y - dragOffset.y);
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
          if (keysPressed['Shift']) {
            resizeSelectedShape(0, -5);
          } else {
            moveSelectedShape(0, -5);
          }
          break;
        case 'ArrowDown':
          if (keysPressed['Shift']) {
            resizeSelectedShape(0, 5);
          } else {
            moveSelectedShape(0, 5);
          }
          break;
        case 'ArrowLeft':
          if (keysPressed['Shift']) {
            resizeSelectedShape(-5, 0);
          } else {
            moveSelectedShape(-5, 0);
          }
          break;
        case 'ArrowRight':
          if (keysPressed['Shift']) {
            resizeSelectedShape(5, 0);
          } else {
            moveSelectedShape(5, 0);
          }
          break;
        default:
          break;
      }
    }
  };

  const resizeSelectedShape = (dw, dh) => {
    if (selectedShape) {
      if (selectedShape.type === 'polygon' || selectedShape.type === 'star') {
        const bbox = getBoundingBox(selectedShape.points);
        const scaleX = (bbox.width + dw) / bbox.width;
        const scaleY = (bbox.height + dh) / bbox.height;
        const updatedPoints = selectedShape.points.map(point => ({
          x: bbox.x + (point.x - bbox.x) * scaleX,
          y: bbox.y + (point.y - bbox.y) * scaleY
        }));
        const updatedShape = {
          ...selectedShape,
          points: updatedPoints
        };
        const updatedShapes = shapes.map(shape =>
          shape === selectedShape ? updatedShape : shape
        );
        setShapes(updatedShapes);
        setSelectedShape(updatedShape);
      } else {
        const updatedShape = {
          ...selectedShape,
          width: Math.max(10, selectedShape.width + dw),
          height: Math.max(10, selectedShape.height + dh)
        };
        const updatedShapes = shapes.map(shape =>
          shape === selectedShape ? updatedShape : shape
        );
        setShapes(updatedShapes);
        setSelectedShape(updatedShape);
      }
    }
  };

  const handleKeyUp = (e) => {
    setKeysPressed(prev => ({ ...prev, [e.key]: false }));
  };

  const clearShapes = () => {
    setShapes([]);
    setSelectedShape(null);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    if (selectedShape) {
      const updatedShapes = shapes.map(shape =>
        shape.id === selectedShape.id ? { ...shape, color: color.hex } : shape
      );
      setShapes(updatedShapes);
      setSelectedShape(prev => ({ ...prev, color: color.hex }));
    }
  };

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
        <button onClick={clearShapes}>Clear Shapes</button>
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
