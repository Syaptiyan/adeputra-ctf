"use client";

import { useState } from "react";
import Link from "next/link";

// Obfuscated data loader
const _0xDataLoader = (): string[] => {
  const _0xEncoded: string[] = [
    "aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1N5YXB0aXlhbi9hZGVwdXRyYS1jdGYvbWFzdGVyL2NoYWxsZW5nZS1maWxlcy8=",
    "cGVzYXdhdF9rZXJ0YXMudHh0",
    "c3VzcGVjdF9waG90by5wbmc=",
    "eG9yX2VuY3J5cHRlZC50eHQ=",
    "Y2Flc2FyX2NpcGhlci50eHQ=",
    "dGltZV9tYWNoaW5lLnB5Yw==",
    "c2VjcmV0LmJpbg==",
    "YmxpbmRfc3FsaV9zaW11bGF0b3IuaHRtbA=="
  ];
  return _0xEncoded.map((e: string) => atob(e));
};

// Obfuscated flags
const _0xFlagVault = {
  _0xf1: () => String.fromCharCode(65,80,67,84,70,123,104,51,108,108,48,95,119,48,114,108,100,95,49,95,52,109,95,104,52,99,107,51,114,125),
  _0xf2: () => atob("QVBDVEZ7YzAwa2szX2kzc3BlazByX2YwdW5kXzF0fQ=="),
  _0xf3: () => [65,80,67,84,70,123,52,115,99,49,49,95,52,114,116,95,52,112,52,114,95,112,108,52,110,51,125].map(c=>String.fromCharCode(c)).join(""),
  _0xf4: () => "APCTF{" + "m3t4d4t4_" + "j3j4k_" + "d1g1t4l" + "}",
  _0xf5: () => ["APCTF","{x0r_","r4h4s","14_4g","3n}"].join(""),
  _0xf6: () => atob("QVBDVEZ7aDFkZDNuX3AwcnQ0bF80ZG0xbn0="),
  _0xf7: () => String.fromCharCode(...[65,80,67,84,70,123,108,49,107,51,95,98,108,49,110,100,95,112,51,114,115,48,110,95,115,51,51,115,125]),
  _0xf8: () => atob("QVBDVEZ7cjRjM19jMG4xZDEwbl93MW4=") + "cjF9",
  _0xf9: () => "APCTF{jwt_n0" + "n3_4lg0_byp" + "4ss3d}",
  _0xfa: () => [65,80,67,84,70,123,98,49,110,52,114,121,95,102,49,108,51,95,51,120,116,114,52,99,116,51,100,125].map(c=>String.fromCharCode(c)).join(""),
  _0xfb: () => atob("QVBDVEZ7YmwxbmRfc3FsMV8xc19wNDFuZnVs"),
  _0xfc: () => "APCTF{" + "sm4ll_" + "k3y_b" + "1g_pr" + "0bl3m" + "}",
  _0xfd: () => String.fromCharCode(65,80,67,84,70,123)+[48,115,49,110,116,95,103,104,48,115,116,95,102,48,117,110,100].map((c:number)=>String.fromCharCode(c)).join("")+String.fromCharCode(125),
  _0xfe: () => ["AP","CT","F{","t1","m3","_m","4c","h1","n3","_r","3v","3r","s3","d}"].join("")
};

