import React, { useRef, useEffect, useState } from 'react';
import { Themeguide } from '../header/Themeguide.jsx';
import '../styles/Password.css';
import { SketchPicker } from 'react-color';
import {
    Password_bg_color_comp, password_font_color_cmp,
    Password_keypad_color_comp,
    Password_second_title_color_comp,
    Password_title_color_comp,
    Password_font_color_cmp, Unlock_icon_cmp1, Unlock_icon_cmp2, Lock_icon_cmp1, Lock_icon_cmp2
} from "../icons/PasswordIcon";

function Password() {
    function hexToRgb(hex) {
        let bigint = parseInt(hex.substring(1), 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;
        return [r, g, b];
    }

    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }

    function addColor(hex1, hex2) {
        let rgb1 = hexToRgb(hex1);
        let rgb2 = hexToRgb(hex2);

        let r = Math.min(255, rgb1[0] + rgb2[0]);
        let g = Math.min(255, rgb1[1] + rgb2[1]);
        let b = Math.min(255, rgb1[2] + rgb2[2]);

        return rgbToHex(r, g, b);
    }


    const handlePasswordButton = () => {
        window.location.href = "/step2/Friendlist";
    };

    const [isOpen, setIsOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(null);
    const [passwordBgColor, setPasswordBgColor] = useState("#ffffff");
    const [passwordKeypadColor, setPasswordKeypadColor] = useState("#FFECB4");
    const [passwordKeypadFontColor, setPasswordKeypadFontColor] = useState("#828282");
    const [passwordTitleColor, setPasswordTitleColor] = useState("#4A4A4A");
    const [passwordSecondTitleColor, setPasswordSecondTitleColor] = useState("#B9B9B9");
    const[passwordLockIconColor, setPasswordLockIconColor] = useState("#FFE27A");
    const [passwordUnlockIconColor, setPasswordUnlockIconColor] = useState("#FFE27A");



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


    const handleChangePasswordBgColor = (color) => {
        setPasswordBgColor(color.hex);
    };
    const handleChangePasswordKeypadColor = (color) => {
        setPasswordKeypadColor(color.hex);
    };
    const handleChangePasswordKeypadFontColor = (color) => {
        setPasswordKeypadFontColor(color.hex);

    };
    const handleChangePasswordTitleColor = (color) => {
        setPasswordTitleColor(color.hex);
        setPasswordSecondTitleColor(addColor(color.hex, "#191301"));
    };

    return (
        <div className='wrap'>
            <Themeguide />

            <div className='background'>
                <div className='info-wrap' ref={menuRef}>

                    {isOpen && (
                        <div className="drawer">
                            {/* 색상 변경이 필요한 아이콘을 눌렀을 때 */}
                            {activeButton === 'password_bg_color_set'&& (
                                <SketchPicker color={passwordBgColor} onChangeComplete={handleChangePasswordBgColor} />
                            )}

                            {activeButton === 'password_title_color_set' && (
                                <SketchPicker color={passwordTitleColor} onChangeComplete={handleChangePasswordTitleColor} />
                            )}

                            {activeButton === 'password_keypad_bg_color_set' && (
                                <SketchPicker color={passwordKeypadColor} onChangeComplete={handleChangePasswordKeypadColor} />
                            )}

                            {activeButton === 'password_font_color_set' && (

                                <SketchPicker color={passwordKeypadFontColor} onChangeComplete={handleChangePasswordKeypadFontColor} />
                            )}



                            {/* 이미지 변경이 필요한 아이콘을 눌렀을 때 */}
                            {(activeButton === 'lock_icon_set' || activeButton === 'unlock_icon_set') && (
                                <div className="image-box">
                                    {/* 3x3 이미지 박스 */}
                                    <div className="image-grid">
                                        {Array.from({ length: 9 }).map((_, index) => (
                                            <div key={index} className="image-cell">
                                                <img src={`/path/to/image${index + 1}.png`} alt={`이미지 ${index + 1}`} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div className='password-style'>
                        <div className='password_bg_color'>
                            <Password_bg_color_comp bgColor={passwordBgColor} />
                        </div>
                        <div className='password_keypad_color'>
                            <Password_keypad_color_comp keypadColor={passwordKeypadColor} />
                        </div>
                        <div className='password_text'>
                            <div className='password_title_color'>
                                <Password_title_color_comp color={passwordTitleColor} />
                            </div>

                            <div className='password_second_title_color'>
                                <Password_second_title_color_comp color={passwordSecondTitleColor} />
                            </div>
                        </div>
                        <div className='password_keypad_font_color'>
                            <Password_font_color_cmp color={passwordKeypadFontColor} />
                        </div>

<div className='lock_icon_zone'>
                        <div className='unlock_icon'>
                            <Unlock_icon_cmp1 color={passwordUnlockIconColor} />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Unlock_icon_cmp2 color={passwordUnlockIconColor} />
                        </div>

                        <div className='lock_icon'>
                            <Lock_icon_cmp1 color={passwordLockIconColor} />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Lock_icon_cmp2 color={passwordLockIconColor} />
                        </div>
</div>

                        <div className='password_setting_zone'>
                            {/* 알림 아이콘(색만 변경) */}
                            <div className='password_bg_color_set'>
                                <img onClick={(event) => toggleMenu(event, 'password_bg_color_set')} alt='비밀번호 색상 버튼 미선택' src={activeButton === 'password_bg_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                            </div>
                            <div className='password_title_color_set'>
                                <img onClick={(event) => toggleMenu(event, 'password_title_color_set')} alt='비밀번호 색상 버튼 미선택' src={activeButton === 'password_title_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                            </div>
                            <div className='password_keypad_bg_color_set'>
                                <img onClick={(event) => toggleMenu(event, 'password_keypad_bg_color_set')} alt='비밀번호 색상 버튼 미선택' src={activeButton === 'password_keypad_bg_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                            </div>
                            <div className='password_font_color_set'>
                                <img onClick={(event) => toggleMenu(event, 'password_font_color_set')} alt='비밀번호 색상 버튼 미선택' src={activeButton === 'password_font_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                            </div>

                            {/* 알림 아이콘(아이콘&색 변경) */}
                            <div className='unlock_icon_set'>
                                <img onClick={(event) => toggleMenu(event, 'unlock_icon_set')} alt='비밀번호 색상 버튼 미선택' src={activeButton === 'unlock_icon_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                            </div>
                            <div className='lock_icon_set'>
                                <img onClick={(event) => toggleMenu(event, 'lock_icon_set')} alt='비밀번호 색상 버튼 미선택' src={activeButton === 'lock_icon_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='footer'>
                <div className='step1-button' onClick={handlePasswordButton}>다음</div>
            </div>
        </div>
    );
}

export default Password;
