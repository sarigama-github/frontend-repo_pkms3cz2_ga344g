import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Wallet, ChartPie, Layers, Rocket } from 'lucide-react'
import Hero3D from './components/Hero3D'
import StatsCards from './components/StatsCards'
import ExpenseForm from './components/ExpenseForm'
import ExpensesTable from './components/ExpensesTable'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchExpenses = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${backend}/api/expenses`)
      const data = await res.json()
      setExpenses(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  const totals = useMemo(() => {
    const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0)
    const daily = total / Math.max(1, new Set(expenses.map(e => new Date(e.date || Date.now()).toDateString())).size)
    return { total, daily }
  }, [expenses])

  const kpis = [
    { label: 'Total Spend (all time)', value: `$${totals.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}` , delta: 8.2, color: 'bg-cyan-400' },
    { label: 'Avg Daily Burn', value: `$${totals.daily.toLocaleString(undefined, { maximumFractionDigits: 0 })}` , delta: 2.1, color: 'bg-fuchsia-400' },
    { label: 'Expenses Count', value: `${expenses.length}` , delta: 1.0, color: 'bg-indigo-400' },
    { label: 'Vendors (est.)', value: `${new Set(expenses.map(e=>e.vendor||'')).size}` , delta: 0.0, color: 'bg-emerald-400' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 grid place-items-center">
              <Rocket size={20} />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">Expendr</h1>
              <p className="text-xs text-slate-300">Manage startup spend with clarity</p>
            </div>
          </div>
          <a href="/test" className="text-sm text-slate-300 hover:text-white underline/30">System check</a>
        </header>

        <Hero3D />

        <section className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2"><ChartPie size={18}/> Overview</h2>
          <StatsCards kpis={kpis} />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2"><Wallet size={18}/> Add Expense</h2>
          <ExpenseForm onCreated={() => fetchExpenses()} />
        </section>

        <section className="space-y-4 pb-16">
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2"><Layers size={18}/> Recent Expenses</h2>
          <AnimatePresence mode="popLayout">
            {loading ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-slate-300">Loading...</motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <ExpensesTable items={expenses} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  )
}
