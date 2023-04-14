const express = require('express')
const router = express.Router()
const User = require('../models/User.model')
const Comment = require('../models/Comment.model')

// require cloudinary
const fileUploader = require('../config/cloudinary.config')

//require Article model
const Article = require('../models/Article.model')

//READ: list of articles from community
router.get('/community/articles', (req, res, next) => {
	Article.find()
		.populate('author')
		.then((data) => {
			res.json(data)
		})
		.catch((err) => {
			console.log('error getting list of articles', err)
			res.status(500).json({
				message: 'error getting list of articles',
				error: err,
			})
		})
})

//CREATE: article

router.post('/community/articles', fileUploader.single('article-image'), async (req, res, next) => {
	const { userId, title, content, imageUrl } = req.body
	try {
		let author = await User.findById(userId)
		if (!author) {
			return res.status(404).json({
				message: 'User not found',
			})
		}
		const createdArticle = await Article.create({ author, title, content, imageUrl, createdAt: new Date() })

		author.articles.push(createdArticle)
		await author.save()

		res.status(201).json(createdArticle)
	} catch (error) {
		res.status(500).json({
			message: 'Error creating Article',
			error,
		})
	}
})

//READ: article details
router.get('/community/article/:articleId', (req, res, next) => {
	const { articleId } = req.params

	Article.findById(articleId)
		.populate('author')
		.populate({
			path: 'comments',
			populate: {
				path: 'author',
				model: 'User',
			},
		})

		.then((articleDetails) => {
			res.json(articleDetails)
		})
		.catch((err) => {
			console.log('error getting the article', err)
			res.status(500).json({
				message: 'error getting the article',
				error: err,
			})
		})
})

//DELETE article
router.delete('/community/article/:articleId', (req, res, next) => {
	const { articleId } = req.params

	Article.findByIdAndDelete(articleId)
		.then(() => res.json('this article was deleted'))
		.catch((error) => next(error))
})

// UPDATE:  article
router.put('/community/article/:articleId', fileUploader.single('post-image'), (req, res, next) => {
	const { articleId } = req.params

	Article.findByIdAndUpdate(articleId, req.body, { new: true })
		.then((updatedArticle) => {
			res.json(updatedArticle)
		})
		.catch((error) => next(error))
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
