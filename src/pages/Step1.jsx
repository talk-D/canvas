import React, { useState } from 'react';
import { Themeguide } from '../headers/Themeguide.jsx';
import { Megaphone } from "../icons/MainPageIcon";
import '../styles/Step1.css';
import { InitializeLocalStorage } from "../function/InitializeLocalStorage.jsx";

function Step1() {

    const [themeVersion, setThemeVersion] = useState("10.3.5");
    const [themeNameKorean, setThemeNameKorean] = useState("");
    const [themeNameEnglish, setThemeNameEnglish] = useState("");

    const handleStep1PreviousButton = () => {
        window.location.href = "/";
    }

    const handleStep1Button = () => {
        localStorage.setItem("themeVersion", themeVersion);
        localStorage.setItem("themeNameKorean", themeNameKorean);
        localStorage.setItem("themeNameEnglish", themeNameEnglish);

        InitializeLocalStorage();

        window.location.href = "/step2/thumbnail";
    };

    const handleEnglishNameChange = (event) => {
        const value = event.target.value;
        const regex = /^[a-zA-Z\s]*$/;

        if (regex.test(value)) {
            setThemeNameEnglish(value);
        } else {
            alert("영문으로 작성해주세요.");
        }
    };

    return (
        <div className='wrap'>
            <Themeguide />
            <div className='background'>
                <div className='info-wrap'>
                    <div className='guide'>
                        <Megaphone /> &nbsp;&nbsp;테마 정보를 입력해주세요!
                    </div>
                    <div className='step1-input'>
                        <div className='theme-version'>
                            테마 버전&nbsp;&nbsp;&nbsp;
                            <div className='text-input'>
                                <input type="text" value={themeVersion} onChange={(event) => setThemeVersion(event.target.value)} />
                            </div>
                        </div>
                        <div className='theme-name-Korean'>
                            테마 이름(한글)&nbsp;&nbsp;&nbsp;
                            <div className='text-input'>
                                <input type="text" value={themeNameKorean} onChange={(event) => setThemeNameKorean(event.target.value)} />
                            </div>
                        </div>
                        <div className='theme-name-English'>
                            테마 이름(영문)&nbsp;&nbsp;&nbsp;
                            <div className='text-input'>
                                <input type="text" value={themeNameEnglish} onChange={handleEnglishNameChange} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='footer'>
                    <div className='step1-previous-button' onClick={handleStep1PreviousButton}>이전</div>
                    <div className='step1-button' onClick={handleStep1Button}>다음</div>
                </div>
            </div>
        </div>
    );
}

export default Step1;
