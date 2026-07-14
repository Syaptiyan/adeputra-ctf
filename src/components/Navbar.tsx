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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              APCTF
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/challenges" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
              Tantangan
            </Link>
            <Link href="/leaderboard" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
              Papan Peringkat
            </Link>
            {user ? (
              <>
                <Link href="/profile" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                  {username || 'Profil'}
                </Link>
                <button onClick={handleLogout} className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                  Keluar
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                  Masuk
                </Link>
                <Link href="/register" className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2 rounded-lg transition-colors">
                  Daftar
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-800">
            <Link href="/challenges" className="block text-gray-400 hover:text-white py-2">
              Tantangan
            </Link>
            <Link href="/leaderboard" className="block text-gray-400 hover:text-white py-2">
              Papan Peringkat
            </Link>
            {user ? (
              <>
                <Link href="/profile" className="block text-gray-400 hover:text-white py-2">
                  {username || 'Profil'}
                </Link>
                <button onClick={handleLogout} className="block text-gray-400 hover:text-white py-2">
                  Keluar
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-gray-400 hover:text-white py-2">
                  Masuk
                </Link>
                <Link href="/register" className="block bg-orange-500 text-white text-center py-2 rounded-lg mt-2">
                  Daftar
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
