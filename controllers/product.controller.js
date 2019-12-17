const db = require('../db')

module.exports.index = (req, res) => {
	var allProducts = db.get('products').value().length

	var page = parseInt(req.query.page) || parseInt(1)
	var perPage = 8

	var start = (page - 1) * perPage
	var end = page * perPage

	var drop = (page - 1) * perPage
	var lastPage = parseInt(allProducts / perPage) + 1

	res.render('products/index', { 
	products: db.get('products').drop(drop).take(perPage).value(),
	page: page,
	end: lastPage
}
)}