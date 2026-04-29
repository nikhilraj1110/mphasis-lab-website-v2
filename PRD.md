# PRD — Website Finishing Pass
## Mphasis AI & Applied Tech Lab, Ashoka University

> **What this document governs:** The final redesign pass to unify all pages into a single cohesive, brand-compliant, world-class website.
>
> **Source of truth hierarchy:**
> 1. `brand.css` — design tokens (colors, fonts, spacing). Machine-enforced.
> 2. `components.html` — canonical HTML for all shared components. Copy, don't reinvent.
> 3. `design-brief.md` — creative intent, emotional register, session-resume protocol.
> 4. This PRD — architecture, page specs, rules, execution order.
> 5. `../CLAUDE.md` — project memory, decisions log, phase tracking.

---

## 0. The Problem This PRD Solves

### Cross-Page Audit Results (April 2026)

The website currently has **3 incompatible architectural systems running simultaneously:**

| System | Pages | Fonts Loaded | Scroll Model | Brand Override? |
|---|---|---|---|---|
| **A** | index.html | Open Sans + Zilla Slab | Normal scroll | YES (inline `<style>`) |
| **B** | about, research, people, publications, impact, contact | Barlow + Manrope + JetBrains Mono | Snap/locked `100vh` | NO |
| **C** | news, makerspace | Barlow + Manrope + JetBrains Mono | Normal scroll | NO |

**This is why pages feel like different websites.** The fonts change, the scroll behavior changes, the navigation changes, the styling strategy changes with every page load.

### Specific Inconsistencies

| Aspect | index.html | Snap Pages (6 pages) | Scroll Pages (2 pages) |
|---|---|---|---|
| Google Fonts | Open Sans, Zilla Slab | Barlow, Manrope, JetBrains Mono | Barlow, Manrope, JetBrains Mono |
| CSS imports | No pages.css, no floating-nav.css | Has pages.css + floating-nav.css | Has pages.css + floating-nav.css |
| Floating nav buttons | NO | YES | YES |
| Side navigation panel | Partial/inline | Full component | Full component |
| Brand color variables | Ashoka navy/red | Mphasis F1 defaults | Mphasis F1 defaults |
| Scroll engine | Normal `overflow: auto` | Locked `overflow: hidden; height: 100vh` | Normal `overflow: auto` |
| Hero canvas | Stack-panel system | Snap-panel system | Standard sections |

