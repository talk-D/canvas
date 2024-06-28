const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.delete('/', (req, res) => {
    const directoryPath = path.join(__dirname, '../ktheme');

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Unable to scan directory:', err); // 디버깅 로그 추가
            return res.status(500).send('Unable to scan directory');
        }

        let deletePromises = files.map((file) => {
            if (path.extname(file) === '.ktheme') {
                return new Promise((resolve, reject) => {
                    fs.unlink(path.join(directoryPath, file), (err) => {
                        if (err) {
                            console.error('Error deleting file:', err); // 디버깅 로그 추가
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
            } else {
                return Promise.resolve();
            }
        });

        Promise.all(deletePromises)
            .then(() => res.send('ktheme files deleted successfully'))
            .catch((err) => {
                console.error('Error deleting files:', err); // 디버깅 로그 추가
                res.status(500).send('Error deleting file(s)');
            });
    });
});

module.exports = router;
