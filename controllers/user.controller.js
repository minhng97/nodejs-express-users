const db = require('../db')
const shortid = require('shortid')

// if this file is required out side, var module.exports = controller => module.exports.index = controller.index
module.exports.index = (req, res) => {
	res.render('users/index', { // render the index.pug in users/index
	users: db.get('users').value() //array of users in db.json
}
)}
module.exports.search =  (req, res) => { // function start when get users/search
	var q = req.query.q;//req.query = q?abc=xyz
	var matchedUsers = db.get('users').value().filter(function(user){ //filter the user name
		return user.name.toLowerCase().includes(q.toLowerCase());
	});

	res.render('users/index', { // find and render the index.pug file
		users: matchedUsers // list of matched user name
	});
}

module.exports.create =  (req, res) => { 
	//console.log(req.cookies); // log the cookie in server-side
	res.render('users/create') 
}
module.exports.get = (req, res) => { // must be under users/create or it will missunderstand
	var id = req.params.id; // find the :id
	var user = db.get('users').find({ id: id }).value(); // find user with an id
 	res.render('users/view', { // render view.pug with object is users
 		user: user
 	});
}
module.exports.postCreate = (req, res) => { // when post request, add user name into db.json
	req.body.id = shortid.generate();

	//console.log(res.locals) // in user.validate
	db.get('users').push(req.body).write();
	res.redirect('./');
}