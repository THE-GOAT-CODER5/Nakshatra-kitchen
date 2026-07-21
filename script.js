/* =========================================================
   NAKSHATRA INDIAN RESTAURANT — DEMO WEBSITE
   script.js — small, dependency-free interactivity layer
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header shadow on scroll ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 12) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    toggleBackToTop();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile hamburger menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  function toggleMobileNav() {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  }

  hamburger.addEventListener('click', toggleMobileNav);

  // Close mobile nav whenever a link inside it is tapped
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileNav);
  });

  /* ---------- Scroll-triggered fade-in animations ---------- */
  const fadeEls = document.querySelectorAll('.fade-in');

  // Add a slight stagger index within each grid group for a nicer cascade
  ['menu-grid', 'dishes-grid', 'gallery-grid', 'why-grid'].forEach((gridClass) => {
    document.querySelectorAll('.' + gridClass).forEach((grid) => {
      Array.from(grid.children).forEach((child, i) => {
        child.style.setProperty('--i', i);
      });
    });
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: just show everything if IntersectionObserver isn't supported
    fadeEls.forEach((el) => el.classList.add('visible'));
  }

  /* ---------- Back to top button ---------- */
  const backToTop = document.getElementById('backToTop');

  function toggleBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Order Online placeholder notice ----------
     Since there is no real online ordering link yet, let the
     restaurant owner see clearly that this button is a placeholder
     rather than silently doing nothing. */
  const orderBtn = document.getElementById('orderOnlineBtn');
  if (orderBtn) {
    orderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('This is a placeholder button.\n\nOnce the restaurant provides an online ordering link (own platform, DoorDash, Uber Eats, Grubhub, etc.), it will be connected here.');
    });
  }

});