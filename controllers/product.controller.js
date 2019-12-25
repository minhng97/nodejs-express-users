var Product = require('../models/product.model');

module.exports.index = async function(req, res) {

	var products = await Product.find();

		var allProducts = await products.length;

		var page = await parseInt(req.query.page) || 1;
		var perPage = 8;

		var start = await (page - 1) * perPage;
		var end = await page * perPage;

		var drop = await (page - 1) * perPage;
		var lastPage = await Math.ceil(allProducts / perPage);

		res.render('products/index', {
			products: products.slice(drop, page*perPage),
			page: page,
			end: lastPage
	})
};