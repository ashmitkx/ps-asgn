import { Router } from 'express';
import { createChat, getMessages, postMessage } from '../api/chats.api.js';

// @route: /chats
const router = Router();

router.route('/').post(createChat);
router.route('/:id').get(getMessages).post(postMessage);

export { router as chatsRouter };
