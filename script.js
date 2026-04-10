/* ═══════════════════════════════════════════
   DIKSHA KUMARI PORTFOLIO — script.js
═══════════════════════════════════════════ */

// ── Navbar scroll effect ─────────────────────
const navbar = document.getElementById('navbar');

function handleScroll() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
}

window.addEventListener('scroll', handleScroll, { passive: true });

// ── Active nav link on scroll ─────────────────
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
  let currentSection = '';
  const scrollPos = window.scrollY + window.innerHeight / 3;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollPos >= top && scrollPos < top + height) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href').replace('#', '');
    if (href === currentSection) {
      link.classList.add('active');
    }
  });
}

// ── Hamburger menu ─────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinksEl.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu on nav link click
navLinksEl.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Scroll reveal via IntersectionObserver ─────
const revealElements = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));

// ── Smooth scroll for anchor links ────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h'), 10) || 68;

    const top = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Initialise on load ─────────────────────────
handleScroll();
