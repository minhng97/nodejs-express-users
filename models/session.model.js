var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
	id: String,
	cart: 
	{ type: Map, of: Number	}
});

var Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;