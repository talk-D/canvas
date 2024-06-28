import React from 'react';
import { Themeguide } from '../headers/Themeguide.jsx';
import '../styles/HowToApply.css';
import { InitializeLocalStorage } from "../function/InitializeLocalStorage";

function HowToApply() {

    const goToInitialPage = () => {
        InitializeLocalStorage();
        window.location.href = "/";
    }



    return (
        <div className='wrap'>
            <Themeguide />
            <div className='background'>
                <div className='step4-button-wrap'>
                    <div className='theme-apply2'>
                        카카오톡 PC 버전 혹은 메일을 통해<br />
                        다운로드 받은 테마를 본인의 카카오톡 채팅방으로 전송해주세요.<br />
                        본인 채팅방의 파일을 눌러 테마를 적용하면 끝~!<br /><br />

                        테마를 변경하고 싶다면?<br />
                        탭바에서 더보기를 클릭해주세요.<br />
                        설정 > 테마에 들어가 테마를 변경해주세요.
                    </div>

                    <div className='remake-button2' onClick={goToInitialPage}>테마 다시 제작하기</div>
                </div>
            </div>
        </div>



    );
}
export default HowToApply;