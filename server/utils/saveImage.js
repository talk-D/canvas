const fs = require('fs');

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

module.exports = saveImage;
