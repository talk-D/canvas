import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

export const mergeSvgWithImage = async (SvgComponent, svgProps, imgSrc, imgX, imgY, imgWidth, imgHeight) => {
    try {
        const svgString = renderToStaticMarkup(<SvgComponent {...svgProps} />);
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);

        return new Promise((resolve, reject) => {
            const svgImg = new Image();
            svgImg.onload = () => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = svgImg.width;
                    canvas.height = svgImg.height;
                    const ctx = canvas.getContext('2d');

                    ctx.drawImage(svgImg, 0, 0);

                    // 이미지 비율 계산
                    const imgRatio = img.width / img.height;
                    const canvasRatio = imgWidth / imgHeight;

                    let drawWidth, drawHeight;
                    if (imgRatio > canvasRatio) {
                        drawWidth = imgWidth;
                        drawHeight = imgWidth / imgRatio;
                    } else {
                        drawHeight = imgHeight;
                        drawWidth = imgHeight * imgRatio;
                    }

                    const drawX = imgX + (imgWidth - drawWidth) / 2;
                    const drawY = imgY + (imgHeight - drawHeight) / 2;

                    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
                    canvas.toBlob((blob) => {
                        console.log('Blob created:', blob);
                        resolve(blob);
                    }, 'image/png');
                };
                img.onerror = (err) => {
                    console.error('Error loading image:', err);
                    reject(err);
                };
                img.src = imgSrc;
            };
            svgImg.onerror = (err) => {
                console.error('Error loading SVG image:', err);
                reject(err);
            };
            svgImg.src = svgUrl;
        });
    } catch (error) {
        console.error('Error in mergeSvgWithImage:', error);
    }
};
