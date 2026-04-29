# LLM Council Transcript — PRD Review
**Date:** 2026-04-23
**Question:** Review PRD.md for the website finishing pass. Is it the best implementation? What's missing for AI workflow? Does it enforce page-by-page execution with approval gates and session-resumable logging?

---

## Framed Question

A university lab manager has a 9-page vanilla HTML/CSS/JS website with 3 incompatible architectural systems (different fonts, scroll models, nav components across pages). He's written a 600-line PRD to guide Claude Code (AI assistant) through a finishing pass. Three questions:
1. Is the implementation approach good?
2. What's missing for multi-session AI workflow?
3. Does it enforce page-by-page execution with approval gates and session-resumable logging?

---

## Advisor Responses

### The Contrarian

The PRD has three problems that will break this in practice.

**The 11-script load stack is a trap.** Loading GSAP, ScrollTrigger, view transitions, custom cursor, and 6 other scripts on every page unconditionally means the Contact page — which needs none of this — pays the full performance cost anyway. No conditional loading logic, no page-specific script flags. You'll fail your own Lighthouse 90+ requirement on pages where these scripts do nothing.

**The CSS architecture will create a merge conflict on every session.** Replacing variables.css with brand.css sounds clean, but if Claude Code is working page-by-page across sessions, what happens when it updates brand.css in session 2 and a session 3 Claude touches a component that references a variable brand.css no longer defines? There's no contract — no locked variable manifest saying "these 47 tokens are frozen, do not rename or remove." Without that, each session rewrites the foundation slightly differently.

**The fatal missing piece: the PRD has no execution log with verified checksums.** You asked specifically whether there's a persistent log after every change so any new session can resume. The answer is no — there's a design-brief.md for "creative intent" and a checklist, but no append-only change log where each completed step records exactly what file was modified, what was changed, and a before/after hash. Without that, a new Claude session reads the PRD, sees "Phase 1 complete," and has no way to verify whether the previous session actually finished correctly or partially botched it. It will either redo completed work or — worse — skip verification and build on a broken foundation.

The PRD describes what to build. It doesn't describe how to verify each step actually worked.

---

### The First Principles Thinker

The PRD answers "how do we unify 9 pages" without asking "why are they diverging in the first place?"

The root cause is the architecture itself: standalone HTML files with copy-pasted shared elements are a divergence machine. Every session, every change, every AI-assisted edit creates drift. A finishing pass fixes the symptom once. The next 10 sessions recreate the problem.

What you're actually trying to solve is: **how do you maintain consistency in a no-build-tool environment across AI-assisted multi-session development?** The PRD doesn't solve this. It describes a cleanup sprint, not a prevention system.

The missing piece isn't in the 4 phases — it's a **constraint mechanism**. Without a build step, the only enforceable constraint is what Claude Code can verify before touching anything. That means: a machine-readable canonical reference file (not brand.css — an actual JSON or structured manifest) that Claude reads first every session and validates every file against before editing. brand.css can drift. A validation script cannot lie.

On the three questions directly:

1. The approach is correct but incomplete — unification without a drift-prevention mechanism just resets the clock.
2. What's missing: a session-start verification ritual. Claude needs a deterministic way to know the current state of every file before it writes anything. The PRD assumes Claude will read and remember — it won't, reliably, across sessions.
3. No. The PRD describes phases but not gates. "Phase complete" needs to mean: checklist verified, user signed off, state logged in a file Claude reads before resuming. Right now it's procedural intent, not enforced protocol.

The PRD is good engineering documentation. It's not a resilient AI workflow spec.

---

### The Expansionist

The PRD treats this as a cleanup problem. That's underselling it.

What's actually sitting here is a living institutional knowledge base. Nine pages of verified, source-traced content about a real research lab — publications, people, projects, impact metrics. The "finishing pass" framing makes it sound like patching drywall. But once this site is visually coherent and performant, it becomes something genuinely rare: a university lab site that's both aesthetically credible AND factually rigorous.

The upside nobody is naming: this workflow — PRD-driven, AI-executed, session-logged, approval-gated — is itself publishable. The lab manager has accidentally built a replicable methodology for small-team institutional web publishing using AI assistance. That's a paper, a talk, a workshop. Ashoka's other research centers would pay attention.

On the three questions:

The implementation approach is fine but conservative. The real question is whether the brand token system gets exported as a design artifact that outlives this project — a Figma-equivalent living style guide that future contributors (students, staff) can reference without touching code.

What's missing for multi-session AI workflow: a semantic diff log. Not just "page approved" but "what changed from baseline and why." After 20 sessions, the PRD will drift from reality. The log prevents that.

