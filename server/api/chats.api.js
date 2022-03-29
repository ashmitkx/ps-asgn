import { Chat } from '../models/chat.model.js';

export async function createChat(req, res, next) {
    const { userIds } = req.body;

    let chat;
    try {
        chat = await Chat.create({ userIds });
    } catch (e) {
        console.error(e);
        return next(e);
    }
    
    res.status(201).json(chat);
}

export async function getMessages(req, res, next) {
    const { id: chatId } = req.params;

    // get chat document
    let chat;
    try {
        chat = await Chat.findById(chatId);
    } catch (e) {
        console.error(e);
        return next(e);
    }
    
    res.json(chat.messages);
}

export async function postMessage(req, res, next) {
    const { id: chatId } = req.params;
    const { userId, text } = req.body;
    
    // get chat document
    let chat;
    try {
        chat = await Chat.findById(chatId);
    } catch (e) {
        console.error(e);
        return next(e);
    }
    
    const newMessage = { userId, text };
    chat.messages.unshift(newMessage);
    
    try {
        await chat.save();
    } catch (e) {
        console.error(e);
        return next(e);
    }
    
    res.status(201).json(chat.messages[0]);
}
