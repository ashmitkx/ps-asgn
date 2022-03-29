import mongoose from 'mongoose';
import express from 'express';

import { chatsRouter } from './routes/chats.route.js';

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

app.use(express.json());

app.use('/api/v1/chats', chatsRouter)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
