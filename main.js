// ========== PRELOADER ==========
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('done');
    // Trigger hero animations after preloader
    document.querySelectorAll('#home .reveal-up, #home .reveal-right').forEach((el, i) => {
      setTimeout(() => el.classList.add('revealed'), i * 150);
    });
  }, 1800);
});

// ========== SCROLL PROGRESS BAR ==========
const scrollProgress = document.getElementById('scroll-progress');

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = `${progress}%`;
}

// ========== HEADER SCROLL EFFECT ==========
const header = document.getElementById('main-header');

function updateHeader() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// ========== ACTIVE NAV TRACKING ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollPos = window.scrollY + 200;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ========== HERO PARALLAX ==========
const heroImg = document.querySelector('.hero-parallax');

function updateParallax() {
  if (heroImg && window.scrollY < window.innerHeight) {
    const offset = window.scrollY * 0.3;
    heroImg.style.transform = `scale(1.05) translateY(${offset}px)`;
  }
}

// ========== COMBINED SCROLL HANDLER ==========
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateScrollProgress();
      updateHeader();
      updateActiveNav();
      updateParallax();
      ticking = false;
    });
    ticking = true;
  }
});

// ========== SCROLL REVEAL (IntersectionObserver) ==========
const revealElements = document.querySelectorAll('.reveal-up, .reveal-right');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Skip hero elements — they're animated by the preloader
        if (entry.target.closest('#home')) return;
        entry.target.classList.add('revealed');
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ========== ANIMATED COUNTERS ==========
const counters = document.querySelectorAll('[data-counter]');
let countersAnimated = new Set();

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !countersAnimated.has(entry.target)) {
        countersAnimated.add(entry.target);
        const target = parseInt(entry.target.dataset.counter, 10);
        animateCounter(entry.target, target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((el) => counterObserver.observe(el));

function animateCounter(el, target) {
  const duration = 1500;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current;
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// ========== MOBILE MENU ==========
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('[data-mobile-link]');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ========== MAGNETIC HOVER on CTA buttons ==========
document.querySelectorAll('button').forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ========== INIT ==========
updateHeader();
updateScrollProgress();
