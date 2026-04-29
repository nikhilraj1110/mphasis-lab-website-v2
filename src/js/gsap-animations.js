/* ============================================
   GSAP SCROLL ANIMATIONS — DE-2
   Replaces IntersectionObserver reveals with
   GSAP ScrollTrigger for richer, varied motion
   ============================================ */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Register ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ═══════════════════════════════════════════
     REDUCED MOTION FALLBACK
     ═══════════════════════════════════════════ */

  if (prefersReducedMotion || typeof gsap === 'undefined') {
    // Show everything immediately — no animation
    window.initScrollReveals = function () {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('reveal--visible');
      });
    };
    window.initScrollReveals();
    return;
  }

  /* ═══════════════════════════════════════════
     GSAP DEFAULTS
     ═══════════════════════════════════════════ */

  gsap.defaults({
    ease: 'power3.out',
    duration: 0.7
  });

  /* ═══════════════════════════════════════════
     ANIMATION HELPERS
     ═══════════════════════════════════════════ */

  function getScrollTrigger(el, opts) {
    return Object.assign({
      trigger: el,
      start: 'top 88%',
      toggleActions: 'play none none none',
      once: true
    }, opts || {});
  }

  /* ═══════════════════════════════════════════
     HERO ANIMATIONS (Homepage)
     ═══════════════════════════════════════════ */

  function animateHero() {
    var heroEls = document.querySelectorAll('.hero .reveal');
    if (!heroEls.length) return;

    gsap.set(heroEls, { opacity: 0, y: 30 });

    gsap.to(heroEls, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      delay: 0.2,
      onComplete: function () {
        heroEls.forEach(function (el) { el.classList.add('reveal--visible'); });
      }
    });
  }

  /* ═══════════════════════════════════════════
     PAGE HERO ANIMATIONS (Subpages)
     ═══════════════════════════════════════════ */

  function animatePageHero() {
    var heroEls = document.querySelectorAll('.page-hero .reveal');
    if (!heroEls.length) return;

    gsap.set(heroEls, { opacity: 0, y: 25 });

    gsap.to(heroEls, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out',
      delay: 0.15,
      onComplete: function () {
        heroEls.forEach(function (el) { el.classList.add('reveal--visible'); });
      }
    });
  }

  /* ═══════════════════════════════════════════
     SECTION HEADERS
     ═══════════════════════════════════════════ */

  function animateSectionHeaders() {
    document.querySelectorAll('.section__header.reveal').forEach(function (header) {
      gsap.set(header, { opacity: 0, y: 30 });

      gsap.to(header, {
        scrollTrigger: getScrollTrigger(header),
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: function () { header.classList.add('reveal--visible'); }
      });
    });
  }

  /* ═══════════════════════════════════════════
     PILLAR CARDS — Scale + Fade + Stagger
     ═══════════════════════════════════════════ */

  function animatePillarCards() {
    document.querySelectorAll('.pillar-grid.reveal-stagger').forEach(function (grid) {
      var cards = grid.querySelectorAll('.pillar-card.reveal');
      if (!cards.length) return;

      gsap.set(cards, { opacity: 0, y: 40, scale: 0.95 });

      gsap.to(cards, {
        scrollTrigger: getScrollTrigger(grid),
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        onComplete: function () {
          cards.forEach(function (c) { c.classList.add('reveal--visible'); });
        }
      });
    });
  }

  /* ═══════════════════════════════════════════
     STAT CARDS — Slide Up + Stagger
     ═══════════════════════════════════════════ */

  function animateStatCards() {
    document.querySelectorAll('.stats-grid.reveal-stagger').forEach(function (grid) {
      var cards = grid.querySelectorAll('.stat-card.reveal');
      if (!cards.length) return;

      gsap.set(cards, { opacity: 0, y: 25 });

      gsap.to(cards, {
        scrollTrigger: getScrollTrigger(grid, { start: 'top 90%' }),
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        onComplete: function () {
          cards.forEach(function (c) { c.classList.add('reveal--visible'); });
        }
      });
    });
  }

  /* ═══════════════════════════════════════════
     TIMELINE ITEMS — Alternate Left/Right
     ═══════════════════════════════════════════ */

  function animateTimeline() {
    document.querySelectorAll('.timeline.reveal-stagger, .timeline.reveal').forEach(function (timeline) {
      var items = timeline.querySelectorAll('.timeline__item.reveal, .timeline__item');
      if (!items.length) return;

      items.forEach(function (item, index) {
        var fromX = index % 2 === 0 ? -20 : 20;
        gsap.set(item, { opacity: 0, x: fromX });

        gsap.to(item, {
          scrollTrigger: getScrollTrigger(item),
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: function () { item.classList.add('reveal--visible'); }
        });
      });

      // Mark parent as visible
      timeline.classList.add('reveal--visible');
    });
  }

  /* ═══════════════════════════════════════════
     STAGGERED GRIDS (Cards, People, etc.)
     ═══════════════════════════════════════════ */

  function animateStaggeredGrids() {
    document.querySelectorAll('.reveal-stagger').forEach(function (parent) {
      // Skip already handled containers
      if (parent.classList.contains('pillar-grid') ||
          parent.classList.contains('stats-grid') ||
          parent.classList.contains('timeline')) return;

      var children = parent.querySelectorAll('.reveal');
      if (!children.length) return;

      // Check if already animated by GSAP
      if (parent.getAttribute('data-gsap-init')) return;
      parent.setAttribute('data-gsap-init', '1');

      // Determine stagger speed based on child count
      var staggerTime = children.length > 8 ? 0.06 : 0.08;

      gsap.set(children, { opacity: 0, y: 30 });

      gsap.to(children, {
        scrollTrigger: getScrollTrigger(parent),
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: staggerTime,
        ease: 'power2.out',
        onComplete: function () {
          children.forEach(function (c) { c.classList.add('reveal--visible'); });
        }
      });
    });
  }

  /* ═══════════════════════════════════════════
     STANDALONE REVEALS (Default)
     ═══════════════════════════════════════════ */

  function animateStandaloneReveals() {
    document.querySelectorAll('.reveal').forEach(function (el) {
      // Skip if already animated or inside a stagger parent
      if (el.classList.contains('reveal--visible')) return;
      if (el.closest('.reveal-stagger')) return;
      if (el.closest('.hero') || el.closest('.page-hero')) return;
      if (el.classList.contains('section__header')) return;
      if (el.getAttribute('data-gsap-init')) return;

      el.setAttribute('data-gsap-init', '1');

      gsap.set(el, { opacity: 0, y: 24 });

      gsap.to(el, {
        scrollTrigger: getScrollTrigger(el),
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        onComplete: function () { el.classList.add('reveal--visible'); }
      });
    });
  }

  /* ═══════════════════════════════════════════
     MASTER INIT
     ═══════════════════════════════════════════ */

  function initGSAPReveals() {
    animateHero();
    animatePageHero();
    animateSectionHeaders();
    animatePillarCards();
    animateStatCards();
    animateTimeline();
    animateStaggeredGrids();
    animateStandaloneReveals();
  }

  // Run on load
  initGSAPReveals();

  // Expose for detail-page.js (dynamic content re-init)
  window.initScrollReveals = function () {
    // Refresh ScrollTrigger to pick up new DOM elements
    ScrollTrigger.refresh();
    // Re-run animations for any new .reveal elements
    animateSectionHeaders();
    animatePillarCards();
    animateStatCards();
    animateTimeline();
    animateStaggeredGrids();
    animateStandaloneReveals();
  };

})();
