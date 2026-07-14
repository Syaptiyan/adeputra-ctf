'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { LeaderboardEntry } from '@/types'

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    // Get users with their scores
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

      // Build leaderboard entries
      const entries: LeaderboardEntry[] = users.map(user => ({
        username: user.username,
        score: user.score || 0,
        solves: solveCounts[user.id] || 0,
      }))

      setLeaderboard(entries)
    }
    setLoading(false)
  }

  const getRankBadge = (index: number) => {
    if (index === 0) return '🥇'
    if (index === 1) return '🥈'
    if (index === 2) return '🥉'
    return `#${index + 1}`
  }

  if (loading) {
    return <div className="text-center py-20">Loading...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Leaderboard</h1>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4 text-gray-400">Rank</th>
                <th className="text-left py-3 px-4 text-gray-400">Player</th>
                <th className="text-right py-3 px-4 text-gray-400">Score</th>
                <th className="text-right py-3 px-4 text-gray-400">Solves</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.username} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-bold">
                    {getRankBadge(index)}
                  </td>
                  <td className="py-3 px-4">{entry.username}</td>
                  <td className="py-3 px-4 text-right text-orange-500 font-bold">
                    {entry.score}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-400">
                    {entry.solves}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {leaderboard.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            No players yet
          </div>
        )}
      </div>
    </div>
  )
}
