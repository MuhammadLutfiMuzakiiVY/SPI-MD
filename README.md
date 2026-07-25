<div align="center">

  <!-- HERO BANNER / IMAGE -->
  <img src="https://raw.githubusercontent.com/MuhammadLutfiMuzakiiVY/SYSTEM-SERVICE-SPI/main/assets/images/spi2.jpg" alt="SYSTEM SERVICE SPI Banner" width="100%" style="border-radius: 12px; margin-bottom: 15px;" />

  <br />

  <!-- DYNAMIC TYPING SVG -->
  <a href="https://github.com/MuhammadLutfiMuzakiiVY/SYSTEM-SERVICE-SPI">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=24&duration=2000&pause=500&color=00F5FF&center=true&vCenter=true&repeat=true&width=850&height=50&lines=%E2%9A%A1+SYSTEM+SERVICE+SPI+v2.4.0;%F0%9F%A4%96+NEXT-GEN+MULTIDEVICE+WHATSAPP+BOT+ENGINE;%F0%9F%A7%A0+HYBRID+AI+INTEGRATION+(OPENROUTER+%2B+SMART+ASSISTANTS);%F0%9F%9B%A1%EF%B8%8F+ENTERPRISE-GRADE+SECURITY+%26+PLUGIN+ARCHITECTURE" alt="Typing Header" />
  </a>

  <p align="center">
    <strong>Arsitektur Bot WhatsApp Multi-Device Generasi Terbaru Berbasis Node.js (ESM), Sistem Plugin Modular, Integrasi Multi-AI, dan Ekosistem RPG/Store Digital.</strong>
  </p>

  <!-- SHIELDS BADGES WALL -->
  <p align="center">
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-v22.x%20LTS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" /></a>
    <a href="https://github.com/MuhammadLutfiMuzakiiVY/SYSTEM-SERVICE-SPI"><img src="https://img.shields.io/badge/Engine-Baileys%20MD-007ACC?style=for-the-badge&logo=whatsapp&logoColor=white" alt="Baileys" /></a>
    <a href="https://github.com/MuhammadLutfiMuzakiiVY/SYSTEM-SERVICE-SPI"><img src="https://img.shields.io/badge/Version-v2.4.0-FF007F?style=for-the-badge&logo=git&logoColor=white" alt="Version" /></a>
    <a href="https://docker.com"><img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-purple?style=for-the-badge&logo=open-source-initiative&logoColor=white" alt="License" /></a>
  </p>

  <p align="center">
    <a href="#-fitur-utama--arsitektur-sistem">⚡ Fitur Utama</a> •
    <a href="#-diagram-arsitektur">📐 Arsitektur</a> •
    <a href="#-panduan-instalasi">🚀 Instalasi</a> •
    <a href="#-konfigurasi-configjs">⚙️ Konfigurasi</a> •
    <a href="#-pengembangan-plugin">🧩 Developer Guide</a> •
    <a href="#-kontributor--kredits">👤 Pengembang</a>
  </p>

</div>

---

## 📖 Ringkasan Proyek

**SYSTEM SERVICE SPI (v2.4.0)** adalah platform dan engine otomatisasi WhatsApp Multi-Device yang dibangun menggunakan **Node.js (EcmaScript Module / ESM)** dan pustaka WhatsApp socket teroptimasi. Didesain untuk keandalan tinggi, performa cepat, serta skalabilitas tinggi baik untuk penggunaan pribadi, komunitas grup, maupun kebutuhan bisnis komersial.

> [!TIP]
> **SPI Engine** menggunakan arsitektur **Modular Plugin-based Event Dispatcher**, memudahkan penambahan fitur baru tanpa perlu mengubah struktur kode inti (core runtime).

---

## 📐 Diagram Arsitektur

Berikut adalah gambaran aliran eksekusi pesan dan pemrosesan event pada **SYSTEM SERVICE SPI**:

```mermaid
flowchart TD
    A["📱 WhatsApp Web / App"] <-->|"Baileys WebSocket Connection"| B["🔌 SPI Core Socket Gateway"]
    B --> C["🛡️ Middleware & Protection Layer"]
    C -->|"Cek Anti-Spam / Anti-Link / Banned"| D["🧩 Plugin Event Router"]
    
    D -->|"Match Prefix & Command"| E1["🧠 AI Processing Engine<br/>(OpenRouter & Smart AI)"]
    D -->|"Match Prefix & Command"| E2["🎮 RPG & Economy System<br/>(Coins, XP, Energy, Level)"]
    D -->|"Match Prefix & Command"| E3["🛒 E-Commerce & Store Engine<br/>(Order, Stok, Pakasir OTP)"]
    D -->|"Match Prefix & Command"| E4["🖼️ Media & Canvas Generator<br/>(FFmpeg / Skia-Canvas)"]

    E1 --> F[("💾 Local JSON Database / Storage")]
    E2 --> F
    E3 --> F
    E4 --> F

    F --> G["💬 Responsive Message Dispatcher"]
    G -->|"Send Text / Media / Buttons"| A
```

