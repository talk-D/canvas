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
import PixelHeart from '../icons/PixelHeart';
import Bone from '../icons/Bone';
import Bubble3 from '../icons/Bubble3';
import Bubble4 from '../icons/Bubble4';
import Triangle1 from '../icons/Triangle1';
import Polygon from '../icons/Polygon';
import ReactDOMServer from 'react-dom/server';
import Star2 from '../icons/Star2';
import Rect from '../icons/Rect';
import Arrow from '../icons/Arrow';
import Avocado from '../icons/Avocado';
import Cloud from '../icons/Cloud';
import Medal from '../icons/Medal';
import Arrow2 from '../icons/Arrow2';

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
  const [selectedTextId, setSelectedTextId] = useState(null);
  const outlineCanvasRef = useRef(null);
  const [selectedImageId, setSelectedImageId] = useState(null);
  
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

  const handleSaveText = (content) => {
    const newText = {
      id: texts.length,
      content: content.text,
      top: 50,
      left: 50,
      fontSize: content.fontSize,
      fontFamily: content.fontFamily,
      fontWeight: content.fontWeight,
      fontStyle: content.fontStyle,
      textDecoration: content.textDecoration,
      color: content.color,
    };
    setTexts([...texts, newText]);
    setShowTextEditor(false);
  };

  const handleMouseUp2 = () => {
    setDraggingText(null);
    setDraggingImage(null);
    setResizingImage(null);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp2);
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


  useEffect(() => {
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');
  const outlineCanvas = outlineCanvasRef.current;
  const outlineContext = outlineCanvas.getContext('2d');

  // Clear both canvases
  context.clearRect(0, 0, canvas.width, canvas.height);
  outlineContext.clearRect(0, 0, outlineCanvas.width, outlineCanvas.height);

  // Fill background
  context.fillStyle = frameColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw shapes
  shapes.forEach((shape) => {
    context.fillStyle = shape.color;
    if (shape.type === 'rectangle') {
      context.fillRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === 'ellipse') {
      context.beginPath();
      context.ellipse(shape.x + shape.width / 2, shape.y + shape.height / 2, shape.width / 2, shape.height / 2, 0, 0, 2 * Math.PI);
      context.fill();
    } else if (shape.type === 'svg') {
      const img = new Image();
      img.src = shape.src;
      img.onload = () => {
        context.drawImage(img, shape.x, shape.y, shape.width, shape.height);
      };
    }
  });

  // Draw selected shape outline
  if (selectedShape) {
    outlineContext.strokeStyle = '#FF9900';
    outlineContext.lineWidth = 3;
    if (selectedShape.type === 'rectangle') {
      outlineContext.strokeRect(selectedShape.x, selectedShape.y, selectedShape.width, selectedShape.height);
    } else if (selectedShape.type === 'ellipse') {
      outlineContext.beginPath();
      outlineContext.ellipse(selectedShape.x + selectedShape.width / 2, selectedShape.y + selectedShape.height / 2, selectedShape.width / 2, selectedShape.height / 2, 0, 0, 2 * Math.PI);
      outlineContext.stroke();
    } else if (selectedShape.type === 'polygon' || selectedShape.type === 'star' || selectedShape.type === 'triangle') {
      outlineContext.beginPath();
      selectedShape.points.forEach((point, index) => {
        if (index === 0) {
          outlineContext.moveTo(point.x, point.y);
        } else {
          outlineContext.lineTo(point.x, point.y);
        }
      });
      outlineContext.closePath();
      outlineContext.stroke();
    } else if (selectedShape.type === 'svg') {
      outlineContext.strokeRect(selectedShape.x, selectedShape.y, selectedShape.width, selectedShape.height);
    }

    outlineContext.fillStyle = '#FF9900';
    outlineContext.fillRect(selectedShape.x + selectedShape.width - 5, selectedShape.y + selectedShape.height - 5, 10, 10);
  }
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

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const context = canvas.getContext('2d');
    setSelectedTextId(null);
    setSelectedImageId(null);
    

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
        const newShape = { ...selectedShape, id: Date.now() }; // 새로운 ID를 부여
        return [...otherShapes, newShape];
      });
      setSelectedShape(null); // 기존 선택된 도형을 해제
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
      setSelectedTextId(prevSelectedTextId => (prevSelectedTextId === id ? null : id));
    } else if (type === 'image') {
      setDraggingImage(id);
      setSelectedImageId(prevSelectedImageId => (prevSelectedImageId === id ? null : id));
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
        setDragOffset({ x: x - clickedShape.x, y: y - clickedShape.y });     
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

    }else if(draggingText !== null) {
      const updatedTexts = texts.map((text) => {
        if (text.id === draggingText) {
          const newTop = e.clientY - canvasRef.current.getBoundingClientRect().top;
          const newLeft = e.clientX - canvasRef.current.getBoundingClientRect().left;
          // 텍스트의 폭과 높이를 계산
          const textElement = document.getElementById(`text-${text.id}`);
          const textWidth = textElement.offsetWidth;
          const textHeight = textElement.offsetHeight;
          // 캔버스 영역 밖으로 나가지 않도록 제한
          const boundedTop = Math.max(0, Math.min(newTop, canvasRef.current.height - textHeight)); // 20은 텍스트 높이의 대략적인 값
          const boundedLeft = Math.max(0, Math.min(newLeft, canvasRef.current.width  - textWidth)); // 20은 텍스트 폭의 대략적인 값
          return {
            ...text,
            top: boundedTop,
            left: boundedLeft,
          };
        }
        return text;
      });
      setTexts(updatedTexts);
    }
    else if (draggingImage !== null) {
      const updatedImages = images.map((image) => {
        if (image.id === draggingImage) {
          const newTop = e.clientY - canvasRef.current.getBoundingClientRect().top;
          const newLeft = e.clientX - canvasRef.current.getBoundingClientRect().left;  
          // 캔버스 영역 밖으로 나가지 않도록 제한
          const boundedTop = Math.max(0, Math.min(newTop, canvasRef.current.height - image.height));
          const boundedLeft = Math.max(0, Math.min(newLeft, canvasRef.current.width - image.width));
          return {
            ...image,
            top: boundedTop,
            left: boundedLeft,
          };
        }
        return image;
      });
      setImages(updatedImages);
      
    } else if (resizingImage !== null) {
      const updatedImages = images.map((image) => {
        if (image.id === resizingImage) {
          const newWidth = Math.max(10, e.clientX - canvasRef.current.getBoundingClientRect().left - image.left);
          const newHeight = Math.max(10, e.clientY - canvasRef.current.getBoundingClientRect().top - image.top);
  
          const boundedWidth = Math.min(newWidth, canvasRef.current.width - image.left);
          const boundedHeight = Math.min(newHeight, canvasRef.current.height - image.top);
          
          return {
            ...image,
            width: boundedWidth,
            height: boundedHeight,          };
        }
        return image;
      });
      setImages(updatedImages);
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
    setTexts([]);
    setSelectedTextId(null);
    setImages([]); // 이미지 초기화

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
        const svgElement = new DOMParser().parseFromString(decodeURIComponent(selectedShape.src.split(',')[1]), "image/svg+xml").documentElement;
        console.log(color);
        svgElement.setAttribute('fill', color);
        
        const updatedSvgSrc = `data:image/svg+xml;utf8,${encodeURIComponent(new XMLSerializer().serializeToString(svgElement))}`;

        const updatedSvg = {
          ...selectedShape,
          src: updatedSvgSrc
        };
        setShapes(prevShapes => prevShapes.map(shape =>
          shape.id === selectedShape.id ? updatedSvg : shape
        ));
        setSelectedShape(updatedSvg);
        console.log(updatedSvg);
      }
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
      src: `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`
    };
    setSelectedColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
    setShapes(prevShapes => [...prevShapes, newSvg]);
  };

  const handleDeleteSelectedImage = () => {
    if (selectedImageId !== null) {
      setImages(prevImages => prevImages.filter(image => image.id !== selectedImageId));
      setSelectedImageId(null);
    }
  };


  
  
  return (
    <div className='container' onClick={handleContainerClick} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp2}>
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
          <div onClick={() => handleIconClick(<Rect color={selectedColor}/>)} className='drawer-icon'>
              Rectangle
            </div>
            <div onClick={addEllipse} className='drawer-icon'>
              Ellipse
            </div>
            <div className='drawer-icon' onClick={() => handleIconClick(<Triangle1 color={selectedColor}/>)}>
              Triangle
            </div>
            <div onClick={() => handleIconClick(<Polygon color={selectedColor}/>)} className='drawer-icon'>
              Polygon
            </div>
        </div>
      )}
      {selectedBasicIcon && (
        <div className='left-drawer'>
          <span className='subtitle'>기본 아이콘</span>
          <br/>
          <div className='basic-icon-grid-container'>
            <div className='basic-icon-grid'>
            
            <div className='drawer-basic-icon' onClick={() => handleIconClick(<Bubble2 color={selectedColor}/>)}>
              <Bubble2 />
            </div>
              <div className='drawer-basic-icon' onClick={() => handleIconClick(<Bubble color={selectedColor} />)}>
                <Bubble />
              </div>          
              <div className='drawer-basic-icon' onClick={() => handleIconClick(<Bubble3 color={selectedColor}/>)}>
                <Bubble3 />
              </div>
              <div className='drawer-basic-icon' onClick={() => handleIconClick(<Heart1 color={selectedColor}/>)}>
                <Heart1 />
              </div>
              <div className='drawer-basic-icon' onClick={() => handleIconClick(<Heart2 color={selectedColor}/>)}>
                <Heart2 />
              </div>
              <div className='drawer-basic-icon' onClick={() => handleIconClick(<Heart3 color={selectedColor}/>)}>
                <Heart3 />
              </div>
              <div className='drawer-basic-icon' onClick={() => handleIconClick(<PixelHeart color={selectedColor}/>)}>
                <PixelHeart />
              </div>
              <div className='drawer-basic-icon' onClick={() => handleIconClick(<Bone color={selectedColor}/>)}>
                <Bone />
              </div>
              <div className='drawer-basic-icon' onClick={() => handleIconClick(<Bubble4 color={selectedColor}/>)}>
                <Bubble4 />
              </div>
              <div className='drawer-basic-icon' onClick={() => handleIconClick(<Star2 color={selectedColor}/>)}>
                <Star2 />
              </div>
              <div className='drawer-basic-icon' onClick={() => handleIconClick(<Arrow color={selectedColor}/>)}>
                <Arrow />
              </div>
              <div className='drawer-basic-icon' onClick={() => handleIconClick(<Avocado color={selectedColor}/>)}>
                <Avocado />
              </div>
              <div className='drawer-basic-icon' onClick={() => handleIconClick(<Cloud color={selectedColor}/>)}>
                <Cloud />
              </div>
              <div className='drawer-basic-icon' onClick={() => handleIconClick(<Medal color={selectedColor}/>)}>
                <Medal />
              </div>
              <div className='drawer-basic-icon' onClick={() => handleIconClick(<Arrow2 color={selectedColor}/>)}>
                <Arrow2 />
              </div>
            </div>
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
  <canvas
    ref={outlineCanvasRef}
    width={300}
    height={300}
    style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
  />
  {texts.map((text) => (
    <div
      key={text.id}
      id={`text-${text.id}`}
      onMouseDown={(e) => handleMouseDown(e, text.id, 'text')}
      style={{
        position: 'absolute',
        top: `${text.top}px`,
        left: `${text.left}px`,
        cursor: 'move',
        outline: selectedTextId === text.id ? '2px solid #FFBB6D' : 'none', // 선택된 텍스트의 윤곽선 노란색으로 변경
        whiteSpace: 'nowrap', // 텍스트를 한 줄로 고정
        fontSize: text.fontSize,
        fontFamily: text.fontFamily,
        fontWeight: text.fontWeight,
        fontStyle: text.fontStyle,
        textDecoration: text.textDecoration,
        color: text.color,
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
      border: selectedImageId === image.id ? '3px solid #FFBB6D' : '0px solid #ccc',
      zIndex: 10
    }}
    onMouseDown={(e) => handleMouseDown(e, image.id, 'image')}
  >
    <img src={image.src} alt={`uploaded-${image.id}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
    {selectedImageId === image.id && (
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '10px',
          height: '10px',
          backgroundColor: '#FFBB6D',
          cursor: 'nwse-resize',
        }}
        onMouseDown={(e) => handleResizeMouseDown(e, image.id)}
      />
    )}
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
      { selectedImageId != null && (
  <div className='color-picker-container'>
    <button className='drawer-icon-button' onClick={handleDeleteSelectedImage}>선택 이미지 삭제</button>
    <button className='drawer-icon-button' onClick={clearShapes}>캔버스 초기화</button>
  </div>
)}
    </div>
  );
};

export default CanvasComponent;
 