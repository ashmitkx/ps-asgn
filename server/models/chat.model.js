import mongoose from 'mongoose';
const { Schema } = mongoose;

const chatSchema = new Schema({
    userIds: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    lastActive: {
        type: Date,
        default: () => new Date(),
        required: true
    },
    messages: [
        {
            text: String,
            timestamp: {
                type: Date,
                default: () => new Date(),
                required: true
            },
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'user',
                required: true
            }
        }
    ]
});

export const Chat = mongoose.model('chat', chatSchema);
