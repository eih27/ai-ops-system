// Mock AI-generated outputs — one complete set per input type.
// In production, replace generateOutputs() with real API calls to Claude/OpenAI.
// Each output shape: { summary, decisions, actionItems, prd, risks, stakeholderUpdate, followUpEmail }

export const MOCK_OUTPUTS = {
  'sprint-meeting': {
    summary: `Sprint 3 (Q2) surfaced three high-severity issues that must be resolved before the Sequoia meeting on June 15: an API timeout bug blocking enterprise customers on the /v2/reports endpoint, dashboard latency exceeding 8 seconds on large datasets, and a 12% month-over-month churn increase driven primarily by performance feedback.

The team has approximately three weeks to stabilize core infrastructure, deliver the bulk export feature for the investor demo, and advance onboarding design. An unexpected AWS cost spike ($47k vs. $28k prior month) requires investigation before the board call. Three decision items remain unresolved: mobile vs. web prioritization, V2 launch date, and the engineering hiring timeline.

Overall sprint health: amber. Revenue-blocking issues are identified and assigned, but execution risk is elevated given resource constraints and an open headcount gap.`,

    decisions: [
      {
        id: 1,
        decision: 'API timeout fix is P0 — assign to Sarah immediately; blocks enterprise revenue.',
        owner: 'Sarah (Eng Lead)',
        status: 'Decided',
      },
      {
        id: 2,
        decision: 'Bulk export feature is P1 — required for Sequoia demo by June 10.',
        owner: 'John + Sarah',
        status: 'Decided',
      },
      {
        id: 3,
        decision: 'Mobile vs. web prioritization deferred — John and Sarah to align offline by Tuesday.',
        owner: 'John, Sarah',
        status: 'Open',
      },
      {
        id: 4,
        decision: 'V2 launch date to be confirmed next sync after Sarah finalizes engineering estimate.',
        owner: 'Sarah, John',
        status: 'Open',
      },
      {
        id: 5,
        decision: 'HR to post two backend engineering roles by Friday — Tom to follow up.',
        owner: 'Tom (CFO)',
        status: 'Decided',
      },
      {
        id: 6,
        decision: 'Standup time moves from 9am to 10am starting next week.',
        owner: 'All',
        status: 'Decided',
      },
    ],

    actionItems: [
      { task: 'Fix /v2/reports 504 timeout bug — enterprise customers blocked', owner: 'Sarah', priority: 'High', function: 'Engineering', dueTimeframe: '48 hours' },
      { task: 'Root-cause dashboard 8s load time on large datasets', owner: 'Sarah', priority: 'High', function: 'Engineering', dueTimeframe: '3 days' },
      { task: 'Build and QA bulk export MVP for Sequoia demo', owner: 'John, Sarah', priority: 'High', function: 'Product / Eng', dueTimeframe: 'June 10' },
      { task: 'Complete onboarding design review and collect team feedback', owner: 'Amy', priority: 'Medium', function: 'Design', dueTimeframe: 'Friday' },
      { task: 'Investigate $47k AWS cost spike — identify root cause', owner: 'Tom, Sarah', priority: 'High', function: 'Finance / Eng', dueTimeframe: '1 week' },
      { task: 'Post two backend engineer job listings', owner: 'Tom (HR follow-up)', priority: 'Medium', function: 'Operations', dueTimeframe: 'Friday' },
      { task: 'Compile and share last month\'s user research findings', owner: 'John', priority: 'Medium', function: 'Product', dueTimeframe: 'Monday' },
      { task: 'Draft mobile vs. web prioritization brief for exec decision', owner: 'John', priority: 'Medium', function: 'Product', dueTimeframe: 'Tuesday' },
      { task: 'Share churn drivers analysis with product and eng', owner: 'Lisa', priority: 'Medium', function: 'Customer Success', dueTimeframe: 'Monday' },
    ],

    prd: `## Feature Brief: Bulk Data Export (MVP)

**Status:** Approved for development | **Target:** June 10 (Sequoia demo)

### Problem Statement
Enterprise users need to export large datasets for offline analysis and reporting. Current manual exports are limited to 1,000 rows, forcing users to run multiple sessions. This is a top-3 requested feature and a known blocker in enterprise sales conversations.

### Success Metrics
- Export job completes in <60 seconds for datasets up to 100,000 rows
- Feature adopted by ≥80% of enterprise accounts within 30 days of launch
- Reduces CS tickets related to data export by 70%

### MVP Scope (June 10)
- CSV and Excel (.xlsx) export formats
- Async job processing — user receives email when export is ready
- Export covers: last 90 days of data with applied filters
- Job status indicator in the UI (queued → processing → ready)
- Download link valid for 72 hours

### Out of Scope (V2)
- Custom column selection
- Scheduled / recurring exports
- PDF export
- API-triggered exports

### Technical Notes
- Async job queue (recommend BullMQ or similar)
- Export files stored in S3 with pre-signed URLs
- Background worker process (separate from API server)
- Estimated effort: 6–8 engineering days`,

    risks: [
      { description: 'Sequoia meeting timeline at risk if API bugs are not resolved and demo environment is unstable by June 12.', severity: 'High' },
      { description: 'Churn acceleration — 12% MoM increase may compound if dashboard performance is not visibly improved this sprint.', severity: 'High' },
      { description: 'AWS cost overrun ($47k/month) is unsustainable at current growth rate; root cause is unknown and may indicate a systemic issue.', severity: 'High' },
      { description: 'V2 launch date ambiguity is creating planning uncertainty across engineering, product, and marketing.', severity: 'Medium' },
      { description: 'Engineering capacity is constrained — 2 open headcount positions may slow Q3 delivery if not filled by end of May.', severity: 'Medium' },
      { description: 'Bulk export MVP scope may slip if API bug fix takes longer than 48 hours.', severity: 'Medium' },
    ],

    stakeholderUpdate: `**Sprint 3 Leadership Update — Week of May 22**

Three priority issues are being addressed ahead of our June 15 Sequoia meeting:

1. **API reliability (P0):** A timeout bug affecting enterprise customers on the /v2/reports endpoint was identified Monday. Sarah is on it; fix expected within 48 hours.

2. **Bulk export feature (P1):** Development begins this week. Target: demo-ready by June 10, giving us buffer before the meeting.

3. **Dashboard performance:** Root-cause investigation in progress. Timeline: 3 days to diagnosis, fix scoped to this sprint.

**Churn signal:** Customer Success flagged a 12% MoM increase, with "too slow / too buggy" as the top exit reason. Our sprint priorities directly address this — we'll track whether the fixes move the needle.

**Financial note:** AWS spend spiked to $47k last month (from $28k). Tom and Sarah are investigating before the board call.

**Hiring:** Two backend engineering roles to be posted by Friday.

Next sync: Tuesday, 10am. Mobile/web prioritization and V2 launch date to be finalized.`,

    followUpEmail: {
      subject: 'Sprint 3 Priorities + Action Items — Please Review',
      body: `Hi team,

Thanks for a focused sync. Here's what we're executing on:

**THIS WEEK (high priority):**
→ Sarah: Fix /v2/reports timeout — enterprise customers are blocked
→ Sarah: Begin dashboard latency investigation
→ Tom + Sarah: AWS cost spike root cause
→ Tom: Follow up with HR on engineering job posts (by Friday)
→ Amy: Onboarding design feedback collection (by Friday)

**BY JUNE 10:**
→ John + Sarah: Bulk export MVP, demo-ready for Sequoia

**DECISIONS STILL OPEN (need resolution by Tuesday):**
→ Mobile vs. web prioritization — John and Sarah to align offline
→ V2 launch date — confirm after Sarah's updated eng estimate

**FYI:** Churn is up 12% this month, primarily driven by performance feedback. The API and dashboard fixes this sprint are directly targeted at this. Lisa will share the full breakdown Monday.

Standup moves to 10am starting next week.

Reply if anything is unclear.

Best,
[Your name]`,
    },

    impactEstimate: {
      timeSaved: '~50 minutes',
      outputsGenerated: 7,
      nextWorkflow: 'Share Stakeholder Update with leadership, then assign action items in Linear/Jira',
    },
  },

  // ─── Customer Interview ─────────────────────────────────────────────────────

  'customer-interview': {
    summary: `Interview with Marcus Chen, VP Operations at ScaleFast (Series B, ~200 employees) reveals a strong product-market fit signal for an operations intelligence platform targeting post-Series A companies. Marcus's team spends 6+ hours per week on manual reporting, uses four or more disconnected tools, and faces a recurring board prep burden of 2 days per month.

Key insight: Marcus's core pain is information fragmentation, not lack of automation. He needs a single source of truth for leadership visibility — and he needs it without a multi-month implementation. He expressed willingness to pay $2,000–$3,000/month, significantly above current pricing, which he flagged as a trust concern ("makes me nervous about company survival").

This is a qualified, high-intent prospect. Two blockers to closing: (1) proof of reliability (he's been burned by over-promised tools) and (2) SOC2 certification requirement. Recommend moving Marcus into a structured pilot program with a defined success metric: board deck in under 30 minutes.`,

    decisions: [
      { id: 1, decision: 'Initiate a structured pilot with ScaleFast using a defined success metric: board deck prep time <30 minutes.', owner: 'Sales / CS', status: 'Recommended' },
      { id: 2, decision: 'Accelerate SOC2 certification — this is a hard requirement for Marcus\'s procurement process.', owner: 'Engineering / Legal', status: 'Open' },
      { id: 3, decision: 'Re-evaluate pricing floor — current price point signals financial risk to enterprise buyers; consider $799–$999/seat or team tier.', owner: 'CEO / Sales', status: 'Open' },
      { id: 4, decision: 'Prioritize native integrations over replacement — Marcus explicitly wants to connect existing tools, not swap them.', owner: 'Product', status: 'Recommended' },
      { id: 5, decision: 'Add "time to board deck" as a customer success metric; use it in case study + sales materials.', owner: 'Marketing / CS', status: 'Recommended' },
    ],

    actionItems: [
      { task: 'Send Marcus pilot program proposal with defined success metrics and 30-day timeline', owner: 'Priya / Sales', priority: 'High', function: 'Sales', dueTimeframe: '48 hours' },
      { task: 'Document SOC2 requirements and create roadmap to certification', owner: 'Engineering', priority: 'High', function: 'Engineering / Legal', dueTimeframe: '2 weeks' },
      { task: 'Map Marcus\'s current tool stack (Notion, Sheets, Linear, Slack) — confirm all are on integration roadmap', owner: 'Product', priority: 'High', function: 'Product', dueTimeframe: '1 week' },
      { task: 'Create case study template using "hours saved / board prep time" as headline metrics', owner: 'Marketing', priority: 'Medium', function: 'Marketing', dueTimeframe: '2 weeks' },
      { task: 'Schedule pricing strategy review — test $799/seat or team tier with 3 other enterprise prospects', owner: 'CEO, Sales', priority: 'Medium', function: 'Sales / Strategy', dueTimeframe: '1 week' },
      { task: 'Build ICP profile from Marcus interview — add to CRM and refine ideal customer definition', owner: 'Sales Ops', priority: 'Medium', function: 'Sales Operations', dueTimeframe: '3 days' },
      { task: 'Pull 3 other customers with similar profile to ScaleFast for comparison analysis', owner: 'CS / Data', priority: 'Low', function: 'Customer Success', dueTimeframe: '2 weeks' },
    ],

    prd: `## Feature Brief: Executive Reporting Dashboard (Board Deck Automation)

**Trigger:** Customer interview with ScaleFast VP Ops (May 20) | **Priority:** P1 — recurring ask from enterprise segment

### Problem Statement
Operations leaders at Series A/B companies spend 2+ days per month preparing board-level reporting, stitching together data from Salesforce, Notion, Google Sheets, and financial systems. The synthesis is manual, error-prone, and pulls senior ops resources away from execution.

### Opportunity
If we can reduce board deck prep from 2 days to <30 minutes, this becomes a category-defining value proposition for VP Ops and CFO buyers.

### Success Metrics
- Board deck generation (template → populated deck) in <30 minutes
- Customer-reported hours saved per month: ≥10 hours for ops lead
- Feature becomes a top-3 reason for purchase (measured in win/loss interviews)

### MVP Scope
- Pre-built board deck template (6 slides: Pipeline, Headcount, Revenue, Burn, Key Risks, Next Quarter)
- Auto-populate from connected data sources (CRM, HRIS, Finance)
- One-click export to Google Slides or PowerPoint
- Data freshness indicator (last synced timestamp)

### Out of Scope (V2)
- Custom slide templates
- Real-time collaboration
- Investor portal / external sharing

### Enterprise Requirements (from interview)
- SOC2 Type II certification (hard requirement for procurement)
- Custom contract support
- SSO/SAML authentication`,

    risks: [
      { description: 'SOC2 certification is a hard blocker for ScaleFast and likely all enterprise prospects — without it, deals will stall at procurement.', severity: 'High' },
      { description: 'Current pricing ($499/seat) is below market expectations for enterprise; Marcus flagged it as a credibility concern, not a value concern.', severity: 'High' },
      { description: 'Marcus has been burned by over-promised tools — if pilot does not deliver clear value quickly, we lose a high-value reference customer.', severity: 'Medium' },
      { description: 'Integration scope risk: if Notion, Linear, or Salesforce connectors are not reliable, the "single source of truth" promise breaks immediately.', severity: 'Medium' },
      { description: 'Open question: how many other enterprise prospects share the same SOC2 / procurement bottleneck? May be systemic.', severity: 'Medium' },
    ],

    stakeholderUpdate: `**Customer Interview Debrief — ScaleFast (Series B)**

We interviewed Marcus Chen, VP Operations at ScaleFast, on May 20. This is a high-signal conversation.

**What we learned:** Marcus's team uses 4+ tools and spends 6+ hours/week on manual reporting. His #1 pain: "information fragmentation." He's willing to pay $2–3k/month for something that works — significantly above our current price point.

**Key unlock:** If we can get him his board deck in 30 minutes instead of 2 days, he's a buyer. He said it explicitly.

**Two blockers to close:** (1) He needs proof of reliability — he's been burned before. Recommend a structured pilot with a clear success metric. (2) SOC2 is a hard procurement requirement.

**Recommended next steps:** Pilot proposal within 48 hours. SOC2 roadmap initiated. Pricing strategy review scheduled.`,

    followUpEmail: {
      subject: 'Great conversation — here\'s what we\'re thinking for next steps',
      body: `Hi Marcus,

Thanks for the time today — genuinely useful conversation. The "information fragmentation" framing resonated with us, and we think your board deck pain point is exactly the use case we're built for.

Here's what I'd propose as a next step: a 30-day structured pilot with a single success metric — getting your monthly board deck from 2 days to under 30 minutes.

We'll handle the integration setup, provide a dedicated onboarding contact, and check in weekly to make sure you're seeing real value.

A few things we'll also have ready for you:
- A clear integration plan for Notion, Linear, Sheets, and Slack
- Our SOC2 timeline (we know this matters for your procurement)
- A team pricing option that may be a better fit than per-seat

Would a 30-minute call this week work to align on the pilot structure?

Best,
[Your name]`,
    },

    impactEstimate: {
      timeSaved: '~35 minutes',
      outputsGenerated: 7,
      nextWorkflow: 'Send pilot proposal to prospect, then update CRM and ICP documentation',
    },
  },

  // ─── Founder Brain Dump ─────────────────────────────────────────────────────

  'founder-brain-dump': {
    summary: `This brain dump captures a high-anxiety Sunday review with revenue at $1.2M ARR (target: $2M by year-end) and multiple competing strategic priorities creating decision paralysis. Three interlocking tensions dominate: (1) enterprise deals stalling at legal/procurement vs. self-serve CAC too high, (2) engineering pulled into custom work vs. mounting product debt, and (3) SMB vs. enterprise ICP ambiguity causing downstream confusion in sales and marketing.

The most time-sensitive issues are team retention (Claire's engineering attrition risk), the board meeting in 6 weeks, and the fundraising timing decision. The business is not in crisis, but it is at an inflection point where unresolved strategic ambiguity is starting to compound into execution drag.

Recommended framing for the week: resolve the ICP decision first, as it unblocks pricing, hiring, and roadmap simultaneously.`,

    decisions: [
      { id: 1, decision: 'ICP clarification: choose enterprise-primary (50–500 employees) or SMB-primary — this decision gates pricing, sales motion, and roadmap.', owner: 'CEO', status: 'Open — P0' },
      { id: 2, decision: 'Address Claire (eng) retention immediately — 1:1 this week, comp/title review, and visibility into roadmap she\'s excited about.', owner: 'CEO', status: 'Urgent' },
      { id: 3, decision: 'Mobile: formally park mobile in backlog until after V2 stabilization — communicate to team and customers clearly.', owner: 'CEO, Product', status: 'Recommended' },
      { id: 4, decision: 'Tech debt: approve a 2-week stabilization sprint in Q3 — this is insurance, not luxury, given performance-driven churn.', owner: 'CEO, Eng Lead', status: 'Recommended' },
      { id: 5, decision: 'Fundraising timing: evaluate whether raising Series A now vs. in 6 months optimizes leverage — requires revenue trajectory and burn rate analysis.', owner: 'CEO, CFO', status: 'Open' },
      { id: 6, decision: 'Head of Sales performance review: 30-day improvement plan or transition — delay is compounding revenue risk.', owner: 'CEO', status: 'Open — sensitive' },
      { id: 7, decision: 'API access monetization: add to Q3 roadmap as potential expansion revenue — 3 customer requests is a signal.', owner: 'Product, CEO', status: 'Recommended' },
    ],

    actionItems: [
      { task: 'Schedule 1:1 with Claire (eng) — address retention risk before end of week', owner: 'CEO', priority: 'High', function: 'People / Leadership', dueTimeframe: 'This week' },
      { task: 'Write ICP decision brief — frame options, trade-offs, and criteria for choosing SMB vs. enterprise', owner: 'CEO, Sales', priority: 'High', function: 'Strategy', dueTimeframe: '3 days' },
      { task: 'Audit enterprise deal pipeline — categorize stalled deals by blocker (legal, procurement, champion, budget)', owner: 'Sales', priority: 'High', function: 'Sales', dueTimeframe: '1 week' },
      { task: 'Model self-serve CAC reduction path: what would move $840 → $600? (channel mix, conversion rate, ACV)', owner: 'Growth / Marketing', priority: 'High', function: 'Growth', dueTimeframe: '1 week' },
      { task: 'Draft board meeting narrative and identify data gaps — 6 weeks out is not much runway', owner: 'CEO, CFO', priority: 'High', function: 'Executive', dueTimeframe: '2 weeks' },
      { task: 'Review Head of Sales performance data — document and schedule structured performance conversation', owner: 'CEO', priority: 'High', function: 'People', dueTimeframe: '1 week' },
      { task: 'Investigate 3 API access requests — qualify as revenue opportunity or support burden', owner: 'Product', priority: 'Medium', function: 'Product', dueTimeframe: '1 week' },
      { task: 'Ship job postings: Senior PM, Data Engineer — hold on Sales Engineer until ICP is decided', owner: 'CEO / HR', priority: 'Medium', function: 'Operations', dueTimeframe: '1 week' },
      { task: 'Competitor analysis: document how Competitor X\'s new feature affects positioning', owner: 'Product / Marketing', priority: 'Medium', function: 'Product / Marketing', dueTimeframe: '1 week' },
    ],

    prd: `## Initiative Brief: API Access Tier (Revenue Expansion)

**Trigger:** 3 unsolicited customer requests in one week | **Strategic fit:** Expansion revenue, enterprise stickiness

### Problem Statement
Three customers have asked about API access — indicating an unmet need to integrate our platform with their internal workflows. Currently we have no programmatic access offering, leaving expansion revenue on the table and reducing product stickiness.

### Opportunity Size
If 20% of enterprise accounts adopt an API tier at $200–$500/month additional, this represents meaningful ARR expansion without new customer acquisition cost.

### MVP Scope
- REST API with read access to core data objects (reports, metrics, users)
- API key management in settings
- Rate limiting (100 req/min on starter tier)
- API documentation (public docs site)
- Usage dashboard for customers

### Pricing (proposed)
- Starter: Included in Enterprise plan (read-only, limited rate)
- Pro API: $299/month add-on (higher rate limits, write access)

### Dependencies
- Requires ICP decision (API tier is primarily for enterprise segment)
- Requires SOC2 for enterprise API deals`,

    risks: [
      { description: 'Claire\'s departure would be a significant engineering continuity risk — she likely holds critical system knowledge. Retention must be addressed this week.', severity: 'High' },
      { description: 'ICP ambiguity (SMB vs. enterprise) is causing downstream confusion in sales, marketing, and product roadmap — every week of delay compounds.', severity: 'High' },
      { description: 'At $840 CAC with self-serve, the payback period may exceed 12 months for lower-ACV customers — this is a capital efficiency problem, not just a metrics problem.', severity: 'High' },
      { description: 'Head of Sales underperformance: delayed decision is demoralizing to the rest of the sales team and leaving revenue unrealized.', severity: 'Medium' },
      { description: 'Fundraising timing: raising at $1.2M ARR gives less leverage than $1.8M — but waiting 6 months introduces cash flow risk if burn is high.', severity: 'Medium' },
      { description: 'AI features demoed in March but not shipped — customer expectation gap may erode trust if not addressed with clear communication.', severity: 'Medium' },
    ],

    stakeholderUpdate: `**CEO Weekly Priorities — Week of May 22**

Focus areas this week (in order):

1. **Retention:** 1:1 with Claire scheduled — addressing proactively before it becomes a crisis.

2. **ICP decision:** Writing the SMB vs. enterprise decision brief. This is the unlock for pricing, sales motion, and roadmap clarity.

3. **Enterprise deal audit:** Categorizing stalled pipeline by blocker type to identify patterns and unblock deals systematically.

4. **Board prep:** Starting 6 weeks out — narrative and data gap analysis this week.

Revenue at $1.2M ARR, on track to assess Series A timing within 4 weeks. Key risk to watch: self-serve CAC and enterprise deal velocity.`,

    followUpEmail: {
      subject: 'Weekly priorities + decisions I need help with',
      body: `Hi team,

Doing my Sunday thinking-out-loud and wanted to share where my head is at heading into the week.

**What I'm resolving this week:**
- ICP decision (SMB vs enterprise) — I'll have a brief ready by Wednesday for us to align on. This unblocks a lot.
- Enterprise deal audit — I need Sales to categorize our stalled pipeline by blocker by Friday.
- CAC reduction analysis — I need a model on what moves self-serve CAC from $840 to $600.

**Heads up:**
- Board meeting is 6 weeks out. I want to start narrative prep now. CFO, let's find time this week.
- Mobile is officially parked until after V2 stabilizes. I'll communicate this externally.
- We have 3 API access requests. Product, let's talk about whether this is a Q3 opportunity.

**People note:** I'm scheduling 1:1s with key team members this week. Making sure everyone has what they need.

More to discuss in Monday sync.

[Your name]`,
    },

    impactEstimate: {
      timeSaved: '~60 minutes',
      outputsGenerated: 7,
      nextWorkflow: 'Schedule ICP strategy meeting, then block time for board narrative prep',
    },
  },

  // ─── GTM Planning ───────────────────────────────────────────────────────────

  'gtm-planning': {
    summary: `Q3 GTM planning session for V2 launch (target: late July) identified four unresolved strategic decisions that must be made before execution can begin: (1) final ICP definition, (2) pricing structure, (3) PLG vs. sales-led sequencing, and (4) launch messaging.

The team has strong channel instincts — outbound (SDR ramp), VC portfolio introductions, and content — but execution risk is concentrated in two areas: insufficient case study coverage (only 1 of 3 required), and pricing tension between ACV growth and self-serve conversion.

Key recommendation: lock the 1-line positioning statement and pricing structure before June 15 so sales enablement, landing pages, and outbound sequences can be built in parallel. Any remaining ambiguity at the June 15 gate will compress the critical path to launch.`,

    decisions: [
      { id: 1, decision: 'ICP for V2 launch: Series A/B, 50–500 employees, ops/finance buyers — exclude pre-seed and >1,000 employee companies.', owner: 'CEO', status: 'Decided' },
      { id: 2, decision: 'Pricing: move to team plan at $1,499/month for up to 10 seats with 20% annual discount — requires CFO sign-off on unit economics.', owner: 'CEO, CFO', status: 'Open' },
      { id: 3, decision: 'Messaging: lead with "operational intelligence" — differentiate from automation competitors on insight and visibility, not task completion.', owner: 'Marketing (Jen)', status: 'Recommended' },
      { id: 4, decision: 'Launch sequence: PLG (free trial) generates awareness; sales follows up at day 7 for high-signal accounts.', owner: 'CEO, Marcus', status: 'Recommended' },
      { id: 5, decision: 'SaaStr (September, $30k booth): do not commit until July ARR data is available — evaluate ROI vs. digital spend.', owner: 'CEO, Jen', status: 'Deferred' },
      { id: 6, decision: 'Mobile: launch V2 without mobile, communicate roadmap clearly in launch materials.', owner: 'CEO, Product', status: 'Decided' },
    ],

    actionItems: [
      { task: 'Finalize 1-line positioning statement — test 3 options with 5 customers before locking', owner: 'Jen (Marketing)', priority: 'High', function: 'Marketing', dueTimeframe: 'June 1' },
      { task: 'Lock V2 pricing structure and update all sales materials', owner: 'CEO, CFO', priority: 'High', function: 'Strategy / Finance', dueTimeframe: 'June 15' },
      { task: 'Secure 2 additional beta case studies — identify candidates from current customer base', owner: 'Customer Success', priority: 'High', function: 'Customer Success', dueTimeframe: 'June 15' },
      { task: 'Build ICP-specific landing pages (3 personas: VP Ops, Head of Product, CFO)', owner: 'Jen', priority: 'High', function: 'Marketing', dueTimeframe: 'July 1' },
      { task: 'Hire 3 SDRs and launch outbound sequences targeting ICP list', owner: 'Marcus (VP Sales)', priority: 'High', function: 'Sales', dueTimeframe: 'June 30' },
      { task: 'Formalize VC portfolio intro program with a16z and Bessemer contacts', owner: 'Raj (Partnerships)', priority: 'High', function: 'Partnerships', dueTimeframe: 'June 15' },
      { task: 'Build sales enablement kit: pitch deck, competitive battlecard, objection handling guide', owner: 'Marcus, Jen', priority: 'Medium', function: 'Sales / Marketing', dueTimeframe: 'July 1' },
      { task: 'Submit press pitch to TechCrunch and Fortune for V2 launch coverage', owner: 'Jen', priority: 'Medium', function: 'PR / Marketing', dueTimeframe: 'July 10' },
      { task: 'Define win/loss tracking methodology for Q3 — target >35% win rate', owner: 'Marcus', priority: 'Medium', function: 'Sales Operations', dueTimeframe: 'June 30' },
      { task: 'Draft free trial scope for PLG motion — define activation criteria and upgrade trigger', owner: 'Product, Marketing', priority: 'Medium', function: 'Product / Growth', dueTimeframe: 'June 15' },
    ],

    prd: `## GTM Enablement: Free Trial Experience (PLG Motion)

**Context:** Q3 GTM plan includes a product-led growth motion as the top-of-funnel driver for V2 launch.

### Problem Statement
Current sales motion is fully human-led, creating high CAC and slow top-of-funnel velocity. A free trial layer allows prospects to experience value before talking to sales, improving conversion quality and reducing sales cycle length.

### Free Trial Design (MVP)
- **Duration:** 14 days, no credit card required
- **Scope:** Full product access, capped at 1 workspace and 3 users
- **Activation metric:** "Connected first data source + viewed first report" within 48 hours
- **Upgrade trigger:** Day 7 — sales outreach to accounts with ≥2 active users

### Success Metrics
- 40% of trials reach activation milestone within 48 hours
- 15% trial-to-paid conversion within 30 days
- Sales qualified leads from PLG: 30% of Q3 pipeline

### Guardrails
- Free trial does not include enterprise features (SSO, API access, custom contracts)
- Trial accounts cannot export data (drives upgrade intent)
- Automated email nurture sequence: Day 1, 3, 7, 12`,

    risks: [
      { description: 'Case study gap: launching with only 1 case study reduces credibility in a market where proof is a primary buying signal.', severity: 'High' },
      { description: 'Pricing tension unresolved: if team does not lock pricing before June 15, sales materials and landing pages cannot be finalized — compresses launch critical path.', severity: 'High' },
      { description: 'SDR ramp timeline: 3 SDRs need to be hired, onboarded, and ramped by July launch — recruiting begins immediately or this slips.', severity: 'Medium' },
      { description: 'Messaging ambiguity: without a locked 1-liner, different channels will communicate inconsistently, weakening brand and confusing prospects.', severity: 'Medium' },
      { description: 'PLG / sales-led handoff not defined: if activation criteria and sales trigger are not specified, high-intent trial users may churn without follow-up.', severity: 'Medium' },
    ],

    stakeholderUpdate: `**GTM V2 Launch Update — Planning Session Complete**

The GTM planning session for our late-July V2 launch is complete. Here's the plan in brief:

**Target market:** Series A/B companies, 50–500 employees, ops/finance buyers.

**Go-to-market motion:** PLG (free trial) generates awareness and qualification; sales engages high-signal trial accounts at day 7. Outbound (3 SDRs) targets ICP list simultaneously.

**Launch channels:** VC portfolio introductions (a16z, Bessemer), ICP-specific landing pages, content, and PR targeting TechCrunch and Fortune.

**Key milestones:**
- June 1: Positioning locked
- June 15: Pricing finalized, case studies secured
- July 1: Sales enablement complete, SDRs ramped
- Late July: V2 launch

**Open items:** Pricing structure requires CEO/CFO sign-off. SaaStr decision deferred to July.`,

    followUpEmail: {
      subject: 'GTM Planning Recap + Owner Assignments — V2 Launch',
      body: `Hi team,

Good session today. Here's the summary and what everyone owns heading into V2 launch.

**Immediate (by June 1):**
→ Jen: Finalize positioning — test 3 options with customers, lock the 1-liner
→ Raj: Formalize VC intro program with a16z and Bessemer
→ Marcus: Begin SDR recruiting — we need 3 by June 30

**By June 15:**
→ CEO + CFO: Lock pricing (team plan proposal is leading option)
→ CS: Secure 2 more case studies — reach out to top 10 customers this week
→ Product + Marketing: Define free trial scope and activation criteria

**By July 1:**
→ Jen: ICP landing pages (3 personas) + PR pitches drafted
→ Marcus: SDRs onboarded + outbound sequences live
→ Marcus + Jen: Sales enablement kit complete

**Decisions we still need:**
→ Pricing structure — needs CFO sign-off on unit economics
→ SaaStr: hold decision until July ARR data is in

Launch target: late July. The critical path runs through pricing and case studies — both need to be done by June 15 for everything else to work.

Let's meet again in 2 weeks to check progress.

[Your name]`,
    },

    impactEstimate: {
      timeSaved: '~55 minutes',
      outputsGenerated: 7,
      nextWorkflow: 'Lock positioning with marketing, then schedule pricing decision meeting with CEO + CFO',
    },
  },

  // ─── Product Review ──────────────────────────────────────────────────────────

  'product-review': {
    summary: `Product review (May 22) flagged a DAU decline of 8% week-over-week alongside an activation rate of 34% — well below the 45–60% industry benchmark — indicating an acquisition-to-retention gap. Time to value at 11 days (vs. 3-day goal) is the most significant lever available.

The integrations module continues to outperform (67% adoption), confirming users who reach setup derive clear value. The problem is that 68% of new users never complete onboarding, with the largest drop-off at step 3 (team invite). This is an addressable problem with a design solution already ready.

A three-way tension emerged between John (push AI features for enterprise sales), Sarah (fix foundation first), and Priya (agree with Sarah, but acknowledge market signal on AI). The resolution reached — ship onboarding next sprint, spike AI complexity, patch search — is correct sequencing. Execution risk: the AI spike must produce an honest estimate or it will repeat the same debate next cycle.`,

    decisions: [
      { id: 1, decision: 'Ship new onboarding flow next sprint (Amy\'s design approved) — highest-leverage improvement for activation rate.', owner: 'John, Amy, Sarah', status: 'Decided' },
      { id: 2, decision: 'Search: patch for now (2 days of work), add full rebuild to Q3 roadmap.', owner: 'Sarah', status: 'Decided' },
      { id: 3, decision: 'AI summary feature: run a time-boxed spike this sprint to produce a real complexity estimate before committing.', owner: 'Sarah (Eng)', status: 'Decided' },
      { id: 4, decision: 'Mobile: remains in parking lot — not on roadmap until V2 stabilizes and activation rate improves.', owner: 'Priya, John', status: 'Decided' },
      { id: 5, decision: 'Data export revamp: add to Q3 roadmap — 3 enterprise requests creates a business case.', owner: 'John', status: 'Recommended for Q3' },
      { id: 6, decision: 'NPS recovery plan: identify the 15% of users who drove NPS from 47 → 41 and run a targeted interview series.', owner: 'CS / Product', status: 'Recommended' },
    ],

    actionItems: [
      { task: 'Build and ship new onboarding flow (Amy\'s approved design) — focus on step 3 drop-off', owner: 'Amy + Sarah', priority: 'High', function: 'Design / Engineering', dueTimeframe: 'Next sprint' },
      { task: 'Patch search reliability issues — scope: 2 engineering days', owner: 'Sarah', priority: 'High', function: 'Engineering', dueTimeframe: 'This week' },
      { task: 'Run AI feature complexity spike — output: engineer-hours estimate and dependencies list', owner: 'Sarah (Eng)', priority: 'High', function: 'Engineering', dueTimeframe: 'This sprint' },
      { task: 'Identify and interview 5 users who recently gave low NPS scores', owner: 'CS / John', priority: 'High', function: 'Customer Success / Product', dueTimeframe: '2 weeks' },
      { task: 'Analyze step 3 (team invite) drop-off — pull funnel data and qualitative session recordings', owner: 'John', priority: 'High', function: 'Product', dueTimeframe: '3 days' },
      { task: 'Set up notification customization — give users controls instead of binary on/off', owner: 'Sarah', priority: 'Medium', function: 'Engineering', dueTimeframe: 'Q3' },
      { task: 'Write data export revamp brief for Q3 roadmap — include 3 enterprise customer quotes', owner: 'John', priority: 'Medium', function: 'Product', dueTimeframe: '1 week' },
      { task: 'Review bulk actions feature — low adoption (12%) may indicate discoverability issue vs. need issue', owner: 'John, Amy', priority: 'Medium', function: 'Product / Design', dueTimeframe: '2 weeks' },
    ],

    prd: `## Feature Brief: Onboarding Flow Redesign

**Status:** Design approved | **Sprint:** Next (immediate) | **Owner:** John (PM), Amy (Design), Sarah (Eng)

### Problem Statement
68% of new users never complete the onboarding setup. The primary drop-off point is Step 3 (Team Invite), which suggests friction in the collaborative activation loop — users who complete onboarding alone don't see the product's collaborative value, and users who don't can't invite teammates to unlock it.

Current time to value: 11 days. Target: 3 days.

### Success Metrics
- Onboarding completion rate: increase from 32% → 60% within 30 days of launch
- Time to value: reduce from 11 days → 5 days (target: 3 days by Q3)
- Activation rate: increase from 34% → 45% within 60 days

### Design Changes (Amy's approved scope)
1. **Step 3 redesign:** Replace mandatory team invite with optional invite + solo "explore first" path
2. **Progress indicator:** Show users what they unlock at each step (value ladder)
3. **Smart defaults:** Pre-populate workspace settings based on company size (pulled from signup form)
4. **Contextual tooltips:** Inline guidance on first-use of each core feature
5. **Completion email:** Triggered when user completes all setup steps — with first suggested action

### Engineering Estimate
- Design handoff: complete
- Development: ~6 engineering days
- QA: 2 days
- Total: 8 days (fits in one sprint)

### Rollout
- Ship to all new signups first (no risk to existing users)
- Monitor completion rate daily for 2 weeks post-launch`,

    risks: [
      { description: 'DAU decline of 8% week-over-week is a leading indicator that should be understood before it becomes a trend — root cause is not yet confirmed.', severity: 'High' },
      { description: 'NPS dropped from 47 to 41 quarter-over-quarter — this is a meaningful signal that warrants a targeted interview series to understand drivers.', severity: 'High' },
      { description: 'AI feature scope risk: if the spike is not time-boxed and structured, it will produce another qualitative debate rather than an actionable estimate.', severity: 'Medium' },
      { description: 'Mobile trust signal with enterprise: prospects are beginning to flag mobile absence in sales conversations — this will compound if V2 stabilization takes >2 quarters.', severity: 'Medium' },
      { description: 'Bulk actions at 12% adoption: may indicate a product-market fit gap for that feature, which affects Q3 roadmap assumptions that depend on its success.', severity: 'Low' },
    ],

    stakeholderUpdate: `**Product Review Summary — May 22**

**Key metric concerns:**
- DAU down 8% week-over-week — under investigation
- Activation rate at 34% vs. 45–60% industry benchmark
- NPS declined from 47 → 41 quarter-over-quarter
- Time to value: 11 days (target: 3 days)

**What's working:** Integrations module at 67% adoption — users who reach it find clear value. The problem is getting them there.

**Sprint decisions:**
1. New onboarding ships next sprint (approved design, 8 engineering days)
2. Search patched this week, full rebuild in Q3
3. AI feature complexity spike this sprint — honest estimate to follow

**Why this sequencing:** Fixing onboarding is our highest-leverage bet to improve DAU, activation, and NPS simultaneously. AI features will follow once we have a reliable foundation.`,

    followUpEmail: {
      subject: 'Product Review Decisions + Sprint Assignments',
      body: `Hi team,

Quick recap from today's product review.

**Shipping next sprint:**
→ Amy + Sarah: New onboarding flow (Amy's design is approved and ready for dev handoff)
→ Sarah: Search patch (2 days — priority this week)

**This sprint:**
→ Sarah (Eng): AI summary spike — time-boxed, output is an estimate, not a commitment
→ John: Analyze step 3 (team invite) drop-off data before sprint starts

**Roadmap (Q3):**
→ Search rebuild
→ Data export revamp (John to write brief)
→ Notification customization

**Context:** DAU is down 8% week-over-week, and NPS slipped from 47 to 41. The onboarding fix is our best near-term lever — 68% of new users aren't completing setup, and fixing that should move activation, DAU, and NPS simultaneously.

If you're working on features that touch the onboarding flow, coordinate with Amy before building anything.

Next product review: same time in two weeks.

[Your name]`,
    },

    impactEstimate: {
      timeSaved: '~45 minutes',
      outputsGenerated: 7,
      nextWorkflow: 'Assign sprint tickets in Linear/Jira, then schedule AI spike kickoff with engineering',
    },
  },
}
