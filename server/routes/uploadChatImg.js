const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.status(200).send('File uploaded successfully');
});

module.exports = router;
