import React, { useEffect, useRef, useState } from 'react';
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
import { SketchPicker } from 'react-color';
import { convertSvgToPng } from '../function/convertSvgToPng';
import {
    Target_character_chatroom_bg_color_cmp,
    Target_character_chatroom_receive_bg1_color_cmp,
    Target_character_chatroom_receive_bg2_color_cmp,
    Target_character_chatroom_send_bg1_color_cmp,
    Target_character_chatroom_send_bg2_color_cmp
} from '../icons/TargetIcon';
import axios from 'axios';
import { mergeSvgWithImage } from '../function/mergeSvgWithImage.jsx';

function CharacterChatroom() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(null);

    const toggleMenu = (buttonId) => {
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

    const [characterChatroomBgColor, setCharacterChatroomBgColor] = useState(localStorage.getItem('characterChatroomBgColor') || '#ffffff');
    const [characterChatroomTitleColor, setCharacterChatroomTitleColor] = useState(localStorage.getItem('characterChatroomTitleColor') || '#000000');
    const [characterChatroomNameColor, setCharacterChatroomNameColor] = useState(localStorage.getItem('characterChatroomNameColor') || '#000000');
    const [characterChatroomReceiveBg1Color, setCharacterChatroomReceiveBg1Color] = useState(localStorage.getItem('characterChatroomReceiveBg1Color') || '#ffffff');
    const [characterChatroomReceiveBg2Color, setCharacterChatroomReceiveBg2Color] = useState(localStorage.getItem('characterChatroomReceiveBg2Color') || '#ffffff');
    const [characterChatroomReceiveTextColor, setCharacterChatroomReceiveTextColor] = useState(localStorage.getItem('characterChatroomReceiveTextColor') || '#000000');
    const [characterChatroomReceiveUnreadTextColor, setCharacterChatroomReceiveUnreadTextColor] = useState(localStorage.getItem('characterChatroomReceiveUnreadTextColor') || '#000000');
    const [characterChatroomSendBg1Color, setCharacterChatroomSendBg1Color] = useState(localStorage.getItem('characterChatroomSendBg1Color') || '#ffffff');
    const [characterChatroomSendBg2Color, setCharacterChatroomSendBg2Color] = useState(localStorage.getItem('characterChatroomSendBg2Color') || '#ffffff');
    const [characterChatroomSendTextColor, setCharacterChatroomSendTextColor] = useState(localStorage.getItem('characterChatroomSendTextColor') || '#000000');
    const [characterChatroomSendUnreadTextColor, setCharacterChatroomSendUnreadTextColor] = useState(localStorage.getItem('characterChatroomSendUnreadTextColor') || '#000000');
    const [characterChatroomInputBgColor, setCharacterChatroomInputBgColor] = useState(localStorage.getItem('characterChatroomInputBgColor') || '#ffffff');
    const [characterChatroomInputIconColor, setCharacterChatroomInputIconColor] = useState(localStorage.getItem('characterChatroomInputIconColor') || '#000000');
    const [characterChatroomSetProfileColor, setCharacterChatroomSetProfileColor] = useState(localStorage.getItem("friendlistProfileColor") || '#000000');


    const getLocalStorageItem = (key) => {
        const item = localStorage.getItem(key);
        return item === 'null' ? null : item;
    };

    const [characterChatroomReceiveImg, setCharacterChatroomReceiveImg] = useState(getLocalStorageItem('characterChatroomReceiveImg'));
    const [characterChatroomSendImg, setCharacterChatroomSendImg] = useState(getLocalStorageItem('characterChatroomSendImg'));

    const handleChangeCharacterChatroomBgColor = (color) => {
        setCharacterChatroomBgColor(color.hex);
        localStorage.setItem('characterChatroomBgColor', color.hex);
    }

    const handleChangeCharacterChatroomTitleColor = (color) => {
        setCharacterChatroomTitleColor(color.hex);
        localStorage.setItem('characterChatroomTitleColor', color.hex);
    }

    const handleChangeCharacterChatroomNameColor = (color) => {
        setCharacterChatroomNameColor(color.hex);
        localStorage.setItem('characterChatroomNameColor', color.hex);
    }

    const handleChangeCharacterChatroomReceiveBg1Color = (color) => {
        setCharacterChatroomReceiveBg1Color(color.hex);
        localStorage.setItem('characterChatroomReceiveBg1Color', color.hex);
    }

    const handleChangeCharacterChatroomReceiveTextColor = (color) => {
        setCharacterChatroomReceiveTextColor(color.hex);
        localStorage.setItem('characterChatroomReceiveTextColor', color.hex);
    }

    const handleChangeCharacterChatroomReceiveBg2Color = (color) => {
        setCharacterChatroomReceiveBg2Color(color.hex);
        localStorage.setItem('characterChatroomReceiveBg2Color', color.hex);
    }

    const handleChangeCharacterChatroomReceiveUnreadTextColor = (color) => {
        setCharacterChatroomReceiveUnreadTextColor(color.hex);
        localStorage.setItem('characterChatroomReceiveUnreadTextColor', color.hex);
    }

    const handleChangeCharacterChatroomSendBg1Color = (color) => {
        setCharacterChatroomSendBg1Color(color.hex);
        localStorage.setItem('characterChatroomSendBg1Color', color.hex);
    }

    const handleChangeCharacterChatroomSendTextColor = (color) => {
        setCharacterChatroomSendTextColor(color.hex);
        localStorage.setItem('characterChatroomSendTextColor', color.hex);
    }

    const handleChangeCharacterChatroomSendBg2Color = (color) => {
        setCharacterChatroomSendBg2Color(color.hex);
        localStorage.setItem('characterChatroomSendBg2Color', color.hex);
    }

    const handleChangeCharacterChatroomSendUnreadTextColor = (color) => {
        setCharacterChatroomSendUnreadTextColor(color.hex);
        localStorage.setItem('characterChatroomSendUnreadTextColor', color.hex);
    }

    const handleChangeCharacterChatroomInputBgColor = (color) => {
        setCharacterChatroomInputBgColor(color.hex);
        localStorage.setItem('characterChatroomInputBgColor', color.hex);
    }

    const handleChangeCharacterChatroomInputIconColor = (color) => {
        setCharacterChatroomInputIconColor(color.hex);
        localStorage.setItem('characterChatroomInputIconColor', color.hex);
    }

    useEffect(() => {
        if (characterChatroomReceiveImg) {
            localStorage.setItem('characterChatroomReceiveImg', characterChatroomReceiveImg);
        }
    }, [characterChatroomReceiveImg]);

    useEffect(() => {
        if (characterChatroomSendImg) {
            localStorage.setItem('characterChatroomSendImg', characterChatroomSendImg);
        }
    }, [characterChatroomSendImg]);

    const handleChangeCharacterChatroomReceiveImg = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => {
            const file = event.target.files[0];
            if (file.size > 5 * 1024 * 1024) {
                alert("파일 용량을 초과합니다. 4MB 이하의 이미지를 첨부해주세요.");
                return;
            }
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setCharacterChatroomReceiveImg(e.target.result);
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
            if (file.size > 5 * 1024 * 1024) {
                alert("파일 용량을 초과합니다. 4MB 이하의 이미지를 첨부해주세요.");
                return;
            }
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setCharacterChatroomSendImg(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    const handleCharacterChatroomPreviousButton = () => {
        window.location.href = "/step2/tabbar";
    }

    const handleCharacterChatroomButton = async () => {
        try {
            if (characterChatroomSendImg) {
                const sendBlob = await mergeSvgWithImage(Target_character_chatroom_send_bg1_color_cmp, { characterChatroomSendBg1Color }, characterChatroomSendImg, 97, 12, 89, 115);
                console.log('Send Blob:', sendBlob);

                const formData1 = new FormData();
                formData1.append('image', sendBlob, 'chatroomBubbleSend01@3x.png');
                formData1.append('filename', 'chatroomBubbleSend01@3x.png');
                await axios.post('http://'+process.env.HOST+':'+process.env.PORT+'/imageProcessing/uploadImage', formData1, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const formData2 = new FormData();
                formData2.append('image', sendBlob, 'chatroomBubbleSend01Selected@3x.png');
                formData2.append('filename', 'chatroomBubbleSend01Selected@3x.png');
                await axios.post('http://'+process.env.HOST+':'+process.env.PORT+'/imageProcessing/uploadImage', formData2, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            if (characterChatroomReceiveImg) {
                const receiveBlob = await mergeSvgWithImage(Target_character_chatroom_receive_bg1_color_cmp, { characterChatroomReceiveBg1Color }, characterChatroomReceiveImg, 26, 10, 89, 115);
                console.log('Receive Blob:', receiveBlob);

                const formData1 = new FormData();
                formData1.append('image', receiveBlob, 'chatroomBubbleReceive01@3x.png');
                formData1.append('filename', 'chatroomBubbleReceive01@3x.png');
                await axios.post('http://'+process.env.HOST+':'+process.env.PORT+'/imageProcessing/uploadImage', formData1, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const formData2 = new FormData();
                formData2.append('image', receiveBlob, 'chatroomBubbleReceive01Selected@3x.png');
                formData2.append('filename', 'chatroomBubbleReceive01Selected@3x.png');
                await axios.post('http://'+process.env.HOST+':'+process.env.PORT+'/imageProcessing/uploadImage', formData2, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            // 기존 색상 처리 로직 유지
            await convertSvgToPng(Target_character_chatroom_receive_bg2_color_cmp, { characterChatroomReceiveBg2Color }, 'chatroomBubbleReceive02@3x.png');
            await convertSvgToPng(Target_character_chatroom_receive_bg2_color_cmp, { characterChatroomReceiveBg2Color }, 'chatroomBubbleReceive02Selected@3x.png');

            await convertSvgToPng(Target_character_chatroom_send_bg2_color_cmp, { characterChatroomSendBg2Color }, 'chatroomBubbleSend02@3x.png');
            await convertSvgToPng(Target_character_chatroom_send_bg2_color_cmp, { characterChatroomSendBg2Color }, 'chatroomBubbleSend02Selected@3x.png');

            await convertSvgToPng(Target_character_chatroom_bg_color_cmp, { characterChatroomBgColor }, 'chatroomBgImage@3x.png');

            localStorage.setItem('characterChatroomBgColor', characterChatroomBgColor);
            localStorage.setItem('characterChatroomTitleColor', characterChatroomTitleColor);
            localStorage.setItem('characterChatroomNameColor', characterChatroomNameColor);
            localStorage.setItem('characterChatroomReceiveTextColor', characterChatroomReceiveTextColor);
            localStorage.setItem('characterChatroomReceiveUnreadTextColor', characterChatroomReceiveUnreadTextColor);
            localStorage.setItem('characterChatroomSendTextColor', characterChatroomSendTextColor);
            localStorage.setItem('characterChatroomSendUnreadTextColor', characterChatroomSendUnreadTextColor);
            localStorage.setItem('characterChatroomInputBgColor', characterChatroomInputBgColor);
            localStorage.setItem('characterChatroomInputIconColor', characterChatroomInputIconColor);
            localStorage.setItem('characterChatroomReceiveBg1Color', characterChatroomReceiveBg1Color);
            localStorage.setItem('characterChatroomReceiveBg2Color', characterChatroomReceiveBg2Color);
            localStorage.setItem('characterChatroomSendBg1Color', characterChatroomSendBg1Color);
            localStorage.setItem('characterChatroomSendBg2Color', characterChatroomSendBg2Color);

            window.location.href = '/step2/CharacterNotification';
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className='wrap'>
            <Themeguide />
            <div className='background'>
                <div className='info-wrap' ref={menuRef}>
                    {isOpen && (
                        <div className='drawer'>
                            {activeButton === 'character_chatroom_bg_color_set' && (
                                <>
                                    <div className='colorpick-info-title'>채팅방 배경 색상</div>
                                    <SketchPicker color={characterChatroomBgColor} onChangeComplete={handleChangeCharacterChatroomBgColor} />
                                </>
                            )}
                            {activeButton === 'character_chatroom_title_color_set' && (
                                <>
                                    <div className='colorpick-info-title'>채팅방 타이틀 색상</div>
                                    <SketchPicker color={characterChatroomTitleColor} onChangeComplete={handleChangeCharacterChatroomTitleColor} />
                                </>
                            )}
                            {activeButton === 'character_chatroom_name_color_set' && (
                                <>
                                    <div className='colorpick-info-title'>친구 이름 색상</div>
                                    <SketchPicker color={characterChatroomNameColor} onChangeComplete={handleChangeCharacterChatroomNameColor} />
                                </>
                            )}
                            {activeButton === 'character_chatroom_receive_bg1_color_set' && (
                                <>
                                    <div className='colorpick-info-title'>받은 말풍선 배경 색상(1)</div>
                                    <SketchPicker color={characterChatroomReceiveBg1Color} onChangeComplete={handleChangeCharacterChatroomReceiveBg1Color} />
                                    <br/>
                                    <div className='colorpick-info-title'>받은 말풍선 글씨 색상</div>
                                    <SketchPicker color={characterChatroomReceiveTextColor} onChangeComplete={handleChangeCharacterChatroomReceiveTextColor} />
                                </>
                            )}
                            {activeButton === 'character_chatroom_receive_bg2_color_set' && (
                                <>
                                    <div className='colorpick-info-title'>받은 말풍선 배경 색상(2)</div>
                                    <SketchPicker color={characterChatroomReceiveBg2Color} onChangeComplete={handleChangeCharacterChatroomReceiveBg2Color} />
                                    <br/>
                                    <div className='colorpick-info-title'>받은 메세지 안읽음 표시 색상</div>
                                    <SketchPicker color={characterChatroomReceiveUnreadTextColor} onChangeComplete={handleChangeCharacterChatroomReceiveUnreadTextColor} />
                                </>
                            )}
                            {activeButton === 'character_chatroom_send_bg1_color_set' && (
                                <>
                                    <div className='colorpick-info-title'>보낸 말풍선 배경 색상(1)</div>
                                    <SketchPicker color={characterChatroomSendBg1Color} onChangeComplete={handleChangeCharacterChatroomSendBg1Color} />
                                    <br/>
                                    <div className='colorpick-info-title'>보낸 말풍선 글씨 색상</div>
                                    <SketchPicker color={characterChatroomSendTextColor} onChangeComplete={handleChangeCharacterChatroomSendTextColor} />
                                </>
                            )}
                            {activeButton === 'character_chatroom_send_bg2_color_set' && (
                                <>
                                    <div className='colorpick-info-title'>보낸 말풍선 배경 색상(1)</div>
                                    <SketchPicker color={characterChatroomSendBg2Color} onChangeComplete={handleChangeCharacterChatroomSendBg2Color} />
                                    <br/>
                                    <div className='colorpick-info-title'>보낸 메세지 안읽음 표시 색상</div>
                                    <SketchPicker color={characterChatroomSendUnreadTextColor} onChangeComplete={handleChangeCharacterChatroomSendUnreadTextColor} />
                                </>
                            )}
                            {activeButton === 'character_chatroom_input_bg_color_set' && (
                                <>
                                    <div className='colorpick-info-title'>입력창 배경 색상</div>
                                    <SketchPicker color={characterChatroomInputBgColor} onChangeComplete={handleChangeCharacterChatroomInputBgColor} />
                                    <br/>
                                    <div className='colorpick-info-title'>입력창 아이콘 색상</div>
                                    <SketchPicker color={characterChatroomInputIconColor} onChangeComplete={handleChangeCharacterChatroomInputIconColor} />
                                </>
                            )}
                        </div>
                    )}
                </div>

                <div className='character-chatroom-zone'>
                    <div className='character_chatroom_bg_color'>
                        <Character_chatroom_bg_color_cmp characterChatroomBgColor={characterChatroomBgColor} />
                    </div>

                    <div className='character_chatroom_title_color'>
                        <Character_chatroom_title_color_cmp characterChatroomTitleColor={characterChatroomTitleColor} />
                    </div>

                    <div className='character_chatroom_name_color'>
                        <Character_chatroom_name_color_cmp characterChatroomNameColor={characterChatroomNameColor} />
                    </div>

                    <div className='character_chatroom_receive_bg1_color'>
                        <Character_chatroom_receive_bg1_color_cmp characterChatroomReceiveBg1Color={characterChatroomReceiveBg1Color} characterChatroomReceiveTextColor={characterChatroomReceiveTextColor} />
                    </div>

                    <div className='character_chatroom_receive_bg2_color'>
                        <Character_chatroom_receive_bg2_color_cmp characterChatroomReceiveBg2Color={characterChatroomReceiveBg2Color} characterChatroomReceiveTextColor={characterChatroomReceiveTextColor} />
                    </div>

                    <div className='character_chatroom_receive_unread_text_color'>
                        <Character_chatroom_receive_unread_text_color_cmp characterChatroomReceiveUnreadTextColor={characterChatroomReceiveUnreadTextColor} />
                    </div>

                    <div className='character_chatroom_send_bg1_color'>
                        <Character_chatroom_send_bg1_color_cmp characterChatroomSendBg1Color={characterChatroomSendBg1Color} characterChatroomSendTextColor={characterChatroomSendTextColor} />
                    </div>
                    <div className='character_chatroom_send_bg2_color'>
                        <Character_chatroom_send_bg2_color_cmp characterChatroomSendBg2Color={characterChatroomSendBg2Color} characterChatroomSendTextColor={characterChatroomSendTextColor} />
                    </div>
                    <div className='character_chatroom_send_unread_text_color'>
                        <Character_chatroom_send_unread_text_color_cmp characterChatroomSendUnreadTextColor={characterChatroomSendUnreadTextColor} />
                    </div>
                    <div className='character_chatroom_input_bg_color'>
                        <Character_chatroom_input_bg_color_cmp characterChatroomInputBgColor={characterChatroomInputBgColor} characterChatroomInputIconColor={characterChatroomInputIconColor} />
                    </div>

                    <div className='character_chatroom_set_profile_color'>
                        <Character_chatroom_set_profile_color_cmp characterChatroomSetProfileColor={characterChatroomSetProfileColor} />
                    </div>

                    <div className='character_chatroom_receive_img'>
                        <Character_chatroom_receive_img_cmp src={characterChatroomReceiveImg} />
                    </div>

                    <div className='character_chatroom_send_img'>
                        <Character_chatroom_send_img_cmp src={characterChatroomSendImg} />
                    </div>
                </div>

                <div className='character_chatroom_setting_zone'>
                    <div className='character_chatroom_bg_color_set'>
                        <img onClick={() => toggleMenu('character_chatroom_bg_color_set')} alt='채팅방1 색상 버튼 미선택' src={activeButton === 'character_chatroom_bg_color_set' ? '/setIcon.png' : '/notSetIcon.png'} />
                    </div>

                    <div className='character_chatroom_title_color_set'>
                        <img onClick={() => toggleMenu('character_chatroom_title_color_set')} alt='채팅방1 색상 버튼 미선택' src={activeButton === 'character_chatroom_title_color_set' ? '/setIcon.png' : '/notSetIcon.png'} />
                    </div>

                    <div className='character_chatroom_name_color_set'>
                        <img onClick={() => toggleMenu('character_chatroom_name_color_set')} alt='채팅방1 색상 버튼 미선택' src={activeButton === 'character_chatroom_name_color_set' ? '/setIcon.png' : '/notSetIcon.png'} />
                    </div>

                    <div className='character_chatroom_receive_bg1_color_set'>
                        <img onClick={() => toggleMenu('character_chatroom_receive_bg1_color_set')} alt='채팅방1 색상 버튼 미선택' src={activeButton === 'character_chatroom_receive_bg1_color_set' ? '/setIcon.png' : '/notSetIcon.png'} />
                    </div>

                    <div className='character_chatroom_receive_bg2_color_set'>
                        <img onClick={() => toggleMenu('character_chatroom_receive_bg2_color_set')} alt='채팅방1 색상 버튼 미선택' src={activeButton === 'character_chatroom_receive_bg2_color_set' ? '/setIcon.png' : '/notSetIcon.png'} />
                    </div>

                    <div className='character_chatroom_send_bg1_color_set'>
                        <img onClick={() => toggleMenu('character_chatroom_send_bg1_color_set')} alt='채팅방1 색상 버튼 미선택' src={activeButton === 'character_chatroom_send_bg1_color_set' ? '/setIcon.png' : '/notSetIcon.png'} />
                    </div>
                    <div className='character_chatroom_send_bg2_color_set'>
                        <img onClick={() => toggleMenu('character_chatroom_send_bg2_color_set')} alt='채팅방1 색상 버튼 미선택' src={activeButton === 'character_chatroom_send_bg2_color_set' ? '/setIcon.png' : '/notSetIcon.png'} />
                    </div>

                    <div className='character_chatroom_input_bg_color_set'>
                        <img onClick={() => toggleMenu('character_chatroom_input_bg_color_set')} alt='채팅방1 색상 버튼 미선택' src={activeButton === 'character_chatroom_input_bg_color_set' ? '/setIcon.png' : '/notSetIcon.png'} />
                    </div>

                    <div className='character_chatroom_receive_img_set' onClick={handleChangeCharacterChatroomReceiveImg}>
                        <img alt='채팅방2 색상 버튼 미선택' src='/plusIcon.png' />
                    </div>

                    <div className='character_chatroom_send_img_set' onClick={handleChangeCharacterChatroomSendImg}>
                        <img alt='채팅방2 색상 버튼 미선택' src='/plusIcon.png' />
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