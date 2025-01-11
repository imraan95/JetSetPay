// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation to stats when they come into view
const stats = document.querySelectorAll('.stat-card');
const animateStats = () => {
    stats.forEach(stat => {
        const rect = stat.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
        if (isVisible) {
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0)';
        }
    });
};

// Initial setup for stats animation
stats.forEach(stat => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(20px)';
    stat.style.transition = 'all 0.6s ease-out';
});

// Listen for scroll events to trigger animations
window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}); 