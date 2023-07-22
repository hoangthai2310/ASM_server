const express = require('express');
const router = express.Router();
const loginController = require('../app/controllers/LoginController');
const checkLogin = require('../app/controllers/CheckLogin');
const multer = require('multer');
const storage = require('../app/Multer/Multer');

const upload = multer({ storage: storage });

router.post('/login', loginController.login);

router.post('/signup', upload.single('image'), loginController.signup);

router.get('/', loginController.index);

module.exports = router;