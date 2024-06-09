import React, {useEffect, useRef, useState} from 'react';
import { Themeguide } from '../headers/Themeguide.jsx';
import {SketchPicker} from "react-color"
import {
    Friendlist_bg_color_cmp
} from '../icons/FriendListIcon.jsx';
import '../styles/FriendList.css';
import {convertSvgToPng} from "../function/convertSvgToPng";
import {
    Target_chatroom_set_profile_color_cmp,
    Target_friendlist_bg_color_cmp,
    Target_friendlist_profile_color_cmp,
    Target_password_bg_color_cmp
} from "../icons/TargetIcon";



function Friendlist() {

    const [isOpen, setIsOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(null);

    const [friendlistBgColor, setFriendlistBgColor] = useState(localStorage.getItem("friendlistBgColor"));
    const [friendlistTitleColor, setFriendlistTitleColor] = useState(localStorage.getItem("friendlistTitleColor"));
    const [friendlistSecondTitleColor, setFriendlistSecondTitleColor] = useState(localStorage.getItem("friendlistSecondTitleColor"));
    const [friendlistDividingLineColor, setFriendlistDividingLineColor] = useState(localStorage.getItem("friendlistDividingLineColor"));
    const [friendlistNameColor, setFriendlistNameColor] = useState(localStorage.getItem("friendlistNameColor"));
    const [friendlistMessageColor, setFriendlistMessageColor] = useState(localStorage.getItem("friendlistMessageColor"));
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


    const handleChangeFriendlistBgColor = (color) => {
        setFriendlistBgColor(color.hex);
    }


    const handleChangeFriendlistSecondTitleColor = (color) => {
        setFriendlistSecondTitleColor(color.hex);
    }

    const handleChangeFriendlistDividingLineColor = (color) => {
        setFriendlistDividingLineColor(color.hex);
    }

    const handleChangeFriendlistNameColor = (color) => {
        setFriendlistNameColor(color.hex);
        setFriendlistTitleColor(color.hex);
    }

    const handleChangeFriendlistMessageColor = (color) => {
        setFriendlistMessageColor(color.hex);
    }

    const handleChangeFriendlistProfileColor = (color) => {
        setFriendlistProfileColor(color.hex);
    }


    const handleFriendlistPreviousButton = () => {
        window.location.href = "/step2/password";
    }
    const handleFriendlistButton = async () => {


        await convertSvgToPng(Target_friendlist_bg_color_cmp, { friendlistBgColor }, 'mainBgImage@3x.png');
        await convertSvgToPng(Target_friendlist_profile_color_cmp, { friendlistProfileColor }, 'profileImg01@3x.png');


        localStorage.setItem("friendlistBgColor", friendlistBgColor);
        localStorage.setItem("friendlistTitleColor", friendlistTitleColor);
        localStorage.setItem("friendlistSecondTitleColor", friendlistSecondTitleColor);
        localStorage.setItem("friendlistDividingLineColor", friendlistDividingLineColor);
        localStorage.setItem("friendlistNameColor", friendlistNameColor);
        localStorage.setItem("friendlistMessageColor", friendlistMessageColor);
        localStorage.setItem("friendlistProfileColor", friendlistProfileColor);

        window.location.href = "/step2/Tabbar";
    };

    return (
        <div className='wrap'>
            <Themeguide />

            <div className='background-1'>

                <div className='info-wrap' ref={menuRef}>
                    {isOpen && (
                        <div className="drawer">
                            {activeButton === 'friendlist_bg_color_set' && (
                                <SketchPicker color={friendlistBgColor} onChangeComplete={handleChangeFriendlistBgColor} />
                            )}
                            {activeButton === 'friendlist_second_title_color_set' && (
                                <SketchPicker color={friendlistSecondTitleColor} onChangeComplete={handleChangeFriendlistSecondTitleColor} />
                            )}
                            {activeButton === 'friendlist_dividing_line_color_set' && (
                                <SketchPicker color={friendlistDividingLineColor} onChangeComplete={handleChangeFriendlistDividingLineColor} />
                            )}
                            {activeButton === 'friendlist_name_color_set' && (
                                <SketchPicker color={friendlistDividingLineColor} onChangeComplete={handleChangeFriendlistNameColor} />
                            )}
                            {activeButton === 'friendlist_message_color_set' && (
                                <SketchPicker color={friendlistMessageColor} onChangeComplete={handleChangeFriendlistMessageColor} />
                            )}
                            {activeButton === 'friendlist_profile_color_set' && (
                                <SketchPicker color={friendlistProfileColor} onChangeComplete={handleChangeFriendlistProfileColor} />
                            )}
                        </div>
                    )}
                </div>

                <div className='friendlist-style'>
                    <div className='friendlist_bg_color'>
                        <Friendlist_bg_color_cmp
                            friendlistBgColor={friendlistBgColor}
                            friendlistTitleColor={friendlistTitleColor}
                            friendlistSecondTitleColor={friendlistSecondTitleColor}
                            friendlistDividingLineColor={friendlistDividingLineColor}
                            friendlistNameColor={friendlistNameColor}
                            friendlistMessageColor={friendlistMessageColor}
                            friendlistProfileColor={friendlistProfileColor}/>
                    </div>
                </div>

                <div className='friendlist_setting_zone'>

                    <div className='friendlist_bg_color_set'>
                        <img onClick={(event) => toggleMenu(event, 'friendlist_bg_color_set')} alt='비밀번호 색상 버튼 미선택' src={activeButton === 'friendlist_bg_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                    </div>

                    <div className='friendlist_second_title_color_set'>
                        <img onClick={(event) => toggleMenu(event, 'friendlist_second_title_color_set')} alt='비밀번호 색상 버튼 미선택' src={activeButton === 'friendlist_second_title_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                    </div>

                    <div className='friendlist_dividing_line_color_set'>
                        <img onClick={(event) => toggleMenu(event, 'friendlist_dividing_line_color_set')} alt='비밀번호 색상 버튼 미선택' src={activeButton === 'friendlist_dividing_line_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                    </div>

                    <div className='friendlist_name_color_set'>
                        <img onClick={(event) => toggleMenu(event, 'friendlist_name_color_set')} alt='비밀번호 색상 버튼 미선택' src={activeButton === 'friendlist_name_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                    </div>

                    <div className='friendlist_message_color_set'>
                        <img onClick={(event) => toggleMenu(event, 'friendlist_message_color_set')} alt='비밀번호 색상 버튼 미선택' src={activeButton === 'friendlist_message_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                    </div>

                    <div className='friendlist_profile_color_set'>
                        <img onClick={(event) => toggleMenu(event, 'friendlist_profile_color_set')} alt='비밀번호 색상 버튼 미선택' src={activeButton === 'friendlist_profile_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                    </div>


                </div>


            </div>

            <div className='footer'>
                <div className='step1-previous-button' onClick={handleFriendlistPreviousButton}>이전</div>
                <div className='step1-button' onClick={handleFriendlistButton}>다음</div>
            </div>
        </div>
    );
}
export default Friendlist;