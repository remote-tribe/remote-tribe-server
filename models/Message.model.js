const { Schema, model } = require('mongoose')

const messageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            required: [true, 'Sender is required.'],
            ref: "User"
        },
        receiver: {
            type: Schema.Types.ObjectId,
            required: [true, 'Receiver is required.'],
            ref: "User"
        },

        content: {
            type: String,
            required: [true, 'Content is required.'],
        },
    },
    {
        timestamps: true,
    },
)

const Message = model('Message', messageSchema)

module.exports = Message
