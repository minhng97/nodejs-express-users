var db = require('../db')

module.exports.requireAuth = (req, res, next) => {
	if(!req.cookies.userId) { // if no cookie redirect to login page
		res.redirect('/auth/login')
		return
	}

	var user = db.get('users').find({ id: req.cookies.userId }).value()

	if(!user) {	// if cookies.userId is wrong redirect to login page
		res.redirect('/auth/login')
		return
	}

	next() // to next route
}