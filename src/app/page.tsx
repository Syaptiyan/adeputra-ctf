import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-screen">
      <HeroSection />

      {/* Categories Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Kategori Tantangan</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Berbagai jenis tantangan keamanan siber yang menunggu untuk kamu selesaikan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Web', icon: '🌐', desc: 'Exploitasi aplikasi web seperti SQL Injection, XSS, SSTI, dan banyak lagi', color: 'from-blue-500 to-cyan-500' },
              { name: 'Crypto', icon: '🔐', desc: 'Kriptanalisis dan pemecahan cipher seperti Caesar, XOR, RSA, dan lainnya', color: 'from-purple-500 to-pink-500' },
              { name: 'Forensics', icon: '🔍', desc: 'Analisis digital, steganography, dan investigasi bukti digital', color: 'from-green-500 to-emerald-500' },
              { name: 'Reverse', icon: '⚙️', desc: 'Reverse engineering binary, Python bytecode, dan analisis malware', color: 'from-red-500 to-orange-500' },
              { name: 'OSINT', icon: '🕵️', desc: 'Open Source Intelligence dan investigasi menggunakan informasi publik', color: 'from-yellow-500 to-amber-500' },
              { name: 'Misc', icon: '🧩', desc: 'Tantangan unik lainnya seperti automation, puzzle, dan logika', color: 'from-pink-500 to-rose-500' },
            ].map((cat) => (
              <div key={cat.name} className="group relative bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 hover:-translate-y-1">
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`}></div>
                <div className="relative">
                  <div className="text-4xl mb-4">{cat.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{cat.name}</h3>
                  <p className="text-gray-400 text-sm">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Cara Bermain</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Mulai perjalananmu dalam 4 langkah mudah
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Daftar', desc: 'Buat akun gratis dan masuk ke platform' },
              { step: '02', title: 'Pilih Tantangan', desc: 'Jelajahi berbagai kategori dan tingkat kesulitan' },
              { step: '03', title: 'Selesaikan', desc: 'Analisis, exploitasi, dan temukan flag tersembunyi' },
              { step: '04', title: 'Kumpulkan Poin', desc: 'Submit flag, dapatkan poin, dan raih peringkat tertinggi' },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-7xl font-bold text-gray-800/50 absolute -top-8 left-0">{item.step}</div>
                <div className="relative pt-8">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Difficulty Levels */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Tingkat Kesulitan</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Pilih level yang sesuai dengan kemampuanmu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-green-500/10 to-transparent border border-green-500/20 rounded-2xl p-8 text-center hover:border-green-500/40 transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-2xl mb-6">
                <span className="text-3xl">🟢</span>
              </div>
              <h3 className="text-2xl font-bold text-green-400 mb-2">Easy</h3>
              <div className="text-4xl font-bold text-white mb-4">100-150 <span className="text-lg text-gray-400">poin</span></div>
              <p className="text-gray-400">Cocok untuk pemula yang baru mulai belajar keamanan siber</p>
            </div>

            <div className="bg-gradient-to-b from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-2xl p-8 text-center hover:border-yellow-500/40 transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/20 rounded-2xl mb-6">
                <span className="text-3xl">🟡</span>
              </div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-2">Medium</h3>
              <div className="text-4xl font-bold text-white mb-4">200 <span className="text-lg text-gray-400">poin</span></div>
              <p className="text-gray-400">Untuk yang sudah memiliki dasar dan ingin tantangan lebih</p>
            </div>

            <div className="bg-gradient-to-b from-red-500/10 to-transparent border border-red-500/20 rounded-2xl p-8 text-center hover:border-red-500/40 transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-2xl mb-6">
                <span className="text-3xl">🔴</span>
              </div>
              <h3 className="text-2xl font-bold text-red-400 mb-2">Hard</h3>
              <div className="text-4xl font-bold text-white mb-4">300 <span className="text-lg text-gray-400">poin</span></div>
              <p className="text-gray-400">Tantangan tingkat tinggi untuk hacker berpengalaman</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />

      <Footer />
    </div>
  )
}
