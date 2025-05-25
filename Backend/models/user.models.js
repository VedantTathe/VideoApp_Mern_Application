const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    }
});


const userModel = mongoose.model('User', userSchema);

module.exports = userModel;