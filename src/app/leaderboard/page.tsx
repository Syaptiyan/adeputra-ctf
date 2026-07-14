'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface LeaderboardEntry {
  id: string
  username: string
  score: number
  solves: number
  rank: number
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<string | null>(null)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) setCurrentUser(user.id)

    // Get users with scores
    const { data: users } = await supabase
      .from('users')
      .select('id, username, score')
      .order('score', { ascending: false })
      .limit(50)

    if (users && users.length > 0) {
      // Get all solves in one query
      const userIds = users.map(u => u.id)
      const { data: solves } = await supabase
        .from('solves')
        .select('user_id')
        .in('user_id', userIds)

      // Count solves per user
      const solveCounts: Record<string, number> = {}
      if (solves) {
        solves.forEach(solve => {
          solveCounts[solve.user_id] = (solveCounts[solve.user_id] || 0) + 1
        })
      }

      // Build leaderboard
      const entries: LeaderboardEntry[] = users.map((user, index) => ({
        id: user.id,
        username: user.username,
        score: user.score || 0,
        solves: solveCounts[user.id] || 0,
        rank: index + 1
      }))

      setLeaderboard(entries)
    }
    setLoading(false)
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) return { emoji: '🥇', bg: 'bg-yellow-500/20 border-yellow-500/30' }
    if (rank === 2) return { emoji: '🥈', bg: 'bg-gray-400/20 border-gray-400/30' }
    if (rank === 3) return { emoji: '🥉', bg: 'bg-orange-600/20 border-orange-600/30' }
    return { emoji: `#${rank}`, bg: 'bg-gray-800 border-gray-700' }
  }

  const getTopThree = () => leaderboard.slice(0, 3)
  const getRest = () => leaderboard.slice(3)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">Papan Peringkat</h1>
        <p className="text-gray-400">Top 50 hacker terbaik di APCTF</p>
      </div>

      {/* Top 3 Podium */}
      {getTopThree().length >= 3 && (
        <div className="grid grid-cols-3 gap-4 mb-10">
          {/* 2nd Place */}
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 text-center mt-8">
            <div className="text-5xl mb-3">🥈</div>
            <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center text-2xl font-bold text-white mx-auto mb-3">
              {getTopThree()[1].username.charAt(0).toUpperCase()}
            </div>
            <Link href={`/profile/${getTopThree()[1].id}`} className="font-bold text-white hover:text-orange-400 transition-colors">
              {getTopThree()[1].username}
            </Link>
            <div className="text-2xl font-bold text-orange-500 mt-2">{getTopThree()[1].score}</div>
            <div className="text-gray-500 text-sm">{getTopThree()[1].solves} solved</div>
            {currentUser === getTopThree()[1].id && (
              <span className="inline-block mt-2 text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">Kamu</span>
            )}
          </div>

          {/* 1st Place */}
          <div className="bg-gradient-to-b from-yellow-500/10 to-gray-900 border border-yellow-500/30 rounded-2xl p-6 text-center">
            <div className="text-6xl mb-3">🥇</div>
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-3xl font-bold text-white mx-auto mb-3 shadow-lg shadow-yellow-500/25">
              {getTopThree()[0].username.charAt(0).toUpperCase()}
            </div>
            <Link href={`/profile/${getTopThree()[0].id}`} className="font-bold text-white hover:text-orange-400 transition-colors text-lg">
              {getTopThree()[0].username}
            </Link>
            <div className="text-3xl font-bold text-yellow-500 mt-2">{getTopThree()[0].score}</div>
            <div className="text-gray-500 text-sm">{getTopThree()[0].solves} solved</div>
            {currentUser === getTopThree()[0].id && (
              <span className="inline-block mt-2 text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">Kamu</span>
            )}
          </div>

          {/* 3rd Place */}
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 text-center mt-12">
            <div className="text-5xl mb-3">🥉</div>
            <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl flex items-center justify-center text-2xl font-bold text-white mx-auto mb-3">
              {getTopThree()[2].username.charAt(0).toUpperCase()}
            </div>
            <Link href={`/profile/${getTopThree()[2].id}`} className="font-bold text-white hover:text-orange-400 transition-colors">
              {getTopThree()[2].username}
            </Link>
            <div className="text-2xl font-bold text-orange-500 mt-2">{getTopThree()[2].score}</div>
            <div className="text-gray-500 text-sm">{getTopThree()[2].solves} solved</div>
            {currentUser === getTopThree()[2].id && (
              <span className="inline-block mt-2 text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">Kamu</span>
            )}
          </div>
        </div>
      )}

      {/* Rest of Leaderboard */}
      {getRest().length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-800/50 text-sm font-semibold text-gray-400">
            <div className="col-span-1">Rank</div>
            <div className="col-span-5">Pemain</div>
            <div className="col-span-3 text-right">Poin</div>
            <div className="col-span-3 text-right">Solved</div>
          </div>
          
          {getRest().map((entry) => {
            const rankBadge = getRankBadge(entry.rank)
            const isCurrentUser = currentUser === entry.id
            
            return (
              <div
                key={entry.id}
                className={`grid grid-cols-12 gap-4 px-6 py-4 border-t border-gray-800 hover:bg-gray-800/30 transition-colors ${
                  isCurrentUser ? 'bg-orange-500/5' : ''
                }`}
              >
                <div className="col-span-1 flex items-center">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold ${rankBadge.bg} border`}>
                    {rankBadge.emoji}
                  </span>
                </div>
                <div className="col-span-5 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-sm font-bold text-gray-300">
                    {entry.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <Link href={`/profile/${entry.id}`} className="font-medium text-white hover:text-orange-400 transition-colors">
                      {entry.username}
                    </Link>
                    {isCurrentUser && (
                      <span className="ml-2 text-xs bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded">Kamu</span>
                    )}
                  </div>
                </div>
                <div className="col-span-3 flex items-center justify-end">
                  <span className="font-bold text-orange-500">{entry.score}</span>
                </div>
                <div className="col-span-3 flex items-center justify-end">
                  <span className="text-gray-400">{entry.solves}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Empty State */}
      {leaderboard.length === 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
          <svg className="w-16 h-16 text-gray-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-gray-500 mb-4">Belum ada pemain</p>
          <Link
            href="/challenges"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Jadikan yang Pertama
          </Link>
        </div>
      )}
    </div>
  )
}
