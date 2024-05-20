import React from 'react';
import { Themeguide } from '../header/Themeguide.jsx';
import {Megaphone} from "../icons/MainPageIcon";
import '../styles/Step1.css';


function Step1() {

    return (
        <div className='wrap'>
            <Themeguide />
          <div className = 'background'>
              <div className='info-wrap'>
              <div className='guide'> <Megaphone /> &nbsp;&nbsp;테마정보를 입력해주세요!</div>
              <div className='step1-input'>
                  <div className='theme-version'>
                    테마버전
                    <div className='text-input'> <input type="text"></input></div>
                  </div>
                  <div className='theme-name-Korean'>
                    테마 이름(한글)
                    <div className='text-input'> <input type="text"></input></div>
                  </div>
                      <div className='theme-name-English'>
                    테마 이름(영문)
                    <div className='text-input'> <input type="text"></input></div>
                  </div>
              </div>
          </div>
          </div>
        </div>
    );
}
export default Step1;