// Obfuscated walkthrough data
const _0xWalkthroughData = [
  { id: 1, title: "Hello World", cat: "misc", diff: "easy", pts: 50, flag: _0xFlagVault._0xf1(), desc: "Challenge pertama untuk memulai perjalananmu.", tools: [], steps: ["Baca judul tantangan", "Flag ada di deskripsi", "Submit flag"], logic: "Challenge tutorial. Format flag: APCTF{...}", dl: null },
  { id: 2, title: "Inspektur Cookie", cat: "web", diff: "easy", pts: 100, flag: _0xFlagVault._0xf2(), desc: "Menemukan data tersembunyi di cookie browser.", tools: ["Browser", "DevTools (F12)"], steps: ["Buka website target","F12 → Application → Cookies","Periksa semua cookie","Flag biasanya Base64 encoded","Decode untuk dapat flag"], logic: "Cookie sering menyimpan data sensitif. Developer kadang lupa mengenkripsi data di cookie.", dl: null },
  { id: 3, title: "Pesawat Kertas", cat: "crypto", diff: "easy", pts: 100, flag: _0xFlagVault._0xf3(), desc: "Mengubah angka ASCII menjadi teks.", tools: ["ASCII Converter", "Python"], steps: ["Lihat angka-angka: 72 101 108...","Angka = kode ASCII","Setiap angka = 1 karakter","Gunakan converter ASCII → Text"], logic: "ASCII: A=65, a=97, spasi=32. Di CTF, ASCII sering digunakan untuk menyembunyikan pesan.", dl: 0 },
  { id: 4, title: "Jejak Digital", cat: "forensics", diff: "easy", pts: 150, flag: _0xFlagVault._0xf4(), desc: "Menemukan metadata tersembunyi dalam file gambar.", tools: ["exiftool", "jimpl.com"], steps: ["Download file gambar","exiftool nama_file.jpg","Periksa semua metadata","Flag di Comment/Description"], logic: "Metadata = data tentang data. Setiap file menyimpan info tambahan: kapan dibuat, oleh siapa, GPS, custom comment.", dl: 1 },
  { id: 5, title: "XOR Rahasia", cat: "crypto", diff: "medium", pts: 200, flag: _0xFlagVault._0xf5(), desc: "Memecahkan enkripsi XOR dengan satu karakter kunci.", tools: ["Python", "CyberChef"], steps: ["XOR = operasi bitwise: 1⊕1=0, 1⊕0=1","Brute force semua karakter printable","Kunci benar = teks bisa dibaca"], logic: "XOR reversible: A⊕B⊕B=A. Kelemahan: single-byte XOR = hanya 256 kemungkinan.", dl: 2 },
  { id: 6, title: "Portal Tersembunyi", cat: "web", diff: "medium", pts: 200, flag: _0xFlagVault._0xf6(), desc: "Menemukan halaman admin yang tersembunyi.", tools: ["dirb/gobuster", "Wordlist"], steps: ["Coba path umum: /admin, /dashboard","Cek robots.txt","Gunakan directory bruteforce","Cek source code HTML"], logic: "Developer sering menyembunyikan halaman admin. Tapi tetap bisa diakses jika tahu URL-nya.", dl: null },
  { id: 7, title: "Pesan dalam Botol", cat: "crypto", diff: "medium", pts: 200, flag: _0xFlagVault._0xf7(), desc: "Memecahkan Caesar Cipher.", tools: ["dCode.fr", "Python"], steps: ["Caesar Cipher = geser huruf","Ada 26 kemungkinan geseran","Coba ROT13 (geser 13) - paling umum","Brute force semua 26"], logic: "Caesar Cipher = cipher substitusi paling sederhana. ROT13 = geser 13, sering dipakai karena 2x = asli.", dl: 3 },
  { id: 8, title: "Stalker Digital", cat: "osint", diff: "medium", pts: 200, flag: _0xFlagVault._0xfd(), desc: "Melacak identitas dari username.", tools: ["Sherlock", "Namechk.com"], steps: ["Cari username di berbagai platform","GitHub, Twitter, Reddit, Telegram","Periksa profile, bio, postingan","Di GitHub: cek commit history"], logic: "OSINT = info dari sumber publik. GitHub sering menyimpan email/nama asli di commit.", dl: null },
  { id: 9, title: "Race to Riches", cat: "web", diff: "medium", pts: 250, flag: _0xFlagVault._0xf8(), desc: "Mengeksploitasi race condition di e-commerce.", tools: ["Burp Suite", "Python + threading"], steps: ["Race condition = banyak request bersamaan","Sistem proses request satu per satu","2 request checkout bersamaan = saldo minus","Gunakan Burp Intruder"], logic: "Race condition: concurrent access tidak ditangani dengan benar. Pencegahan: database locking.", dl: null },
  { id: 10, title: "Mesin Waktu", cat: "reverse", diff: "medium", pts: 250, flag: _0xFlagVault._0xfe(), desc: "Mereverse engineer Python bytecode.", tools: ["uncompyle6", "pycdc"], steps: ["File .pyc = compiled Python bytecode","uncompyle6 untuk decompile","Cari string yang dibandingkan dengan input"], logic: "Python bytecode bisa di-decompile. Tools: uncompyle6, pycdc. Flag sering di string constants.", dl: 4 },
  { id: 11, title: "Labirin JWT", cat: "web", diff: "hard", pts: 300, flag: _0xFlagVault._0xf9(), desc: "Mengubah JWT tanpa mengetahui secret key.", tools: ["jwt.io", "PyJWT"], steps: ["JWT = Header.Payload.Signature","Ubah alg dari HS256 ke none","Ubah role ke admin","Hapus signature"], logic: "JWT vulnerability: alg=none = signature tidak diperluan. Pencegahan: whitelist algorithm.", dl: null },
  { id: 12, title: "File Rahasia", cat: "forensics", diff: "hard", pts: 300, flag: _0xFlagVault._0xfa(), desc: "Mengekstrak data dari file binary.", tools: ["binwalk", "strings", "file"], steps: ["Cek tipe file: file secret.bin","Hex header: 1f8b0800 = gzip","binwalk -e untuk extract","strings untuk cari flag"], logic: "Magic bytes tentukan tipe file. Tools: binwalk (embedded files), strings (teks), hexdump (manual).", dl: 5 },
  { id: 13, title: "Kripto RSA Pemula", cat: "crypto", diff: "hard", pts: 300, flag: _0xFlagVault._0xfc(), desc: "Mendekripsi RSA dengan modulus kecil.", tools: ["Python", "factordb.com"], steps: ["RSA: c = m^e mod n","Faktorkan n kecil","Hitung d = e^-1 mod phi(n)","Dekripsi: m = c^d mod n"], logic: "RSA mengandalkan kesulitan memfaktorkan bilangan besar. N kecil = bisa di-faktorkan.", dl: null },
  { id: 14, title: "SQL Injection Blind", cat: "web", diff: "hard", pts: 350, flag: _0xFlagVault._0xfb(), desc: "Mengekstrak data tanpa output langsung.", tools: ["sqlmap", "Burp Suite"], steps: ["Blind SQLi = tidak ada output langsung","Boolean-based: perbedaan response","Time-based: delay jika true","Data ditebak karakter per karakter"], logic: "Blind SQLi mengekstrak data tanpa output. Teknik: boolean, time, error-based. Tools: sqlmap.", dl: 6 }
];