### Root Causes
1. **`variables.css` still contains Mphasis F1 Foundation tokens** (Barlow, Manrope, JetBrains Mono, #009BDE blue, pink/teal/green gradient). Only index.html overrides these inline.
2. **No shared brand CSS file.** Each page loads `variables.css` and gets F1 defaults unless it has its own override block.
3. **Pages were built in different sessions** with different architectural assumptions (stack-scroll, snap-scroll, normal-scroll).
4. **CSS import lists differ** — index.html is missing `floating-nav.css` and `pages.css`.

---

## 1. The Fix: Unified Page Architecture

### Step 1 — Replace `variables.css` with `brand.css`

The current `variables.css` contains Mphasis F1 Foundation tokens. It must be replaced with `brand.css` (already created in this folder), which contains Ashoka University brand-correct values as the *defaults* — not as overrides.

**Action:** Rename `src/css/variables.css` → `src/css/variables-legacy.css` (backup). Copy `Finishing/brand.css` → `src/css/brand.css`. Update all HTML files to import `brand.css` instead of `variables.css`.

This single change fixes fonts and colors across ALL pages simultaneously.

### Step 2 — Standardize the CSS Import Stack

Every page MUST import these CSS files in this exact order:

```html
<!-- FONTS — Brand-mandated (Georgia is system, no load needed) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400&family=Zilla+Slab:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">

<!-- CSS — In dependency order -->
<link rel="stylesheet" href="[path]/src/css/brand.css">
<link rel="stylesheet" href="[path]/src/css/reset.css">
<link rel="stylesheet" href="[path]/src/css/base.css">
<link rel="stylesheet" href="[path]/src/css/layout.css">
<link rel="stylesheet" href="[path]/src/css/header.css">
<link rel="stylesheet" href="[path]/src/css/footer.css">
<link rel="stylesheet" href="[path]/src/css/components.css">
<link rel="stylesheet" href="[path]/src/css/animations.css">
<link rel="stylesheet" href="[path]/src/css/pages.css">
<link rel="stylesheet" href="[path]/src/css/utilities.css">
<link rel="stylesheet" href="[path]/src/css/search.css">
<link rel="stylesheet" href="[path]/src/css/floating-nav.css">
```

Where `[path]` is `""` for index.html or `"../"` for pages/*.html.

**Page-specific CSS** (e.g., `detail-pages.css` for research/publications) loads AFTER the standard stack.

### Step 3 — Standardize the Scroll Model

**Decision required:** Choose ONE scroll model for ALL pages.

**Recommendation:** Normal scroll (`overflow: auto`) for ALL pages.

Rationale:
- Snap/locked scroll creates accessibility issues (keyboard nav, screen readers)
- Normal scroll matches user expectations and works natively on all devices
- GSAP ScrollTrigger provides all the cinematic effects without hijacking scroll
- The snap-scroll engines are custom per-page inline JS — unmaintainable

**Action:** Remove all `overflow: hidden; height: 100vh` from subpages. Remove snap-track/snap-panel wrappers. Convert snap-panel content to standard `<section>` elements with GSAP scroll-triggered reveals.

### Step 4 — Standardize Shared Components

Every page MUST include these shared components (canonical HTML in `components.html`):

1. **Progress bar** — `<div class="progress-bar" id="progress-bar">` at top of body
2. **Floating menu button** — `<button class="float-menu-btn" id="floatMenuBtn">`
3. **Floating search button** — `<button class="float-search-btn" id="floatSearchBtn">`
4. **Side navigation panel** — `<nav class="side-nav" id="side-nav">` with full pillar list
5. **Search overlay** — `<div class="search-overlay" id="search-overlay">`
6. **Footer** — `<footer class="footer">` with full grid layout
7. **Skip link** — `<a href="#main-content" class="skip-link">Skip to main content</a>` first in body

### Step 5 — Standardize the JS Load

Every page MUST load these scripts at bottom of body, in this order:

```html
<!-- Data -->
<script src="[path]/src/data/projects.js"></script>
<script src="[path]/src/data/people.js"></script>
<script src="[path]/src/data/publications.js"></script>
<script src="[path]/src/data/pillars.js"></script>

<!-- Vendor -->
<script src="[path]/src/vendor/gsap.min.js"></script>
<script src="[path]/src/vendor/ScrollTrigger.min.js"></script>

<!-- Site -->
<script src="[path]/src/js/gsap-animations.js"></script>
<script src="[path]/src/js/main.js"></script>
<script src="[path]/src/js/search.js"></script>
<script src="[path]/src/js/floating-nav.js"></script>
<script src="[path]/src/js/page-canvases.js"></script>
```

Page-specific inline `<script>` is allowed for page-unique behavior (filters, counters, etc.) but must NOT redefine shared component behavior.

### Step 6 — Remove index.html Inline Overrides

Once `brand.css` replaces `variables.css`, the massive inline `<style>` block in index.html (lines 26-100+) becomes unnecessary. Remove it. index.html should import the same CSS stack as every other page.

---

## 2. Locked Page Template

Every page follows this HTML skeleton:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Page Title] — Mphasis AI & Applied Tech Lab</title>
  <meta name="description" content="[Page description]">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400&family=Zilla+Slab:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">

  <!-- Standard CSS Stack -->
  <link rel="stylesheet" href="[path]/src/css/brand.css">
  <link rel="stylesheet" href="[path]/src/css/reset.css">
  <link rel="stylesheet" href="[path]/src/css/base.css">
  <link rel="stylesheet" href="[path]/src/css/layout.css">
  <link rel="stylesheet" href="[path]/src/css/header.css">
  <link rel="stylesheet" href="[path]/src/css/footer.css">
  <link rel="stylesheet" href="[path]/src/css/components.css">
  <link rel="stylesheet" href="[path]/src/css/animations.css">
  <link rel="stylesheet" href="[path]/src/css/pages.css">
  <link rel="stylesheet" href="[path]/src/css/utilities.css">
  <link rel="stylesheet" href="[path]/src/css/search.css">
  <link rel="stylesheet" href="[path]/src/css/floating-nav.css">

  <!-- Page-specific CSS (if needed) -->
</head>
<body>
  <!-- Skip Link -->
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <!-- Progress Bar -->
  <div class="progress-bar" id="progress-bar" aria-hidden="true"></div>

  <!-- Floating Nav Buttons -->
  <button class="float-menu-btn" id="floatMenuBtn" aria-label="Open navigation">
    <div class="float-menu-btn__icon"><span></span><span></span><span></span></div>
    <span class="float-menu-btn__label">Menu</span>
  </button>
  <button class="float-search-btn" id="floatSearchBtn" aria-label="Search">
    <svg>...</svg>
    <span class="float-search-btn__label">Search</span>
  </button>

  <!-- Side Navigation Panel -->
  <nav class="side-nav" id="side-nav" aria-label="Side navigation">
    <!-- COPY EXACTLY from components.html -->
  </nav>

  <!-- Search Overlay -->
  <div class="search-overlay" id="search-overlay" role="dialog" aria-modal="true" aria-label="Search" hidden>
    <!-- COPY EXACTLY from components.html -->
  </div>

  <!-- MAIN CONTENT -->
  <main id="main-content">
    <!-- Hero Section -->
    <section class="hero" id="hero-section">
      <!-- Page-specific hero content -->
    </section>

    <!-- Content Sections -->
    <section class="section [section--dark]">
      <div class="container">
        <div class="section__header">
          <span class="section__eyebrow">// Label</span>
          <h2 class="section__title">Title</h2>
        </div>
        <!-- Section content -->
      </div>
    </section>

    <!-- More sections... -->
  </main>

  <!-- Footer -->
  <footer class="footer" role="contentinfo">
    <!-- COPY EXACTLY from components.html -->
  </footer>

  <!-- Standard JS Stack -->
  <script src="[path]/src/data/projects.js"></script>
  <script src="[path]/src/data/people.js"></script>
  <script src="[path]/src/data/publications.js"></script>
  <script src="[path]/src/data/pillars.js"></script>
  <script src="[path]/src/vendor/gsap.min.js"></script>
  <script src="[path]/src/vendor/ScrollTrigger.min.js"></script>
  <script src="[path]/src/js/gsap-animations.js"></script>
  <script src="[path]/src/js/main.js"></script>
  <script src="[path]/src/js/search.js"></script>
  <script src="[path]/src/js/floating-nav.js"></script>
  <script src="[path]/src/js/page-canvases.js"></script>

  <!-- Page-specific JS (if needed) -->
</body>
</html>
```

---

## 3. Section Rhythm Rules (Cross-Page Consistency)

These rules ensure every page *feels* like part of the same website:

### Typography Rhythm
- **All headings:** `font-family: var(--font-display)` (Georgia). No exceptions.
- **All body text:** `font-family: var(--font-sans)` (Open Sans). No exceptions.
- **Accent text** (stat numbers, eyebrow labels, tags): `font-family: var(--font-creative)` (Zilla Slab).
- **H1 (hero):** `clamp(3rem, 5vw + 1rem, 4.5rem)`, weight 700
- **H2 (section title):** `var(--text-4xl)` (2.25rem), weight 700
- **H3 (card title):** `var(--text-xl)` (1.25rem), weight 600
- **Body:** `var(--text-base)` (1rem), weight 400, line-height `var(--leading-relaxed)` (1.65)
- **Eyebrow labels:** `var(--text-sm)`, weight 600, `letter-spacing: var(--tracking-wider)`, uppercase, `font-family: var(--font-creative)`

### Color Rhythm
- **Light sections:** `background: var(--color-bg)` (#FFFFFF) or `var(--color-bg-alt)` (#FBF3DF)
- **Dark sections:** `background: var(--brand-blue)` (#0D3862), text `var(--color-text-inverse)` (#FFFFFF)
- **Warm sections:** `background: var(--brand-beige)` (#F7EBD3)
- **Accent color:** `var(--brand-red)` (#C4122F) — for progress bar, badges, hover states, links in dark sections
- **Never** more than 2 consecutive same-background sections

### Spacing Rhythm
- **Section vertical padding:** `var(--space-24)` (6rem) top and bottom
- **Dark section padding:** `var(--space-32)` (8rem) top and bottom — creates natural pause
- **Section header margin-bottom:** `var(--space-12)` (3rem)
- **Card grid gap:** `var(--space-8)` (2rem)
- **Card internal padding:** `var(--space-6)` (1.5rem)

### Animation Rhythm
- **All scroll reveals:** GSAP ScrollTrigger, trigger at `top 85%`, stagger `0.1s`
- **Cards:** `opacity: 0 → 1`, `y: 30px → 0`, `duration: 0.6s`
- **Text blocks:** `opacity: 0 → 1`, `y: 20px → 0`, `duration: 0.5s`
- **Stat counters:** Count up on scroll trigger, `duration: 2s`
- **No animation on mobile** if `prefers-reduced-motion: reduce`

### Navigation Consistency
- **Every page:** Floating menu button (bottom-left) + floating search button (bottom-right)
- **Every page:** Side panel opens with full nav + pillar shortcuts
- **Every page:** Cmd+K opens search overlay
- **Every page:** Progress bar at top (red, 3px)
- **Active state:** Current page highlighted in side nav with `side-nav__link--active`

---

## 4. Page-by-Page Architecture

### Home (index.html)
- **Hero:** Full-viewport, canvas animation (neural network), morphing tagline, two CTAs
- **Ticker:** Research themes scrolling strip
- **Spotlight:** 3-4 featured projects as expandable strips
- **Key Metrics:** Dark section with animated stat counters (25+ projects, 30+ publications, etc.)
- **Latest News:** 3-4 news cards
- **Footer**

### About (pages/about.html)
- **Hero:** Page-level hero with "About the Lab" title, canvas background
- **Mission:** Lab overview, mission statement
- **Partnership:** Ashoka + Mphasis relationship
- **Timeline:** Lab milestones (visual timeline)
- **Leadership:** Key team members
- **Collaborators:** Partner institutions ticker
- **Footer**

### Research (pages/research.html)
- **Hero:** "Research" title with canvas
- **Pillar Filter:** Filter bar (All, AI@Ashoka, BharatSim, CHART, Cybersecurity, Makerspace)
- **Theme Tags:** Interactive research theme tags
- **Project Grid:** Filterable project cards, each linking to project detail page
- **Footer**

### People (pages/people.html)
- **Hero:** "People" title
- **Role Filter:** All, Faculty PIs, Staff, Students
- **People Grid:** Profile cards with photo, name, role, department
- **Footer**

### Publications (pages/publications.html)
- **Hero:** "Publications" with canvas
- **Category Filter:** All, Journal Articles, Conference Papers, Preprints, etc.
- **Year Groups:** Publications grouped by year, newest first
- **Each entry:** Title, authors, venue, DOI link
- **Footer**

### News & Events (pages/news.html)
- **Hero:** "News & Events"
- **Card Feed:** Date-tagged news/event cards, newest first
- **Footer**

### Impact (pages/impact.html)
- **Hero:** "Impact" with canvas
- **Stat Dashboard:** Dark section with key metrics (animated counters)
- **Deployed Systems:** Cards for 6 deployed systems
- **Stories:** Impact narratives
- **Footer**

### Makerspace (pages/makerspace.html)
- **Hero:** "Digital Makerspace"
- **Facility Overview:** What the makerspace is
- **Equipment:** Showcase of available equipment
- **Student Projects:** Cards
- **RedBrick Hacks:** Hackathon showcase
- **Footer**

### Contact (pages/contact.html)
- **Hero:** "Contact"
- **Contact Info:** Email, location, map
- **Form** (if applicable)
- **Footer**

---

## 5. Animation System (GSAP)

### Locked Dependencies
```
GSAP: 3.12.x (from src/vendor/gsap.min.js)
ScrollTrigger: 3.12.x (from src/vendor/ScrollTrigger.min.js)
```

### Per-Element Animation Spec

| Element Type | Animation | Duration | Easing | Trigger | Stagger |
|---|---|---|---|---|---|
| Section heading | fadeIn + slideUp 20px | 0.5s | power2.out | top 85% | — |
| Eyebrow label | fadeIn + slideUp 10px | 0.4s | power2.out | top 85% | — |
| Body paragraph | fadeIn + slideUp 15px | 0.5s | power2.out | top 80% | — |
| Card (in grid) | fadeIn + slideUp 30px + scale(0.98→1) | 0.6s | power2.out | top 85% | 0.1s |
| Pillar card | fadeIn + slideUp 30px | 0.6s | power2.out | top 85% | 0.15s |
| Stat counter | countUp from 0 | 2.0s | power1.inOut | top 80% | 0.2s |
| Spotlight strip | fadeIn + slideRight 40px | 0.6s | power2.out | top 85% | 0.15s |
| Hero title | fadeIn + slideUp 30px | 0.8s | power3.out | immediate | — |
| Hero badge | fadeIn + scale(0.9→1) | 0.5s | power2.out | immediate (delay 0.3s) | — |
| Hero buttons | fadeIn + slideUp 20px | 0.5s | power2.out | immediate (delay 0.6s) | 0.1s |

### Hero Canvas Spec

| Page | Canvas Type | Colors | Behavior |
|---|---|---|---|
| Home | Neural network (nodes + edges) | `--brand-blue` nodes, `--brand-red` highlights | Slowly drifting, responsive to scroll |
| About | Constellation dots | `--brand-blue` dots | Gentle float |
| Research | Grid/matrix | `--brand-blue` lines | Subtle pulse |
| People | Dot network | `--brand-blue` dots | Slow connections |
| Publications | Blueprint grid | `--brand-blue` lines | Static with fade |
| Impact | Data visualization dots | `--brand-red` accents | Count-triggered |
| Others | Minimal dot field | `--brand-blue` | Gentle drift |

### Interactive Elements

| Element | Interaction | Spec |
|---|---|---|
| Cards | 3D tilt on hover | `perspective: 1000px`, `rotateX/Y: ±3deg` from mouse position, `transition: 0.3s` |
| Cards | Pillar glow on hover | `box-shadow: 0 0 20px var(--pillar-color, rgba(13,56,98,0.15))` |
| Buttons | Magnetic pull | Subtle 2-3px shift toward cursor on hover |
| Tags | Scale bounce on click | `scale(0.95) → scale(1.05) → scale(1)`, 0.3s |
| Search overlay | Cinematic open | Scale from 0.95 + fade, 0.25s |
| Side nav | Slide from right | `translateX(100%) → 0`, 0.35s ease |

### Performance Rules
- **60fps budget:** All animations use `transform` and `opacity` only. No `width`, `height`, `top`, `left`.
- **`prefers-reduced-motion: reduce`:** Disable all GSAP animations, show content immediately.
- **Mobile (≤768px):** No 3D tilt. Simplified canvas (fewer particles). No magnetic buttons.
- **Canvas:** `requestAnimationFrame` with `isVisible` check. Pause when off-screen.

---

## 6. Content Rules (Non-Negotiable)

1. **No budget or financial data.** No INR, Lakhs, Crore, allocations, utilization. Confidential.
2. **No work-in-progress language.** No "underway," "planned," "in progress." Only completed achievements.
3. **No granular ML metrics.** No R2, accuracy %, ROC-AUC, F1. Accessible descriptions only.
4. **No fabricated content.** Every claim traceable to Source files or approved fact sheets.
5. **No stock photos.** Real lab imagery only.
6. **Body text left-aligned.** Never centered, right-aligned, or justified (Ashoka brand rule).
7. **No body text in all-caps.** (Ashoka brand rule). Uppercase only for eyebrow labels/tags.
8. **Source-backed claims only.** Content sourcing hierarchy: Source files → Fact sheets → Comprehensive Report → Knowledge Graph.

---

## 7. Responsive Strategy

### Breakpoints
```css
/* Mobile-first */
@media (min-width: 640px)  { /* sm — small tablet */ }
@media (min-width: 768px)  { /* md — tablet */ }
@media (min-width: 1024px) { /* lg — desktop */ }
@media (min-width: 1280px) { /* xl — large desktop */ }
```

### Per-Breakpoint Behavior

| Aspect | Mobile (<768px) | Tablet (768-1023px) | Desktop (≥1024px) |
|---|---|---|---|
| Grid columns | 1 | 2 | 3-4 |
| Hero font size | clamp(2.5rem, ...) | clamp(3rem, ...) | clamp(3.5rem, ...) |
| Section padding | var(--space-16) | var(--space-20) | var(--space-24) |
| Card tilt | Disabled | Disabled | Enabled |
| Canvas particles | 30 | 50 | 100 |
| Floating nav | Visible | Visible | Visible |
| Side nav | Full-screen overlay | Panel from right | Panel from right |
| Magnetic buttons | Disabled | Disabled | Enabled |
| Stat counter | Smaller text | Medium text | Large text |

---

## 8. Performance Budget

| Metric | Target |
|---|---|
| Lighthouse Performance | 90+ |
| Lighthouse Accessibility | 95+ |
| Lighthouse Best Practices | 90+ |
| Lighthouse SEO | 90+ |
| First Contentful Paint | < 1.5s |
| Total page weight (HTML+CSS+JS) | < 500KB (excl. images) |
| Images | WebP/AVIF, lazy-loaded below fold |
| Fonts | 2 families max per page (Open Sans + Zilla Slab) |
| GSAP | Single minified bundle (~60KB) |

---

## 9. Accessibility (WCAG 2.1 AA)

| Requirement | Implementation |
|---|---|
| Color contrast | All text ≥ 4.5:1 ratio. Large text ≥ 3:1. Pre-checked pairs in brand.css comments. |
| Keyboard navigation | All interactive elements focusable. Tab order logical. Focus styles visible (2px outline). |
| Skip link | First element in body: `<a href="#main-content" class="skip-link">` |
| ARIA landmarks | `<header role="banner">`, `<main>`, `<footer role="contentinfo">`, `<nav aria-label="...">` |
| Images | All `<img>` have descriptive `alt`. Decorative images `alt=""` + `aria-hidden="true"`. |
| Canvas | All `<canvas>` have `aria-hidden="true"`. Never convey essential info via canvas. |
| Search | `role="dialog"`, `aria-modal="true"`, focus trapped, ESC closes. |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` disables GSAP, canvas. |
| Screen readers | Visually hidden text for icon-only buttons. Live regions for search results. |

---

## 10. Cross-Page Consistency Checklist

Before any page is considered complete, verify ALL of the following:

### Structure
- [ ] Imports `brand.css` (NOT `variables.css`)
- [ ] Loads Open Sans + Zilla Slab from Google Fonts (NOT Barlow/Manrope/JetBrains Mono)
- [ ] Has standard CSS import stack (12 files, correct order)
- [ ] Has skip link as first body element
- [ ] Has progress bar
- [ ] Has floating menu + search buttons
- [ ] Has side navigation panel (matching `components.html`)
- [ ] Has search overlay (matching `components.html`)
- [ ] Has standard footer (matching `components.html`)
- [ ] Has standard JS load stack
- [ ] Uses normal scroll (`overflow: auto`), NOT snap/locked scroll
- [ ] No inline `<style>` blocks that override brand tokens

### Typography
- [ ] All headings render in Georgia
- [ ] All body text renders in Open Sans
- [ ] Accent text (stats, labels) in Zilla Slab
- [ ] No Barlow, Manrope, JetBrains Mono, or Inter anywhere
- [ ] Body text is left-aligned
- [ ] No body text in all-caps

### Colors
- [ ] Primary red is #C4122F (not #D94F8A or any pink)
- [ ] Primary blue is #0D3862 (not #009BDE or any cyan)
- [ ] No F1 gradient (pink→teal→green) anywhere
- [ ] Dark sections use `--brand-blue` background
- [ ] Progress bar is `--brand-red`

### Content
- [ ] No budget/financial figures
- [ ] No WIP/in-progress language
- [ ] No ML metrics (R2, accuracy %, etc.)
- [ ] All claims source-backed

### Navigation
- [ ] Side nav links point to correct relative paths
- [ ] Current page has `side-nav__link--active` class
- [ ] Cmd+K triggers search overlay
- [ ] All nav links work

---

## 11. Execution Order

**METHOD: One page at a time. No global sweeps. No foundation phase.**

Each page starts as an exact copy from the Website folder and receives its FULL conversion independently:

### Per-Page Conversion Steps (repeat for each page in order)

For page N (in order: index → about → research → people → publications → impact → makerspace → news → contact):

1. **Audit** — Read the page. List every deviation from SPEC.md (fonts, CSS, components, scroll, content).
2. **Plan** — Present changes to user. Wait for explicit approval.
3. **Convert** — On this page only:
   - Swap `variables.css` → `brand.css` in the CSS import
   - Swap Google Fonts to Open Sans + Zilla Slab
   - Ensure standard CSS stack (12 files, correct order)
   - Ensure standard JS stack (11 files, correct order)
   - Add/fix all 7 shared components (from `components.html`)
   - Normalize scroll model (remove `overflow: hidden; height: 100vh` if present)
   - Convert snap-panel content to standard `<section>` elements (if applicable)
   - Remove any inline `<style>` brand overrides
   - Set correct active nav state
   - Verify GSAP animations
   - Verify responsive behavior
   - Verify content rules (no budget, no WIP, no ML metrics)
4. **Test** — Serve on localhost. User tests.
5. **Approve** — User confirms. Update STATUS.md and CHANGES.md.
6. **Regression check** — Before starting next page, verify all approved pages still work.

### ABOLISHED: Global Foundation Phase
The original Foundation (F1-F6) was reverted on 2026-04-23 because modifying all files at once produced broken results. Each page now handles its own full conversion. See CLAUDE.md for the rule and its history.

---

## 12. Decision Log

| # | Decision | Choice | Date | Rationale |
|---|---|---|---|---|
| 1 | Scroll model | Normal scroll for ALL pages | April 2026 | Accessibility, consistency, maintainability |
| 2 | Token system | `brand.css` replaces `variables.css` | April 2026 | Single source of truth, no inline overrides needed |
| 3 | Fonts | Georgia + Open Sans + Zilla Slab | April 2026 | Ashoka brand guidelines mandate (pp. 11-15) |
| 4 | Colors | Red #C4122F + Blue #0D3862 | April 2026 | Ashoka brand guidelines mandate (p. 16) |
| 5 | No JetBrains Mono | Removed from entire site | April 2026 | Not in Ashoka brand guidelines; Zilla Slab serves accent role |
| 6 | No Barlow/Manrope | Removed from entire site | April 2026 | Not in Ashoka brand guidelines |

---

## Version History

| Version | Date | Changes |
|---|---|---|
| 1.0 | April 23, 2026 | Initial PRD based on LLM Council review + cross-page audit |

---

*This PRD is a living document. Update it as decisions are made.*
*For creative intent, see `design-brief.md`. For tokens, see `brand.css`. For HTML patterns, see `components.html`.*
