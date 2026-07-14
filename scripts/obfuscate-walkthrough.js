const fs = require('fs');
const path = require('path');

// Read source file
const sourcePath = path.join(__dirname, '../src/data/walkthrough-source.ts');
const source = fs.readFileSync(sourcePath, 'utf-8');

// Extract walkthroughs array using eval (safe since it's our own code)
const match = source.match(/export const walkthroughs: WalkthroughItem\[\] = (\[[\s\S]*?\n\])/);
if (!match) {
  console.error('Could not find walkthroughs array');
  process.exit(1);
}

// Simple eval for the data
const walkthroughs = eval(match[1]);

// Generate obfuscated page
const obfuscated = generateObfuscatedPage(walkthroughs);

// Write to walkthrough/page.tsx
const outputPath = path.join(__dirname, '../src/app/walkthrough/page.tsx');
fs.writeFileSync(outputPath, obfuscated);

console.log('✓ Generated obfuscated walkthrough page');
console.log(`  Source: ${sourcePath}`);
console.log(`  Output: ${outputPath}`);

function generateObfuscatedPage(data) {
  const flags = data.map(w => w.flag);
  
  // Generate flag decoder functions with different methods
  const flagDecoders = flags.map((flag, i) => {
    const charCodes = Array.from(flag).map(c => c.charCodeAt(0));
    const methods = [
      // Method 1: String.fromCharCode
      () => `[${charCodes.join(',')}].map((c:number)=>String.fromCharCode(c)).join("")`,
      // Method 2: Base64
      () => `atob("${Buffer.from(flag).toString('base64')}")`,
      // Method 3: Split and concat
      () => {
        const mid = Math.floor(flag.length / 3);
        return `"${flag.slice(0, mid)}"+"${flag.slice(mid, 2*mid)}"+"${flag.slice(2*mid)}"`;
      },
      // Method 4: Char code with offset
      () => {
        const offset = 3;
        const shifted = charCodes.map(c => c - offset);
        return `[${shifted.join(',')}].map((c:number)=>String.fromCharCode(c+${offset})).join("")`;
      },
    ];
    return methods[i % methods.length]();
  });

  return `'use client';

import { useState } from 'react';
import Link from 'next/link';

const _0xFL: Record<string, string> = {
${flagDecoders.map((d, i) => `  _${(i+1).toString(16).padStart(2,'0')}: ${d}`).join(',\n')}
};

const _0xWL = [
${data.map((w, i) => `  {id:${w.id},t:"${w.title}",c:"${w.category}",d:"${w.difficulty}",p:${w.points},f:_0xFL._${(i+1).toString(16).padStart(2,'0')},desc:"${w.description.replace(/"/g, '\\"')}",tools:[${w.tools.map(t=>`"${t}"`).join(',')}],steps:[${w.steps.map(s=>`"${s.replace(/"/g, '\\"')}"`).join(',')}],l:"${w.logic.replace(/"/g, '\\"')}",dl:${w.downloadFile ? `"${w.downloadFile}"` : 'null'}}`).join(',\n')}
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
          <button key={c} onClick={() => setSC(c)} className={\`px-4 py-2 rounded-lg font-medium transition-colors \${sC===c?"bg-orange-500 text-white":"bg-gray-800 text-gray-400 hover:text-white"}\`}>
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
                      <span className={\`badge-\${item.d}\`}>{item.d}</span>
                      <span className="text-orange-400 text-sm">{item.p} pts</span>
                    </div>
                  </div>
                </div>
                <svg className={\`w-5 h-5 text-gray-400 transition-transform \${eI===item.id?"rotate-180":""}\`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
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
`;
}
