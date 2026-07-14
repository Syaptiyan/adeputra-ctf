# APCTF - Project Documentation

## Informasi Project

| Item | Detail |
|------|--------|
| **Nama** | APCTF (Capture The Flag Platform) |
| **URL** | https://adeputractf.vercel.app |
| **GitHub** | https://github.com/Syaptiyan/adeputra-ctf |
| **Status** | Production Ready |
| **Dibuat** | 14 Juli 2026 |

---

## Akun & Akses

### Vercel (Hosting)
| Item | Detail |
|------|--------|
| URL Dashboard | https://vercel.com/dashboard |
| Username | syaptiyan |
| Project Name | adeputractf |
| Production URL | https://adeputractf.vercel.app |
| Token Location | ~/.vercel/auth.json |

### Supabase (Database & Auth)
| Item | Detail |
|------|--------|
| URL Dashboard | https://supabase.com/dashboard/project/worffcytfrwdjkcjzfhv |
| Project ID | worffcytfrwdjkcjzfhv |
| Project URL | https://worffcytfrwdjkcjzfhv.supabase.co |
| Region | Tokyo (ap-northeast-1) |
| Credentials | Lihat /root/general/session-summary.md |

### GitHub
| Item | Detail |
|------|--------|
| URL | https://github.com/Syaptiyan |
| Repository | adeputra-ctf |

### OAuth Providers
- Google OAuth: Enable di Supabase Auth settings
- GitHub OAuth: Enable di Supabase Auth settings
- Redirect URI: https://worffcytfrwdjkcjzfhv.supabase.co/auth/v1/callback

---

## User Database

### Admin
| Email | Username | Role |
|-------|----------|------|
| syaptiyan@gmail.com | Syaptiyan | admin |

---

## Struktur Folder Project

```
/root/ctf-platform/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page (APCTF)
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Global styles
│   │   ├── login/page.tsx        # Halaman masuk
│   │   ├── register/page.tsx     # Halaman daftar
│   │   ├── forgot-password/page.tsx   # Lupa password
│   │   ├── reset-password/page.tsx    # Reset password
│   │   ├── change-email/page.tsx      # Ubah email
│   │   ├── unverified/page.tsx        # Email belum verifikasi
│   │   ├── about/page.tsx        # Tentang kami
│   │   ├── terms/page.tsx        # Syarat & ketentuan
│   │   ├── privacy/page.tsx      # Kebijakan privasi
│   │   ├── contact/page.tsx      # Kontak
│   │   ├── challenges/
│   │   │   ├── page.tsx          # Daftar tantangan
│   │   │   └── [id]/page.tsx     # Detail tantangan
│   │   ├── leaderboard/page.tsx  # Papan peringkat
│   │   ├── profile/page.tsx      # Profil pengguna
│   │   └── admin/
│   │       ├── page.tsx          # Dashboard admin
│   │       └── challenges/
│   │           ├── new/page.tsx  # Tambah tantangan
│   │           └── [id]/page.tsx # Edit tantangan
│   ├── components/
│   │   └── Navbar.tsx            # Navigasi
│   ├── lib/
│   │   └── supabase.ts           # Supabase client
│   ├── middleware.ts              # Route protection
│   └── types/
│       └── index.ts              # TypeScript types
├── public/                        # Static assets
├── supabase-schema.sql           # Database schema
├── email-template.html           # Template email (referensi)
├── .env.local                    # Environment variables (LOCAL)
├── .env.example                  # Template env variables
├── package.json                  # Dependencies
├── CHANGELOG.md                  # Riwayat perubahan
├── README.md                     # Dokumentasi project
├── LICENSE                       # MIT License
└── .gitignore                    # Git ignore rules
```

---

## Database Schema

### Tables

#### users
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (sama dengan auth.users.id) |
| email | TEXT | Email unik |
| username | TEXT | Username unik |
| role | TEXT | 'user' atau 'admin' |
| score | INTEGER | Total poin |
| created_at | TIMESTAMP | Waktu pembuatan |

#### challenges
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| title | TEXT | Judul tantangan |
| description | TEXT | Deskripsi tantangan |
| category | TEXT | web/crypto/forensics/reverse/osint/misc |
| difficulty | TEXT | easy/medium/hard |
| points | INTEGER | Poin tantangan |
| flag | TEXT | Jawaban (format: APCTF{...}) |
| hints | TEXT[] | Array hint |
| author | TEXT | Pembuat tantangan |
| is_active | BOOLEAN | Status aktif |
| created_at | TIMESTAMP | Waktu pembuatan |

