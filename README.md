# ADE PUTRA CTF

Platform Capture The Flag (CTF) untuk belajar keamanan siber secara interaktif.

🌐 **Live:** [adeputractf.vercel.app](https://adeputractf.vercel.app)

## Fitur

- 🏁 **10+ Tantangan** - Web, Crypto, Forensics, Reverse, OSINT, Misc
- 🔐 **Autentikasi** - Email/Password, Google OAuth, GitHub OAuth
- 🏆 **Papan Peringkat** - Ranking real-time berdasarkan poin
- 👤 **Profil Pengguna** - Riwayat solve dan statistik
- 🔑 **Admin Panel** - Kelola tantangan (CRUD)
- 🌙 **Dark Mode** - UI modern dan responsif
- 📱 **Mobile Friendly** - Bisa diakses dari HP

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

## API Endpoints

| Endpoint | Method | Deskripsi |
|----------|--------|-----------|
| `/api/auth/*` | - | Autentikasi (Supabase) |
| `/api/challenges` | GET | Ambil semua tantangan |
| `/api/challenges/:id` | GET | Ambil tantangan by ID |
| `/api/submit` | POST | Submit flag |
| `/api/leaderboard` | GET | Ambil ranking |

## Kontribusi

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Author

**ADE PUTRA** - [GitHub](https://github.com/Syaptiyan)

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)
