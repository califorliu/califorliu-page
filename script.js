// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[placeholder="Your Name"]').value;
        const email = this.querySelector('input[placeholder="Your Email"]').value;
        const message = this.querySelector('textarea[placeholder="Your Message"]').value;
        
        // Validate form
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Create mailto link
        const mailtoLink = `mailto:michaelliu1228@gmail.com?subject=Message from ${name}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Reset form
        this.reset();
        alert('Opening your email client to send the message...');
    });
}

// Scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.bg-white').forEach(el => {
    observer.observe(el);
});

// Add active class to navigation based on scroll position
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const navLinks = document.querySelectorAll('nav a[href^="#"]');
            navLinks.forEach(link => {
                link.classList.remove('text-blue-600');
                link.classList.add('text-gray-700');
            });
            
            const activeLink = document.querySelector(`nav a[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.classList.remove('text-gray-700');
                activeLink.classList.add('text-blue-600');
            }
        }
    });
});

// Animate skill bars on view
const skillBars = document.querySelectorAll('.skill-bar');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                    bar.classList.add('skill-bar');
                }, 10);
            });
            skillsAnimated = true;
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Add ripple effect to buttons
document.querySelectorAll('button, a[href^="#"], a[href^="http"]').forEach(element => {
    element.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Toggle theme (optional light/dark mode)
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
}

// Keyboard accessibility - press 's' to scroll to skills
document.addEventListener('keydown', (e) => {
    if (e.key === 's' && e.ctrlKey) {
        e.preventDefault();
        const skillsSection = document.querySelector('#skills');
        if (skillsSection) {
            skillsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Performance optimization - lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize tooltips
document.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseover', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'absolute bg-gray-900 text-white px-2 py-1 rounded text-sm whitespace-no-wrap';
        tooltip.textContent = this.dataset.tooltip;
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
    });
});

// Print page functionality
function printPage() {
    window.print();
}

// Copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Add analytics event tracking (optional - requires analytics setup)
function trackEvent(eventName, eventData) {
    if (window.gtag) {
        gtag('event', eventName, eventData);
    }
}

// Track section views
document.querySelectorAll('section[id]').forEach(section => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trackEvent('section_view', {
                    section: entry.target.id
                });
            }
        });
    }, { threshold: 0.25 });
    observer.observe(section);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio page loaded successfully');
    
    // Add any initialization code here
    animateOnScroll();
});

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('[class*="hover"]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Handle responsive adjustments
        console.log('Window resized');
    }, 250);
});

// Prevent console errors in production
if (typeof console === 'undefined') {
    window.console = {
        log: () => {},
        error: () => {},
        warn: () {}
    };
}

// Export functions for external use if needed
window.portfolioUtils = {
    copyToClipboard,
    printPage,
    trackEvent
};

console.log('Portfolio JavaScript loaded - Available utilities: portfolioUtils');
