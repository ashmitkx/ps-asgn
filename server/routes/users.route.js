import { Router } from 'express';
import { getUserChats, searchUser } from '../api/users.api.js';

// @route: /users
const router = Router();

router.route('/search').get(searchUser);
router.route('/:id/chats').get(getUserChats);

export { router as usersRouter };
