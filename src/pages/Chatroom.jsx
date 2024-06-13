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
import {convertSvgToPng} from "../function/convertSvgToPng";
import {
    Target_chatroom_bg_color_cmp,
    Target_chatroom_receive_bg1_color_cmp,
    Target_chatroom_receive_bg2_color_cmp,
    Target_chatroom_send_bg1_color_cmp,
    Target_chatroom_send_bg2_color_cmp
} from "../icons/TargetIcon";


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

    const handleChatroomPreviousButton = () => {
        window.location.href = "/step2/tabbar";
    }

    const handleChatroomButton= async () => {

        await convertSvgToPng(Target_chatroom_receive_bg1_color_cmp, { chatroomReceiveBg1Color }, 'chatroomBubbleReceive01@3x.png');
        await convertSvgToPng(Target_chatroom_receive_bg1_color_cmp, { chatroomReceiveBg1Color }, 'chatroomBubbleReceive01Selected@3x.png');

        await convertSvgToPng(Target_chatroom_receive_bg2_color_cmp, { chatroomReceiveBg2Color }, 'chatroomBubbleReceive02@3x.png');
        await convertSvgToPng(Target_chatroom_receive_bg2_color_cmp, { chatroomReceiveBg2Color }, 'chatroomBubbleReceive02Selected@3x.png');

        await convertSvgToPng(Target_chatroom_send_bg1_color_cmp, { chatroomSendBg1Color }, 'chatroomBubbleSend01@3x.png');
        await convertSvgToPng(Target_chatroom_send_bg1_color_cmp, { chatroomSendBg1Color }, 'chatroomBubbleSend01Selected@3x.png');

        await convertSvgToPng(Target_chatroom_send_bg2_color_cmp, { chatroomSendBg2Color }, 'chatroomBubbleSend02@3x.png');
        await convertSvgToPng(Target_chatroom_send_bg2_color_cmp, { chatroomSendBg2Color }, 'chatroomBubbleSend02Selected@3x.png');

        await convertSvgToPng(Target_chatroom_bg_color_cmp, { chatroomBgColor }, 'chatroomBgImage@3x.png');



        localStorage.setItem("chatroomBgColor", chatroomBgColor);
        localStorage.setItem("chatroomTitleColor", chatroomTitleColor);
        localStorage.setItem("chatroomNameColor", chatroomNameColor);
        localStorage.setItem("chatroomReceiveTextColor", chatroomReceiveTextColor);
        localStorage.setItem("chatroomReceiveUnreadTextColor", chatroomReceiveUnreadTextColor);
        localStorage.setItem("chatroomSendTextColor", chatroomSendTextColor);
        localStorage.setItem("chatroomSendUnreadTextColor", chatroomSendUnreadTextColor);
        localStorage.setItem("chatroomInputBgColor", chatroomInputBgColor);
        localStorage.setItem("chatroomInputIconColor", chatroomInputIconColor);
        localStorage.setItem("chatroomReceiveBg1Color", chatroomReceiveBg1Color);
        localStorage.setItem("chatroomReceiveBg2Color", chatroomReceiveBg2Color);
        localStorage.setItem("chatroomSendBg1Color", chatroomSendBg1Color);
        localStorage.setItem("chatroomSendBg2Color", chatroomSendBg2Color);
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
                                <>
                                <div className='colorpick-info-title'>채팅방 배경 색상</div>
                                <SketchPicker color={chatroomBgColor} onChangeComplete={handleChangeChatroomBgColor} />
                                </>
                            )}
                            {activeButton === 'chatroom_title_color_set' && (
                                <>
                                <div className='colorpick-info-title'>채팅방 타이틀 색상</div>
                                <SketchPicker color={chatroomTitleColor} onChangeComplete={handleChangeChatroomTitleColor} />
                                </>
                            )}
                            {activeButton === 'chatroom_name_color_set' && (
                                <>
                                <div className='colorpick-info-title'>친구 이름 색상</div>
                                <SketchPicker color={chatroomNameColor} onChangeComplete={handleChangeChatroomNameColor} />
                                </>
                            )}
                            {activeButton === 'chatroom_receive_bg1_color_set' && (
                                <>
                                    <div className='colorpick-info-title'>받은 말풍선 배경 색상(1)</div>
                                <SketchPicker color={chatroomReceiveBg1Color} onChangeComplete={handleChangeChatroomReceiveBg1Color} />
                             <br/>
                                    <div className='colorpick-info-title'>받은 말풍선 글씨 색상</div>
                                <SketchPicker color={chatroomReceiveTextColor} onChangeComplete={handleChangeChatroomReceiveTextColor} />

                                </>
                            )}
                            {activeButton === 'chatroom_receive_bg2_color_set' && (
                                <>
                                    <div className='colorpick-info-title'>받은 말풍선 배경 색상(2)</div>
                                <SketchPicker color={chatroomReceiveBg2Color} onChangeComplete={handleChangeChatroomReceiveBg2Color} />
                                     <br/>
                                    <div className='colorpick-info-title'>받은 메세지 안읽음 표시 색상</div>
                <SketchPicker color={chatroomReceiveUnreadTextColor} onChangeComplete={handleChangeChatroomReceiveUnreadTextColor} />

            </>
                            )}


                            {activeButton === 'chatroom_send_bg1_color_set' && (
                                <>
                                    <div className='colorpick-info-title'>보낸 말풍선 배경 색상(1)</div>
                                <SketchPicker color={chatroomSendBg1Color} onChangeComplete={handleChangeChatroomSendBg1Color} />
                               <br/>
                                    <div className='colorpick-info-title'>보낸 말풍선 글씨 색상</div>
                                <SketchPicker color={chatroomSendTextColor} onChangeComplete={handleChangeChatroomSendTextColor} />
                                </>
                            )}
                            {activeButton === 'chatroom_send_bg2_color_set' && (
                                <>
                                    <div className='colorpick-info-title'>보낸 말풍선 배경 색상(1)</div>
                                <SketchPicker color={chatroomSendBg2Color} onChangeComplete={handleChangeChatroomSendBg2Color} />
                               <br/>
                                    <div className='colorpick-info-title'>보낸 메세지 안읽음 표시 색상</div>
                                <SketchPicker color={chatroomSendUnreadTextColor} onChangeComplete={handleChangeChatroomSendUnreadTextColor} />
                                </>
                            )}

                            {activeButton === 'chatroom_input_bg_color_set' && (
                                <>
                                    <div className='colorpick-info-title'>입력창 배경 색상</div>
                                <SketchPicker color={chatroomInputBgColor} onChangeComplete={handleChangeChatroomInputBgColor} />
                               <br/>
                                    <div className='colorpick-info-title'>입력창 아이콘 색상</div>
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
                                                     chatroomSendTextColor={chatroomSendTextColor}/>
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
                <div className='step1-previous-button' onClick={handleChatroomPreviousButton}>이전</div>
                <div className='step1-button' onClick={handleChatroomButton}>다음</div>
            </div>

        </div>



    );
}
export default Chatroom;