'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function CTASection() {
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
    <section className="py-24 px-4 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Siap Tantang Dirimu?
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
          Bergabunglah dengan komunitas hacker Indonesia. Belajar, berlatih, dan jadi yang terbaik di bidang keamanan siber!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isLoggedIn ? (
            <Link href="/challenges" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40">
              Mulai Tantangan
            </Link>
          ) : (
            <>
              <Link href="/register" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40">
                Daftar Gratis Sekarang
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-300 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700 transition-all duration-300">
                Sudah Punya Akun? Masuk
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
