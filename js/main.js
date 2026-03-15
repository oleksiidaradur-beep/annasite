// ===== HEADER SCROLL =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== BURGER MENU =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
});

nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ===== COUNTER ANIMATION =====
function animateCounters(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count'));
            const duration = 2000;
            const start = performance.now();

            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * target);
                el.textContent = current.toLocaleString('uk-UA');

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }

            requestAnimationFrame(update);
            observer.unobserve(el);
        }
    });
}

const counterObserver = new IntersectionObserver(animateCounters, {
    threshold: 0.5
});

document.querySelectorAll('[data-count]').forEach(el => {
    counterObserver.observe(el);
});

// ===== IMPACT BAR ANIMATION =====
const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            barObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.impact-bar-fill').forEach(el => {
    barObserver.observe(el);
});

// ===== FADE IN ANIMATIONS =====
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Add fade-in class to animated elements
document.querySelectorAll('.program-card, .impact-card, .story-card, .about-feature, .donate-impact-item, .contact-item').forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
});

// ===== DONATE AMOUNT BUTTONS =====
const amountBtns = document.querySelectorAll('.amount-btn');
const donateInput = document.getElementById('donateAmount');

amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        amountBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        donateInput.value = btn.getAttribute('data-amount');
    });
});

donateInput.addEventListener('input', () => {
    amountBtns.forEach(b => b.classList.remove('active'));
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Надіслано!';
    btn.style.background = 'linear-gradient(135deg, #22C55E, #4ADE80)';

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        e.target.reset();
    }, 3000);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== HERO PARTICLES =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 20;
    const emojis = ['💛', '✨', '🌟', '💫', '⭐'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        particle.textContent = emoji;
        particle.style.cssText = `
            position: absolute;
            font-size: ${8 + Math.random() * 16}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${0.1 + Math.random() * 0.3};
            animation: float ${4 + Math.random() * 6}s ease-in-out infinite;
            animation-delay: ${Math.random() * 4}s;
            pointer-events: none;
        `;
        container.appendChild(particle);
    }
}

createParticles();
