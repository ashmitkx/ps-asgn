import mongoose from 'mongoose';
const { Schema } = mongoose;

const chatSchema = new Schema({
    userIds: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    messages: [
        {
            text: String,
            timestamp: {
                type: Date,
                default: () => new Date()
            },
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ]
});

export const Chat = mongoose.model('chat', chatSchema);
