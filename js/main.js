/**
 * Pascal Zwick - Personal Website
 * Main JavaScript file for smooth interactions and animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    Navigation.init();
    ScrollEffects.init();
    SmoothScroll.init();
});

/**
 * Navigation Module
 * Handles mobile menu toggle and navbar scroll effects
 */
const Navigation = {
    init() {
        this.navbar = document.querySelector('.navbar');
        this.navToggle = document.querySelector('.nav-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.navLinksItems = document.querySelectorAll('.nav-links a');
        
        this.bindEvents();
    },
    
    bindEvents() {
        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Close mobile menu on link click
        this.navLinksItems.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
        
        // Scroll effect for navbar
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        
        // Close mobile menu on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
        });
    },
    
    toggleMobileMenu() {
        this.navToggle.classList.toggle('active');
        this.navLinks.classList.toggle('active');
    },
    
    closeMobileMenu() {
        this.navToggle.classList.remove('active');
        this.navLinks.classList.remove('active');
    },
    
    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
};

/**
 * Scroll Effects Module
 * Handles fade-in animations on scroll
 */
const ScrollEffects = {
    init() {
        this.elements = document.querySelectorAll('.about-card, .publication-card, .project-card, .contact-card, .section-title');
        
        // Add fade-in class to elements
        this.elements.forEach(el => {
            el.classList.add('fade-in');
        });
        
        // Initial check
        this.checkVisibility();
        
        // Bind scroll event
        window.addEventListener('scroll', () => this.checkVisibility(), { passive: true });
    },
    
    checkVisibility() {
        const triggerBottom = window.innerHeight * 0.85;
        
        this.elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                el.classList.add('visible');
            }
        });
    }
};

/**
 * Smooth Scroll Module
 * Enhances anchor link scrolling behavior
 */
const SmoothScroll = {
    init() {
        this.bindEvents();
    },
    
    bindEvents() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                
                // Skip if it's just "#"
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                
                if (target) {
                    e.preventDefault();
                    
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};

/**
 * Active Navigation Link Highlighter
 * Highlights the current section in the navigation
 */
const ActiveNavHighlight = {
    init() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-links a');
        
        window.addEventListener('scroll', () => this.highlightCurrent(), { passive: true });
    },
    
    highlightCurrent() {
        const scrollPosition = window.scrollY + 100;
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
};

// Initialize active nav highlight
ActiveNavHighlight.init();

/**
 * Typing Effect for Hero (Optional Enhancement)
 * Adds a subtle typing animation to the hero subtitle
 */
const TypingEffect = {
    init() {
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) {
            // Add subtle pulse animation
            subtitle.style.animation = 'pulse 3s ease-in-out infinite';
        }
    }
};

// Add pulse keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
    }
`;
document.head.appendChild(style);

TypingEffect.init();

/**
 * Parallax Effect for Hero Shapes
 * Adds subtle parallax movement to hero section shapes
 */
const ParallaxShapes = {
    init() {
        this.shapes = document.querySelectorAll('.shape');
        
        if (this.shapes.length > 0) {
            window.addEventListener('scroll', () => this.handleParallax(), { passive: true });
        }
    },
    
    handleParallax() {
        const scrolled = window.scrollY;
        const heroSection = document.querySelector('.hero');
        
        if (!heroSection) return;
        
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        
        if (scrolled < heroBottom) {
            this.shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.1;
                const offset = scrolled * speed;
                shape.style.transform = `translateY(${offset}px)`;
            });
        }
    }
};

ParallaxShapes.init();

/**
 * Card Tilt Effect (Optional Enhancement)
 * Adds subtle 3D tilt effect to cards on hover
 */
const CardTilt = {
    init() {
        this.cards = document.querySelectorAll('.project-card, .publication-card');
        
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
            card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
        });
    },
    
    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    },
    
    handleMouseLeave(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    }
};

// Uncomment to enable 3D tilt effect
// CardTilt.init();

/**
 * Loading Animation
 * Adds a subtle fade-in to the entire page on load
 */
const PageLoader = {
    init() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    }
};

PageLoader.init();

console.log('Pascal Zwick Website Loaded Successfully 🚀');