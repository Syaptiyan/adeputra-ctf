'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Unverified() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setEmail(user.email || '')
        // If already verified, redirect to challenges
        if (user.email_confirmed_at) {
          router.push('/challenges')
        }
      } else {
        router.push('/login')
      }
    }
    getUser()
  }, [router])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleResend = async () => {
    if (countdown > 0) return
    
    setLoading(true)
    setError('')
    setMessage('')

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage('Email verifikasi telah dikirim! Silakan cek inbox atau spam folder.')
      setCountdown(60) // 60 seconds cooldown
    }
    setLoading(false)
  }

  const handleCheckVerification = async () => {
    setLoading(true)
    setError('')
    setMessage('')

    const { data: { user } } = await supabase.auth.getUser()

    if (user?.email_confirmed_at) {
      setMessage('Email berhasil diverifikasi! Mengalihkan...')
      setTimeout(() => {
        router.push('/challenges')
        router.refresh()
      }, 1500)
    } else {
      setError('Email belum diverifikasi. Silakan cek email kamu dan klik link verifikasi.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl shadow-black/50 text-center">
          {/* Email Icon */}
          <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">Verifikasi Email Kamu</h2>
          <p className="text-gray-400 mb-6">
            Kami telah mengirim email verifikasi ke:
          </p>
          <div className="bg-gray-800/50 rounded-xl px-4 py-3 mb-6">
            <p className="text-orange-400 font-semibold">{email || '...'}</p>
          </div>
          <p className="text-gray-400 text-sm mb-6">
            Klik link di email tersebut untuk mengaktifkan akun kamu. 
            Jangan lupa cek folder <span className="text-yellow-400">Spam</span> atau <span className="text-yellow-400">Promotions</span> jika tidak menemukan emailnya.
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl mb-4 text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-3 rounded-xl mb-4 text-sm">
              {message}
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handleCheckVerification}
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Mengecek...' : 'Saya Sudah Verifikasi'}
            </button>

            <button
              onClick={handleResend}
              disabled={loading || countdown > 0}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {countdown > 0 
                ? `Kirim Ulang (${countdown}s)` 
                : 'Kirim Ulang Email Verifikasi'
              }
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-gray-500 text-sm">
              Salah email?{' '}
              <button 
                onClick={async () => {
                  await supabase.auth.signOut()
                  router.push('/register')
                }}
                className="text-orange-500 hover:text-orange-400 transition-colors"
              >
                Daftar ulang
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
