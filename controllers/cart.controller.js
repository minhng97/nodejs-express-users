var Session = require('../models/session.model');
var Product = require('../models/product.model');

module.exports.addToCart = async function(req, res, next) {
	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId;

	if(!sessionId) {
		res.redirect('/products');
		return;
	}

	var sessions = await Session.find();
	var currentSession = sessions.find(ses => ses.id === sessionId);
	var currentCart = currentSession.cart;
	var currentProduct =  currentCart.get(productId);
	
	if (currentProduct) {
		currentCart.set(productId, currentProduct + 1);
		currentSession.save();
	}
	else {currentCart.set(productId, 1);
		currentSession.save();
	}


	res.redirect('/products');
};

module.exports.myCart = async function(req, res, next) {
	var sessionId = req.signedCookies.sessionId;
	var sessions = await Session.find();

	var currentSession = sessions.find(ses => ses.id === sessionId);

	var currentCart = currentSession.cart;

	var dbProducts = await Product.find();

var t = Object.entries(currentCart);
var l = (t[0][1].cart)
console.log((l))
	//var renderProduct = dbProducts.map(product => product._id === currentCart )

//	console.log(Object.entries(currentCart) );
	res.render('../views/cartView', { products: currentCart })

}
