# APCTF

Platform Capture The Flag (CTF) Indonesia untuk belajar keamanan siber secara interaktif.

🌐 **Live:** [adeputractf.vercel.app](https://adeputractf.vercel.app)

## Fitur

- 🏁 **10+ Tantangan** - Web, Crypto, Forensics, Reverse, OSINT, Misc
- 🔐 **Autentikasi** - Email/Password, Google OAuth, GitHub OAuth
- 📧 **Verifikasi Email** - User wajib verifikasi email sebelum bermain
- 🔑 **Reset Password** - Lupa password? Reset via email
- ✉️ **Ubah Email** - Ganti email dengan verifikasi
- 🏆 **Papan Peringkat** - Ranking real-time berdasarkan poin
- 👤 **Profil Pengguna** - Riwayat solve dan statistik
- 🔐 **Admin Panel** - Kelola tantangan (CRUD)
- 🌙 **Dark Mode** - UI modern dan responsif
- 📱 **Mobile Friendly** - Bisa diakses dari HP
- 🇮🇩 **Bahasa Indonesia** - Semua UI menggunakan Bahasa Indonesia
- 📖 **Walkthrough** - Tutorial lengkap cara menyelesaikan setiap tantangan
- 📁 **Challenge Files** - File tantangan bisa didownload dari GitHub

## Kategori Tantangan

| Kategori | Deskripsi | Contoh |
|----------|-----------|--------|
| **Web** | Exploitasi aplikasi web | SQLi, XSS, SSTI, IDOR |
| **Crypto** | Kriptanalisis | Caesar, XOR, RSA, Base64 |
| **Forensics** | Analisis digital | Steganography, metadata |
| **Reverse** | Reverse engineering | Python bytecode, binary |
| **OSINT** | Open Source Intelligence | Investigasi media sosial |
| **Misc** | Lain-lain | Automation, puzzle |

## Tingkat Kesulitan

| Level | Poin | Warna |
|-------|------|-------|
| Easy | 100-150 | 🟢 |
| Medium | 200 | 🟡 |
| Hard | 300 | 🔴 |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Hosting | Vercel |

## Struktur Project

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   ├── login/page.tsx        # Halaman masuk
│   ├── register/page.tsx     # Halaman daftar
│   ├── forgot-password/      # Lupa password
│   ├── reset-password/       # Reset password
│   ├── change-email/         # Ubah email
│   ├── unverified/           # Email belum verifikasi
│   ├── about/                # Tentang kami
│   ├── terms/                # Syarat & ketentuan
│   ├── privacy/              # Kebijakan privasi
│   ├── contact/              # Kontak
│   ├── challenges/
│   │   ├── page.tsx          # Daftar tantangan
│   │   └── [id]/page.tsx     # Detail tantangan
│   ├── leaderboard/page.tsx  # Papan peringkat
│   ├── profile/page.tsx      # Profil pengguna
│   └── admin/
│       ├── page.tsx          # Dashboard admin
│       └── challenges/       # Kelola tantangan
├── components/
│   └── Navbar.tsx            # Navigasi
├── lib/
│   └── supabase.ts           # Supabase client
├── middleware.ts              # Route protection
└── types/
    └── index.ts              # TypeScript types
```

## Setup Development

### Prerequisites

- Node.js 18+
- npm/pnpm/yarn
- Supabase account

### Installation

```bash
# Clone repository
git clone https://github.com/Syaptiyan/adeputra-ctf.git
cd adeputra-ctf

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local dengan credentials Supabase

# Run development server
npm run dev
```

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Database Setup

1. Buka Supabase SQL Editor
2. Jalankan file `supabase-schema.sql`

### Supabase Configuration

1. **Site URL:** `https://your-domain.vercel.app`
2. **Redirect URLs:** `https://your-domain.vercel.app/**`
3. **Email Templates:** (Opsional, butuh Pro plan)

## Deployment

### Vercel (Recommended)

1. Push ke GitHub
2. Import di [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy!

### Manual

```bash
# Build
npm run build

# Start
npm start
```

## Challenge Files

File tantangan bisa didownload dari folder `/challenge-files/`:

| File | Challenge | Link |
|------|-----------|------|
| pesawat_kertas.txt | Pesawat Kertas | [Download](https://raw.githubusercontent.com/Syaptiyan/adeputra-ctf/master/challenge-files/pesawat_kertas.txt) |
| suspect_photo.png | Jejak Digital | [Download](https://raw.githubusercontent.com/Syaptiyan/adeputra-ctf/master/challenge-files/suspect_photo.png) |
| xor_encrypted.txt | XOR Rahasia | [Download](https://raw.githubusercontent.com/Syaptiyan/adeputra-ctf/master/challenge-files/xor_encrypted.txt) |
| caesar_cipher.txt | Pesan dalam Botol | [Download](https://raw.githubusercontent.com/Syaptiyan/adeputra-ctf/master/challenge-files/caesar_cipher.txt) |
| time_machine.pyc | Mesin Waktu | [Download](https://raw.githubusercontent.com/Syaptiyan/adeputra-ctf/master/challenge-files/time_machine.pyc) |
| secret.bin | File Rahasia | [Download](https://raw.githubusercontent.com/Syaptiyan/adeputra-ctf/master/challenge-files/secret.bin) |
| blind_sqli_simulator.html | SQL Injection Blind | [Download](https://raw.githubusercontent.com/Syaptiyan/adeputra-ctf/master/challenge-files/blind_sqli_simulator.html) |

## Walkthrough

Tutorial lengkap cara menyelesaikan setiap tantangan bisa diakses di:
- **URL:** [adeputractf.vercel.app/walkthrough](https://adeputractf.vercel.app/walkthrough)
- **Folder:** `/walkthrough/` (source code)

## Peran Pengguna

| Fitur | User Biasa | Admin |
|-------|------------|-------|
| Lihat tantangan | ✅ | ✅ |
| Submit flag | ✅ | ✅ |
| Lihat leaderboard | ✅ | ✅ |
| Lihat profil | ✅ | ✅ |
| Kelola tantangan | ❌ | ✅ |
| Akses admin panel | ❌ | ✅ |

## Kontribusi

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Author

**APCTF** - [GitHub](https://github.com/Syaptiyan)

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)
