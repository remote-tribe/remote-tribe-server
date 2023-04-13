const { Schema, model } = require('mongoose')

const articleSchema = new Schema(
	{
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},

		title: {
			type: String,
			required: [true, 'Title is required.'],
			unique: true,
		},
		content: {
			type: String,
			required: [true, 'Content is required.'],
		},
		comments: {
			type: [Schema.Types.ObjectId],
			ref: 'Comment',
		},
		likes: {
			type: Number,
		},

		likedBy: {
			type: [Schema.Types.ObjectId],
			ref: 'User',
		},

		imageUrl: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
)

const Article = model('Article', articleSchema)

module.exports = Article
