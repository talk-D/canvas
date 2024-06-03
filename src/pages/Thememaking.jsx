import React from 'react';
import { Themeguide } from '../headers/Themeguide.jsx';
import '../styles/Thememaking.css';


function Thememaking() {


    return (
        <div className='wrap'>
            <Themeguide />
            <div className='background'>
                <div className='making-message'>
                    <div>
                        <span style={{ color: '#E78D08' }}>테마</span>
                        <span style={{ color: '#3D3D3D' }}>가 제작되고 있어요 - ♪</span>
                    </div>
                    <div>조금만 기다려주세요 · · ·</div>
                </div>
            </div>
        </div>


    );
}
export default Thememaking;