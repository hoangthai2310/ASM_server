const express = require('express');
const router = express.Router();

const homeController = require('../app/controllers/HomeController');
const checkLogin = require('../app/controllers/CheckLogin');


router.get('/', checkLogin ,homeController.index);

module.exports = router;