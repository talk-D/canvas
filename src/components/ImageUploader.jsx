import React, { useState } from 'react';
import '../styles/ImageUploader.css';

const ImageUploader = ({ onImageClick }) => {
  const [images, setImages] = useState(Array(9).fill(null));

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const newImages = Array.from(files).map(file => URL.createObjectURL(file));

    const updatedImages = [...images];
    let index = 1; // 첫 번째 칸은 '업로드 +'이므로 1부터 시작

    for (let i = 1; i < updatedImages.length; i++) {
      if (updatedImages[i] === null && index <= newImages.length) {
        updatedImages[i] = newImages[index - 1];
        index++;
      }
    }
    setImages(updatedImages);
  };

  return (
    <div className="image-uploader">
      <div className="image-grid">
        <div className="image-box upload-box">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            id="file-upload"
          />
          <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>업로드 +</label>
        </div>
        {images.slice(1).map((image, index) => (
          <div
            key={index + 1} // 첫 번째 칸을 건너뛰므로 index + 1
            className="image-box"
            onClick={() => onImageClick(image)}
          >
            {image && <img src={image} alt={`upload-${index}`} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
