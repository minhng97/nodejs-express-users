var express = require('express')
var router = express.Router()

const validate = require('../validate/user.validate')
const controller = require('../controllers/user.controller') //  controller = module.exports

router.get('/', controller.index); // module.exports.index
router.get('/', (req, res) => res.send(console.log(express)) );

router.get('/search', controller.search);

router.get('/create', controller.create);
router.get('/:id', controller.get)

router.post('/create', validate.postCreate, controller.postCreate);

module.exports = router