import React from 'react';
import { Themeguide } from '../headers/Themeguide.jsx';
import Theme from './Theme.jsx';


function Themedownload() {


    return (
        <div className='wrap'>
            <Themeguide />
            <div className='background'>
                <div className='download-message'>
                    <span>테마가 제작되었습니다.</span>
                    <span>아래 버튼을 클릭하여 다운해주세요!</span>
                </div>
            </div>
        </div>



    );
}
export default Themedownload;