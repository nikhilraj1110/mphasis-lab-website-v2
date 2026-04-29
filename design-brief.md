# Design Brief — Mphasis AI & Applied Tech Lab Website

> This is NOT a spec. It is upstream creative intent.
> The spec lives in `brand.css` (tokens) and `components.html` (HTML patterns).
> This brief guides *taste* and *judgment* — the things tokens can't enforce.

---

## 1. Emotional Register

The website should feel like walking into a world-class research facility: **clean, precise, quietly confident**. Not flashy. Not startup-y. Not corporate. The vibe is a top-tier university lab that happens to do cutting-edge work — the design communicates rigor through restraint.

**Three words:** Rigorous. Alive. Warm.

- **Rigorous** — Clean typography, generous whitespace, precise alignment. Every pixel intentional. Georgia serif headlines ground the site in academic tradition.
- **Alive** — Subtle motion proves the lab is active. Scroll reveals, canvas animations, counter tallies. Nothing gratuitous — each animation says "we're producing, we're moving."
- **Warm** — Beige and cream tones from the Ashoka palette soften the academic precision. Real photos of real people. The site feels human, not clinical.

---

## 2. Visual References (3 Anchors)

When making design judgment calls, reference these three specific patterns:

### Reference A — MIT Media Lab (Structure)
The content-first, card-based, flat-nav academic layout. How they organize research groups, people directories, and project pages. Our *structural* model.

### Reference B — Impossible Bureau (Dark Sections)
The restrained use of dark backgrounds with atmospheric texture (dot grids, scan lines, subtle glow). How they make data feel cinematic without being decorative. Our model for *dark section treatment*.

### Reference C — Shift5 (Technical Typography)
The monospace/slab-serif accent typography for stats, labels, and system-indicator content. How technical credibility is communicated through type choices. Our model for *accent typography* (using Zilla Slab per Ashoka brand, not JetBrains Mono).

---

## 3. Page Emotional Payloads

| Page | Feeling | One Signature Element |
|---|---|---|
| **Home** | Awe, dynamism — "this lab is doing important work" | Hero canvas with neural network visualization + morphing text |
| **About** | Trust, warmth — "these are serious people with a clear mission" | Timeline of lab milestones |
| **Research** | Precision, depth — "rigorous academic work across many domains" | Pillar filter bar with live card filtering |
| **People** | Human, approachable — "real researchers, not stock photos" | Role-based directory with clean profile cards |
| **Publications** | Authority, credibility — "peer-reviewed, published, cited" | Year-grouped list with DOI links |
| **News** | Energy, momentum — "things are happening right now" | Date-tagged card feed |
| **Impact** | Pride, scale — "look what we've achieved" | Animated stat counters in dark section |
| **Makerspace** | Tactile, inventive — "where ideas become physical" | Equipment/facility showcase |
| **Contact** | Simple, direct — "here's how to reach us" | Clean form with map |

---

## 4. Cross-Page Unity Mandate (Non-Negotiable)

**Every page must feel like part of one continuous website — not a collection of separate pages.**

The audit found 3 incompatible systems running simultaneously (different fonts, different scroll models, different nav components). This is the #1 problem to solve.

### What "unity" means in practice:
- **Same fonts on every page.** Georgia headers, Open Sans body, Zilla Slab accents. If you navigate from Home to About and the typeface changes, the site is broken.
- **Same navigation on every page.** Floating menu button (bottom-left), floating search button (bottom-right), side panel with identical structure. If you open the menu on Research and it looks different from People, the site is broken.
- **Same color temperature.** Warm whites (#FFFFFF, #FBF3DF), navy blue (#0D3862), Ashoka red (#C4122F). No page should feel "colder" or "more corporate" than another.
- **Same scroll behavior.** Normal scroll everywhere. No snap-scroll on some pages and free-scroll on others. The user's muscle memory should work identically on every page.
- **Same section rhythm.** Eyebrow → heading → content. Same padding, same spacing scale, same card treatment. A card on the Impact page should be indistinguishable in style from a card on the Research page.
- **Same footer.** Identical HTML on every page. Not "similar" — identical.
- **Seamless transitions.** View Transitions API or at minimum consistent loading feel so navigation feels like moving through one space, not jumping between websites.

### The test:
Take a screenshot of any section from any page. Remove the text content. Can you tell which page it came from based on visual style alone? If yes, something is inconsistent. Every page's "chrome" (nav, footer, section patterns, card styles, typography) should be indistinguishable.

---

## 5. Scroll Pacing Rules

- **Hero sections:** Full viewport height. Canvas animation + text. Scroll DOWN to enter content.
- **Content sections:** Standard flow. Cards, text, lists. No scroll-jacking.
- **Dark sections (stats, spotlight):** Slightly taller padding (--space-24 top/bottom). Creates natural pause.
- **Between-section rhythm:** Alternate light → dark → light creates breathing room. Never stack 3+ light sections without a visual break.
- **No sticky/pinned sections.** No scroll hijacking. Native scroll always.

---

## 6. Content Prohibitions (Non-Negotiable)

1. **No budget or financial data.** No INR, Lakhs, Crore, allocation percentages, utilization data. Confidential.
2. **No work-in-progress language.** No "underway," "in progress," "planned," or future-tense claims. Only completed achievements.
3. **No granular ML metrics.** No R2, accuracy %, ROC-AUC, F1 scores. Descriptions must be accessible to general academic audiences.
4. **No fabricated content.** Every claim traceable to Source files or approved fact sheets.
5. **No stock photos.** Only real lab imagery.

---

## 7. Session-Resume Test (5 Questions)

At the start of every new session, Claude should verify these before making any changes:

1. **Font check:** Is `brand.css` imported and are pages rendering in Georgia (headers) + Open Sans (body)? Not Inter, not Barlow, not Manrope.
2. **Color check:** Is `--brand-red: #C4122F` and `--brand-blue: #0D3862` in the active stylesheet? No other primary colors.
3. **Component check:** Does the nav/footer/card HTML on this page match the canonical patterns in `components.html`?
4. **Content check:** Does any visible text contain budget figures, WIP language, or ML metrics?
5. **Alignment check:** Is all body text left-aligned? No centered paragraphs, no justified text.

If any check fails, fix it before proceeding with new work.

---

## 8. Brand Compliance Quick-Reference

| Rule | Source | Enforcement |
|---|---|---|
| Georgia for headers | Brand Guidelines p.11-14 | `--font-display` in brand.css |
| Open Sans for body | Brand Guidelines p.11 | `--font-sans` in brand.css |
| Zilla Slab for creative headers only | Brand Guidelines p.13 | `--font-creative` in brand.css |
| No Open Sans for headlines | Brand Guidelines p.11 | Manual review |
| No Zilla for body copy | Brand Guidelines p.13 | Manual review |
| Red #C4122F + Blue #0D3862 | Brand Guidelines p.16 | `--brand-red`, `--brand-blue` |
| Secondary colors complement, never replace | Brand Guidelines p.17-18 | Manual review |
| Body text left-aligned only | Brand Guidelines p.14 | `text-align: left` in brand.css |
| Never set body text in upper case | Brand Guidelines p.14 | `text-transform: none` in brand.css |
| Logo: no rotation, no stroke, no shadow | Brand Guidelines p.10 | Manual review |
| Logo: maintain clear space = "O" height | Brand Guidelines p.5 | Manual review |
| 12x12 grid foundation | Brand Guidelines p.21 | CSS grid system |

---

*This brief is ~2 pages. It governs taste. brand.css governs tokens. components.html governs structure. CLAUDE.md governs the project.*
