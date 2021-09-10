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