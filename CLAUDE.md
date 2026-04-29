# CLAUDE.md — Project Memory & Rules

## MANDATES (STRICT)

1. **NO MODIFICATIONS TO PARENT DIRECTORY:** Never modify any files in the `../` (Website) folder. Read-only.
2. **EXACT REPLICATION FIRST:** Every page starts as an exact copy from the Website folder. No pre-modifications, no global sweeps.
3. **SELF-SUSTAINED:** The Finishing folder must run on localhost independently.
4. **VERSIONING:** This folder is "Version 2" of the website.

## THE ONE RULE (NON-NEGOTIABLE)

**ONE PAGE AT A TIME. NO EXCEPTIONS.**

The workflow for every page is:

```
1. AUDIT    — Read the current page. Compare against SPEC.md. List every deviation.
2. PLAN     — Present the full list of changes to the user. Wait for approval.
3. IMPLEMENT — Make ALL changes to that ONE page only. Touch no other page.
4. SERVE    — Start localhost. Tell the user to test.
5. WAIT     — User tests on localhost. User approves or requests fixes.
6. RECORD   — Update STATUS.md. Append to CHANGES.md. Mark page APPROVED.
7. REGRESS  — Before starting the next page, verify all previously-approved pages still work.
8. REPEAT   — Move to the next page. Go to step 1.
```

### What this means in practice:
- **NO global find-and-replace across all HTML files.** Ever.
- **NO "foundation" phase that touches multiple pages.** Each page gets its own full treatment.
- **NO starting a page without explicit user approval** ("go ahead", "start", "yes", etc.).
- **NO moving to the next page until the current page is APPROVED.**
- **NO modifying a previously-approved page** unless a regression is detected and confirmed.
- If a shared CSS/JS file must change for the current page, run the regression check on all approved pages BEFORE asking the user to test.

### Why this rule exists:
On 2026-04-23, a "Foundation" phase modified all 11 HTML files at once (font swap, CSS swap, scroll normalization). The result looked broken across every page. The user reverted everything and mandated this rule. It must never be violated again.

## Document Hierarchy

| Priority | Document | Purpose |
|---|---|---|
| 1 | **This file (CLAUDE.md)** | Rules and process. Read FIRST every session. |
| 2 | **STATUS.md** | Per-page tracker. What's done, what's next. |
| 3 | **SPEC.md** | Target spec. What every finished page must look like. |
| 4 | **PRD.md** | Architecture reference. Page structures, animation specs, content rules. |
| 5 | **CHANGES.md** | Append-only session log. What happened and when. |
| 6 | **components.html** | Canonical HTML for shared components. Copy from here. |
| 7 | **brand.css** | Design tokens. The target token system. |
| 8 | **design-brief.md** | Creative intent and emotional register. |

## Session Recovery Protocol

On session start:
1. Read this CLAUDE.md first.
2. Read STATUS.md — find the current page and its status.
3. Resume based on status:
   - **NOT STARTED** → Confirm with user before beginning. Do NOT auto-start.
   - **IN PROGRESS** → Continue from where left off.
   - **DONE — PENDING REVIEW** → Ask user if they've tested on localhost.
   - **APPROVED** → Move to next page (with user confirmation).
   - **REGRESSION** → Fix the regression first, get re-approval.
4. Never redo approved work. Never skip a page.

## Decision Log

| # | Decision | Date |
|---|---|---|
| 1 | V2 Replication strategy — build clean version in Finishing folder | 2026-04-23 |
| 2 | **Page-by-page only.** No global sweeps. Foundation phase reverted and abolished. | 2026-04-23 |
