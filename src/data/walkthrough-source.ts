// ==============================================
// WALKTHROUGH SOURCE FILE - EDIT YANG INI
// ==============================================
// Jangan edit /src/app/walkthrough/page.tsx langsung!
// Edit file ini, lalu jalankan: npm run obfuscate
// ==============================================

export interface WalkthroughItem {
  id: number
  title: string
  category: string
  difficulty: string
  points: number
  flag: string
  description: string
  tools: string[]
  steps: string[]
  logic: string
  downloadFile: string | null
}

export const challengeFiles: Record<string, string> = {
  'Pesawat Kertas': 'pesawat_kertas.txt',
  'Jejak Digital': 'suspect_photo.png',
  'XOR Rahasia': 'xor_encrypted.txt',
  'Pesan dalam Botol': 'caesar_cipher.txt',
  'Mesin Waktu': 'time_machine.pyc',
  'File Rahasia': 'secret.bin',
  'SQL Injection Blind': 'blind_sqli_simulator.html',
}

export const GITHUB_RAW = 'https://raw.githubusercontent.com/Syaptiyan/adeputra-ctf/master/challenge-files/'

export const walkthroughs: WalkthroughItem[] = [
  {
    id: 1,
    title: 'Hello World',
    category: 'misc',
    difficulty: 'easy',
    points: 50,
    flag: 'APCTF{h3ll0_w0rld_1_4m_h4ck3r}',
    description: 'Challenge pertama untuk memulai perjalananmu.',
    tools: [],
    steps: [
      'Baca judul tantangan: "Hello World"',
      'Flag ada di deskripsi tantangan',
      'Submit flag yang diberikan'
    ],
    logic: 'Ini adalah challenge tutorial. Tujuannya untuk memperkenalkan format flag dan cara submit. Tidak perlu tools apapun, cukup baca dan submit.',
    downloadFile: null
  },
  {
    id: 2,
    title: 'Inspektur Cookie',
    category: 'web',
    difficulty: 'easy',
    points: 100,
    flag: 'APCTF{c00k13_1nspekt0r_f0und_1t}',
    description: 'Menemukan data tersembunyi di cookie browser.',
    tools: ['Browser (Chrome/Firefox)', 'DevTools (F12)'],
    steps: [
      'Buka website target',
      'Tekan F12 untuk membuka DevTools',
      'Tab "Application" → "Cookies"',
      'Periksa setiap cookie yang ada',
      'Flag biasanya di-encode dengan Base64',
      'Decode Base64 untuk mendapatkan flag'
    ],
    logic: 'Cookie sering menyimpan data sensitif seperti session token, user role, atau bahkan flag. Developer kadang lupa mengenkripsi data di cookie. Yang perlu dicek: nama cookie, value cookie, dan apakah value-nya di-encode (Base64, URL encoding, dll).',
    downloadFile: null
  },
  {
    id: 3,
    title: 'Pesawat Kertas',
    category: 'crypto',
    difficulty: 'easy',
    points: 100,
    flag: 'APCTF{4sc11_4rt_p4p3r_pl4n3}',
    description: 'Mengubah angka ASCII menjadi teks.',
    tools: ['ASCII Converter (online)', 'Python'],
    steps: [
      'Lihat angka-angka: 72 101 108 108 111 32 87 111 114 108 100 33',
      'Angka-angka ini adalah kode ASCII',
      'Setiap angka mewakili satu karakter',
      'Gunakan converter ASCII → Text',
      'Hasil: "Hello World!"',
      'Flag menggunakan format leetspeak'
    ],
    logic: 'ASCII (American Standard Code for Information Interchange) adalah standar encoding karakter. Setiap karakter punya kode angka: A=65, a=97, 0=48, spasi=32. Di CTF, ASCII sering digunakan untuk menyembunyikan pesan dalam bentuk angka.',
    downloadFile: 'Pesawat Kertas'
  },
  {
    id: 4,
    title: 'Jejak Digital',
    category: 'forensics',
    difficulty: 'easy',
    points: 150,
    flag: 'APCTF{m3t4d4t4_j3j4k_d1g1t4l}',
    description: 'Menemukan metadata tersembunyi dalam file gambar.',
    tools: ['exiftool', 'jimpl.com', "Jeffrey's Image Metadata Viewer"],
    steps: [
      'Download file gambar dari challenge',
      'Buka terminal/command prompt',
      'Jalankan: exiftool nama_file.jpg',
      'Periksa semua metadata yang muncul',
      'Flag biasanya ada di field: Comment, Description, atau User Comment',
      'Atau buka https://jimpl.com dan upload gambar'
    ],
    logic: 'Metadata adalah "data tentang data". Setiap file menyimpan informasi tambahan seperti: kapan dibuat, oleh siapa, dengan device apa, GPS location, dan custom comment. Di CTF, flag sering disembunyikan di metadata karena jarang diperiksa user biasa.',
    downloadFile: 'Jejak Digital'
  },
  {
    id: 5,
    title: 'XOR Rahasia',
    category: 'crypto',
    difficulty: 'medium',
    points: 200,
    flag: 'APCTF{x0r_r4h4s14_4g3n}',
    description: 'Memecahkan enkripsi XOR dengan satu karakter kunci.',
    tools: ['Python', 'CyberChef', 'XOR Calculator online'],
    steps: [
      'XOR adalah operasi bitwise: 1⊕1=0, 1⊕0=1, 0⊕0=0',
      'Jika diketahui panjang plaintext, bisa brute force kunci',
      'XOR dengan kunci yang sama dua kali = kembali ke asli',
      'Coba XOR setiap byte dengan semua karakter printable (32-126)',
      'Kunci yang benar menghasilkan teks yang bisa dibaca'
    ],
    logic: 'XOR (Exclusive OR) adalah operasi bitwise yang reversible. Kelebihan: A ⊕ B ⊕ B = A. Kelemahan: jika kunci lebih pendek dari plaintext, pola bisa terdeteksi. Untuk single-byte XOR, cukup brute force 256 kemungkinan kunci.',
    downloadFile: 'XOR Rahasia'
  },
  {
    id: 6,
    title: 'Portal Tersembunyi',
    category: 'web',
    difficulty: 'medium',
    points: 200,
    flag: 'APCTF{h1dd3n_p0rt4l_4dm1n}',
    description: 'Menemukan halaman admin yang tersembunyi.',
    tools: ['Browser', 'dirb/gobuster', 'Wordlist'],
    steps: [
      'Coba akses path umum secara manual',
      '/admin, /dashboard, /panel, /manage, /cpanel',
      'Gunakan directory bruteforce jika tidak ketemu',
      'Periksa robots.txt: /robots.txt',
      'Periksa sitemap: /sitemap.xml',
      'Cek source code HTML untuk link tersembunyi'
    ],
    logic: 'Developer sering menyembunyikan halaman admin dengan tidak menautkannya di menu. Tapi halaman tetap bisa diakses jika tahu URL-nya. Cara menemukan: 1) Tebak path umum, 2) Bruteforce dengan wordlist, 3) Cek robots.txt, 4) Cek source code.',
    downloadFile: null
  },
  {
    id: 7,
    title: 'Pesan dalam Botol',
    category: 'crypto',
    difficulty: 'medium',
    points: 200,
    flag: 'APCTF{l1k3_bl1nd_p3rs0n_s33s}',
    description: 'Memecahkan Caesar Cipher.',
    tools: ['dCode.fr', 'CyberChef', 'Python'],
    steps: [
      'Caesar Cipher menggeser setiap huruf dengan jumlah tetap',
      'Ada 26 kemungkinan geseran (0-25)',
      'Coba ROT13 (geser 13) karena paling umum',
      'Atau brute force semua 26 kemungkinan',
      'Geseran yang benar menghasilkan teks yang bisa dibaca'
    ],
    logic: 'Caesar Cipher adalah cipher substitusi paling sederhana. Setiap huruf digeser dengan jumlah tetap. Kelemahan: hanya ada 26 kemungkinan, bisa di-brute force. ROT-13 adalah Caesar dengan geseran 13, sering digunakan karena mengaplikasikan dua kali = kembali ke asli.',
    downloadFile: 'Pesan dalam Botol'
  },
  {
    id: 8,
    title: 'Stalker Digital',
    category: 'osint',
    difficulty: 'medium',
    points: 200,
    flag: 'APCTF{0s1nt_gh0st_f0und}',
    description: 'Melacak identitas seseorang dari username.',
    tools: ['Google', 'GitHub', 'Sherlock', 'Namechk.com'],
    steps: [
      'Cari username "gh0st_hunt3r" di berbagai platform',
      'GitHub: https://github.com/gh0st_hunt3r',
      'Twitter: https://twitter.com/gh0st_hunt3r',
      'Reddit: https://reddit.com/user/gh0st_hunt3r',
      'Periksa profile, bio, postingan',
      'Di GitHub: cek repository, commit history, email di commit'
    ],
    logic: 'OSINT (Open Source Intelligence) adalah teknik mengumpulkan informasi dari sumber publik. Orang sering menggunakan username yang sama di berbagai platform. GitHub sangat berharga karena commit sering menyimpan email dan nama asli. Tools: Sherlock, Namechk, Google Dorking.',
    downloadFile: null
  },
  {
    id: 9,
    title: 'Race to Riches',
    category: 'web',
    difficulty: 'medium',
    points: 250,
    flag: 'APCTF{r4c3_c0nd1t10n_w1nn3r}',
    description: 'Mengeksploitasi race condition di e-commerce.',
    tools: ['Burp Suite', 'Python + threading', 'curl'],
    steps: [
      'Race condition = mengirim banyak request bersamaan',
      'Sistem memproses request satu per satu',
      'Jika 2 request checkout dikirim bersamaan, saldo bisa minus',
      'Gunakan Burp Intruder atau script Python',
      'Kirim 100+ request checkout dalam waktu bersamaan'
    ],
    logic: 'Race condition terjadi ketika sistem tidak menangani concurrent access dengan benar. Di e-commerce, jika 2 request checkout diproses bersamaan sebelum saldo terupdate, kedua request bisa berhasil. Cara mencegah: gunakan database locking atau atomic operations.',
    downloadFile: null
  },
  {
    id: 10,
    title: 'Mesin Waktu',
    category: 'reverse',
    difficulty: 'medium',
    points: 250,
    flag: 'APCTF{t1m3_m4ch1n3_r3v3rs3d}',
    description: 'Mereverse engineer Python bytecode.',
    tools: ['uncompyle6', 'pycdc', 'Python dis module'],
    steps: [
      'File .pyc adalah compiled Python bytecode',
      'Gunakan uncompyle6 untuk decompile kembali ke source',
      'Cari string yang dibandingkan dengan input user',
      'String tersebut adalah flag'
    ],
    logic: 'Python bytecode (.pyc) adalah compiled Python. Meskipun bukan source code, bytecode bisa di-decompile kembali. Tools seperti uncompyle6 bisa menghasilkan source code yang sangat mirip dengan aslinya. Di CTF, flag sering ada di string constants.',
    downloadFile: 'Mesin Waktu'
  },
  {
    id: 11,
    title: 'Labirin JWT',
    category: 'web',
    difficulty: 'hard',
    points: 300,
    flag: 'APCTF{jwt_n0n3_4lg0_byp4ss3d}',
    description: 'Mengubah JWT tanpa mengetahui secret key.',
    tools: ['jwt.io', 'Python PyJWT', 'Burp Suite'],
    steps: [
      'JWT terdiri dari: Header.Payload.Signature',
      'Header berisi "alg" (algorithm)',
      'Coba ubah "alg" dari "HS256" menjadi "none"',
      'Ubah "role" dari "user" menjadi "admin"',
      'Hapus signature (atau isi dengan string kosong)',
      'Submit JWT baru'
    ],
    logic: 'JWT (JSON Web Token) memiliki vulnerability jika algorithm "none" diizinkan. Dengan alg=none, signature tidak diperlukan. Attacker bisa mengubah payload (misal role) tanpa mengetahui secret key. Pencegahan: whitelist algorithm yang diizinkan di server.',
    downloadFile: null
  },
  {
    id: 12,
    title: 'File Rahasia',
    category: 'forensics',
    difficulty: 'hard',
    points: 300,
    flag: 'APCTF{b1n4ry_f1l3_3xtr4ct3d}',
    description: 'Mengekstrak data dari file binary.',
    tools: ['binwalk', 'strings', 'hexdump', 'file'],
    steps: [
      'Cek tipe file: file secret.bin',
      'Hex dump awal: 1f8b0800 → file gzip',
      'Gunakan binwalk untuk cari embedded files',
      'Extract dengan binwalk -e',
      'Atau gunakan strings untuk cari flag langsung'
    ],
    logic: 'File binary sering menyimpan data tersembunyi. Magic bytes (4 byte pertama) menentukan tipe file: 1f8b0800=gzip, 89504e47=PNG, 4d5a=EXE. Tools: binwalk (cari embedded files), strings (cari teks), hexdump (analisis manual). File bisa di-embed di dalam file lain.',
    downloadFile: 'File Rahasia'
  },
  {
    id: 13,
    title: 'Kripto RSA Pemula',
    category: 'crypto',
    difficulty: 'hard',
    points: 300,
    flag: 'APCTF{sm4ll_k3y_b1g_pr0bl3m}',
    description: 'Mendekripsi RSA dengan modulus kecil.',
    tools: ['Python', 'RsaCtfTool', 'factordb.com'],
    steps: [
      'RSA: c = m^e mod n',
      'Untuk dekripsi, butuh d = e^-1 mod phi(n)',
      'phi(n) = (p-1)(q-1) dimana n = p*q',
      'Faktorkan n = 3233 → 53 * 61',
      'Hitung phi(n) = 52 * 60 = 3120',
      'Hitung d = 17^-1 mod 3120 = 2753',
      'Hitung m = 2790^2753 mod 3233'
    ],
    logic: 'RSA mengandalkan kesulitan memfaktorkan bilangan besar. Jika n kecil, bisa di-faktorkan brute force. Setelah tahu p dan q, bisa hitung private key d. Tools: factordb.com (database faktor), RsaCtfTool (automasi). Pencegahan: gunakan n minimal 2048 bit.',
    downloadFile: null
  },
  {
    id: 14,
    title: 'SQL Injection Blind',
    category: 'web',
    difficulty: 'hard',
    points: 350,
    flag: 'APCTF{bl1nd_sql1_1s_p41nful}',
    description: 'Mengekstrak data tanpa output langsung.',
    tools: ['sqlmap', 'Burp Suite', 'Python'],
    steps: [
      'Blind SQLi = tidak ada output langsung',
      'Tapi bisa lihat perbedaan response (true/false)',
      'Teknik: Boolean-based blind',
      'Jika condition true → response normal',
      'Jika condition false → response beda (error/empty)',
      'Gunakan untuk menebak data karakter per karakter'
    ],
    logic: 'Blind SQL Injection mengekstrak data tanpa output langsung. Teknik: 1) Boolean-based (perbedaan response), 2) Time-based (delay jika true), 3) Error-based (pesan error). Data ditebak karakter per karakter dengan membandingkan response. Tools: sqlmap (automasi), Burp Intruder.',
    downloadFile: 'SQL Injection Blind'
  }
]
