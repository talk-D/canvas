const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const archiver = require('archiver');

const app = express();
const port = 5000;

app.use(bodyParser.json({ limit: '10mb' }));

// Enable CORS
app.use(cors());

// 이미지 업로드 엔드포인트
app.post('/upload', (req, res) => {
    const { unlockImage, lockImage } = req.body;
    if (!unlockImage || !lockImage) {
        return res.status(400).send('No images provided');
    }

    const unlockImageData = unlockImage.replace(/^data:image\/png;base64,/, '');
    const lockImageData = lockImage.replace(/^data:image\/png;base64,/, '');

    const unlockImagePaths = [
        path.join(__dirname, 'ktheme', 'Images', 'passcodeImgCode01Selected@3x.png'),
        path.join(__dirname, 'ktheme', 'Images', 'passcodeImgCode02Selected@3x.png'),
        path.join(__dirname, 'ktheme', 'Images', 'passcodeImgCode03Selected@3x.png'),
        path.join(__dirname, 'ktheme', 'Images', 'passcodeImgCode04Selected@3x.png')
    ];

    const lockImagePaths = [
        path.join(__dirname, 'ktheme', 'Images', 'passcodeImgCode01@3x.png'),
        path.join(__dirname, 'ktheme', 'Images', 'passcodeImgCode02@3x.png'),
        path.join(__dirname, 'ktheme', 'Images', 'passcodeImgCode03@3x.png'),
        path.join(__dirname, 'ktheme', 'Images', 'passcodeImgCode04@3x.png')
    ];

    const saveImage = (imageData, paths) => {
        return Promise.all(paths.map((imagePath) => {
            return new Promise((resolve, reject) => {
                fs.writeFile(imagePath, imageData, 'base64', (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        }));
    };

    Promise.all([saveImage(unlockImageData, unlockImagePaths), saveImage(lockImageData, lockImagePaths)])
        .then(() => {
            console.log('All images saved successfully');
            res.status(200).send('All images saved successfully');
        })
        .catch((err) => {
            console.error('Error saving the images:', err);
            res.status(500).send('Error saving the images');
        });
});

app.get('/Step3', (req, res) => {
    // 로컬스토리지에서 변수를 읽어오는 예시입니다.
    // 실제로는 클라이언트 측에서 AJAX 요청 등을 통해 서버로 변수를 전달해야 합니다.
    const themeNameKorean = req.query.themeNameKorean;
    const themeVersion = req.query.themeVersion;
    const themeNameEnglish = req.query.themeNameEnglish;
    const tabbarBgColor = req.query.tabbarBgColor;
    const friendlistTitleColor = req.query.friendlistTitleColor;
    const friendlistBgColor = req.query.friendlistBgColor;
    const friendlistMessageColor = req.query.friendlistMessageColor;
    const friendlistNameColor = req.query.friendlistNameColor;
    const chatroomBgColor = req.query.chatroomBgColor;
    const chatroomInputBgColor = req.query.chatroomInputBgColor;
    const chatroomInputIconColor = req.query.chatroomInputIconColor;
    const chatroomSendTextcolor = req.query.chatroomSendTextcolor;
    const chatroomSendUnreadTextColor = req.query.chatroomSendUnreadTextColor;
    const chatroomrRceiveTextColor = req.query.chatroomrRceiveTextColor;
    const chatroomReceiveUnreadTextColor = req.query.chatroomReceiveUnreadTextColor;
    const passwordBgColor = req.query.passwordBgColor;
    const passwordTitleColor = req.query.passwordTitleColor;
    const passwordKeypadColor = req.query.passwordKeypadColor;
    const passwordKeypadFontColor = req.query.passwordKeypadFontColor;
    const notificationBgColor = req.query.notificationBgColor;
    const notificationNameColor = req.query.notificationNameColor;
    const notificationMessageColor = req.query.notificationMessageColor;

    const content = `
/*
 Manifest
 */

ManifestStyle
{
    -kakaotalk-theme-name: ${themeNameKorean};
    -kakaotalk-theme-version: ${themeVersion}; 
    -kakaotalk-theme-url: 'http://www.kakao.com';
    -kakaotalk-author-name: 'talk:D';
    -kakaotalk-theme-id: 'com.kakao.talk.theme.'${themeNameEnglish};
}


/*
 TabBar Style
 */

TabBarStyle-Main
{
    /* 배경 이미지 */
    background-color: ${tabbarBgColor};
    -ios-background-image: 'maintabBgImage.png';        /* 배경 이미지 top-center-crop */
    
    /* 홈탭 */
    -ios-home-normal-icon-image: 'maintabIcoHome.png';
    -ios-home-selected-icon-image: 'maintabIcoHomeSelected.png';
    /* 친구탭 */
    -ios-friends-normal-icon-image: 'maintabIcoFriends.png';
    -ios-friends-selected-icon-image: 'maintabIcoFriendsSelected.png';
    /* 채팅탭 */
    -ios-chats-normal-icon-image: 'maintabIcoChats.png';
    -ios-chats-selected-icon-image: 'maintabIcoChatsSelected.png';
    /* 친구찾기 (글로벌) */
    -ios-find-normal-icon-image: 'maintabIcoFind.png';
    -ios-find-selected-icon-image: 'maintabIcoFindSelected.png';
    /* 채널탭 */
    -ios-browse-normal-icon-image: 'maintabIcoBrowse.png';
    -ios-browse-selected-icon-image: 'maintabIcoBrowseSelected.png';    
    /* 뷰탭 */
    -ios-view-normal-icon-image: 'maintabIcoView.png';
    -ios-view-selected-icon-image: 'maintabIcoViewSelected.png';
    /* 만화탭 (일본) */
    -ios-piccoma-normal-icon-image: 'maintabIcoPiccoma.png';
    -ios-piccoma-selected-icon-image: 'maintabIcoPiccomaSelected.png';
    /* 쇼핑탭 */
    -ios-shopping-normal-icon-image: 'maintabIcoShopping.png';
    -ios-shopping-selected-icon-image: 'maintabIcoShoppingSelected.png';
    /* 콜탭 */
    -ios-call-normal-icon-image: 'maintabIcoCall.png';
    -ios-call-selected-icon-image: 'maintabIcoCallSelected.png';
    /* 더보기탭 */
    -ios-more-normal-icon-image: 'maintabIcoMore.png';
    -ios-more-selected-icon-image: 'maintabIcoMoreSelected.png';
}


/*
 MainView Style
 */

HeaderStyle-Main
{
    -ios-text-color: ${friendlistTitleColor};

    -ios-tab-text-color: ${friendlistTitleColor};
    -ios-tab-highlighted-text-color: ${friendlistTitleColor};
}

MainViewStyle-Primary
{
    background-color: ${friendlistBgColor};
    -ios-background-image: 'mainBgImage.png';

    /* 텍스트 스타일 */                                        /* 이름변경 */
    -ios-text-color: ${friendlistTitleColor};                            /* Title : 리스트 목록*/
    -ios-highlighted-text-color: ${friendlistTitleColor};                        /* Title Pressed */
    
    -ios-description-text-color: ${friendlistMessageColor};                    /* Description : 상태메세지 */
    -ios-description-highlighted-text-color: ${friendlistMessageColor};        /* Description Pressed */

    -ios-paragraph-text-color: ${friendlistMessageColor};                    /* Paragraph : 라스트메세지 */ 
    -ios-paragraph-highlighted-text-color: #${friendlistMessageColor};          /* Paragraph Pressed*/

    /* 셀 스타일 */
    -ios-normal-background-color: #5b5b5b;                 /* Cell Background */
    -ios-normal-background-alpha: 0.0;
    
    -ios-selected-background-color: #4a4a4a;               /* Cell Background Pressed */
    -ios-selected-background-alpha: 0.05;
}

MainViewStyle-Secondary
{
    background-color: ${friendlistBgColor};
}

SectionTitleStyle-Main
{    
    border-color: #5b5b5b;
    border-alpha: 0.09;
    
    -ios-text-color: #4a4a4a;
    -ios-text-alpha: 1.0;
}


/*
 Feature Style
 */

FeatureStyle-Primary                                       /* Primary : 버튼 텍스트 */
{
    -ios-text-color: ${friendlistNameColor};
}


ButtonStyle-AddFriend
{
    -ios-image: 'findBtnAddFriend.png';
}


/*
 DefaultProfile Style
*/

DefaultProfileStyle
{
    /* 프로필 */
    -ios-profile-images: 'profileImg01.png';
}


/*
 ChatRoom Style
 */

BackgroundStyle-ChatRoom
{
    background-color: ${chatroomBgColor};
    -ios-background-image: 'chatroomBgImage.png';
}

InputBarStyle-Chat
{
    /* 입력창 배경 */
    background-color: ${chatroomInputBgColor};
    
    /* 전송 버튼 */
    -ios-send-normal-background-color: ${chatroomInputIconColor};
    -ios-send-normal-foreground-color: #FFFFFF;
    
    -ios-send-highlighted-background-color: #FFFFFF;
    -ios-send-highlighted-foreground-color: ${chatroomInputIconColor};

    /* 그밖의 버튼 */
    -ios-button-normal-foreground-color: ${chatroomInputIconColor};
    -ios-button-highlighted-foreground-color: ${chatroomInputIconColor};
}


/*
 Message Style
 */

MessageCellStyle-Send
{
    -ios-background-image: 'chatroomBubbleSend01.png' 20px 18.36px;
    -ios-selected-background-image: 'chatroomBubbleSend01Selected.png' 20px 18.36px;
    -ios-group-background-image: 'chatroomBubbleSend02.png' 20px 18.36px;
    -ios-group-selected-background-image: 'chatroomBubbleSend02Selected.png' 20px 18.36px;
    -ios-title-edgeinsets: 10px 13.5px 7px 15px;  /* top, left, bottom, right */
    -ios-group-title-edgeinsets: 10px 13.5px 7px 15px;

    -ios-text-color: ${chatroomSendTextcolor};
    -ios-selected-text-color: ${chatroomSendTextcolor};
    -ios-unread-text-color: ${chatroomSendUnreadTextColor};
}

MessageCellStyle-Receive
{
    -ios-background-image: 'chatroomBubbleReceive01.png' 23.36px 17.5px;
    -ios-selected-background-image: 'chatroomBubbleReceive01Selected.png' 23.36px 17.5px;
    -ios-group-background-image: 'chatroomBubbleReceive02.png' 23.36px 17.5px;
    -ios-group-selected-background-image: 'chatroomBubbleReceive02Selected.png' 23.36px 17.5px; 
    -ios-title-edgeinsets: 10px 15px 7px 12.8px;  /* top, left, bottom, right */
    -ios-group-title-edgeinsets: 10px 15px 7px 12.8px;

    -ios-text-color: ${chatroomrRceiveTextColor};
    -ios-selected-text-color: ${chatroomrRceiveTextColor};
    -ios-unread-text-color: ${chatroomReceiveUnreadTextColor};
}


/*
 Passcode Style
 */

BackgroundStyle-Passcode
{
    background-color: ${passwordBgColor};
    -ios-background-image: 'passcodeBgImage.png';
}

LabelStyle-PasscodeTitle
{
    -ios-text-color: ${passwordTitleColor};
}


PasscodeStyle
{
    -ios-bullet-first-image: 'passcodeImgCode01.png';
    -ios-bullet-second-image: 'passcodeImgCode02.png';
    -ios-bullet-third-image: 'passcodeImgCode03.png';
    -ios-bullet-fourth-image: 'passcodeImgCode04.png';
    
    -ios-bullet-selected-first-image: 'passcodeImgCode01Selected.png';
    -ios-bullet-selected-second-image: 'passcodeImgCode02Selected.png';
    -ios-bullet-selected-third-image: 'passcodeImgCode03Selected.png';
    -ios-bullet-selected-fourth-image: 'passcodeImgCode04Selected.png';
    
    -ios-keypad-background-color: ${passwordKeypadColor};
    -ios-keypad-text-normal-color: ${passwordKeypadFontColor};
        
    -ios-keypad-number-highlighted-image : 'passcodeKeypadPressed.png';
}


/*
 Message Notification Bar Style
 */

BackgroundStyle-MessageNotificationBar
{
    background-color: ${notificationBgColor};
}

LabelStyle-MessageNotificationBarName
{
    -ios-text-color: ${notificationNameColor};
}

LabelStyle-MessageNotificationBarMessage
{
    -ios-text-color: ${notificationMessageColor};
}


/*
 Direct Share
*/

BackgroundStyle-DirectShareBar
{
    background-color:  ${notificationBgColor};
}

LabelStyle-DirectShareBarName
{
    -ios-text-color: ${notificationNameColor};
}

LabelStyle-DirectShareBarMessage
{
    -ios-text-color: ${notificationMessageColor};
}


/*
 BottomBanner Style
 */

BottomBannerStyle {
    background-color: ${tabbarBgColor};
}
    `;

    // ktheme 디렉토리가 존재하는지 확인하고 없으면 생성
    const kthemeDir = path.join(__dirname, 'ktheme');
    if (!fs.existsSync(kthemeDir)) {
        fs.mkdirSync(kthemeDir);
    }

    // KakaoTalkTheme.css 파일 생성
    fs.writeFileSync(path.join(kthemeDir, 'KakaoTalkTheme.css'), content);

    const zipFilePath = path.join(__dirname, 'ktheme', 'ktheme.zip');
    const kthemeFilePath = path.join(__dirname, 'ktheme', 'ktheme.ktheme');

    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
        console.log(`Zip file created: ${archive.pointer()} total bytes`);

        // 파일 확장자를 .ktheme으로 변경
        fs.rename(zipFilePath, kthemeFilePath, (err) => {
            if (err) {
                console.error('Error renaming the file:', err);
                res.status(500).send('Error renaming the file');
                return;
            }

            const downloadFileName = `${themeNameEnglish}.ktheme`;
            res.download(kthemeFilePath, downloadFileName, (err) => {
                if (err) {
                    console.error('Error downloading the file:', err);
                    res.status(500).send('Error downloading the file');
                }
            });
        });
    });

    archive.on('error', (err) => {
        throw err;
    });

    archive.pipe(output);

    // 압축할 폴더 및 파일 지정
    archive.directory(path.join(__dirname, 'ktheme', 'Images'), 'Images');
    archive.file(path.join(__dirname, 'ktheme', 'KakaoTalkTheme.css'), { name: 'KakaoTalkTheme.css' });

    archive.finalize();
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
