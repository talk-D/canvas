import React from 'react';
import { Themeguide } from '../headers/Themeguide.jsx';
import '../styles/Step3.css';
import {InitializeLocalStorage} from "../function/InitializeLocalStorage";

function Step3() {

    const goToInitialPage = () => {
        InitializeLocalStorage();
        window.location.href = "/";
    }



    return (
        <div className='wrap'>
            <Themeguide />
            <div className='background'>
                <div className='download-message'>
                    <div>테마가 제작되었습니다-♪</div>
                    <div><span style={{ color: '#E78D08' }}>다운로드 폴더</span>를 확인해주세요!</div>
                </div>
                <div className='remake-button' onClick={goToInitialPage}>테마 다시 제작하기</div>
            </div>
        </div>



    );
}
export default Step3;