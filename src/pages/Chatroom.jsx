import React from 'react';
import { Themeguide } from '../headers/Themeguide.jsx';
import {Phone_cmp} from '../icons/ChatroomIcon.jsx';
import '../styles/Chatroom.css';


function Chatroom() {
    const handleChatroomButton = () => {
        window.location.href = "/step2/Notification";
    };

    return (
        <div className='wrap'>
            <Themeguide />
            <div className='background1'>

                <div className='phone'>
                <Phone_cmp />
                </div>

            </div>
            <div className='footer'>
                <div className='step1-button' onClick={handleChatroomButton}>다음</div>
            </div>

        </div>



    );
}
export default Chatroom;