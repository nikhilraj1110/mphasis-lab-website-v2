# CHANGES — Append-Only Session Log
> Every session appends to this file. Never edit previous entries.
> Format: date, what changed, files touched, what's next, open issues.

---

## 2026-04-23 — Session 0: Setup

**What happened:**
- Created PRD.md, brand.css, components.html, design-brief.md
- Ran LLM Council review of PRD
- Created SPEC.md (invariant canonical reference)
- Created STATUS.md (per-page mutable tracker)
- Created CHANGES.md (this file)

**Files created:**
- `Finishing/PRD.md`
- `Finishing/brand.css`
- `Finishing/components.html`
- `Finishing/design-brief.md`
- `Finishing/SPEC.md`
- `Finishing/STATUS.md`
- `Finishing/CHANGES.md`
- `Finishing/council-report-2026-04-23.html`
- `Finishing/council-transcript-2026-04-23.md`

**Files modified:** None (no website files touched yet)

**What's next:**
1. User reviews and approves the three-document structure (SPEC + STATUS + CHANGES)
2. Begin Foundation steps (F1-F6): brand.css swap, font swap, remove inline overrides
3. After Foundation approved: start page-by-page execution with index.html

**Open issues:**
- Faculty metric inconsistency: impact.html says "25+", people.html meta says "27+". SPEC.md sets canonical to "27+". Fix when reaching those pages.
- "1 patent" mentioned in CLAUDE.md but not on any live page or data file. Confirm with user whether to add.
- Council recommended conditional JS loading (data-features attribute on body) to avoid loading GSAP on Contact page. Needs user decision.

---

## 2026-04-23 — Session 1: Foundation Revert & Process Fix

**What happened:**
- Foundation steps F1-F6 had modified all 11 HTML files globally (font swap, CSS swap, scroll normalization)
- User tested on localhost — result looked broken across all pages
- User ordered full revert: all HTML files restored to exact copies from Website folder
- `variables.css` restored (was replaced by `brand.css` globally)
- User mandated: ONE page at a time, no global sweeps, no foundation phase
- All documentation updated to enforce this rule:
  - `CLAUDE.md` — rewritten with THE ONE RULE, workflow steps, and history of why
  - `STATUS.md` — Foundation section marked REVERTED & ABOLISHED, per-page workflow documented
  - `PRD.md` — Section 11 (Execution Order) rewritten: no global phases, per-page conversion only
  - `SPEC.md` — Session-start checklist updated with audit-first, plan-first process

**Files modified:**
- `CLAUDE.md` — rewritten
- `STATUS.md` — rewritten
- `PRD.md` — Section 11 replaced
- `SPEC.md` — Section 10 replaced
- `CHANGES.md` — this entry
- `index.html` — reverted to Website original
- `pages/*.html` (10 files) — all reverted to Website originals
- `src/css/variables.css` — restored from Website original

**Key decision:**
- **No global foundation phase.** Each page gets its full conversion (fonts, CSS, components, scroll, polish) independently, one at a time, with user testing and approval between each.

**What's next:**
1. Start Page 1 (index.html) — audit, plan, get user approval, then implement

**Open issues (carried forward):**
- Faculty metric inconsistency: impact.html says "25+", canonical is "27+". Fix when reaching that page.
- "1 patent" in parent CLAUDE.md but not on any page. Confirm with user.
- Council recommended conditional JS loading. Needs user decision.

---

<!-- APPEND NEW SESSIONS BELOW THIS LINE -->
