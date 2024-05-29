const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

app.use(bodyParser.json({ limit: '10mb' }));

app.post('/upload', (req, res) => {
    const { image } = req.body;
    if (!image) {
        return res.status(400).send('No image provided');
    }

    const imageData = image.replace(/^data:image\/png;base64,/, '');
    const imagePaths = [
        path.join(__dirname, 'ktheme', 'Images', 'passcodeImgCode01@3x.png'),
        path.join(__dirname, 'ktheme', 'Images', 'passcodeImgCode02@3x.png'),
        path.join(__dirname, 'ktheme', 'Images', 'passcodeImgCode03@3x.png'),
        path.join(__dirname, 'ktheme', 'Images', 'passcodeImgCode04@3x.png'),
    ];

    const saveImagePromises = imagePaths.map((imagePath) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(imagePath, imageData, 'base64', (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    });

    Promise.all(saveImagePromises)
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
