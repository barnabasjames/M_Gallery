// ===================================
// MOBILE MENU TOGGLE
// ===================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navMenu.style.display = navMenu.classList.contains('active') ? 'flex' : 'none';
    });
}

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navMenu.style.display = 'none';
    });
});

// ===================================
// GOOGLE ANALYTICS EVENT TRACKING
// ===================================

/**
 * Track navigation clicks with Google Analytics
 */
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('http')) {
            trackEvent('navigation', {
                'page_title': document.title,
                'page_path': href,
                'link_text': link.textContent.trim()
            });
        }
    });
});

/**
 * Generic function to track events with Google Analytics
 */
function trackEvent(eventName, eventData = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    } else {
        console.log(`Event tracked (offline): ${eventName}`, eventData);
    }
}

/**
 * Track page views
 */
window.addEventListener('load', () => {
    trackEvent('page_view', {
        'page_title': document.title,
        'page_path': window.location.pathname,
        'page_location': window.location.href
    });
});

// ===================================
// GALLERY FILTERING AND SEARCH
// ===================================

const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const searchBox = document.getElementById('searchBox');

/**
 * Gallery Filter Functionality
 */
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');

        const filterValue = button.getAttribute('data-filter');

        // Track filter action
        trackEvent('filter_gallery', {
            'filter_type': filterValue,
            'page': window.location.pathname
        });

        // Filter items
        let visibleCount = 0;
        galleryItems.forEach(item => {
            const itemFilter = item.getAttribute('class').split(' ')[1];
            
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 10);
                visibleCount++;
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
            }
        });

        updateNoResults(visibleCount);
    });
});

/**
 * Gallery Search Functionality
 */
if (searchBox) {
    searchBox.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        let visibleCount = 0;

        galleryItems.forEach(item => {
            const name = item.getAttribute('data-name').toLowerCase();
            
            if (name.includes(searchTerm) || searchTerm === '') {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        // Track search
        if (searchTerm.length > 0) {
            trackEvent('gallery_search', {
                'search_term': searchTerm,
                'results_count': visibleCount
            });
        }

        updateNoResults(visibleCount);
    });
}

/**
 * Update no results message visibility
 */
function updateNoResults(visibleCount) {
    const noResults = document.querySelector('.no-results');
    if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
}

// ===================================
// GALLERY VIEW TOGGLE
// ===================================

const viewButtons = document.querySelectorAll('.view-toggle .view-btn');

viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        viewButtons.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
        });
        
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        
        const view = btn.getAttribute('data-view');
        
        // Track view change
        trackEvent('view_change', {
            'view_type': view,
            'page': window.location.pathname
        });
    });
});

// ===================================
// CONTACT FORM HANDLING
// ===================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    // Character counter
    const messageField = document.getElementById('message');
    if (messageField) {
        messageField.addEventListener('input', () => {
            const charCount = document.getElementById('charCount');
            if (charCount) {
                charCount.textContent = messageField.value.length;
            }
        });
    }

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const category = document.getElementById('category').value;
        const message = document.getElementById('message').value.trim();
        const terms = document.getElementById('terms').checked;

        // Validate form
        if (!validateContactForm(name, email, subject, message, terms)) {
            return;
        }

        // Track form submission
        trackEvent('contact_form_submission', {
            'form_name': 'contact_form',
            'form_category': category,
            'page': window.location.pathname
        });

        // Show success message
        showFormSuccess();

        // Reset form
        contactForm.reset();
        document.getElementById('charCount').textContent = '0';
    });
}

/**
 * Validate contact form
 */
function validateContactForm(name, email, subject, message, terms) {
    let isValid = true;

    // Validate name
    if (!name || name.length < 2) {
        showFieldError('nameError', 'Please enter a valid name');
        isValid = false;
    } else {
        clearFieldError('nameError');
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        showFieldError('emailError', 'Please enter a valid email address');
        isValid = false;
    } else {
        clearFieldError('emailError');
    }

    // Validate subject
    if (!subject || subject.length < 3) {
        showFieldError('subjectError', 'Please enter a subject');
        isValid = false;
    }

    // Validate message
    if (!message || message.length < 10) {
        showFieldError('messageError', 'Message must be at least 10 characters long');
        isValid = false;
    }

    // Validate terms
    if (!terms) {
        showFieldError('termsError', 'You must agree to the terms and conditions');
        isValid = false;
    } else {
        clearFieldError('termsError');
    }

    return isValid;
}

