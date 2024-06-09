import React, {useEffect, useRef, useState} from 'react';
import { Themeguide } from '../headers/Themeguide.jsx';
import '../styles/CharacterChatroom.css';
import {
    Character_chatroom_bg_color_cmp,
    Character_chatroom_title_color_cmp,
    Character_chatroom_name_color_cmp,
    Character_chatroom_receive_bg1_color_cmp,
    Character_chatroom_receive_bg2_color_cmp,
    Character_chatroom_receive_unread_text_color_cmp,
    Character_chatroom_send_bg1_color_cmp,
    Character_chatroom_send_bg2_color_cmp,
    Character_chatroom_send_unread_text_color_cmp,
    Character_chatroom_input_bg_color_cmp,
    Character_chatroom_set_profile_color_cmp,
    Character_chatroom_receive_img_cmp,
    Character_chatroom_send_img_cmp
} from '../icons/CharacterChatroomIcon.jsx';
import {SketchPicker} from "react-color";
import {convertSvgToPng} from "../function/convertSvgToPng";
import {
    Target_character_chatroom_bg_color_cmp,
    Target_character_chatroom_receive_bg1_color_cmp,
    Target_character_chatroom_receive_bg2_color_cmp,
    Target_character_chatroom_send_bg1_color_cmp,
    Target_character_chatroom_send_bg2_color_cmp
} from "../icons/TargetIcon";


