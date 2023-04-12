const { Schema, model } = require('mongoose')

const commentSchema = new Schema(
    {
        Author: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },

        article: {
            type: Schema.Types.ObjectId,
            ref: 'Article',
        },

        Content: {
            type: String,
            required: [true, 'Content is required.'],
        },

        Likes: {
            type: Number,
        },
    },
    {
        timestamps: true,
    },
)

const Comment = model('Comment', commentSchema)

module.exports = Comment