---

## ⚡ Fitur Utama & Kapabilitas Sistem

| Kategori | Fitur & Deskripsi |
| :--- | :--- |
| **🧠 Multi-AI Integration** | Terhubung langsung dengan OpenRouter AI (Llama 3.3, DeepSeek, Qwen) dan Smart Vision Assistants. |
| **🧩 Modular Plugin System** | Setiap perintah dipisahkan ke dalam folder `plugins/` (ESM format). Mendukung *hot-reloading* tanpa perlu merestart bot. |
| **🤖 Manager JadiBot (Multi-Session)** | Memungkinkan bot utama membuat bot turunan (*clone bot*) baru melalui sistem pairing code mandiri. |
| **🛡️ Keamanan & Anti-Spam Group** | Fitur Anti-Link, Anti-Toxic, Anti-Foreign Number, Anti-Bot, Anti-Delete, serta manajemen peran Admin & Owner otomatis. |
| **🎮 RPG & Economy Engine** | Ekosistem game interaktif: Leveling system, Koin, Energi, Klaim Harian, Kuis, Tebak Gambar, Ular Tangga, dan Sistem Bank. |
| **🛒 Otomatisasi Store & TopUp** | Manajemen produk digital, auto-payment gateway (Pakasir), transaksi otomatis, stok barang, serta riwayat transaksi. |
| **🎨 Advanced Media & Canvas** | Pembuat stiker bergerak (GIF/Video via FFmpeg), Brat Canvas generator, Logo Maker, Card Welcome/Goodbye, dan OCR. |
| **☁️ Multi-Platform Deployment** | Kompatibel penuh dengan Linux VPS, Docker Container, Termux Android, dan Panel Pterodactyl. |

---

## ⚙️ Persyaratan Sistem

| Komponen | Spesifikasi Minimal | Rekomendasi |
| :--- | :--- | :--- |
| **Node.js Runtime** | `v22.0.0` | `v24.x LTS` (EcmaScript Module Support) |
| **NPM Package Manager** | `v10.0.0+` | `v10.x+` |
| **Media Converter** | FFmpeg 4.x / 5.x | FFmpeg 6.x (Terpasang pada System PATH) |
| **Memori (RAM)** | 512 MB RAM | 1 GB - 2 GB RAM |
| **Sistem Operasi** | Ubuntu 20.04+ / Debian 11+ / Windows 10+ / Android Termux | Ubuntu 22.04 LTS Server / Docker Container |

---

## 🚀 Panduan Instalasi

### 1. Cloning Repositori
Buka terminal pada komputer atau server Anda dan jalankan perintah berikut:

```bash
git clone https://github.com/MuhammadLutfiMuzakiiVY/SYSTEM-SERVICE-SPI.git
cd SYSTEM-SERVICE-SPI
```

---

### 2. Instalasi Dependensi Node.js
Pasang pustaka modul yang dibutuhkan:

```bash
npm install
```

---

### 3. Pengaturan Konfigurasi (`config.js`)
Edit file `config.js` untuk mengonfigurasi nomor WhatsApp Anda sebagai owner dan bot pairing:

```javascript
    owner: {
        name: 'Muhammad Lutfi Muzaki',   // Nama Pemilik Bot
        number: ['6282362181059']        // Nomor Owner (Format 628xxx)
    },
    session: {
        pairingNumber: '6282362181059',  // Nomor WhatsApp Bot
        usePairingCode: true             // true = Gunakan Kode Pairing
    },
    bot: {
        name: '𝗦𝗜 𝗣𝗔𝗟𝗜𝗡𝗚 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗦𝗜 (𝗦𝗣𝗜)',
        version: '2.4.0',
        developer: 'Muhammad Lutfi Muzaki'
    }
```

---

### 4. Menjalankan Server Engine SPI
Jalankan perintah berikut untuk mengaktifkan bot:

```bash
# Modus Produksi
npm start

# Modus Pengembangan (Auto-Restart via Nodemon)
npm run dev
```

Saat pertama kali berjalan, sistem akan memberikan **Kode Pairing 8 Digit** di terminal. Masukkan kode tersebut pada aplikasi WhatsApp Anda:
> `WhatsApp -> Perangkat Tertaut -> Tautkan dengan Nomor Telepon`

---

### 🐳 Deploy Menggunakan Docker (Opsional)

Untuk kemudahan deployment di VPS server tanpa menginstall Node.js secara manual:

