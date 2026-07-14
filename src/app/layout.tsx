import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import HashRedirect from '@/components/HashRedirect'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'APCTF - Platform Capture The Flag Indonesia',
  description: 'Platform CTF untuk belajar ethical hacking, exploitasi web, kriptografi, forensik digital. Asah skill keamanan siber kamu!',
  keywords: 'CTF, Capture The Flag, Cybersecurity, Ethical Hacking, Indonesia, Keamanan Siber, Web Security, Cryptography',
  authors: [{ name: 'APCTF' }],
  openGraph: {
    title: 'APCTF - Platform Capture The Flag Indonesia',
    description: 'Platform CTF untuk belajar ethical hacking dan keamanan siber',
    type: 'website',
    locale: 'id_ID',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="dark">
      <body className={`${inter.className} bg-gray-950 text-white min-h-screen antialiased`}>
        <HashRedirect />
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
