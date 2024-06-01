const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json({ limit: '10mb' }));

// Enable CORS
app.use(cors());

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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
