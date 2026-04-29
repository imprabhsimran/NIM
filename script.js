/* NIMRAT KAUR — PORTFOLIO JS */

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// CURSOR
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});
(function animateCursor() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
})();
document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; cursorRing.style.opacity = '0'; });
document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; cursorRing.style.opacity = '0.5'; });
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
});

// NAVBAR SCROLL
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// MOBILE HAMBURGER
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});
const mStyle = document.createElement('style');
mStyle.textContent = `
  @media (max-width: 960px) {
    .nav-links.open {
      display: flex !important; flex-direction: column;
      position: fixed; top: 62px; left: 0; right: 0;
      background: rgba(8,8,16,0.97); backdrop-filter: blur(24px);
      padding: 2rem 2.5rem; gap: 1.5rem;
      border-bottom: 1px solid rgba(255,255,255,0.06); z-index: 999;
    }
    .nav-links.open a { font-size: 1rem; }
    .hamburger.active span:first-child { transform: rotate(45deg) translate(5px, 5px); }
    .hamburger.active span:last-child { transform: rotate(-45deg) translate(5px, -5px); }
  }
`;
document.head.appendChild(mStyle);

// SCROLL REVEAL
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// Staggered skill cards
const skCards = document.querySelectorAll('.sk-card');
let skTriggered = false;
const skObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !skTriggered) {
      skTriggered = true;
      skCards.forEach((card, i) => { setTimeout(() => card.classList.add('visible'), i * 90); });
      skObserver.disconnect();
    }
  });
}, { threshold: 0.1 });
if (skCards.length) skObserver.observe(skCards[0]);

// Staggered exp cards
const expCards = document.querySelectorAll('.exp-card');
let expTriggered = false;
const expObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !expTriggered) {
      expTriggered = true;
      expCards.forEach((card, i) => { setTimeout(() => card.classList.add('visible'), i * 150); });
      expObserver.disconnect();
    }
  });
}, { threshold: 0.1 });
if (expCards.length) expObserver.observe(expCards[0]);

// STAT COUNTERS
function animateCount(el, target, isDecimal) {
  const steps = 80;
  const increment = target / steps;
  let current = 0, count = 0;
  const timer = setInterval(() => {
    count++;
    current = Math.min(current + increment, target);
    el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
    if (count >= steps) clearInterval(timer);
  }, 2000 / steps);
}
const statNums = document.querySelectorAll('.hstat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      animateCount(el, parseFloat(el.dataset.target), el.dataset.decimal === 'true');
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => statObserver.observe(el));

// TYPING ROLE
const roleEl = document.getElementById('heroRole');
if (roleEl) {
  const roles = ['IT Support Specialist', 'Help Desk Professional', 'Tech Troubleshooter', 'Computing Solutions Advisor', 'Hardware Specialist'];
  let ri = 0, ci = 0, deleting = false, speed = 90;
  function type() {
    const word = roles[ri];
    if (deleting) { roleEl.textContent = word.substring(0, ci - 1); ci--; speed = 45; }
    else { roleEl.textContent = word.substring(0, ci + 1); ci++; speed = 90; }
    if (!deleting && ci === word.length) { speed = 2400; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; speed = 400; }
    setTimeout(type, speed);
  }
  setTimeout(type, 1800);
}

// ACTIVE NAV
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      links.forEach(l => { l.style.color = l.getAttribute('href') === `#${id}` ? 'var(--text1)' : ''; });
    }
  });
}, { threshold: 0.45 });
sections.forEach(s => activeObserver.observe(s));

// PHOTO PARALLAX
const photoWrap = document.querySelector('.photo-wrap');
if (photoWrap) {
  document.addEventListener('mousemove', (e) => {
    const dx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    const dy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    photoWrap.style.transform = `translate(${dx * 6}px, ${dy * 6}px)`;
  });
}

// SKILL CARD TILT
document.querySelectorAll('.sk-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -10;
    card.style.transform = `translateY(-5px) rotateX(${y}deg) rotateY(${x}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)';
  });
});

// CONTACT PHOTO HOVER
const contactPhoto = document.querySelector('.contact-photo');
if (contactPhoto) {
  contactPhoto.addEventListener('mousemove', (e) => {
    const r = contactPhoto.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -8;
    contactPhoto.style.transform = `scale(1.02) rotateX(${y}deg) rotateY(${x}deg)`;
    contactPhoto.style.transition = 'transform 0.1s ease';
  });
  contactPhoto.addEventListener('mouseleave', () => {
    contactPhoto.style.transform = '';
    contactPhoto.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)';
  });
}