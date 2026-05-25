import { useState } from 'react'
import { SAMPLE_INPUTS, INPUT_TYPE_LABELS } from '../data/sampleInputs'

// InputPanel — left-side input area: type selector, textarea, and action buttons.

const INPUT_TYPES = Object.keys(INPUT_TYPE_LABELS)

export default function InputPanel({ onGenerate, isGenerating }) {
  const [inputType, setInputType] = useState('sprint-meeting')
  const [inputText, setInputText] = useState('')

  function handleLoadSample() {
    setInputText(SAMPLE_INPUTS[inputType] || '')
  }

  function handleGenerate() {
    if (!inputText.trim()) return
    onGenerate(inputText, inputType)
  }

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0
  const canGenerate = inputText.trim().length > 0 && !isGenerating

  return (
    <div className="bg-white border border-gray-200 rounded-lg flex flex-col">
      {/* Panel header */}
      <div className="px-5 pt-5 pb-4 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900">Input</h2>
        <p className="text-xs text-gray-400 mt-0.5">Paste raw notes below. Select the input type for best results.</p>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Input type selector */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Input type</label>
          <select
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {INPUT_TYPES.map((type) => (
              <option key={type} value={type}>{INPUT_TYPE_LABELS[type]}</option>
            ))}
          </select>
        </div>

        {/* Textarea */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-gray-700">Raw notes</label>
            {wordCount > 0 && (
              <span className="text-xs text-gray-400">{wordCount} words</span>
            )}
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste meeting notes, customer interview notes, a founder brain dump, or any unstructured operational input…"
            className="flex-1 w-full text-sm border border-gray-200 rounded-lg px-3 py-3 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none leading-relaxed scrollbar-thin"
            style={{ minHeight: '280px' }}
          />
        </div>

        {/* Before/After label */}
        {inputText.trim().length === 0 && (
          <div className="flex items-center gap-3 py-2">
            <div className="h-px flex-1 bg-gray-100" />
            <span className="text-xs text-gray-300 font-medium">before</span>
            <div className="h-px flex-1 bg-gray-100" />
            <svg className="w-4 h-4 text-gray-200" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
            <div className="h-px flex-1 bg-gray-100" />
            <span className="text-xs text-gray-300 font-medium">after</span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleLoadSample}
            disabled={isGenerating}
            className="flex-shrink-0 px-3 py-2 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Load sample
          </button>
          <button
            onClick={handleGenerate}
            disabled={!canGenerate}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <LoadingSpinner />
                Synthesizing…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                </svg>
                Generate Ops Pack
              </>
            )}
          </button>
        </div>

        {/* Hint */}
        <p className="text-xs text-gray-400 text-center -mt-1">
          Or <button onClick={handleLoadSample} className="text-indigo-500 hover:text-indigo-600 underline underline-offset-2">load a sample input</button> to see it in action immediately.
        </p>
      </div>
    </div>
  )
}

function LoadingSpinner() {
  return (
    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}
