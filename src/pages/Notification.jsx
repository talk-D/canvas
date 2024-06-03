import React, {useEffect, useRef, useState} from 'react';
import { Themeguide } from '../headers/Themeguide.jsx';
import {Notification_bg_color_cmp} from "../icons/NotificationIcon";
import '../styles/Notification.css';
import {SketchPicker} from "react-color";
import MakeTheme from "../function/MakeTheme.jsx";




function Notification() {

    const [isOpen, setIsOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(null);

    const [notificationBgColor, setNotificationBgColor] = useState(localStorage.getItem("notificationBgColor"));
    const [notificationNameColor, setNotificationNameColor] = useState(localStorage.getItem("notificationNameColor"));
    const [notificationMessageColor, setNotificationMessageColor] = useState(localStorage.getItem("notificationMessageColor"));

    const toggleMenu = (event, buttonId) => {
        setIsOpen(!isOpen);
        setActiveButton(isOpen ? null : buttonId);
    };

    const menuRef = useRef(null);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
            setActiveButton(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleChangeNotificationBgColor = (color) => {
        setNotificationBgColor(color.hex);
    }

    const handleChangeNotificationNameColor = (color) => {
        setNotificationNameColor(color.hex);
    }

    const handleChangeNotificationMessageColor = (color) => {
        setNotificationMessageColor(color.hex);
    }

    const handleNotificationButton = async () => {
        // 로컬스토리지에 색상값 저장
        localStorage.setItem("notificationBgColor", notificationBgColor);
        localStorage.setItem("notificationNameColor", notificationNameColor);
        localStorage.setItem("notificationMessageColor", notificationMessageColor);


        await MakeTheme();
        window.location.href = "/Step3";
    };



    return (
        <div className='wrap'>
            <Themeguide />
            <div className='background'>
                <div className='info-wrap' ref={menuRef}>
                    {isOpen && (
                        <div className="drawer">
                            {activeButton === 'notification_bg_color_set' && (
                                <SketchPicker color={notificationBgColor} onChangeComplete={handleChangeNotificationBgColor} />
                            )}
                            {activeButton === 'notification_name_color_set' && (
                                <SketchPicker color={notificationNameColor} onChangeComplete={handleChangeNotificationNameColor} />
                            )}
                            {activeButton === 'notification_message_color_set' && (
                                <SketchPicker color={notificationMessageColor} onChangeComplete={handleChangeNotificationMessageColor} />
                            )}
                        </div>
                    )}


                            <div className='notification_zone'>
                                <div className='notification_bg_color'>
                                    <Notification_bg_color_cmp
                                        notificationBgColor={notificationBgColor}
                                        notificationNameColor={notificationNameColor}
                                        notificationMessageColor={notificationMessageColor}/>
                                </div>
                            </div>



                <div className='notification_setting_zone'>
                    <div className='notification_bg_color_set'>
                        <img onClick={(event) => toggleMenu(event, 'notification_bg_color_set')} alt='알림창 색상 버튼 미선택' src={activeButton === 'notification_bg_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                    </div>

                    <div className='notification_name_color_set'>
                        <img onClick={(event) => toggleMenu(event, 'notification_name_color_set')} alt='알림창 색상 버튼 미선택' src={activeButton === 'notification_name_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                    </div>

                    <div className='notification_message_color_set'>
                        <img onClick={(event) => toggleMenu(event, 'notification_message_color_set')} alt='알림창 색상 버튼 미선택' src={activeButton === 'notification_message_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                    </div>
                </div>
                </div>
            </div>

            <div className='footer'>
                <div className='step1-button' onClick={handleNotificationButton}>다음</div>
            </div>

        </div>



    );
}
export default Notification;