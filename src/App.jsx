import { useState } from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────

const INPUT_TYPES = [
  { key: 'sprint',    label: 'Sprint Notes' },
  { key: 'customer',  label: 'Customer Interview' },
  { key: 'founder',   label: 'Founder Brain Dump' },
  { key: 'gtm',       label: 'GTM Planning' },
  { key: 'product',   label: 'Product Review' },
];

const TABS = [
  { key: 'summary',     label: 'Executive Summary' },
  { key: 'decisions',   label: 'Key Decisions' },
  { key: 'actions',     label: 'Action Items' },
  { key: 'prd',         label: 'PRD Draft' },
  { key: 'risks',       label: 'Risks & Questions' },
  { key: 'stakeholder', label: 'Stakeholder Update' },
  { key: 'sprint',      label: 'Sprint Plan' },
];

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

If a section is not applicable (e.g. no PRD needed for a sprint note), set it to null.
Make all output specific and actionable — no vague placeholder text.`;

// ─── API call ─────────────────────────────────────────────────────────────────

async function callClaudeAPI(rawNotes, inputType) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
    throw new Error(data.error.message || 'API error');
  }

  const raw = data.content[0].text;
  // Strip markdown fences if model wraps response in them
  const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PriorityBadge({ priority }) {
  const colors = {
    P0: 'bg-red-900/40 text-red-400 border border-red-700/50',
    P1: 'bg-orange-900/40 text-orange-400 border border-orange-700/50',
    P2: 'bg-yellow-900/40 text-yellow-400 border border-yellow-700/50',
    P3: 'bg-emerald-900/40 text-emerald-400 border border-emerald-700/50',
  };
  return (
    <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded font-semibold ${colors[priority] || colors.P2}`}>
      {priority}
    </span>
  );
}

