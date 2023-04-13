const express = require('express')
const router = express.Router()
const app = express()

// require cloudinary
const fileUploader = require('../config/cloudinary.config')

//require Article model
const Article = require('../models/Article.model')

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const { isAuthenticated } = require('../middleware/jwt.middleware')

//READ: list of articles from community
router.get('/community/articles', isAuthenticated, (req, res, next) => {
	Article.find()
		.then((articleArr) => {
			const data = {
				article: articleArr,
			}
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

// CREATE: article

router.post(
	'/community/articles',
	fileUploader.single('article-image'),
	isAuthenticated,
	(req, res, next) => {
		const { title, content } = req.body
		const userId = req.session.currentUser._id
		const { imageUrl } = req.file.path || ''

		Article.create({ author: userId, title, content, imageUrl, createdAt: new Date() })
			.then((responseFromDB) => {
				res.status(201).json(responseFromDB)
			})
			.catch((err) => {
				console.log('error creating article', err)
				res.status(500).json({
					message: 'error creating article',
					error: err,
				})
			})
	},
)

//READ: article details
router.get('/community/article/:articleId', isAuthenticated, (req, res, next) => {
	const { articleId } = req.params

	Article.findById(articleId)
		.populate('author', 'comments')
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
router.delete('/community/article/:articleId', isAuthenticated, (req, res, next) => {
	const { articleId } = req.params

	Article.findByIdAndDelete(articleId)
		.then(() => res.json('this article was deleted'))
		.catch((error) => next(error))
})

// UPDATE:  article
router.put(
	'/community/article/:articleId',
	isAuthenticated,

	fileUploader.single('post-image'),
	(req, res, next) => {
		const { articleId } = req.params

		Article.findByIdAndUpdate(articleId, req.body, { new: true })
			.then((updatedArticle) => {
				res.json(updatedArticle)
			})
			.catch((error) => next(error))
	},
)

//GET my-article
//READ: list of articles from community
router.get('/community/my-articles', isAuthenticated, (req, res, next) => {
	const userId = req.session.currentUser._id

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
