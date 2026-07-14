import Link from 'next/link'

export default function Privacy() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Kebijakan Privasi</h1>
          <p className="text-gray-400">Terakhir diperbarui: 14 Juli 2026</p>
        </div>

        <div className="space-y-8">
          <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">1. Informasi yang Kami Kumpulkan</h2>
            <div className="text-gray-300 space-y-3">
              <p><strong className="text-white">Informasi Akun:</strong> Email, username, dan password (dihash)</p>
              <p><strong className="text-white">Informasi Profil:</strong> Username dan skor</p>
              <p><strong className="text-white">Data Aktivitas:</strong> Riwayat penyelesaian tantangan dan submission</p>
              <p><strong className="text-white">Data Teknis:</strong> Alamat IP, browser, dan perangkat yang digunakan</p>
            </div>
          </section>

          <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">2. Penggunaan Informasi</h2>
            <ul className="text-gray-300 space-y-3 list-disc list-inside">
              <li>Menyediakan dan memelihara layanan platform</li>
              <li>Memproses pendaftaran dan autentikasi pengguna</li>
              <li>Menampilkan papan peringkat dan statistik</li>
              <li>Mengirim notifikasi terkait akun (jika diperlukan)</li>
              <li>Meningkatkan keamanan dan mencegah penyalahgunaan</li>
              <li>Menganalisis penggunaan platform untuk perbaikan</li>
            </ul>
          </section>

          <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">3. Penyimpanan Data</h2>
            <p className="text-gray-300 leading-relaxed">
              Data Anda disimpan di server Supabase yang terletak di wilayah Asia. Kami menggunakan enkripsi 
              dan langkah-langkah keamanan yang sesuai untuk melindungi data Anda dari akses yang tidak sah.
            </p>
          </section>

          <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">4. Berbagi Data</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Kami tidak menjual atau membagikan data pribadi Anda kepada pihak ketiga, kecuali:
            </p>
            <ul className="text-gray-300 space-y-3 list-disc list-inside">
              <li>Diperlukan oleh hukum atau peraturan yang berlaku</li>
              <li>Untuk melindungi hak dan keamanan platform</li>
              <li>Dengan persetujuan eksplisit dari Anda</li>
            </ul>
          </section>

          <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">5. Cookie</h2>
            <p className="text-gray-300 leading-relaxed">
              Platform kami menggunakan cookie untuk autentikasi sesi. Cookie ini diperlukan untuk menjaga 
              Anda tetap login dan tidak digunakan untuk pelacakan atau iklan.
            </p>
          </section>

          <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">6. Hak Anda</h2>
            <p className="text-gray-300 leading-relaxed mb-4">Anda memiliki hak untuk:</p>
            <ul className="text-gray-300 space-y-3 list-disc list-inside">
              <li>Mengakses data pribadi Anda</li>
              <li>Memperbarui atau mengoreksi data Anda</li>
              <li>Menghapus akun dan data Anda</li>
              <li>Menarik persetujuan penggunaan data</li>
            </ul>
          </section>

          <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">7. Keamanan</h2>
            <p className="text-gray-300 leading-relaxed">
              Kami menerapkan langkah-langkah keamanan yang wajar untuk melindungi data Anda, termasuk:
            </p>
            <ul className="text-gray-300 space-y-3 list-disc list-inside mt-4">
              <li>Enkripsi password menggunakan bcrypt</li>
              <li>Koneksi HTTPS untuk semua komunikasi</li>
              <li>Row Level Security (RLS) pada database</li>
              <li>Autentikasi dan otorisasi yang ketat</li>
            </ul>
          </section>

          <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">8. Perubahan Kebijakan</h2>
            <p className="text-gray-300 leading-relaxed">
              Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan signifikan akan 
              diberitahukan melalui platform atau email.
            </p>
          </section>

          <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">9. Kontak</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami:
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
