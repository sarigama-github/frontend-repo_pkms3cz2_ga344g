import React, { useState } from 'react'

export default function ExpenseForm({ onCreated }) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '', amount: '', category_id: '', date: '', vendor: '', payment_method: '', notes: ''
  })

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...form,
        amount: parseFloat(form.amount || '0'),
        date: form.date ? new Date(form.date).toISOString() : undefined,
        category_id: form.category_id || undefined,
      }
      const res = await fetch(`${backend}/api/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to create expense')
      const data = await res.json()
      onCreated?.(data)
      setForm({ title: '', amount: '', category_id: '', date: '', vendor: '', payment_method: '', notes: '' })
    } catch (err) {
      console.error(err)
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
      <div className="md:col-span-2">
        <label className="block text-sm text-slate-600 mb-1">Title</label>
        <input name="title" value={form.title} onChange={handleChange} required className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="e.g., AWS EC2" />
      </div>
      <div>
        <label className="block text-sm text-slate-600 mb-1">Amount ($)</label>
        <input name="amount" type="number" step="0.01" value={form.amount} onChange={handleChange} required className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="0.00" />
      </div>
      <div>
        <label className="block text-sm text-slate-600 mb-1">Category ID</label>
        <input name="category_id" value={form.category_id} onChange={handleChange} className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="optional" />
      </div>
      <div>
        <label className="block text-sm text-slate-600 mb-1">Date</label>
        <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm text-slate-600 mb-1">Notes</label>
        <input name="notes" value={form.notes} onChange={handleChange} className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="optional" />
      </div>
      <button disabled={loading} className="md:col-span-6 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2.5 transition">
        {loading ? 'Adding...' : 'Add Expense'}
      </button>
    </form>
  )
}
