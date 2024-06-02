import React from 'react';

export function InitializeLocalStorage() {

    // 테마 정보를 로컬 스토리지에 저장
    // password창
    localStorage.setItem("passwordBgColor", "#FFFFFF");
    localStorage.setItem("passwordTitleColor", "#4A4A4A");
    localStorage.setItem("passwordSecondTitleColor", "#B9B9B9");
    localStorage.setItem("passwordKeypadColor", "#FFECB4");
    localStorage.setItem("passwordKeypadFontColor", "#828282");

    // friendlist창
    localStorage.setItem("friendlistBgColor", "#FFFFFF");
    localStorage.setItem("friendlistTitleColor", "#4D4D4D");
    localStorage.setItem("friendlistSecondTitleColor", "#828282");
    localStorage.setItem("friendlistDividingLineColor", "#EBEBEB");
    localStorage.setItem("friendlistNameColor", "#4D4D4D");
    localStorage.setItem("friendlistMessageColor", "#4D4D4D");
    localStorage.setItem("friendlistProfileColor", "#FFECB4");

    // tabbar창
    localStorage.setItem("tabbarBgColor", "#FFFFFF");

    localStorage.setItem("tabbarFriendFillColor", "#FFFFFF");
    localStorage.setItem("tabbarFriendStrokeColor", "#FFE27A");
    localStorage.setItem("tabbarChatFillColor", "#FFFFFF");
    localStorage.setItem("tabbarChatStrokeColor", "#FFE27A");
    localStorage.setItem("tabbarOpenchatFillColor", "#FFFFFF");
    localStorage.setItem("tabbarOpenchatStrokeColor", "#FFE27A");
    localStorage.setItem("tabbarShopFillColor", "#FFFFFF");
    localStorage.setItem("tabbarShopStrokeColor", "#FFE27A");
    localStorage.setItem("tabbarSettingFillColor", "#FFFFFF");
    localStorage.setItem("tabbarSettingStrokeColor", "#FFE27A");

    localStorage.setItem("tabbarFriendFillColorSelected", "#FFFBD2");
    localStorage.setItem("tabbarFriendStrokeColorSelected", "#FFE27A");
    localStorage.setItem("tabbarChatFillColorSelected", "#FFFBD2");
    localStorage.setItem("tabbarChatStrokeColorSelected", "#FFE27A");
    localStorage.setItem("tabbarOpenchatFillColorSelected", "#FFFBD2");
    localStorage.setItem("tabbarOpenchatStrokeColorSelected", "#FFE27A");
    localStorage.setItem("tabbarShopFillColorSelected", "#FFFBD2");
    localStorage.setItem("tabbarShopStrokeColorSelected", "#FFE27A");
    localStorage.setItem("tabbarSettingFillColorSelected", "#FFFBD2");
    localStorage.setItem("tabbarSettingStrokeColorSelected", "#FFE27A");

    // chatroom창
    localStorage.setItem("chatroomBgColor", "#FFFFFF");
    localStorage.setItem("chatroomTitleColor", "#3D3D3D");
    localStorage.setItem("chatroomNameColor", "#3D3D3D");

    localStorage.setItem("chatroomReceiveBg1Color", "#FFECB4");
    localStorage.setItem("chatroomReceiveBg2Color", "#FFECB4");
    localStorage.setItem("chatroomReceiveTextColor", "#3D3D3D");
    localStorage.setItem("chatroomReceiveUnreadTextColor", "#828282");

    localStorage.setItem("chatroomSendBg1Color", "#FFECB4");
    localStorage.setItem("chatroomSendBg2Color", "#FFECB4");
    localStorage.setItem("chatroomSendTextColor", "#3D3D3D");
    localStorage.setItem("chatroomSendUnreadTextColor", "#828282");

    localStorage.setItem("chatroomInputBgColor", "#FFECB4");
    localStorage.setItem("chatroomInputIconColor", "#828282");


    // notification창
    localStorage.setItem("notificationBgColor", "#FFECB4");
    localStorage.setItem("notificationNameColor", "#3D3D3D");
    localStorage.setItem("notificationMessageColor", "#828282");


}