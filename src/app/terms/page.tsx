import Link from 'next/link'

export default function Terms() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Syarat & Ketentuan</h1>
          <p className="text-gray-400">Terakhir diperbarui: 14 Juli 2026</p>
        </div>

        <div className="space-y-8">
          <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">1. Penerimaan Syarat</h2>
            <p className="text-gray-300 leading-relaxed">
              Dengan mengakses dan menggunakan platform APCTF, Anda menyetujui untuk terikat oleh Syarat dan Ketentuan ini. 
              Jika Anda tidak setuju dengan bagian mana pun dari syarat ini, Anda tidak diperbolehkan menggunakan platform kami.
            </p>
          </section>

          <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">2. Penggunaan Platform</h2>
            <ul className="text-gray-300 space-y-3 list-disc list-inside">
              <li>Platform ini hanya untuk tujuan edukasi dan pembelajaran keamanan siber</li>
              <li>Anda dilarang menggunakan pengetahuan dari platform ini untuk aktivitas ilegal</li>
              <li>Anda dilarang mencoba menyerang atau merusak infrastruktur platform</li>
              <li>Anda dilarang berbagi jawaban atau flag kepada pengguna lain</li>
              <li>Anda dilarang menggunakan bot atau script otomatis untuk menyelesaikan tantangan</li>
            </ul>
          </section>

          <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">3. Akun Pengguna</h2>
            <ul className="text-gray-300 space-y-3 list-disc list-inside">
              <li>Anda bertanggung jawab untuk menjaga keamanan akun Anda</li>
              <li>Anda dilarang berbagi akun dengan orang lain</li>
              <li>Anda dilarang membuat multiple akun</li>
              <li>Kami berhak menangguhkan atau menghapus akun yang melanggar aturan</li>
            </ul>
          </section>

          <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">4. Konten Tantangan</h2>
            <p className="text-gray-300 leading-relaxed">
              Semua konten tantangan di platform APCTF adalah milik kami atau pemberi lisensi kami. 
              Anda dilarang menyalin, mendistribusikan, atau menggunakan konten tantangan untuk tujuan komersial 
              tanpa izin tertulis dari kami.
            </p>
          </section>

          <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">5. Batasan Tanggung Jawab</h2>
            <p className="text-gray-300 leading-relaxed">
              Platform APCTF disediakan &quot;apa adanya&quot; tanpa jaminan apa pun. Kami tidak bertanggung jawab atas 
              kerugian yang mungkin timbul dari penggunaan platform ini. Penggunaan platform ini adalah risiko Anda sendiri.
            </p>
          </section>

          <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">6. Perubahan Syarat</h2>
            <p className="text-gray-300 leading-relaxed">
              Kami berhak untuk mengubah Syarat dan Ketentuan ini kapan saja. Perubahan akan berlaku segera setelah 
              dipublikasikan di platform. Penggunaan berkelanjutan atas platform setelah perubahan merupakan penerimaan 
              Anda terhadap syarat yang baru.
            </p>
          </section>

          <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">7. Kontak</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, silakan hubungi kami melalui:
            </p>
            <Link href="/contact" className="text-orange-500 hover:text-orange-400 transition-colors">
              Halaman Kontak
            </Link>
          </section>
        </div>

        <div className="text-center mt-12">
          <Link href="/" className="text-orange-500 hover:text-orange-400 transition-colors">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}