function CharacterChatroom() {

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


    // 바뀔 컨포넌트 말고, 이전에 색상 설정해둔 컴포넌트
    // 기본 프로필 색상
    const [characterChatroomSetProfileColor, setCharacterChatroomSetProfileColor] = useState(localStorage.getItem("friendlistProfileColor"));

    const handleChangeCharacterChatroomBgColor = (color) => {
        setCharacterChatroomBgColor(color.hex);
    }

    const handleChangeCharacterChatroomTitleColor = (color) => {
        setCharacterChatroomTitleColor(color.hex);
    }

    const handleChangeCharacterChatroomNameColor = (color) => {
        setCharacterChatroomNameColor(color.hex);
    }

    const handleChangeCharacterChatroomReceiveBg1Color = (color) => {
        setCharacterChatroomReceiveBg1Color(color.hex);
    }

    const   handleChangeCharacterChatroomReceiveTextColor = (color) => {
        setCharacterChatroomReceiveTextColor(color.hex);
    }

    const handleChangeCharacterChatroomReceiveBg2Color = (color) => {
        setCharacterChatroomReceiveBg2Color(color.hex);
    }

    const handleChangeCharacterChatroomReceiveUnreadTextColor = (color) => {
        setCharacterChatroomReceiveUnreadTextColor(color.hex);
    }

    const handleChangeCharacterChatroomSendBg1Color = (color) => {
        setCharacterChatroomSendBg1Color(color.hex);
    }
    const handleChangeCharacterChatroomSendTextColor = (color) => {
        setCharacterChatroomSendTextColor(color.hex);
    }
    const handleChangeCharacterChatroomSendBg2Color = (color) => {
        setCharacterChatroomSendBg2Color(color.hex);
    }

    const handleChangeCharacterChatroomSendUnreadTextColor = (color) => {
        setCharacterChatroomSendUnreadTextColor(color.hex);
    }

    const handleChangeCharacterChatroomInputBgColor = (color) => {
        setCharacterChatroomInputBgColor(color.hex);
    }

    const handleChangeCharacterChatroomInputIconColor = (color) => {
        setCharacterChatroomInputIconColor(color.hex);
    }

    const [selectedReceiveImage, setSelectedReceiveImage] = useState(null);
    const [selectedSendImage, setSelectedSendImage] = useState(null);
    const canvasRef = useRef(null);

    const handleChangeCharacterChatroomReceiveImg = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setSelectedReceiveImage(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    const handleChangeCharacterChatroomSendImg = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setSelectedSendImage(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };


    const handleCharacterChatroomPreviousButton = () => {
        window.location.href = "/step2/tabbar";
    }

    const handleCharacterChatroomButton= async () => {

        await convertSvgToPng(Target_character_chatroom_receive_bg1_color_cmp, { characterChatroomReceiveBg1Color }, 'chatroomBubbleReceive01@3x.png');
        await convertSvgToPng(Target_character_chatroom_receive_bg1_color_cmp, { characterChatroomReceiveBg1Color }, 'chatroomBubbleReceive01Selected@3x.png');

        await convertSvgToPng(Target_character_chatroom_receive_bg2_color_cmp, { characterChatroomReceiveBg2Color }, 'chatroomBubbleReceive02@3x.png');
        await convertSvgToPng(Target_character_chatroom_receive_bg2_color_cmp, { characterChatroomReceiveBg2Color }, 'chatroomBubbleReceive02Selected@3x.png');

        await convertSvgToPng(Target_character_chatroom_send_bg1_color_cmp, { characterChatroomSendBg1Color }, 'chatroomBubbleSend01@3x.png');
        await convertSvgToPng(Target_character_chatroom_send_bg1_color_cmp, { characterChatroomSendBg1Color }, 'chatroomBubbleSend01Selected@3x.png');

        await convertSvgToPng(Target_character_chatroom_send_bg2_color_cmp, { characterChatroomSendBg2Color }, 'chatroomBubbleSend02@3x.png');
        await convertSvgToPng(Target_character_chatroom_send_bg2_color_cmp, { characterChatroomSendBg2Color }, 'chatroomBubbleSend02Selected@3x.png');

        await convertSvgToPng(Target_character_chatroom_bg_color_cmp, { characterChatroomBgColor }, 'chatroomBgImage@3x.png');



        localStorage.setItem("characterChatroomBgColor", characterChatroomBgColor);
        localStorage.setItem("characterChatroomTitleColor", characterChatroomTitleColor);
        localStorage.setItem("characterChatroomNameColor", characterChatroomNameColor);
        localStorage.setItem("characterChatroomReceiveTextColor", characterChatroomReceiveTextColor);
        localStorage.setItem("characterChatroomReceiveUnreadTextColor", characterChatroomReceiveUnreadTextColor);
        localStorage.setItem("characterChatroomSendTextColor", characterChatroomSendTextColor);
        localStorage.setItem("characterChatroomSendUnreadTextColor", characterChatroomSendUnreadTextColor);
        localStorage.setItem("characterChatroomInputBgColor", characterChatroomInputBgColor);
        localStorage.setItem("characterChatroomInputIconColor", characterChatroomInputIconColor);
        localStorage.setItem("characterChatroomReceiveBg1Color", characterChatroomReceiveBg1Color);
        localStorage.setItem("characterChatroomReceiveBg2Color", characterChatroomReceiveBg2Color);
        localStorage.setItem("characterChatroomSendBg1Color", characterChatroomSendBg1Color);
        localStorage.setItem("characterChatroomSendBg2Color", characterChatroomSendBg2Color);
        window.location.href = "/step2/Notification";
    };

    return (
        <div className='wrap'>
            <Themeguide />
            <div className='background'>

                <div className='info-wrap' ref={menuRef}>
                    {isOpen && (
                        <div className="drawer">
                            {activeButton === 'character_chatroom_bg_color_set' && (
                                <SketchPicker color={characterChatroomBgColor} onChangeComplete={handleChangeCharacterChatroomBgColor} />
                            )}
                            {activeButton === 'character_chatroom_title_color_set' && (
                                <SketchPicker color={characterChatroomTitleColor} onChangeComplete={handleChangeCharacterChatroomTitleColor} />
                            )}
                            {activeButton === 'character_chatroom_name_color_set' && (
                                <SketchPicker color={characterChatroomNameColor} onChangeComplete={handleChangeCharacterChatroomNameColor} />
                            )}
                            {activeButton === 'character_chatroom_receive_bg1_color_set' && (
                                <>
                                    <SketchPicker color={characterChatroomReceiveBg1Color} onChangeComplete={handleChangeCharacterChatroomReceiveBg1Color} />
                                    <SketchPicker color={characterChatroomReceiveTextColor} onChangeComplete={handleChangeCharacterChatroomReceiveTextColor} />

                                </>
                            )}
                            {activeButton === 'character_chatroom_receive_bg2_color_set' && (
                                <>
                                    <SketchPicker color={characterChatroomReceiveBg2Color} onChangeComplete={handleChangeCharacterChatroomReceiveBg2Color} />
                                    <SketchPicker color={characterChatroomReceiveUnreadTextColor} onChangeComplete={handleChangeCharacterChatroomReceiveUnreadTextColor} />

                                </>
                            )}


                            {activeButton === 'character_chatroom_send_bg1_color_set' && (
                                <>
                                    <SketchPicker color={characterChatroomSendBg1Color} onChangeComplete={handleChangeCharacterChatroomSendBg1Color} />
                                    <SketchPicker color={characterChatroomSendTextColor} onChangeComplete={handleChangeCharacterChatroomSendTextColor} />
                                </>
                            )}
                            {activeButton === 'character_chatroom_send_bg2_color_set' && (
                                <>
                                    <SketchPicker color={characterChatroomSendBg2Color} onChangeComplete={handleChangeCharacterChatroomSendBg2Color} />
                                    <SketchPicker color={characterChatroomSendUnreadTextColor} onChangeComplete={handleChangeCharacterChatroomSendUnreadTextColor} />
                                </>
                            )}

                            {activeButton === 'character_chatroom_input_bg_color_set' && (
                                <>
                                    <SketchPicker color={characterChatroomInputBgColor} onChangeComplete={handleChangeCharacterChatroomInputBgColor} />
                                    <SketchPicker color={characterChatroomInputIconColor} onChangeComplete={handleChangeCharacterChatroomInputIconColor} />
                                    )
                                </>
                            )}

                        </div>
                    )}
                </div>

                <div className='character-chatroom-zone'>
                    <div className='character_chatroom_bg_color'>
                        <Character_chatroom_bg_color_cmp characterChatroomBgColor={characterChatroomBgColor}/>
                    </div>

                    <div className='character_chatroom_title_color'>
                        <Character_chatroom_title_color_cmp characterChatroomTitleColor={characterChatroomTitleColor}/>
                    </div>


                    <div className='character_chatroom_name_color'>
                        <Character_chatroom_name_color_cmp characterChatroomNameColor={characterChatroomNameColor}/>
                    </div>

                    <div className='character_chatroom_receive_bg1_color'>
                        <Character_chatroom_receive_bg1_color_cmp characterChatroomReceiveBg1Color={characterChatroomReceiveBg1Color}
                                                        characterChatroomReceiveTextColor={characterChatroomReceiveTextColor}/>
                    </div>

                    <div className='character_chatroom_receive_bg2_color'>
                        <Character_chatroom_receive_bg2_color_cmp characterChatroomReceiveBg2Color={characterChatroomReceiveBg2Color}
                                                        characterChatroomReceiveTextColor={characterChatroomReceiveTextColor}/>
                    </div>

                    <div className='character_chatroom_receive_unread_text_color'>
                        <Character_chatroom_receive_unread_text_color_cmp characterChatroomReceiveUnreadTextColor={characterChatroomReceiveUnreadTextColor}/>
                    </div>


                    <div className='character_chatroom_send_bg1_color'>
                        <Character_chatroom_send_bg1_color_cmp characterChatroomSendBg1Color={characterChatroomSendBg1Color}
                                                     characterChatroomSendTextColor={characterChatroomSendTextColor}/>
                    </div>
                    <div className='character_chatroom_send_bg2_color'>
                        <Character_chatroom_send_bg2_color_cmp characterChatroomSendBg2Color={characterChatroomSendBg2Color}
                                                     characterChatroomSendTextcolor={characterChatroomSendTextColor}/>
                    </div>
                    <div className='character_chatroom_send_unread_text_color'>
                        <Character_chatroom_send_unread_text_color_cmp characterChatroomSendUnreadTextColor={characterChatroomSendUnreadTextColor}/>
                    </div>
                    <div className='character_chatroom_input_bg_color'>
                        <Character_chatroom_input_bg_color_cmp characterChatroomInputBgColor={characterChatroomInputBgColor}
                                                     characterChatroomInputIconColor={characterChatroomInputIconColor}/>
                    </div>

                    <div className='character_chatroom_set_profile_color'>
                        <Character_chatroom_set_profile_color_cmp characterChatroomSetProfileColor={characterChatroomSetProfileColor}/>
                    </div>


                    <div className='character_chatroom_receive_img'>
                        <Character_chatroom_receive_img_cmp src={selectedReceiveImage} />
                    </div>

                    <div className='character_chatroom_send_img'>
                        <Character_chatroom_send_img_cmp src={selectedSendImage} />
                    </div>



                </div>

                <div className='character_chatroom_setting_zone'>
                    <div className='character_chatroom_bg_color_set'>
                        <img onClick={(event) => toggleMenu(event, 'character_chatroom_bg_color_set')} alt='채팅방1 색상 버튼 미선택' src={activeButton === 'character_chatroom_bg_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                    </div>

                    <div className='character_chatroom_title_color_set'>
                        <img onClick={(event) => toggleMenu(event, 'character_chatroom_title_color_set')} alt='채팅방1 색상 버튼 미선택' src={activeButton === 'character_chatroom_title_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                    </div>

                    <div className='character_chatroom_name_color_set'>
                        <img onClick={(event) => toggleMenu(event, 'character_chatroom_name_color_set')} alt='채팅방1 색상 버튼 미선택' src={activeButton === 'character_chatroom_name_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                    </div>

                    <div className='character_chatroom_receive_bg1_color_set'>
                        <img onClick={(event) => toggleMenu(event, 'character_chatroom_receive_bg1_color_set')} alt='채팅방1 색상 버튼 미선택' src={activeButton === 'character_chatroom_receive_bg1_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                    </div>

                    <div className='character_chatroom_receive_bg2_color_set'>
                        <img onClick={(event) => toggleMenu(event, 'character_chatroom_receive_bg2_color_set')} alt='채팅방1 색상 버튼 미선택' src={activeButton === 'character_chatroom_receive_bg2_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                    </div>


                    <div className='character_chatroom_send_bg1_color_set'>
                        <img onClick={(event) => toggleMenu(event, 'character_chatroom_send_bg1_color_set')} alt='채팅방1 색상 버튼 미선택' src={activeButton === 'character_chatroom_send_bg1_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                    </div>
                    <div className='character_chatroom_send_bg2_color_set'>
                        <img onClick={(event) => toggleMenu(event, 'character_chatroom_send_bg2_color_set')} alt='채팅방1 색상 버튼 미선택' src={activeButton === 'character_chatroom_send_bg2_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                    </div>

                    <div className='character_chatroom_input_bg_color_set'>
                        <img onClick={(event) => toggleMenu(event, 'character_chatroom_input_bg_color_set')} alt='채팅방1 색상 버튼 미선택' src={activeButton === 'character_chatroom_input_bg_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                    </div>

                    <div className='character_chatroom_receive_img_set' onClick={handleChangeCharacterChatroomReceiveImg}>
                        <img alt='채팅방2 색상 버튼 미선택' src="/plusIcon.png"/>
                    </div>

                    <div className='character_chatroom_send_img_set' onClick={handleChangeCharacterChatroomSendImg}>
                        <img alt='채팅방2 색상 버튼 미선택' src="/plusIcon.png"/>
                    </div>



                </div>



            </div>
            <div className='footer'>
                <div className='step1-previous-button' onClick={handleCharacterChatroomPreviousButton}>이전</div>
                <div className='step1-button' onClick={handleCharacterChatroomButton}>다음</div>
            </div>

        </div>



    );
}
export default CharacterChatroom;