import React, { useRef, useEffect, useState } from 'react';
import { Themeguide } from '../header/Themeguide.jsx';
import '../styles/Password.css';
import html2canvas from 'html2canvas';
import { SketchPicker } from 'react-color';
import {
    Password_bg_color_comp, password_font_color_cmp,
    Password_keypad_color_comp,
    Password_second_title_color_comp,
    Password_title_color_comp,
    Password_font_color_cmp, Unlock_icon_cmp1, Unlock_icon_cmp2, Lock_icon_cmp1, Lock_icon_cmp2
} from "../icons/PasswordIcon";

function Password() {
    function hexToRgb(hex) {
        let bigint = parseInt(hex.substring(1), 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;
        return [r, g, b];
    }

    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }

    function addColor(hex1, hex2) {
        let rgb1 = hexToRgb(hex1);
        let rgb2 = hexToRgb(hex2);

        let r = Math.min(255, rgb1[0] + rgb2[0]);
        let g = Math.min(255, rgb1[1] + rgb2[1]);
        let b = Math.min(255, rgb1[2] + rgb2[2]);

        return rgbToHex(r, g, b);
    }



    const [isOpen, setIsOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(null);
    const [passwordBgColor, setPasswordBgColor] = useState("#ffffff");
    const [passwordKeypadColor, setPasswordKeypadColor] = useState("#FFECB4");
    const [passwordKeypadFontColor, setPasswordKeypadFontColor] = useState("#828282");
    const [passwordTitleColor, setPasswordTitleColor] = useState("#4A4A4A");
    const [passwordSecondTitleColor, setPasswordSecondTitleColor] = useState("#B9B9B9");
    const [passwordLockIconColor, setPasswordLockIconColor] = useState("#FFE27A");
    const [passwordUnlockIconColor, setPasswordUnlockIconColor] = useState("#FFE27A");

    const initialUnlockImages = [
        {svg: `<svg width="50" height="50" viewBox="0 0 132 132" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M42.625 38.5C42.625 30.195 45.034 24.4915 48.73 20.856C52.448 17.2095 57.9975 15.125 65.296 15.125C74.4645 15.125 80.916 18.392 84.491 24.167C84.77 24.6393 85.1403 25.0513 85.5804 25.3788C86.0205 25.7063 86.5215 25.9427 87.0541 26.0742C87.5867 26.2056 88.1401 26.2296 88.6821 26.1446C89.224 26.0596 89.7435 25.8673 90.2103 25.5791C90.677 25.2909 91.0816 24.9124 91.4003 24.4659C91.719 24.0194 91.9454 23.5139 92.0664 22.9788C92.1873 22.4437 92.2003 21.8899 92.1046 21.3497C92.0089 20.8096 91.8064 20.2939 91.509 19.833C86.0475 10.9945 76.494 6.875 65.296 6.875C56.4465 6.875 48.598 9.427 42.955 14.971C37.29 20.5315 34.375 28.5835 34.375 38.5V40.095C24.013 43.923 16.5 54.296 16.5 66.55C16.5 87.659 32.824 99.836 46.728 110.204C48.169 111.282 49.588 112.337 50.963 113.382C56.1 117.304 61.05 121 66 121C70.95 121 75.9 117.304 81.037 113.382C82.412 112.337 83.831 111.282 85.272 110.204C99.176 99.836 115.5 87.6535 115.5 66.5445C115.5 43.241 88.275 26.7135 66 49.1205C58.355 41.4315 50.1325 38.3295 42.625 38.5ZM66 61.875C67.094 61.875 68.1432 62.3096 68.9168 63.0832C69.6904 63.8568 70.125 64.906 70.125 66V79.75C70.125 80.844 69.6904 81.8932 68.9168 82.6668C68.1432 83.4404 67.094 83.875 66 83.875C64.906 83.875 63.8568 83.4404 63.0832 82.6668C62.3096 81.8932 61.875 80.844 61.875 79.75V66C61.875 64.906 62.3096 63.8568 63.0832 63.0832C63.8568 62.3096 64.906 61.875 66 61.875Z"/>
</svg>`, fill: '#FFE27A'},

        { svg: `<svg width="50" height="50" viewBox="0 0 108 120" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.4575 29.7064C21.3575 30.0474 20.2795 30.4544 19.229 30.9164C8.13 35.8334 0.375 47.2789 0.375 60.5504C0.375 73.5359 5.9685 83.4139 13.2285 91.3284C19.0365 97.6589 26.1425 102.955 32.385 107.608C33.793 108.659 35.1625 109.682 36.455 110.672C38.9905 112.602 41.735 114.687 44.518 116.26C47.3065 117.838 50.513 119.131 54 119.131C57.487 119.131 60.6935 117.838 63.482 116.26C66.265 114.681 69.0095 112.602 71.545 110.672C72.8375 109.682 74.207 108.659 75.615 107.608C81.8575 102.955 88.9635 97.6589 94.7715 91.3284C102.032 83.4139 107.625 73.5359 107.625 60.5504C107.625 47.2789 99.87 35.8334 88.771 30.9274C78.343 26.3074 65.5005 27.6659 54 37.4999C46.5035 31.0869 38.435 28.2819 30.845 28.3809C31.505 22.2649 33.683 17.8594 36.73 14.8619C40.448 11.2154 45.9975 9.13086 53.296 9.13086C62.4645 9.13086 68.916 12.3979 72.491 18.1729C72.77 18.6452 73.1403 19.0572 73.5804 19.3846C74.0205 19.7121 74.5215 19.9485 75.0541 20.08C75.5867 20.2115 76.1401 20.2354 76.6821 20.1504C77.224 20.0654 77.7435 19.8732 78.2103 19.585C78.677 19.2967 79.0816 18.9183 79.4003 18.4718C79.719 18.0253 79.9454 17.5197 80.0664 16.9846C80.1873 16.4496 80.2003 15.8958 80.1046 15.3556C80.0089 14.8154 79.8064 14.2998 79.509 13.8389C74.0475 5.00036 64.494 0.880859 53.296 0.880859C44.4465 0.880859 36.598 3.43286 30.955 8.97686C25.8345 14.0094 22.958 21.0659 22.4575 29.7064ZM8.625 60.5504C8.625 50.5184 14.4825 42.0484 22.5675 38.4679C30.427 34.9919 41.0035 35.9049 51.074 46.0304C51.4574 46.4162 51.9133 46.7223 52.4154 46.9313C52.9176 47.1402 53.4561 47.2478 54 47.2478C54.5439 47.2478 55.0824 47.1402 55.5846 46.9313C56.0867 46.7223 56.5426 46.4162 56.926 46.0304C66.991 35.9049 77.573 34.9919 85.4325 38.4679C93.5175 42.0429 99.375 50.5129 99.375 60.5504C99.375 70.8739 95.019 78.8544 88.694 85.7514C83.469 91.4494 77.144 96.1684 70.9345 100.805C69.455 101.905 67.9865 103.005 66.5345 104.11C63.9275 106.101 61.6285 107.828 59.4175 109.077C57.2065 110.331 55.4575 110.881 54 110.881C52.537 110.881 50.7935 110.331 48.5825 109.077C46.3715 107.828 44.0725 106.101 41.4655 104.11C40.0047 103.001 38.538 101.899 37.0655 100.805C30.8615 96.1739 24.5365 91.4549 19.306 85.7514C12.981 78.8544 8.625 70.8739 8.625 60.5504Z"/>
</svg>`, fill: '#FFE27A' },
        { svg: `<svg width="50" height="50" viewBox="0 0 132 132" xmlns="http://www.w3.org/2000/svg">
<path d="M52.8 49.4643C52.799 46.6418 53.6354 43.8824 55.2033 41.5354C56.7712 39.1884 59.0002 37.3592 61.6081 36.2795C64.2159 35.1998 67.0855 34.9181 69.8536 35.4699C72.6217 36.0217 75.1639 37.3823 77.1584 39.3795L80.4848 42.7147L86.7152 36.4843L83.3712 33.1579C80.146 29.934 76.0376 27.7383 71.5651 26.8486C67.0925 25.9588 62.4566 26.4148 58.2431 28.159C54.0296 29.9031 50.4277 32.8572 47.8926 36.6477C45.3574 40.4383 44.0028 44.8953 44 49.4555V53.5387C41.4239 54.4495 39.1939 56.1373 37.6177 58.3692C36.0415 60.6011 35.1967 63.2672 35.2 65.9995V92.3995C35.2 95.9004 36.5907 99.2579 39.0661 101.733C41.5416 104.209 44.8991 105.6 48.4 105.6H83.6C87.1008 105.6 90.4583 104.209 92.9338 101.733C95.4093 99.2579 96.8 95.9004 96.8 92.3995V65.9995C96.8 62.4987 95.4093 59.1412 92.9338 56.6657C90.4583 54.1902 87.1008 52.7995 83.6 52.7995H52.8V49.4643Z"/>
</svg>`, fill: '#FFE27A' },
        { svg: `<svg width="50" height="50" viewBox="0 0 132 132" xmlns="http://www.w3.org/2000/svg">
<path d="M48.4 61.6004H83.6V52.8004H48.4V61.6004ZM88 66.0004V92.4004H96.8V66.0004H88ZM83.6 96.8004H48.4V105.6H83.6V96.8004ZM44 92.4004V66.0004H35.2V92.4004H44ZM48.4 96.8004C47.233 96.8004 46.1138 96.3368 45.2887 95.5117C44.4635 94.6865 44 93.5673 44 92.4004H35.2C35.2 95.9012 36.5907 99.2587 39.0661 101.734C41.5416 104.21 44.8991 105.6 48.4 105.6V96.8004ZM88 92.4004C88 93.5673 87.5364 94.6865 86.7112 95.5117C85.8861 96.3368 84.7669 96.8004 83.6 96.8004V105.6C87.1008 105.6 90.4583 104.21 92.9338 101.734C95.4092 99.2587 96.8 95.9012 96.8 92.4004H88ZM83.6 61.6004C84.7669 61.6004 85.8861 62.064 86.7112 62.8891C87.5364 63.7143 88 64.8334 88 66.0004H96.8C96.8 62.4995 95.4092 59.1421 92.9338 56.6666C90.4583 54.1911 87.1008 52.8004 83.6 52.8004V61.6004ZM48.4 52.8004C44.8991 52.8004 41.5416 54.1911 39.0661 56.6666C36.5907 59.1421 35.2 62.4995 35.2 66.0004H44C44 64.8334 44.4635 63.7143 45.2887 62.8891C46.1138 62.064 47.233 61.6004 48.4 61.6004V52.8004ZM52.8 57.2004V49.4652H44V57.2004H52.8ZM77.1583 39.3804L80.4848 42.7156L86.7152 36.4852L83.3712 33.1588L77.1583 39.3804ZM67.056 35.2004C70.84 35.2004 74.4831 36.6964 77.1583 39.3804L83.3712 33.1588C81.2289 31.0158 78.6854 29.3159 75.886 28.1563C73.0866 26.9967 70.0861 26.4 67.056 26.4004V35.2004ZM52.8 49.4652C52.8 41.5892 59.18 35.2004 67.056 35.2004V26.4004C60.9388 26.4004 55.081 28.8304 50.7555 33.1559C46.43 37.4814 44 43.348 44 49.4652H52.8Z"/>
</svg>`, fill: '#FFE27A' },

    {svg: `<svg width="50" height="50" viewBox="0 0 132 132" xmlns="http://www.w3.org/2000/svg">
<path d="M93.5 49.5H49.5V38.5C49.5 34.1 51.15 30.25 54.45 26.95C61.05 20.35 71.5 20.35 77.55 26.95C79.75 29.15 80.85 31.9 81.95 34.65C82.5 37.4 85.8 39.05 88.55 38.5C91.3 37.95 93.5 34.65 92.4 31.9C91.3 26.95 88.55 22.55 85.25 19.25C80.3 13.75 73.15 11 66 11C50.6 11 38.5 23.1 38.5 38.5V49.5C29.15 49.5 22 56.65 22 66V104.5C22 113.85 29.15 121 38.5 121H93.5C102.85 121 110 113.85 110 104.5V66C110 56.65 102.85 49.5 93.5 49.5Z"/>
</svg>`, fill: '#FFE27A'},

    {svg: `<svg width="50" height="50" viewBox="0 0 132 132" xmlns="http://www.w3.org/2000/svg">
<path d="M65.9999 0C49.1243 0 35.5384 13.5858 35.5384 30.4615V50.7692C24.3692 50.7692 15.2307 59.9077 15.2307 71.0769V111.692C15.2307 122.862 24.3692 132 35.5384 132H96.4615C107.631 132 116.769 122.862 116.769 111.692V71.0769C116.769 59.9077 107.631 50.7692 96.4615 50.7692H45.6923V30.4615C45.6923 18.9065 54.4449 10.1538 65.9999 10.1538C77.555 10.1538 86.3076 18.9065 86.3076 30.4615V35.5385H96.4615V30.4615C96.4615 13.5858 82.8756 0 65.9999 0ZM65.9999 76.1538C71.5846 76.1538 76.1538 80.7231 76.1538 86.3077C76.1538 89.8615 74.123 93.3494 71.0769 94.8775V106.615C71.0769 109.662 69.0461 111.692 65.9999 111.692C62.9538 111.692 60.923 109.662 60.923 106.615V94.8725C57.8769 93.3494 55.8461 89.8615 55.8461 86.3077C55.8461 80.7231 60.4153 76.1538 65.9999 76.1538Z"/>
</svg>
`, fill: '#FFE27A'},

    {svg: `<svg width="50" height="50" viewBox="0 0 132 132" xmlns="http://www.w3.org/2000/svg">
<path d="M93.5 49.5H49.5V38.5C49.5 34.1 51.15 30.25 54.45 26.95C61.05 20.35 71.5 20.35 77.55 26.95C79.75 29.15 80.85 31.9 81.95 34.65C82.5 37.4 85.8 39.05 88.55 38.5C91.3 37.95 93.5 34.65 92.4 31.9C91.3 26.95 88.55 22.55 85.25 19.25C80.3 13.75 73.15 11 66 11C50.6 11 38.5 23.1 38.5 38.5V49.5C29.15 49.5 22 56.65 22 66V104.5C22 113.85 29.15 121 38.5 121H93.5C102.85 121 110 113.85 110 104.5V66C110 56.65 102.85 49.5 93.5 49.5ZM71.5 93.5C71.5 96.8 69.3 99 66 99C62.7 99 60.5 96.8 60.5 93.5V77C60.5 73.7 62.7 71.5 66 71.5C69.3 71.5 71.5 73.7 71.5 77V93.5Z"/>
</svg>

`, fill: '#FFE27A'},

    {svg: `<svg width="50" height="50" viewBox="0 0 132 132" xmlns="http://www.w3.org/2000/svg">
<path d="M66 71.5C64.5413 71.5 63.1424 72.0795 62.1109 73.111C61.0795 74.1424 60.5 75.5414 60.5 77V93.5C60.5 94.9587 61.0795 96.3577 62.1109 97.3891C63.1424 98.4206 64.5413 99 66 99C67.4587 99 68.8576 98.4206 69.8891 97.3891C70.9205 96.3577 71.5 94.9587 71.5 93.5V77C71.5 75.5414 70.9205 74.1424 69.8891 73.111C68.8576 72.0795 67.4587 71.5 66 71.5ZM93.5 49.5H49.5V38.5C49.492 35.2341 50.4534 32.0392 52.2624 29.32C54.0715 26.6008 56.6468 24.4797 59.6622 23.2252C62.6777 21.9708 65.9976 21.6394 69.2015 22.2731C72.4054 22.9068 75.3492 24.4771 77.66 26.785C79.7277 28.8974 81.2067 31.5141 81.95 34.375C82.1306 35.0756 82.4474 35.7338 82.8823 36.312C83.3172 36.8902 83.8618 37.377 84.4849 37.7447C85.1079 38.1125 85.7973 38.3538 86.5137 38.4551C87.2301 38.5564 87.9594 38.5156 88.66 38.335C89.3606 38.1545 90.0188 37.8377 90.597 37.4028C91.1751 36.9678 91.662 36.4233 92.0297 35.8002C92.3974 35.1771 92.6388 34.4877 92.7401 33.7713C92.8414 33.055 92.8006 32.3256 92.62 31.625C91.367 26.8665 88.8819 22.5222 85.415 19.03C81.566 15.1931 76.6664 12.5826 71.3348 11.5283C66.0032 10.474 60.4787 11.0231 55.459 13.1063C50.4393 15.1895 46.1494 18.7134 43.131 23.233C40.1127 27.7526 38.5012 33.0652 38.5 38.5V49.5C34.1239 49.5 29.9271 51.2384 26.8327 54.3328C23.7384 57.4271 22 61.624 22 66V104.5C22 108.876 23.7384 113.073 26.8327 116.167C29.9271 119.262 34.1239 121 38.5 121H93.5C97.8761 121 102.073 119.262 105.167 116.167C108.262 113.073 110 108.876 110 104.5V66C110 61.624 108.262 57.4271 105.167 54.3328C102.073 51.2384 97.8761 49.5 93.5 49.5ZM99 104.5C99 105.959 98.4205 107.358 97.3891 108.389C96.3576 109.421 94.9587 110 93.5 110H38.5C37.0413 110 35.6424 109.421 34.6109 108.389C33.5795 107.358 33 105.959 33 104.5V66C33 64.5414 33.5795 63.1424 34.6109 62.111C35.6424 61.0795 37.0413 60.5 38.5 60.5H93.5C94.9587 60.5 96.3576 61.0795 97.3891 62.111C98.4205 63.1424 99 64.5414 99 66V104.5Z"/>
</svg>`, fill: '#FFE27A'}    ];

    const [images, setImages] = useState(initialUnlockImages);
    const [selectedImage, setSelectedImage] = useState(initialUnlockImages[0]);
    const [selectedImageFill, setSelectedImageFill] = useState(initialUnlockImages[0].fill);
    const [isSvg, setIsSvg] = useState(true);
    const [color, setColor] = useState("#FFE27A");

    useEffect(() => {
        setSelectedImage(initialUnlockImages[0]);
    }, []);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const fileType = file.type;

            if (fileType === 'image/svg+xml') {
                setImages([...images, { svg: reader.result, fill: '#000000' }]);
            } else if (fileType === 'image/png') {
                const imageUrl = URL.createObjectURL(file);
                setImages([...images, { svg: `<img src="${imageUrl}" alt="uploaded png" style="width: 50px; height: 50px;" />`, fill: '' }]);
            }
        };

        reader.readAsText(file);
    };

    const handleImageClick = (index) => {
        const selected = images[index];
        setSelectedImage(selected);
        setSelectedImageFill(selected.fill);
        setIsSvg(selected.svg.startsWith('<svg'));
    };

    const handleColorChange = (color) => {
        setColor(color.hex);
        if (isSvg) {
            setSelectedImageFill(color.hex);
        }
    };

    const toggleMenu = (event, buttonId) => {
        setIsOpen(!isOpen);
        setActiveButton(isOpen ? null : buttonId);
    };

    const menuRef = useRef(null);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
            setActiveButton(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleChangePasswordBgColor = (color) => {
        setPasswordBgColor(color.hex);
    };
    const handleChangePasswordKeypadColor = (color) => {
        setPasswordKeypadColor(color.hex);
    };
    const handleChangePasswordKeypadFontColor = (color) => {
        setPasswordKeypadFontColor(color.hex);
    };
    const handleChangePasswordTitleColor = (color) => {
        setPasswordTitleColor(color.hex);
        setPasswordSecondTitleColor(addColor(color.hex, "#191301"));
    };

    const handlePasswordButton = async () => {
        try {
            const canvas = await html2canvas(document.querySelector(".unlock_icon div"));
            const resizedCanvas = document.createElement('canvas');
            resizedCanvas.width = 132;
            resizedCanvas.height = 132;
            const ctx = resizedCanvas.getContext('2d');
            ctx.drawImage(canvas, 0, 0, 132, 132);
            const dataUrl = resizedCanvas.toDataURL("image/png");

            const response = await fetch('/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: dataUrl })
            });

            if (response.ok) {
                console.log('Image uploaded successfully');
                window.location.href = "/step2/Friendlist";
            } else {
                console.error('Image upload failed');
            }
        } catch (error) {
            console.error('Error uploading image', error);
        }
    };

    return (
        <div className='wrap'>
            <Themeguide />

            <div className='background'>
                <div className='info-wrap' ref={menuRef}>

                    {isOpen && (
                        <div className="drawer">
                            {activeButton === 'password_bg_color_set' && (
                                <SketchPicker color={passwordBgColor} onChangeComplete={handleChangePasswordBgColor} />
                            )}

                            {activeButton === 'password_title_color_set' && (
                                <SketchPicker color={passwordTitleColor} onChangeComplete={handleChangePasswordTitleColor} />
                            )}

                            {activeButton === 'password_keypad_bg_color_set' && (
                                <SketchPicker color={passwordKeypadColor} onChangeComplete={handleChangePasswordKeypadColor} />
                            )}

                            {activeButton === 'password_font_color_set' && (
                                <SketchPicker color={passwordKeypadFontColor} onChangeComplete={handleChangePasswordKeypadFontColor} />
                            )}

                            {(activeButton === 'lock_icon_set' || activeButton === 'unlock_icon_set') && (
                                <div className="image-box">
                                    <div className="image-grid">
                                        {images.map((content, index) => (
                                            <div
                                                key={index}
                                                className={`image-cell ${selectedImage === content ? 'selected' : ''}`}
                                                onClick={() => handleImageClick(index)}
                                            >
                                                <div dangerouslySetInnerHTML={{ __html: content.svg }} style={{ fill: content.fill, width: '50px', height: '50px' }} />
                                            </div>
                                        ))}
                                        <div className="image-cell add-image" style={{ width: '50px', height: '50px' }}>
                                            <label htmlFor="imageUpload" style={{ color: '#3d3d3d' }}>이미지 추가</label>
                                            <input
                                                id="imageUpload"
                                                type="file"
                                                accept="image/svg+xml, image/png"
                                                style={{ display: 'none' }}
                                                onChange={handleImageUpload}
                                            />
                                        </div>
                                    </div>
                                    {isSvg && (
                                        <div className="color-picker">
                                            <SketchPicker color={color} onChangeComplete={handleColorChange} />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    <div className='password-style'>
                        <div className='password_bg_color'>
                            <Password_bg_color_comp bgColor={passwordBgColor} />
                        </div>
                        <div className='password_keypad_color'>
                            <Password_keypad_color_comp keypadColor={passwordKeypadColor} />
                        </div>
                        <div className='password_text'>
                            <div className='password_title_color'>
                                <Password_title_color_comp color={passwordTitleColor} />
                            </div>

                            <div className='password_second_title_color'>
                                <Password_second_title_color_comp color={passwordSecondTitleColor} />
                            </div>
                        </div>
                        <div className='password_keypad_font_color'>
                            <Password_font_color_cmp color={passwordKeypadFontColor} />
                        </div>

                        <div className='lock_icon_zone'>
                            <div className='unlock_icon'>
                                <div dangerouslySetInnerHTML={{ __html: selectedImage.svg }} style={{ fill: selectedImageFill, width: '50px', height: '50px' }} />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <div dangerouslySetInnerHTML={{ __html: selectedImage.svg }} style={{ fill: selectedImageFill, width: '50px', height: '50px' }} />
                            </div>

                            <div className='lock_icon'>
                                <Lock_icon_cmp1 color={passwordLockIconColor} />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Lock_icon_cmp2 color={passwordLockIconColor} />
                            </div>
                        </div>

                        <div className='password_setting_zone'>
                            <div className='password_bg_color_set'>
                                <img onClick={(event) => toggleMenu(event, 'password_bg_color_set')} alt='비밀번호 색상 버튼 미선택' src={activeButton === 'password_bg_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                            </div>
                            <div className='password_title_color_set'>
                                <img onClick={(event) => toggleMenu(event, 'password_title_color_set')} alt='비밀번호 색상 버튼 미선택' src={activeButton === 'password_title_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                            </div>
                            <div className='password_keypad_bg_color_set'>
                                <img onClick={(event) => toggleMenu(event, 'password_keypad_bg_color_set')} alt='비밀번호 색상 버튼 미선택' src={activeButton === 'password_keypad_bg_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                            </div>
                            <div className='password_font_color_set'>
                                <img onClick={(event) => toggleMenu(event, 'password_font_color_set')} alt='비밀번호 색상 버튼 미선택' src={activeButton === 'password_font_color_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                            </div>
                            <div className='unlock_icon_set'>
                                <img onClick={(event) => toggleMenu(event, 'unlock_icon_set')} alt='비밀번호 색상 버튼 미선택' src={activeButton === 'unlock_icon_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                            </div>
                            <div className='lock_icon_set'>
                                <img onClick={(event) => toggleMenu(event, 'lock_icon_set')} alt='비밀번호 색상 버튼 미선택' src={activeButton === 'lock_icon_set' ? "/setIcon.png" : "/notSetIcon.png"} />
                            </div>
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