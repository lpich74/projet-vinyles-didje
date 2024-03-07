const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const recordCtrl = require('../controllers/record.js');

router.post('/', auth, recordCtrl.createRecord);

module.exports = router;