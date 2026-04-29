# SPEC — Canonical Reference (INVARIANT)
> This file is the contract. Read it at session start. Validate against it.
> It does NOT change mid-session. If something here needs updating, flag it to the user.

---

## 1. Fonts

**Google Fonts link (exact, in every `<head>`):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400&family=Zilla+Slab:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
```

| Role | Font | CSS Variable |
|---|---|---|
| Headers/display | Georgia | `--font-display` |
| Body text | Open Sans | `--font-sans` |
| Accents (stats, eyebrows, labels) | Zilla Slab | `--font-creative` |

**BANNED:** Barlow, Manrope, JetBrains Mono, Inter. If found, replace.

## 2. Colors

| Token | Hex | Usage |
|---|---|---|
| `--brand-red` | #C4122F | Progress bar, accents, badges, eyebrows |
| `--brand-blue` | #0D3862 | Dark sections, primary links, headings |
| `--color-bg` | #FFFFFF | Light section backgrounds |
| `--color-bg-alt` | #FBF3DF | Warm alternate backgrounds |
| `--brand-beige` | #F7EBD3 | Warm sections |

**BANNED:** #009BDE (F1 cyan), #D94F8A (F1 pink), any pink-teal-green gradient.

## 3. CSS Import Stack (12 files, this exact order)

```
brand.css → reset.css → base.css → layout.css → header.css → footer.css →
components.css → animations.css → pages.css → utilities.css → search.css → floating-nav.css
```

`[path]` = `""` for index.html, `"../"` for pages/*.html. **Never import `variables.css`.**

## 4. JS Script Stack (11 files, this exact order)

```
Data:   projects.js, people.js, publications.js, pillars.js
Vendor: gsap.min.js, ScrollTrigger.min.js
Site:   gsap-animations.js, main.js, search.js, floating-nav.js, page-canvases.js
```

## 5. Required Components (every page)

| # | Component | Verification |
|---|---|---|
| 1 | Skip link | First element in `<body>`: `<a href="#main-content" class="skip-link">` |
| 2 | Progress bar | `<div class="progress-bar" id="progress-bar">` |
| 3 | Floating menu btn | `<button class="float-menu-btn" id="floatMenuBtn">` |
| 4 | Floating search btn | `<button class="float-search-btn" id="floatSearchBtn">` |
| 5 | Side nav panel | `<nav class="side-nav" id="side-nav">` — HTML must match `components.html` |
| 6 | Search overlay | `<div class="search-overlay" id="search-overlay">` — HTML must match `components.html` |
| 7 | Footer | `<footer class="footer">` — HTML must match `components.html` |

**Active state:** Current page's side-nav link gets class `side-nav__link--active`.

## 6. Scroll Model

Normal scroll (`overflow: auto`) on ALL pages. **BANNED:** `overflow: hidden`, `height: 100vh` on body/html, snap-scroll wrappers, scroll-jacking JS.

## 7. Canonical Metrics

These numbers appear across multiple pages. Use ONLY these values:

| Metric | Value | Where Used |
|---|---|---|
| Research Projects | 25+ | Home hero, Impact stats |
| Publications | 30+ | Impact stats |
| Faculty | 27+ across 7 departments | Impact stats, People meta |
| Deployed Systems | 6 | Impact stats |
| Partnerships | 40+ | Impact stats |
| Presentations & Talks | 40+ | Impact stats |
| Research Pillars | 5 | Impact stats, Home text |
| K-12 Students | 2,000+ | Makerspace, Research |
| RedBrick Hacks Applicants | 430+ | News, About, Makerspace |
| Countries | 15+ | Impact stats |
| Awards | 8 | Impact stats |

**Note:** Faculty metric is currently inconsistent (25+ on impact.html, 27+ on people.html meta). Canonical value is **27+**. Fix impact.html when reached.

## 8. Content Rules (non-negotiable)

1. No budget/financial data (INR, Lakhs, Crore, allocations)
2. No WIP language ("underway", "planned", "in progress")
3. No ML metrics (R2, accuracy %, ROC-AUC, F1)
4. No fabricated content — every claim traceable to Source files
5. No stock photos — real lab imagery only
6. Body text left-aligned only — never centered, right-aligned, or justified
7. No body text in all-caps — uppercase only for eyebrow labels/tags

## 9. Typography Rules

- All headings: `font-family: var(--font-display)` (Georgia)
- All body text: `font-family: var(--font-sans)` (Open Sans)
- Accent text (stats, eyebrows, tags): `font-family: var(--font-creative)` (Zilla Slab)
- Eyebrow format: `// LABEL TEXT` — Zilla Slab, uppercase, `--tracking-wider`, color `--brand-red`
- No inline `<style>` blocks overriding brand tokens

## 10. Session-Start Checklist

1. Read `CLAUDE.md` — confirm the ONE PAGE AT A TIME rule.
2. Read `STATUS.md` — identify which page is current and its status.
3. If a page is IN PROGRESS or PENDING REVIEW, resume that page. Do NOT start a new one.
4. If starting a new page, get explicit user approval first.

### Before making ANY changes to the target page, audit its CURRENT state:

- [ ] What CSS file does it import? (`variables.css` = original, `brand.css` = converted)
- [ ] What Google Fonts does it load? (Barlow/Manrope = original, Open Sans/Zilla Slab = converted)
- [ ] Does it have the standard 12-file CSS stack?
- [ ] Does it have all 7 required components?
- [ ] Does it have the standard JS stack?
- [ ] What scroll model does it use? (`overflow: hidden` = needs conversion)
- [ ] Does it have inline `<style>` blocks?
- [ ] Present this audit to the user as the plan. Wait for go-ahead.

### After completing changes, verify the target page meets spec:

- [ ] Imports `brand.css` (not `variables.css`)
- [ ] Google Fonts loads Open Sans + Zilla Slab (not Barlow/Manrope/JetBrains)
- [ ] Has all 12 CSS files in correct order
- [ ] Has all 7 required components
- [ ] Has standard JS stack
- [ ] Uses normal scroll (no `overflow: hidden; height: 100vh`)
- [ ] No inline `<style>` overriding brand tokens
- [ ] Active nav state correct
- [ ] Content rules satisfied

### Regression check (before starting next page):
- [ ] Every previously-approved page still renders correctly on localhost

---

*Last updated: 2026-04-23 | Source: PRD.md + brand.css + components.html*
