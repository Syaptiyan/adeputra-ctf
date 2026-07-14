'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setIsLoggedIn(!!user)
    }
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-4">APCTF</h3>
            <p className="text-gray-400 text-sm">
              Platform Capture The Flag Indonesia untuk belajar keamanan siber secara interaktif dan menyenangkan.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><Link href="/challenges" className="text-gray-400 hover:text-white transition-colors text-sm">Tantangan</Link></li>
              <li><Link href="/leaderboard" className="text-gray-400 hover:text-white transition-colors text-sm">Papan Peringkat</Link></li>
              {isLoggedIn ? (
                <li><Link href="/profile" className="text-gray-400 hover:text-white transition-colors text-sm">Profil</Link></li>
              ) : (
                <>
                  <li><Link href="/register" className="text-gray-400 hover:text-white transition-colors text-sm">Daftar</Link></li>
                  <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors text-sm">Masuk</Link></li>
                </>
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Kategori</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-400 text-sm">Web Security</span></li>
              <li><span className="text-gray-400 text-sm">Cryptography</span></li>
              <li><span className="text-gray-400 text-sm">Forensics</span></li>
              <li><span className="text-gray-400 text-sm">Reverse Engineering</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Tentang</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">Tentang Kami</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Syarat & Ketentuan</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Kebijakan Privasi</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Kontak</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2026 APCTF. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="https://github.com/Syaptiyan" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
