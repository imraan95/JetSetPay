const mockData = {
    revenue: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [1200, 1350, 1500, 1800, 2100, 2450]
    },
    performance: {
        labels: ['Content Quality', 'Engagement', 'Response Time', 'Reach', 'Conversion'],
        data: [90, 85, 95, 80, 88]
    },
    campaigns: [
        {
            name: 'Luxury Resort Promotion',
            dueDate: 'Dec 15, 2023',
            status: 'active',
            amount: 850
        },
        {
            name: 'Travel Gear Review',
            dueDate: 'Dec 20, 2023',
            status: 'pending',
            amount: 600
        },
        {
            name: 'Adventure Tour Series',
            dueDate: 'Dec 25, 2023',
            status: 'active',
            amount: 1200
        }
    ],
    payments: [
        {
            name: 'December Earnings',
            date: 'Dec 31, 2023',
            amount: 1850
        },
        {
            name: 'Campaign Bonus',
            date: 'Dec 15, 2023',
            amount: 300
        }
    ],
    metrics: {
        totalRevenue: {
            value: 2450,
            change: '+12.5%'
        },
        activeCampaigns: {
            value: 8,
            pending: 3
        },
        conversionRate: {
            value: 4.8,
            change: '+0.6%'
        },
        engagementScore: {
            value: 92,
            rank: 'Top 5%'
        }
    }
}; 