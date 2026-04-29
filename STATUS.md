# STATUS — Per-Page Tracker (MUTABLE)
> Claude: Read this FIRST every session (after CLAUDE.md). Update it LAST after every page.
> User: Write your approval confirmation directly in the Approved By column.

---

## ⚠ CRITICAL PROCESS RULE

**ONE page at a time. Only ONE page can be IN PROGRESS at any moment.**

```
AUDIT → PLAN → USER APPROVES PLAN → IMPLEMENT (one page only) → LOCALHOST TEST → USER APPROVES → NEXT PAGE
```

**NEVER modify multiple pages in a single step. NEVER apply global changes across all files.**
**NEVER start a page without explicit user go-ahead.**

---

## Execution Order & Status

| # | Page | Status | Session Date | Approved By |
|---|---|---|---|---|
| 1 | index.html | NOT STARTED | — | — |
| 2 | pages/about.html | NOT STARTED | — | — |
| 3 | pages/research.html | NOT STARTED | — | — |
| 4 | pages/people.html | NOT STARTED | — | — |
| 5 | pages/publications.html | NOT STARTED | — | — |
| 6 | pages/impact.html | NOT STARTED | — | — |
| 7 | pages/makerspace.html | NOT STARTED | — | — |
| 8 | pages/news.html | NOT STARTED | — | — |
| 9 | pages/contact.html | NOT STARTED | — | — |

### Status Values
- **NOT STARTED** — Exact copy from Website folder. No modifications yet.
- **IN PROGRESS** — Currently being worked on (only 1 page at a time)
- **DONE — PENDING REVIEW** — Claude finished; waiting for user to test on localhost
- **APPROVED** — User confirmed on localhost; do not modify unless regression detected
- **REGRESSION** — A previously-approved page failed re-validation; fix before continuing

---

## Per-Page Workflow (mandatory for every page)

### Step 1: Audit
- Read the page as it currently exists (exact copy from Website)
- Compare against SPEC.md target
- List every deviation (fonts, CSS stack, components, scroll model, content)

### Step 2: Plan
- Present the full list of proposed changes to the user
- Include: what will change, what will stay, what shared files (if any) are affected
- **WAIT for explicit user approval before touching any file**

### Step 3: Implement
- Make all changes to THIS page only
- If a shared CSS/JS file must change: note it, make the change, and flag for regression check
- No other page's HTML is touched

### Step 4: Test
- Start/confirm localhost server
- Present the URL to the user
- **WAIT for user to test and respond**

### Step 5: Record
- If approved: update this STATUS.md, append to CHANGES.md
- If fixes needed: implement fixes, re-test, repeat until approved

### Step 6: Regression Check (before starting next page)
- Open every previously-approved page on localhost
- Verify no regressions from any shared CSS/JS changes
- If regression found: mark as REGRESSION, fix FIRST, get re-approval

---

## Completion Checklist (verify before marking APPROVED)

- [ ] Imports `brand.css` (not `variables.css`)
- [ ] Google Fonts: Open Sans + Zilla Slab (not Barlow/Manrope/JetBrains)
- [ ] Standard CSS stack (12 files, correct order)
- [ ] All 7 shared components present (skip-link, progress-bar, float-menu, float-search, side-nav, search-overlay, footer)
- [ ] Normal scroll (no `overflow: hidden; height: 100vh`)
- [ ] Active nav state correct for this page
- [ ] Standard JS stack loaded
- [ ] No inline `<style>` overriding brand tokens
- [ ] Typography: Georgia headings, Open Sans body, Zilla Slab accents
- [ ] Colors: #C4122F red, #0D3862 blue (no F1 cyan/pink)
- [ ] Content rules: no budget data, no WIP language, no ML metrics
- [ ] Responsive: works at mobile, tablet, desktop
- [ ] GSAP animations fire correctly

---

## Foundation Phase — REVERTED & ABOLISHED

The original Foundation steps (F1-F6) attempted to modify all HTML files at once.
This was reverted on 2026-04-23 per user instruction. All files are now exact copies from Website.
**There is no separate foundation phase. Each page handles its own full conversion.**

---

*Last updated: 2026-04-23 | Next action: Start Page 1 (index.html) — awaiting user go-ahead*
