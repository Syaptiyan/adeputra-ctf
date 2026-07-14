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
    <footer className="bg-gray-950 border-t border-gray-800">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                APCTF
              </h3>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Platform Capture The Flag Indonesia untuk belajar keamanan siber secara interaktif dan menyenangkan.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/Syaptiyan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all"
                title="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="mailto:contact@apctf.id"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all"
                title="Email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/challenges" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm group">
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Tantangan
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm group">
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Papan Peringkat
                </Link>
              </li>
              <li>
                <Link href="/walkthrough" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm group">
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Walkthrough
                </Link>
              </li>
              {isLoggedIn ? (
                <li>
                  <Link href="/profile" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm group">
                    <svg className="w-4 h-4 text-gray-600 group-hover:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profil Saya
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link href="/register" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm group">
                      <svg className="w-4 h-4 text-gray-600 group-hover:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Daftar
                    </Link>
                  </li>
                  <li>
                    <Link href="/login" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm group">
                      <svg className="w-4 h-4 text-gray-600 group-hover:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Masuk
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Kategori */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Kategori</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/challenges?category=web" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm group">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Web Security
                </Link>
              </li>
              <li>
                <Link href="/challenges?category=crypto" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm group">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Cryptography
                </Link>
              </li>
              <li>
                <Link href="/challenges?category=forensics" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm group">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Forensics
                </Link>
              </li>
              <li>
                <Link href="/challenges?category=reverse" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm group">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Reverse Engineering
                </Link>
              </li>
              <li>
                <Link href="/challenges?category=osint" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm group">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  OSINT
                </Link>
              </li>
            </ul>
          </div>

          {/* Tentang */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Tentang</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm group">
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/terms" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm group">
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm group">
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/contact" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm group">
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Kontak
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 APCTF. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy</Link>
            <Link href="/contact" className="hover:text-gray-400 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
