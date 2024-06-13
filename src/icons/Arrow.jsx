import React, { useEffect } from 'react';

const Arrow = ({color}) => {
    return(
        <svg width="50" height="50" viewBox="0 0 50 50" fill={color} xmlns="http://www.w3.org/2000/svg">
        <path d="M29.1665 20.833V14.583L35.4165 8.33301V14.583H41.6665L35.4165 20.833H29.1665ZM29.1665 20.833L10.4165 39.583M10.4165 39.583V31.2497M10.4165 39.583H18.7498" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        
);
}

export default Arrow;