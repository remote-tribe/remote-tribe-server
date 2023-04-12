const { Schema, model } = require('mongoose')

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: [true, 'First name is required.'],
		},
		lastName: {
			type: String,
			required: [true, 'Last name is required.'],
		},
		username: {
			type: String,
			required: [true, 'Username is required'],
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
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
)

const User = model('User', userSchema)

module.exports = User
