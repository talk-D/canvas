const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // CORS 설정을 위해 추가

const app = express();
const port = 4000;

// 특정 도메인만 허용하고 싶을 경우 아래와 같이 설정

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

app.post('/upload', (req, res) => {
    const base64Data = req.body.image;
    if (!base64Data.startsWith('data:image/png;base64,')) {
        return res.status(400).send('Invalid image format');
    }

    const imageData = base64Data.replace(/^data:image\/png;base64,/, '');
    const imagePath = path.join(__dirname, 'ktheme', 'Images', 'passcodeImgCode01@3x.png');

    fs.writeFile(imagePath, imageData, 'base64', (err) => {
        if (err) {
            console.error('Error saving the image:', err);
            res.status(500).send('Error saving the image');
        } else {
            console.log('Image saved successfully');
            res.status(200).send('Image saved successfully');
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