```bash
# Build Docker Image
docker build -t system-service-spi .

# Jalankan Container
docker run -d --name spi-bot-instance --restart always system-service-spi
```

---

### 🐧 Deploy di Android Termux (Opsional)

Untuk pengguna Android yang menjalankan bot lewat Termux:

```bash
pkg update && pkg upgrade -y
pkg install git nodejs-lts ffmpeg -y
git clone https://github.com/MuhammadLutfiMuzakiiVY/SYSTEM-SERVICE-SPI.git
cd SYSTEM-SERVICE-SPI
bash install.sh
npm start
```

---

## 🧩 Panduan Pengembangan Plugin (Developer Guide)

Setiap fitur pada **SYSTEM SERVICE SPI** menggunakan arsitektur Plugin ESM. Anda dapat membuat file baru di dalam folder `plugins/` dengan struktur seperti berikut:

```javascript
// Contoh: plugins/example/halo.js

const pluginConfig = {
    name: 'halo',
    alias: ['hi', 'hello'],
    category: 'general',
    description: 'Menyapa pengguna secara ramah',
    usage: '.halo',
    example: '.halo',
    isOwner: false,
    isGroup: false,
    cooldown: 5,
    energi: 1
}

async function handler(m, { sock }) {
    await m.reply(`Halo *${m.pushName}*! 👋 Selamat datang di SYSTEM SERVICE SPI.`)
}

export { handler, pluginConfig }
```

---

## 📂 Struktur Direktori Proyek

```
SYSTEM-SERVICE-SPI/
├── assets/                  # Aset gambar, video, dan media bot
│   ├── images/              # Gambar banner, profile, dan thumbnail (spi.jpg, spi2.jpg)
│   └── video/               # Media video pendukung (spi.mp4)
├── database/                # Penyimpanan JSON lokal & statistik
├── plugins/                 # Folder Plugin Modular
│   ├── ai/                  # Plugin Integrasi AI (Gemini, Groq, OpenRouter)
│   ├── download/            # Plugin Downloader (TikTok, YouTube, IG, Spotify)
│   ├── fun/                 # Plugin Hiburan & Game
│   ├── group/               # Plugin Moderasi & Keamanan Grup
│   ├── main/                # Plugin Utama (Menu, Help, Info)
│   ├── owner/               # Plugin Khusus Owner Bot
│   ├── store/               # Plugin E-Commerce & Otomatisasi Produk
│   └── tools/               # Plugin Utility & Converter
├── src/                     # Core Library Engine SPI
│   ├── lib/                 # Core Helper System (spi-socket.js, spi-database.js, dll)
│   ├── scraper/             # Web Scrapers & API Integrations
│   ├── connection.js        # Konfigurasi Koneksi WebSocket
│   └── handler.js           # Event Handler & Dispatcher Utama
├── config.js                # File Konfigurasi Utama Bot
├── Dockerfile               # Konfigurasi Container Docker
├── index.js                 # Entry Point Aplikasi
├── package.json             # Manifest Dependensi & Scripts
└── README.md                # Dokumentasi Resmi Proyek
```

---

## 🤝 Kontribusi & Lisensi

Proyek ini bersifat **Open Source** di bawah lisensi [MIT License](LICENSE).

Jika Anda ingin berpatisipasi mengembangkan fitur atau memperbaiki kendala (bug):
1. **Fork** repositori ini.
2. Buat branch fitur baru (`git checkout -b fitur-baru`).
3. Lakukan **Commit** perubahan Anda (`git commit -m "Tambah fitur X"`).
4. Kirim **Pull Request (PR)**.

---

<div align="center">

  <img src="https://raw.githubusercontent.com/MuhammadLutfiMuzakiiVY/SYSTEM-SERVICE-SPI/main/assets/images/spi.jpg" alt="SPI Profile Footer" width="120" style="border-radius: 50%; margin-bottom: 10px;" />

  <h3>👨‍💻 Developed & Maintained by</h3>
  <p><strong><a href="https://github.com/MuhammadLutfiMuzakiiVY">Muhammad Lutfi Muzaki</a></strong></p>

  <p>
    <a href="https://github.com/MuhammadLutfiMuzakiiVY"><img src="https://img.shields.io/badge/GitHub-MuhammadLutfiMuzakiiVY-181717?style=flat-square&logo=github" alt="GitHub" /></a>
    <a href="mailto:muhammadlutfimuzaki2@gmail.com"><img src="https://img.shields.io/badge/Email-Contact-D14836?style=flat-square&logo=gmail&logoColor=white" alt="Email" /></a>
    <a href="https://linkedin.com/in/muhammad-lutfi-muzaki-a55373263"><img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin" alt="LinkedIn" /></a>
  </p>

  <p><i>⭐ Jangan lupa memberikan Star pada repositori ini jika bermanfaat!</i></p>

</div>
