import { useState } from 'react'
import InputPanel from './components/InputPanel'
import OutputDashboard from './components/OutputDashboard'
import WorkflowMap from './components/WorkflowMap'
import ImpactEstimate from './components/ImpactEstimate'
import { generateOutputs } from './utils/generateOutputs'

export default function App() {
  const [outputs, setOutputs] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)

  async function handleGenerate(inputText, inputType) {
    setIsGenerating(true)
    setError(null)
    setOutputs(null)

    try {
      const result = await generateOutputs(inputText, inputType)
      setOutputs(result)
    } catch (err) {
      setError('Something went wrong generating your Ops Pack. Please try again.')
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── Top nav ─────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
              </svg>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-900">AI Startup Operations System</span>
              <span className="hidden sm:inline text-xs text-gray-400 ml-2">· Turn operational chaos into execution-ready outputs</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              AI-powered
            </span>
          </div>
        </div>
      </header>

      {/* ── Page content ────────────────────────────────────────────── */}
      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col gap-5">

        {/* ── Workflow map (always visible) ── */}
        <WorkflowMap />

        {/* ── Main two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-5">
          <InputPanel onGenerate={handleGenerate} isGenerating={isGenerating} />
          <OutputDashboard outputs={outputs} isGenerating={isGenerating} />
        </div>

        {/* ── Error state ── */}
        {error && (
          <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            {error}
          </div>
        )}

        {/* ── Impact estimate (shown after generation) ── */}
        {outputs && <ImpactEstimate impactEstimate={outputs.impactEstimate} />}

        {/* ── Footer ── */}
        <footer className="pb-4 flex items-center justify-between text-xs text-gray-400">
          <span>AI Startup Operations System · Portfolio project</span>
          <span>Structured by AI · Executed by humans</span>
        </footer>
      </main>
    </div>
  )
}
