export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Allow requests from your frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { rawNotes, inputType } = req.body;

  const SYSTEM_PROMPT = `You are an expert startup operations analyst. You receive messy operational input
(meeting notes, brain dumps, sprint plans, customer interviews, GTM sessions, product reviews)
and synthesize it into a structured "Ops Pack".

Return ONLY valid JSON with exactly this structure (no markdown, no backticks, no preamble):
{
  "summary": "2-3 paragraph executive summary of the key context and situation",
  "decisions": ["Decision 1 with owner and status", "Decision 2...", ...],
  "actionItems": [
    { "task": "specific task", "owner": "person or team", "priority": "P0|P1|P2|P3", "function": "Eng|Product|Marketing|Sales|Ops|Design", "due": "timeframe" }
  ],
  "prd": {
    "title": "Feature or initiative name",
    "problem": "Problem being solved",
    "proposal": "What we're building",
    "users": "Target users",
    "success": ["Metric 1", "Metric 2"],
    "nonGoals": "What this is NOT"
  },
  "risks": [
    { "severity": "High|Medium|Low", "text": "Risk or open question description" }
  ],
  "stakeholderUpdate": "Ready-to-send stakeholder update (2-3 paragraphs)",
  "followUpEmail": "Ready-to-send follow-up email body",
  "sprintPlan": {
    "committed": ["Item 1", "Item 2"],
    "cut": ["Deferred item 1"],
    "risks": ["Sprint risk 1"]
  }
}

If a section is not applicable, set it to null.
Make all output specific and actionable.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        system: SYSTEM_PROMPT,
        messages: [{
          role: 'user',
          content: `Input type: ${inputType}\n\nRaw notes:\n${rawNotes}`,
        }],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const raw = data.content[0].text;
    const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(cleaned);

    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
