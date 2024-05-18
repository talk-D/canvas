import React from 'react';
import '../styles/Main.css';
import {Logo} from '../header/Logo.jsx';
import {Megaphone} from '../icons/MainPageIcon';

function Main() {
    

    return (
        <div className='div-wrapper'>
            <Logo />
            <div className='info'>
                <Megaphone />
                <div className='info-text'> 제작할 테마 종류를 클릭해주세요!</div>
            </div>
            <div className='theme-type'>
                <div className='basic-theme'>
                    <img src='BasicTheme.png' alt="기본 말풍선 테마"></img>
                </div>
                <div className='character-theme'>
                    <img src='CharacterTheme.png' alt="캐릭터 말풍선 테마"></img>
                </div>
            </div>

        </div>
    );
}
export default Main;