const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String },
    publishedAt: { type: Date },
    content: { type: String },
    source: { type: String },
    url: {
        type: String,
        validate: {
            validator: function (value) {
                // Regex for validating URLs
                const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
                return urlRegex.test(value);
            },
            message: 'Invalid URL'
        }
    },
    processed: { type: Boolean, default: true }
});

module.exports = mongoose.model('Article', ArticleSchema);
