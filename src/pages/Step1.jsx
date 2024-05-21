import React from 'react';
import { Themeguide } from '../header/Themeguide.jsx';
import {Megaphone} from "../icons/MainPageIcon";
import '../styles/Step1.css';
import { useState } from "react";


function Step1() {

    const [themeVersion, setThemeVersion] = useState("10.3.5");
    const [themeNameKorean, setThemeNameKorean] = useState("");
    const [themeNameEnglish, setThemeNameEnglish] = useState("");

    // 테마 정보를 로컬 스토리지에 저장
    const handleStep1Button = () => {
        localStorage.setItem("themeVersion", themeVersion);
        localStorage.setItem("themeNameKorean", themeNameKorean);
        localStorage.setItem("themeNameEnglish", themeNameEnglish);

        window.location.href = "/step2/thumbnail";
    };




    return (
        <div className='wrap'>
            <Themeguide />
          <div className = 'background'>
              <div className='info-wrap'>
              <div className='guide'> <Megaphone /> &nbsp;&nbsp;테마 정보를 입력해주세요!</div>
              <div className='step1-input'>
                  <div className='theme-version'>
                    테마 버전&nbsp;&nbsp;&nbsp;
                    <div className='text-input'> <input type="text" value={themeVersion}></input></div>
                  </div>
                  <div className='theme-name-Korean'>
                    테마 이름(한글)&nbsp;&nbsp;&nbsp;
                    <div className='text-input'> <input type="text" value={themeNameKorean}     onChange={(event) => setThemeNameKorean(event.target.value)}></input></div>
                  </div>
                      <div className='theme-name-English'>
                    테마 이름(영문)&nbsp;&nbsp;&nbsp;
                    <div className='text-input'> <input type="text" value={themeNameEnglish}     onChange={(event) => setThemeNameEnglish(event.target.value)}></input></div>
                  </div>
              </div>
          </div>
              <div className='footer'>
                  <div className='step1-button' onClick={handleStep1Button}>다음</div>
              </div>
          </div>
        </div>
    );
}
export default Step1;