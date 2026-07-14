'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams } from 'next/navigation'
import { Challenge } from '@/types'

export default function ChallengeDetail() {
  const { id } = useParams()
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [flag, setFlag] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [solved, setSolved] = useState(false)
  const [showHint, setShowHint] = useState<number[]>([])
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    fetchChallenge()
  }, [id])

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [cooldown])

  const fetchChallenge = async () => {
    const { data, error } = await supabase
      .from('challenges')
      .select('id, title, description, category, difficulty, points, hints, author, is_active')
      .eq('id', id)
      .single()

    if (data) {
      setChallenge(data as any)
      
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: solve } = await supabase
          .from('solves')
          .select('*')
          .eq('user_id', user.id)
          .eq('challenge_id', id)
          .single()
        
        if (solve) setSolved(true)
      }
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage(null)

    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      setMessage({ type: 'error', text: 'Please login first' })
      setSubmitting(false)
      return
    }

    if (cooldown > 0) {
      setMessage({ type: 'error', text: `Tunggu ${cooldown} detik lagi` })
      setSubmitting(false)
      return
    }

    // Use server-side validation via RPC
    const { data: result, error } = await supabase.rpc('check_flag', {
      p_user_id: user.id,
      p_challenge_id: id as string,
      p_flag: flag,
    })

    if (error) {
      setMessage({ type: 'error', text: 'Error checking flag. Please try again.' })
      console.error('Flag check error:', error)
    } else if (result) {
      if (result.correct) {
        setMessage({ type: 'success', text: `${result.message} +${result.points} points!` })
        setSolved(true)
      } else {
        setMessage({ type: 'error', text: result.message })
        // Use server-side cooldown if available, otherwise client-side
        const cooldownTime = result.seconds_left || 5
        setCooldown(cooldownTime)
      }
    }
    setSubmitting(false)
  }

  const handleShowHint = async (index: number) => {
    if (!showHint.includes(index)) {
      setShowHint([...showHint, index])
    }
  }

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'badge-easy'
      case 'medium': return 'badge-medium'
      case 'hard': return 'badge-hard'
      default: return ''
    }
  }

  if (loading) {
    return <div className="text-center py-20">Loading...</div>
  }

  if (!challenge) {
    return <div className="text-center py-20">Challenge not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="category-badge">{challenge.category}</span>
          <span className={getDifficultyBadge(challenge.difficulty)}>
            {challenge.difficulty}
          </span>
          <span className="bg-orange-500/20 text-orange-400 text-xs font-bold px-2 py-1 rounded">
            {challenge.points} pts
          </span>
          {solved && (
            <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">
              SOLVED
            </span>
          )}
        </div>

        <h1 className="text-3xl font-bold mb-4">{challenge.title}</h1>
        <p className="text-gray-300 mb-6 whitespace-pre-wrap">{challenge.description}</p>

        <div className="text-sm text-gray-400 mb-6">
          Author: {challenge.author}
        </div>

        {challenge.hints && challenge.hints.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Hints</h3>
            {challenge.hints.map((hint, index) => (
              <div key={index} className="mb-2">
                {showHint.includes(index) ? (
                  <p className="text-gray-300 bg-gray-800 p-3 rounded">{hint}</p>
                ) : (
                  <button
                    onClick={() => handleShowHint(index)}
                    className="text-orange-500 hover:underline text-sm"
                  >
                    Show Hint {index + 1}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {!solved && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Submit Flag
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={flag}
                  onChange={(e) => setFlag(e.target.value)}
                  placeholder="APCTF{...}"
                  className="input flex-1"
                  required
                />
                <button
                  type="submit"
                  disabled={submitting || cooldown > 0}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Checking...' : cooldown > 0 ? `Wait ${cooldown}s` : 'Submit'}
                </button>
              </div>
            </div>
          </form>
        )}

        {message && (
          <div className={`mt-4 p-3 rounded ${
            message.type === 'success' 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-red-500/20 text-red-400'
          }`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  )
}
