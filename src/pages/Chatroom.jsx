import React, {useEffect, useRef, useState} from 'react';
import { Themeguide } from '../headers/Themeguide.jsx';
import '../styles/Chatroom.css';
import {
    Chatroom_bg_color_cmp,
    Chatroom_title_color_cmp,
    Chatroom_name_color_cmp,
    Chatroom_receive_bg1_color_cmp,
    Chatroom_receive_bg2_color_cmp,
    Chatroom_receive_unread_text_color_cmp,
    Chatroom_send_bg1_color_cmp,
    Chatroom_send_bg2_color_cmp,
    Chatroom_send_unread_text_color_cmp,
    Chatroom_input_bg_color_cmp,
    Chatroom_set_profile_color_cmp
} from '../icons/ChatroomIcon.jsx';
import {SketchPicker} from "react-color";


function Chatroom() {

    const [isOpen, setIsOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(null);

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


    // 바뀔 컨포넌트 말고, 이전에 색상 설정해둔 컴포넌트
    // 기본 프로필 색상
    const [chatroomSetProfileColor, setChatroomSetProfileColor] = useState(localStorage.getItem("friendlistProfileColor"));

    const handleChangeChatroomBgColor = (color) => {
        setChatroomBgColor(color.hex);
    }

    const handleChangeChatroomTitleColor = (color) => {
        setChatroomTitleColor(color.hex);
    }

    const handleChangeChatroomNameColor = (color) => {
        setChatroomNameColor(color.hex);
    }

    const handleChangeChatroomReceiveBg1Color = (color) => {
        setChatroomReceiveBg1Color(color.hex);
    }

    const   handleChangeChatroomReceiveTextColor = (color) => {
        setChatroomReceiveTextColor(color.hex);
    }

    const handleChangeChatroomReceiveBg2Color = (color) => {
        setChatroomReceiveBg2Color(color.hex);
    }

    const handleChangeChatroomReceiveUnreadTextColor = (color) => {
        setChatroomReceiveUnreadTextColor(color.hex);
    }

    const handleChangeChatroomSendBg1Color = (color) => {
        setChatroomSendBg1Color(color.hex);
    }
    const handleChangeChatroomSendTextColor = (color) => {
        setChatroomSendTextColor(color.hex);
    }
    const handleChangeChatroomSendBg2Color = (color) => {
        setChatroomSendBg2Color(color.hex);
    }

    const handleChangeChatroomSendUnreadTextColor = (color) => {
        setChatroomSendUnreadTextColor(color.hex);
    }

    const handleChangeChatroomInputBgColor = (color) => {
        setChatroomInputBgColor(color.hex);
    }

    const handleChangeChatroomInputIconColor = (color) => {
        setChatroomInputIconColor(color.hex);
    }



    const handleChatroomButton = () => {
        window.location.href = "/step2/Notification";
    };

    return (
        <div className='wrap'>
            <Themeguide />
            <div className='background'>

                <div className='info-wrap' ref={menuRef}>
                    {isOpen && (
                        <div className="drawer">
                            {activeButton === 'chatroom_bg_color_set' && (
                                <SketchPicker color={chatroomBgColor} onChangeComplete={handleChangeChatroomBgColor} />
                            )}
                            {activeButton === 'chatroom_title_color_set' && (
                                <SketchPicker color={chatroomTitleColor} onChangeComplete={handleChangeChatroomTitleColor} />
                            )}
                            {activeButton === 'chatroom_name_color_set' && (
                                <SketchPicker color={chatroomNameColor} onChangeComplete={handleChangeChatroomNameColor} />
                            )}
                            {activeButton === 'chatroom_receive_bg1_color_set' && (
                                <>
                                <SketchPicker color={chatroomReceiveBg1Color} onChangeComplete={handleChangeChatroomReceiveBg1Color} />
                                <SketchPicker color={chatroomReceiveTextColor} onChangeComplete={handleChangeChatroomReceiveTextColor} />
                                    <SketchPicker color={chatroomReceiveUnreadTextColor} onChangeComplete={handleChangeChatroomReceiveUnreadTextColor} />

                                </>
                            )}
                            {activeButton === 'chatroom_receive_bg2_color_set' && (
                                <SketchPicker color={chatroomReceiveBg2Color} onChangeComplete={handleChangeChatroomReceiveBg2Color} />
                            )}


                            {activeButton === 'chatroom_send_bg1_color_set' && (
                                <SketchPicker color={chatroomSendBg1Color} onChangeComplete={handleChangeChatroomSendBg1Color} />
                            )}
                            {activeButton === 'chatroom_send_bg2_color_set' && (
                                <>
                                <SketchPicker color={chatroomSendBg2Color} onChangeComplete={handleChangeChatroomSendBg2Color} />
                                <SketchPicker color={chatroomSendTextColor} onChangeComplete={handleChangeChatroomSendTextColor} />
                                    <SketchPicker color={chatroomSendUnreadTextColor} onChangeComplete={handleChangeChatroomSendUnreadTextColor} />
                                </>
                            )}

                            {activeButton === 'chatroom_input_bg_color_set' && (
                                <>
                                <SketchPicker color={chatroomInputBgColor} onChangeComplete={handleChangeChatroomInputBgColor} />
                                <SketchPicker color={chatroomInputIconColor} onChangeComplete={handleChangeChatroomInputIconColor} />
                                    )
                                </>
                            )}

                        </div>
                    )}
                </div>

                <div className='chatroom-zone'>
                    <div className='chatroom_bg_color'>
                        <Chatroom_bg_color_cmp chatroomBgColor={chatroomBgColor}/>
                    </div>

                    <div className='chatroom_title_color'>
                        <Chatroom_title_color_cmp chatroomTitleColor={chatroomTitleColor}/>
                    </div>


                    <div className='chatroom_name_color'>
                        <Chatroom_name_color_cmp chatroomNameColor={chatroomNameColor}/>
                    </div>

                    <div className='chatroom_receive_bg1_color'>
                        <Chatroom_receive_bg1_color_cmp chatroomReceiveBg1Color={chatroomReceiveBg1Color}
                                                        chatroomReceiveTextColor={chatroomReceiveTextColor}/>
                    </div>

                    <div className='chatroom_receive_bg2_color'>
                        <Chatroom_receive_bg2_color_cmp chatroomReceiveBg2Color={chatroomReceiveBg2Color}
                                                        chatroomReceiveTextColor={chatroomReceiveTextColor}/>
                    </div>

                    <div className='chatroom_receive_unread_text_color'>
                        <Chatroom_receive_unread_text_color_cmp chatroomReceiveUnreadTextColor={chatroomReceiveUnreadTextColor}/>
                    </div>


                    <div className='chatroom_send_bg1_color'>
                        <Chatroom_send_bg1_color_cmp chatroomSendBg1Color={chatroomSendBg1Color}
                                                     chatroomSendTextColor={chatroomSendTextColor}/>
                    </div>
                    <div className='chatroom_send_bg2_color'>
                        <Chatroom_send_bg2_color_cmp chatroomSendBg2Color={chatroomSendBg2Color}
                                                     chatroomSendTextcolor={chatroomSendTextColor}/>
                    </div>
                    <div className='chatroom_send_unread_text_color'>
                        <Chatroom_send_unread_text_color_cmp chatroomSendUnreadTextColor={chatroomSendUnreadTextColor}/>
                    </div>
                    <div className='chatroom_input_bg_color'>
                        <Chatroom_input_bg_color_cmp chatroomInputBgColor={chatroomInputBgColor}
                                                     chatroomInputIconColor={chatroomInputIconColor}/>
                    </div>

                    <div className='chatroom_set_profile_color'>
                        <Chatroom_set_profile_color_cmp chatroomSetProfileColor={chatroomSetProfileColor}/>
                    </div>

                </div>

                <div className='chatroom_setting_zone'>
                    <div className='chatroom_bg_color_set'>
                        <img onClick={(event) => toggleMenu(event, 'chatroom_bg_color_set')} alt='채팅방1 색상 버튼 미선택' src={activeButton === 'chatroom_bg_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                    </div>

                    <div className='chatroom_title_color_set'>
                        <img onClick={(event) => toggleMenu(event, 'chatroom_title_color_set')} alt='채팅방1 색상 버튼 미선택' src={activeButton === 'chatroom_title_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                    </div>

                    <div className='chatroom_name_color_set'>
                        <img onClick={(event) => toggleMenu(event, 'chatroom_name_color_set')} alt='채팅방1 색상 버튼 미선택' src={activeButton === 'chatroom_name_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                    </div>

                    <div className='chatroom_receive_bg1_color_set'>
                        <img onClick={(event) => toggleMenu(event, 'chatroom_receive_bg1_color_set')} alt='채팅방1 색상 버튼 미선택' src={activeButton === 'chatroom_receive_bg1_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                    </div>

                    <div className='chatroom_receive_bg2_color_set'>
                        <img onClick={(event) => toggleMenu(event, 'chatroom_receive_bg2_color_set')} alt='채팅방1 색상 버튼 미선택' src={activeButton === 'chatroom_receive_bg2_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                    </div>


                    <div className='chatroom_send_bg1_color_set'>
                        <img onClick={(event) => toggleMenu(event, 'chatroom_send_bg1_color_set')} alt='채팅방1 색상 버튼 미선택' src={activeButton === 'chatroom_send_bg1_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                    </div>
                    <div className='chatroom_send_bg2_color_set'>
                        <img onClick={(event) => toggleMenu(event, 'chatroom_send_bg2_color_set')} alt='채팅방1 색상 버튼 미선택' src={activeButton === 'chatroom_send_bg2_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                    </div>

                    <div className='chatroom_input_bg_color_set'>
                        <img onClick={(event) => toggleMenu(event, 'chatroom_input_bg_color_set')} alt='채팅방1 색상 버튼 미선택' src={activeButton === 'chatroom_input_bg_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                    </div>


                </div>



            </div>
            <div className='footer'>
                <div className='step1-button' onClick={handleChatroomButton}>다음</div>
            </div>

        </div>



    );
}
export default Chatroom;