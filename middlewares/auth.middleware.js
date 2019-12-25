var User = require('../models/user.model');

module.exports.requireAuth = async (req, res, next) => {
	if(!req.signedCookies.userId) { // if no cookie redirect to login page
		res.redirect('/auth/login');
		return;

	}
	var user = await User.find();
	matchedUser = await user.filter(user => user._id === req.signedCookies.userId);

	if(!matchedUser[0]) {	// if cookies.userId is wrong redirect to login page
		res.redirect('/auth/login');
		return;

	}

	res.locals.user = matchedUser[0];
	next(); // to next route
}