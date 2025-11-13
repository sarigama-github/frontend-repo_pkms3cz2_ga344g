import React from 'react'

export default function ExpensesTable({ items = [] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Title</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Amount</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Date</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Category</th>
          </tr>
        </thead>
        <tbody>
          {items.map((e, i) => (
            <tr key={e._id || i} className="border-t border-slate-100 hover:bg-slate-50/60">
              <td className="px-4 py-3 text-slate-800">{e.title}</td>
              <td className="px-4 py-3 text-slate-900 font-medium">${Number(e.amount).toLocaleString()}</td>
              <td className="px-4 py-3 text-slate-600">{e.date ? new Date(e.date).toLocaleDateString() : '-'}</td>
              <td className="px-4 py-3 text-slate-600">{e.category_id || '-'}</td>
            </tr>
          ))}
          {!items.length && (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-slate-500">No expenses yet. Add your first one above.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
