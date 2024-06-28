import React from 'react';

const MakeTheme = async () => {
    // 로컬스토리지에서 값을 읽어옵니다.
    const themeSettings = {
        themeType: localStorage.getItem('themeType') || '',
        themeNameKorean: localStorage.getItem('themeNameKorean') || '',
        themeVersion: localStorage.getItem('themeVersion') || '',
        themeNameEnglish: localStorage.getItem('themeNameEnglish') || '',
        tabbarBgColor: localStorage.getItem('tabbarBgColor') || '',
        friendlistTitleColor: localStorage.getItem('friendlistTitleColor') || '',
        friendlistBgColor: localStorage.getItem('friendlistBgColor') || '',
        friendlistMessageColor: localStorage.getItem('friendlistMessageColor') || '',
        friendlistNameColor: localStorage.getItem('friendlistNameColor') || '',
        chatroomBgColor: localStorage.getItem('chatroomBgColor') || '',
        chatroomInputBgColor: localStorage.getItem('chatroomInputBgColor') || '',
        chatroomInputIconColor: localStorage.getItem('chatroomInputIconColor') || '',
        chatroomSendTextColor: localStorage.getItem('chatroomSendTextColor') || '',
        chatroomSendUnreadTextColor: localStorage.getItem('chatroomSendUnreadTextColor') || '',
        chatroomReceiveTextColor: localStorage.getItem('chatroomReceiveTextColor') || '',
        chatroomReceiveUnreadTextColor: localStorage.getItem('chatroomReceiveUnreadTextColor') || '',
        characterChatroomBgColor: localStorage.getItem('characterChatroomBgColor') || '',
        characterChatroomInputBgColor: localStorage.getItem('characterChatroomInputBgColor') || '',
        characterChatroomInputIconColor: localStorage.getItem('characterChatroomInputIconColor') || '',
        characterChatroomSendTextColor: localStorage.getItem('characterChatroomSendTextColor') || '',
        characterChatroomSendUnreadTextColor: localStorage.getItem('characterChatroomSendUnreadTextColor') || '',
        characterChatroomReceiveTextColor: localStorage.getItem('characterChatroomReceiveTextColor') || '',
        characterChatroomReceiveUnreadTextColor: localStorage.getItem('characterChatroomReceiveUnreadTextColor') || '',
        passwordBgColor: localStorage.getItem('passwordBgColor') || '',
        passwordTitleColor: localStorage.getItem('passwordTitleColor') || '',
        passwordKeypadColor: localStorage.getItem('passwordKeypadColor') || '',
        passwordKeypadFontColor: localStorage.getItem('passwordKeypadFontColor') || '',
        notificationBgColor: localStorage.getItem('notificationBgColor') || '',
        notificationNameColor: localStorage.getItem('notificationNameColor') || '',
        notificationMessageColor: localStorage.getItem('notificationMessageColor') || '',
    };

    // 쿼리 문자열 생성
    const params = new URLSearchParams(themeSettings).toString();
    const response = await fetch(`http://'+${process.env.HOST}+':'+${process.env.PORT}+'/Step3?${params}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${themeSettings.themeNameEnglish}.ktheme`;
    document.body.appendChild(a);
    a.click();
    a.remove();
}

export default MakeTheme;