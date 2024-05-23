import React from 'react';
import { Themeguide } from '../header/Themeguide.jsx';
import Theme from './Theme.jsx';
import CanvasComponent from './CanvasComponent.jsx';


function Thumbnail() {

    const handleThumbnailButton = () => {
        window.location.href = "/step2/Password";
    };


    return (
        <div className='wrap'>
            <Themeguide />
            {/*<Theme />*/}
            <CanvasComponent />
            <div className='footer'>
                <div className='step1-button' onClick={handleThumbnailButton}>다음</div>
            </div>

        </div>



    );
}
export default Thumbnail;