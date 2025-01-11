// Check if user is authenticated
auth.onAuthStateChanged((user) => {
    if (user) {
        // Update user display name
        document.getElementById('userDisplayName').textContent = user.displayName;
        document.getElementById('userName').textContent = user.displayName.split(' ')[0];
        
        // Initialize dashboard
        initializeDashboard();
    } else {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
    }
});

// Handle logout
function handleLogout() {
    auth.signOut()
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
}

// Initialize dashboard components
function initializeDashboard() {
    initializeRevenueChart();
    initializePerformanceChart();
}

// Revenue Chart
function initializeRevenueChart() {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 180, 216, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 180, 216, 0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Revenue',
                data: [1200, 1900, 1600, 2100, 1800, 2400, 2450],
                borderColor: 'rgb(0, 180, 216)',
                backgroundColor: gradient,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        }
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

// Performance Chart
function initializePerformanceChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Engagement',
                'Reach',
                'Conversion',
                'Content Quality',
                'Response Time'
            ],
            datasets: [{
                label: 'Your Performance',
                data: [92, 85, 88, 90, 95],
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
                    suggestedMax: 100
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