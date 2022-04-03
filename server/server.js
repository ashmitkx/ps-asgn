import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

import { chatsRouter } from './routes/chats.route.js';
import { usersRouter } from './routes/users.route.js';

// env vars
const PORT = process.env.PORT || 5000;
const clientUrl = process.env.CLIENT_BASE_URL;
const mongoUrl = process.env.MONGO_URL;
const isProdEnv = process.env.NODE_ENV === 'production';

// connect to mongo
const mongoConnOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(mongoUrl, mongoConnOptions).then(() => console.log('Connected to Mongo.'));

const app = express();

// cors setup
const corsOptions = {
    origin: clientUrl
};
app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/v1/chats', chatsRouter);
app.use('/api/v1/users', usersRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
