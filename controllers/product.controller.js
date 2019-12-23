var Product = require('../models/product.model');

//const db = require('../db');

module.exports.index = async function(req, res) {
// 	var allProducts = db.get('products').value().length;

// 	var page = parseInt(req.query.page) || 1;
// 	var perPage = 8;

// 	var start = (page - 1) * perPage;
// 	var end = page * perPage;

// 	var drop = (page - 1) * perPage;
// 	var lastPage = Math.ceil(allProducts / perPage); 

// 	res.render('products/index', { 
// 	products: db.get('products').drop(drop).take(perPage).value(),
// 	page: page,
// 	end: lastPage
// }
// )
	var products = await Product.find();
		res.render('products/index', {
			products: products
	})
};