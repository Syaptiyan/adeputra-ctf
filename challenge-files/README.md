# APCTF Challenge Files

File-file yang dibutuhkan untuk menyelesaikan tantangan di APCTF.

## Download Links

| Challenge | File | Link |
|-----------|------|------|
| Pesawat Kertas | pesawat_kertas.txt | [Download](https://raw.githubusercontent.com/Syaptiyan/adeputra-ctf/master/challenge-files/pesawat_kertas.txt) |
| Jejak Digital | suspect_photo.png | [Download](https://raw.githubusercontent.com/Syaptiyan/adeputra-ctf/master/challenge-files/suspect_photo.png) |
| XOR Rahasia | xor_encrypted.txt | [Download](https://raw.githubusercontent.com/Syaptiyan/adeputra-ctf/master/challenge-files/xor_encrypted.txt) |
| Pesan dalam Botol | caesar_cipher.txt | [Download](https://raw.githubusercontent.com/Syaptiyan/adeputra-ctf/master/challenge-files/caesar_cipher.txt) |
| Mesin Waktu | time_machine.pyc | [Download](https://raw.githubusercontent.com/Syaptiyan/adeputra-ctf/master/challenge-files/time_machine.pyc) |
| File Rahasia | secret.bin | [Download](https://raw.githubusercontent.com/Syaptiyan/adeputra-ctf/master/challenge-files/secret.bin) |
| SQL Injection Blind | blind_sqli_simulator.html | [Download](https://raw.githubusercontent.com/Syaptiyan/adeputra-ctf/master/challenge-files/blind_sqli_simulator.html) |

## Cara Menggunakan

### Pesawat Kertas
```bash
# Buka file, convert ASCII ke Text
cat pesawat_kertas.txt
# Atau gunakan Python
python3 -c "print(''.join(chr(int(x)) for x in '72 101 108 108 111 32 87 111 114 108 100 33'.split()))"
```

### Jejak Digital
```bash
# Install exiftool
sudo apt install exiftool

# Cek metadata
exiftool suspect_photo.png

# Atau gunakan website
# https://jimpl.com
```

### XOR Rahasia
```bash
# Buka file
cat xor_encrypted.txt

# Brute force dengan Python
python3 -c "
encrypted = bytes.fromhex('19081b0c1e2320682a072a6c306c2b696c076c3f6b3625')
for key in range(32, 127):
    decrypted = bytes([b ^ key for b in encrypted])
    try:
        print(f'Key {key} ({chr(key)}): {decrypted.decode()}')
    except: pass
"
```

### Pesan dalam Botol
```bash
# Buka file
cat caesar_cipher.txt

# Decode ROT13
python3 -c "
import codecs
print(codecs.decode('Fbzrbar yvxr n oyvaq crefba frrf', 'rot_13'))
"
```

### Mesin Waktu
```bash
# Install uncompyle6
pip install uncompyle6

# Decompile
uncompyle6 time_machine.pyc

# Atau gunakan Python dis module
python3 -c "
import dis, marshal
with open('time_machine.pyc', 'rb') as f:
    f.read(16)
    code = marshal.load(f)
    print('Constants:', code.co_consts)
"
```

### File Rahasia
```bash
# Cek tipe file
file secret.bin

# Extract dengan gunzip
mv secret.bin secret.gz
gunzip secret.gz
cat secret

# Atau gunakan binwalk
binwalk -e secret.bin
```

### SQL Injection Blind
```bash
# Buka di browser
# File: blind_sqli_simulator.html

# Simulasi SQLi:
# 1. Buka file di browser
# 2. Coba ubah URL: ?id=1 AND 1=1 (harusnya normal)
# 3. Coba: ?id=1 AND 1=2 (harusnya beda)
# 4. Coba: ?id=1 UNION SELECT password FROM users (akan muncul flag)
```

## Tools yang Dibutuhkan

| Tool | Fungsi | Install |
|------|--------|---------|
| exiftool | Metadata extraction | `sudo apt install exiftool` |
| Python 3 | Programming | Sudah ada |
| uncompyle6 | Python decompiler | `pip install uncompyle6` |
| binwalk | Binary analysis | `sudo apt install binwalk` |
| strings | Extract text from binary | `sudo apt install binutils` |
| Browser | Web inspector | - |
