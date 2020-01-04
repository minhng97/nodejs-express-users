var User = require('../models/user.model');
const md5 = require('md5');

module.exports.login = (req, res) => {
	res.render('auth/login'); // render the index.pug in users/index
}

module.exports.postLogin = async (req, res) => {
	var email = req.body.email;
	var password = req.body.password;
	var matchedUser = await User.findOne( {email: email});
	console.log(matchedUser)
	if(!matchedUser) {
		res.render('auth/login', {
			errors: ['User does not exist'],
			values: req.body
		});
		return;
	}

	var hashPassword = md5(password);
	
	if(matchedUser.password !== hashPassword) {
		res.render('auth/login', {
			errors: ['Wrong password'],
			values: req.body
		});
		return;
	}

	res.cookie('userId', matchedUser._id, {
		signed: true
	});
	res.redirect('/users');
}