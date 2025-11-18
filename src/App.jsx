import { useEffect, useState } from 'react'
import Header from './components/Header'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE}/api/todos`)
      const data = await res.json()
      setTodos(data)
    } catch (e) {
      setError('Failed to load todos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const addTodo = async (title) => {
    try {
      const res = await fetch(`${API_BASE}/api/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })
      if (!res.ok) throw new Error('Failed to create')
      await fetchTodos()
    } catch (e) {
      setError('Could not add todo')
    }
  }

  const toggleTodo = async (todo) => {
    try {
      const res = await fetch(`${API_BASE}/api/todos/${todo.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
      })
      if (!res.ok) throw new Error('Failed to update')
      setTodos(prev => prev.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t))
    } catch (e) {
      setError('Could not update todo')
    }
  }

  const deleteTodo = async (todo) => {
    try {
      const res = await fetch(`${API_BASE}/api/todos/${todo.id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete')
      setTodos(prev => prev.filter(t => t.id !== todo.id))
    } catch (e) {
      setError('Could not delete todo')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative min-h-screen p-6 sm:p-10">
        <div className="max-w-2xl mx-auto">
          <Header />

          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 sm:p-8 shadow-xl">
            <TodoInput onAdd={addTodo} />

            {error && (
              <div className="mt-4 text-sm text-red-300">{error}</div>
            )}

            {loading ? (
              <div className="mt-6 text-blue-200/70 text-center">Loading...</div>
            ) : (
              <div className="mt-6">
                <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
              </div>
            )}
          </div>

          <div className="text-center mt-6">
            <a href="/test" className="text-blue-300/70 hover:text-blue-300 underline">Check backend status</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
