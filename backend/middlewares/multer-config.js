const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images/');
    },
    filename: (req, file, callback) => {
        if (!file || !MIME_TYPES[file.mimetype]) {
            return callback(new Error('Invalid file type'));
        }
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

console.log(storage);

const uploadImage = multer({ storage }).single('cover');

module.exports = {
    uploadImage,
};