'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function NewChallenge() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'web',
    difficulty: 'easy',
    points: 100,
    flag: '',
    hints: [''],
    author: 'ADE PUTRA',
    is_active: true,
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    checkAdmin()
  }, [])

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()
    if (profile?.role !== 'admin') {
      router.push('/')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const hints = form.hints.filter(h => h.trim() !== '')

    const { error } = await supabase
      .from('challenges')
      .insert([{
        ...form,
        hints,
      }])

    if (!error) {
      router.push('/admin')
    }
    setSaving(false)
  }

  const addHint = () => {
    setForm({ ...form, hints: [...form.hints, ''] })
  }

  const removeHint = (index: number) => {
    const hints = form.hints.filter((_, i) => i !== index)
    setForm({ ...form, hints })
  }

  const updateHint = (index: number, value: string) => {
    const hints = [...form.hints]
    hints[index] = value
    setForm({ ...form, hints })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">New Challenge</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="input min-h-[200px]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="input"
              >
                <option value="web">Web</option>
                <option value="crypto">Crypto</option>
                <option value="forensics">Forensics</option>
                <option value="reverse">Reverse</option>
                <option value="osint">OSINT</option>
                <option value="misc">Misc</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Difficulty</label>
              <select
                value={form.difficulty}
                onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                className="input"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Points</label>
              <input
                type="number"
                value={form.points}
                onChange={(e) => setForm({ ...form, points: parseInt(e.target.value) })}
                className="input"
                min="50"
                step="50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Author</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="input"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Flag</label>
            <input
              type="text"
              value={form.flag}
              onChange={(e) => setForm({ ...form, flag: e.target.value })}
              className="input"
              placeholder="APCTF{...}"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Hints</label>
            {form.hints.map((hint, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={hint}
                  onChange={(e) => updateHint(index, e.target.value)}
                  className="input flex-1"
                  placeholder={`Hint ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeHint(index)}
                  className="btn-secondary text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addHint}
              className="text-orange-500 hover:underline text-sm"
            >
              + Add Hint
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary"
          >
            {saving ? 'Saving...' : 'Create Challenge'}
          </button>
        </div>
      </form>
    </div>
  )
}
