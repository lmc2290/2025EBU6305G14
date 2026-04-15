// JavaScript for Home Page - Version 3

// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const featureCards = document.querySelectorAll('.feature-card');
const heroImg = document.querySelector('.hero-img');

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

// Image lazy loading with intersection observer
const lazyLoadImages = () => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
};

// Scroll animation for elements
const animateOnScroll = () => {
    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('animate-in');
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.feature-card, .about').forEach(element => {
        elementObserver.observe(element);
    });
};

// Add animation classes to feature cards
featureCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
});

// Add animation class to about section
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    aboutSection.style.opacity = '0';
    aboutSection.style.transform = 'translateY(20px)';
    aboutSection.style.transition = 'all 0.6s ease';
}

// Add animation class to hero image
if (heroImg) {
    heroImg.style.opacity = '0';
    heroImg.style.transform = 'scale(0.95)';
    heroImg.style.transition = 'all 0.8s ease';
}

// Add scroll event for animations
window.addEventListener('scroll', animateOnScroll);

// Initialize functions
const init = () => {
    setActiveNavigation();
    lazyLoadImages();
    animateOnScroll();
    
    // Animate hero image on load
    if (heroImg) {
        setTimeout(() => {
            heroImg.style.opacity = '1';
            heroImg.style.transform = 'scale(1)';
        }, 300);
    }
    
    console.log('Home Page loaded successfully - Version 3');
};

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Placeholder for future features
// These can be implemented in version 4
function futureFeature1() {
    // Example: User authentication
}

function futureFeature2() {
    // Example: Community features
}

function futureFeature3() {
    // Example: Advanced game features
}