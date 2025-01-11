// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function handleLogout() {
    window.location.href = 'login.html';
}

function initializeDashboard() {
    initializeRevenueChart();
    initializePerformanceChart();
    updateCampaigns();
    updatePayments();
}

function initializeRevenueChart() {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    if (!mockData.revenue.labels.length) {
        ctx.font = '14px Plus Jakarta Sans';
        ctx.fillStyle = '#6B7280';
        ctx.textAlign = 'center';
        ctx.fillText('No revenue data available', ctx.canvas.width / 2, ctx.canvas.height / 2);
        return;
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: mockData.revenue.labels,
            datasets: [{
                label: 'Revenue',
                data: mockData.revenue.data,
                borderColor: '#00B4D8',
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

function initializePerformanceChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    if (!mockData.performance.labels.length) {
        ctx.font = '14px Plus Jakarta Sans';
        ctx.fillStyle = '#6B7280';
        ctx.textAlign = 'center';
        ctx.fillText('No performance data available', ctx.canvas.width / 2, ctx.canvas.height / 2);
        return;
    }

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

function updateCampaigns() {
    const campaignList = document.querySelector('.campaign-list');
    if (!mockData.campaigns.length) {
        campaignList.innerHTML = `
            <div class="empty-state">
                <p>No active campaigns</p>
                <a href="campaigns.html" class="primary-button">Create Campaign</a>
            </div>
        `;
        return;
    }

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

function updatePayments() {
    const paymentList = document.querySelector('.payment-list');
    if (!mockData.payments.length) {
        paymentList.innerHTML = `
            <div class="empty-state">
                <p>No upcoming payments</p>
            </div>
        `;
        return;
    }

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