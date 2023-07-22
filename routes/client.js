const express = require('express');
const router = express.Router();
const multer = require('multer');
const clientController = require('../app/controllers/clientController');
const storage = require('../app/Multer/Multer');

const upload = multer({ storage: storage });

router.post('/data', upload.single('image'), clientController.postData);
router.get('/data' ,clientController.index);


module.exports = router;