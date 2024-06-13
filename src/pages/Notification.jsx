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


    //이전 테마 디자인 기록
    const [chatroomBgColor, setChatroomBgColor] = useState(localStorage.getItem("chatroomBgColor"));
    const [chatroomTitleColor, setChatroomTitleColor] = useState(localStorage.getItem("chatroomTitleColor"));
    const [chatroomNameColor, setChatroomNameColor] = useState(localStorage.getItem("chatroomNameColor"));
    const [chatroomReceiveBg1Color, setChatroomReceiveBg1Color] = useState(localStorage.getItem("chatroomReceiveBg1Color"));
    const [chatroomReceiveBg2Color, setChatroomReceiveBg2Color] = useState(localStorage.getItem("chatroomReceiveBg2Color"));
    const [chatroomReceiveTextColor, setChatroomReceiveTextColor] = useState(localStorage.getItem("chatroomReceiveTextColor"));
    const [chatroomReceiveUnreadTextColor, setChatroomReceiveUnreadTextColor] = useState(localStorage.getItem("chatroomReceiveUnreadTextColor"));
    const [chatroomSendBg1Color, setChatroomSendBg1Color] = useState(localStorage.getItem("chatroomSendBg1Color"));
    const [chatroomSendBg2Color, setChatroomSendBg2Color] = useState(localStorage.getItem("chatroomSendBg2Color"));
    const [chatroomSendTextColor, setChatroomSendTextColor] = useState(localStorage.getItem("chatroomSendTextColor"));
    const [chatroomSendUnreadTextColor, setChatroomSendUnreadTextColor] = useState(localStorage.getItem("chatroomSendUnreadTextColor"));
    const [chatroomInputBgColor, setChatroomInputBgColor] = useState(localStorage.getItem("chatroomInputBgColor"));
    const [chatroomInputIconColor, setChatroomInputIconColor] = useState(localStorage.getItem("chatroomInputIconColor"));
    const [friendlistProfileColor, setFriendlistProfileColor] = useState(localStorage.getItem("friendlistProfileColor"));


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


    const handleNotificationPreviousButton = () => {
        if (localStorage.getItem("themeType") == 1) {
            window.location.href = "/step2/Chatroom";
        } else if (localStorage.getItem("themeType") == 2) {
            window.location.href = "/step2/CharacterChatroom";
        }
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
                                notificationMessageColor={notificationMessageColor}
                                chatroomBgColor={chatroomBgColor}
                                chatroomTitleColor={chatroomTitleColor}
                                chatroomNameColor={chatroomNameColor}
                                chatroomReceiveBg1Color={chatroomReceiveBg1Color}
                                chatroomReceiveBg2Color={chatroomReceiveBg2Color}
                                chatroomReceiveTextColor={chatroomReceiveTextColor}
                                chatroomReceiveUnreadTextColor={chatroomReceiveUnreadTextColor}
                                chatroomSendBg1Color={chatroomSendBg1Color}
                                chatroomSendBg2Color={chatroomSendBg2Color}
                                chatroomSendTextColor={chatroomSendTextColor}
                                chatroomSendUnreadTextColor={chatroomSendUnreadTextColor}
                                chatroomInputBgColor={chatroomInputBgColor}
                                chatroomInputIconColor={chatroomInputIconColor}
                                friendlistProfileColor={friendlistProfileColor}
                            />
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
                <div className='step1-previous-button' onClick={handleNotificationPreviousButton}>이전</div>
                <div className='step1-button' onClick={handleNotificationButton}>다음</div>
            </div>

        </div>



    );
}
export default Notification;