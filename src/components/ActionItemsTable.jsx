// ActionItemsTable — renders action items as a structured, scannable table.

const PRIORITY_STYLES = {
  High: 'bg-red-50 text-red-700 border border-red-200',
  Medium: 'bg-amber-50 text-amber-700 border border-amber-200',
  Low: 'bg-green-50 text-green-700 border border-green-200',
}

export default function ActionItemsTable({ actionItems }) {
  if (!actionItems || actionItems.length === 0) {
    return <p className="text-sm text-gray-400 italic">No action items generated.</p>
  }

  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Task</th>
            <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Owner</th>
            <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Priority</th>
            <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Function</th>
            <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Due</th>
          </tr>
        </thead>
        <tbody>
          {actionItems.map((item, idx) => (
            <tr
              key={idx}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-2.5 px-3 text-gray-900 font-medium leading-snug max-w-xs">{item.task}</td>
              <td className="py-2.5 px-3 text-gray-600 whitespace-nowrap">{item.owner}</td>
              <td className="py-2.5 px-3">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${PRIORITY_STYLES[item.priority] || PRIORITY_STYLES.Medium}`}>
                  {item.priority}
                </span>
              </td>
              <td className="py-2.5 px-3 text-gray-500 whitespace-nowrap">{item.function}</td>
              <td className="py-2.5 px-3 text-gray-500 whitespace-nowrap">{item.dueTimeframe}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