export default function Walkthrough() {
  const [selCat, setSelCat] = useState("all");
  const [expId, setExpId] = useState<number | null>(null);
  const cats = ["all", "web", "crypto", "forensics", "osint", "reverse", "misc"];
  const files = _0xDataLoader();
  const filtered = selCat === "all" ? _0xWalkthroughData : _0xWalkthroughData.filter(w => w.cat === selCat);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Walkthrough</h1>
        <p className="text-gray-400 text-lg">Panduan lengkap cara menyelesaikan setiap tantangan</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {cats.map(c => (
          <button key={c} onClick={() => setSelCat(c)} className={`px-4 py-2 rounded-lg font-medium transition-colors ${selCat === c ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-400 hover:text-white"}`}>
            {c === "all" ? "Semua" : c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((item) => (
          <div key={item.id} className="card">
            <button onClick={() => setExpId(expId === item.id ? null : item.id)} className="w-full text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-orange-500">#{item.id}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <div className="flex gap-2 mt-1">
                      <span className="category-badge">{item.cat}</span>
                      <span className={`badge-${item.diff}`}>{item.diff}</span>
                      <span className="text-orange-400 text-sm">{item.pts} pts</span>
                    </div>
                  </div>
                </div>
                <svg className={`w-5 h-5 text-gray-400 transition-transform ${expId === item.id ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {expId === item.id && (
              <div className="mt-6 space-y-6 border-t border-gray-800 pt-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">DESKRIPSI</h4>
                  <p className="text-gray-300">{item.desc}</p>
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
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">TOOLS</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.tools.map((t, i) => <span key={i} className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded text-sm">{t}</span>)}
                    </div>
                  </div>
                )}
                {item.dl !== null && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">FILE CHALLENGE</h4>
                    <a href={atob("aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1N5YXB0aXlhbi9hZGVwdXRyYS1jdGYvbWFzdGVyL2NoYWxsZW5nZS1maWxlcy8=") + files[item.dl]} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded-lg transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      Download {files[item.dl]}
                    </a>
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">LANGKAH-LANGKAH</h4>
                  <ol className="space-y-2">
                    {item.steps.map((s, i) => <li key={i} className="flex gap-3 text-gray-300"><span className="text-orange-500 font-bold">{i + 1}.</span>{s}</li>)}
                  </ol>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/challenges" className="text-orange-500 hover:text-orange-400">← Kembali ke Tantangan</Link>
      </div>
    </div>
  );
}