The approval gates are correct but incomplete. They gate on visual/functional completion. They don't gate on content accuracy regression — which is the lab's actual differentiator. Every merge should include a "did any verified fact change?" check.

The biggest undervalued move: publish this site's source code on GitHub with the PRD. Show other academic labs how to do this. That's a real contribution, not just a website.

---

### The Outsider

The PRD is over-engineered for the actual problem. You have 9 HTML files that need to share CSS and JS. The solution is: pick one page, make it right, extract the shared files, copy-paste the `<head>` block to the other 8. That's a Friday afternoon job. A 600-line document introduces a new problem: the AI now has to understand and follow the document correctly, which is harder than fixing the CSS.

What will go wrong across sessions: The AI will read the PRD, confidently say it understands, then make decisions that subtly contradict it — because 600 lines is a lot to hold in working memory while also editing code. You'll get "I followed the PRD" alongside a `<link>` tag pointing to the wrong stylesheet.

The tracker/log idea is the one genuinely good thing here. A short, plain-English status file — "Page 3 done, Page 4 is next, here's what 'done' means: these 3 files in the `<head>`, this nav HTML, no inline styles" — is actually useful. It survives session boundaries because it's explicit state, not assumed context.

But the approval gate design has a hidden flaw: if the AI breaks something on Page 4 that was already fixed on Page 2, you won't catch it until much later. The AI doesn't automatically recheck prior work.

The real risk nobody mentions: the AI will hallucinate that it's done when it isn't. "Page updated per PRD" with one file still missing. You need a mechanical checklist — literally count the `<link>` tags — not prose confirmation. Trust the diff, not the summary.

---

### The Executor

The 4-phase structure is wrong for your actual requirement. You said page-by-page with approval gates — that's not what you have. Fix it before handing to Claude Code.

**The actual execution order:**

Start with `index.html` — it's the most complex, most visible, and sets the pattern. If you get it wrong, you'll repeat the mistake 8 times. Then `pages/about.html`, `pages/people.html`, `pages/research.html` — the high-traffic pages. Leave `pages/contact.html` and any lightweight pages for last.

**The gaps that will kill multi-session execution:**

1. No change log file. Create `CHANGES.md` at the repo root. Every session writes: page name, what was changed, what was skipped, what needs user decision. Without this, Claude Code session 3 has no idea what session 2 actually did.

2. No explicit "done" state per page. The PRD tracks phases, not pages. Add a status table: `| Page | Foundation | Structural | Components | Polish | Approved |` — Claude Code checks this first, every session.

3. Approval gate mechanics are undefined. Specify exactly: user runs `python -m http.server` locally, checks the page, replies "approved" or lists issues. Don't leave it vague.

**What to do Monday:**

1. Add the status table to your PRD right now.
2. Create `CHANGES.md` as an empty file with headers.
3. Instruct Claude Code: "Read CHANGES.md first. Update it after every page. Stop and wait for approval after each page."

That's it. The phases can stay — they just get applied per-page, not site-wide.

---

## Peer Reviews

### Anonymization Mapping
- Response A = The Contrarian
- Response B = The First Principles Thinker
- Response C = The Expansionist
- Response D = The Outsider
- Response E = The Executor

### Review 1

**Strongest: B (First Principles).** It identifies the structural root cause — standalone HTML as a divergence machine — rather than treating symptoms. The canonical machine-readable reference point (validation script vs. brand.css) is the only advice here that survives across sessions without human vigilance.

**Biggest blind spot: C (Expansionist).** It romanticizes the workflow ("publishable methodology," "open-source template") instead of solving the actual problem. Worse, it never addresses how approval gates fail to catch content accuracy regression — it names the gap but offers no fix.

**What all five missed:** The council treated this as a software engineering problem. It's not — it's a *context window* problem. Claude Code in session 6 has no reliable memory of sessions 1–5. The PRD's 600 lines compete with the actual file contents for context budget. When both are loaded, something gets dropped — usually the constraints. None of the advisors said the obvious: the PRD should be split into two documents — a permanent invariant spec (rules that never change) and a mutable session log (what's done, what's next, exact file states). The invariant spec stays short enough to always fit in context. The session log is read first, written last. That's the missing architecture.

### Review 2

**Strongest: E (Executor).** E directly answers all three questions with specificity: identifies the phase/page mismatch, names the three concrete gaps (CHANGES.md, per-page status table, approval mechanics), and provides actionable next steps. It's the only response that maps to the actual operational problem of multi-session AI workflow.

