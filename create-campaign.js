document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('video-file');
    const youtubeInput = document.getElementById('youtube-link');
    const selectedFileText = document.getElementById('selected-file');
    const analyzeButton = document.getElementById('analyze-button');
    const resultsSection = document.getElementById('results-section');
    const startOverButton = document.getElementById('start-over');
    const saveCampaignButton = document.getElementById('save-campaign');

    // Handle file selection
    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            selectedFileText.textContent = `Selected: ${e.target.files[0].name}`;
            youtubeInput.value = ''; // Clear YouTube input
            analyzeButton.disabled = false;
        }
    });

    // Handle YouTube link input
    youtubeInput.addEventListener('input', function(e) {
        if (e.target.value.trim() !== '') {
            fileInput.value = ''; // Clear file input
            selectedFileText.textContent = ''; // Clear selected file text
            analyzeButton.disabled = false;
        } else {
            analyzeButton.disabled = true;
        }
    });

    // Handle content analysis
    analyzeButton.addEventListener('click', async function() {
        // Show loading state
        analyzeButton.disabled = true;
        analyzeButton.textContent = 'Analyzing...';

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mock analysis results
            const results = {
                products: [
                    {
                        name: 'Samsonite Luggage',
                        timestamp: '0:45',
                        confidence: '95%',
                        category: 'Travel Gear'
                    },
                    {
                        name: 'GoPro Hero 10',
                        timestamp: '2:15',
                        confidence: '92%',
                        category: 'Camera Equipment'
                    }
                ],
                links: [
                    {
                        product: 'Samsonite Winfield 3 DLX',
                        url: 'https://example.com/aff/samsonite-123',
                        commission: '12%'
                    },
                    {
                        product: 'GoPro HERO10 Black',
                        url: 'https://example.com/aff/gopro-456',
                        commission: '15%'
                    }
                ]
            };

            // Display results
            displayResults(results);
            
            // Show results section
            resultsSection.style.display = 'block';
            
            // Reset analyze button
            analyzeButton.textContent = 'Analyze Content';
            analyzeButton.disabled = true;

        } catch (error) {
            console.error('Error analyzing content:', error);
            alert('An error occurred while analyzing the content. Please try again.');
            
            // Reset analyze button
            analyzeButton.textContent = 'Analyze Content';
            analyzeButton.disabled = false;
        }
    });

    // Handle start over
    startOverButton.addEventListener('click', function() {
        // Reset form
        fileInput.value = '';
        youtubeInput.value = '';
        selectedFileText.textContent = '';
        resultsSection.style.display = 'none';
        analyzeButton.disabled = true;
    });

    // Handle save campaign
    saveCampaignButton.addEventListener('click', function() {
        // Show success message
        alert('Campaign saved successfully!');
        // Redirect to campaigns page
        window.location.href = 'campaigns.html';
    });

    // Function to display analysis results
    function displayResults(results) {
        const productsList = document.getElementById('products-list');
        const linksList = document.getElementById('links-list');

        // Clear previous results
        productsList.innerHTML = '';
        linksList.innerHTML = '';

        // Display detected products
        results.products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <h4>${product.name}</h4>
                <div class="product-details">
                    <span>Timestamp: ${product.timestamp}</span> |
                    <span>Confidence: ${product.confidence}</span> |
                    <span>Category: ${product.category}</span>
                </div>
            `;
            productsList.appendChild(productItem);
        });

        // Display affiliate links
        results.links.forEach(link => {
            const linkItem = document.createElement('div');
            linkItem.className = 'link-item';
            linkItem.innerHTML = `
                <div class="link-info">
                    <h4>${link.product}</h4>
                    <div class="commission">Commission: ${link.commission}</div>
                </div>
                <button class="copy-button" data-url="${link.url}">Copy Link</button>
            `;
            linksList.appendChild(linkItem);
        });

        // Add click handlers for copy buttons
        document.querySelectorAll('.copy-button').forEach(button => {
            button.addEventListener('click', async function() {
                const url = this.dataset.url;
                try {
                    await navigator.clipboard.writeText(url);
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy text:', err);
                    alert('Failed to copy link. Please try again.');
                }
            });
        });
    }
}); 