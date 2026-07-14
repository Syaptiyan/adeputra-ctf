'use client';

import { useState } from 'react';
import Link from 'next/link';

const _0xFL: Record<string, string> = {
  _01: [65,80,67,84,70,123,104,51,108,108,48,95,119,48,114,108,100,95,49,95,52,109,95,104,52,99,107,51,114,125].map((c:number)=>String.fromCharCode(c)).join(""),
  _02: atob("QVBDVEZ7YzAwazEzXzFuc3Bla3Qwcl9mMHVuZF8xdH0="),
  _03: "APCTF{4sc"+"11_4rt_p4"+"p3r_pl4n3}",
  _04: [62,77,64,81,67,120,106,48,113,49,97,49,113,49,92,103,48,103,49,104,92,97,46,100,46,113,49,105,122].map((c:number)=>String.fromCharCode(c+3)).join(""),
  _05: [65,80,67,84,70,123,120,48,114,95,114,52,104,52,115,49,52,95,52,103,51,110,125].map((c:number)=>String.fromCharCode(c)).join(""),
  _06: atob("QVBDVEZ7aDFkZDNuX3AwcnQ0bF80ZG0xbn0="),
  _07: "APCTF{l1k"+"3_bl1nd_p"+"3rs0n_s33s}",
  _08: [62,77,64,81,67,120,45,112,46,107,113,92,100,101,45,112,113,92,99,45,114,107,97,122].map((c:number)=>String.fromCharCode(c+3)).join(""),
  _09: [65,80,67,84,70,123,114,52,99,51,95,99,48,110,100,49,116,49,48,110,95,119,49,110,110,51,114,125].map((c:number)=>String.fromCharCode(c)).join(""),
  _0a: atob("QVBDVEZ7dDFtM19tNGNoMW4zX3IzdjNyczNkfQ=="),
  _0b: "APCTF{jwt"+"_n0n3_4lg"+"0_byp4ss3d}",
  _0c: [62,77,64,81,67,120,95,46,107,49,111,118,92,99,46,105,48,92,48,117,113,111,49,96,113,48,97,122].map((c:number)=>String.fromCharCode(c+3)).join(""),
  _0d: [65,80,67,84,70,123,115,109,52,108,108,95,107,51,121,95,98,49,103,95,112,114,48,98,108,51,109,125].map((c:number)=>String.fromCharCode(c)).join(""),
  _0e: atob("QVBDVEZ7YmwxbmRfc3FsMV8xc19wNDFuZnVsfQ==")
};

