const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middleware/jwt.middleware')
const User = require('../models/User.model')
const Comment = require('../models/Comment.model')
const Article = require('../models/Article.model')

router.post('/comment', isAuthenticated, async (req, res) => {
	try {
		const { userId, commentValue, articleId } = req.body

		const author = await User.findById(userId).populate('comments')

		if (!author) {
			return res.status(404).json({ message: 'User not found' })
		}

		const article = await Article.findById(articleId).populate('comments')

		if (!article) {
			return res.status(404).json({ message: 'Article not found' })
		}

		const comment = await Comment.create({ author, article: articleId, content: commentValue })

		author.comments.push(comment)
		article.comments.push(comment)

		await Promise.all([comment.save(), author.save(), article.save()])

		return res.status(200).json({ message: 'Comment created successfully' })
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' })
	}
})

module.exports = router
