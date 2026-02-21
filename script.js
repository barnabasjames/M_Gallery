// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    hamburger.style.position = 'fixed';
});

// Smooth Scrolling for Navigation Links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            navMenu.style.display = 'none';
        }
    });
});

// Gallery Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 10);
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
            }
        });
    });
});

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        alert(`Thank you for subscribing with ${emailInput.value}`);
        newsletterForm.reset();
    });
}

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.featured-card, .collection-card, .why-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// CTA Button Click Handler
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        if (!this.classList.contains('contact-form')) {
            const gallerySection = document.querySelector('#gallery');
            gallerySection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

console.log('M Gallery - Premium Motorcycle Showcase Website Loaded Successfully!');
