import React, { useEffect } from 'react';

const Rect = ({color}) => {
    return(
        <svg width="50" height="50" viewBox="0 0 50 50" fill={color} xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1104_2)">
        <path d="M0 0H50V50H0V0Z" />
        </g>
        <defs>
        <clipPath id="clip0_1104_2">
        <rect width="50" height="50" />
        </clipPath>
        </defs>
        </svg>


  
);
}

export default Rect;