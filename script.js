// Nav: subtle darken on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 40
    ? 'rgba(16,17,31,0.92)'
    : 'rgba(16,17,31,0.72)';
});

// Nav: mobile toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => navLinks.classList.toggle('open'));

// Close mobile nav when a link is clicked
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Fade-in sections on scroll
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.12 }
);

const fadeTargets = document.querySelectorAll(
  '.project-card, .skill-group, .stat-card, .contact-card, .timeline-card, .about-text, .edu-card'
);

fadeTargets.forEach((el, i) => {
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  observer.observe(el);
});

// Cursor-reactive glow: track pointer position within each glass card
const glowTargets = document.querySelectorAll(
  '.project-card, .skill-group, .stat-card, .contact-card, .timeline-card, .about-text, .edu-card, .glass'
);

glowTargets.forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
  });
});