/**
 * Show field error
 */
function showFieldError(fieldId, message) {
    const errorElement = document.getElementById(fieldId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

/**
 * Clear field error
 */
function clearFieldError(fieldId) {
    const errorElement = document.getElementById(fieldId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

/**
 * Show form success message
 */
function showFormSuccess() {
    const formStatus = document.getElementById('formStatus');
    const statusMessage = document.getElementById('statusMessage');

    if (formStatus && statusMessage) {
        formStatus.style.display = 'block';
        statusMessage.textContent = 'Thank you! Your message has been sent successfully. We will contact you within 24 hours.';
        formStatus.style.background = '#d4edda';
        formStatus.style.color = '#155724';

        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
}

// ===================================
// NEWSLETTER FORM HANDLING
// ===================================

const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Track newsletter signup
        trackEvent('newsletter_signup', {
            'email_domain': email.split('@')[1],
            'page': window.location.pathname
        });

        alert('Thank you for subscribing to M Gallery newsletter!');
        newsletterForm.reset();
    });
}

// ===================================
// FAQ ACCORDION
// ===================================

const faqHeaders = document.querySelectorAll('.faq-header');

faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const isOpen = content.style.display === 'block';

        // Close all other FAQs
        document.querySelectorAll('.faq-content').forEach(item => {
            item.style.display = 'none';
        });

        // Toggle current
        content.style.display = isOpen ? 'none' : 'block';

        // Track FAQ interaction
        if (!isOpen) {
            const question = header.querySelector('h3').textContent;
            trackEvent('faq_click', {
                'faq_question': question,
                'page': window.location.pathname
            });
        }
    });
});

// ===================================
// CTA BUTTON TRACKING
// ===================================

document.querySelectorAll('.cta-button').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('cta_click', {
            'button_text': btn.textContent.trim(),
            'page': window.location.pathname,
            'element_type': btn.classList.toString()
        });
    });
});

// ===================================
// SCROLL ANIMATIONS & STATS COUNTER
// ===================================

const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

/**
 * Animate statistics counters
 */
function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target.toLocaleString();
                clearInterval(interval);
            } else {
                stat.textContent = Math.floor(current).toLocaleString();
            }
        }, 30);
    });
}

/**
 * Intersection Observer for scroll animations
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate cards
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);

            // Animate stats when section is visible
            if (entry.target.classList.contains('stats-section') && !statsAnimated) {
                statsAnimated = true;
                animateStats();
            }
        }
    });
}, observerOptions);

// Observe cards and stats
document.querySelectorAll('.featured-card, .collection-card, .why-card, .mission-card, .contact-info-card, .stats-section').forEach(el => {
    if (!el.classList.contains('stats-section')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
    observer.observe(el);
});

// ===================================
// ACTIVE NAVIGATION LINK
// ===================================

/**
 * Highlight active navigation link based on current page
 */
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const isActive = href === currentPage || 
                        (currentPage === '' && href === 'index.html');
        
        if (isActive) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
}

// Update active link on page load
updateActiveNavLink();

// ===================================
// SMOOTH SCROLL BEHAVIOR
// ===================================

/**
 * Handle smooth scrolling for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for certain links
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            
            // Track scroll event
            trackEvent('anchor_click', {
                'anchor': href,
                'page': window.location.pathname
            });

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// FORM INPUT VALIDATION
// ===================================

/**
 * Real-time form field validation
 */
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });

    input.addEventListener('input', () => {
        // Clear error on input
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement && input.value.trim()) {
            errorElement.style.display = 'none';
        }
    });
});

/**
 * Validate individual field
 */
function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const name = field.id;
    let isValid = true;
    let errorMessage = '';

    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    } else if (type === 'tel' && value) {
        const phoneRegex = /^\+?[\d\s\-()]{10,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    } else if (name === 'message' && value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters long';
    }

    // Show/hide error
    const errorElement = field.parentElement.querySelector('.error-message');
    if (errorElement) {
        if (isValid) {
            errorElement.style.display = 'none';
        } else {
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
        }
    }

    return isValid;
}

