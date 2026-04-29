/**
 * Floating Navigation + Side Panel
 * Shared across all pages
 */
(function() {
  'use strict';

  // ═══ AUTO-DETECT ACTIVE PAGE ═══
  var path = window.location.pathname;
  var page = path.split('/').pop().replace('.html', '') || 'index';
  // Map filenames to nav link text
  var pageMap = {
    'index': 'Home',
    'about': 'About',
    'research': 'Research',
    'people': 'People',
    'publications': 'Publications',
    'makerspace': 'Makerspace',
    'news': 'News & Events',
    'impact': 'Impact',
    'contact': 'Contact'
  };
  var activeName = pageMap[page] || '';

  // Set active class on matching side nav link
  var sideNavLinks = document.querySelectorAll('.side-nav__link');
  sideNavLinks.forEach(function(link) {
    if (link.textContent.trim() === activeName) {
      link.classList.add('side-nav__link--active');
    }
  });

  // ═══ CONTEXT-AWARE FLOATING BUTTONS ═══
  var floatMenuBtn = document.getElementById('floatMenuBtn');
  var floatSearchBtn = document.getElementById('floatSearchBtn');

  if (floatMenuBtn && floatSearchBtn) {
    // Check luminance of background color behind a point
    function isDarkAt(x, y) {
      // Temporarily hide floating buttons so elementFromPoint hits the page content
      floatMenuBtn.style.pointerEvents = 'none';
      floatSearchBtn.style.pointerEvents = 'none';
      // Also hide the side-nav so it doesn't interfere
      var sn = document.getElementById('side-nav');
      if (sn) sn.style.pointerEvents = 'none';

      var el = document.elementFromPoint(x, y);

      floatMenuBtn.style.pointerEvents = '';
      floatSearchBtn.style.pointerEvents = '';
      if (sn) sn.style.pointerEvents = '';

      if (!el) return false;

      // Walk up until we find an element with a non-transparent background
      var node = el;
      while (node && node !== document.documentElement) {
        var bg = getComputedStyle(node).backgroundColor;
        if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
          // Parse rgb/rgba
          var m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (m) {
            // Relative luminance formula
            var r = parseInt(m[1]) / 255;
            var g = parseInt(m[2]) / 255;
            var b = parseInt(m[3]) / 255;
            var lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            return lum < 0.4;
          }
        }
        // Also check data-theme attribute as a fast path
        if (node.getAttribute && node.getAttribute('data-theme') === 'dark') return true;
        node = node.parentElement;
      }
      return false;
    }

    function updateFloatingButtons() {
      // Sample at the menu button position (top-left) and search button position (top-right)
      var onDark = isDarkAt(60, 40) || isDarkAt(window.innerWidth - 60, 40);

      if (onDark) {
        floatMenuBtn.classList.add('on-dark');
        floatSearchBtn.classList.add('on-dark');
      } else {
        floatMenuBtn.classList.remove('on-dark');
        floatSearchBtn.classList.remove('on-dark');
      }
    }

    window.addEventListener('scroll', updateFloatingButtons, { passive: true });
    // Run after a short delay to ensure styles are computed
    setTimeout(updateFloatingButtons, 100);
    updateFloatingButtons();
  }

  // ═══ SIDE NAVIGATION ═══
  var sideNav = document.getElementById('side-nav');
  var sideNavClose = document.getElementById('side-nav-close');
  var sideNavBackdrop = document.getElementById('side-nav-backdrop');
  var navIsOpen = false;

  function openSideNav() {
    if (!sideNav || navIsOpen) return;
    navIsOpen = true;
    sideNav.classList.remove('side-nav--peek');
    sideNav.classList.add('side-nav--open');
    document.body.style.overflow = 'hidden';
  }

  function closeSideNav() {
    if (!sideNav || !navIsOpen) return;
    navIsOpen = false;
    sideNav.classList.remove('side-nav--open');
    document.body.style.overflow = '';
  }

  // Floating menu button
  if (floatMenuBtn) {
    floatMenuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      openSideNav();
    });

    // Hover peek
    floatMenuBtn.addEventListener('mouseenter', function() {
      if (!navIsOpen) sideNav.classList.add('side-nav--peek');
    });
    floatMenuBtn.addEventListener('mouseleave', function() {
      if (!navIsOpen) sideNav.classList.remove('side-nav--peek');
    });
  }

  // Floating search button triggers search overlay
  var searchOverlay = document.getElementById('search-overlay');
  var searchInput = searchOverlay ? searchOverlay.querySelector('#search-input') : null;
  var searchBackdrop = searchOverlay ? searchOverlay.querySelector('.search-overlay__backdrop') : null;

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.hidden = false;
    if (searchInput) setTimeout(function() { searchInput.focus(); }, 100);
  }

  if (floatSearchBtn) {
    floatSearchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openSearch();
    });
  }

  // Close search on backdrop click (backup — search.js also handles this)
  if (searchBackdrop) {
    searchBackdrop.addEventListener('click', function() {
      if (searchOverlay) {
        searchOverlay.hidden = true;
        if (searchInput) searchInput.value = '';
      }
    });
  }

  // Close side nav
  if (sideNavClose) sideNavClose.addEventListener('click', closeSideNav);
  if (sideNavBackdrop) sideNavBackdrop.addEventListener('click', closeSideNav);

  // Close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navIsOpen) {
      closeSideNav();
    }
  });

  // Handle internal links (close on click)
  if (sideNav) {
    sideNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeSideNav);
    });
  }
})();
