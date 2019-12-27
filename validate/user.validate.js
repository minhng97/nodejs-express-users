module.exports.postCreate = function(req, res, next) {
	var errors = [] // to check if input has something
		if (!req.body.name) {
			errors.push('Name is required.')
		}
		if (!req.body.phone) {
			errors.push('Phone is required.')
		}
		if (!req.body.avata) {
			errors.push('Avatar is required.')
		}
		if (errors.length) {
			res.render('users/create', {
				errors: errors,
				values: req.body
			})
			return
		}
	res.locals.success = true 
	next()
}