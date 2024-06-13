import React, {useEffect, useRef, useState} from 'react';
import { Themeguide } from '../headers/Themeguide.jsx';
import {Character_notification_bg_color_cmp,
    Notification_character_chatroom_receive_img_cmp,
    Notification_character_chatroom_send_img_cmp}
    from "../icons/CharacterNotificationIcon";

import '../styles/CharacterNotification.css';
import {SketchPicker} from "react-color";
import MakeTheme from "../function/MakeTheme";




function CharacterNotification() {

    const [isOpen, setIsOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(null);

    const [notificationBgColor, setNotificationBgColor] = useState(localStorage.getItem("notificationBgColor"));
    const [notificationNameColor, setNotificationNameColor] = useState(localStorage.getItem("notificationNameColor"));
    const [notificationMessageColor, setNotificationMessageColor] = useState(localStorage.getItem("notificationMessageColor"));


    //이전 테마 디자인 기록
    const [characterChatroomBgColor, setCharacterChatroomBgColor] = useState(localStorage.getItem("characterChatroomBgColor"));
    const [characterChatroomTitleColor, setCharacterChatroomTitleColor] = useState(localStorage.getItem("characterChatroomTitleColor"));
    const [characterChatroomNameColor, setCharacterChatroomNameColor] = useState(localStorage.getItem("characterChatroomNameColor"));
    const [characterChatroomReceiveBg1Color, setCharacterChatroomReceiveBg1Color] = useState(localStorage.getItem("characterChatroomReceiveBg1Color"));
    const [characterChatroomReceiveBg2Color, setCharacterChatroomReceiveBg2Color] = useState(localStorage.getItem("characterChatroomReceiveBg2Color"));
    const [characterChatroomReceiveTextColor, setCharacterChatroomReceiveTextColor] = useState(localStorage.getItem("characterChatroomReceiveTextColor"));
    const [characterChatroomReceiveUnreadTextColor, setCharacterChatroomReceiveUnreadTextColor] = useState(localStorage.getItem("characterChatroomReceiveUnreadTextColor"));
    const [characterChatroomSendBg1Color, setCharacterChatroomSendBg1Color] = useState(localStorage.getItem("characterChatroomSendBg1Color"));
    const [characterChatroomSendBg2Color, setCharacterChatroomSendBg2Color] = useState(localStorage.getItem("characterChatroomSendBg2Color"));
    const [characterChatroomSendTextColor, setCharacterChatroomSendTextColor] = useState(localStorage.getItem("characterChatroomSendTextColor"));
    const [characterChatroomSendUnreadTextColor, setCharacterChatroomSendUnreadTextColor] = useState(localStorage.getItem("characterChatroomSendUnreadTextColor"));
    const [characterChatroomInputBgColor, setCharacterChatroomInputBgColor] = useState(localStorage.getItem("characterChatroomInputBgColor"));
    const [characterChatroomInputIconColor, setCharacterChatroomInputIconColor] = useState(localStorage.getItem("characterChatroomInputIconColor"));
    const [friendlistProfileColor, setFriendlistProfileColor] = useState(localStorage.getItem("friendlistProfileColor"));

    const getLocalStorageItem = (key) => {
        const item = localStorage.getItem(key);
        return item === 'null' ? null : item;
    };

    const [characterChatroomReceiveImg, setCharacterChatroomReceiveImg] = useState(getLocalStorageItem('characterChatroomReceiveImg'));
    const [characterChatroomSendImg, setCharacterChatroomSendImg] = useState(getLocalStorageItem('characterChatroomSendImg'));


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
                                <>
                                <div className='colorpick-info-title'>알림창 배경 색상</div>
                                <SketchPicker color={notificationBgColor} onChangeComplete={handleChangeNotificationBgColor} />
                                </>
                                )}
                            {activeButton === 'notification_name_color_set' && (
                                <>
                                <div className='colorpick-info-title'>알림창 이름 색상</div>
                                <SketchPicker color={notificationNameColor} onChangeComplete={handleChangeNotificationNameColor} />
                                </>
                            )}
                            {activeButton === 'notification_message_color_set' && (
                                <>
                                <div className='colorpick-info-title'>알림창 메세지 색상</div>
                                <SketchPicker color={notificationMessageColor} onChangeComplete={handleChangeNotificationMessageColor} />
                                </>
                            )}
                        </div>
                    )}


                    <div className='notification_zone'>
                        <div className='notification_bg_color'>
                            <Character_notification_bg_color_cmp
                                notificationBgColor={notificationBgColor}
                                notificationNameColor={notificationNameColor}
                                notificationMessageColor={notificationMessageColor}
                                characterChatroomBgColor={characterChatroomBgColor}
                                characterChatroomTitleColor={characterChatroomTitleColor}
                                characterChatroomNameColor={characterChatroomNameColor}
                                characterChatroomReceiveBg1Color={characterChatroomReceiveBg1Color}
                                characterChatroomReceiveBg2Color={characterChatroomReceiveBg2Color}
                                characterChatroomReceiveTextColor={characterChatroomReceiveTextColor}
                                characterChatroomReceiveUnreadTextColor={characterChatroomReceiveUnreadTextColor}
                                characterChatroomSendBg1Color={characterChatroomSendBg1Color}
                                characterChatroomSendBg2Color={characterChatroomSendBg2Color}
                                characterChatroomSendTextColor={characterChatroomSendTextColor}
                                characterChatroomSendUnreadTextColor={characterChatroomSendUnreadTextColor}
                                characterChatroomInputBgColor={characterChatroomInputBgColor}
                                characterChatroomInputIconColor={characterChatroomInputIconColor}
                                friendlistProfileColor={friendlistProfileColor}
                            />
                        </div>

                        <div className='notification_character_chatroom_receive_img'>
                            <Notification_character_chatroom_receive_img_cmp src={characterChatroomReceiveImg} />
                        </div>

                        <div className='notification_character_chatroom_send_img'>
                            <Notification_character_chatroom_send_img_cmp src={characterChatroomSendImg} />
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
export default CharacterNotification;