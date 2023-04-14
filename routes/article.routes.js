const express = require('express')
const router = express.Router()
const User = require('../models/User.model')
const Comment = require('../models/Comment.model')
const Article = require('../models/Article.model')
const fileUploader = require('../config/cloudinary.config')

//READ: list of articles from community
router.get('/community/articles', async (req, res) => {
	try {
		const data = await Article.find().populate('author')
		res.json(data)
	} catch (err) {
		res.status(500).json({
			message: 'Error retrieving Articles.',
		})
	}
})

//READ: article details
router.get('/community/article/:articleId', async (req, res, next) => {
	try {
		const { articleId } = req.params

		const articleDetails = await Article.findById(articleId)
			.populate('author')
			.populate({
				path: 'comments',
				populate: {
					path: 'author',
					model: 'User',
				},
			})

		res.json(articleDetails)
	} catch (err) {
		res.status(500).json({
			message: 'Error retrieving the Article',
		})
	}
})

//CREATE: article
router.post('/community/articles', fileUploader.single('article-image'), async (req, res) => {
	try {
		const { userId, title, content } = req.body

		if (!userId || !title || !content) {
			console.log('Missing required fields:', { userId, title, content })
			return res.status(400).json({
				message: 'Missing required fields',
			})
		}
		const author = await User.findById(userId)

		if (!author) {
			console.log('User not found')
			return res.status(404).json({
				message: 'User not found',
			})
		}
		const article = await Article.create({
			author,
			title,
			content,
			imageUrl: 'https://unsplash.com/s/photos/random-photo',
		})

		if (!article) {
			console.log('Error creating Article')
			return res.status(404).json({ message: 'Error creating Article' })
		}
		await author.updateOne({ $push: { articles: article } })

		res.status(201).json(article)
	} catch (error) {
		console.error('Error creating article:', error)
		res.status(500).json({
			message: 'Error creating Article',
		})
	}
})

// UPDATE:  article
router.put('/community/article/:articleId', fileUploader.single('post-image'), async (req, res, next) => {
	try {
		const { articleId } = req.params

		const updatedArticle = await Article.findByIdAndUpdate(articleId, req.body, { new: true })

		if (!updatedArticle) {
			return res.status(404).json({ message: 'Article not found' })
		}
		res.json(updatedArticle)
	} catch (error) {
		res.status(500).json({ message: 'Error updating Article' })
	}
})

//DELETE article
router.delete('/community/article/:articleId', async (req, res, next) => {
	try {
		const { articleId, userId } = req.query
		if (!articleId || !userId) {
			return res.status(400).json({ message: 'Missing query Parameters.' })
		}

		const article = await Article.findById(articleId).populate('comments')
		if (!article) {
			return res.status(404).json({ message: 'Article not found.' })
		}

		const user = await User.findById(userId).populate('articles').populate('comments')
		if (!user) {
			return res.status(404).json({ message: 'User not found.' })
		}

		const articleIndex = user.articles.findIndex((a) => a._id.equals(articleId))
		if (articleIndex !== -1) {
			user.articles.splice(articleIndex, 1)
			await user.save()
		}

		for (const comment of article.comments) {
			const commentIndex = user.comments.findIndex((c) => c._id.equals(comment._id))
			if (commentIndex !== -1) {
				user.comments.splice(commentIndex, 1)
				await user.save()
			}

			await Comment.findByIdAndDelete(comment._id)
		}

		await Article.findByIdAndDelete(articleId)

		res.status(200).json({ message: 'Article deleted Successfully.' })
	} catch (err) {
		res.status(500).json({ message: 'Error deleting Article' })
	}
})

//GET my-article
//READ: list of articles from community
router.get('/community/my-articles/:userId', (req, res, next) => {
	const userId = req.params

	Article.find({ author: userId })
		.then((articleArr) => {
			const data = {
				article: articleArr,
			}
			res.json(data)
		})
		.catch((err) => {
			console.log('error getting the article', err)
			res.status(500).json({
				message: 'error getting the article',
				error: err,
			})
		})
})

module.exports = router
