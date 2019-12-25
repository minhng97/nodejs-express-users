var User = require('../models/user.model');
const md5 = require('md5');

module.exports.login = (req, res) => {
	res.render('auth/login'); // render the index.pug in users/index
}

module.exports.postLogin = async (req, res) => {
	var email = await req.body.email;
	var password = await req.body.password;
	var user = await User.find();
	var matchedUser = await user.filter(user => user.email === email );
	if(!matchedUser[0]) {
		res.render('auth/login', {
			errors: ['User does not exist'],
			values: req.body
		});
		return;
	}

	var hashPassword = await md5(password);
	
	if(matchedUser[0].password !== hashPassword) {
		res.render('auth/login', {
			errors: ['Wrong password'],
			values: req.body
		});
		return;
	}

	res.cookie('userId', user[0]._id, {
		signed: true
	});
	res.redirect('/users');
}