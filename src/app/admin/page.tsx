'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Admin() {
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [challenges, setChallenges] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAdmin()
  }, [])

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/login')
      return
    }

    setUser(user)

    // Server-side admin check via RPC
    const { data: adminStatus, error } = await supabase.rpc('is_admin', {
      p_user_id: user.id
    })

    if (error || !adminStatus) {
      router.push('/')
      return
    }

    setIsAdmin(true)
    fetchChallenges()
  }

  const fetchChallenges = async () => {
    const { data } = await supabase
      .from('challenges')
      .select('id, title, category, difficulty, points, is_active, created_at')
      .order('created_at', { ascending: false })

    if (data) {
      setChallenges(data)
    }
    setLoading(false)
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    await supabase
      .from('challenges')
      .update({ is_active: !currentStatus })
      .eq('id', id)
    
    fetchChallenges()
  }

  const deleteChallenge = async (id: string) => {
    if (confirm('Delete this challenge?')) {
      await supabase
        .from('challenges')
        .delete()
        .eq('id', id)
      
      fetchChallenges()
    }
  }

  if (loading || !isAdmin) {
    return <div className="text-center py-20">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <Link href="/admin/challenges/new" className="btn-primary">
          + New Challenge
        </Link>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4 text-gray-400">Title</th>
                <th className="text-left py-3 px-4 text-gray-400">Category</th>
                <th className="text-left py-3 px-4 text-gray-400">Difficulty</th>
                <th className="text-left py-3 px-4 text-gray-400">Points</th>
                <th className="text-left py-3 px-4 text-gray-400">Status</th>
                <th className="text-right py-3 px-4 text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {challenges.map((challenge) => (
                <tr key={challenge.id} className="border-b border-gray-800">
                  <td className="py-3 px-4">{challenge.title}</td>
                  <td className="py-3 px-4">
                    <span className="category-badge">{challenge.category}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`badge-${challenge.difficulty}`}>
                      {challenge.difficulty}
                    </span>
                  </td>
                  <td className="py-3 px-4">{challenge.points}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleActive(challenge.id, challenge.is_active)}
                      className={`text-xs px-2 py-1 rounded ${
                        challenge.is_active 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {challenge.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <Link
                      href={`/admin/challenges/${challenge.id}`}
                      className="text-blue-400 hover:underline text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteChallenge(challenge.id)}
                      className="text-red-400 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
