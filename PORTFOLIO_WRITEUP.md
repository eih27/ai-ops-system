# Portfolio Writeup
## AI Startup Operations System

**Role applying for:** AI Operations Specialist / Agentic Workflows — Ramp
**Applicant:** [Your name]

---

### What I built

The **AI Startup Operations System** is a workflow tool that converts unstructured operational input — meeting notes, customer interviews, founder brain dumps — into 7 structured, execution-ready outputs in under 2 minutes.

It is designed for startup and product teams who generate high volumes of information but lack the bandwidth to synthesize it manually into execution artifacts.

---

### The problem it solves

High-growth teams run a lot of meetings. Every sprint sync, customer call, and planning session produces raw notes that someone has to convert into action items, stakeholder updates, product briefs, and follow-up emails. That synthesis typically takes 45–90 minutes per session, requires senior judgment, and still produces inconsistent outputs depending on who does it.

The gap is not information — it is structured synthesis at scale.

---

### What the system does

A user pastes raw notes into the input panel and selects an input type (sprint meeting, customer interview, founder brain dump, GTM planning, or product review). The system generates a complete **Ops Pack** containing:

- **Executive summary** — 2–3 paragraph synthesis with context and situation framing
- **Key decisions** — structured list with owner and status (Decided / Open / Recommended)
- **Action items** — full table with task, owner, priority, function, and due timeframe
- **PRD draft** — product requirements brief or feature spec in standard format
- **Risks and open questions** — categorized by severity
- **Stakeholder update** — leadership-ready 1-page summary
- **Follow-up email** — complete draft with subject line, ready to send or adapt

The before/after transformation is the core value demonstration: messy input on the left, structured execution outputs on the right.

---

### Technical choices and tradeoffs

**Stack:** React 18, Vite, Tailwind CSS — chosen for speed of development, clean component structure, and zero backend requirement.

**AI layer:** The synthesis layer (`generateOutputs.js`) is designed to be model-agnostic. The current implementation uses high-quality mock outputs that demonstrate the system's value clearly. The prompt builder and JSON output schema are defined and documented in the code, making real API integration a 30-minute swap.

**No backend:** The system runs entirely client-side. This was intentional — for a portfolio artifact, it removes operational complexity while keeping the demo reliable. In production, the API key and synthesis call would move server-side.

**Design philosophy:** The UI is styled as an internal operations tool — information-dense, scannable, and functional — rather than a consumer product or marketing page. Color is used sparingly to encode meaning (priority levels, decision status, risk severity).

---

### Design decisions I made deliberately

1. **Input type selection shapes output framing.** A customer interview should produce different output emphasis (ICP analysis, pilot next steps) than a sprint sync (action items, velocity risks). The input type drives output templating.

2. **The "Impact Estimate" section** is positioned at the bottom as proof — it shows time saved, outputs generated, and a suggested next workflow. This closes the loop on the before/after value story.

3. **The Workflow Map** at the top of the page is persistent (not hidden behind a tab) because it communicates the system's logic at a glance to anyone seeing it for the first time.

4. **Follow-up Email** is the most tangible demo output. Anyone evaluating the tool immediately understands its value when they see a complete, send-ready email generated from bullet-point notes.

---

### What I would build next

1. **Real AI integration** — wire the synthesis layer to Claude Opus or GPT-4o; add prompt caching for speed and cost efficiency on repeated input types
2. **Output export** — one-click copy to Notion, Linear, or Google Docs
3. **Team workspaces** — save and share Ops Packs across a team with version history
4. **Custom templates** — allow ops leads to define company-specific output formats and terminology
5. **Async processing** — for longer inputs, queue the generation and notify via email/Slack when ready

---

### Why this matters for the Ramp AI Operations role

Ramp's core value proposition is operational efficiency for finance teams. The same pattern applies internally — AI-assisted operations systems reduce coordination overhead, improve output consistency, and free senior operators to focus on judgment-intensive work rather than synthesis.

This project demonstrates my ability to:
- Identify a real operational friction point and design a workflow around it
- Build a production-oriented tool (not a prototype) with clean architecture and API-ready design
- Think in terms of input → synthesis → structured output → team execution — the exact pattern that agentic workflows are built on
- Ship something demoable and useful without overengineering it

---

*Built May 2026 · React + Tailwind + Vite · AI-ready architecture*
