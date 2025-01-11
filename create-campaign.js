document.addEventListener('DOMContentLoaded', () => {
    // Initialize step navigation
    const steps = document.querySelectorAll('.step');
    const containers = document.querySelectorAll('.flow-container');
    let currentStep = 0;

    // File upload and YouTube link elements
    const fileInput = document.getElementById('videoFile');
    const youtubeInput = document.getElementById('youtubeLink');
    const analyzeButton = document.getElementById('analyzeButton');
    const continueButton = document.getElementById('continueButton');
    const startOverButton = document.getElementById('startOverButton');
    const saveCampaignButton = document.getElementById('saveCampaignButton');

    // Event listeners for file and link inputs
    fileInput.addEventListener('change', handleFileInput);
    youtubeInput.addEventListener('input', handleYoutubeInput);
    analyzeButton.addEventListener('click', handleAnalyze);
    continueButton.addEventListener('click', () => goToStep(2));
    startOverButton.addEventListener('click', resetFlow);
    saveCampaignButton.addEventListener('click', saveCampaign);

    function handleFileInput() {
        if (fileInput.files.length > 0) {
            youtubeInput.value = '';
            youtubeInput.disabled = true;
            analyzeButton.disabled = false;
        } else {
            youtubeInput.disabled = false;
            analyzeButton.disabled = !youtubeInput.value;
        }
    }

    function handleYoutubeInput() {
        if (youtubeInput.value) {
            fileInput.value = '';
            fileInput.disabled = true;
            analyzeButton.disabled = false;
        } else {
            fileInput.disabled = false;
            analyzeButton.disabled = !fileInput.files.length;
        }
    }

    async function handleAnalyze() {
        // Show loading state
        analyzeButton.disabled = true;
        analyzeButton.textContent = 'Analyzing...';

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock detected products
        const products = [
            {
                name: 'Travel Backpack Pro',
                timestamp: '0:45',
                confidence: 92,
                category: 'Travel Gear'
            },
            {
                name: 'Luxury Resort Stay',
                timestamp: '2:15',
                confidence: 88,
                category: 'Accommodation'
            },
            {
                name: 'Adventure Camera Kit',
                timestamp: '3:30',
                confidence: 95,
                category: 'Photography'
            }
        ];

        displayProducts(products);
        goToStep(1);

        // Reset button state
        analyzeButton.textContent = 'Analyze Content';
        analyzeButton.disabled = false;
    }

    function displayProducts(products) {
        const productsGrid = document.querySelector('.products-grid');
        productsGrid.innerHTML = '';

        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <h3>${product.name}</h3>
                <p>Category: ${product.category}</p>
                <p>Timestamp: ${product.timestamp}</p>
                <p>Confidence: ${product.confidence}%</p>
            `;
            productsGrid.appendChild(productItem);
        });

        // Enable continue button
        continueButton.disabled = false;
    }

    function displayAffiliateLinks(products) {
        const linksGrid = document.querySelector('.links-grid');
        linksGrid.innerHTML = '';

        products.forEach(product => {
            const affiliateLink = `https://jetsetpay.com/affiliate/${product.name.toLowerCase().replace(/\s+/g, '-')}`;
            const linkItem = document.createElement('div');
            linkItem.className = 'link-item';
            linkItem.innerHTML = `
                <div>
                    <h3>${product.name}</h3>
                    <p class="link-url">${affiliateLink}</p>
                </div>
                <button class="flow-button secondary" onclick="copyToClipboard('${affiliateLink}')">
                    Copy Link
                </button>
            `;
            linksGrid.appendChild(linkItem);
        });
    }

    function goToStep(stepIndex) {
        // Update steps
        steps.forEach((step, index) => {
            if (index < stepIndex) {
                step.classList.remove('active');
                step.classList.add('completed');
            } else if (index === stepIndex) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });

        // Update containers
        containers.forEach((container, index) => {
            if (index === stepIndex) {
                container.classList.add('active');
                if (index === 2) {
                    // Generate affiliate links when reaching the final step
                    const products = [
                        {
                            name: 'Travel Backpack Pro',
                            timestamp: '0:45',
                            confidence: 92,
                            category: 'Travel Gear'
                        },
                        {
                            name: 'Luxury Resort Stay',
                            timestamp: '2:15',
                            confidence: 88,
                            category: 'Accommodation'
                        },
                        {
                            name: 'Adventure Camera Kit',
                            timestamp: '3:30',
                            confidence: 95,
                            category: 'Photography'
                        }
                    ];
                    displayAffiliateLinks(products);
                }
            } else {
                container.classList.remove('active');
            }
        });

        currentStep = stepIndex;
    }

    function resetFlow() {
        // Reset form inputs
        fileInput.value = '';
        youtubeInput.value = '';
        fileInput.disabled = false;
        youtubeInput.disabled = false;
        analyzeButton.disabled = true;
        continueButton.disabled = true;

        // Clear grids
        document.querySelector('.products-grid').innerHTML = '';
        document.querySelector('.links-grid').innerHTML = '';

        // Go back to first step
        goToStep(0);
    }

    function saveCampaign() {
        saveCampaignButton.disabled = true;
        saveCampaignButton.textContent = 'Saving...';

        // Simulate API call delay
        setTimeout(() => {
            alert('Campaign saved successfully!');
            window.location.href = 'campaigns.html';
        }, 1500);
    }

    // Initialize copy to clipboard functionality
    window.copyToClipboard = async function(text) {
        try {
            await navigator.clipboard.writeText(text);
            alert('Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }

    // Start at first step
    goToStep(0);
}); 