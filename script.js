const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let quotes = [];

const showLoadingSpinner = () => {
    loader.hidden = false; 
    quoteContainer.hidden = true; 
}

const removeLoadingSpinner = () => {
    quoteContainer.hidden = false; 
    loader.hidden = true; 
}

const newQuote = () => {
    showLoadingSpinner();
    const quoteData = quotes[Math.floor(Math.random() * quotes.length)];
    // Check if author is equal to null
    if (!quoteData.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quoteData.author;
    }
    // Check if quoteText is too long make font-size smaller
    if (quoteData.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set quote, hide loader
    quoteText.textContent = quoteData.text;
    removeLoadingSpinner();
}

// Get quotes from API
const getQuotes = async () => {
    showLoadingSpinner();
    try {
        const response = await fetch('https://type.fit/api/quotes');
        quotes = await response.json();
        newQuote()
    } catch (error) {
        newQuote();
    }
}
// Tweet Quote
const tweetQuote = () => {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// ON load
getQuotes();