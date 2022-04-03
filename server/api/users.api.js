import mongoose from 'mongoose';
import { Chat } from '../models/chat.model.js';
import { User } from '../models/user.model.js';

export async function searchUser(req, res, next) {
    const { userId, handle } = req.query;

    const query = {};
    if (userId) query.userId = userId;
    if (handle) query.handle = handle;

    let user;
    try {
        user = await User.findOne(query);
    } catch (e) {
        console.error(e);
        return next(e);
    }

    res.json(user);
}

export async function getUserChats(req, res, next) {
    let { id: userId } = req.params;
    userId = mongoose.Types.ObjectId(userId);

    const pipeline = [
        { $match: { $expr: { $in: [userId, '$userIds'] } } },
        { $unwind: '$userIds' },
        { $match: { userIds: { $ne: userId } } },
        { $lookup: { from: 'users', localField: 'userIds', foreignField: '_id', as: 'otherUser' } },
        { $project: { _id: 1, lastMessage: { $first: '$messages' }, otherUser: 1, lastActive: 1 } },
        { $unwind: '$otherUser' },
        { $sort: { lastActive: -1 } }
    ];

    let chats;
    try {
        chats = await Chat.aggregate(pipeline);
    } catch (e) {
        console.error(e);
        return next(e);
    }

    res.json(chats);
}
