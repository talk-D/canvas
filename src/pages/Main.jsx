import React, {useState} from 'react';
import '../styles/Main.css';
import {Logo} from '../headers/Logo.jsx';
import {Megaphone} from '../icons/MainPageIcon';


function Main() {

    const handleBasicTheme = () => {
        localStorage.setItem("themeType", 1);
        window.location.href = "/step1";  }
    const handleCharacterTheme = () => {
        localStorage.setItem("themeType", 2);
        window.location.href = "/step1";  }

    return (
        <div className='div-wrapper'>
            <Logo />
            <div className='info-text-0'>나만의 iOS 카카오톡 테마 제작하기</div>
            <div className='info'>
                <Megaphone />
                <div className='info-text'>&nbsp;&nbsp;제작할 테마의 말풍선 종류를 클릭해주세요!</div>
            </div>
            <div className='theme-type'>
                <div className='basic-theme'>
                    <div className='basic-theme-label'>기본 말풍선 테마</div>
                    <div className='basic-theme-img'><img src='BasicTheme.png' alt="기본 말풍선 테마" onClick={handleBasicTheme}></img></div>
                </div>
                <div className='character-theme'>
                    <div className='character-theme-label'>캐릭터 말풍선 테마</div>
                    <div className='character-theme-img'> <img src='CharacterTheme.png' alt="캐릭터 말풍선 테마" onClick={handleCharacterTheme}></img></div>
                </div>
            </div>

        </div>
    );
}
export default Main;