const _0xWL = [
  {id:1,t:"Hello World",c:"misc",d:"easy",p:50,f:_0xFL._01,desc:"Challenge pertama untuk memulai perjalananmu.",tools:[],steps:["Baca judul tantangan: \"Hello World\"","Flag ada di deskripsi tantangan","Submit flag yang diberikan"],l:"Ini adalah challenge tutorial. Tujuannya untuk memperkenalkan format flag dan cara submit. Tidak perlu tools apapun, cukup baca dan submit.",dl:null},
  {id:2,t:"Inspektur Cookie",c:"web",d:"easy",p:100,f:_0xFL._02,desc:"Menemukan data tersembunyi di cookie browser.",tools:["Browser (Chrome/Firefox)","DevTools (F12)"],steps:["Buka website target","Tekan F12 untuk membuka DevTools","Tab \"Application\" → \"Cookies\"","Periksa setiap cookie yang ada","Flag biasanya di-encode dengan Base64","Decode Base64 untuk mendapatkan flag"],l:"Cookie sering menyimpan data sensitif seperti session token, user role, atau bahkan flag. Developer kadang lupa mengenkripsi data di cookie. Yang perlu dicek: nama cookie, value cookie, dan apakah value-nya di-encode (Base64, URL encoding, dll).",dl:null},
  {id:3,t:"Pesawat Kertas",c:"crypto",d:"easy",p:100,f:_0xFL._03,desc:"Mengubah angka ASCII menjadi teks.",tools:["ASCII Converter (online)","Python"],steps:["Lihat angka-angka: 72 101 108 108 111 32 87 111 114 108 100 33","Angka-angka ini adalah kode ASCII","Setiap angka mewakili satu karakter","Gunakan converter ASCII → Text","Hasil: \"Hello World!\"","Flag menggunakan format leetspeak"],l:"ASCII (American Standard Code for Information Interchange) adalah standar encoding karakter. Setiap karakter punya kode angka: A=65, a=97, 0=48, spasi=32. Di CTF, ASCII sering digunakan untuk menyembunyikan pesan dalam bentuk angka.",dl:"Pesawat Kertas"},
  {id:4,t:"Jejak Digital",c:"forensics",d:"easy",p:150,f:_0xFL._04,desc:"Menemukan metadata tersembunyi dalam file gambar.",tools:["exiftool","jimpl.com","Jeffrey's Image Metadata Viewer"],steps:["Download file gambar dari challenge","Buka terminal/command prompt","Jalankan: exiftool nama_file.jpg","Periksa semua metadata yang muncul","Flag biasanya ada di field: Comment, Description, atau User Comment","Atau buka https://jimpl.com dan upload gambar"],l:"Metadata adalah \"data tentang data\". Setiap file menyimpan informasi tambahan seperti: kapan dibuat, oleh siapa, dengan device apa, GPS location, dan custom comment. Di CTF, flag sering disembunyikan di metadata karena jarang diperiksa user biasa.",dl:"Jejak Digital"},
  {id:5,t:"XOR Rahasia",c:"crypto",d:"medium",p:200,f:_0xFL._05,desc:"Memecahkan enkripsi XOR dengan satu karakter kunci.",tools:["Python","CyberChef","XOR Calculator online"],steps:["XOR adalah operasi bitwise: 1⊕1=0, 1⊕0=1, 0⊕0=0","Jika diketahui panjang plaintext, bisa brute force kunci","XOR dengan kunci yang sama dua kali = kembali ke asli","Coba XOR setiap byte dengan semua karakter printable (32-126)","Kunci yang benar menghasilkan teks yang bisa dibaca"],l:"XOR (Exclusive OR) adalah operasi bitwise yang reversible. Kelebihan: A ⊕ B ⊕ B = A. Kelemahan: jika kunci lebih pendek dari plaintext, pola bisa terdeteksi. Untuk single-byte XOR, cukup brute force 256 kemungkinan kunci.",dl:"XOR Rahasia"},
  {id:6,t:"Portal Tersembunyi",c:"web",d:"medium",p:200,f:_0xFL._06,desc:"Menemukan halaman admin yang tersembunyi.",tools:["Browser","dirb/gobuster","Wordlist"],steps:["Coba akses path umum secara manual","/admin, /dashboard, /panel, /manage, /cpanel","Gunakan directory bruteforce jika tidak ketemu","Periksa robots.txt: /robots.txt","Periksa sitemap: /sitemap.xml","Cek source code HTML untuk link tersembunyi"],l:"Developer sering menyembunyikan halaman admin dengan tidak menautkannya di menu. Tapi halaman tetap bisa diakses jika tahu URL-nya. Cara menemukan: 1) Tebak path umum, 2) Bruteforce dengan wordlist, 3) Cek robots.txt, 4) Cek source code.",dl:null},
  {id:7,t:"Pesan dalam Botol",c:"crypto",d:"medium",p:200,f:_0xFL._07,desc:"Memecahkan Caesar Cipher.",tools:["dCode.fr","CyberChef","Python"],steps:["Caesar Cipher menggeser setiap huruf dengan jumlah tetap","Ada 26 kemungkinan geseran (0-25)","Coba ROT13 (geser 13) karena paling umum","Atau brute force semua 26 kemungkinan","Geseran yang benar menghasilkan teks yang bisa dibaca"],l:"Caesar Cipher adalah cipher substitusi paling sederhana. Setiap huruf digeser dengan jumlah tetap. Kelemahan: hanya ada 26 kemungkinan, bisa di-brute force. ROT-13 adalah Caesar dengan geseran 13, sering digunakan karena mengaplikasikan dua kali = kembali ke asli.",dl:"Pesan dalam Botol"},
  {id:8,t:"Stalker Digital",c:"osint",d:"medium",p:200,f:_0xFL._08,desc:"Melacak identitas seseorang dari username.",tools:["Google","GitHub","Sherlock","Namechk.com"],steps:["Cari username \"gh0st_hunt3r\" di berbagai platform","GitHub: https://github.com/gh0st_hunt3r","Twitter: https://twitter.com/gh0st_hunt3r","Reddit: https://reddit.com/user/gh0st_hunt3r","Periksa profile, bio, postingan","Di GitHub: cek repository, commit history, email di commit"],l:"OSINT (Open Source Intelligence) adalah teknik mengumpulkan informasi dari sumber publik. Orang sering menggunakan username yang sama di berbagai platform. GitHub sangat berharga karena commit sering menyimpan email dan nama asli. Tools: Sherlock, Namechk, Google Dorking.",dl:null},
  {id:9,t:"Race to Riches",c:"web",d:"medium",p:250,f:_0xFL._09,desc:"Mengeksploitasi race condition di e-commerce.",tools:["Burp Suite","Python + threading","curl"],steps:["Race condition = mengirim banyak request bersamaan","Sistem memproses request satu per satu","Jika 2 request checkout dikirim bersamaan, saldo bisa minus","Gunakan Burp Intruder atau script Python","Kirim 100+ request checkout dalam waktu bersamaan"],l:"Race condition terjadi ketika sistem tidak menangani concurrent access dengan benar. Di e-commerce, jika 2 request checkout diproses bersamaan sebelum saldo terupdate, kedua request bisa berhasil. Cara mencegah: gunakan database locking atau atomic operations.",dl:null},
  {id:10,t:"Mesin Waktu",c:"reverse",d:"medium",p:250,f:_0xFL._0a,desc:"Mereverse engineer Python bytecode.",tools:["uncompyle6","pycdc","Python dis module"],steps:["File .pyc adalah compiled Python bytecode","Gunakan uncompyle6 untuk decompile kembali ke source","Cari string yang dibandingkan dengan input user","String tersebut adalah flag"],l:"Python bytecode (.pyc) adalah compiled Python. Meskipun bukan source code, bytecode bisa di-decompile kembali. Tools seperti uncompyle6 bisa menghasilkan source code yang sangat mirip dengan aslinya. Di CTF, flag sering ada di string constants.",dl:"Mesin Waktu"},
  {id:11,t:"Labirin JWT",c:"web",d:"hard",p:300,f:_0xFL._0b,desc:"Mengubah JWT tanpa mengetahui secret key.",tools:["jwt.io","Python PyJWT","Burp Suite"],steps:["JWT terdiri dari: Header.Payload.Signature","Header berisi \"alg\" (algorithm)","Coba ubah \"alg\" dari \"HS256\" menjadi \"none\"","Ubah \"role\" dari \"user\" menjadi \"admin\"","Hapus signature (atau isi dengan string kosong)","Submit JWT baru"],l:"JWT (JSON Web Token) memiliki vulnerability jika algorithm \"none\" diizinkan. Dengan alg=none, signature tidak diperlukan. Attacker bisa mengubah payload (misal role) tanpa mengetahui secret key. Pencegahan: whitelist algorithm yang diizinkan di server.",dl:null},
  {id:12,t:"File Rahasia",c:"forensics",d:"hard",p:300,f:_0xFL._0c,desc:"Mengekstrak data dari file binary.",tools:["binwalk","strings","hexdump","file"],steps:["Cek tipe file: file secret.bin","Hex dump awal: 1f8b0800 → file gzip","Gunakan binwalk untuk cari embedded files","Extract dengan binwalk -e","Atau gunakan strings untuk cari flag langsung"],l:"File binary sering menyimpan data tersembunyi. Magic bytes (4 byte pertama) menentukan tipe file: 1f8b0800=gzip, 89504e47=PNG, 4d5a=EXE. Tools: binwalk (cari embedded files), strings (cari teks), hexdump (analisis manual). File bisa di-embed di dalam file lain.",dl:"File Rahasia"},
  {id:13,t:"Kripto RSA Pemula",c:"crypto",d:"hard",p:300,f:_0xFL._0d,desc:"Mendekripsi RSA dengan modulus kecil.",tools:["Python","RsaCtfTool","factordb.com"],steps:["RSA: c = m^e mod n","Untuk dekripsi, butuh d = e^-1 mod phi(n)","phi(n) = (p-1)(q-1) dimana n = p*q","Faktorkan n = 3233 → 53 * 61","Hitung phi(n) = 52 * 60 = 3120","Hitung d = 17^-1 mod 3120 = 2753","Hitung m = 2790^2753 mod 3233"],l:"RSA mengandalkan kesulitan memfaktorkan bilangan besar. Jika n kecil, bisa di-faktorkan brute force. Setelah tahu p dan q, bisa hitung private key d. Tools: factordb.com (database faktor), RsaCtfTool (automasi). Pencegahan: gunakan n minimal 2048 bit.",dl:null},
  {id:14,t:"SQL Injection Blind",c:"web",d:"hard",p:350,f:_0xFL._0e,desc:"Mengekstrak data tanpa output langsung.",tools:["sqlmap","Burp Suite","Python"],steps:["Blind SQLi = tidak ada output langsung","Tapi bisa lihat perbedaan response (true/false)","Teknik: Boolean-based blind","Jika condition true → response normal","Jika condition false → response beda (error/empty)","Gunakan untuk menebak data karakter per karakter"],l:"Blind SQL Injection mengekstrak data tanpa output langsung. Teknik: 1) Boolean-based (perbedaan response), 2) Time-based (delay jika true), 3) Error-based (pesan error). Data ditebak karakter per karakter dengan membandingkan response. Tools: sqlmap (automasi), Burp Intruder.",dl:"SQL Injection Blind"}
];

