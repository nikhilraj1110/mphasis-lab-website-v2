/* ============================================
   MAIN JS — Mphasis AI & Applied Tech Lab
   v2.0 — Interactive, alive, immersive
   ============================================ */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ═══════════════════════════════════════════
     1. PROGRESS BAR
     ═══════════════════════════════════════════ */

  var progressBar = document.getElementById('progress-bar');

  function updateProgressBar() {
    if (!progressBar) return;
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }

  window.addEventListener('scroll', updateProgressBar, { passive: true });

  /* ═══════════════════════════════════════════
     2. HEADER SCROLL EFFECT
     ═══════════════════════════════════════════ */

  var header = document.querySelector('.header');

  function handleHeaderScroll() {
    if (!header) return;
    header.classList.toggle('header--scrolled', window.scrollY > 10);
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  /* ═══════════════════════════════════════════
     3. MOBILE MENU
     ═══════════════════════════════════════════ */

  var menuToggle = document.querySelector('.header__menu-toggle');
  var mobileNav = document.querySelector('.nav-mobile');

  function closeMobileMenu() {
    if (!mobileNav || !menuToggle) return;
    mobileNav.classList.remove('nav-mobile--open');
    menuToggle.classList.remove('header__menu-toggle--open');
    document.body.classList.remove('no-scroll');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  function toggleMobileMenu() {
    if (!menuToggle || !mobileNav) return;
    var isOpen = mobileNav.classList.contains('nav-mobile--open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      mobileNav.classList.add('nav-mobile--open');
      menuToggle.classList.add('header__menu-toggle--open');
      document.body.classList.add('no-scroll');
      menuToggle.setAttribute('aria-expanded', 'true');
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
  }

  if (mobileNav) {
    mobileNav.querySelectorAll('.nav-mobile__link').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('nav-mobile--open')) {
      closeMobileMenu();
      menuToggle.focus();
    }

    // Arrow keys: scroll by 100vh per press (disabled when search overlay or side nav is open)
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      var tag = document.activeElement.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      var searchEl = document.getElementById('search-overlay');
      if (searchEl && !searchEl.hidden) return;
      var sideNavEl = document.getElementById('side-nav');
      if (sideNavEl && sideNavEl.classList.contains('side-nav--open')) return;
      e.preventDefault();
      var delta = e.key === 'ArrowDown' ? window.innerHeight : -window.innerHeight;
      window.scrollBy({ top: delta, behavior: 'smooth' });
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 1140 && mobileNav && mobileNav.classList.contains('nav-mobile--open')) {
      closeMobileMenu();
    }
  });

  /* ═══════════════════════════════════════════
     4. NODE NETWORK (Canvas)
     ═══════════════════════════════════════════ */

  function initNodeNetwork() {
    var canvas = document.getElementById('hero-canvas');
    if (!canvas || prefersReducedMotion) return;

    var ctx = canvas.getContext('2d');
    var particles = [];
    var mouse = { x: null, y: null };
    var animationId = null;
    var isVisible = true;

    var config = {
      count: window.innerWidth < 768 ? 35 : 70,
      maxDistance: 160,
      speed: 0.3,
      particleRadius: 2.2,
      colors: [
        'rgba(27, 42, 74, 0.55)',
        'rgba(0, 155, 222, 0.5)',
        'rgba(196, 30, 58, 0.35)'
      ]
    };

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function createParticles() {
      particles = [];
      for (var i = 0; i < config.count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * config.speed,
          vy: (Math.random() - 0.5) * config.speed,
          radius: Math.random() * config.particleRadius + 1,
          color: config.colors[Math.floor(Math.random() * config.colors.length)]
        });
      }
    }

    function drawParticle(p) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }

    function drawLine(p1, p2, distance) {
      var opacity = 1 - (distance / config.maxDistance);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = 'rgba(0, 155, 222, ' + (opacity * 0.18) + ')';
      ctx.lineWidth = 0.9;
      ctx.stroke();
    }

    function update() {
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Gentle mouse repulsion
        if (mouse.x !== null) {
          var dx = p.x - mouse.x;
          var dy = p.y - mouse.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            var force = (150 - dist) / 150 * 0.008;
            p.vx += dx * force;
            p.vy += dy * force;
          }
        }

        // Speed dampening
        var speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > config.speed * 2) {
          p.vx *= 0.98;
          p.vy *= 0.98;
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw lines
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < config.maxDistance) {
            drawLine(particles[i], particles[j], distance);
          }
        }
      }

      // Draw particles
      for (var k = 0; k < particles.length; k++) {
        drawParticle(particles[k]);
      }
    }

    function animate() {
      if (!isVisible) return;
      update();
      draw();
      animationId = requestAnimationFrame(animate);
    }

    // Visibility observer — pause when out of viewport, restart on return
    var observer = new IntersectionObserver(function (entries) {
      isVisible = entries[0].isIntersecting;
      if (isVisible) {
        if (!animationId) animate();
      } else {
        animationId = null;
      }
    }, { threshold: 0 });

    observer.observe(canvas);

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', function () {
      resize();
      config.count = window.innerWidth < 768 ? 35 : 70;
      createParticles();
    });

    canvas.parentElement.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener('mouseleave', function () {
      mouse.x = null;
      mouse.y = null;
    });
  }

  initNodeNetwork();

  /* ═══════════════════════════════════════════
     5. SCROLL REVEALS
     — Now handled by gsap-animations.js (DE-2)
     — window.initScrollReveals is set by that file
     ═══════════════════════════════════════════ */

  /* ═══════════════════════════════════════════
     6. STAT COUNTER ANIMATION
     ═══════════════════════════════════════════ */

  function initStatCounters() {
    var statElements = document.querySelectorAll('[data-count]');
    if (!statElements.length) return;

    function formatNumber(num) {
      return num.toLocaleString('en-IN');
    }

    function animateCounter(el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var duration = target > 100 ? 2000 : 1500;
      var suffix = el.querySelector('.stat-card__suffix');
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        // Ease out cubic
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(eased * target);

        // Update text node (preserve suffix span)
        if (suffix) {
          el.firstChild.textContent = formatNumber(current);
        } else {
          el.textContent = formatNumber(current);
        }

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }

      requestAnimationFrame(step);
    }

    if (prefersReducedMotion) {
      statElements.forEach(function (el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.querySelector('.stat-card__suffix');
        if (suffix) {
          el.firstChild.textContent = formatNumber(target);
        } else {
          el.textContent = formatNumber(target);
        }
      });
      return;
    }

    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statElements.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  initStatCounters();

  /* ═══════════════════════════════════════════
     7. MORPHING TEXT (Glitch-Resolve)
     ═══════════════════════════════════════════ */

  var glitchChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

  function initMorphText() {
    var elements = document.querySelectorAll('.morph-text');
    if (!elements.length || prefersReducedMotion) return;

    elements.forEach(function (el) {
      var words = JSON.parse(el.getAttribute('data-words'));
      if (!words || words.length < 2) return;

      var index = 0;
      var isAnimating = false;
      el.textContent = words[0];

      function glitchResolve() {
        if (isAnimating) return;
        isAnimating = true;

        var nextIndex = (index + 1) % words.length;
        var nextWord = words[nextIndex];
        var targetLen = nextWord.length;

        // Phase 1: Glitch (240ms) — subtle chromatic aberration + character scramble
        el.classList.add('morph-text--glitch');

        var scrambleCount = 0;
        var maxScrambles = 8;
        var scrambleInterval = setInterval(function () {
          var scrambled = '';
          for (var i = 0; i < targetLen; i++) {
            scrambled += glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }
          el.textContent = scrambled;
          scrambleCount++;

          if (scrambleCount >= maxScrambles) {
            clearInterval(scrambleInterval);

            // Phase 2: Resolve — characters settle left-to-right
            el.classList.remove('morph-text--glitch');
            el.classList.add('morph-text--resolve');

            var resolveStart = Date.now();
            var resolveDuration = 280;

            function resolveStep() {
              var elapsed = Date.now() - resolveStart;
              var progress = Math.min(elapsed / resolveDuration, 1);
              var resolvedCount = Math.ceil(progress * targetLen);

              var text = nextWord.substring(0, resolvedCount);
              for (var r = resolvedCount; r < targetLen; r++) {
                text += glitchChars[Math.floor(Math.random() * glitchChars.length)];
              }
              el.textContent = text;

              if (progress < 1) {
                requestAnimationFrame(resolveStep);
              } else {
                el.textContent = nextWord;
                el.classList.remove('morph-text--resolve');
                index = nextIndex;
                isAnimating = false;
              }
            }

            requestAnimationFrame(resolveStep);
          }
        }, 30);
      }

      setInterval(glitchResolve, 3000);
    });
  }

  initMorphText();

  /* ═══════════════════════════════════════════
     7b. FILM GRAIN TEXTURE
     ═══════════════════════════════════════════ */

  function initFilmGrain() {
    var grain = document.querySelector('.hero__grain');
    if (!grain) return;

    var size = 128;
    var c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    var gCtx = c.getContext('2d');
    var imageData = gCtx.createImageData(size, size);
    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
      var val = Math.random() * 255;
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
      data[i + 3] = 255;
    }

    gCtx.putImageData(imageData, 0, 0);
    grain.style.backgroundImage = 'url(' + c.toDataURL() + ')';
    grain.style.backgroundSize = size + 'px ' + size + 'px';
  }

  initFilmGrain();

  /* ═══════════════════════════════════════════
     8. FILTER BAR WITH TRANSITIONS
     ═══════════════════════════════════════════ */

  function initFilterBar() {
    document.querySelectorAll('.filter-bar').forEach(function (bar) {
      // Look for filterable content in same section first, then across sibling sections
      var parentSection = bar.closest('section');
      var grid = parentSection.querySelector('.grid, .filter-target');

      // If not in same section, collect all .filter-target sections in main content
      var multiSection = false;
      var filterSections = [];
      if (!grid) {
        var main = document.querySelector('.page__content') || document.body;
        filterSections = Array.prototype.slice.call(main.querySelectorAll('.filter-target'));
        if (!filterSections.length) return;
        multiSection = true;
      }

      bar.querySelectorAll('.filter-bar__btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          // Update active state
          bar.querySelectorAll('.filter-bar__btn').forEach(function (b) {
            b.classList.remove('filter-bar__btn--active');
            b.setAttribute('aria-pressed', 'false');
          });
          btn.classList.add('filter-bar__btn--active');
          btn.setAttribute('aria-pressed', 'true');

          var filter = btn.getAttribute('data-filter');

          if (multiSection) {
            // Show/hide entire sections based on data-pillar match
            filterSections.forEach(function (section) {
              var sectionPillar = section.querySelector('[data-pillar]');
              var pillarValue = sectionPillar ? sectionPillar.getAttribute('data-pillar') : '';
              var matches = filter === 'all' || pillarValue === filter;

              if (matches) {
                section.style.display = '';
                section.classList.remove('card--hidden');
              } else {
                section.style.display = 'none';
              }
            });
          } else {
            var cards = grid.querySelectorAll('[data-pillar]');
            var delay = 0;

            cards.forEach(function (card) {
              var matches = filter === 'all' || card.getAttribute('data-pillar') === filter;

              if (matches) {
                card.classList.add('card--filtering');
                card.style.display = '';
                card.style.transitionDelay = delay + 'ms';
                delay += 50;

                requestAnimationFrame(function () {
                  card.classList.remove('card--hidden');
                });
              } else {
                card.classList.add('card--filtering', 'card--hidden');
                setTimeout(function () {
                  if (card.classList.contains('card--hidden')) {
                    card.style.display = 'none';
                  }
                }, 300);
              }
            });

            // Clean up transition delays
            setTimeout(function () {
              cards.forEach(function (card) {
                card.style.transitionDelay = '';
                card.classList.remove('card--filtering');
              });
            }, 500);
          }
        });
      });

      // Set initial aria-pressed
      bar.querySelectorAll('.filter-bar__btn').forEach(function (btn) {
        btn.setAttribute('aria-pressed',
          btn.classList.contains('filter-bar__btn--active') ? 'true' : 'false'
        );
      });
    });
  }

  initFilterBar();

  /* ═══════════════════════════════════════════
     9. ACTIVE NAV LINK
     ═══════════════════════════════════════════ */

  function setActiveNavLink() {
    var currentPath = window.location.pathname;
    document.querySelectorAll('.nav__link, .nav-mobile__link').forEach(function (link) {
      var href = link.getAttribute('href');
      // Resolve relative href to absolute for comparison
      var linkUrl = new URL(href, window.location.href).pathname;
      var isHome = href === 'index.html' || href === '/' || href === '../index.html';
      var isCurrentHome = currentPath.endsWith('/') || currentPath.endsWith('/index.html');
      if (linkUrl === currentPath ||
          (isCurrentHome && isHome) ||
          (!isHome && currentPath.indexOf(linkUrl) !== -1)) {
        link.classList.add(
          link.classList.contains('nav__link') ? 'nav__link--active' : 'nav-mobile__link--active'
        );
      }
    });
  }

  setActiveNavLink();

  /* ═══════════════════════════════════════════
     10. 3D TILT ON PILLAR CARDS
     ═══════════════════════════════════════════ */

  function initCardTilt() {
    // Desktop only — no tilt on touch devices
    if (prefersReducedMotion || 'ontouchstart' in window) return;

    var cards = document.querySelectorAll('.pillar-card');
    if (!cards.length) return;

    // Pillar hex → RGB map for glow effect
    var pillarRGB = {
      ai:         '37, 99, 235',
      bharatsim:  '5, 150, 105',
      chart:      '217, 119, 6',
      cyber:      '124, 58, 237',
      makerspace: '220, 38, 38'
    };

    // Add perspective to grid container
    var grid = document.querySelector('.pillar-grid');
    if (grid) grid.style.perspective = '800px';

    cards.forEach(function (card) {
      card.style.transformStyle = 'preserve-3d';
      card.style.willChange = 'transform';

      // Set pillar glow color
      var pillar = card.getAttribute('data-pillar') || card.closest('[data-pillar]')?.getAttribute('data-pillar');
      if (pillar && pillarRGB[pillar]) {
        card.style.setProperty('--glow-rgb', pillarRGB[pillar]);
      }

      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;

        // Max 4deg tilt
        var rotateY = ((x - centerX) / centerX) * 4;
        var rotateX = ((centerY - y) / centerY) * 4;

        card.style.transform = 'translateY(-4px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';

        // Update glow position to follow cursor
        card.style.setProperty('--mouse-x', ((x / rect.width) * 100) + '%');
        card.style.setProperty('--mouse-y', ((y / rect.height) * 100) + '%');
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
        card.style.transition = 'transform 0.4s ease, box-shadow 0.3s ease';
        // Reset transition after settle
        setTimeout(function () {
          card.style.transition = '';
        }, 400);
      });
    });
  }

  initCardTilt();

  /* ═══════════════════════════════════════════
     11. SMOOTH SCROLL
     ═══════════════════════════════════════════ */

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerOffset = 72 + 3 + 24; // header + progress bar + padding
        var elementPosition = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - headerOffset,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  });

})();
