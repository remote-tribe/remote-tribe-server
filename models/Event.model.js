const { Schema, model } = require('mongoose')

const eventSchema = new Schema(
    {
        host: {
            type: Schema.Types.ObjectId,
            required: [true, 'Host is required.'],
            ref: "User"

        },
        attendees: {
            type: [Schema.Types.ObjectId],
            ref: "User"
        },

        subject: {
            type: String,
            required: [true, 'Subject is required.'],
        },

        time: {
            type: String,
            required: [true, 'Time is required.']
        },

        Comments: {
            type: [Schema.Types.ObjectId],
            ref: "Comment"
        },

        Likes: {
            type: Number,
        },

        images: {
            type: String,
        },
        map: {
            type: String,
        }
    },
    {
        timestamps: true,
    },
)

const Event = model('Event', eventSchema)

module.exports = Event
