// Sample "messy" startup inputs — one per input type.
// These represent raw, unstructured notes that real teams produce.

export const SAMPLE_INPUTS = {
  'sprint-meeting': `weekly sync - q2 sprint 3
attending: sarah (eng lead), john (product), amy (design), tom (cfo), lisa (customer success)

- sarah: api is broken for enterprise customers, getting 504 timeouts on /v2/reports endpoint. started monday
- dashboard loading is taking 8+ seconds on large datasets, multiple users complaining in slack
- john wants bulk export feature built before sequoia mtg (june 15) — investors will definitely ask for it
- amy - design review for new onboarding flow, needs feedback by friday or we slip
- churn update from lisa: up 12% this month, top reason is "too slow / too buggy"
- tom: AWS bill spiked to $47k last month, up from $28k. need to investigate before board call
- mobile app - do we prioritize before or after web stability? still unclear
- v2 launch date still not set, sarah says she needs 3 more weeks minimum
- hiring - we need 2 more backend engineers, HR hasn't posted jobs yet??
- john mentioned user research results from last month - did we ever analyze those?
- quick note: standup time moving from 9am to 10am starting next week`,

  'customer-interview': `customer call notes - interviewee: marcus chen, vp ops @ scalefast (series b, 200 ppl)
date: may 20, interviewer: priya

current setup:
- using notion + sheets + linear + slack. total chaos.
- 4 people just to maintain dashboards
- weekly reporting takes ~6 hours manually
- "we have data everywhere but can't actually see anything"

pain points he kept coming back to:
- can't see pipeline + hiring + finance in same view. has to context switch constantly
- approvals happen in slack DMs, no trail, stuff falls through cracks
- board update takes 2 days to prep every month. ceo hates it
- their data team is overwhelmed building one-off reports

what they've tried:
- tried salesforce - too complex, took 6 months to implement, abandoned
- tried notion dashboards - broke every time someone changed a column
- "we just need something that works without a 3 month implementation"

what would make this a must-buy:
- if it saved his ops team 10hrs/week he'd buy immediately
- needs to connect to existing tools (not replace them)
- single source of truth for leadership team
- needs SOC2 (they're enterprise)

pricing reaction:
- current price point too low, makes him nervous about company survival lol
- willing to pay $2-3k/month for ops platform that actually works
- asked about custom contracts

quotes:
"our biggest operational bottleneck right now is information - not the work itself"
"i've been burned by overpromised tools before. show me it works first"
"if you can give me the board deck in 30 minutes instead of 2 days, you have a customer"`,

  'founder-brain-dump': `brain dump - sunday night - things spinning in my head

ok trying to get this out of my brain

revenue stuff:
- ARR at 1.2M, need to hit 2M by end of year
- enterprise deals keep stalling at legal/procurement, taking 90+ days to close
- self-serve is growing but CAC is too high (~$840, needs to be under $600)
- 3 customers asked about API access this week - are we leaving money on the table?

product chaos:
- eng team keeps getting pulled into customer-specific work instead of core product
- we said no to 4 feature requests this month but 2 of them were from our top 3 customers
- mobile has been "coming soon" for 8 months. do we kill it or prioritize?
- tech debt is real - sarah says we need a 2-week sprint just to stabilize
- the AI features we demoed in march - we havent shipped any of them

team stuff:
- claire (eng) mentioned she's been getting recruiter outreach. need to address before she leaves
- morale feels lower than 3 months ago, not sure why
- need to hire: 1 senior PM, 1 data engineer, maybe a sales engineer
- our head of sales is underperforming but i don't want to make a wrong call

go to market confusion:
- are we SMB or enterprise? we keep saying both and it's confusing everyone
- content/SEO not getting traction, maybe need to rethink
- partnerships channel - had 2 conversations but nothing concrete
- should we be at more conferences? or is that a distraction?

other stuff:
- board meeting in 6 weeks, need to prep narrative
- investors keep asking about path to profitability
- competitor X launched a similar feature last week - are we differentiated enough?
- fundraising: do we raise Series A now at this ARR or wait 6 more months?`,

  'gtm-planning': `GTM planning session notes - Q3 launch
attendees: priya (ceo), marcus (vp sales), jen (marketing), raj (partnerships)

context: launching v2 in late july, need full gtm motion ready

target segments (still debating):
- series a/b startups, 50-500 employees
- ops/finance/product buyers
- companies currently using 5+ tools for ops
- exclude: pre-seed, enterprise >1000 (support cost too high for now)

channels we talked about:
- outbound: marcus wants 3 SDRs by june, ramp up email sequences
- content: jen pushing for ICP-specific landing pages, 3 new case studies
- partnerships: raj has convos with 2 VCs (a16z, bessemer) about portfolio intros
- product-led: free tier with usage limit? still debating
- events: SaaStr is in sept - worth it? $30k booth

pricing debate (heated):
- current: $499/seat
- marcus wants $799/seat to increase ACV
- jen worried it kills self-serve conversion
- idea: team plan at $1,499/mo for up to 10 seats?
- annual discount: 20%? 15%?
- enterprise custom pricing when >50 seats

messaging (unresolved):
- "operational intelligence" vs "ops automation" vs "the ops layer for modern companies"
- competitors positioning on automation, we think our differentiation is insight, not just automation
- need 1-liner that isn't vague

launch plan rough:
- beta customer case studies: need 3, only have 1 confirmed
- PR: target TechCrunch, Fortune, maybe Product Hunt
- launch week: drip campaign, linkedin push, partner amplification
- sales enablement: deck, objection handling, competitive battlecard

open questions:
- do we launch with or without mobile?
- PLG vs sales-led: which leads?
- how do we handle inbound that doesn't fit ICP?
- what's the win/loss ratio we should aim for in Q3?`,

  'product-review': `product review notes - weekly
date: may 22
attendees: john (pm), sarah (eng), amy (design), priya (ceo)

metrics review:
- DAU: 1,240 (down 8% from last week, alarming)
- activation rate: 34% (industry avg is 45-60%)
- feature adoption - bulk actions: 12%, integrations: 67%, reports: 23%
- NPS: 41 (last quarter was 47)
- time to value: currently ~11 days. goal is 3 days

what's working:
- integrations module crushing it, 3 new connectors shipped, adoption high
- new export functionality well received
- customer success team using the product for QBRs now (dogfooding)

what's broken:
- onboarding: 68% of new users don't complete setup. biggest drop-off is step 3 (team invite)
- search is slow and unreliable - users reverting to manual navigation
- mobile: nothing shipped, becoming a trust issue with enterprise prospects
- notifications are noisy - users disabling them instead of customizing

roadmap debates:
- AI summary feature: john says Q3, sarah says 6 weeks of ML work minimum
- search rebuild vs patch: sarah strongly prefers rebuild (3 week project)
- v2 onboarding: amy has full design ready, john wants to launch next sprint
- data export revamp: 3 enterprise customers specifically asked for it

prioritization conflict:
- john wants to push AI features to close enterprise deals
- sarah says we need to fix foundation first (search, onboarding, perf)
- priya: "i agree with sarah but we can't ignore the market signal on AI"

decisions made:
- ship new onboarding next sprint (amy's design is approved)
- search: patch for now (2 days), rebuild in Q3
- AI: spike this sprint to estimate real complexity before committing
- mobile: parking lot until after v2 stabilizes`,
}

export const INPUT_TYPE_LABELS = {
  'sprint-meeting': 'Sprint / Team Meeting',
  'customer-interview': 'Customer Interview',
  'founder-brain-dump': 'Founder Brain Dump',
  'gtm-planning': 'GTM Planning Session',
  'product-review': 'Product Review',
}
