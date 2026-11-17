import { useState, useEffect } from 'react'

interface Task {
  id: string
  text: string
  completed: boolean
  category: string
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  createdAt: string
}

const CATEGORIES = [
  { key: 'all', label: 'All', icon: '📋' },
  { key: 'venue', label: 'Venue', icon: '🏛️' },
  { key: 'attire', label: 'Attire', icon: '👗' },
  { key: 'food', label: 'Food & Drinks', icon: '🍽️' },
  { key: 'decor', label: 'Decor', icon: '🎨' },
  { key: 'music', label: 'Music & DJ', icon: '🎵' },
  { key: 'photo', label: 'Photo & Video', icon: '📸' },
  { key: 'guests', label: 'Guests', icon: '💌' },
  { key: 'other', label: 'Other', icon: '✨' },
]

const PRIORITY_COLORS = {
  low: '#4ade80',
  medium: '#fbbf24',
  high: '#f87171',
}

const DEFAULT_TASKS: Task[] = [
  { id: '1', text: 'Book the wedding venue', completed: false, category: 'venue', priority: 'high', createdAt: new Date().toISOString() },
  { id: '2', text: 'Send out save-the-dates', completed: false, category: 'guests', priority: 'high', createdAt: new Date().toISOString() },
  { id: '3', text: 'Finalize catering menu', completed: false, category: 'food', priority: 'medium', createdAt: new Date().toISOString() },
  { id: '4', text: 'Book photographer', completed: false, category: 'photo', priority: 'high', createdAt: new Date().toISOString() },
  { id: '5', text: 'Choose wedding outfit', completed: false, category: 'attire', priority: 'medium', createdAt: new Date().toISOString() },
  { id: '6', text: 'Arrange floral decorations', completed: false, category: 'decor', priority: 'low', createdAt: new Date().toISOString() },
  { id: '7', text: 'Book DJ / band', completed: false, category: 'music', priority: 'medium', createdAt: new Date().toISOString() },
  { id: '8', text: 'Design & print invitations', completed: false, category: 'guests', priority: 'medium', createdAt: new Date().toISOString() },
]

function loadTasks(): Task[] {
  try {
    const saved = localStorage.getItem('wedding-tasks')
    if (saved) return JSON.parse(saved)
  } catch {}
  return DEFAULT_TASKS
}

function saveTasks(tasks: Task[]) {
  localStorage.setItem('wedding-tasks', JSON.stringify(tasks))
}

function Planner() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)
  const [filter, setFilter] = useState('all')
  const [newTask, setNewTask] = useState('')
  const [newCategory, setNewCategory] = useState('other')
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const addTask = () => {
    if (!newTask.trim()) return
    const task: Task = {
      id: Date.now().toString(),
      text: newTask.trim(),
      completed: false,
      category: newCategory,
      priority: newPriority,
      createdAt: new Date().toISOString(),
    }
    setTasks([task, ...tasks])
    setNewTask('')
    setShowAddForm(false)
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(t => t.category === filter)
  const completedCount = tasks.filter(t => t.completed).length
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0

  return (
    <div className="planner-page">
      <div className="page-header">
        <h1>Wedding Planner</h1>
        <p>Keep track of everything for the big day</p>
      </div>

      {/* Progress overview */}
      <div className="planner-progress">
        <div className="progress-stats">
          <div className="stat">
            <span className="stat-number">{tasks.length}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
          <div className="stat">
            <span className="stat-number">{completedCount}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat">
            <span className="stat-number">{tasks.length - completedCount}</span>
            <span className="stat-label">Remaining</span>
          </div>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}>
            <span className="progress-text">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="category-filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            className={`category-chip ${filter === cat.key ? 'active' : ''}`}
            onClick={() => setFilter(cat.key)}
          >
            <span>{cat.icon}</span> {cat.label}
          </button>
        ))}
      </div>

      {/* Add task */}
      <div className="add-task-section">
        {!showAddForm ? (
          <button className="add-task-btn" onClick={() => setShowAddForm(true)}>
            + Add New Task
          </button>
        ) : (
          <div className="add-task-form">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTask()}
              autoFocus
            />
            <div className="form-row">
              <select value={newCategory} onChange={e => setNewCategory(e.target.value)}>
                {CATEGORIES.filter(c => c.key !== 'all').map(cat => (
                  <option key={cat.key} value={cat.key}>{cat.icon} {cat.label}</option>
                ))}
              </select>
              <select value={newPriority} onChange={e => setNewPriority(e.target.value as Task['priority'])}>
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
              <button className="btn-save" onClick={addTask}>Add</button>
              <button className="btn-cancel" onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>

      {/* Task list */}
      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🎉</span>
            <p>No tasks here{filter !== 'all' ? ' in this category' : ''}. Nice!</p>
          </div>
        ) : (
          filteredTasks
            .sort((a, b) => {
              if (a.completed !== b.completed) return a.completed ? 1 : -1
              const pOrder = { high: 0, medium: 1, low: 2 }
              return pOrder[a.priority] - pOrder[b.priority]
            })
            .map(task => (
              <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <button
                  className={`task-checkbox ${task.completed ? 'checked' : ''}`}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed && '✓'}
                </button>
                <div className="task-content">
                  <span className="task-text">{task.text}</span>
                  <div className="task-meta">
                    <span className="task-category">
                      {CATEGORIES.find(c => c.key === task.category)?.icon}{' '}
                      {CATEGORIES.find(c => c.key === task.category)?.label}
                    </span>
                    <span
                      className="task-priority"
                      style={{ color: PRIORITY_COLORS[task.priority] }}
                    >
                      ● {task.priority}
                    </span>
                  </div>
                </div>
                <button className="task-delete" onClick={() => deleteTask(task.id)} title="Delete">
                  ×
                </button>
              </div>
            ))
        )}
      </div>
    </div>
  )
}

export default Planner
