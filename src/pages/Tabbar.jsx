import React from 'react';
import { Themeguide } from '../header/Themeguide.jsx';
import Theme from './Theme.jsx';


function Tabbar() {
    const handleTabberButton = () => {
        window.location.href = "/step2/Chatroom";
    };

    return (
        <div className='wrap'>
            <Themeguide />
            <Theme />
            <div className='footer'>
                <div className='step1-button' onClick={handleTabberButton}>다음</div>
            </div>

        </div>



    );
}
export default Tabbar;