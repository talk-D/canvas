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
                    <div className='remake-button' onClick={goToInitialPage}>테마 다시 제작하기</div>
                </div>
            </div>
        </div>



    );
}
export default HowToApply;