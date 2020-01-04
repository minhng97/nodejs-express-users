var User = require('../models/user.model');

module.exports.requireAuth = async (req, res, next) => {
	if(!req.signedCookies.userId) { // if no cookie redirect to login page
		res.redirect('/auth/login');
		return;

	}
	matchedUser = User.findById(req.signedCookies.userId);

	if(!matchedUser) {	// if cookies.userId is wrong redirect to login page
		res.redirect('/auth/login');
		return;

	}

	res.locals.user = matchedUser;
	next(); // to next route
}