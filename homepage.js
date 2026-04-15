// JavaScript for Home Page - Version 2

// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link based on current page
const setActiveNavigation = () => {
    const currentPage = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage.split('/').pop()) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

// Mobile menu toggle
function toggleMobileMenu() {
    navLinks.classList.toggle('mobile-menu');
    // Update aria-expanded attribute
    const isExpanded = navLinks.classList.contains('mobile-menu');
    mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
}

// Add click event to mobile menu toggle
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        if (navLinks.classList.contains('mobile-menu')) {
            navLinks.classList.remove('mobile-menu');
            if (mobileMenuToggle) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
});

// Scroll event - change header style on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        header.style.padding = '0.5rem 0';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        header.style.padding = '1rem 0';
    }
});

// Initialize functions
const init = () => {
    setActiveNavigation();
    console.log('Home Page loaded successfully - Version 2');
};

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Placeholder for future features
// These can be implemented in version 3 and 4
function futureFeature1() {
    // Example: Dynamic content loading
}

function futureFeature2() {
    // Example: User authentication
}

function futureFeature3() {
    // Example: Interactive elements
}