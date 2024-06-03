import React, {useEffect, useRef, useState} from 'react';
import { Themeguide } from '../headers/Themeguide.jsx';
import '../styles/Tabbar.css';
import {
    Tabbar_bg_color_cmp,
    Tabbar_chat_color_selected_cmp,
    Tabbar_friend_color_cmp,
    Tabbar_openchat_color_cmp,
    Tabbar_friend_color_selected_cmp,
    Tabbar_openchat_color_selected_cmp,
    Tabbar_setting_color_cmp,
    Tabbar_shop_color_cmp,
    Tabbar_setting_color_selected_cmp,
    Tabbar_shop_color_selected_cmp,
    Tabbar_chat_color_cmp
} from '../icons/TabbarIcon.jsx';
import {SketchPicker} from "react-color";

function Tabbar() {

    const [tabbarBgColor, setTabbarBgColor] = useState(localStorage.getItem("tabbarBgColor"));

    const [tabbarFriendFillColor, setTabbarFriendFillColor] = useState(localStorage.getItem("tabbarFriendFillColor"));
    const [tabbarFriendStrokeColor, setTabbarFriendStrokeColor] = useState(localStorage.getItem("tabbarFriendStrokeColor"));
    const [tabbarChatFillColor, setTabbarChatFillColor] = useState(localStorage.getItem("tabbarChatFillColor"));
    const [tabbarChatStrokeColor, setTabbarChatStrokeColor] = useState(localStorage.getItem("tabbarChatStrokeColor"));
    const [tabbarOpenchatFillColor, setTabbarOpenchatFillColor] = useState(localStorage.getItem("tabbarOpenchatFillColor"));
    const [tabbarOpenchatStrokeColor, setTabbarOpenchatStrokeColor] = useState(localStorage.getItem("tabbarOpenchatStrokeColor"));
    const [tabbarShopFillColor, setTabbarShopFillColor] = useState(localStorage.getItem("tabbarShopFillColor"));
    const [tabbarShopStrokeColor, setTabbarShopStrokeColor] = useState(localStorage.getItem("tabbarShopStrokeColor"));
    const [tabbarSettingFillColor, setTabbarSettingFillColor] = useState(localStorage.getItem("tabbarSettingFillColor"));
    const [tabbarSettingStrokeColor, setTabbarSettingStrokeColor] = useState(localStorage.getItem("tabbarSettingStrokeColor"));


    const [tabbarFriendFillColorSelected, setTabbarFriendFillColorSelected] = useState(localStorage.getItem("tabbarFriendFillColorSelected"));
    const [tabbarFriendStrokeColorSelected, setTabbarFriendStrokeColorSelected] = useState(localStorage.getItem("tabbarFriendStrokeColorSelected"));
    const [tabbarChatFillColorSelected, setTabbarChatFillColorSelected] = useState(localStorage.getItem("tabbarChatFillColorSelected"));
    const [tabbarChatStrokeColorSelected, setTabbarChatStrokeColorSelected] = useState(localStorage.getItem("tabbarChatStrokeColorSelected"));
    const [tabbarOpenchatFillColorSelected, setTabbarOpenchatFillColorSelected] = useState(localStorage.getItem("tabbarOpenchatFillColorSelected"));
    const [tabbarOpenchatStrokeColorSelected, setTabbarOpenchatStrokeColorSelected] = useState(localStorage.getItem("tabbarOpenchatStrokeColorSelected"));
    const [tabbarShopFillColorSelected, setTabbarShopFillColorSelected] = useState(localStorage.getItem("tabbarShopFillColorSelected"));
    const [tabbarShopStrokeColorSelected, setTabbarShopStrokeColorSelected] = useState(localStorage.getItem("tabbarShopStrokeColorSelected"));
    const [tabbarSettingFillColorSelected, setTabbarSettingFillColorSelected] = useState(localStorage.getItem("tabbarSettingFillColorSelected"));
    const [tabbarSettingStrokeColorSelected, setTabbarSettingStrokeColorSelected] = useState(localStorage.getItem("tabbarSettingStrokeColorSelected"));


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


    const handleChangeTabbarBgColor = (color) => {
        setTabbarBgColor(color.hex);
    }

    const handleChangeTabbarFriendFillColor = (color) => {
        setTabbarFriendFillColor(color.hex);
    }

    const handleChangeTabbarFriendStrokeColor = (color) => {
        setTabbarFriendStrokeColor(color.hex);
    }

    const handleChangeTabbarChatFillColor = (color) => {
        setTabbarChatFillColor(color.hex);
    }

    const handleChangeTabbarChatStrokeColor = (color) => {
        setTabbarChatStrokeColor(color.hex);
    }

    const handleChangeTabbarOpenchatFillColor = (color) => {
        setTabbarOpenchatFillColor(color.hex);
    }

    const handleChangeTabbarOpenchatStrokeColor = (color) => {
        setTabbarOpenchatStrokeColor(color.hex);
    }

    const handleChangeTabbarShopFillColor = (color) => {
        setTabbarShopFillColor(color.hex);
    }

    const handleChangeTabbarShopStrokeColor = (color) => {
        setTabbarShopStrokeColor(color.hex);
    }

    const handleChangeTabbarSettingFillColor = (color) => {
        setTabbarSettingFillColor(color.hex);
    }

    const handleChangeTabbarSettingStrokeColor = (color) => {
        setTabbarSettingStrokeColor(color.hex);
    }

    const handleChangeTabbarFriendFillColorSelected = (color) => {
        setTabbarFriendFillColorSelected(color.hex);
    }

    const handleChangeTabbarFriendStrokeColorSelected = (color) => {
        setTabbarFriendFillColorSelected(color.hex);
    }


    const handleChangeTabbarChatFillColorSelected = (color) => {
        setTabbarChatFillColorSelected(color.hex);
    }

    const handleChangeTabbarChatStrokeColorSelected = (color) => {
        setTabbarChatStrokeColorSelected(color.hex);
    }

    const handleChangeTabbarOpenchatFillColorSelected = (color) => {
        setTabbarOpenchatFillColorSelected(color.hex);
    }

    const handleChangeTabbarOpenchatStrokeColorSelected = (color) => {
        setTabbarOpenchatStrokeColorSelected(color.hex);
    }

    const handleChangeTabbarShopFillColorSelected = (color) => {
        setTabbarShopFillColorSelected(color.hex);
    }

    const handleChangeTabbarShopStrokeColorSelected = (color) => {
        setTabbarShopStrokeColorSelected(color.hex);
    }

    const handleChangeTabbarSettingFillColorSelected = (color) => {
        setTabbarSettingFillColorSelected(color.hex);
    }

    const  handleChangeTabbarSettingStrokeColorSelected = (color) => {
        setTabbarSettingStrokeColorSelected(color.hex);
    }


    const handleTabberButton = () => {
        localStorage.setItem("tabbarBgColor", tabbarBgColor);
        const themeType = localStorage.getItem("themeType");
        switch (themeType) {
            case "1":
                window.location.href = "/step2/Chatroom";
                break;
            case "2":
                window.location.href = "/step2/CharacterChatroom";
                break;
            default:
                // Handle the case where themeType is missing or invalid
                console.warn("오류 발생! 처음부터 다시 시작해주세요.");
                break;
        }
    };

    return (
        <div className='wrap'>
            <Themeguide />

            <div className='background'>

                <div className='info-wrap' ref={menuRef}>
                    {isOpen && (
                        <div className="drawer">
                            {activeButton === 'tabbar_bg_color_set' && (
                                <SketchPicker color={tabbarBgColor} onChangeComplete={handleChangeTabbarBgColor} />
                            )}

                            {activeButton === 'tabbar_friend_color_set' && (
                                <>
                                    <SketchPicker color={tabbarFriendStrokeColor} onChangeComplete={handleChangeTabbarFriendStrokeColor} />
                                    <SketchPicker color={tabbarFriendFillColor} onChangeComplete={handleChangeTabbarFriendFillColor} />
                                </>
                            )}
                            {activeButton === 'tabbar_chat_color_set' && (
                                <>
                                    <SketchPicker color={tabbarChatStrokeColor} onChangeComplete={handleChangeTabbarChatStrokeColor} />
                                    <SketchPicker color={tabbarChatFillColor} onChangeComplete={handleChangeTabbarChatFillColor} />
                                </>
                            )}
                            {activeButton === 'tabbar_openchat_color_set' && (
                                <>
                                    <SketchPicker color={tabbarOpenchatStrokeColor} onChangeComplete={handleChangeTabbarOpenchatStrokeColor} />
                                    <SketchPicker color={tabbarOpenchatFillColor} onChangeComplete={handleChangeTabbarOpenchatFillColor} />
                                </>
                            )}
                            {activeButton === 'tabbar_shop_color_set' && (
                                <>
                                    <SketchPicker color={tabbarShopStrokeColor} onChangeComplete={handleChangeTabbarShopStrokeColor} />
                                    <SketchPicker color={tabbarShopFillColor} onChangeComplete={handleChangeTabbarShopFillColor} />
                                </>
                            )}
                            {activeButton === 'tabbar_setting_color_set' && (
                                <>
                                    <SketchPicker color={tabbarSettingStrokeColor} onChangeComplete={handleChangeTabbarSettingStrokeColor} />
                                    <SketchPicker color={tabbarSettingFillColor} onChangeComplete={handleChangeTabbarSettingFillColor} />
                                </>
                            )}
                            {activeButton === 'tabbar_friend_color_selected_set' && (
                                <>
                                    <SketchPicker color={tabbarFriendStrokeColorSelected} onChangeComplete={handleChangeTabbarFriendStrokeColorSelected} />
                                    <SketchPicker color={tabbarFriendFillColorSelected} onChangeComplete={handleChangeTabbarFriendFillColorSelected} />
                                </>
                            )}
                            {activeButton === 'tabbar_chat_color_selected_set' && (
                                <>
                                    <SketchPicker color={tabbarChatStrokeColorSelected} onChangeComplete={handleChangeTabbarChatStrokeColorSelected} />
                                    <SketchPicker color={tabbarChatFillColorSelected} onChangeComplete={handleChangeTabbarChatFillColorSelected} />
                                </>
                            )}
                            {activeButton === 'tabbar_openchat_color_selected_set' && (
                                <>
                                    <SketchPicker color={tabbarOpenchatStrokeColorSelected} onChangeComplete={handleChangeTabbarOpenchatStrokeColorSelected} />
                                    <SketchPicker color={tabbarOpenchatFillColorSelected} onChangeComplete={handleChangeTabbarOpenchatFillColorSelected} />
                                </>
                            )}
                            {activeButton === 'tabbar_shop_color_selected_set' && (
                                <>
                                    <SketchPicker color={tabbarShopStrokeColorSelected} onChangeComplete={handleChangeTabbarShopStrokeColorSelected} />
                                    <SketchPicker color={tabbarShopFillColorSelected} onChangeComplete={handleChangeTabbarShopFillColorSelected} />
                                </>
                            )}
                            {activeButton === 'tabbar_setting_color_selected_set' && (
                                <>
                                    <SketchPicker color={tabbarSettingStrokeColorSelected} onChangeComplete={handleChangeTabbarSettingStrokeColorSelected} />
                                    <SketchPicker color={tabbarSettingFillColorSelected} onChangeComplete={handleChangeTabbarSettingFillColorSelected} />

                                </>
                            )}
                        </div>
                    )}


                    {/* 아이콘 미선택 상태 디자인 */}
                <div className='tabbar_zone'>
                    <div className='tabbar_bg_color'>
                        <Tabbar_bg_color_cmp tabbarBgColor={tabbarBgColor}/>
                    </div>

                    <div className='tabbar-icon-section1'>
                        <div className='tabbar_friend_color'>
                            <Tabbar_friend_color_cmp tabbarFriendFillColor={tabbarFriendFillColor} tabbarFriendStrokeColor={tabbarFriendStrokeColor} />
                        </div>

                        <div className='tabbar_chat_color'>
                            <Tabbar_chat_color_cmp tabbarChatFillColor={tabbarChatFillColor} tabbarChatStrokeColor={tabbarChatStrokeColor} />
                        </div>

                        <div className='tabbar_openchat_color'>
                            <Tabbar_openchat_color_cmp tabbarOpenchatFillColor={tabbarOpenchatFillColor} tabbarOpenchatStrokeColor={tabbarOpenchatStrokeColor} />
                        </div>

                        <div className='tabbar_shop_color'>
                            <Tabbar_shop_color_cmp tabbarShopFillColor={tabbarShopFillColor} tabbarShopStrokeColor={tabbarShopStrokeColor} />
                        </div>

                        <div className='tabbar_setting_color'>
                            <Tabbar_setting_color_cmp tabbarSettingFillColor={tabbarSettingFillColor} tabbarSettingStrokeColor={tabbarSettingStrokeColor} />
                        </div>
                    </div>


                {/* 아이콘 선택 상태 디자인 */}
                    <div className='tabbar-icon-section2'>
                        <div className='tabbar_friend_color_selected'>
                            <Tabbar_friend_color_selected_cmp tabbarFriendFillColorSelected={tabbarFriendFillColorSelected} tabbarFriendStrokeColorSelected={tabbarFriendStrokeColorSelected} />
                        </div>

                        <div className='tabbar_chat_color_selected'>
                            <Tabbar_chat_color_selected_cmp tabbarChatFillColorSelected={tabbarChatFillColorSelected} tabbarChatStrokeColorSelected={tabbarChatStrokeColorSelected} />
                        </div>

                        <div className='tabbar_openchat_color_selected'>
                            <Tabbar_openchat_color_selected_cmp tabbarOpenchatFillColorSelected={tabbarOpenchatFillColorSelected} tabbarOpenchatStrokeColorSelected={tabbarOpenchatStrokeColorSelected} />
                        </div>

                        <div className='tabbar_shop_color_selected'>
                            <Tabbar_shop_color_selected_cmp tabbarShopFillColorSelected={tabbarShopFillColorSelected} tabbarShopStrokeColorSelected={tabbarShopStrokeColorSelected} />
                        </div>

                        <div className='tabbar_setting_color_selected'>
                            <Tabbar_setting_color_selected_cmp tabbarSettingFillColorSelected={tabbarSettingFillColorSelected} tabbarShopStrokeColorSelected={tabbarShopStrokeColorSelected} />
                        </div>
                    </div>
                </div>

            <div className='tabbar_setting_zone'>
                <div className='tabbar_bg_color_set'>
                    <img onClick={(event) => toggleMenu(event, 'tabbar_bg_color_set')} alt='탭바창 색상 버튼 미선택' src={activeButton === 'tabbar_bg_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                </div>

                <div className='tabbar_friend_color_set'>
                    <img onClick={(event) => toggleMenu(event, 'tabbar_friend_color_set')} alt='탭바창 색상 버튼 미선택' src={activeButton === 'tabbar_friend_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                </div>
                <div className='tabbar_chat_color_set'>
                    <img onClick={(event) => toggleMenu(event, 'tabbar_chat_color_set')} alt='탭바창 색상 버튼 미선택' src={activeButton === 'tabbar_chat_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                </div>
                <div className='tabbar_openchat_color_set'>
                    <img onClick={(event) => toggleMenu(event, 'tabbar_openchat_color_set')} alt='탭바창 색상 버튼 미선택' src={activeButton === 'tabbar_openchat_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                </div>
                <div className='tabbar_shop_color_set'>
                    <img onClick={(event) => toggleMenu(event, 'tabbar_shop_color_set')} alt='탭바창 색상 버튼 미선택' src={activeButton === 'tabbar_shop_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                </div>
                <div className='tabbar_setting_color_set'>
                    <img onClick={(event) => toggleMenu(event, 'tabbar_setting_color_set')} alt='탭바창 색상 버튼 미선택' src={activeButton === 'tabbar_setting_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                </div>

                <div className='tabbar_friend_color_selected_set'>
                    <img onClick={(event) => toggleMenu(event, 'tabbar_friend_color_selected_set')} alt='탭바창 색상 버튼 미선택' src={activeButton === 'tabbar_friend_color_selected_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                </div>
                <div className='tabbar_chat_color_selected_set'>
                    <img onClick={(event) => toggleMenu(event, 'tabbar_chat_color_selected_set')} alt='탭바창 색상 버튼 미선택' src={activeButton === 'tabbar_chat_color_selected_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                </div>
                <div className='tabbar_openchat_color_selected_set'>
                    <img onClick={(event) => toggleMenu(event, 'tabbar_openchat_color_selected_set')} alt='탭바창 색상 버튼 미선택' src={activeButton === 'tabbar_openchat_color_selected_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                </div>
                <div className='tabbar_shop_color_selected_set'>
                    <img onClick={(event) => toggleMenu(event, 'tabbar_shop_color_selected_set')} alt='탭바창 색상 버튼 미선택' src={activeButton === 'tabbar_shop_color_selected_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                </div>
                <div className='tabbar_setting_color_selected_set'>
                    <img onClick={(event) => toggleMenu(event, 'tabbar_setting_color_selected_set')} alt='탭바창 색상 버튼 미선택' src={activeButton === 'tabbar_setting_color_selected_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                </div>


            </div>
                </div>
            </div>

            <div className='footer'>
                <div className='step1-button' onClick={handleTabberButton}>다음</div>
            </div>
        </div>
    );
}

export default Tabbar;
