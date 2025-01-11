// Mock function to simulate content analysis
async function analyzeContent() {
    const videoFile = document.getElementById('videoFile').files[0];
    const youtubeLink = document.getElementById('youtubeLink').value;

    if (!videoFile && !youtubeLink) {
        alert('Please upload a video file or provide a YouTube link');
        return;
    }

    // Show loading state
    const analyzeButton = event.target;
    analyzeButton.textContent = 'Analyzing...';
    analyzeButton.disabled = true;

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock analysis results
    const mockProducts = [
        {
            name: 'Travel Backpack Pro',
            timestamp: '0:45',
            confidence: '95%',
            category: 'Travel Gear'
        },
        {
            name: 'Luxury Resort Stay',
            timestamp: '2:15',
            confidence: '88%',
            category: 'Accommodation'
        },
        {
            name: 'Camera Stabilizer',
            timestamp: '3:30',
            confidence: '92%',
            category: 'Photography'
        }
    ];

    const mockLinks = [
        {
            product: 'Travel Backpack Pro',
            link: 'https://affiliate.store/backpack-pro?ref=jetsetpay',
            commission: '12%'
        },
        {
            product: 'Luxury Resort Stay',
            link: 'https://booking.com/resort?ref=jetsetpay',
            commission: '8%'
        },
        {
            product: 'Camera Stabilizer',
            link: 'https://photostore.com/stabilizer?ref=jetsetpay',
            commission: '15%'
        }
    ];

    // Display results
    displayAnalysisResults(mockProducts, mockLinks);

    // Reset button state
    analyzeButton.textContent = 'Analyze Content';
    analyzeButton.disabled = false;
}

function displayAnalysisResults(products, links) {
    const productsList = document.getElementById('productsList');
    const linksList = document.getElementById('linksList');

    // Clear previous results
    productsList.innerHTML = '';
    linksList.innerHTML = '';

    // Display detected products
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${product.name}</strong>
            <span class="product-details">
                Timestamp: ${product.timestamp} | 
                Confidence: ${product.confidence} | 
                Category: ${product.category}
            </span>
        `;
        productsList.appendChild(li);
    });

    // Display affiliate links
    links.forEach(link => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${link.product}</strong>
            <div class="link-details">
                <input type="text" value="${link.link}" readonly>
                <button onclick="copyToClipboard(this)">Copy</button>
                <span class="commission">Commission: ${link.commission}</span>
            </div>
        `;
        linksList.appendChild(li);
    });

    // Show results section
    document.getElementById('analysisResults').style.display = 'block';
}

function copyToClipboard(button) {
    const input = button.previousElementSibling;
    input.select();
    document.execCommand('copy');
    
    // Show feedback
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    setTimeout(() => {
        button.textContent = originalText;
    }, 2000);
}

function saveCampaign() {
    // Simulate saving campaign
    alert('Campaign saved successfully!');
    document.getElementById('uploadModal').style.display = 'none';
    
    // Reset form
    document.getElementById('videoFile').value = '';
    document.getElementById('youtubeLink').value = '';
    document.getElementById('analysisResults').style.display = 'none';
    
    // Refresh campaign list
    updateCampaigns();
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const user = JSON.parse(sessionStorage.getItem('demoUser'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Update campaign list
    updateCampaigns();
}); 