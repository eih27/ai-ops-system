# Flow Diagram Description
## Recreate in Canva, Figma, or Lucidchart

Use this as a blueprint. The diagram has two layers: a **system flow** (top) and an **output breakdown** (bottom).

---

## Layer 1 — System Flow (horizontal, left to right)

**Style:** Clean boxes with rounded corners. Neutral gray background. Arrows use a single arrowhead (→). One accent color (indigo/blue) for the AI step.

```
┌─────────────────┐      ┌──────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│                 │      │                  │      │                  │      │                 │
│  MESSY INPUT    │ ───▶ │  AI SYNTHESIS    │ ───▶ │ STRUCTURED       │ ───▶ │ TEAM EXECUTION  │
│                 │      │  (Claude / GPT)  │      │ OUTPUTS          │      │                 │
│ · Meeting notes │      │                  │      │ · 7 artifacts    │      │ · Assign tasks  │
│ · Interviews    │      │ Input type +     │      │ · Ready to share │      │ · Ship tickets  │
│ · Brain dumps   │      │ structured prompt│      │ · No reformatting│      │ · Close the loop│
│ · Sprint notes  │      │ → JSON output    │      │                  │      │                 │
└─────────────────┘      └──────────────────┘      └──────────────────┘      └─────────────────┘
     Gray box                Indigo box                 Gray box                  Gray box
     (slate-100)             (indigo-50)                (emerald-50)              (amber-50)
```

**Connecting arrows:** Medium weight, gray (#9CA3AF). Add a small label under the first arrow: "~45 min manual → 2 min AI"

---

## Layer 2 — Output Breakdown (below the flow, fanning out from "Structured Outputs")

**Style:** From the "Structured Outputs" box, draw 7 downward lines branching to output chips.

```
                               STRUCTURED OUTPUTS
                                      │
        ┌──────────┬──────────┬───────┴────────┬────────────┬────────────┬──────────────┐
        ▼          ▼          ▼                ▼            ▼            ▼              ▼
  ┌──────────┐ ┌────────┐ ┌───────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐
  │ Executive│ │  Key   │ │  Action   │ │   PRD    │ │  Risks   │ │Stakeholder│ │  Follow-up  │
  │ Summary  │ │Decisions│ │  Items   │ │  Draft   │ │  & Open  │ │  Update  │ │    Email    │
  │          │ │        │ │  (Table) │ │          │ │Questions │ │          │ │             │
  └──────────┘ └────────┘ └───────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────────┘
```

**Chip style:** Small rounded rectangles, light gray fill (#F8FAFC), dark text. Same width for all 7.

---

## Full diagram specs (for Figma/Canva)

| Element | Value |
|---------|-------|
| Background | #F8F9FA |
| Box fill (default) | #FFFFFF |
| Box border radius | 12px |
| Box border | 1px solid #E2E8F0 |
| AI step fill | #EEF2FF (indigo-50) |
| AI step border | #C7D2FE (indigo-200) |
| Font | Inter, 13–14px |
| Arrow color | #9CA3AF |
| Arrow weight | 1.5px |
| Layer 1 box width | ~200px |
| Layer 1 box height | ~110px |
| Gap between boxes | 40px |
| Layer 2 chip width | ~130px |
| Layer 2 chip height | ~56px |

---

## Optional: Add a "Time Saved" callout

Place a small annotation between Layer 1 and Layer 2:

```
┌─────────────────────────────────┐
│  ~45 min manual synthesis       │
│  → replaced by 2-min AI workflow│
│  7 structured outputs per run   │
└─────────────────────────────────┘
```

Style: dashed border, amber/yellow background (#FFFBEB), small italic text.

---

## Title block (top of diagram)

```
AI Startup Operations System
Turn operational chaos into execution-ready outputs.
```

Font: Inter Bold 20px for title, Regular 13px for subtitle. Left-aligned.
