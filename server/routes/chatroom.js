const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');  // Add this line to require the fs module

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../ktheme/Images');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), (req, res) => {
    try {
        res.status(200).send('File uploaded successfully');
    } catch (error) {
        res.status(500).send('Error uploading file');
    }
});

module.exports = router;
