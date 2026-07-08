// Hero: typewriter intro
const typeEl = document.getElementById('typewriter');
if (typeEl) {
  const message = 'hi, jiya here.';
  let i = 0;
  const type = () => {
    if (i <= message.length) {
      typeEl.textContent = message.slice(0, i);
      i++;
      setTimeout(type, 55);
    }
  };
  type();
}

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

// Projects: carousel navigation + view-all toggle
const projectsGrid = document.getElementById('projects-grid');
const carouselNav = document.getElementById('carousel-nav');
const viewToggle = document.getElementById('view-toggle');
const prevBtn = document.getElementById('prev-project');
const nextBtn = document.getElementById('next-project');
const counterEl = document.getElementById('carousel-counter');

if (projectsGrid) {
  const cards = Array.from(projectsGrid.querySelectorAll('.project-card'));
  let activeIndex = cards.findIndex(c => c.classList.contains('active'));
  if (activeIndex === -1) activeIndex = 0;
  let gridView = false;

  const showCard = (index) => {
    cards.forEach((card, i) => {
      card.classList.toggle('active', i === index);
      if (i === index) card.classList.add('visible'); // ensure it's not stuck at opacity:0
    });
    counterEl.textContent = `${index + 1} / ${cards.length}`;
  };

  showCard(activeIndex);

  prevBtn.addEventListener('click', () => {
    activeIndex = (activeIndex - 1 + cards.length) % cards.length;
    showCard(activeIndex);
  });

  nextBtn.addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % cards.length;
    showCard(activeIndex);
  });

  viewToggle.addEventListener('click', () => {
    gridView = !gridView;
    if (gridView) {
      projectsGrid.classList.remove('carousel-mode');
      carouselNav.classList.add('nav-hidden');
      viewToggle.textContent = 'View carousel ←';
      cards.forEach(card => card.classList.add('visible'));
    } else {
      projectsGrid.classList.add('carousel-mode');
      carouselNav.classList.remove('nav-hidden');
      viewToggle.textContent = 'View all projects →';
      showCard(activeIndex);
    }
  });
}