function SeverityTag({ severity }) {
  const colors = {
    High:   'bg-red-900/30 border-red-700/40 text-red-400',
    Medium: 'bg-yellow-900/30 border-yellow-700/40 text-yellow-400',
    Low:    'bg-emerald-900/30 border-emerald-700/40 text-emerald-400',
  };
  return (
    <span className={`font-mono text-[10px] font-bold shrink-0 pt-0.5 ${colors[severity] || colors.Medium}`}>
      {severity?.toUpperCase()}
    </span>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className="float-right font-mono text-[10px] px-2.5 py-1 rounded border border-stone-700 bg-stone-800 text-stone-400 hover:text-stone-200 hover:border-blue-500 transition-all"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

// ─── Tab content ──────────────────────────────────────────────────────────────

function TabContent({ tab, pack }) {
  if (tab === 'summary') {
    return (
      <div>
        <SectionLabel>Executive Summary</SectionLabel>
        <div className="prose-block">{pack.summary}</div>
      </div>
    );
  }

  if (tab === 'decisions') {
    const items = pack.decisions || [];
    return (
      <div>
        <SectionLabel>{items.length} Key Decisions</SectionLabel>
        {items.length === 0 && <div className="prose-block">No key decisions extracted.</div>}
        {items.map((d, i) => (
          <div key={i} className="flex gap-3 items-start px-4 py-3 border border-stone-700 rounded-lg mb-2 bg-stone-900 text-sm">
            <span className="font-mono text-[10px] text-blue-400 shrink-0 pt-0.5">{String(i + 1).padStart(2, '0')}</span>
            <span className="text-stone-200 leading-relaxed">{d}</span>
          </div>
        ))}
      </div>
    );
  }

  if (tab === 'actions') {
    const items = pack.actionItems || [];
    return (
      <div>
        <SectionLabel>{items.length} Action Items</SectionLabel>
        <table className="w-full text-[12px] border-collapse">
          <thead>
            <tr>
              {['Task', 'Owner', 'Priority', 'Function', 'Due'].map(h => (
                <th key={h} className="font-mono text-[10px] tracking-widest text-stone-500 uppercase text-left px-3 py-2 border-b border-stone-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((a, i) => (
              <tr key={i} className="hover:bg-white/[0.02] border-b border-stone-800 last:border-0">
                <td className="px-3 py-2.5 text-stone-200 leading-relaxed">{a.task}</td>
                <td className="px-3 py-2.5 text-stone-300">{a.owner}</td>
                <td className="px-3 py-2.5"><PriorityBadge priority={a.priority} /></td>
                <td className="px-3 py-2.5 text-stone-400">{a.function}</td>
                <td className="px-3 py-2.5 text-stone-400">{a.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (tab === 'prd') {
    if (!pack.prd) return <div className="prose-block">No PRD applicable for this input type.</div>;
    const { title, problem, proposal, users, success, nonGoals } = pack.prd;
    return (
      <div>
        <SectionLabel>PRD Draft — {title}</SectionLabel>
        {[['Problem', problem], ['Proposal', proposal], ['Target Users', users], ['Non-Goals', nonGoals]].map(([label, val]) => (
          <div key={label} className="mb-4">
            <div className="font-mono text-[10px] text-blue-400 tracking-widest uppercase mb-1.5">{label}</div>
            <div className="text-[13px] leading-relaxed text-stone-200 px-3 py-2.5 bg-stone-900 border border-stone-700 rounded-lg">{val}</div>
          </div>
        ))}
        <div className="mb-4">
          <div className="font-mono text-[10px] text-blue-400 tracking-widest uppercase mb-1.5">Success Metrics</div>
          <div className="px-3 py-2.5 bg-stone-900 border border-stone-700 rounded-lg">
            {(success || []).map((s, i) => (
              <div key={i} className="text-[13px] text-stone-200 leading-relaxed mb-1">• {s}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (tab === 'risks') {
    const items = pack.risks || [];
    return (
      <div>
        <SectionLabel>{items.length} Risks & Open Questions</SectionLabel>
        {items.length === 0 && <div className="prose-block">No risks identified.</div>}
        {items.map((r, i) => {
          const bg = { High: 'bg-red-900/10 border-red-700/30', Medium: 'bg-yellow-900/10 border-yellow-700/30', Low: 'bg-emerald-900/10 border-emerald-700/30' };
          return (
            <div key={i} className={`flex gap-3 items-start px-4 py-3 rounded-lg mb-2 border text-sm ${bg[r.severity] || bg.Medium}`}>
              <SeverityTag severity={r.severity} />
              <span className="text-stone-200 leading-relaxed">{r.text}</span>
            </div>
          );
        })}
      </div>
    );
  }

  if (tab === 'stakeholder') {
    const text = pack.stakeholderUpdate || pack.followUpEmail || '';
    return (
      <div>
        <SectionLabel>Stakeholder Update</SectionLabel>
        <CopyButton text={text} />
        <div className="prose-block whitespace-pre-wrap mt-8">{text}</div>
      </div>
    );
  }

  if (tab === 'sprint') {
    if (!pack.sprintPlan) return <div className="prose-block">No sprint plan for this input type.</div>;
    const { committed, cut, risks } = pack.sprintPlan;
    return (
      <div>
        <SectionLabel>Sprint Plan</SectionLabel>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[['✓ Committed', committed, 'text-emerald-400'], ['✂ Cut / Deferred', cut, 'text-amber-400']].map(([title, items, color]) => (
            <div key={title} className="bg-stone-900 border border-stone-700 rounded-lg p-4">
              <div className={`font-mono text-[10px] tracking-widest uppercase mb-3 ${color}`}>{title}</div>
              {(items || []).map((s, i) => (
                <div key={i} className="text-[12px] text-stone-200 leading-relaxed py-1.5 border-b border-stone-800 last:border-0">{s}</div>
              ))}
            </div>
          ))}
        </div>
        {risks && risks.length > 0 && (
          <>
            <SectionLabel>Sprint Risks</SectionLabel>
            {risks.map((r, i) => (
              <div key={i} className="flex gap-3 items-start px-4 py-3 rounded-lg mb-2 border bg-yellow-900/10 border-yellow-700/30 text-sm">
                <span className="font-mono text-[10px] font-bold text-yellow-400 shrink-0 pt-0.5">RISK</span>
                <span className="text-stone-200 leading-relaxed">{r}</span>
              </div>
            ))}
          </>
        )}
      </div>
    );
  }

  return null;
}

function SectionLabel({ children }) {
  return (
    <div className="font-mono text-[10px] tracking-widest text-stone-500 uppercase mb-3">{children}</div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [inputType, setInputType]   = useState('sprint');
  const [rawInput, setRawInput]     = useState('');
  const [loading, setLoading]       = useState(false);
  const [opsPack, setOpsPack]       = useState(null);
  const [activeTab, setActiveTab]   = useState(0);
  const [error, setError]           = useState(null);

  const handleGenerate = async () => {
    if (!rawInput.trim()) return;
    setLoading(true);
    setError(null);
    setOpsPack(null);
    try {
      const pack = await callClaudeAPI(rawInput, inputType);
      setOpsPack(pack);
      setActiveTab(0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0d0f12] text-slate-200 font-sans overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-stone-800 bg-stone-900 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]" />
          <span className="font-mono text-[13px] font-semibold tracking-wide">AI-OPS</span>
          <span className="text-[11px] text-stone-500 ml-1">/ startup operations system</span>
        </div>
        <span className="font-mono text-[10px] px-2 py-1 rounded bg-emerald-900/30 text-emerald-400 border border-emerald-700/40">
          LIVE ✦ Claude API
        </span>
      </header>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <div className="w-[340px] border-r border-stone-800 bg-stone-900 flex flex-col shrink-0 overflow-hidden">
          {/* Input type */}
          <div className="p-4 border-b border-stone-800">
            <div className="font-mono text-[10px] tracking-widest text-stone-500 uppercase mb-2.5">Input Type</div>
            <div className="grid grid-cols-2 gap-1.5">
              {INPUT_TYPES.map(t => (
                <button
                  key={t.key}
                  onClick={() => setInputType(t.key)}
                  className={`text-left text-[11px] px-3 py-2 rounded-md border transition-all ${
                    inputType === t.key
                      ? 'border-blue-500 bg-blue-900/20 text-blue-400'
                      : 'border-stone-700 bg-stone-800 text-stone-400 hover:border-stone-500 hover:text-stone-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text input */}
          <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
            <textarea
              className="flex-1 bg-stone-800 border border-stone-700 rounded-lg text-stone-200 font-mono text-[11.5px] leading-relaxed p-3 resize-none outline-none focus:border-blue-500 transition-colors placeholder-stone-600"
              placeholder={`Paste your raw ${inputType} notes here...\n\nThe messier the better — Claude will structure it into a full Ops Pack.`}
              value={rawInput}
              onChange={e => setRawInput(e.target.value)}
            />
            <div className="font-mono text-[10px] text-stone-600 text-right">{rawInput.length} characters</div>
            <button
              onClick={handleGenerate}
              disabled={loading || !rawInput.trim()}
              className="py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-mono text-[12px] font-semibold tracking-wider transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  GENERATING...
                </>
              ) : (
                <>⚡ GENERATE OPS PACK</>
              )}
            </button>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#0d0f12]">
          {!opsPack && !loading && !error && (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-stone-500">
              <div className="w-12 h-12 border border-stone-700 rounded-xl flex items-center justify-center text-2xl bg-stone-900">📋</div>
              <div className="text-[14px] font-medium text-stone-300">No ops pack generated yet</div>
              <div className="text-[12px] text-center max-w-[220px] leading-relaxed">
                Paste raw operational input on the left and hit Generate.
              </div>
            </div>
          )}

          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <div className="w-9 h-9 border-[3px] border-stone-700 border-t-blue-400 rounded-full animate-spin" />
              <div className="font-mono text-[12px] text-stone-500 animate-pulse">Synthesizing ops pack...</div>
            </div>
          )}

          {error && (
            <div className="p-5">
              <div className="bg-red-900/10 border border-red-700/30 rounded-lg p-4 text-[13px] text-red-300 leading-relaxed">
                <strong>Error:</strong> {error}
              </div>
            </div>
          )}

          {opsPack && (
            <>
              {/* Tab bar */}
              <div className="flex border-b border-stone-800 bg-stone-900 px-4 gap-0.5 shrink-0 overflow-x-auto">
                {TABS.map((t, i) => (
                  <button
                    key={t.key}
                    onClick={() => setActiveTab(i)}
                    className={`px-3 py-2.5 font-mono text-[11px] whitespace-nowrap border-b-2 transition-all shrink-0 ${
                      activeTab === i
                        ? 'text-blue-400 border-blue-400'
                        : 'text-stone-500 border-transparent hover:text-stone-300'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="flex-1 overflow-y-auto p-5 [&_.prose-block]:bg-stone-900 [&_.prose-block]:border [&_.prose-block]:border-stone-700 [&_.prose-block]:rounded-lg [&_.prose-block]:p-4 [&_.prose-block]:text-[13px] [&_.prose-block]:leading-relaxed [&_.prose-block]:text-stone-200">
                <TabContent tab={TABS[activeTab].key} pack={opsPack} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
