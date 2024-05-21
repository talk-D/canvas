import React from 'react';
import { Themeguide } from '../header/Themeguide.jsx';
import Theme from './Theme.jsx';


function Password() {

    const handlePasswordButton = () => {
        window.location.href = "/step2/Friendlist";
    };

    return (
        <div className='wrap'>
            <Themeguide />
            <Theme />
            <div className='footer'>
                <div className='step1-button' onClick={handlePasswordButton}>다음</div>
            </div>

        </div>



    );
}
export default Password;