#### submissions
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key ke users |
| challenge_id | UUID | Foreign key ke challenges |
| flag_submitted | TEXT | Flag yang di-submit |
| is_correct | BOOLEAN | Status benar/salah |
| submitted_at | TIMESTAMP | Waktu submission |

#### solves
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key ke users |
| challenge_id | UUID | Foreign key ke challenges |
| points_earned | INTEGER | Poin yang didapat |
| solved_at | TIMESTAMP | Waktu solve |

### Functions
- `increment_score(user_id, points)` - Menambah poin user

### RLS Policies
- Users bisa view semua users
- Users bisa insert/update profile sendiri
- Semua bisa view tantangan aktif
- Admin bisa kelola tantangan
- Users bisa view/submit submission sendiri
- Semua bisa view solves

---

## Fitur Utama

### Autentikasi
- ✅ Register dengan email/password
- ✅ Login dengan email/password
- ✅ Login dengan Google OAuth
- ✅ Login dengan GitHub OAuth
- ✅ Email verification wajib
- ✅ Forgot password (reset via email)
- ✅ Reset password
- ✅ Change email dengan verifikasi

### Tantangan
- ✅ 6 kategori (Web, Crypto, Forensics, Reverse, OSINT, Misc)
- ✅ 3 tingkat kesulitan (Easy, Medium, Hard)
- ✅ Sistem poin (100-300)
- ✅ Submit flag dengan validasi
- ✅ Hint system
- ✅ Filter berdasarkan kategori dan kesulitan

### Papan Peringkat
- ✅ Ranking berdasarkan total poin
- ✅ Jumlah tantangan diselesaikan
- ✅ Update real-time

### Profil
- ✅ Info user (username, email, poin)
- ✅ Riwayat tantangan yang diselesaikan
- ✅ Statistik

### Admin Panel
- ✅ Dashboard admin
- ✅ CRUD tantangan (Create, Read, Update, Delete)
- ✅ Toggle status aktif/nonaktif

### UI/UX
- ✅ Desain modern dengan Tailwind CSS
- ✅ Dark mode
- ✅ Responsive (mobile-friendly)
- ✅ Animasi dan transisi
- ✅ Bahasa Indonesia

### Security
- ✅ Row Level Security (RLS)
- ✅ Middleware protection
- ✅ Email verification wajib
- ✅ Input validation
- ✅ Password hashing (bcrypt)
- ✅ CSRF protection

---

## Tantangan di Database (10 soal)

| # | Judul | Kategori | Kesulitan | Poin |
|---|-------|----------|-----------|------|
| 1 | Cookie Monster | Web | Easy | 100 |
| 2 | Base64ception | Crypto | Easy | 100 |
| 3 | Hidden in Plain Sight | Forensics | Easy | 100 |
| 4 | SQL Injection 101 | Web | Easy | 150 |
| 5 | XOR Crack | Crypto | Medium | 200 |
| 6 | JWT None | Web | Medium | 200 |
| 7 | Reverse Me | Reverse | Medium | 200 |
| 8 | Race Condition | Web | Hard | 300 |
| 9 | OSINT Investigation | OSINT | Medium | 200 |
| 10 | Steganography Advanced | Forensics | Hard | 300 |

---

## Troubleshooting

### Email Rate Limit
- Supabase free tier: max 3-4 email/jam
- Solusi: Tunggu 1 jam atau matikan "Confirm email" di Auth settings

### Email Redirect ke Localhost
- Update **Site URL** di Supabase Auth settings
- URL: https://supabase.com/dashboard/project/[ID]/auth/url-configuration

### User Tidak Bisa Login
- Cek apakah email sudah diverifikasi
- Cek apakah user ada di database
- Reset password jika perlu

---

## Update Terakhir

**Tanggal:** 14 Juli 2026
**Versi:** v1.1.0

### Perubahan:
- ✅ Rebrand ke APCTF
- ✅ Redesign landing page
- ✅ Tambah halaman About, Terms, Privacy, Contact
- ✅ Tambah forgot/reset password
- ✅ Tambah change email
- ✅ Email verification wajib
- ✅ Update CHANGELOG & README
- ✅ Update deskripsi GitHub

---

## Kontak & Support

- **GitHub:** https://github.com/Syaptiyan
- **Website:** https://adeputractf.vercel.app
