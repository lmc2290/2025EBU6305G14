// Basic JavaScript for Home Page

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active navigation link based on current page
const currentPage = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Button hover effects
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.transition = 'transform 0.2s ease';
    });
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Feature card hover effects
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        this.style.transform = 'translateY(-5px)';
        this.style.transition = 'all 0.3s ease';
    });
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
        this.style.transform = 'translateY(0)';
    });
});

// Simple form validation placeholder
function validateForm() {
    // This function can be expanded for version 2
    console.log('Form validation would happen here');
    return false;
}

// Log page load
console.log('Home Page loaded successfully');

// Placeholder for future features
// These can be implemented in version 2 and 3
function futureFeature1() {
    // Example: Dynamic content loading
}

function futureFeature2() {
    // Example: User authentication
}

function futureFeature3() {
    // Example: Interactive elements
}