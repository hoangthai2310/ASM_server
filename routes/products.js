const express = require('express');
const router = express.Router();
const checkLogin = require('../app/controllers/CheckLogin');

const productsController = require('../app/controllers/ProductsController');

router.use('/',checkLogin,productsController.index);

module.exports = router;