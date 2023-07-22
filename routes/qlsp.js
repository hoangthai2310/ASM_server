const express = require('express');
const router = express.Router();
const checkLogin = require('../app/controllers/CheckLogin');
const multer = require('multer');
const qlspController = require('../app/controllers/QlspController');

const storage = require('../app/Multer/Multer');
const upload = multer({ storage: storage });


router.post('/deleteproduct',checkLogin,qlspController.delete);

router.post('/postproduct',checkLogin,upload.single('image'),qlspController.postorput);

router.post('/search',checkLogin,qlspController.search);
router.get('/search',checkLogin,qlspController.index);

router.get('/',checkLogin,qlspController.index);

module.exports = router;