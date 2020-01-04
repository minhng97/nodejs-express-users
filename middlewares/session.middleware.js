var shortid = require('shortid');
var Session = require('../models/session.model');

module.exports = async function(req, res, next) {
	if (!req.signedCookies.sessionId) {
	  var sessionId = await shortid.generate();
	  res.cookie('sessionId', sessionId, {
		signed: true
	});
	var ObjectID = require('mongodb').ObjectID;
	var newSession = await new Session({
		_id: ObjectID,
		id: sessionId,
		cart: {}
	 });
	
	newSession.save(function (err, ses) {
      if (err) return console.error(err);
      console.log(ses.id + " saved to sessions collection.")});
	 }

	next();
}