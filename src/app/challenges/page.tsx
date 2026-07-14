'use client'

import { useState, useEffect, Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Challenge } from '@/types'

function ChallengesContent() {
  const searchParams = useSearchParams()
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [category, setCategory] = useState<string>(searchParams.get('category') || 'all')

  useEffect(() => {
    fetchChallenges()
  }, [])

  const fetchChallenges = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    const { data } = await supabase
      .from('challenges')
      .select('id, title, description, category, difficulty, points, author, is_active')
      .eq('is_active', true)
      .order('points', { ascending: true })

    if (data) {
      setChallenges(data)
      
      // Fetch user's solves
      if (user) {
        const { data: solves } = await supabase
          .from('solves')
          .select('challenge_id')
          .eq('user_id', user.id)
        
        if (solves) {
          setSolvedIds(new Set(solves.map(s => s.challenge_id)))
        }
      }
    }
    setLoading(false)
  }

  const filteredChallenges = challenges.filter((c) => {
    if (filter !== 'all' && c.difficulty !== filter) return false
    if (category !== 'all' && c.category !== category) return false
    return true
  })

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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Tantangan</h1>

      <div className="flex flex-wrap gap-4 mb-8">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="input w-auto"
        >
          <option value="all">Semua Kesulitan</option>
          <option value="easy">Mudah</option>
          <option value="medium">Sedang</option>
          <option value="hard">Sulit</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input w-auto"
        >
          <option value="all">Semua Kategori</option>
          <option value="web">Web</option>
          <option value="crypto">Crypto</option>
          <option value="forensics">Forensics</option>
          <option value="reverse">Reverse</option>
          <option value="osint">OSINT</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => {
          const isSolved = solvedIds.has(challenge.id)
          return (
            <Link key={challenge.id} href={`/challenges/${challenge.id}`}>
              <div className={`card transition-colors cursor-pointer h-full ${
                isSolved ? 'border-green-500/50 bg-green-500/5' : 'hover:border-orange-500'
              }`}>
                <div className="flex justify-between items-start mb-3">
                  <span className="category-badge">{challenge.category}</span>
                  <div className="flex gap-2">
                    {isSolved && (
                      <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">
                        SOLVED
                      </span>
                    )}
                    <span className={getDifficultyBadge(challenge.difficulty)}>
                      {challenge.difficulty}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{challenge.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {challenge.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-orange-500 font-bold">{challenge.points} pts</span>
                  <span className="text-gray-500 text-sm">by {challenge.author}</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {filteredChallenges.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          Tidak ada tantangan ditemukan
        </div>
      )}
    </div>
  )
}

export default function Challenges() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <ChallengesContent />
    </Suspense>
  )
}
