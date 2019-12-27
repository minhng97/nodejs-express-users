var User = require('../models/user.model');

// if this file is required out side, var module.exports = controller => module.exports.index = controller.index
module.exports.index = async (req, res) => {
	var users = await User.find();
		res.render('users/index', { // render the index.pug in users/index
			users: users //array of users in mongo database
}
)}
module.exports.search = async (req, res) => { // function start when get users/search
	var q = req.query.q;//req.query = q?abc=xyz
	var users = await User.find();
	var matchedUsers = await users.filter(function(user){ //filter the user name
		return user.name.toLowerCase().includes(q.toLowerCase());
	});

	res.render('users/index', { // find and render the index.pug file
		users: matchedUsers // list of matched user name
	});
}

module.exports.create =  (req, res) => { 
	res.render('users/create') 
}
module.exports.get = async (req, res) => { // must be under users/create or it will missunderstand
	var id = await req.params.id; // find the :id in user.route
	var users = await User.find();
	var userView = await users.find(el => el._id === id);
	console.log(userView)
	 	res.render('users/view', { // render view.pug with object is users
	 		user: userView
 	});
}
module.exports.postCreate = async (req, res) => { // when post request, add user into db.json
	var ObjectID = require('mongodb').ObjectID;
	req.body.avatar = await req.file.path.split('\\').slice(1).join('/');

	var newUser = await new User({ _id: new ObjectID(), name: req.body.name, phone: req.body.phone, avatar: req.body.avatar });
   
    newUser.save(function (err, usr) {
      if (err) return console.error(err);
      console.log(usr.name + " saved to users collection.");
    });

	res.redirect('./');
}