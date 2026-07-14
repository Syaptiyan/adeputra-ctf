# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.1] - 2026-07-14

### Fixed
- Remove non-functional "Remember Me" checkbox dari login
- Fix N+1 query di leaderboard (optimasi dari 51 query ke 2 query)
- Fix OAuth redirect URL validation (prevent open redirect)
- Fix server-side rate limiting pada flag submission

### Changed
- Rate limiting sekarang server-side (5 detik cooldown per challenge per user)
- Leaderboard query dioptimasi dengan batch fetch solves

### Security
- Server-side rate limiting pada check_flag RPC
- OAuth redirect URL validation (hanya allow relative paths)

## [1.2.0] - 2026-07-14

### Added
- Server-side flag validation via Supabase RPC (`check_flag`)
- Admin role check function (`is_admin`)
- Auto-create user profile on signup (database trigger)
- Rate limiting on flag submission (5 detik cooldown)
- Database indexes untuk performa
- Landing page auth-aware (CTA berubah sesuai login state)
- Footer auth-aware
- Login redirect support (`?redirect=` parameter)

### Fixed
- Leaderboard query bug (user_id vs username)
- Login double sign-in bug
- Profile crash jika username null
- OAuth redirect ignores redirect parameter
- CHANGELOG dan README sekarang up-to-date

### Security
- Flag tidak lagi exposed ke client-side
- Server-side flag validation via RPC
- Admin panel server-side protection via middleware + RPC
- Rate limiting pada flag submission
- Change-email page dilindungi middleware

### Changed
- Supabase client menggunakan `@supabase/ssr` (cookie-based)
- Challenge select tidak ambil kolom flag
- Admin challenges select tidak ambil kolom flag

## [1.1.0] - 2026-07-14

### Added
- Halaman Lupa Password (/forgot-password)
- Halaman Reset Password (/reset-password)
- Halaman Ubah Email (/change-email)
- Halaman Verifikasi Email (/unverified)
- Halaman Tentang Kami (/about)
- Halaman Syarat & Ketentuan (/terms)
- Halaman Kebijakan Privasi (/privacy)
- Halaman Kontak (/contact)
- Middleware untuk proteksi halaman
- Email verification wajib sebelum bermain
- Resend email verification dengan cooldown

### Changed
- Rebrand dari "ADE PUTRA CTF" ke "APCTF"
- Landing page redesign dengan UI/UX modern
- Footer dengan link yang berfungsi
- Navbar dengan efek scroll transparan
- Semua teks menggunakan Bahasa Indonesia

### Fixed
- Link "Lupa password?" sekarang berfungsi
- Redirect setelah login
- Email verification redirect ke halaman yang benar

### Security
- Middleware protection untuk halaman terproteksi
- Email verification wajib untuk akses tantangan
- Reset password via email

## [1.0.0] - 2026-07-14

### Added
- Landing page dengan desain modern
- Sistem autentikasi (Register, Login, Logout)
- OAuth integration (Google & GitHub)
- Halaman tantangan dengan filter kategori dan kesulitan
- Halaman detail tantangan dengan submit flag
- Sistem poin dan papan peringkat
- Profil pengguna dengan riwayat solve
- Admin panel untuk kelola tantangan (CRUD)
- Password visibility toggle
- Password strength indicator
- Form validasi (username, email, password)
- Responsive design (mobile-friendly)
- Dark mode UI
- 10+ sample tantangan (Web, Crypto, Forensics, OSINT, Misc)
- Supabase integration (Database & Auth)
- Vercel deployment
- Bahasa Indonesia untuk semua UI

### Security
- Row Level Security (RLS) pada Supabase
- Input sanitization
- Password hashing (bcrypt via Supabase)
- CSRF protection (built-in Next.js)
- Rate limiting (Supabase Auth)

### Technical
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Supabase PostgreSQL
- Vercel hosting

## [0.1.0] - 2026-07-14

### Added
- Initial project setup
- Next.js boilerplate
- Supabase configuration
- Basic project structure

---

## Format

### Types
- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** in case of vulnerabilities
