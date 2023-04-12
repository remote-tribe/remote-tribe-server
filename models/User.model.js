const { Schema, model } = require('mongoose')

const userSchema = new Schema(
	{
		isAdmin: {
			type: Boolean,
			default: false,
		},
		email: {
			type: String,
			required: [true, 'Email is required.'],
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, 'Password is required.'],
		},
		firstName: {
			type: String,
			required: [true, 'First name is required.'],
		},
		secondName: {
			type: String,
			required: [true, 'Second name is required.'],
		},
		description: {
			type: String,
		},
		profilePicture: {
			type: String,
		},
		location: {
			type: String,
		},
		articles: {
			type: [Schema.Types.ObjectId],
			ref: 'Article',
		},
		friends: {
			type: [Schema.Types.ObjectId],
			ref: 'User',
		},
		profession: {
			type: String,
		},
		messages: {
			type: [Schema.Types.ObjectId],
			ref: 'Message',
		},
		events: {
			type: [Schema.Types.ObjectId],
			ref: 'Event',
		},
	},
	{
		timestamps: true,
	},
)

const User = model('User', userSchema)

module.exports = User
