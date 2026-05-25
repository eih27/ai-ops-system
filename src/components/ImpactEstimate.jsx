// ImpactEstimate — shows the before/after value delta of using the ops system.

const STAT_ICONS = {
  time: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  outputs: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
    </svg>
  ),
  next: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
}

export default function ImpactEstimate({ impactEstimate }) {
  if (!impactEstimate) return null

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Impact Estimate</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Manual time avoided */}
        <div className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
          <div className="text-indigo-500 mt-0.5">{STAT_ICONS.time}</div>
          <div>
            <p className="text-lg font-bold text-indigo-700 leading-tight">{impactEstimate.timeSaved}</p>
            <p className="text-xs text-indigo-500 leading-tight mt-0.5">Manual synthesis time avoided</p>
          </div>
        </div>

        {/* Outputs generated */}
        <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
          <div className="text-emerald-500 mt-0.5">{STAT_ICONS.outputs}</div>
          <div>
            <p className="text-lg font-bold text-emerald-700 leading-tight">{impactEstimate.outputsGenerated} outputs</p>
            <p className="text-xs text-emerald-500 leading-tight mt-0.5">Structured artifacts generated</p>
          </div>
        </div>

        {/* Next workflow */}
        <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
          <div className="text-amber-500 mt-0.5">{STAT_ICONS.next}</div>
          <div>
            <p className="text-xs font-semibold text-amber-700 leading-tight">Suggested next step</p>
            <p className="text-xs text-amber-600 leading-tight mt-0.5">{impactEstimate.nextWorkflow}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
