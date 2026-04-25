// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#64ffda' },
        shape: { type: 'circle' },
        opacity: { value: 0.3, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#64ffda', opacity: 0.2, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const titles = [
    'Java Backend Engineer',
    'Cloud & Kubernetes Expert',
    'Event-Driven Architecture',
    'SRE & Observability'
];
let titleIndex = 0, charIndex = 0, isDeleting = false;

function type() {
    const currentTitle = titles[titleIndex];
    typingText.textContent = isDeleting
        ? currentTitle.substring(0, charIndex - 1)
        : currentTitle.substring(0, charIndex + 1);
    isDeleting ? charIndex-- : charIndex++;
    if (!isDeleting && charIndex === currentTitle.length) setTimeout(() => isDeleting = true, 2000);
    else if (isDeleting && charIndex === 0) { isDeleting = false; titleIndex = (titleIndex + 1) % titles.length; }
    setTimeout(type, isDeleting ? 50 : 100);
}
setTimeout(type, 1000);

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); navMenu.classList.remove('active'); }
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 100));

// Mobile Menu Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle.addEventListener('click', () => navMenu.classList.toggle('active'));

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('aos-animate'); });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => { if (window.scrollY >= section.offsetTop - 200) current = section.getAttribute('id'); });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) link.classList.add('active');
    });
});

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        window.location.href = `mailto:ranjith@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        alert('Opening your email client...');
        contactForm.reset();
    });
}

// Cursor trail effect
if (window.innerWidth > 768) {
    const coords = { x: 0, y: 0 };
    for (let i = 0; i < 20; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.style.cssText = 'position:fixed;width:10px;height:10px;border-radius:50%;background:rgba(100,255,218,0.3);pointer-events:none;z-index:9999;';
        document.body.appendChild(circle);
    }
    const circles = document.querySelectorAll('.circle');
    window.addEventListener('mousemove', (e) => { coords.x = e.clientX; coords.y = e.clientY; });
    function animateCircles() {
        let x = coords.x, y = coords.y;
        circles.forEach((circle, index) => {
            circle.style.left = x - 5 + 'px';
            circle.style.top = y - 5 + 'px';
            circle.style.transform = `scale(${(circles.length - index) / circles.length})`;
            const next = circles[index + 1] || circles[0];
            x += (next.offsetLeft - x) * 0.3;
            y += (next.offsetTop - y) * 0.3;
        });
        requestAnimationFrame(animateCircles);
    }
    animateCircles();
}
