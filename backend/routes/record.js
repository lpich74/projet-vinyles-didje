const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const recordCtrl = require('../controllers/record.js');

router.get('/', recordCtrl.getAllRecords);
router.get('/myrecords/', auth, recordCtrl.getMyRecords);
router.get('/myrecords/:id', auth, recordCtrl.getOneRecord);

router.post('/', auth, multer.uploadImage, recordCtrl.createRecord);

router.put('/:id', auth, multer.uploadImage, recordCtrl.modifyRecord);

router.delete('/:id', auth, recordCtrl.deleteRecord);

module.exports = router;