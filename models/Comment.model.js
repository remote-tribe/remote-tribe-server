const { Schema, model } = require('mongoose')

const commentSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },

        article: {
            type: Schema.Types.ObjectId,
            ref: 'Article',
        },

        content: {
            type: String,
            required: [true, 'Content is required.'],
        },

        likes: {
            type: Number,
        },
    },
    {
        timestamps: true,
    },
)

const Comment = model('Comment', commentSchema)

module.exports = Comment
