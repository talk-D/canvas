const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());

// 경로
const uploadRoute = require('./routes/upload');
const tabbarRoute = require('./routes/tabbar');
const generateThemeRoute = require('./routes/generateTheme');
const passwordRoute = require('./routes/password');
const friendlistRoute = require('./routes/friendlist');
const chatroomRoute = require('./routes/chatroom');
const imageProcessingRoute = require('./routes/imageProcessing');
const saveThumbnailRoute = require('./routes/saveThumbnail'); // 새로운 라우트 추가

app.use('/upload', uploadRoute);
app.use('/tabbar', tabbarRoute);
app.use('/Step3', generateThemeRoute);
app.use('/Password', passwordRoute);
app.use('/friendlist', friendlistRoute);
app.use('/chatroom', chatroomRoute);
app.use('/imageProcessing', imageProcessingRoute);
app.use('/saveThumbnail', saveThumbnailRoute); // 새로운 라우트 추가

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'build')));

// 모든 요청을 React 애플리케이션으로 라우팅
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
