const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 파일 크기 제한
});

router.post('/uploadImage', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { filename } = req.body;

        // 'ktheme/Images' 폴더 안의 특정 파일 경로를 생성합니다.
        const outputPath = path.join(__dirname, '..', 'ktheme', 'Images', filename);

        // 업로드된 이미지를 지정된 경로에 저장합니다.
        fs.writeFileSync(outputPath, req.file.buffer);

        res.status(200).json({ message: 'Image uploaded and saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

module.exports = router;
