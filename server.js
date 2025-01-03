
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');
const Article = require('./models/Article');
const cors = require('cors');

// Use the CORS middleware


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5004;
const MONGO_URI = process.env.MONGO_URI;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Fetch and save articles
app.post('/articles/fetch', async (req, res) => {
    try {
        const topic = req.body.topic || 'technology';
        const response = await axios.get(
            `https://newsapi.org/v2/everything?q=${topic}&apiKey=${NEWS_API_KEY}`
        );

        const articles = response.data.articles.map(article => ({
            title: article.title,
            author: article.author,
            publishedAt: article.publishedAt,
            content: article.content,
            source: article.source.name,
            url: article.url,
            processed: true
        }));

        await Article.insertMany(articles, { ordered: false });
        res.status(200).json({ message: 'Articles fetched and saved!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all articles
app.get('/articles', async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch articles based on category
app.get('/api/news', async (req, res) => {
    const category = req.query.category || 'general';  // Default category is 'general' if none is provided
    try {
        const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${NEWS_API_KEY}`
        );

        if (response.data.status === 'ok') {
            const articles = response.data.articles.map(article => ({
                title: article.title,
                author: article.author,
                publishedAt: article.publishedAt,
                content: article.content,
                source: article.source.name,
                url: article.url
            }));

            res.status(200).json(articles);  // Send the articles in the response
        } else {
            res.status(400).json({ error: 'Failed to fetch news' });
        }
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ error: error.message });
    }
});

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the NewsForge API!');
});




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
