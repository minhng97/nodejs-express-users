var Session = require('../models/session.model');

module.exports.addToCart = async function(req, res, next) {
	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId;

	if(!sessionId) {
		res.redirect('/products');
		return;
	}

	var session = await Session.find();
	var currentSession = session.filter(x => x.id === sessionId)[0];
	var currentProduct =  currentSession.cart.get(productId);
	
	if (currentProduct) {
		currentSession.cart.set(productId, currentProduct + 1);
		currentSession.save();
	}
	else {currentSession.cart.set(productId, 1);
	currentSession.save();}


	res.redirect('/products');
}
