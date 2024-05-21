import React from 'react';
import { Themeguide } from '../header/Themeguide.jsx';
import Theme from './Theme.jsx';


function Friendlist() {

    const handleFriendlistButton = () => {
        window.location.href = "/step2/Tabbar";
    };

    return (
        <div className='wrap'>
            <Themeguide />
            <Theme />
            <div className='footer'>
                <div className='step1-button' onClick={handleFriendlistButton}>다음</div>
            </div>

        </div>



    );
}
export default Friendlist;