const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [String],
    category: String,
    createdBy: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now },
    replies: [{ content: String, createdBy: String, createdAt: Date }],
    votes: [{ userId: String, type: String }] 
});

module.exports = mongoose.model('Thread', threadSchema);
