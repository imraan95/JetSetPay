// Initialize analytics page
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const user = JSON.parse(sessionStorage.getItem('demoUser'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Initialize components
    initializeAnalytics();
    
    // Add event listener for time range changes
    document.getElementById('timeRange').addEventListener('change', updateAnalytics);
});

function initializeAnalytics() {
    updateMetrics();
    initializeRevenueChart();
    initializePerformanceChart();
    updateTopContent();
}

function updateAnalytics() {
    // Simulate loading state
    document.querySelectorAll('.metric-value').forEach(el => {
        el.style.opacity = '0.5';
    });
    
    // Simulate API call delay
    setTimeout(() => {
        updateMetrics();
        initializeRevenueChart();
        initializePerformanceChart();
        updateTopContent();
        
        // Reset loading state
        document.querySelectorAll('.metric-value').forEach(el => {
            el.style.opacity = '1';
        });
    }, 500);
}

function updateMetrics() {
    // Update metrics with mock data
    const metrics = mockData.metrics;
    document.querySelectorAll('.metric-card').forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes('revenue')) {
            card.querySelector('.metric-value').textContent = `$${metrics.totalRevenue.value}`;
            card.querySelector('.metric-change').textContent = `${metrics.totalRevenue.change} from last period`;
        } else if (title.includes('engagement')) {
            card.querySelector('.metric-value').textContent = metrics.engagementScore.value;
            card.querySelector('.metric-change').textContent = `${metrics.engagementScore.rank} of creators`;
        } else if (title.includes('conversion')) {
            card.querySelector('.metric-value').textContent = `${metrics.conversionRate.value}%`;
            card.querySelector('.metric-change').textContent = `${metrics.conversionRate.change} from last period`;
        } else if (title.includes('campaigns')) {
            card.querySelector('.metric-value').textContent = metrics.activeCampaigns.value;
            card.querySelector('.metric-change').textContent = `${metrics.activeCampaigns.pending} pending approval`;
        }
    });
}

function updateTopContent() {
    const contentList = document.querySelector('.content-list');
    const mockTopContent = [
        {
            title: 'Bali Resort Review',
            views: '15.2K',
            revenue: 850,
            engagement: '92%'
        },
        {
            title: 'Travel Gear Essentials',
            views: '12.8K',
            revenue: 720,
            engagement: '88%'
        },
        {
            title: 'Hidden Gems in Paris',
            views: '10.5K',
            revenue: 580,
            engagement: '85%'
        }
    ];

    contentList.innerHTML = mockTopContent.map(content => `
        <div class="content-item">
            <div class="content-info">
                <h4>${content.title}</h4>
                <div class="content-stats">
                    <span>${content.views} views</span>
                    <span>$${content.revenue} revenue</span>
                    <span>${content.engagement} engagement</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Add additional styles for the content list
const style = document.createElement('style');
style.textContent = `
    .content-list {
        margin-top: 1rem;
    }
    
    .content-item {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1rem;
    }
    
    .content-info h4 {
        margin: 0 0 0.5rem 0;
        color: var(--text-color);
    }
    
    .content-stats {
        display: flex;
        gap: 1rem;
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.7);
    }
    
    .content-stats span {
        background: rgba(255, 255, 255, 0.1);
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
    }
`;
document.head.appendChild(style); 