'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [solves, setSolves] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
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

    const { data: profileData } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileData) {
      setProfile(profileData)
    }

    const { data: solvesData } = await supabase
      .from('solves')
      .select(`
        *,
        challenges (title, category, points)
      `)
      .eq('user_id', user.id)
      .order('solved_at', { ascending: false })

    if (solvesData) {
      setSolves(solvesData)
    }

    setLoading(false)
  }

  if (loading) {
    return <div className="text-center py-20">Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card mb-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-3xl font-bold">
            {profile?.username?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{profile?.username}</h1>
            <p className="text-gray-400">{user?.email}</p>
            <p className="text-orange-500 font-bold mt-1">{profile?.score || 0} points</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Solved Challenges</h2>
      
      {solves.length > 0 ? (
        <div className="space-y-3">
          {solves.map((solve) => (
            <div key={solve.id} className="card flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{solve.challenges?.title}</h3>
                <span className="category-badge text-xs">{solve.challenges?.category}</span>
              </div>
              <div className="text-right">
                <div className="text-orange-500 font-bold">+{solve.points_earned} pts</div>
                <div className="text-gray-500 text-sm">
                  {new Date(solve.solved_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center text-gray-400 py-10">
          No challenges solved yet
        </div>
      )}
    </div>
  )
}
