import React from 'react'

function Stat({ label, value, delta, color }) {
  const isUp = delta >= 0
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg">
      <div className={`absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl opacity-20 ${color}`} />
      <div className="flex items-center justify-between">
        <p className="text-slate-600 text-sm font-medium">{label}</p>
        <span className={`text-xs font-semibold ${isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
          {isUp ? '+' : ''}{delta}%
        </span>
      </div>
      <p className="mt-2 text-2xl md:text-3xl font-semibold text-slate-900">{value}</p>
    </div>
  )
}

export default function StatsCards({ kpis }) {
  const defaults = [
    { label: 'Total Spend (30d)', value: '$42,380', delta: 12.4, color: 'bg-cyan-400' },
    { label: 'Runway Left', value: '14.2 months', delta: -1.1, color: 'bg-fuchsia-400' },
    { label: 'Avg. Daily Burn', value: '$1,412', delta: 4.3, color: 'bg-indigo-400' },
    { label: 'Vendors (active)', value: '23', delta: 0.0, color: 'bg-emerald-400' },
  ]
  const data = kpis?.length ? kpis : defaults
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((s, i) => (
        <Stat key={i} {...s} />
      ))}
    </div>
  )
}
