var express = require('express')
var router = express.Router()
var multer = require('multer')

const validate = require('../validate/user.validate') // validate input field
const controller = require('../controllers/user.controller') //  controller = module.exports
const authMiddleware = require('../middlewares/auth.middleware')

const upload = multer({ dest: './public/uploads/' })

router.get('/', controller.index); // module.exports.index

router.get('/cookie', (req, res, next) => { // when user access /cookie
	res.cookie('user-id', 12345) // response back, save the cookie to browser
})

router.get('/search', controller.search);

router.get('/create', controller.create);
router.get('/:id', controller.get)

router.post('/create',
	upload.single('avatar'),
	validate.postCreate,
	controller.postCreate);

module.exports = router