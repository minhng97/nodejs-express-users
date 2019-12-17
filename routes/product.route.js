var express = require('express')
var router = express.Router()

const controller = require('../controllers/product.controller') //  controller = module.exports

router.get('/', controller.index); 
module.exports = router