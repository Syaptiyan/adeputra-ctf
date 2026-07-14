import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
            <span className="text-orange-400 text-sm font-medium">Platform CTF Indonesia</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">APCTF</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light">
            Asah Skill Keamanan Sibernya Kamu
          </p>
          <p className="text-gray-500 mb-10 max-w-2xl mx-auto text-lg">
            Platform Capture The Flag untuk belajar ethical hacking, exploitasi web, kriptografi, forensik digital, dan banyak lagi. Tantang dirimu, kumpulkan poin, dan jadi yang terbaik!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/register" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5">
              Mulai Sekarang
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link href="/challenges" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-300 bg-gray-800/50 border border-gray-700 rounded-xl hover:bg-gray-800 hover:border-gray-600 transition-all duration-300 hover:-translate-y-0.5">
              Lihat Tantangan
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-orange-500/30 transition-colors">
              <div className="text-4xl font-bold text-white mb-2">10+</div>
              <div className="text-gray-400 text-sm">Tantangan</div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-orange-500/30 transition-colors">
              <div className="text-4xl font-bold text-white mb-2">6</div>
              <div className="text-gray-400 text-sm">Kategori</div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-orange-500/30 transition-colors">
              <div className="text-4xl font-bold text-white mb-2">3</div>
              <div className="text-gray-400 text-sm">Tingkat</div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-orange-500/30 transition-colors">
              <div className="text-4xl font-bold text-white mb-2">∞</div>
              <div className="text-gray-400 text-sm">Keseruan</div>
            </div>
          </div>
        </div>
      </section>

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

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Siap Tantang Dirimu?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Bergabunglah dengan komunitas hacker Indonesia. Belajar, berlatih, dan jadi yang terbaik di bidang keamanan siber!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40">
              Daftar Gratis Sekarang
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-300 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700 transition-all duration-300">
              Sudah Punya Akun? Masuk
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                <li><Link href="/register" className="text-gray-400 hover:text-white transition-colors text-sm">Daftar</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors text-sm">Masuk</Link></li>
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
                <li><span className="text-gray-400 text-sm">Tentang Kami</span></li>
                <li><span className="text-gray-400 text-sm">Syarat & Ketentuan</span></li>
                <li><span className="text-gray-400 text-sm">Kebijakan Privasi</span></li>
                <li><span className="text-gray-400 text-sm">Kontak</span></li>
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
    </div>
  )
}