**Biggest blind spot: C (Expansionist).** C praises the PRD as "publishable methodology" and pivots to suggesting the user publish it as a template. This completely misses the point — the PRD has real structural gaps that C glosses over. It's the only response that doesn't identify a concrete flaw.

**What all five missed:** The cross-page consistency problem is a *data problem*, not a workflow problem. All five focus on process mechanics (logs, checklists, phases) but none address the root cause: there's no machine-readable canonical state file that an AI session can load to know the *exact expected value* of every cross-page element (metrics, nav links, footer text, etc.) before touching anything. Without a single source of truth that the AI validates against before and after each edit, no amount of logging or approval gates prevents drift. The PRD needs a canonical-values manifest, not just a better checklist.

### Review 3

**Strongest: E (Executor).** It directly answers all three questions, maps gaps to the actual structure described (page-by-page execution, approval gates, session resumability), and delivers concrete next steps. Response D is second — the warning about AI hallucinating "done" and cross-page regression is the most operationally important insight in the set.

**Biggest blind spot: C (Expansionist).** It reframes the PRD as a "publishable methodology" and suggests open-sourcing it — completely irrelevant to the user's problem. It's the only response that fails to identify a concrete workflow gap or offer a fix. Response B is close behind: "standalone HTML is a divergence machine" is true but offers no actionable remedy.

**What all five missed:** The approval gate problem is human, not mechanical. Every response treats logging, checklists, and manifests as the solution — but none addresses the actual failure mode: the user approves a page, the AI moves on, and a later edit silently reverts a prior approval. What's needed is a **re-validation step before each new page starts** — not just logging what was done, but confirming prior pages are still in the approved state. Without that, a CHANGES.md or status table is just documentation of drift, not prevention of it.

### Review 4

**Strongest: E (Executor).** Directly answers all three questions. Identifies the structural mismatch (4-phase vs page-by-page), names the three concrete gaps, and provides actionable next steps. It's the only response that operationalizes its critique.

**Biggest blind spot: C (Expansionist).** Praises the PRD and pivots to meta-commentary rather than solving the problem. It treats a workflow problem as an academic contribution.

**What all five missed:** The actual bottleneck is approval gate definition. All five assume "user approves" is a meaningful checkpoint, but none define what approval means mechanically: who signs off, what constitutes a passing state, and how a new AI session *verifies* that a gate was actually passed (not just claimed in a log). Without a machine-checkable approval artifact — a committed diff, a signed status row, a dated hash — approval gates are prose fiction. The entire multi-session resumability collapses on this single missing definition.

### Review 5

**Strongest: E (Executor).** It directly answers all three questions, maps gaps to the actual structure, and delivers concrete next steps. It's the only response that actually addresses the session-resumable logging question specifically.

**Biggest blind spot: C (Expansionist).** It pivots to "this is publishable methodology" — a non-answer. The user needs a working AI workflow, not a career move. It misses the operational failure modes entirely.

**What all five missed:** The approval gate mechanics for a human-AI loop are undefined across all responses. None address the core failure mode: the AI marks something "done," the user approves it, a later page edit silently breaks the earlier page, and there's no regression check triggered. This is the actual multi-session risk — not just logging what changed, but detecting when a "done" page becomes undone. A per-page hash or visual diff snapshot at approval time, checked at session start, would close this. Response A gestures at checksums but doesn't operationalize it. The others ignore it entirely.

---

## Chairman's Verdict

### Where the Council Agrees

**The PRD is good documentation but a poor AI workflow spec.** Every advisor, from different angles, arrived at the same conclusion: the 600-line document tells Claude *what* the website should look like but not *how to verify it got there* or *how to resume safely*. The Contrarian calls it "no execution log with verified checksums." First Principles calls it "not a resilient AI workflow spec." The Executor calls it "undefined approval mechanics." The Outsider says "the AI will hallucinate 'done.'" They are all describing the same gap: the PRD assumes a single continuous worker with perfect memory, but the actual execution environment is stateless sessions with bounded context windows.

**Page-by-page execution with approval gates is the correct model, and the PRD does not implement it.** The Executor identified this most clearly, and four out of five peer reviews ranked the Executor strongest. The current phase structure (Phase 1: all CSS, Phase 2: all JS, etc.) cuts across pages horizontally. The user's actual need is vertical: finish index.html completely, get approval, then move to about.html. The PRD's phasing fights the approval-gate requirement.

**Cross-page regression is the real risk.** Fixing page 4 can break page 2. The Outsider named it, First Principles explained why (copy-pasted shared elements are a divergence machine), and three peer reviews independently flagged that no advisor proposed regression detection. When you unify nav markup across 9 pages, changing the shared CSS for page 6's layout can silently break page 3's.

