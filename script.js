// === NAVBAR SCROLL EFFECT ===
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Navbar background on scroll
function handleNavScroll() {
    if (window.scrollY > 20) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll(); // initial check

// === DESKTOP NAV ACTIVE STATE ===
const desktopNavLinks = document.querySelectorAll('.desktop-nav-link[href^="#"]');
const navSections = Array.from(desktopNavLinks)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

function updateActiveNavLink() {
    if (desktopNavLinks.length === 0 || navSections.length === 0) return;

    const navOffset = navbar.offsetHeight + 80;
    let activeSectionId = null;

    navSections.forEach((section) => {
        if (section.offsetTop - navOffset <= window.scrollY) {
            activeSectionId = section.id;
        }
    });

    desktopNavLinks.forEach((link) => {
        link.classList.toggle('is-active', activeSectionId !== null && link.getAttribute('href') === `#${activeSectionId}`);
    });
}

window.addEventListener('scroll', updateActiveNavLink, { passive: true });
window.addEventListener('load', updateActiveNavLink);
updateActiveNavLink();

// === MOBILE MENU TOGGLE ===
let menuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('open');
        mobileMenuBtn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
    } else {
        mobileMenu.classList.remove('open');
        mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
        setTimeout(() => {
            if (!menuOpen) mobileMenu.classList.add('hidden');
        }, 350);
    }
    lucide.createIcons();
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.classList.remove('open');
        mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
        setTimeout(() => {
            if (!menuOpen) mobileMenu.classList.add('hidden');
        }, 350);
        lucide.createIcons();
    });
});

// === INTERSECTION OBSERVER FOR FADE-UP ANIMATIONS ===
function setupScrollAnimations() {
    const elements = document.querySelectorAll(
        'section > div > div:not([class*="grid"]):not([class*="absolute"]), ' +
        '.grid > div, ' +
        'section[id] > div > div > h2, ' +
        'section[id] > div > div > p, ' +
        'section[id] > div > div > a'
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation slightly
                const delay = Math.min(index * 50, 400);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach((el) => {
        // Only observe elements that aren't already animated
        if (!el.classList.contains('animate-fade-up') && 
            !el.classList.contains('animate-fade-in') &&
            !el.closest('.animate-fade-up') &&
            !el.closest('.animate-fade-in') &&
            el.offsetHeight > 0) {
            
            // Don't re-animate elements inside the hero
            if (!el.closest('section:first-of-type') || el.closest('section:first-of-type').querySelector('.animate-fade-up') === null) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(24px)';
                el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                observer.observe(el);
            }
        }
    });
}

// Run after the page loads
window.addEventListener('load', () => {
    setupScrollAnimations();
});

// === SMOOTH SCROLL FOR ANCHOR LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
            });
        }
    });
});

// === PARALLAX EFFECT ON HERO ORBS ===
let ticking = false;
const heroOrbs = document.querySelectorAll('.animate-pulse-glow');

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrolled = window.scrollY;
            heroOrbs.forEach((orb, index) => {
                const speed = 0.03 + (index * 0.01);
                const yOffset = scrolled * speed;
                orb.style.transform = `translateY(${-yOffset}px)`;
            });
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

console.log('Adit AI Technology — Enterprise AI Platform');
