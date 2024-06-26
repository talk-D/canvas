import React, { useState } from 'react';

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
      <div className="image-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px' }}>
        <div className="image-box upload-box" style={{ border: '1px solid #ccc', textAlign: 'center', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80px', height: '80px' }}>
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
            style={{ border: '1px solid #ccc', borderRadius: '10px', width: '80px', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            onClick={() => onImageClick(image)}
          >
            {image && <img src={image} alt={`upload-${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;