import { useState } from 'react'
import ActionItemsTable from './ActionItemsTable'

// ─── Tab configuration ────────────────────────────────────────────────────────

const TABS = [
  { id: 'summary', label: 'Summary' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'actionItems', label: 'Action Items' },
  { id: 'prd', label: 'PRD' },
  { id: 'risks', label: 'Risks' },
  { id: 'stakeholder', label: 'Stakeholder Update' },
  { id: 'email', label: 'Follow-up Email' },
]

const STATUS_STYLES = {
  Decided: 'bg-green-50 text-green-700 border border-green-200',
  Recommended: 'bg-blue-50 text-blue-700 border border-blue-200',
  Open: 'bg-amber-50 text-amber-700 border border-amber-200',
  'Open — P0': 'bg-red-50 text-red-700 border border-red-200',
  'Open — sensitive': 'bg-orange-50 text-orange-700 border border-orange-200',
  'Deferred': 'bg-gray-100 text-gray-500 border border-gray-200',
  'Recommended for Q3': 'bg-purple-50 text-purple-700 border border-purple-200',
  'Urgent': 'bg-red-50 text-red-700 border border-red-200',
}

const RISK_STYLES = {
  High: { badge: 'bg-red-50 text-red-700 border border-red-200', bar: 'bg-red-400' },
  Medium: { badge: 'bg-amber-50 text-amber-700 border border-amber-200', bar: 'bg-amber-400' },
  Low: { badge: 'bg-green-50 text-green-700 border border-green-200', bar: 'bg-green-400' },
}

// ─── Sub-renderers ────────────────────────────────────────────────────────────

function SummaryTab({ summary }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Executive Summary</h3>
      <div className="prose prose-sm max-w-none">
        {summary.split('\n\n').map((para, i) => (
          <p key={i} className="text-gray-700 leading-relaxed mb-3 last:mb-0">{para}</p>
        ))}
      </div>
    </div>
  )
}

function DecisionsTab({ decisions }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Key Decisions</h3>
      <div className="space-y-3">
        {decisions.map((d) => (
          <div key={d.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-200 text-gray-600 text-xs font-bold flex items-center justify-center mt-0.5">
              {d.id}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-800 leading-snug">{d.decision}</p>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="text-xs text-gray-500">{d.owner}</span>
                <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${STATUS_STYLES[d.status] || STATUS_STYLES.Open}`}>
                  {d.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PRDTab({ prd }) {
  // Render markdown-ish content with basic formatting
  const lines = prd.split('\n')
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Product Requirements Draft</h3>
      <div className="space-y-1">
        {lines.map((line, i) => {
          if (line.startsWith('## ')) {
            return <h2 key={i} className="text-base font-semibold text-gray-900 mt-4 mb-1 first:mt-0">{line.replace('## ', '')}</h2>
          }
          if (line.startsWith('### ')) {
            return <h3 key={i} className="text-sm font-semibold text-gray-700 mt-3 mb-1">{line.replace('### ', '')}</h3>
          }
          if (line.startsWith('**') && line.endsWith('**')) {
            return <p key={i} className="text-sm font-semibold text-gray-800">{line.replace(/\*\*/g, '')}</p>
          }
          if (line.startsWith('- ')) {
            return (
              <div key={i} className="flex items-start gap-2">
                <span className="text-gray-400 mt-1 flex-shrink-0">•</span>
                <p className="text-sm text-gray-700 leading-relaxed">{renderInlineBold(line.replace('- ', ''))}</p>
              </div>
            )
          }
          if (line.trim() === '') return <div key={i} className="h-1" />
          return <p key={i} className="text-sm text-gray-700 leading-relaxed">{renderInlineBold(line)}</p>
        })}
      </div>
    </div>
  )
}

function RisksTab({ risks }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Risks & Open Questions</h3>
      <div className="space-y-2.5">
        {risks.map((risk, i) => {
          const style = RISK_STYLES[risk.severity] || RISK_STYLES.Medium
          return (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50">
              <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${style.bar}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 leading-snug">{risk.description}</p>
              </div>
              <span className={`flex-shrink-0 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${style.badge}`}>
                {risk.severity}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StakeholderTab({ stakeholderUpdate }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Stakeholder Update</h3>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        {stakeholderUpdate.split('\n\n').map((para, i) => {
          if (para.startsWith('**') && para.includes('**')) {
            const [bold, ...rest] = para.split('\n')
            return (
              <div key={i} className="mb-3">
                <p className="text-sm font-semibold text-gray-900 mb-1">{bold.replace(/\*\*/g, '')}</p>
                {rest.map((line, j) => (
                  <p key={j} className="text-sm text-gray-700 leading-relaxed">{renderInlineBold(line)}</p>
                ))}
              </div>
            )
          }
          return (
            <p key={i} className="text-sm text-gray-700 leading-relaxed mb-2 last:mb-0">
              {renderInlineBold(para)}
            </p>
          )
        })}
      </div>
    </div>
  )
}

function EmailTab({ followUpEmail }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    const text = `Subject: ${followUpEmail.subject}\n\n${followUpEmail.body}`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Follow-up Email Draft</h3>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span className="text-green-600">Copied</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
        {/* Email header */}
        <div className="border-b border-gray-200 px-4 py-2.5 bg-white">
          <p className="text-xs text-gray-500">Subject</p>
          <p className="text-sm font-medium text-gray-900">{followUpEmail.subject}</p>
        </div>
        {/* Email body */}
        <div className="px-4 py-3">
          {followUpEmail.body.split('\n\n').map((para, i) => {
            if (para.startsWith('**') && para.endsWith('**')) {
              return <p key={i} className="text-sm font-semibold text-gray-900 mb-2">{para.replace(/\*\*/g, '')}</p>
            }
            const lines = para.split('\n')
            return (
              <div key={i} className="mb-3 last:mb-0">
                {lines.map((line, j) => (
                  <p key={j} className="text-sm text-gray-700 leading-relaxed">{renderInlineBold(line)}</p>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Simple inline bold renderer: **text** → <strong>text</strong>
function renderInlineBold(text) {
  if (!text.includes('**')) return text
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return parts.map((part, i) =>
    part.startsWith('**') ? <strong key={i} className="font-semibold text-gray-900">{part.replace(/\*\*/g, '')}</strong> : part
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function OutputDashboard({ outputs }) {
  const [activeTab, setActiveTab] = useState('summary')

  if (!outputs) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-3">
          <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-500">No output yet</p>
        <p className="text-xs text-gray-400 mt-1">Paste notes and click "Generate Ops Pack" to begin</p>
      </div>
    )
  }

  function renderTabContent() {
    switch (activeTab) {
      case 'summary':    return <SummaryTab summary={outputs.summary} />
      case 'decisions':  return <DecisionsTab decisions={outputs.decisions} />
      case 'actionItems': return (
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Action Items</h3>
          <ActionItemsTable actionItems={outputs.actionItems} />
        </div>
      )
      case 'prd':        return <PRDTab prd={outputs.prd} />
      case 'risks':      return <RisksTab risks={outputs.risks} />
      case 'stakeholder': return <StakeholderTab stakeholderUpdate={outputs.stakeholderUpdate} />
      case 'email':      return <EmailTab followUpEmail={outputs.followUpEmail} />
      default:           return null
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden">
      {/* Tab bar */}
      <div className="border-b border-gray-200 overflow-x-auto flex-shrink-0">
        <nav className="flex px-4 gap-0" aria-label="Output tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-shrink-0 px-3 py-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap
                ${activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-5" style={{ maxHeight: '520px' }}>
        {renderTabContent()}
      </div>
    </div>
  )
}
