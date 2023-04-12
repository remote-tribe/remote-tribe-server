function isAdmin(req, res, next) {
	if (!req.payload || !req.payload.userId) {
		return res.status(401).json({ message: 'Unauthorized' })
	}

	if (req.payload.role !== 'admin') {
		return res.status(403).json({ message: 'Forbidden' })
	}

	next()
}

module.exports = isAdmin
