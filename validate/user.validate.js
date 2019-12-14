module.exports.postCreate = function(req, res, next) {
	var errors = [] // to check if user type something
		if (!req.body.name) {
			errors.push('Name is required.')
		}
		if (!req.body.phone) {
			errors.push('Phone is required.')
		}
		if (errors.length) {
			res.render('users/create', {
				errors: errors,
				values: req.body
			})
			return
		}
	next()
}