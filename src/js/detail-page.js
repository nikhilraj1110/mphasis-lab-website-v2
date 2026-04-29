/* ============================================
   DETAIL PAGE — Template Renderer
   Handles project.html, pillar.html, publications.html
   ============================================ */

(function () {
  'use strict';

  /* ── Utilities ── */

  function getParam(key) {
    return new URLSearchParams(window.location.search).get(key);
  }

  function escapeHTML(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /* ── Focus Management ── */

  function focusPageHeading(container) {
    var heading = container.querySelector('h1');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  }

  /* ── SVG Icons ── */

  var ICONS = {
    arrow: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3l5 5-5 5"/></svg>',
    arrowLeft: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3l-5 5 5 5"/></svg>',
    external: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3L3 9M9 3H5M9 3v4"/></svg>',
    check: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9l3 3 7-7"/></svg>',
    star: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2l2.2 4.5 5 .7-3.6 3.5.9 5L9 13.5 4.5 15.7l.9-5L1.8 7.2l5-.7L9 2z"/></svg>',
    user: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="6" r="3"/><path d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>',
    book: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h5a3 3 0 013 3v10a2 2 0 00-2-2H2V3zM16 3h-5a3 3 0 00-3 3v10a2 2 0 012-2h6V3z"/></svg>',
    globe: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="7"/><path d="M2 9h14M9 2a11 11 0 013 7 11 11 0 01-3 7 11 11 0 01-3-7 11 11 0 013-7z"/></svg>'
  };

  /* ── Pillar SVG Icons (matching research.html) ── */

  var PILLAR_ICONS = {
    ai: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/><path d="M5.6 5.6l2.9 2.9M15.5 15.5l2.9 2.9M18.4 5.6l-2.9 2.9M8.5 15.5l-2.9 2.9"/></svg>',
    bharatsim: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/><path d="M2 7c2-3 4-3 6 0s4 3 6 0 4-3 6 0" opacity="0.4"/><path d="M2 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0" opacity="0.4"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l3-6 4 12 3-6h4"/></svg>',
    cyber: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 4v5c0 5.5-3.8 10.2-8 12-4.2-1.8-8-6.5-8-12V7l8-4z"/><path d="M9 12l2 2 4-4"/></svg>',
    makerspace: '<img src="../src/assets/images/logos/makerspace-logo.png" alt="Makerspace logo" style="width:36px;height:36px;object-fit:contain;">'
  };

  /* ── Pillar Display Names ── */

  var PILLAR_NAMES = {
    ai: 'AI@Ashoka',
    bharatsim: 'BharatSim',
    chart: 'CHART',
    cyber: 'Cybersecurity',
    makerspace: 'Makerspace'
  };

  /* ── Tag class mapping ── */

  var PILLAR_TAG_CLASS = {
    ai: 'tag--ai',
    bharatsim: 'tag--bharatsim',
    chart: 'tag--chart',
    cyber: 'tag--cyber',
    makerspace: 'tag--makerspace'
  };

  /* ── Publication type labels ── */

  var PUB_TYPE_LABELS = {
    journal: 'Journal',
    conference: 'Conference',
    preprint: 'Preprint',
    workshop: 'Workshop Presentation',
    report: 'Report',
    government: 'Government',
    'book-chapter': 'Book Chapter',
    thesis: 'Thesis'
  };

  /* ═══════════════════════════════════════════
     BREADCRUMB
     ═══════════════════════════════════════════ */

  function renderBreadcrumb(items) {
    var container = document.getElementById('breadcrumb');
    if (!container) return;

    var html = '';
    items.forEach(function (item, index) {
      if (index > 0) {
        html += '<span class="breadcrumb__separator">/</span>';
      }
      if (item.href) {
        html += '<a href="' + escapeHTML(item.href) + '" class="breadcrumb__link">' + escapeHTML(item.label) + '</a>';
      } else {
        html += '<span class="breadcrumb__current">' + escapeHTML(item.label) + '</span>';
      }
    });

    container.innerHTML = html;
  }

  /* ═══════════════════════════════════════════
     PROJECT PAGE
     ═══════════════════════════════════════════ */

  function renderProjectPage() {
    var id = getParam('id');
    if (!id || !window.PROJECTS_DATA || !window.PROJECTS_DATA[id]) {
      show404('Project');
      return;
    }

    var project = window.PROJECTS_DATA[id];
    var content = document.getElementById('page-content');

    // Page title & meta
    document.title = escapeHTML(project.title) + ' | Mphasis AI & Applied Tech Lab';
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && project.description) {
      metaDesc.content = project.description.substring(0, 160);
    }

    // Breadcrumb
    renderBreadcrumb([
      { label: 'Research', href: 'research.html' },
      { label: PILLAR_NAMES[project.pillar] || project.pillar, href: 'pillar.html?pillar=' + project.pillar },
      { label: project.title }
    ]);

    var html = '';

    // ── Project Hero ──
    html += '<section class="project-hero" data-pillar="' + escapeHTML(project.pillar) + '">';
    html += '<div class="container">';
    html += '<span class="tag ' + (PILLAR_TAG_CLASS[project.pillar] || '') + ' tag--dot project-hero__pillar-tag">' + escapeHTML(PILLAR_NAMES[project.pillar] || project.pillar) + '</span>';
    html += '<h1 class="project-hero__title">' + escapeHTML(project.title) + '</h1>';
    if (project.subtitle) {
      html += '<p class="project-hero__subtitle">' + escapeHTML(project.subtitle) + '</p>';
    }

    // Faculty
    if (project.pis && project.pis.length > 0) {
      html += '<div class="project-hero__faculty">';
      project.pis.forEach(function (pi) {
        html += '<div class="project-hero__faculty-item">';

        // Avatar
        var photo = '';
        if (pi.slug && window.PEOPLE_DATA && window.PEOPLE_DATA[pi.slug] && window.PEOPLE_DATA[pi.slug].hasPhoto) {
          photo = window.PEOPLE_DATA[pi.slug].photo;
        }
        if (photo) {
          html += '<img src="' + escapeHTML(photo) + '" alt="" class="project-hero__faculty-avatar" loading="lazy">';
        } else {
          html += '<div class="project-hero__faculty-avatar" style="display:flex;align-items:center;justify-content:center;color:var(--color-text-muted);">' + ICONS.user + '</div>';
        }

        html += '<div class="project-hero__faculty-info">';
        html += '<div class="project-hero__faculty-name">' + escapeHTML(pi.name) + '</div>';
        if (pi.role) {
          html += '<div class="project-hero__faculty-role">' + escapeHTML(pi.role) + '</div>';
        }
        html += '</div></div>';
      });
      html += '</div>';
    }

    html += '</div></section>';

    // ── Description ──
    if (project.description) {
      html += '<section class="section">';
      html += '<div class="container container--narrow">';
      html += '<div class="prose reveal">';
      // description can have multiple paragraphs separated by \n\n
      var paragraphs = project.description.split('\n\n');
      paragraphs.forEach(function (p) {
        if (p.trim()) {
          html += '<p>' + escapeHTML(p.trim()) + '</p>';
        }
      });
      html += '</div></div></section>';
    }

    // ── Key Outcomes ──
    if (project.highlights && project.highlights.length > 0) {
      html += '<section class="section section--alt" data-pillar="' + escapeHTML(project.pillar) + '">';
      html += '<div class="container">';
      html += '<div class="section__header reveal"><h2 class="section__title">Key Outcomes</h2></div>';
      html += '<div class="grid grid--2 reveal-stagger" style="gap: var(--space-4);">';
      project.highlights.forEach(function (h) {
        html += '<div class="highlight-card reveal">';
        html += '<div class="highlight-card__icon">' + ICONS.check + '</div>';
        html += '<div class="highlight-card__text">' + escapeHTML(h) + '</div>';
        html += '</div>';
      });
      html += '</div></div></section>';
    }

    // ── Publications ──
    if (project.publications && project.publications.length > 0) {
      html += '<section class="section">';
      html += '<div class="container container--narrow">';
      html += '<div class="section__header reveal"><h2 class="section__title">Publications</h2></div>';
      html += '<div class="publication-list reveal">';
      project.publications.forEach(function (pub) {
        html += renderPublicationEntry(pub, project.pillar);
      });
      html += '</div></div></section>';
    }

    // ── Team ──
    if (project.team && project.team.length > 0) {
      html += '<section class="section section--alt">';
      html += '<div class="container">';
      html += '<div class="section__header reveal"><h2 class="section__title">Team</h2></div>';
      html += '<div class="people-grid reveal-stagger">';
      project.team.forEach(function (member) {
        html += renderTeamMember(member);
      });
      html += '</div></div></section>';
    }

    // ── Collaborations ──
    if (project.collaborations && project.collaborations.length > 0) {
      html += '<section class="section">';
      html += '<div class="container">';
      html += '<div class="section__header reveal"><h2 class="section__title">Collaborations</h2></div>';
      html += '<div class="grid grid--auto-md reveal-stagger" style="gap: var(--space-4);">';
      project.collaborations.forEach(function (collab) {
        html += '<div class="collab-card reveal">';
        html += '<div class="collab-card__name">' + escapeHTML(collab.name) + '</div>';
        if (collab.country) {
          html += '<div class="collab-card__country">' + escapeHTML(collab.country) + '</div>';
        }
        html += '</div>';
      });
      html += '</div></div></section>';
    }

    // ── Research Themes ──
    if (project.themes && project.themes.length > 0) {
      html += '<section class="section section--alt">';
      html += '<div class="container">';
      html += '<div class="section__header reveal"><h2 class="section__title">Research Themes</h2></div>';
      html += '<div class="theme-tags reveal">';
      project.themes.forEach(function (theme) {
        var encoded = encodeURIComponent(theme);
        html += '<a href="research.html?theme=' + encoded + '" class="theme-tag theme-tag--interactive">' + escapeHTML(theme) + '</a>';
      });
      html += '</div></div></section>';
    }

    // ── Related Projects ──
    if (project.relatedProjects && project.relatedProjects.length > 0 && window.PROJECTS_DATA) {
      var relatedHtml = '';
      var validCount = 0;
      project.relatedProjects.forEach(function (slug) {
        if (window.PROJECTS_DATA[slug]) {
          validCount++;
          var rp = window.PROJECTS_DATA[slug];
          relatedHtml += '<a href="project.html?id=' + escapeHTML(slug) + '" class="related-project-card reveal">';
          relatedHtml += '<article class="project-list-card" data-pillar="' + escapeHTML(rp.pillar) + '">';
          relatedHtml += '<div class="project-list-card__body">';
          relatedHtml += '<h3 class="project-list-card__title">' + escapeHTML(rp.title) + '</h3>';
          if (rp.pis && rp.pis.length > 0) {
            relatedHtml += '<p class="project-list-card__pi">' + escapeHTML(rp.pis.map(function (p) { return p.name; }).join(' & ')) + '</p>';
          }
          relatedHtml += '</div></article></a>';
        }
      });

      if (validCount > 0) {
        html += '<section class="section">';
        html += '<div class="container">';
        html += '<div class="section__header reveal"><h2 class="section__title">Related Projects</h2></div>';
        html += '<div class="grid grid--2 reveal-stagger" style="gap: var(--space-5);">';
        html += relatedHtml;
        html += '</div></div></section>';
      }
    }

    // ── CTA ──
    html += '<section class="section section--alt">';
    html += '<div class="container text-center">';
    html += '<a href="research.html" class="btn btn--secondary">View All Research</a>';
    html += '</div></section>';

    content.innerHTML = html;

    // Re-init reveals and focus management
    if (window.initScrollReveals) window.initScrollReveals();
    focusPageHeading(content);
  }

  /* ═══════════════════════════════════════════
     PILLAR PAGE
     ═══════════════════════════════════════════ */

  function renderPillarPage() {
    var pillarId = getParam('pillar');
    if (!pillarId || !window.PILLARS_DATA || !window.PILLARS_DATA[pillarId]) {
      show404('Pillar');
      return;
    }

    var pillar = window.PILLARS_DATA[pillarId];
    var content = document.getElementById('page-content');

    // Page title & meta
    document.title = escapeHTML(pillar.name) + ' | Mphasis AI & Applied Tech Lab';
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && pillar.tagline) {
      metaDesc.content = pillar.tagline.substring(0, 160);
    }

    // Breadcrumb
    renderBreadcrumb([
      { label: 'Research', href: 'research.html' },
      { label: pillar.name }
    ]);

    var html = '';

    // ── Pillar Hero ──
    html += '<section class="pillar-hero" data-pillar="' + escapeHTML(pillarId) + '">';
    html += '<div class="container">';

    html += '<div class="pillar-hero__header">';
    html += '<div class="pillar-hero__icon">' + (PILLAR_ICONS[pillarId] || '') + '</div>';
    html += '<div>';
    html += '<h1 class="pillar-hero__title">' + escapeHTML(pillar.name) + '</h1>';
    if (pillar.tagline) {
      html += '<p class="pillar-hero__tagline">' + escapeHTML(pillar.tagline) + '</p>';
    }
    html += '</div></div>';

    // Stats
    if (pillar.keyMetrics && pillar.keyMetrics.length > 0) {
      html += '<div class="pillar-hero__stats">';
      pillar.keyMetrics.forEach(function (m) {
        html += '<div class="pillar-hero__stat">';
        html += '<div class="pillar-hero__stat-value">' + escapeHTML(String(m.value)) + '</div>';
        html += '<div class="pillar-hero__stat-label">' + escapeHTML(m.label) + '</div>';
        html += '</div>';
      });
      html += '</div>';
    }

    html += '</div></section>';

    // ── Description ──
    if (pillar.description) {
      html += '<section class="section">';
      html += '<div class="container container--narrow">';
      html += '<div class="prose reveal">';
      var paragraphs = pillar.description.split('\n\n');
      paragraphs.forEach(function (p) {
        if (p.trim()) {
          html += '<p>' + escapeHTML(p.trim()) + '</p>';
        }
      });
      html += '</div></div></section>';
    }

    // ── Projects in this Pillar ──
    if (pillar.projects && pillar.projects.length > 0 && window.PROJECTS_DATA) {
      html += '<section class="section section--alt" data-pillar="' + escapeHTML(pillarId) + '">';
      html += '<div class="container">';
      html += '<div class="section__header reveal"><h2 class="section__title">Projects</h2></div>';
      html += '<div class="grid grid--2 reveal-stagger" style="gap: var(--space-5);">';

      pillar.projects.forEach(function (slug) {
        var p = window.PROJECTS_DATA[slug];
        if (!p) return;
        html += '<a href="project.html?id=' + escapeHTML(slug) + '" class="related-project-card reveal">';
        html += '<article class="project-list-card" data-pillar="' + escapeHTML(pillarId) + '">';
        html += '<div class="project-list-card__body">';
        html += '<h3 class="project-list-card__title">' + escapeHTML(p.title) + '</h3>';
        if (p.pis && p.pis.length > 0) {
          html += '<p class="project-list-card__pi">' + escapeHTML(p.pis.map(function (pi) { return pi.name; }).join(' & ')) + '</p>';
        }
        if (p.description) {
          var shortDesc = p.description.split('\n\n')[0];
          if (shortDesc.length > 200) shortDesc = shortDesc.substring(0, 200) + '...';
          html += '<p class="project-list-card__desc">' + escapeHTML(shortDesc) + '</p>';
        }
        html += '</div></article></a>';
      });

      html += '</div></div></section>';
    }

    // ── Faculty ──
    if (pillar.projects && window.PROJECTS_DATA && window.PEOPLE_DATA) {
      var facultySlugs = {};
      pillar.projects.forEach(function (slug) {
        var p = window.PROJECTS_DATA[slug];
        if (!p || !p.pis) return;
        p.pis.forEach(function (pi) {
          if (pi.slug && window.PEOPLE_DATA[pi.slug]) {
            facultySlugs[pi.slug] = true;
          }
        });
      });

      var slugList = Object.keys(facultySlugs);
      if (slugList.length > 0) {
        html += '<section class="section">';
        html += '<div class="container">';
        html += '<div class="section__header reveal"><h2 class="section__title">Faculty</h2></div>';
        html += '<div class="people-grid reveal-stagger">';
        slugList.forEach(function (slug) {
          var person = window.PEOPLE_DATA[slug];
          html += renderPersonCard(person);
        });
        html += '</div></div></section>';
      }
    }

    // ── Themes ──
    if (pillar.themes && pillar.themes.length > 0) {
      html += '<section class="section section--alt">';
      html += '<div class="container">';
      html += '<div class="section__header reveal"><h2 class="section__title">Research Themes</h2></div>';
      html += '<div class="theme-tags reveal">';
      pillar.themes.forEach(function (theme) {
        var encoded = encodeURIComponent(theme);
        html += '<a href="research.html?theme=' + encoded + '" class="theme-tag theme-tag--interactive">' + escapeHTML(theme) + '</a>';
      });
      html += '</div></div></section>';
    }

    // ── CTA ──
    html += '<section class="section">';
    html += '<div class="container text-center">';
    html += '<a href="research.html" class="btn btn--secondary">View All Research</a>';
    html += '</div></section>';

    content.innerHTML = html;
    if (window.initScrollReveals) window.initScrollReveals();
    focusPageHeading(content);
  }

  /* ═══════════════════════════════════════════
     PUBLICATIONS PAGE
     ═══════════════════════════════════════════ */

  function renderPublicationsPage() {
    if (!window.PUBLICATIONS_DATA) return;

    var publications = window.PUBLICATIONS_DATA;
    var content = document.getElementById('publications-content');
    var filterBar = document.getElementById('publications-filter');

    // Group by year
    var byYear = {};
    var typeCounts = { all: publications.length };

    publications.forEach(function (pub) {
      var year = pub.year || 'Undated';
      if (!byYear[year]) byYear[year] = [];
      byYear[year].push(pub);

      var type = pub.type || 'other';
      if (!typeCounts[type]) typeCounts[type] = 0;
      typeCounts[type]++;
    });

    // Sort years descending
    var years = Object.keys(byYear).sort(function (a, b) { return b - a; });

    // ── Filter Bar ──
    if (filterBar) {
      var filterHtml = '<button class="filter-bar__btn filter-bar__btn--active" data-filter="all" aria-pressed="true">All (' + publications.length + ')</button>';

      var typeOrder = ['journal', 'conference', 'workshop', 'preprint', 'report', 'government', 'book-chapter', 'thesis'];
      typeOrder.forEach(function (type) {
        if (typeCounts[type]) {
          filterHtml += '<button class="filter-bar__btn" data-filter="' + type + '" aria-pressed="false">' + escapeHTML(PUB_TYPE_LABELS[type] || type) + ' (' + typeCounts[type] + ')</button>';
        }
      });

      filterBar.innerHTML = filterHtml;

      // Filter behavior
      filterBar.addEventListener('click', function (e) {
        var btn = e.target.closest('.filter-bar__btn');
        if (!btn) return;

        var filter = btn.getAttribute('data-filter');

        // Update active state
        filterBar.querySelectorAll('.filter-bar__btn').forEach(function (b) {
          b.classList.remove('filter-bar__btn--active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('filter-bar__btn--active');
        btn.setAttribute('aria-pressed', 'true');

        // Filter entries
        content.querySelectorAll('.publication-entry').forEach(function (entry) {
          var entryType = entry.getAttribute('data-type');
          var matches = filter === 'all' || entryType === filter;
          entry.classList.toggle('publication-entry--hidden', !matches);
        });

        // Hide empty year groups
        content.querySelectorAll('.pub-year-group').forEach(function (group) {
          var visibleEntries = group.querySelectorAll('.publication-entry:not(.publication-entry--hidden)');
          group.classList.toggle('pub-year-group--hidden', visibleEntries.length === 0);
        });
      });
    }

    // ── Render year groups ──
    var html = '';
    years.forEach(function (year) {
      var pubs = byYear[year];
      html += '<div class="pub-year-group reveal">';
      html += '<div class="pub-year-group__header">';
      html += '<h2 class="pub-year-group__heading">' + escapeHTML(String(year)) + '</h2>';
      html += '<span class="pub-year-group__count">' + pubs.length + (pubs.length === 1 ? ' publication' : ' publications') + '</span>';
      html += '</div>';

      pubs.forEach(function (pub) {
        html += renderPublicationEntry(pub, pub.pillar);
      });

      html += '</div>';
    });

    if (content) content.innerHTML = html;

    // Update page stats
    var statsContainer = document.getElementById('pub-stats');
    if (statsContainer) {
      var statsHtml = '';
      statsHtml += '<div class="pub-stat"><span class="pub-stat__value">' + publications.length + '</span><span class="pub-stat__label">Total</span></div>';

      if (typeCounts.journal) {
        statsHtml += '<div class="pub-stat"><span class="pub-stat__value">' + typeCounts.journal + '</span><span class="pub-stat__label">Journal Articles</span></div>';
      }
      if (typeCounts.conference) {
        statsHtml += '<div class="pub-stat"><span class="pub-stat__value">' + typeCounts.conference + '</span><span class="pub-stat__label">Conference Papers</span></div>';
      }
      if (typeCounts.workshop) {
        statsHtml += '<div class="pub-stat"><span class="pub-stat__value">' + typeCounts.workshop + '</span><span class="pub-stat__label">Workshop Presentations</span></div>';
      }
      if (typeCounts.preprint) {
        statsHtml += '<div class="pub-stat"><span class="pub-stat__value">' + typeCounts.preprint + '</span><span class="pub-stat__label">Preprints</span></div>';
      }

      statsContainer.innerHTML = statsHtml;
    }

    if (window.initScrollReveals) window.initScrollReveals();
  }

  /* ═══════════════════════════════════════════
     SHARED RENDERERS
     ═══════════════════════════════════════════ */

  function renderPublicationEntry(pub, pillarId) {
    var html = '<article class="publication-entry" data-type="' + escapeHTML(pub.type || 'other') + '" data-pillar="' + escapeHTML(pillarId || '') + '">';

    // Title
    html += '<div class="publication-entry__header">';
    html += '<span class="tag tag--sm ' + (pub.type ? '' : 'tag--default') + '" style="font-size:0.65rem;">' + escapeHTML(PUB_TYPE_LABELS[pub.type] || pub.type || 'Other') + '</span>';
    html += '<h3 class="publication-entry__title">';
    if (pub.url || pub.doi) {
      var link = pub.url || (pub.doi ? 'https://doi.org/' + pub.doi : '#');
      html += '<a href="' + escapeHTML(link) + '" target="_blank" rel="noopener">' + escapeHTML(pub.title) + '</a>';
    } else {
      html += escapeHTML(pub.title);
    }
    html += '</h3></div>';

    // Authors
    if (pub.authors && pub.authors.length > 0) {
      html += '<p class="publication-entry__authors">' + escapeHTML(pub.authors.join(', ')) + '</p>';
    }

    // Venue
    if (pub.venue) {
      html += '<p class="publication-entry__venue">' + escapeHTML(pub.venue) + (pub.year ? ' (' + pub.year + ')' : '') + '</p>';
    }

    // Meta
    html += '<div class="publication-entry__meta">';
    if (pillarId && PILLAR_NAMES[pillarId]) {
      html += '<span class="tag tag--sm ' + (PILLAR_TAG_CLASS[pillarId] || '') + ' tag--dot">' + escapeHTML(PILLAR_NAMES[pillarId]) + '</span>';
    }
    if (pub.doi) {
      html += '<a href="https://doi.org/' + escapeHTML(pub.doi) + '" target="_blank" rel="noopener" class="publication-entry__doi">' + ICONS.external + ' DOI</a>';
    }
    if (pub.url && !pub.doi) {
      html += '<a href="' + escapeHTML(pub.url) + '" target="_blank" rel="noopener" class="publication-entry__doi">' + ICONS.external + ' Link</a>';
    }
    html += '</div>';

    html += '</article>';
    return html;
  }

  function renderTeamMember(member) {
    var html = '<article class="card person-card reveal">';
    html += '<div class="person-card__avatar">';

    // Check for photo
    var photo = '';
    if (member.slug && window.PEOPLE_DATA && window.PEOPLE_DATA[member.slug] && window.PEOPLE_DATA[member.slug].hasPhoto) {
      photo = window.PEOPLE_DATA[member.slug].photo;
    }

    if (photo) {
      html += '<img src="' + escapeHTML(photo) + '" alt="' + escapeHTML(member.name) + '" loading="lazy">';
    } else {
      html += ICONS.user;
    }

    html += '</div>';
    html += '<div class="person-card__info">';
    html += '<h3 class="person-card__name">' + escapeHTML(member.name) + '</h3>';
    if (member.role) {
      html += '<p class="person-card__role">' + escapeHTML(member.role) + '</p>';
    }
    if (member.institution) {
      html += '<p class="person-card__dept">' + escapeHTML(member.institution) + '</p>';
    }
    html += '</div></article>';
    return html;
  }

  function renderPersonCard(person) {
    var html = '<article class="card person-card reveal">';
    html += '<div class="person-card__avatar">';

    if (person.hasPhoto && person.photo) {
      html += '<img src="' + escapeHTML(person.photo) + '" alt="' + escapeHTML(person.name) + '" loading="lazy">';
    } else {
      html += ICONS.user;
    }

    html += '</div>';
    html += '<div class="person-card__info">';
    html += '<h3 class="person-card__name">' + escapeHTML(person.name) + '</h3>';
    if (person.role) {
      html += '<p class="person-card__role">' + escapeHTML(person.role) + '</p>';
    }
    html += '</div></article>';
    return html;
  }

  /* ═══════════════════════════════════════════
     404 HANDLER
     ═══════════════════════════════════════════ */

  function show404(type) {
    var content = document.getElementById('page-content');
    if (!content) return;

    document.title = 'Not Found | Mphasis AI & Applied Tech Lab';

    content.innerHTML =
      '<div class="detail-404">' +
      '<h1 class="detail-404__title">' + escapeHTML(type || 'Page') + ' Not Found</h1>' +
      '<p class="detail-404__text">The ' + escapeHTML((type || 'page').toLowerCase()) + ' you are looking for does not exist or may have been moved.</p>' +
      '<a href="research.html" class="btn btn--primary btn--lg">Back to Research</a>' +
      '</div>';
  }

  /* ═══════════════════════════════════════════
     ROUTER
     ═══════════════════════════════════════════ */

  var pageType = document.body.getAttribute('data-page');

  if (pageType === 'project') {
    renderProjectPage();
  } else if (pageType === 'pillar') {
    renderPillarPage();
  } else if (pageType === 'publications') {
    renderPublicationsPage();
  }

})();
