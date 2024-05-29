import React from 'react';
import { Themeguide } from '../headers/Themeguide.jsx';
import Theme from './Theme.jsx';


function Notification() {

    const handleNotificationButton = () => {
        window.location.href = "/step2/Step3";
    };

    return (
        <div className='wrap'>
            <Themeguide />
            <Theme />
            <div className='footer'>
                <div className='step1-button' onClick={handleNotificationButton}>다음</div>
            </div>

        </div>



    );
}
export default Notification;