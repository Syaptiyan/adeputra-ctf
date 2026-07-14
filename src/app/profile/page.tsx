'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface UserProfile {
  id: string
  email: string
  username: string
  role: string
  score: number
  created_at: string
}

interface Solve {
  id: string
  challenge_id: string
  points_earned: number
  solved_at: string
  challenges: {
    title: string
    category: string
    difficulty: string
    points: number
  } | null
}

export default function Profile() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [solves, setSolves] = useState<Solve[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ totalPoints: 0, totalSolves: 0, rank: 0 })
  const router = useRouter()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/login')
      return
    }

    setUser(user)

    // Fetch profile
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileData) {
      setProfile(profileData)
    } else if (profileError) {
      const { data: newProfile } = await supabase
        .from('users')
        .insert([{ id: user.id, email: user.email, username: user.email?.split('@')[0] || 'user' }])
        .select()
        .single()
      if (newProfile) setProfile(newProfile)
    }

    // Fetch solves with challenge details
    const { data: solvesData } = await supabase
      .from('solves')
      .select(`
        id,
        challenge_id,
        points_earned,
        solved_at,
        challenges (title, category, difficulty, points)
      `)
      .eq('user_id', user.id)
      .order('solved_at', { ascending: false })

    if (solvesData) {
      setSolves(solvesData as any)
    }

    // Calculate stats
    const totalSolves = solvesData?.length || 0
    const totalPoints = solvesData?.reduce((sum: number, s: any) => sum + s.points_earned, 0) || 0

    // Get rank
    const { count: rank } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .gt('score', totalPoints)

    setStats({
      totalPoints,
      totalSolves,
      rank: (rank || 0) + 1
    })

    setLoading(false)
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      web: 'bg-blue-500/20 text-blue-400',
      crypto: 'bg-purple-500/20 text-purple-400',
      forensics: 'bg-green-500/20 text-green-400',
      reverse: 'bg-red-500/20 text-red-400',
      osint: 'bg-yellow-500/20 text-yellow-400',
      misc: 'bg-gray-500/20 text-gray-400',
    }
    return colors[category] || 'bg-gray-500/20 text-gray-400'
  }

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      easy: 'bg-green-500/20 text-green-400',
      medium: 'bg-yellow-500/20 text-yellow-400',
      hard: 'bg-red-500/20 text-red-400',
    }
    return colors[difficulty] || 'bg-gray-500/20 text-gray-400'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-3xl md:text-4xl font-bold text-white shadow-lg shadow-orange-500/25">
              {profile?.username?.charAt(0)?.toUpperCase() || '?'}
            </div>
            {profile?.role === 'admin' && (
              <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                ADMIN
              </div>
            )}
          </div>

          {/* Info */}
          <div className="text-center md:text-left flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-white truncate">{profile?.username || 'Unknown'}</h1>
            <p className="text-gray-400 mt-1 text-sm md:text-base truncate">{user?.email}</p>
            <p className="text-xs md:text-sm text-gray-500 mt-2">
              Bergabung {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}
            </p>
          </div>

          {/* Edit Button */}
          <Link
            href="/change-email"
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors flex-shrink-0"
          >
            Edit Profil
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
          <div className="text-4xl font-bold text-orange-500 mb-2">{stats.totalPoints}</div>
          <div className="text-gray-400 text-sm">Total Poin</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
          <div className="text-4xl font-bold text-green-500 mb-2">{stats.totalSolves}</div>
          <div className="text-gray-400 text-sm">Tantangan Selesai</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
          <div className="text-4xl font-bold text-purple-500 mb-2">#{stats.rank}</div>
          <div className="text-gray-400 text-sm">Peringkat</div>
        </div>
      </div>

      {/* Solved Challenges */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Tantangan Selesai</h2>
          <span className="text-gray-500 text-sm">{solves.length} tantangan</span>
        </div>

        {solves.length > 0 ? (
          <div className="space-y-3">
            {solves.map((solve) => (
              <div
                key={solve.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <Link href={`/challenges/${solve.challenge_id}`} className="font-semibold text-white hover:text-orange-400 transition-colors">
                        {solve.challenges?.title || 'Unknown Challenge'}
                      </Link>
                      <div className="flex gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded ${getCategoryColor(solve.challenges?.category || '')}`}>
                          {solve.challenges?.category}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded ${getDifficultyColor(solve.challenges?.difficulty || '')}`}>
                          {solve.challenges?.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-orange-500 font-bold">+{solve.points_earned} pts</div>
                    <div className="text-gray-500 text-xs">
                      {new Date(solve.solved_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
            <svg className="w-16 h-16 text-gray-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-500 mb-4">Belum menyelesaikan tantangan apapun</p>
            <Link
              href="/challenges"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Mulai Tantangan
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