// ===================================
// LAZY LOADING IMAGES
// ===================================

/**
 * Lazy load images (if supported by browser)
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// CLICK TO CALL TRACKING
// ===================================

document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        const phone = link.getAttribute('href').replace('tel:', '');
        trackEvent('phone_click', {
            'phone_number': phone,
            'page': window.location.pathname
        });
    });
});

// ===================================
// EMAIL CLICK TRACKING
// ===================================

document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
        const email = link.getAttribute('href').replace('mailto:', '');
        trackEvent('email_click', {
            'email_address': email,
            'page': window.location.pathname
        });
    });
});

// ===================================
// EXTERNAL LINK TRACKING
// ===================================

document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', () => {
        const url = link.getAttribute('href');
        trackEvent('external_link_click', {
            'external_url': url,
            'link_text': link.textContent.trim(),
            'page': window.location.pathname
        });
    });
});

// ===================================
// PERFORMANCE MONITORING
// ===================================

/**
 * Monitor page performance
 */
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const timing = window.performance.timing;
            const navigation = window.performance.navigation;

            const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
            const connectTime = timing.responseEnd - timing.requestStart;
            const renderTime = timing.domComplete - timing.domLoading;

            trackEvent('page_performance', {
                'page_load_time': Math.round(pageLoadTime),
                'connect_time': Math.round(connectTime),
                'render_time': Math.round(renderTime),
                'page': window.location.pathname
            });
        }, 0);
    });
}

// ===================================
// SESSION TRACKING
// ===================================

/**
 * Track session duration
 */
let sessionStartTime = Date.now();

window.addEventListener('beforeunload', () => {
    const sessionDuration = Math.round((Date.now() - sessionStartTime) / 1000);
    
    trackEvent('session_end', {
        'session_duration': sessionDuration,
        'page': window.location.pathname
    });
});

// ===================================
// SCROLL DEPTH TRACKING
// ===================================

let maxScrollPercentage = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    if (scrollPercent > maxScrollPercentage) {
        maxScrollPercentage = scrollPercent;

        // Track scroll depth at 25%, 50%, 75%, 100%
        if (scrollPercent === 25 || scrollPercent === 50 || scrollPercent === 75 || scrollPercent >= 100) {
            trackEvent('scroll_depth', {
                'scroll_percent': Math.min(scrollPercent, 100),
                'page': window.location.pathname
            });
        }
    }
});

// ===================================
// PRINT TRACKING
// ===================================

window.addEventListener('beforeprint', () => {
    trackEvent('page_print', {
        'page': window.location.pathname,
        'page_title': document.title
    });
});

// ===================================
// ERROR TRACKING
// ===================================

/**
 * Track JavaScript errors
 */
window.addEventListener('error', (event) => {
    trackEvent('js_error', {
        'error_message': event.message,
        'error_source': event.filename,
        'error_line': event.lineno,
        'page': window.location.pathname
    });
});

// ===================================
// UNLOAD EVENT TRACKING
// ===================================

/**
 * Track page unload
 */
window.addEventListener('unload', () => {
    trackEvent('page_unload', {
        'page': window.location.pathname
    });
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Debounce function for performance optimization
 */
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

/**
 * Throttle function for performance optimization
 */
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        if (!timeout) {
            func(...args);
            timeout = setTimeout(() => {
                timeout = null;
            }, wait);
        }
    };
}

// ===================================
// PAGE INITIALIZATION LOG
// ===================================

console.log('M Gallery - SEO Optimized Motorcycle Showcase');
console.log('Version: 1.0.0');
console.log('Google Analytics enabled: ' + (typeof gtag !== 'undefined' ? 'Yes' : 'No'));
console.log('Page: ' + document.title);
console.log('URL: ' + window.location.href);

// Log page load completion
window.addEventListener('load', () => {
    console.log('✓ Page fully loaded and initialized');
    console.log('✓ All scripts and styles loaded successfully');
});
