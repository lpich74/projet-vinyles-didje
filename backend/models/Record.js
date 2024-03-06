const mongoose = require('mongoose');

const recordSchema = mongoose.Schema({
    userId: { type: String, required: true },
    cover: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    genre: { type: String, required: true },   
    ratings: [
        {
            userId: { type: String, required: true },
            grade: { type: Number, required: true }
        }
    ],
    state: { type: String, required: true },
    comments: { type: String }
});

module.exports = mongoose.model('Record', recordSchema);