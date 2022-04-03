import { resolve } from 'path';
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

app.use(express.static(resolve('./build')));

// Upgrade http to https on heroku
if (isProdEnv)
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https')
            res.redirect(`https://${req.header('host')}${req.url}`);
        else next();
    });

app.use('/api/v1/chats', chatsRouter);
app.use('/api/v1/users', usersRouter);
app.get('/*', (req, res) => res.sendFile(resolve('./build/index.html')));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
