document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const modal = document.querySelector('.campaign-modal');
    const fileInput = document.getElementById('video-file');
    const youtubeInput = document.getElementById('youtube-link');
    const analyzeButton = document.getElementById('analyze-button');
    const resultsSection = document.querySelector('.results-section');
    const startOverButton = document.getElementById('start-over');
    const saveCampaignButton = document.getElementById('save-campaign');

    // API endpoint
    const API_URL = 'http://localhost:5000/api/analyze';

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            window.location.href = 'campaigns.html';
        }
    });

    // Handle file input
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            youtubeInput.value = '';
            youtubeInput.disabled = true;
            analyzeButton.disabled = false;
        } else {
            youtubeInput.disabled = false;
            analyzeButton.disabled = !youtubeInput.value;
        }
    });

    // Handle YouTube link input
    youtubeInput.addEventListener('input', () => {
        if (youtubeInput.value) {
            fileInput.value = '';
            fileInput.disabled = true;
            analyzeButton.disabled = false;
        } else {
            fileInput.disabled = false;
            analyzeButton.disabled = !fileInput.files.length;
        }
    });

    // Handle analyze button click
    analyzeButton.addEventListener('click', async () => {
        try {
            analyzeButton.disabled = true;
            analyzeButton.textContent = 'Analyzing...';

            let response;
            if (youtubeInput.value) {
                // Handle YouTube URL
                response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        youtube_url: youtubeInput.value
                    })
                });
            } else if (fileInput.files.length > 0) {
                // Handle video file upload
                const formData = new FormData();
                formData.append('video', fileInput.files[0]);
                
                response = await fetch(API_URL, {
                    method: 'POST',
                    body: formData
                });
            }

            if (!response.ok) {
                throw new Error('Failed to analyze video');
            }

            const data = await response.json();
            displayResults(data.results);

            // Reset button
            analyzeButton.textContent = 'Analyze Content';
            analyzeButton.style.display = 'none';
            resultsSection.style.display = 'block';
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to analyze video. Please try again.');
            analyzeButton.disabled = false;
            analyzeButton.textContent = 'Analyze Content';
        }
    });

    // Display results
    function displayResults(products) {
        const productsList = document.getElementById('products-list');
        const linksList = document.getElementById('links-list');
        
        // Display products
        productsList.innerHTML = products.map(product => `
            <div class="product-item">
                <h4>${product.name}</h4>
                <p>Timestamp: ${product.timestamp} | 
                   Confidence: ${product.confidence}% | 
                   Category: ${product.category}</p>
            </div>
        `).join('');

        // Display affiliate links
        linksList.innerHTML = products.map(product => {
            const affiliateLink = `https://affiliate.store/${product.name.toLowerCase().replace(/\s+/g, '-')}`;
            return `
                <div class="link-item">
                    <div>
                        <h4>${product.name}</h4>
                        <input type="text" value="${affiliateLink}" readonly>
                    </div>
                    <button onclick="copyToClipboard('${affiliateLink}')">Copy</button>
                </div>
            `;
        }).join('');
    }

    // Handle start over
    startOverButton.addEventListener('click', () => {
        fileInput.value = '';
        youtubeInput.value = '';
        fileInput.disabled = false;
        youtubeInput.disabled = false;
        analyzeButton.disabled = true;
        analyzeButton.style.display = 'block';
        resultsSection.style.display = 'none';
    });

    // Handle save campaign
    saveCampaignButton.addEventListener('click', () => {
        saveCampaignButton.disabled = true;
        saveCampaignButton.textContent = 'Saving...';

        // Simulate API call
        setTimeout(() => {
            window.location.href = 'campaigns.html';
        }, 1500);
    });

    // Copy to clipboard function
    window.copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert('Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    };
}); 