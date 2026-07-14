import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Tentang APCTF</h1>
          <p className="text-gray-400 text-lg">Platform Capture The Flag Indonesia</p>
        </div>

        <div className="space-y-12">
          <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Apa itu APCTF?</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              APCTF adalah platform Capture The Flag (CTF) yang dirancang khusus untuk komunitas keamanan siber Indonesia. 
              Kami menyediakan berbagai tantangan keamanan siber yang dapat membantu kamu belajar dan mengasah kemampuan 
              dalam bidang ethical hacking dan cybersecurity.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Platform ini dibuat dengan tujuan untuk mendidik dan membina talenta keamanan siber Indonesia, 
              sehingga dapat berkontribusi dalam menjaga keamanan digital di Indonesia.
            </p>
          </section>

          <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Misi Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Edukasi</h3>
                  <p className="text-gray-400 text-sm">Menyediakan platform belajar keamanan siber yang mudah diakses oleh semua orang</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Komunitas</h3>
                  <p className="text-gray-400 text-sm">Membangun komunitas hacker etis Indonesia yang solid dan saling mendukung</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Kompetisi</h3>
                  <p className="text-gray-400 text-sm">Menjadi wadah latihan untuk kompetisi CTF tingkat nasional dan internasional</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🛡️</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Keamanan</h3>
                  <p className="text-gray-400 text-sm">Berkontribusi dalam menciptakan ekosistem digital Indonesia yang lebih aman</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Kategori Tantangan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Web Security', desc: 'SQL Injection, XSS, SSTI, IDOR, dan lainnya' },
                { name: 'Cryptography', desc: 'Caesar, XOR, RSA, Base64, dan cipher lainnya' },
                { name: 'Forensics', desc: 'Steganography, metadata, file carving' },
                { name: 'Reverse Engineering', desc: 'Binary analysis, Python bytecode' },
                { name: 'OSINT', desc: 'Investigasi menggunakan informasi publik' },
                { name: 'Miscellaneous', desc: 'Automation, puzzle, dan logika' },
              ].map((cat) => (
                <div key={cat.name} className="bg-gray-800/50 rounded-xl p-4">
                  <h3 className="text-white font-semibold mb-1">{cat.name}</h3>
                  <p className="text-gray-400 text-sm">{cat.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Teknologi</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Next.js', desc: 'Frontend' },
                { name: 'Tailwind CSS', desc: 'Styling' },
                { name: 'Supabase', desc: 'Database & Auth' },
                { name: 'Vercel', desc: 'Hosting' },
              ].map((tech) => (
                <div key={tech.name} className="text-center bg-gray-800/50 rounded-xl p-4">
                  <div className="text-white font-semibold">{tech.name}</div>
                  <div className="text-gray-400 text-sm">{tech.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <div className="text-center">
            <Link href="/register" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300">
              Mulai Belajar Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
