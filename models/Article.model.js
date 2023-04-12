const { Schema, model } = require('mongoose')

const articleSchema = new Schema(
	{
		Author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},

		title: {
			type: String,
			required: [true, 'Title is required.'],
			unique: true,
		},
		Content: {
			type: String,
			required: [true, 'Content is required.'],
		},
		Comments: {
			type: [Schema.Types.ObjectId],
			ref: 'Comment',
		},
		Likes: {
			type: Number,
		},

		images: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
)

const Article = model('Article', articleSchema)

module.exports = Article
