var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var sessionSchema = new mongoose.Schema({
	_id: ObjectId,
	id: String,
	cart: 
	{ type: Map, of: Number	}
});

var Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;