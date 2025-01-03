const fetchNews = async (category) => {
    try {
        const response = await fetch(`https://newsforge-p9te.onrender.com/api/news?category=${category}`);
        const data = await response.json();
        if (response.ok) {
            displayArticles(data); // Call your function to display the articles
        } else {
            throw new Error('Failed to fetch articles');
        }
    } catch (error) {
        console.error('Error fetching articles:', error);
    }
};

// Function to display articles on the page
function displayArticles(articles) {
    const newsList = document.getElementById('news-list');
    newsList.innerHTML = '';  // Clear the previous articles

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('news-item');

        articleElement.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.content ? article.content : 'No content available.'}</p>
            <span><strong>Author:</strong> ${article.author || 'Unknown'}</span><br>
            <span><strong>Published:</strong> ${new Date(article.publishedAt).toLocaleDateString()}</span>
        `;

        
    });
}

// Fetch news for the default category on page load
window.onload = fetchNews;
// frontend/script.js
document.addEventListener('DOMContentLoaded', function () {
    // Fetch articles from the backend when the page loads
    fetch('https://newsforge-p9te.onrender.com/articles')  // Assuming the backend is running on port 5003
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById('news-container');
            data.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.classList.add('article');
                articleElement.innerHTML = `
                    <h3>${article.title}</h3>
                    <p>${article.content}</p>
                    <p><strong>Source:</strong> ${article.source}</p>
                    <p><strong>Published on:</strong> ${new Date(article.publishedAt).toLocaleDateString()}</p>
                `;
                newsContainer.appendChild(articleElement);
            });
        })
        .catch(error => console.error('Error fetching articles:', error));
});


