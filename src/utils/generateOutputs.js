import { MOCK_OUTPUTS } from '../data/mockOutputs'

// ─── generateOutputs ──────────────────────────────────────────────────────────
// Simulates AI synthesis. Returns structured outputs from messy input text.
//
// TO CONNECT REAL AI (Claude or OpenAI):
// 1. Install SDK: npm install @anthropic-ai/sdk   (or openai)
// 2. Add your API key to a .env file: VITE_ANTHROPIC_API_KEY=sk-...
// 3. Replace the mock logic below with a real API call (example included).
//
// Real implementation example (Claude):
//
//   import Anthropic from '@anthropic-ai/sdk'
//   const anthropic = new Anthropic({ apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY, dangerouslyAllowBrowser: true })
//
//   const prompt = buildPrompt(inputText, inputType)
//   const response = await anthropic.messages.create({
//     model: 'claude-opus-4-6',
//     max_tokens: 8192,
//     messages: [{ role: 'user', content: prompt }],
//   })
//   return parseResponse(response.content[0].text)
//
// ─────────────────────────────────────────────────────────────────────────────

export async function generateOutputs(inputText, inputType) {
  // Simulate network latency for realistic demo feel
  await delay(1800 + Math.random() * 600)

  const outputs = MOCK_OUTPUTS[inputType]
  if (!outputs) {
    throw new Error(`No mock outputs configured for input type: ${inputType}`)
  }

  return outputs
}

// ─── Prompt builder (for real API integration) ────────────────────────────────
// Uncomment and adapt when connecting to a live model.

// export function buildPrompt(inputText, inputType) {
//   const typeDescriptions = {
//     'sprint-meeting': 'sprint planning or team meeting notes',
//     'customer-interview': 'customer discovery or sales call notes',
//     'founder-brain-dump': 'a founder brain dump or strategic thinking notes',
//     'gtm-planning': 'go-to-market planning session notes',
//     'product-review': 'a product review or roadmap planning session',
//   }
//
//   return `You are an expert operations analyst for high-growth startups.
//
// You have been given raw, unstructured notes from ${typeDescriptions[inputType] || 'a startup meeting'}.
// Your job is to synthesize these notes into a complete Ops Pack — a set of structured execution-ready outputs.
//
// Return a JSON object with the following fields:
// - summary: string (executive summary, 2-3 paragraphs)
// - decisions: array of { id, decision, owner, status }
// - actionItems: array of { task, owner, priority, function, dueTimeframe }
//   - priority must be one of: High, Medium, Low
// - prd: string (markdown-formatted product brief or feature spec)
// - risks: array of { description, severity }
//   - severity must be one of: High, Medium, Low
// - stakeholderUpdate: string (1-page leadership update)
// - followUpEmail: { subject: string, body: string }
// - impactEstimate: { timeSaved: string, outputsGenerated: number, nextWorkflow: string }
//
// Raw notes:
// ${inputText}
//
// Return only valid JSON. No markdown code fences.`
// }

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
