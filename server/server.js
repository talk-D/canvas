const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());

// Routes
const uploadRoute = require('./routes/upload');
const tabbarRoute = require('./routes/tabbar');
const generateThemeRoute = require('./routes/generateTheme');
const passwordRoute = require('./routes/password');
const friendlistRoute = require('./routes/friendlist');
const chatroomRoute = require('./routes/chatroom');
const uploadRoutes = require('./routes/uploadChatImg');

app.use('/upload', uploadRoute);
app.use('/tabbar', tabbarRoute);
app.use('/Step3', generateThemeRoute);
app.use('/Password', passwordRoute);
app.use('/friendlist', friendlistRoute);
app.use('/chatroom', chatroomRoute);

app.use(express.static(path.join(__dirname, '../public')));

app.use('/server/ktheme/Images', uploadRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
