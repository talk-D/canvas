// colorUtils.js

export function hexToRgb(hex) {
    let bigint = parseInt(hex.substring(1), 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return [r, g, b];
}

export function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

export function addColor(hex1, hex2) {
    let rgb1 = hexToRgb(hex1);
    let rgb2 = hexToRgb(hex2);

    let r = Math.min(255, rgb1[0] + rgb2[0]);
    let g = Math.min(255, rgb1[1] + rgb2[1]);
    let b = Math.min(255, rgb1[2] + rgb2[2]);

    return rgbToHex(r, g, b);
}
