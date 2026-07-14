'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Challenge } from '@/types'

export default function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [category, setCategory] = useState<string>('all')

  useEffect(() => {
    fetchChallenges()
  }, [])

  const fetchChallenges = async () => {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .eq('is_active', true)
      .order('points', { ascending: true })

    if (data) {
      setChallenges(data)
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
      <h1 className="text-3xl font-bold mb-8">Challenges</h1>

      <div className="flex flex-wrap gap-4 mb-8">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="input w-auto"
        >
          <option value="all">All Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input w-auto"
        >
          <option value="all">All Categories</option>
          <option value="web">Web</option>
          <option value="crypto">Crypto</option>
          <option value="forensics">Forensics</option>
          <option value="reverse">Reverse</option>
          <option value="osint">OSINT</option>
          <option value="misc">Misc</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => (
          <Link key={challenge.id} href={`/challenges/${challenge.id}`}>
            <div className="card hover:border-orange-500 transition-colors cursor-pointer h-full">
              <div className="flex justify-between items-start mb-3">
                <span className="category-badge">{challenge.category}</span>
                <span className={getDifficultyBadge(challenge.difficulty)}>
                  {challenge.difficulty}
                </span>
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
        ))}
      </div>

      {filteredChallenges.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          No challenges found
        </div>
      )}
    </div>
  )
}
