var express = require('express')
var router = express.Router()

const validate = require('../validate/user.validate')
const controller = require('../controllers/user.controller') //  controller = module.exports

router.get('/', controller.index); // module.exports.index

router.get('/cookie', (req, res, next) => { // when user access /cookie
	res.cookie('user-id', 12345) // response back, save the cookie to browser
})

router.get('/search', controller.search);

router.get('/create', controller.create);
router.get('/:id', controller.get)

router.post('/create', validate.postCreate, controller.postCreate);

module.exports = router