const express = require('express');
const router = express.Router();
const checkLogin = require('../app/controllers/CheckLogin');
const multer = require('multer');
const qluserController = require('../app/controllers/QluserController');
const storage = require('../app/Multer/Multer');

const upload = multer({storage: storage});

router.post('/deleteuser', checkLogin, qluserController.delete);
router.post('/postputuser', checkLogin, upload.single('image'), qluserController.postorput);
router.post('/search', checkLogin, qluserController.search);
// router.get('/search', checkLogin, qluserController.index);
router.get('/', checkLogin, qluserController.index);

module.exports = router;
