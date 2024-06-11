import React, { useState, useRef, useEffect } from 'react';
import '../styles/TextEditor.css';

const TextEditor = ({ onSave }) => {
  const [editorState, setEditorState] = useState('');
  const [fontSize, setFontSize] = useState(14);
  const [fontFamily, setFontFamily] = useState('Noto Sans KR Bold');
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [color, setColor] = useState('#000000');
  const [align, setAlign] = useState('left');
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.style.direction = 'ltr';
      editorRef.current.style.textAlign = 'left';
      editorRef.current.focus();
    }
  }, []);

  const handleEditorChange = (event) => {
    const content = event.target.innerHTML;
    setEditorState(content);
  };

  const handleSaveClick = () => {
    if (onSave) {
      const content = {
        text: editorRef.current.innerHTML,
        fontSize: fontSize,
        fontFamily: fontFamily,
        fontWeight: bold ? 'bold' : 'normal',
        fontStyle: italic ? 'italic' : 'normal',
        textDecoration: underline ? 'underline' : 'none',
        color: color,
      };
      onSave(content);
      setEditorState('');
      editorRef.current.innerHTML = '';
    }
  };
  

  const handleFontSizeChange = (delta) => {
    const newSize = Math.max(10, fontSize + delta);
    setFontSize(newSize);
    document.execCommand('fontSize', false, `${newSize}px`);
  };

  const handleFontFamilyChange = (event) => {
    const newFontFamily = event.target.value;
    setFontFamily(newFontFamily);
    document.execCommand('fontName', false, newFontFamily);
  };

  const toggleBold = () => {
    setBold(!bold);
    document.execCommand('bold');
  };

  const toggleItalic = () => {
    setItalic(!italic);
    document.execCommand('italic');
  };

  const toggleUnderline = () => {
    setUnderline(!underline);
    document.execCommand('underline');
  };

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setColor(newColor);
    document.execCommand('foreColor', false, newColor);
  };

  const handleAlignChange = (alignment) => {
    setAlign(alignment);
    document.execCommand('justify' + alignment);
  };

  return (
    <div className="editor-wrapper">
      <button onClick={handleSaveClick} className="save-button">저장</button>
      <div className="editor-toolbar">
        <select className="font-family-select" value={fontFamily} onChange={handleFontFamilyChange}>
          <option value="Noto Sans KR Bold">Noto Sans KR Bold</option>
          <option value="Noto Sans KR Black">Noto Sans KR Black</option>
          <option value="Noto Sans KR ExtraBold">Noto Sans KR ExtraBold</option>
          <option value="Noto Sans KR ExtraLight">Noto Sans KR ExtraLight</option>
          <option value="Noto Sans KR Light">Noto Sans KR Light</option>
          <option value="Noto Sans KR Medium">Noto Sans KR Medium</option>
          <option value="Noto Sans KR Regular">Noto Sans KR Regular</option>
          <option value="Noto Sans KR SemiBold">Noto Sans KR SemiBold</option>
          <option value="Noto Sans KR Thin">Noto Sans KR Thin</option>
          <option value="나눔손글씨붓">나눔손글씨붓</option>
          <option value="야놀자 야체 Bold">야놀자 야체 Bold</option>
          <option value="야놀자 야체 Regular">야놀자 야체 Regular</option>
          <option value="온글잎 류류체">온글잎 류류체</option>
          <option value="유앤피플 고딕 KS">유앤피플 고딕 KS</option>
          <option value="유앤피플 고딕 UNI">유앤피플 고딕 UNI</option>
          <option value="중나좋체 Light">중나좋체 Light</option>
          <option value="중나좋체 Medium">중나좋체 Medium</option>
          <option value="Adultkid">Adultkid</option>
          <option value="BagelFatOne-Regular">BagelFatOne-Regular</option>
          <option value="MoiraiOne-Regular">MoiraiOne-Regular</option>
        </select>
      </div>
      <div className="editor-controls">
        <div className="font-size-control">
          <button onClick={() => handleFontSizeChange(-2)}>-</button>
          <span>{fontSize}</span>
          <button onClick={() => handleFontSizeChange(2)}>+</button>
        </div>
        <button className={`format-button ${bold ? 'active' : ''}`} onClick={toggleBold}><b>B</b></button>
        <button className={`format-button ${italic ? 'active' : ''}`} onClick={toggleItalic}><i>I</i></button>
        <button className={`format-button ${underline ? 'active' : ''}`} onClick={toggleUnderline}><u>U</u></button>
      </div>
      <div className="editor-controls">
        <button className={`format-button ${align === 'left' ? 'active' : ''}`} onClick={() => handleAlignChange('Left')}>
          <span className="align-left-icon"></span>
        </button>
        <button className={`format-button ${align === 'center' ? 'active' : ''}`} onClick={() => handleAlignChange('Center')}>
          <span className="align-center-icon"></span>
        </button>
        <button className={`format-button ${align === 'right' ? 'active' : ''}`} onClick={() => handleAlignChange('Right')}>
          <span className="align-right-icon"></span>
        </button>
        <button className={`format-button ${align === 'justify' ? 'active' : ''}`} onClick={() => handleAlignChange('Full')}>
          <span className="align-justify-icon"></span>
        </button>
        <label htmlFor="color-picker" className="color-picker-label">
          <span className="color-picker">A</span> {/* 아이콘으로 A 표시 */}
        </label>
        <input type="color" id="color-picker" value={color} onChange={handleColorChange} className="color-picker-input" style={{ display: 'none' }} />
      </div>
      <div
        contentEditable
        ref={editorRef}
        className="text-editor"
        style={{
          fontSize: `${fontSize}px`,
          fontFamily: fontFamily,
          fontWeight: bold ? 'bold' : 'normal',
          fontStyle: italic ? 'italic' : 'normal',
          textDecoration: underline ? 'underline' : 'none',
          color: color,
          textAlign: align,
          direction: 'ltr' // 왼쪽에서 오른쪽으로 입력되도록 설정
        }}
        onInput={handleEditorChange}
      />
    </div>
  );
};

export default TextEditor;