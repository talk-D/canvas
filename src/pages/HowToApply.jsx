import React from 'react';
import { Themeguide } from '../headers/Themeguide.jsx';
import '../styles/HowToApply.css';
import { InitializeLocalStorage } from "../function/InitializeLocalStorage";

function HowToApply() {

    const goToInitialPage = () => {
        InitializeLocalStorage();
        window.location.href = "/";
    }

    const goToStep3 = () => {
        window.location.href = "/Step3";
    }


    return (
        <div className='wrap'>
            <Themeguide />
            <div className='background'>
                <div className='step3-button-wrap'>
                    <div className='tome'>
                        다운로드 받은 테마를 본인의 카카오톡 채팅방으로 전송해주세요.
                        1. 카카오톡 PC 버전 이용
                        본인 채팅방의 파일을 눌러 테마를 적용하기

                        2. 메일 나에게 보내기 이용
                        카카오톡 나에게

                    </div>

                    <div className='remake-button' onClick={goToInitialPage}>테마 다시 제작하기</div>
                </div>
            </div>
        </div>



    );
}
export default HowToApply;