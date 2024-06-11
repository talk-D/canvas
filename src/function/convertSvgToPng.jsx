import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { svgToPng } from './svgToPng';

export const convertSvgToPng = async (Component, props, filename) => {
    const svgString = renderToStaticMarkup(<Component {...props} />);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();

    return new Promise((resolve, reject) => {
        img.onload = async () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
                svgToPng(blob, filename);
                resolve();
            });
        };
        img.onerror = reject;
        img.src = url;
    });
};
