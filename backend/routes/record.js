const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const recordCtrl = require('../controllers/record.js');

router.post('/', auth, multer.uploadImage, recordCtrl.createRecord);

module.exports = router;