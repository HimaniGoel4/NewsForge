// Fetch news for the selected category
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

    // Loop through the articles and display them
    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('news-item');
        
        articleElement.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.content ? article.content : 'No content available.'}</p>
            <span><strong>Author:</strong> ${article.author || 'Unknown'}</span><br>
            <span><strong>Published:</strong> ${new Date(article.publishedAt).toLocaleDateString()}</span>
        `;

        newsList.appendChild(articleElement);
    });
}

// Fetch news for the default category on page load
window.onload = () => {
    const category = 'technology';  // You can change this to dynamically fetch based on user input
    fetchNews(category);
};

// Alternatively, use `DOMContentLoaded` to ensure the page content is loaded
document.addEventListener('DOMContentLoaded', function () {
    // If you have other logic like categories, use that logic here to fetch the relevant category
    const category = 'sports'; // Replace this with dynamic category
    fetchNews(category);
});

