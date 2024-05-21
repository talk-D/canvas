import React from 'react';
import { Themeguide } from '../header/Themeguide.jsx';
import '../styles/Password.css';
import {Backgroundup,Backgrounddown} from "../icons/PasswordIcon";

function Password() {

    const handlePasswordButton = () => {
        window.location.href = "/step2/Friendlist";
    };

    return (
        <div className='wrap'>
            <Themeguide />
            <div className = 'background'>
                <div className='info-wrap'>
                    <div className='password-style'>
                        <div className='password-background-up'>
                            <Backgroundup />
                            <Backgrounddown />

                        </div>

                    </div>
                </div>
            </div>

            <div className='footer'>
                <div className='step1-button' onClick={handlePasswordButton}>다음</div>
            </div>

        </div>



    );
}
export default Password;