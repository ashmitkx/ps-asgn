import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    handle: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
});

export const User = mongoose.model('user', userSchema);
