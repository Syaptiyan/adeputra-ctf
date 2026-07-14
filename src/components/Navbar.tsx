'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [username, setUsername] = useState<string>('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        const { data } = await supabase
          .from('users')
          .select('username')
          .eq('id', user.id)
          .single()
        if (data) setUsername(data.username)
      }
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setUsername('')
  }

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-orange-500">
            ADE PUTRA CTF
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/challenges" className="text-gray-300 hover:text-white transition-colors">
              Challenges
            </Link>
            <Link href="/leaderboard" className="text-gray-300 hover:text-white transition-colors">
              Leaderboard
            </Link>
            {user ? (
              <>
                <Link href="/profile" className="text-gray-300 hover:text-white transition-colors">
                  {username || 'Profile'}
                </Link>
                <button onClick={handleLogout} className="btn-secondary text-sm">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/register" className="btn-primary text-sm">
                  Register
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link href="/challenges" className="block text-gray-300 hover:text-white">
              Challenges
            </Link>
            <Link href="/leaderboard" className="block text-gray-300 hover:text-white">
              Leaderboard
            </Link>
            {user ? (
              <>
                <Link href="/profile" className="block text-gray-300 hover:text-white">
                  {username || 'Profile'}
                </Link>
                <button onClick={handleLogout} className="block text-gray-300 hover:text-white">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-gray-300 hover:text-white">
                  Login
                </Link>
                <Link href="/register" className="block text-gray-300 hover:text-white">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
