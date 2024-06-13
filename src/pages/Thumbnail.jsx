import React, { useRef } from 'react';
import { Themeguide } from '../headers/Themeguide.jsx';
import CanvasComponent from '../components/CanvasComponent.jsx';

function Thumbnail() {
    const canvasRef = useRef(null);

    const handleThumbnailPreviousButton = () => {
        window.location.href = "/step1";
    };

    const handleThumbnailButton = async () => {
        const canvas = canvasRef.current.getCanvas();
        if (!canvas) {
            console.error('Canvas element not found');
            return;
        }

        const resizedCanvas = document.createElement('canvas');
        resizedCanvas.width = 162;
        resizedCanvas.height = 162;
        const context = resizedCanvas.getContext('2d');
        context.drawImage(canvas, 0, 0, 162, 162);

        const dataURL = resizedCanvas.toDataURL('image/png');
        const response = await fetch('/saveThumbnail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: dataURL }),
        });

        if (response.ok) {
            window.location.href = "/step2/Password";
        } else {
            console.error('Failed to save image');
        }
    };

    return (
        <div className='wrap'>
            <Themeguide />
            <CanvasComponent ref={canvasRef} />
            <div className='footer'>
                <div className='step1-previous-button' onClick={handleThumbnailPreviousButton}>이전</div>
                <div className='step1-button' onClick={handleThumbnailButton}>다음</div>
            </div>
        </div>
    );
}

export default Thumbnail;
