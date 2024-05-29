import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/TextEditor.css'; // 스타일 파일을 import 합니다.

const TextEditor = ({ onSave }) => {
  const [editorState, setEditorState] = useState('');
  const quillRef = useRef(null);

  const handleEditorChange = (value) => {
    setEditorState(value);
  };

  const handleSaveClick = () => {
    if (onSave) {
      onSave(editorState);
      setEditorState(''); // 저장 후 입력 필드를 비웁니다.
    }
  };

  useEffect(() => {
    const quill = quillRef.current.getEditor();
    const handleTextChange = (delta, oldDelta, source) => {
      if (source === 'user') {
        const range = quill.getSelection();
        if (range) {
          // 필요한 경우 여기에서 스타일을 적용할 수 있습니다.
        }
      }
    };

    quill.on('text-change', handleTextChange);
    return () => {
      quill.off('text-change', handleTextChange);
    };
  }, []);

  const modules = {
    toolbar: [
      [{ 'font': ['ChosunGs', 'Noto Sans KR', 'Roboto', 'Open Sans', 'Arial', 'serif', 'monospace'] }, { 'size': [] }],
      [{ 'align': [] }],
      ['bold', 'italic', 'underline'],
      [{ 'color': [] }, { 'background': [] }],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean']  // remove formatting button
    ]
  };

  const formats = [
    'font', 'size', 'align',
    'bold', 'italic', 'underline',
    'color', 'background',
    'blockquote', 'code-block',
    'list', 'bullet'
  ];

  return (
    <div className="editor-wrapper">
      <div className="editor-container">
        <div className="custom-toolbar">
          <span>텍스트 추가 +</span>
          <button onClick={handleSaveClick} style={{ marginLeft: '10px' }}>저장</button>
        </div>
        <ReactQuill
          ref={quillRef}
          value={editorState}
          onChange={handleEditorChange}
          modules={modules}
          formats={formats}
          style={{
            height: '300px' // 텍스트 에디터 높이를 줄입니다.
          }}
        />
      </div>
    </div>
  );
};

export default TextEditor;