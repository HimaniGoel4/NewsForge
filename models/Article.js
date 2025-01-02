
const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String },
    publishedAt: { type: Date },
    content: { type: String },
    source: { type: String },
    processed: { type: Boolean, default: true }
});

module.exports = mongoose.model('Article', ArticleSchema);
