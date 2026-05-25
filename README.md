# AI Startup Operations System

> Turn operational chaos into execution-ready outputs — in under 2 minutes.

## What it does

Startup and product teams generate a constant stream of messy, unstructured information: sprint meeting notes, customer interview recordings, founder brain dumps, GTM planning sessions. The problem isn't a lack of information — it's that converting that information into structured execution takes 45–90 minutes of manual synthesis every time.

This system takes raw operational input and generates a complete **Ops Pack** — 7 structured, execution-ready outputs — using AI synthesis.

### Input types supported
- Sprint / team meeting notes
- Customer interview notes
- Founder brain dump
- GTM planning session
- Product review

### Output pack (7 artifacts)
| Output | Description |
|--------|-------------|
| Executive Summary | 2–3 paragraph synthesis of the key context and situation |
| Key Decisions | Structured list with owner, status (Decided / Open / Recommended) |
| Action Items | Full table with task, owner, priority, function, and due timeframe |
| PRD Draft | Product requirements or feature brief in structured format |
| Risks & Open Questions | Categorized by severity (High / Medium / Low) |
| Stakeholder Update | Ready-to-share leadership summary |
| Follow-up Email | Draft email with subject line, ready to send or adapt |

---

## Quick start

```bash
# Clone or download the project
cd ai-ops-system

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open http://localhost:5173 in your browser.

**To demo immediately:** Click "Load sample" to populate a realistic set of messy notes, then click "Generate Ops Pack."

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | React 18 |
| Build tool | Vite |
| Styling | Tailwind CSS v3 |
| AI integration | Mock outputs (swap in Claude/OpenAI — see below) |
| Backend | None required |

---

## Connecting to a real AI model

The system is built to be API-ready. To connect Claude or OpenAI:

1. Add your API key to `.env`:
   ```
   VITE_ANTHROPIC_API_KEY=sk-ant-...
   ```

2. Install the SDK:
   ```bash
   npm install @anthropic-ai/sdk
   ```

3. Open `src/utils/generateOutputs.js` — the real API integration code is included as commented-out examples. Uncomment and adapt.

The prompt builder (`buildPrompt`) and JSON output schema are already defined in the file.

---

## Project structure

```
src/
├── App.jsx                   # Root layout + state management
├── components/
│   ├── InputPanel.jsx        # Input area: type selector, textarea, actions
│   ├── OutputDashboard.jsx   # Tab nav + all 7 output renderers
│   ├── ActionItemsTable.jsx  # Structured action items table
│   ├── ImpactEstimate.jsx    # Time saved + outputs count + next step
│   └── WorkflowMap.jsx       # Visual flow: input → synthesis → outputs → execution
├── data/
│   ├── sampleInputs.js       # 5 realistic messy input examples
│   └── mockOutputs.js        # 5 complete mock Ops Pack outputs
└── utils/
    └── generateOutputs.js    # AI synthesis layer (mock + real API hooks)
```

---

## Design principles

- **Internal tool feel** — dense information hierarchy, not a marketing site
- **Before/after clarity** — messy input on the left, structured output on the right
- **Scannable outputs** — tables, badges, and numbered lists over walls of prose
- **API-ready architecture** — drop in a real model with minimal code changes
