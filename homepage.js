// JavaScript for Home Page - Core Features Implementation

document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // Mobile Navigation Toggle
    // ========================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const header = document.getElementById('header');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on nav links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ========================================
    // Header Scroll Effect
    // ========================================
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ========================================
    // Active Navigation Link
    // ========================================
    const currentPath = window.location.pathname;
    const navLinkItems = document.querySelectorAll('.nav-link');

    navLinkItems.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.includes(href) && href !== 'homepage.html') {
            link.classList.add('active');
        } else if (currentPath.endsWith('/') || currentPath.endsWith('index.html')) {
            if (href === 'homepage.html') {
                link.classList.add('active');
            }
        }
    });

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ========================================
    // Compression Demo Interactive
    // ========================================
    const demoButtons = document.querySelectorAll('.demo-btn');
    const optimizedSize = document.getElementById('optimizedSize');
    const optimizedImage = document.querySelector('.demo-image.optimized img');

    const compressionData = {
        '100': { size: '2.4 MB', filter: 'none', badge: 'Original' },
        '80': { size: '1.92 MB', filter: 'brightness(0.98) contrast(0.98)', badge: '20% smaller' },
        '60': { size: '0.96 MB', filter: 'brightness(0.95) contrast(0.95)', badge: '60% smaller' },
        '40': { size: '0.48 MB', filter: 'brightness(0.9) contrast(0.9)', badge: '80% smaller' }
    };

    demoButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            demoButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const quality = this.dataset.quality;
            const data = compressionData[quality];

            if (optimizedSize) {
                optimizedSize.textContent = data.size;
            }

            if (optimizedImage) {
                optimizedImage.style.filter = data.filter;
            }

            // Update savings badge
            const savingsBadge = document.querySelector('.savings-badge');
            if (savingsBadge) {
                savingsBadge.textContent = data.badge;
            }
        });
    });

    // ========================================
    // Module Progress Tracking
    // ========================================
    const moduleCards = document.querySelectorAll('.module-card');

    moduleCards.forEach(card => {
        card.addEventListener('click', function() {
            const progressFill = this.querySelector('.progress-fill');
            const progressText = this.querySelector('.progress-text');
            
            if (progressFill && progressText) {
                // Simulate starting a module
                let currentProgress = 0;
                const interval = setInterval(() => {
                    currentProgress += 10;
                    if (currentProgress <= 100) {
                        progressFill.style.width = currentProgress + '%';
                        progressText.textContent = currentProgress + '% Complete';
                    } else {
                        clearInterval(interval);
                    }
                }, 200);
            }
        });
    });

    // ========================================
    // Intersection Observer for Animations
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, observerOptions);

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(20px)';
        header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(header);
    });

    // Observe module cards
    const modulesGrid = document.querySelectorAll('.module-card');
    modulesGrid.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(card);
    });

    // Observe user cards
    const userCards = document.querySelectorAll('.user-card');
    userCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(card);
    });

    // ========================================
    // Button Hover Effects
    // ========================================
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ========================================
    // Feature Card Hover Effects
    // ========================================
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach(icon => {
        const parent = icon.closest('.feature-card');
        if (parent) {
            parent.addEventListener('mouseenter', function() {
                icon.style.transform = 'scale(1.1)';
            });
            parent.addEventListener('mouseleave', function() {
                icon.style.transform = 'scale(1)';
            });
        }
    });

    // ========================================
    // Image Loading Effect
    // ========================================
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.addEventListener('load', function() {
            this.classList.add('loaded');
        });

        if (heroImage.complete) {
            heroImage.classList.add('loaded');
        }
    }

    // ========================================
    // Scroll Progress Indicator
    // ========================================
    const scrollIndicator = document.querySelector('.hero-scroll');
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            const scrollY = window.pageYOffset;
            const windowHeight = window.innerHeight;

            if (scrollY > windowHeight * 0.5) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }

    // ========================================
    // Lazy Loading Images
    // ========================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.classList.add('loaded');
        });
    }

    // ========================================
    // Keyboard Navigation Support
    // ========================================
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ========================================
    // Performance: Debounced Scroll Handler
    // ========================================
    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // Scroll-based operations can be added here
                ticking = false;
            });
            ticking = true;
        }
    });

    // ========================================
    // Console Log
    // ========================================
    console.log('Home Page loaded successfully - Core Features Implementation');
});

// ========================================
// Utility Functions
// ========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// Future Features Placeholder
// ========================================

// User Authentication Handler
function handleUserAuth() {
    // Placeholder for user authentication
    console.log('User authentication feature placeholder');
}

// Community Features Handler
function handleCommunityFeatures() {
    // Placeholder for community features
    console.log('Community features placeholder');
}

// Advanced Game Features Handler
function handleAdvancedGameFeatures() {
    // Placeholder for advanced game features
    console.log('Advanced game features placeholder');
}