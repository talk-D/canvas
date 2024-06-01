import React from 'react';
import { Themeguide } from '../headers/Themeguide.jsx';
import Theme from './Theme.jsx';
import CanvasComponent from '../components/CanvasComponent.jsx';


function Thumbnail() {

    const handleThumbnailButton = () => {
        window.location.href = "/step2/Password";
    };


    return (
        <div className='wrap'>
            <div className='menu-section'>
                <Themeguide />
            </div>
            {/*<Theme />*/}

            <CanvasComponent />

            <div className='footer'>
                <div className='step1-button' onClick={handleThumbnailButton}>다음</div>
            </div>

        </div>



    );
}
export default Thumbnail;