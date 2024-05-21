import React from 'react';
import { Themeguide } from '../header/Themeguide.jsx';
import Theme from './Theme.jsx';


function Chatroom() {
    const handleChatroomButton = () => {
        window.location.href = "/step2/Notification";
    };

    return (
        <div className='wrap'>
            <Themeguide />
            <Theme />
            <div className='footer'>
                <div className='step1-button' onClick={handleChatroomButton}>다음</div>
            </div>

        </div>



    );
}
export default Chatroom;