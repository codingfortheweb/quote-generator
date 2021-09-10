const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let quotes = [];

// Show loading
const loading = () => {
    loader.hidden = false; // Show loader
    quoteContainer.hidden = true; // Hide quoteContainer
}

// Hide loading
const complete = () => {
    quoteContainer.hidden = false; // Show quoteContainer
    loader.hidden = true; // Hide loader
}

const newQuote = () => {
    loading();
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
    complete();
}

// Get quotes from API
const getQuotes = async () => {
    loading();
    try {
        const response = await fetch('https://type.fit/api/quotes');
        quotes = await response.json();
        newQuote()
    } catch (error) {
        console.log(error);
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