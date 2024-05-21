import React from 'react';
import { Themeguide } from '../header/Themeguide.jsx';
import Theme from './Theme.jsx';


function Tabbar() {
    const handleTabberButton = () => {

        const themeType = localStorage.getItem("themeType");
        switch (themeType) {
            case "1":
                window.location.href = "/step2/Chatroom";
                break;
            case "2":
                window.location.href = "/step2/CharacterChatroom";
                break;
            default:
                // Handle the case where themeType is missing or invalid
                console.warn("오류 발생! 처음부터 다시 시작해주세요.");
                break;
        }
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