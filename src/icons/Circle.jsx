
const Circle = ({color}) => {
    return(
        <svg width="50" height="50" viewBox="0 0 50 50" fill={color} xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1104_4)">
        <path d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z" />
        </g>
        <defs>
        <clipPath id="clip0_1104_4">
        <rect width="50" height="50"/>
        </clipPath>
        </defs>
        </svg>
);
}

export default Circle;