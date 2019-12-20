var db = require('../db');

module.exports.requireAuth = (req, res, next) => {
	if(!req.signedCookies.userId) { // if no cookie redirect to login page
		res.redirect('/auth/login');
		return;
	}

	var user = db.get('users').find({ id: req.signedCookies.userId }).value();

	if(!user) {	// if cookies.userId is wrong redirect to login page
		res.redirect('/auth/login');
		return;
	}

	res.locals.user = user;
	next(); // to next route
}