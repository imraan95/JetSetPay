// Check if user is authenticated
const user = JSON.parse(sessionStorage.getItem('demoUser'));
if (user) {
    // Update user display name
    document.getElementById('userDisplayName').textContent = user.displayName;
    document.getElementById('userName').textContent = user.displayName;
    
    // Initialize dashboard
    initializeDashboard();
} else {
    // Redirect to login if not authenticated
    window.location.href = 'login.html';
}

// Handle logout
function handleLogout() {
    sessionStorage.removeItem('demoUser');
    window.location.href = 'index.html';
}

// Initialize dashboard components
function initializeDashboard() {
    updateMetrics();
    initializeRevenueChart();
    initializePerformanceChart();
    updateCampaigns();
    updatePayments();
}

// Update metrics
function updateMetrics() {
    document.querySelector('.metric-value').textContent = `$${mockData.metrics.totalRevenue.value}`;
    document.querySelector('.metric-change').textContent = mockData.metrics.totalRevenue.change + ' from last month';
}

// Revenue Chart with optimized settings
function initializeRevenueChart() {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    
    // Disable animations for better performance
    Chart.defaults.animation = false;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: mockData.revenue.labels,
            datasets: [{
                label: 'Revenue',
                data: mockData.revenue.data,
                borderColor: 'rgb(0, 180, 216)',
                backgroundColor: 'rgba(0, 180, 216, 0.1)',
                tension: 0.3,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#1F2937',
                    bodyColor: '#1F2937',
                    borderColor: '#E5E7EB',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `$${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        callback: value => `$${value}`,
                        stepSize: 500
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Performance Chart with optimized settings
function initializePerformanceChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: mockData.performance.labels,
            datasets: [{
                data: mockData.performance.data,
                fill: true,
                backgroundColor: 'rgba(0, 180, 216, 0.2)',
                borderColor: 'rgb(0, 180, 216)',
                pointBackgroundColor: 'rgb(0, 180, 216)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(0, 180, 216)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 50,
                    suggestedMax: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Update campaigns list
function updateCampaigns() {
    const campaignList = document.querySelector('.campaign-list');
    campaignList.innerHTML = mockData.campaigns.map(campaign => `
        <div class="campaign-item">
            <div class="campaign-info">
                <h4>${campaign.name}</h4>
                <p>Due: ${campaign.dueDate}</p>
            </div>
            <div class="campaign-status">
                <span class="status ${campaign.status}">${campaign.status}</span>
                <div class="amount">$${campaign.amount}</div>
            </div>
        </div>
    `).join('');
}

// Update payments list
function updatePayments() {
    const paymentList = document.querySelector('.payment-list');
    paymentList.innerHTML = mockData.payments.map(payment => `
        <div class="payment-item">
            <div class="payment-info">
                <h4>${payment.name}</h4>
                <p>Processing on ${payment.date}</p>
            </div>
            <div class="payment-amount">$${payment.amount}</div>
        </div>
    `).join('');
} 