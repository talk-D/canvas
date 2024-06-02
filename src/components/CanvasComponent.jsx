import React, { useRef, useState, useEffect } from 'react';
import { FigureIcon, BasicIcon, ImageIcon, TextIcon } from '../icons/MenuIcon';
import ColorPickerComponent from './ColorPickerComponent'; // Import the new component
import TextEditor from './TextEditor';
import ImageUploader from './ImageUploader';
import Bubble from '../icons/Bubble'
import Bubble2 from '../icons/Bubble2'
import Heart1 from '../icons/Heart1'
import Heart2 from '../icons/Heart2'
import Heart3 from '../icons/Heart3'
import { SketchPicker } from 'react-color';
import PixelHeart from '../icons/PixelHeart';
import Bone from '../icons/Bone';
import Bubble3 from '../icons/Bubble3';
import Bubble4 from '../icons/Bubble4';
import ReactDOMServer from 'react-dom/server';

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
  const [selectedFigureIcon, setSelectedFigureIcon] = useState(false);
  const [selectedBasicIcon, setSelectedBasicIcon] = useState(false);
  const [texts, setTexts] = useState([]);
  const [images, setImages] = useState([]);
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [draggingText, setDraggingText] = useState(null);
  const [draggingImage, setDraggingImage] = useState(null);
  const [resizingImage, setResizingImage] = useState(null);
  const [selectedFigureId, setSelectedFigureId] = useState(-1);
  const [selectedTextId, setSelectedTextId] = useState(null); // 추가된 상태
  const [selectedShapeId, setSelectedShapeId] = useState(null);
  
  const handleTextIconClick = () => {
    setSelectedFigureIcon(false);
    setSelectedBasicIcon(false);
    setShowTextEditor(!showTextEditor);
    setShowImageUploader(false);
  };

  const handleImageIconClick = () => {
    setSelectedFigureIcon(false);
    setSelectedBasicIcon(false);
    setShowTextEditor(false);
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

  const handleMouseDown2 = (e, id, type) => {
    if (type === 'text') {
      setDraggingText(id);
      //setSelectedTextId(id); // 텍스트 선택 시 ID 저장
      setSelectedTextId(prevSelectedTextId => (prevSelectedTextId === id ? null : id)); // 선택된 텍스트를 다시 누르면 윤곽선 제거
    } else if (type === 'image') {
      setDraggingImage(id);
    }
  };

  const handleMouseMove2 = (e) => {
    if (draggingText !== null) {
      const updatedTexts = texts.map((text) => {
        if (text.id === draggingText) {
          return {
            ...text,
            top: e.clientY - canvasRef.current.getBoundingClientRect().top,
            left: e.clientX - canvasRef.current.getBoundingClientRect().left,
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
            top: e.clientY - canvasRef.current.getBoundingClientRect().top,
            left: e.clientX - canvasRef.current.getBoundingClientRect().left,
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
            width: Math.max(50, e.clientX - canvasRef.current.getBoundingClientRect().left - image.left),
            height: Math.max(50, e.clientY - canvasRef.current.getBoundingClientRect().top - image.top),
          };
        }
        return image;
      });
      setImages(updatedImages);
    }
  };

  const handleMouseUp2 = () => {
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

  const handleContainerClick = (e) => {
    if (e.target.classList.contains('container')) {
      if (canvasRef.current) {
        canvasRef.current.style.border = 'none';
      }
      setSelectedFigureId(-1);
      setSelectedTextId(null);
    }
  };

  const handleFrameClick = (e) => {
    if (e.target.classList.contains('frame')) {
      if (canvasRef.current) {
        canvasRef.current.style.border = '3px solid #FF9900';
      }
      setSelectedFigureId(-1);
    }
  };

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

  const handleFocus = () => {
    if (canvasRef.current) {
      canvasRef.current.style.outline = '3px solid #FF9900'; // 노란색 윤곽선
    }
  };

  const handleBlur = () => {
    if (canvasRef.current) {
      canvasRef.current.style.outline = 'none'; // 윤곽선 제거
    }else{
      canvasRef.current.style.outline = '1px solid #FFBB6D';
    }
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
      color: 'green',
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
    setSelectedTextId(null);

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

  const handleMouseDown = (e, id, type) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const context = canvas.getContext('2d');

    if (type === 'text') {
      setDraggingText(id);
    } else if (type === 'image') {
      setDraggingImage(id);
    }

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
    setFrameColor("#ffffff")
    setTexts(prevTexts => prevTexts.filter(text => text.id !== selectedTextId));
    setSelectedTextId(null);
    

  };

  const deleteSelectedShape = () => {
    if (selectedShape) {
      setShapes(prevShapes => prevShapes.filter(shape => shape !== selectedShape));
      setSelectedShape(null);
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    if (selectedShape) {
      const updatedShapes = shapes.map(shape =>
        shape.id === selectedShape.id ? { ...shape, color: color } : shape
      );
      setShapes(updatedShapes);
      setSelectedShape(prev => ({ ...prev, color: color }));
  
      // Update the SVG src if the shape is an SVG
      if (selectedShape.type === 'svg') {
        const svgElement = new DOMParser().parseFromString(selectedShape.src, "image/svg+xml").documentElement;
        console.log(color);
        svgElement.setAttribute('fill', color);
        const updatedSvgSrc = new XMLSerializer().serializeToString(svgElement);
        const updatedSvg = {
          ...selectedShape,
          src: updatedSvgSrc
        };
        setShapes(prevShapes => prevShapes.map(shape =>
          shape.id === selectedShape.id ? updatedSvg : shape
        ));
        setSelectedShape(updatedSvg);
      }
    }
  };

  const handleColorChange2 = (event) => {
    const color = event.target.value;
    setSelectedColor(color);

    if (selectedShapeId !== null) {
      setShapes(prevShapes => 
        prevShapes.map(shape => 
          shape.id === selectedShapeId ? { ...shape, color } : shape
        )
      );
    }
  };

  const handleSelectedFigureIcon = () => {
    setSelectedFigureIcon(!selectedFigureIcon);
    setSelectedBasicIcon(false);
    setShowTextEditor(false);
    setShowImageUploader(false);
  };

  const handleSelectedBasicIcon = () => {
    setSelectedFigureIcon(false);
    setSelectedBasicIcon(!selectedBasicIcon);
    setShowTextEditor(false);
    setShowImageUploader(false);
  };

  const handleDeleteSelectedText = () => {
    if (selectedTextId !== null) {
      setTexts(prevTexts => prevTexts.filter(text => text.id !== selectedTextId));
      setSelectedTextId(null);
    }
  };

  const handleIconClick = (svgSource) => {
    const svgString = ReactDOMServer.renderToStaticMarkup(svgSource);
    const newSvg = {
      id: shapes.length,
      type: 'svg',
      x: 50,
      y: 50,
      width: 50,
      height: 50,
      //color: selectedColor,
      src: `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`,
    };
    setShapes(prevShapes => [...prevShapes, newSvg]);
  };
  const handleShapeClick = (id) => {
    setSelectedShapeId(id);
  };

  
  return (
    <div className='container' onClick={handleContainerClick} onMouseMove={handleMouseMove2} onMouseUp={handleMouseUp2}>
      <div className='left-menubar'>
        <div className='menu-icon' onClick={handleSelectedFigureIcon}>
          <FigureIcon />
        </div>
        <div className='menu-icon' onClick={handleSelectedBasicIcon}>
          <BasicIcon />
        </div>
        <div className='menu-icon' onClick={handleImageIconClick}>
          <ImageIcon />
        </div>
        <div className='menu-icon' onClick={handleTextIconClick}>
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
            <div onClick={addTriangle} className='drawer-icon'>
              Triangle
            </div>
            <div onClick={addPolygon} className='drawer-icon'>
              Polygon
            </div>
            <div onClick={addStar} className='drawer-icon'>
              Star
            </div>
        </div>
      )}
      {selectedBasicIcon && (
        <div className='left-drawer'>
          <span className='subtitle'>기본 아이콘</span>
          <br/>
          <div className='basic-icon-grid-container'>
            <div className='basic-icon-grid'>
            
            <div className='drawer-basic-icon' onClick={() => handleIconClick(`data:image/svg+xml;utf8,<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><path d="M24.9998 6.25C36.4582 6.25 45.8332 13.7083 45.8332 22.9167C45.8332 32.125 36.4582 39.5833 24.9998 39.5833C22.4165 39.5833 19.9373 39.2083 17.6457 38.5417C11.5623 43.75 4.1665 43.75 4.1665 43.75C9.02067 38.8958 9.7915 35.625 9.89567 34.375C6.354 31.3958 4.1665 27.3542 4.1665 22.9167C4.1665 13.7083 13.5415 6.25 24.9998 6.25Z" fill="#f00000"/></svg>`)}>
              <Bubble2 />
            </div>
              <div className='drawer-basic-icon' onClick={() => handleIconClick(<Bubble color={selectedColor} />)}>
                <Bubble />
              </div>          
              <div className='drawer-basic-icon' onClick={() => handleIconClick(Bubble3)}>
                <Bubble3 />
              </div>
              <div className='drawer-basic-icon' onClick={() => handleIconClick(Heart1)}>
                <Heart1 />
              </div>
              <div className='drawer-basic-icon' onClick={() => handleIconClick(Heart2)}>
                <Heart2 />
              </div>
              <div className='drawer-basic-icon' onClick={() => handleIconClick(Heart3)}>
                <Heart3 />
              </div>
              <div className='drawer-basic-icon' onClick={() => handleIconClick(PixelHeart)}>
                <PixelHeart />
              </div>
              <div className='drawer-basic-icon' onClick={() => handleIconClick(Bone)}>
                <Bone />
              </div>
              <div className='drawer-basic-icon' onClick={() => handleIconClick(Bubble4)}>
                <Bubble4 />
              </div>
            </div>
          </div>
          
      <div style={{ marginTop: 'auto' }}>
        <SketchPicker
          color={selectedColor}
          onChangeComplete={(color) => handleColorChange(color.hex)}
        />
      </div>
          
    </div>
    )}
      {showImageUploader && (
        <div className='left-drawer'>
          <ImageUploader onImageClick={handleImageClick} />
        </div>
      )}
      {showTextEditor && (
        <div className='left-drawer'>
          <TextEditor onSave={handleSaveText} />
          
        </div>
      )}

<div style={{ position: 'relative', width: '300px', height: '300px' }}>
  <canvas
    ref={canvasRef}
    width={300}
    height={300}
    style={{ border: '1px solid #FFBB6D', position: 'absolute', top: 0, left: 0 }}
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
  {texts.map((text) => (
    <div
      key={text.id}
      onMouseDown={(e) => handleMouseDown2(e, text.id, 'text')}
      style={{
        position: 'absolute',
        top: `${text.top}px`,
        left: `${text.left}px`,
        cursor: 'move',
        outline: selectedTextId === text.id ? '2px solid #FFBB6D' : 'none', // 선택된 텍스트의 윤곽선 노란색으로 변경
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
        zIndex: 10 // z-index 추가하여 캔버스 위에 오버레이
      }}
      onMouseDown={(e) => handleMouseDown2(e, image.id, 'image')}
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
      {selectedShape && (
        <div>
          <ColorPickerComponent
            currentColor={selectedColor}
            currentColor2={frameColor}
            onColorChange={handleColorChange}
            onColorChange2={setFrameColor}
            bringToFront={bringToFront}
            clearShapes = {clearShapes}
            deleteSelectedShape = {deleteSelectedShape}
          /> 
        </div>
      )}
      { selectedTextId !=null &&(
        <div className='color-picker-container'>
          <button className='drawer-icon-button' onClick={handleDeleteSelectedText}>선택 텍스트 삭제</button>
          <button className='drawer-icon-button' onClick={clearShapes}>캔버스 초기화</button>
        </div>
      )}
    </div>
  );
};

export default CanvasComponent;
 