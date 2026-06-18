/* ============================================
   RIANIC Production — script.js
   Interactions, animations, and scroll magic.
   ============================================ */

'use strict';

// ---- Footer year ----
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Custom Cursor ----
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

if (window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Expand on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .portfolio-card, .testimonial-card');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('expanded');
      follower.classList.add('expanded');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('expanded');
      follower.classList.remove('expanded');
    });
  });
}

// ---- Scroll Progress ----
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${progress}%`;
}, { passive: true });

// ---- Navbar scroll state ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ---- Mobile Menu ----
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-menu .btn-primary');

mobileBtn.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  mobileBtn.classList.toggle('open', isOpen);
  mobileBtn.setAttribute('aria-expanded', isOpen);
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    mobileBtn.classList.remove('open');
  });
});

// ---- Hero Canvas — cinematic particle field ----
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [], animFrame;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor((w * h) / 9000), 80);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.2,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.12,
        alpha: Math.random() * 0.4 + 0.05,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Subtle horizontal scan line
    const scanY = ((Date.now() * 0.02) % h);
    const grad = ctx.createLinearGradient(0, scanY - 80, 0, scanY + 80);
    grad.addColorStop(0, 'rgba(79,140,255,0)');
    grad.addColorStop(0.5, 'rgba(79,140,255,0.018)');
    grad.addColorStop(1, 'rgba(79,140,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, scanY - 80, w, 160);

    // Particles
    particles.forEach((p, i) => {
      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[j].x - p.x;
        const dy = particles[j].y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.strokeStyle = `rgba(79,140,255,${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(79,140,255,${p.alpha})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
    });

    animFrame = requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  const ro = new ResizeObserver(() => {
    resize();
    createParticles();
  });
  ro.observe(canvas);
})();

// ---- Scroll Reveal (Intersection Observer) ----
(function initReveal() {
  const targets = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!targets.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = Array.from(entry.target.parentElement.children).filter(
          c => c.classList.contains('reveal-up') ||
               c.classList.contains('reveal-left') ||
               c.classList.contains('reveal-right')
        );
        const delay = siblings.indexOf(entry.target) * 90;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => obs.observe(el));
})();

// ---- Animated Counters ----
(function initCounters() {
  const counters = document.querySelectorAll('.counter-value');
  if (!counters.length) return;

  const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = ease(progress);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => obs.observe(c));
})();

// ---- Portfolio Filter ----
(function initPortfolioFilter() {
  const tabs = document.querySelectorAll('.tab-btn');
  const cards = document.querySelectorAll('.portfolio-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          requestAnimationFrame(() => {
            card.style.animation = 'filterIn 0.4s ease forwards';
          });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Inject filter animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes filterIn {
      from { opacity: 0; transform: scale(0.97) translateY(8px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
  `;
  document.head.appendChild(style);
})();

// ---- FAQ Accordion ----
(function initFAQ() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close all
      items.forEach(i => {
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        i.querySelector('.faq-answer').classList.remove('open');
      });

      // Open clicked (unless it was open)
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });
})();

// ---- Active Nav Link on Scroll ----
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}` ? '#F5F5F5' : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(s => obs.observe(s));
})();

// ---- Smooth scroll for all anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Lazy load iframes on demand ----
(function lazyIframes() {
  const iframes = document.querySelectorAll('iframe[loading="lazy"]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const src = entry.target.getAttribute('src');
        if (src && src.includes('VIDEO_ID')) return; // Skip placeholder
        entry.target.setAttribute('src', entry.target.getAttribute('src'));
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '100px' });
  iframes.forEach(f => obs.observe(f));
})();
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if(window.scrollY > 50){
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});
