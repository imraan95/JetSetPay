// Initialize payments page
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const user = JSON.parse(sessionStorage.getItem('demoUser'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Initialize components
    initializePayments();
    
    // Add form submit handler
    document.getElementById('paymentSettingsForm').addEventListener('submit', handlePaymentSettings);
});

function initializePayments() {
    updateUpcomingPayments();
    updatePaymentHistory();
}

function updateUpcomingPayments() {
    const paymentList = document.querySelector('.payment-list');
    const mockUpcomingPayments = [
        {
            name: 'December Earnings',
            date: 'Dec 31, 2023',
            amount: 2450,
            status: 'pending'
        },
        {
            name: 'Campaign Bonus',
            date: 'Dec 15, 2023',
            amount: 300,
            status: 'processing'
        }
    ];

    paymentList.innerHTML = mockUpcomingPayments.map(payment => `
        <div class="payment-item">
            <div class="payment-info">
                <h4>${payment.name}</h4>
                <p>Processing on ${payment.date}</p>
            </div>
            <div class="payment-details">
                <div class="payment-amount">$${payment.amount}</div>
                <span class="payment-status ${payment.status}">${payment.status}</span>
            </div>
        </div>
    `).join('');
}

function updatePaymentHistory() {
    const historyList = document.querySelector('.history-list');
    const mockPaymentHistory = [
        {
            name: 'November Earnings',
            date: 'Nov 30, 2023',
            amount: 2150,
            status: 'completed'
        },
        {
            name: 'October Earnings',
            date: 'Oct 31, 2023',
            amount: 1850,
            status: 'completed'
        },
        {
            name: 'September Earnings',
            date: 'Sep 30, 2023',
            amount: 1650,
            status: 'completed'
        }
    ];

    historyList.innerHTML = mockPaymentHistory.map(payment => `
        <div class="payment-item">
            <div class="payment-info">
                <h4>${payment.name}</h4>
                <p>Paid on ${payment.date}</p>
            </div>
            <div class="payment-details">
                <div class="payment-amount">$${payment.amount}</div>
                <span class="payment-status ${payment.status}">${payment.status}</span>
            </div>
        </div>
    `).join('');
}

function handlePaymentSettings(event) {
    event.preventDefault();
    
    // Simulate saving payment settings
    const paymentMethod = document.getElementById('paymentMethod').value;
    const accountName = document.getElementById('accountName').value;
    
    // Show success message
    alert('Payment settings updated successfully!');
    
    // Close modal
    document.getElementById('paymentSettingsModal').style.display = 'none';
}

// Add additional styles
const style = document.createElement('style');
style.textContent = `
    .payment-item {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .payment-info h4 {
        margin: 0 0 0.5rem 0;
        color: var(--text-color);
    }
    
    .payment-info p {
        margin: 0;
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.7);
    }
    
    .payment-details {
        text-align: right;
    }
    
    .payment-amount {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
    
    .payment-status {
        font-size: 0.8rem;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        text-transform: capitalize;
    }
    
    .payment-status.completed {
        background: rgba(16, 185, 129, 0.1);
        color: rgb(16, 185, 129);
    }
    
    .payment-status.pending {
        background: rgba(245, 158, 11, 0.1);
        color: rgb(245, 158, 11);
    }
    
    .payment-status.processing {
        background: rgba(59, 130, 246, 0.1);
        color: rgb(59, 130, 246);
    }
    
    .form-group {
        margin-bottom: 1.5rem;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        color: var(--text-color);
    }
    
    .form-group input,
    .form-group select {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.05);
        color: var(--text-color);
    }
    
    .form-group input:focus,
    .form-group select:focus {
        outline: none;
        border-color: var(--primary-color);
    }
`;
document.head.appendChild(style); 