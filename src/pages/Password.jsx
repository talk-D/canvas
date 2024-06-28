import React, { useRef, useEffect, useState } from 'react';
import { Themeguide } from '../headers/Themeguide.jsx';
import '../styles/Password.css';
import html2canvas from 'html2canvas';
import { SketchPicker } from 'react-color';
import {
    initialUnlockImages,
    initialLockImages,
    Password_bg_color_comp,
    Password_keypad_color_comp,
    Password_second_title_color_comp,
    Password_title_color_comp,
    Password_font_color_cmp
} from "../icons/PasswordIcon";

import { addColor } from '../function/ColorUtils.jsx';
import {convertSvgToPng} from "../function/convertSvgToPng";
import {
    Target_chatroom_set_profile_color_cmp, Target_password_bg_color_cmp,
    Target_tabbar_bg_color_cmp,
    Target_tabbar_chat_color_cmp,
    Target_tabbar_friend_color_cmp
} from "../icons/TargetIcon";

function Password() {

    const [isOpen, setIsOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(null);
    const [passwordBgColor, setPasswordBgColor] = useState(localStorage.getItem("passwordBgColor") || "#FFFFFF");
    const [passwordKeypadColor, setPasswordKeypadColor] = useState(localStorage.getItem("passwordKeypadColor") || "#FFFFFF");
    const [passwordKeypadFontColor, setPasswordKeypadFontColor] = useState(localStorage.getItem("passwordKeypadFontColor") || "#000000");
    const [passwordTitleColor, setPasswordTitleColor] = useState(localStorage.getItem("passwordTitleColor") || "#000000");
    const [passwordSecondTitleColor, setPasswordSecondTitleColor] = useState(localStorage.getItem("passwordSecondTitleColor") || "#191301");

    const [unlockImages, setUnlockImages] = useState(JSON.parse(localStorage.getItem('unlockImages')) || initialUnlockImages);
    const [lockImages, setLockImages] = useState(JSON.parse(localStorage.getItem('lockImages')) || initialLockImages);
    const [selectedUnlockImage, setSelectedUnlockImage] = useState(JSON.parse(localStorage.getItem('selectedUnlockImage')) || initialUnlockImages[0]);
    const [selectedLockImage, setSelectedLockImage] = useState(JSON.parse(localStorage.getItem('selectedLockImage')) || initialLockImages[0]);
    const [selectedUnlockImageFill, setSelectedUnlockImageFill] = useState(localStorage.getItem('selectedUnlockImageFill') || initialUnlockImages[0].fill);
    const [selectedLockImageFill, setSelectedLockImageFill] = useState(localStorage.getItem('selectedLockImageFill') || initialLockImages[0].fill);
    const [isSvg, setIsSvg] = useState(true);
    const [color, setColor] = useState("#FFE27A");

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const fileType = file.type;

            if (fileType === 'image/svg+xml') {
                if (activeButton === 'lock_icon_set') {
                    const newImage = { svg: reader.result, fill: '#000000' };
                    setLockImages([...lockImages, newImage]);
                    saveImageToLocalStorage('lockImages', [...lockImages, newImage]);
                } else {
                    const newImage = { svg: reader.result, fill: '#000000' };
                    setUnlockImages([...unlockImages, newImage]);
                    saveImageToLocalStorage('unlockImages', [...unlockImages, newImage]);
                }
            } else if (fileType === 'image/png') {
                const imageUrl = URL.createObjectURL(file);
                if (activeButton === 'lock_icon_set') {
                    const newImage = { svg: `<img src="${imageUrl}" alt="uploaded png" style="width: 50px; height: 50px; object-fit: contain;" />`, fill: '' };
                    setLockImages([...lockImages, newImage]);
                    saveImageToLocalStorage('lockImages', [...lockImages, newImage]);
                } else {
                    const newImage = { svg: `<img src="${imageUrl}" alt="uploaded png" style="width: 50px; height: 50px; object-fit: contain;" />`, fill: '' };
                    setUnlockImages([...unlockImages, newImage]);
                    saveImageToLocalStorage('unlockImages', [...unlockImages, newImage]);
                }
            }
        };

        reader.readAsText(file);
    };

    const saveImageToLocalStorage = (key, images) => {
        localStorage.setItem(key, JSON.stringify(images));
    };

    const handleImageClick = (index) => {
        if (activeButton === 'lock_icon_set') {
            const selected = lockImages[index];
            setSelectedLockImage(selected);
            setSelectedLockImageFill(selected.fill);
            setIsSvg(selected.svg.startsWith('<svg'));
            localStorage.setItem("selectedLockImage", JSON.stringify(selected));
            localStorage.setItem("selectedLockImageFill", selected.fill);
        } else {
            const selected = unlockImages[index];
            setSelectedUnlockImage(selected);
            setSelectedUnlockImageFill(selected.fill);
            setIsSvg(selected.svg.startsWith('<svg'));
            localStorage.setItem("selectedUnlockImage", JSON.stringify(selected));
            localStorage.setItem("selectedUnlockImageFill", selected.fill);
        }
    };

    const handleColorChange = (color) => {
        setColor(color.hex);
        if (isSvg) {
            if (activeButton === 'lock_icon_set') {
                setSelectedLockImageFill(color.hex);
                localStorage.setItem("selectedLockImageFill", color.hex);
            } else {
                setSelectedUnlockImageFill(color.hex);
                localStorage.setItem("selectedUnlockImageFill", color.hex);
            }
        }
    };

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
        localStorage.setItem("passwordBgColor", color.hex);
    };
    const handleChangePasswordKeypadColor = (color) => {
        setPasswordKeypadColor(color.hex);
        localStorage.setItem("passwordKeypadColor", color.hex);
    };
    const handleChangePasswordKeypadFontColor = (color) => {
        setPasswordKeypadFontColor(color.hex);
        localStorage.setItem("passwordKeypadFontColor", color.hex);
    };
    const handleChangePasswordTitleColor = (color) => {
        setPasswordTitleColor(color.hex);
        setPasswordSecondTitleColor(addColor(color.hex, "#191301"));
        localStorage.setItem("passwordTitleColor", color.hex);
        localStorage.setItem("passwordSecondTitleColor", addColor(color.hex, "#191301"));
    };

    const handlePasswordPreviousButton = () => {
        window.location.href = "/step2/Thumbnail";
    }

    const resizeCanvas = (canvas, maxWidth, maxHeight) => {
        const width = canvas.width;
        const height = canvas.height;
        let newWidth = width;
        let newHeight = height;

        if (width > height) {
            if (width > maxWidth) {
                newHeight = Math.round((maxWidth / width) * height);
                newWidth = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                newWidth = Math.round((maxHeight / height) * width);
                newHeight = maxHeight;
            }
        }

        const resizedCanvas = document.createElement('canvas');
        resizedCanvas.width = newWidth;
        resizedCanvas.height = newHeight;
        const ctx = resizedCanvas.getContext('2d');
        ctx.drawImage(canvas, 0, 0, newWidth, newHeight);

        return resizedCanvas;
    };

    const handlePasswordButton = async () => {
        try {
            // Capture the unlock icon
            const unlockCanvas = await html2canvas(document.querySelector(".unlock_icon div"), { backgroundColor: null });
            const resizedUnlockCanvas = resizeCanvas(unlockCanvas, 132, 132);
            const unlockDataUrl = resizedUnlockCanvas.toDataURL("image/png");

            // Capture the lock icon
            const lockCanvas = await html2canvas(document.querySelector(".lock_icon div"), { backgroundColor: null });
            const resizedLockCanvas = resizeCanvas(lockCanvas, 132, 132);
            const lockDataUrl = resizedLockCanvas.toDataURL("image/png");

            // Send both images to the server
            const response = await fetch('http://'+process.env.HOST+':'+process.env.PORT+'/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    unlockImage: unlockDataUrl,
                    lockImage: lockDataUrl
                })
            });

            if (response.ok) {
                console.log('Images uploaded successfully');

                await convertSvgToPng(Target_password_bg_color_cmp, { passwordBgColor }, 'passcodeBgImage@3x.png');

                // 로컬스토리지에 색상값 저장
                localStorage.setItem("passwordBgColor", passwordBgColor);
                localStorage.setItem("passwordTitleColor", passwordTitleColor);
                localStorage.setItem("passwordSecondTitleColor", passwordSecondTitleColor);
                localStorage.setItem("passwordKeypadColor", passwordKeypadColor);
                localStorage.setItem("passwordKeypadFontColor", passwordKeypadFontColor);

                window.location.href = "/step2/Friendlist";
            } else {
                console.error('Image upload failed');
            }
        } catch (error) {
            console.error('Error uploading images', error);
        }
    };

    return (
        <div className='wrap'>
            <Themeguide />

            <div className='background'>
                <div className='info-wrap' ref={menuRef}>

                    {isOpen && (
                        <div className="drawer">
                            {activeButton === 'password_bg_color_set' && (
                                <>
                                    <div className='colorpick-info-title'>비밀번호창 배경색상</div>
                                    <SketchPicker color={passwordBgColor} onChangeComplete={handleChangePasswordBgColor} />
                                </>
                            )}

                            {activeButton === 'password_title_color_set' && (
                                <>
                                    <div className='colorpick-info-title'>타이틀 색상</div>
                                    <SketchPicker color={passwordTitleColor} onChangeComplete={handleChangePasswordTitleColor} />
                                </>
                            )}

                            {activeButton === 'password_keypad_bg_color_set' && (
                                <>
                                    <div className='colorpick-info-title'>키패드 색상</div>
                                    <SketchPicker color={passwordKeypadColor} onChangeComplete={handleChangePasswordKeypadColor} />
                                </>
                            )}

                            {activeButton === 'password_font_color_set' && (
                                <>
                                    <div className='colorpick-info-title'>키패드 숫자 색상</div>
                                <SketchPicker color={passwordKeypadFontColor} onChangeComplete={handleChangePasswordKeypadFontColor} />
                                </>
                            )}

                            {(activeButton === 'lock_icon_set' || activeButton === 'unlock_icon_set') && (
                                <div className="image-box">

                                    {(activeButton === 'lock_icon_set' ? <div className='colorpick-info-title'>잠금 아이콘</div>:<div className='colorpick-info-title'>잠금 해제 아이콘</div>)}


                                    <div className="image-grid">
                                        {(activeButton === 'lock_icon_set' ? lockImages : unlockImages).map((content, index) => (
                                            <div
                                                key={index}
                                                className={`image-cell ${selectedLockImage === content || selectedUnlockImage === content ? 'selected' : ''}`}
                                                onClick={() => handleImageClick(index)}
                                            >
                                                <div dangerouslySetInnerHTML={{ __html: content.svg }} style={{ fill: content.fill, width: '50px', height: '50px', objectFit: 'contain' }} />
                                            </div>
                                        ))}
                                        <div className="image-cell add-image" style={{ width: '50px', height: '50px' }}>
                                            <label htmlFor="imageUpload" style={{ color: '#FFBB6D' }}>이미지 추가</label>
                                            <input
                                                id="imageUpload"
                                                type="file"
                                                accept="image/svg+xml, image/png"
                                                style={{ display: 'none' }}
                                                onChange={handleImageUpload}
                                            />
                                        </div>
                                    </div>
                                    {isSvg && (
                                        <div className="color-picker">
                                            <SketchPicker color={color} onChangeComplete={handleColorChange} />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    <div className='password-style'>
                        <div className='password_bg_color'>
                            <Password_bg_color_comp passwordBgColor={passwordBgColor}
                                                    passwordTitleColor={passwordTitleColor}
                                                    passwordSecondTitleColor={passwordSecondTitleColor}
                                                    passwordKeypadColor={passwordKeypadColor}
                                                    passwordKeypadFontColor={passwordKeypadFontColor}/>
                        </div>

                        <div className='lock_icon_zone'>
                            <div className='unlock_icon'>
                                <div dangerouslySetInnerHTML={{ __html: selectedUnlockImage.svg }} style={{ fill: selectedUnlockImageFill, width: '50px', height: '50px' }} />
                                &nbsp;
                                <div dangerouslySetInnerHTML={{ __html: selectedUnlockImage.svg }} style={{ fill: selectedUnlockImageFill, width: '50px', height: '50px' }} />
                            </div>

                            <div className='lock_icon'>
                                <div dangerouslySetInnerHTML={{ __html: selectedLockImage.svg }} style={{ fill: selectedLockImageFill, width: '50px', height: '50px' }} />
                                &nbsp;
                                <div dangerouslySetInnerHTML={{ __html: selectedLockImage.svg }} style={{ fill: selectedLockImageFill, width: '50px', height: '50px' }} />
                            </div>
                        </div>

                        <div className='password_setting_zone'>
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
                <div className='step1-previous-button' onClick={handlePasswordPreviousButton}>이전</div>
                <div className='step1-button' onClick={handlePasswordButton}>다음</div>
            </div>
        </div>
    );
}

export default Password;