const _0xFN: Record<string,string> = {
  "Pesawat Kertas":"pesawat_kertas.txt",
  "Jejak Digital":"suspect_photo.png",
  "XOR Rahasia":"xor_encrypted.txt",
  "Pesan dalam Botol":"caesar_cipher.txt",
  "Mesin Waktu":"time_machine.pyc",
  "File Rahasia":"secret.bin",
  "SQL Injection Blind":"blind_sqli_simulator.html"
};

const _0xGR = atob("aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1N5YXB0aXlhbi9hZGVwdXRyYS1jdGYvbWFzdGVyL2NoYWxsZW5nZS1maWxlcy8=");

export default function Walkthrough() {
  const [sC, setSC] = useState("all");
  const [eI, setEI] = useState<number|null>(null);
  const cs = ["all","web","crypto","forensics","osint","reverse","misc"];
  const fl = sC === "all" ? _0xWL : _0xWL.filter(w => w.c === sC);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Walkthrough</h1>
        <p className="text-gray-400 text-lg">Panduan lengkap cara menyelesaikan setiap tantangan</p>
      </div>
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {cs.map(c => (
          <button key={c} onClick={() => setSC(c)} className={`px-4 py-2 rounded-lg font-medium transition-colors ${sC===c?"bg-orange-500 text-white":"bg-gray-800 text-gray-400 hover:text-white"}`}>
            {c==="all"?"Semua":c.charAt(0).toUpperCase()+c.slice(1)}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {fl.map((item) => (
          <div key={item.id} className="card">
            <button onClick={() => setEI(eI===item.id?null:item.id)} className="w-full text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-orange-500">#{item.id}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{item.t}</h3>
                    <div className="flex gap-2 mt-1">
                      <span className="category-badge">{item.c}</span>
                      <span className={`badge-${item.d}`}>{item.d}</span>
                      <span className="text-orange-400 text-sm">{item.p} pts</span>
                    </div>
                  </div>
                </div>
                <svg className={`w-5 h-5 text-gray-400 transition-transform ${eI===item.id?"rotate-180":""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </div>
            </button>
            {eI===item.id && (
              <div className="mt-6 space-y-6 border-t border-gray-800 pt-6">
                <div><h4 className="text-sm font-semibold text-gray-400 mb-2">DESKRIPSI</h4><p className="text-gray-300">{item.desc}</p></div>
                <div><h4 className="text-sm font-semibold text-gray-400 mb-2">FLAG</h4><code className="bg-gray-800 text-green-400 px-4 py-2 rounded block">{item.f}</code></div>
                <div><h4 className="text-sm font-semibold text-gray-400 mb-2">LOGIKA</h4><p className="text-gray-300 bg-gray-800/50 p-4 rounded-lg">{item.l}</p></div>
                {item.tools.length>0&&<div><h4 className="text-sm font-semibold text-gray-400 mb-2">TOOLS</h4><div className="flex flex-wrap gap-2">{item.tools.map((t,i)=><span key={i} className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded text-sm">{t}</span>)}</div></div>}
                {item.dl&&_0xFN[item.dl]&&<div><h4 className="text-sm font-semibold text-gray-400 mb-2">FILE</h4><a href={_0xGR+_0xFN[item.dl]} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded-lg transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>Download {_0xFN[item.dl]}</a></div>}
                <div><h4 className="text-sm font-semibold text-gray-400 mb-2">LANGKAH</h4><ol className="space-y-2">{item.steps.map((s,i)=><li key={i} className="flex gap-3 text-gray-300"><span className="text-orange-500 font-bold">{i+1}.</span>{s}</li>)}</ol></div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-12"><Link href="/challenges" className="text-orange-500 hover:text-orange-400">← Kembali ke Tantangan</Link></div>
    </div>
  );
}
