import React from 'react'

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="flex items-center gap-3 bg-slate-800/40 border border-slate-700 rounded-xl px-4 py-3">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo)}
        className="h-5 w-5 accent-blue-500"
      />
      <div className={`flex-1 text-white ${todo.completed ? 'line-through text-blue-200/50' : ''}`}>
        {todo.title}
      </div>
      <button
        onClick={() => onDelete(todo)}
        className="text-red-300 hover:text-red-400 text-sm"
      >
        Delete
      </button>
    </div>
  )
}

export default function TodoList({ todos, onToggle, onDelete }) {
  if (!todos.length) {
    return (
      <div className="text-center text-blue-200/70 py-8">No tasks yet. Add one above.</div>
    )
  }

  return (
    <div className="space-y-3">
      {todos.map(t => (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} />)
      )}
    </div>
  )
}
