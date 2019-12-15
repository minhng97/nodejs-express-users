var express = require('express')
var router = express.Router()

const controller = require('../controllers/auth.controller') //  controller = module.exports

router.get('/login', controller.login); 
router.post('/login', controller.postLogin);
module.exports = router