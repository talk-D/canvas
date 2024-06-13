const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.post('/', (req, res) => {
    const imageData = req.body.image;
    const base64Data = imageData.replace(/^data:image\/png;base64,/, "");

    const filePath = path.join(__dirname, '../ktheme/Images/commonIcoTheme.png');

    fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) {
            console.error('Failed to save image:', err);
            res.status(500).send('Failed to save image');
        } else {
            res.status(200).send('Image saved successfully');
        }
    });
});

module.exports = router;
