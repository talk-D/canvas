import React, {useState} from 'react';
import { Themeguide } from '../headers/Themeguide.jsx';
import '../styles/Chatroom.css';
import {
    Chatroom_bg_color_cmp,
    Chatroom_title_color_cmp,
    Chatroom_name_color_cmp,
    chatroom_receive_bg1_color_cmp,
    chatroom_receive_bg2_color_cmp,
    Chatroom_receive_unread_text_color_cmp,
    chatroom_send_bg1_color_cmp,
    chatroom_send_bg2_color_cmp,
    Chatroom_send_unread_text_color_cmp,
    Chatroom_input_bg_color_cmp,
    Chatroom_set_profile_color_cmp
} from '../icons/ChatroomIcon.jsx';


function Chatroom() {

    const [isOpen, setIsOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(null);

    const [chatroomBgColor, setChatroomBgColor] = useState(localStorage.getItem("chatroomBgColor"));
    const [chatroomTitleColor, setChatroomTitleColor] = useState(localStorage.getItem("chatroomTitleColor"));
    const [chatroomNameColor, setChatroomNameColor] = useState(localStorage.getItem("chatroomNameColor"));
    const [chatroomReceiveBg1Color, setChatroomReceiveBg1Color] = useState(localStorage.getItem("chatroomReceiveBg1Color"));
    const [chatroomReceiveBg2Color, setChatroomReceiveBg2Color] = useState(localStorage.getItem("chatroomReceiveBg2Color"));
    const [chatroomrRceiveTextColor, setChatroomrRceiveTextColor] = useState(localStorage.getItem("chatroomrRceiveTextColor"));
    const [chatroomReceiveUnreadTextColor, setChatroomReceiveUnreadTextColor] = useState(localStorage.getItem("chatroomReceiveUnreadTextColor"));
    const [chatroomSendBg1Color, setChatroomSendBg1Color] = useState(localStorage.getItem("chatroomSendBg1Color"));
    const [chatroomSendBg2Color, setChatroomSendBg2Color] = useState(localStorage.getItem("chatroomSendBg2Color"));
    const [chatroomSendTextColor, setChatroomSendTextColor] = useState(localStorage.getItem("chatroomSendTextColor"));
    const [chatroomSendUnreadTextColor, setChatroomSendUnreadTextColor] = useState(localStorage.getItem("chatroomSendUnreadTextColor"));
    const [chatroomInputBgColor, setChatroomInputBgColor] = useState(localStorage.getItem("chatroomInputBgColor"));
    const [chatroomInputIconColor, setChatroomInputIconColor] = useState(localStorage.getItem("chatroomInputIconColor"));


    // 바뀔 컨포넌트 말고, 이전에 색상 설정해둔 컴포넌트
    // 기본 프로필 색상
    const [chatroomSetProfileColor, setCchatroomSetProfileColor] = useState(localStorage.getItem("friendlistProfileColor"));

    const handleChatroomButton = () => {
        window.location.href = "/step2/Notification";
    };

    return (
        <div className='wrap'>
            <Themeguide />
            <div className='background'>

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
                        <chatroom_receive_bg1_color_cmp chatroomReceiveBg1Color={chatroomReceiveBg1Color}
                                                        chatroomrRceiveTextColor={chatroomrRceiveTextColor}/>
                    </div>

                    <div className='chatroom_receive_bg2_color'>
                        <chatroom_receive_bg2_color_cmp chatroomReceiveBg2Color={chatroomReceiveBg2Color}
                                                        chatroomrRceiveTextColor={chatroomrRceiveTextColor}/>
                    </div>

                    <div className='chatroom_receive_unread_text_color'>
                        <Chatroom_receive_unread_text_color_cmp chatroomReceiveUnreadTextColor={chatroomReceiveUnreadTextColor}/>
                    </div>


                    <div className='chatroom_send_bg1_color'>
                        <chatroom_send_bg1_color_cmp chatroomSendBg1Color={chatroomSendBg1Color}
                                                     chatroomSendTextColor={chatroomSendTextColor}/>
                    </div>
                    <div className='chatroom_send_bg2_color'>
                        <chatroom_send_bg2_color_cmp chatroomSendBg2Color={chatroomSendBg2Color}
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
            </div>
            <div className='footer'>
                <div className='step1-button' onClick={handleChatroomButton}>다음</div>
            </div>

        </div>



    );
}
export default Chatroom;