### Where the Council Clashes

**How much infrastructure to build before touching HTML.**

The Outsider says: stop over-engineering, pick one page, make it right, copy the pattern. The First Principles Thinker says: build a constraint mechanism first (a validation script, a canonical reference) or the divergence recreates itself. The Executor sits between them: add a status table and change log, then start working.

They disagree because they're optimizing for different risks. The Outsider optimizes against analysis paralysis — the lab manager has a working website and needs it finished, not re-architected. First Principles optimizes against entropy — without structural constraints, session 4 undoes session 2's work. Both risks are real. The answer depends on how many sessions this will take. If it is 3-4 sessions, the Outsider is right: just do it carefully. If it is 10+, First Principles is right: you need guardrails or you will lose ground.

Given the scope (9 pages, 3 architectural systems to unify, approval gates between each), this is realistically 5-9 sessions. That is enough to need lightweight verification but not enough to justify a full validation framework.

**Whether the 600-line PRD is an asset or a liability.**

The Outsider says it competes with file contents for context budget and should be radically shortened. The Expansionist says it is a strength — rare rigor for an academic site. Peer Review 1 splits the difference: separate the invariant spec (short, always loaded) from the mutable session log. This is the correct resolution. The PRD's design decisions, content rules, and pillar definitions are valuable reference material. The session-management instructions need to be extracted into a short, machine-readable format that does not burn 600 lines of context on every turn.

### Blind Spots the Council Caught

**No machine-readable canonical state.** Peer Review 2 flagged this and no advisor addressed it directly. The nav links, footer text, metric numbers (25+ projects, 30+ publications, 27+ faculty) appear on multiple pages. There is no single-source-of-truth file that defines these values. When a metric changes, you have to find and update every page. A simple JSON or JS constants file that every page imports would eliminate an entire class of cross-page inconsistency bugs.

**Approval gates have no verification mechanism.** Peer Review 4 was sharp on this: "Without machine-checkable approval artifacts, gates are prose fiction." The PRD says "user approves each phase" but a new Claude session has no way to confirm whether the user actually approved page 3 or whether the previous session just wrote "APPROVED" in the tracker. A lightweight solution: the user writes a one-line confirmation in a log file, timestamped, that the next session reads.

**Re-validation before starting new work.** Peer Review 3 caught this: before touching page 5, confirm pages 1-4 are still in their approved state. Without this, regression is invisible until the user notices it manually, possibly after several more pages have been "finished."

### The Recommendation

**Restructure the PRD into three documents, then execute page-by-page starting with index.html.**

**Document 1: SPEC.md (invariant, ~100 lines).** The canonical reference. Design tokens, font stack, nav structure, shared component markup patterns, metric values, content rules (no budget data, no WIP language). This is the contract. Claude reads it at session start and validates against it. It never changes mid-session.

**Document 2: STATUS.md (mutable, ~30 lines).** A per-page status table with columns: Page | Status | Session Date | Verified By. Statuses are NOT STARTED, IN PROGRESS, DONE-PENDING-REVIEW, APPROVED. Claude reads this first, updates it last. Each "APPROVED" row includes a list of shared elements present (nav version, footer version, font stack) so the next session can mechanically verify nothing regressed.

**Document 3: CHANGES.md (append-only log).** Every session appends what it changed, which files it touched, and what it left for next time. This is the Executor's gap-fill and the Contrarian's execution log combined.

**Execution order:** index.html first (most complex, sets all patterns), then about.html, research.html, people.html, publications.html, impact.html, makerspace.html, news.html, contact.html last (simplest). One page per approval gate. Before starting each page, Claude checks that all previously-approved pages still match SPEC.md's shared elements.

**On the 11-script problem:** the Contrarian is right. Do not load GSAP ScrollTrigger on Contact. Use a simple conditional loading pattern — a `data-features` attribute on `<body>` that controls which scripts load. This is 20 minutes of work and directly protects the Lighthouse 90+ target.

### The One Thing to Do First

Create SPEC.md. Extract from the current PRD the exact shared elements every page must have: the `<head>` block (fonts, meta, CSS load order), the nav HTML markup, the footer HTML markup, the script loading pattern, and the canonical metric values. Make it short enough that Claude can hold it in context alongside an entire page's HTML. Until this file exists, every session is guessing at what "consistent" means — and each will guess differently.

---

*Council convened: 2026-04-23 | 5 advisors + 5 peer reviews + chairman synthesis*
*Counciled: PRD.md for website finishing pass*
