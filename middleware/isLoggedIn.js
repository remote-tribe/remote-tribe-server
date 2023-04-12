function isLoggedIn(req, res, next) {
	if (!req.payload || !req.payload.userId) {
		return res.status(401).json({ message: 'Unauthorized' })
	}

	next()
}

module.exports = isLoggedIn
