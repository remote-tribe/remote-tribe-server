"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const conversationSchema = new mongoose_1.Schema({
    messages: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Message',
        },
    ],
    participants: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    ],
}, {
    timestamps: true,
});
const Conversation = (0, mongoose_1.model)('Conversation', conversationSchema);
module.exports = Conversation;
