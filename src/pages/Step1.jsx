import React from 'react';
import {Logo} from '../header/Logo.jsx';
import '../styles/Step1.css';


function Step1() {
    

    return (
        <div className='div-wrapper'>
            <Logo />
            <div className='menu'>
                    <div className='step1'>STEP 1. 테마 정보</div>
                    <div className='step2'>
                        <div className='first-row'>
                            STEP 2. 테마 제작
                        </div>
                        <div className='second-row'>
                            <div className='thumbnail'>썸네일</div>
                            <div className='password'>비밀번호</div>
                            <div className='friendlist'>친구 목록</div>
                            <div className='tabbar'>탭바</div>
                            <div className='chatroom'>채팅방</div>
                            <div className='notification'>알림창</div>
                        </div>
                    </div>
                    <div className='step3'>STEP 3. 테마 다운</div>
                </div>
            </div>


            
    );
}
export default Step1;