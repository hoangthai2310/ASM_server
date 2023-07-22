const express = require('express');
const router = express.Router();
const multer = require('multer');
const infoController = require('../app/controllers/InfoController');
const checkLogin = require('../app/controllers/CheckLogin');
const storage = require('../app/Multer/Multer');

const upload = multer({ storage: storage });

router.post('/update', upload.single('image'),infoController.update)

router.get('/',checkLogin,infoController.index);

module.exports = router;