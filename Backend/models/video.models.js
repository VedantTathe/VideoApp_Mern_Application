const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    videoname: {
        type: String,
        trim: true,
        required: true
    },
    videolink: {
        type: String,
        trim: true,
        required: true
    },
    websitelink: {
        type: String,
        trim: true,
        required: true,
    },
    githublink: {
        type: String,
        trim: true,
        required: true,
    }
});


const videoModel = mongoose.model('Video', videoSchema);

module.exports = videoModel;