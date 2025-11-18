import React, { useState } from 'react'

export default function TodoInput({ onAdd }) {
  const [title, setTitle] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    await onAdd(trimmed)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 px-4 py-3 rounded-xl bg-slate-800/60 border border-blue-500/30 text-white placeholder:text-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      />
      <button
        type="submit"
        className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/20 transition"
      >
        Add
      </button>
    </form>
  )
}
