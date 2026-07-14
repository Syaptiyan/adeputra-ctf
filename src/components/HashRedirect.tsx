'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HashRedirect() {
  const router = useRouter()

  useEffect(() => {
    const hash = window.location.hash
    
    if (hash && hash.includes('access_token')) {
      const params = new URLSearchParams(hash.substring(1))
      const type = params.get('type')
      
      if (type === 'recovery') {
        // Redirect to reset-password with the hash
        router.replace('/reset-password' + hash)
      }
    }
  }, [router])

  return null
}
