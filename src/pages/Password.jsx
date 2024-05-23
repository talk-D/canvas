import React, { useRef, useEffect, useState } from 'react';
import { Themeguide } from '../header/Themeguide.jsx';
import '../styles/Password.css';
import { SketchPicker } from 'react-color';
import {
    Password_bg_color_comp,
    Password_keypad_color_comp,
    Password_second_title_color_comp,
    Password_title_color_comp
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

    const keypadColor = "#828282";
    const titleColor = "#654141";
    const secondTitleColor = addColor(titleColor, "#191301");

    const handlePasswordButton = () => {
        window.location.href = "/step2/Friendlist";
    };

    const [isOpen, setIsOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(null);
    const [bgColor, setBgColor] = useState("#ffffff");

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

    const handleColorChange = (color) => {
        setBgColor(color.hex);
        console.log("선택된 배경 색상: ", color.hex);
    };

    return (
        <div className='wrap'>
            <Themeguide />

            <div className='background'>
                <div className='info-wrap' ref={menuRef}>

                    {isOpen && (
                        <div className="drawer">

                            /*--색상 변경이 필요한 아이콘을 눌렀을 때--*/
                            {activeButton === 'password_bg_color_set' && (
                                //npm install react-color
                                <SketchPicker color={bgColor} onChangeComplete={handleColorChange} />
                            )}

                            /*--이미지 변경이 필요한 아이콘을 눌렀을 때--*/
                            {(activeButton === 'new1'||activeButton==='new2')&&(
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
                            <Password_bg_color_comp bgColor={bgColor} />
                        </div>
                        <div className='password_keypad_color'>
                            <Password_keypad_color_comp color={keypadColor} />
                        </div>
                        <div className='password_title_color'>
                            <Password_title_color_comp color={titleColor} />
                        </div>
                        <div className='password_second_title_color'>
                            <Password_second_title_color_comp color={secondTitleColor} />
                        </div>
                        <div className='password_bg_color_set'>
                            <img onClick={(event) => toggleMenu(event, 'password_bg_color_set')} alt='비밀번호 색상 버튼 미선택' src={activeButton === 'password_bg_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                        </div>

                        <div className='new1'>
                            <img onClick={(event) => toggleMenu(event, 'new1')} alt='비밀번호 색상 버튼 미선택' src={activeButton === 'new1' ? "/setIcon.png" : "/notSetIcon.png"} />
                        </div>
                        <div className='new2'>
                            <img onClick={(event) => toggleMenu(event, 'new2')} alt='비밀번호 색상 버튼 미선택' src={activeButton === 'new2' ? "/setIcon.png" : "/notSetIcon.png"} />
                        </div>
                        <div className='new3'>
                            <img onClick={(event) => toggleMenu(event, 'new3')} alt='비밀번호 색상 버튼 미선택' src={activeButton === 'new3' ? "/setIcon.png" : "/notSetIcon.png"} />
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
