/* ============================================
   SEARCH — Mphasis AI & Applied Tech Lab
   Client-side search across projects, people,
   publications, and pillars.
   ============================================ */

(function () {
  'use strict';

  /* ── Configuration ── */
  var DEBOUNCE_MS = 200;
  var MAX_RESULTS_PER_GROUP = 5;

  /* ── DOM References ── */
  var overlay = document.getElementById('search-overlay');
  var input = document.getElementById('search-input');
  var resultsContainer = document.getElementById('search-results');
  var trigger = document.querySelector('.header__search-trigger');
  if (!overlay || !input || !resultsContainer) return;

  /* ── State ── */
  var isOpen = false;
  var focusedIndex = -1;
  var currentResults = [];
  var debounceTimer = null;
  var previousActiveElement = null;

  /* ── Pillar display names ── */
  var PILLAR_NAMES = {
    ai: 'AI@Ashoka',
    bharatsim: 'BharatSim',
    chart: 'CHART',
    cyber: 'Cybersecurity',
    makerspace: 'Makerspace'
  };

  /* ── Type icons (SVG strings) ── */
  var TYPE_ICONS = {
    project: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="12" height="12" rx="2"/><path d="M6 6h4M6 8h4M6 10h2"/></svg>',
    pillar: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14V5M8 14V2M12 14V8"/></svg>',
    person: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="5" r="3"/><path d="M2 15c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>',
    publication: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 2h4a2 2 0 012 2v10a1.5 1.5 0 00-1.5-1.5H2V2zM14 2h-4a2 2 0 00-2 2v10a1.5 1.5 0 011.5-1.5H14V2z"/></svg>'
  };

  /* ── Search Index (built lazily) ── */
  var searchIndex = null;

  function buildIndex() {
    if (searchIndex) return;
    searchIndex = [];

    // Determine path prefix based on current page location
    var path = window.location.pathname;
    var isInPages = path.indexOf('/pages/') !== -1;
    var pagesPrefix = isInPages ? '' : 'pages/';

    // Index projects
    if (window.PROJECTS_DATA) {
      var projects = window.PROJECTS_DATA;
      for (var pid in projects) {
        if (!projects.hasOwnProperty(pid)) continue;
        var p = projects[pid];
        var piNames = (p.pis || []).map(function (pi) { return pi.name; });
        searchIndex.push({
          type: 'project',
          title: p.title,
          subtitle: piNames.join(', ') + (p.pillar ? ' \u00B7 ' + (PILLAR_NAMES[p.pillar] || p.pillar) : ''),
          url: pagesPrefix + 'project.html?id=' + pid,
          searchText: [
            p.title || '',
            p.subtitle || '',
            piNames.join(' '),
            p.description || '',
            (p.themes || []).join(' ')
          ].join(' ').toLowerCase()
        });
      }
    }

    // Index people
    if (window.PEOPLE_DATA) {
      var people = window.PEOPLE_DATA;
      for (var slug in people) {
        if (!people.hasOwnProperty(slug)) continue;
        var person = people[slug];
        searchIndex.push({
          type: 'person',
          title: person.name,
          subtitle: person.role || person.department || '',
          url: pagesPrefix + 'people.html',
          searchText: [
            person.name || '',
            person.role || '',
            person.department || '',
            person.category || ''
          ].join(' ').toLowerCase()
        });
      }
    }

    // Index publications
    if (window.PUBLICATIONS_DATA) {
      window.PUBLICATIONS_DATA.forEach(function (pub) {
        var authorStr = (pub.authors || []).slice(0, 3).join(', ');
        if (pub.authors && pub.authors.length > 3) authorStr += ' et al.';
        var link = pub.url || (pub.doi ? 'https://doi.org/' + pub.doi : pagesPrefix + 'publications.html');

        searchIndex.push({
          type: 'publication',
          title: pub.title,
          subtitle: authorStr + ' \u00B7 ' + (pub.venue || '') + (pub.year ? ' (' + pub.year + ')' : ''),
          url: link,
          searchText: [
            pub.title || '',
            (pub.authors || []).join(' '),
            pub.venue || '',
            pub.year ? String(pub.year) : ''
          ].join(' ').toLowerCase()
        });
      });
    }

    // Index pillars
    if (window.PILLARS_DATA) {
      var pillars = window.PILLARS_DATA;
      for (var pKey in pillars) {
        if (!pillars.hasOwnProperty(pKey)) continue;
        var pillar = pillars[pKey];
        searchIndex.push({
          type: 'pillar',
          title: pillar.name,
          subtitle: pillar.tagline || '',
          url: pagesPrefix + 'pillar.html?pillar=' + pKey,
          searchText: [
            pillar.name || '',
            pillar.tagline || '',
            pillar.description || '',
            (pillar.themes || []).join(' ')
          ].join(' ').toLowerCase()
        });
      }
    }
  }

  /* ── Search Function ── */
  function search(query) {
    if (!searchIndex) buildIndex();
    if (!query || query.length < 2) return [];

    var terms = query.toLowerCase().trim().split(/\s+/);
    var scored = [];

    for (var i = 0; i < searchIndex.length; i++) {
      var entry = searchIndex[i];
      var matched = true;
      var score = 0;

      for (var t = 0; t < terms.length; t++) {
        if (entry.searchText.indexOf(terms[t]) === -1) {
          matched = false;
          break;
        }
        // Title match scores higher
        if (entry.title.toLowerCase().indexOf(terms[t]) !== -1) {
          score += 10;
        } else {
          score += 1;
        }
      }

      if (matched) {
        scored.push({ entry: entry, score: score });
      }
    }

    scored.sort(function (a, b) { return b.score - a.score; });
    return scored.map(function (s) { return s.entry; });
  }

  /* ── HTML Helpers ── */
  function escapeHTML(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function highlightMatch(text, query) {
    if (!query) return escapeHTML(text);
    var safe = escapeHTML(text);
    var terms = query.trim().split(/\s+/);
    for (var i = 0; i < terms.length; i++) {
      if (terms[i].length < 2) continue;
      var escaped = terms[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      var regex = new RegExp('(' + escaped + ')', 'gi');
      safe = safe.replace(regex, '<mark>$1</mark>');
    }
    return safe;
  }

  /* ── Render Results ── */
  function renderResults(results, query) {
    if (!query || query.length < 2) {
      resultsContainer.innerHTML =
        '<div class="search-overlay__empty">' +
        '<p class="search-overlay__empty-text">Type to search across projects, people, and publications</p>' +
        '</div>';
      currentResults = [];
      focusedIndex = -1;
      return;
    }

    if (results.length === 0) {
      resultsContainer.innerHTML =
        '<div class="search-overlay__no-results">' +
        '<p class="search-overlay__no-results-text">No results for \u201C' + escapeHTML(query) + '\u201D</p>' +
        '</div>';
      currentResults = [];
      focusedIndex = -1;
      return;
    }

    // Group by type
    var groups = { project: [], pillar: [], person: [], publication: [] };
    for (var i = 0; i < results.length; i++) {
      var r = results[i];
      if (groups[r.type] && groups[r.type].length < MAX_RESULTS_PER_GROUP) {
        groups[r.type].push(r);
      }
    }

    var typeLabels = {
      project: 'Projects',
      pillar: 'Research Pillars',
      person: 'People',
      publication: 'Publications'
    };

    var typeOrder = ['project', 'pillar', 'person', 'publication'];
    var html = '';
    var allItems = [];

    for (var t = 0; t < typeOrder.length; t++) {
      var type = typeOrder[t];
      if (groups[type].length === 0) continue;

      html += '<div class="search-overlay__group">';
      html += '<div class="search-overlay__group-label">' + typeLabels[type] + '</div>';

      for (var j = 0; j < groups[type].length; j++) {
        var item = groups[type][j];
        var idx = allItems.length;
        allItems.push(item);

        var isExternal = item.url.indexOf('http') === 0;
        var target = isExternal ? ' target="_blank" rel="noopener"' : '';

        html += '<a href="' + escapeHTML(item.url) + '"' + target +
                ' class="search-overlay__item" data-index="' + idx + '">';
        html += '<div class="search-overlay__item-icon">' + (TYPE_ICONS[type] || '') + '</div>';
        html += '<div class="search-overlay__item-info">';
        html += '<div class="search-overlay__item-title">' + highlightMatch(item.title, query) + '</div>';
        if (item.subtitle) {
          html += '<div class="search-overlay__item-meta">' + escapeHTML(item.subtitle) + '</div>';
        }
        html += '</div>';
        html += '</a>';
      }

      html += '</div>';
    }

    resultsContainer.innerHTML = html;
    currentResults = allItems;
    focusedIndex = -1;
  }

  /* ── Open / Close ── */
  function openSearch() {
    if (isOpen) return;
    buildIndex();
    previousActiveElement = document.activeElement;
    isOpen = true;
    overlay.hidden = false;
    document.body.classList.add('no-scroll');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');

    requestAnimationFrame(function () {
      input.focus();
      input.select();
    });
  }

  function closeSearch() {
    if (!isOpen) return;
    isOpen = false;
    overlay.hidden = true;
    document.body.classList.remove('no-scroll');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    input.value = '';
    renderResults([], '');

    if (previousActiveElement) {
      previousActiveElement.focus();
      previousActiveElement = null;
    }
  }

  /* ── Perform Search (debounced) ── */
  function performSearch() {
    var query = input.value.trim();
    var results = search(query);
    renderResults(results, query);
  }

  /* ── Keyboard Navigation ── */
  function updateFocus(newIndex) {
    var items = resultsContainer.querySelectorAll('.search-overlay__item');
    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove('search-overlay__item--focused');
    }

    if (newIndex >= 0 && newIndex < items.length) {
      focusedIndex = newIndex;
      items[focusedIndex].classList.add('search-overlay__item--focused');
      items[focusedIndex].scrollIntoView({ block: 'nearest' });
    } else {
      focusedIndex = -1;
    }
  }

  /* ── Event Listeners ── */

  // Trigger button
  if (trigger) {
    trigger.addEventListener('click', openSearch);
  }

  // Keyboard shortcut: Cmd/Ctrl + K
  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (isOpen) {
        closeSearch();
      } else {
        openSearch();
      }
    }

    if (!isOpen) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeSearch();
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      var max = currentResults.length - 1;
      updateFocus(focusedIndex < max ? focusedIndex + 1 : 0);
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      updateFocus(focusedIndex > 0 ? focusedIndex - 1 : currentResults.length - 1);
    }

    if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      var items = resultsContainer.querySelectorAll('.search-overlay__item');
      if (items[focusedIndex]) {
        items[focusedIndex].click();
      }
    }
  });

  // Backdrop click
  overlay.querySelector('.search-overlay__backdrop').addEventListener('click', closeSearch);

  // Input
  input.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(performSearch, DEBOUNCE_MS);
  });

  // Focus trap: Tab stays within overlay
  overlay.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var focusable = overlay.querySelectorAll('input, a[href], button, [tabindex]:not([tabindex="-1"])');
    if (focusable.length === 0) return;

    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Open on page load if ?q= is present
  var params = new URLSearchParams(window.location.search);
  var initialQuery = params.get('q');
  if (initialQuery) {
    openSearch();
    input.value = initialQuery;
    setTimeout(performSearch, 100);
  }

})();
