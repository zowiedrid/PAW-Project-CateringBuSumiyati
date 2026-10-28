# PAW-Project-CateringBuSumiyati 🍲
> **PPAW — WEEK 7: Integrasi Frontend, REST API, dan Middleware Logger**  
> Proyek Berkelanjutan Pengembangan Aplikasi Web (TI-501) · Semester Antara / Ganjil 2026  
> **Teknologi Informasi — Fakultas Teknik, Universitas Muhammadiyah Yogyakarta**

---

## 👥 Tim Pengembang (Kelompok 3 — Kelas A)

| No | Foto / Inisial | Nama Mahasiswa | NIM | Peran Utama | Akun GitHub |
|:--:|:--:|:---|:---:|:---|:---|
| 1 | 👨‍💻 | **Ilham Fadhilah** | `20200140100` | Lead Backend, Arsitektur MVC & Server Express | [@zowiedrid](https://github.com/zowiedrid) |
| 2 | 🗄️ | **Danar Rohman Rozaqi** | `20240140233` | Data Modeling (`models/produkModel.js`) & Schema | [@danarrohman](https://github.com) |
| 3 | 🎨 | **M.Ikhlasul** | `20240140234` | Frontend EJS Templates & Tailwind CSS UI | [@mikhlasul](https://github.com) |
| 4 | 🧪 | **Anandya Arlys F** | `20240140002` | API Testing, Middleware Logger & Dokumentasi | [@anandyaarlys](https://github.com) |
| 5 |  | **M Rendra A** | `20240140212` | Success Metrics, Target User / Persona | [mrendraananditya](https://github.com) |

---

## 📖 Deskripsi Proyek
Proyek ini merupakan fondasi backend dan frontend berkelanjutan untuk **Catering Bu Sumiyati** (studi kasus UMKM kuliner nusantara yang dirancang dari riset jurnal chatbot katering).  
Pada **Week 7**, proyek mengimplementasikan:
1. **Backend Server Express.js** dengan pola arsitektur **Model-View-Controller (MVC)**.
2. **Dynamic Frontend Rendering** menggunakan **EJS Template Engine** dan **Tailwind CSS via CDN**.
3. **REST API Endpoints** (`/api/status` dan `/api/produk`) yang mengembalikan format JSON standar.
4. **Middleware Logger Otomatis** yang mencatat setiap request HTTP (Method, Path, Status Code, Durasi, dan Timestamp) ke terminal konsol dan berkas log Markdown (`logs/logger.md`).

---

## 🧱 Struktur Folder Wajib (Arsitektur MVC)

Struktur proyek disusun rapi sesuai ketentuan modul PPAW Week 7:

```text
PAW-Project-CateringBuSumiyati/
├── config/
│   └── index.js             # Konfigurasi aplikasi, port, environment & data kelompok
├── models/
│   └── produkModel.js       # Mengelola data menu katering dalam array statis & method getter
├── middlewares/
│   └── logger.js            # Middleware logger pencatat method, endpoint, status & waktu
├── controllers/
│   ├── homeController.js    # Mengatur alur pemrosesan halaman frontend EJS
│   └── apiController.js     # Mengatur respon data JSON untuk endpoint REST API
├── routes/
│   ├── index.js             # Router sentral penggabung rute web dan API
│   ├── web.js               # Definisi rute antarmuka pengguna (GET /)
│   └── api.js               # Definisi rute REST API (GET /api/status, /api/produk)
├── views/
│   ├── index.ejs            # Template utama beranda katalog & widget tester API
│   └── partials/
│       ├── head.ejs         # Partial HTML head, font & konfigurasi CDN Tailwind
│       ├── navbar.ejs       # Komponen navigasi atas dengan indikator status
│       └── footer.ejs       # Komponen footer dengan informasi tim dan hak cipta
├── utils/
│   ├── currency.js          # Helper fungsi format mata uang Rupiah standar Indonesia
│   └── responseHelper.js    # Helper standardisasi respon API JSON
├── logs/
│   └── logger.md            # Berkas catatan riwayat request HTTP dalam format tabel Markdown
├── public/                  # Aset statis klien (gambar, icon, css tambahan)
│   └── images/
├── app.js                   # Entry point utama inisialisasi Express & pemasangan middleware
├── package.json             # Metadata proyek, dependencies (express, ejs), dan npm scripts
└── README.md                # Dokumentasi lengkap proyek
```

---

## 🚀 Panduan Menjalankan Proyek

### 1. Prasyarat
- **Node.js**: Versi LTS (v18, v20, atau v24).
- **NPM**: Versi 9 ke atas.

### 2. Instalasi Dependensi
Buka terminal pada folder proyek ini, lalu jalankan:
```bash
npm install
```

### 3. Menjalankan Server Development
Jalankan server dengan nodemon (*auto-reload* saat ada perubahan berkas):
```bash
npm run dev
```
Atau menggunakan mode standar:
```bash
npm start
```

### 4. Mengakses Aplikasi
Buka peramban (*browser*) dan akses URL berikut:
- 🌐 **Halaman Utama Frontend:** [http://localhost:3000](http://localhost:3000)
- 📊 **Endpoint Status Server:** [http://localhost:3000/api/status](http://localhost:3000/api/status)
- 🍱 **Endpoint Data Produk:** [http://localhost:3000/api/produk](http://localhost:3000/api/produk)

---

## 📡 Dokumentasi Endpoint REST API

### 1. `GET /api/status`
Mengirimkan informasi kesehatan (*health check*), status operasional aplikasi, waktu server, dan data kelompok pengembang.

* **Response Header:** `Content-Type: application/json; charset=utf-8`
* **Status Code:** `200 OK`
* **Contoh Response JSON:**
```json
{
  "status": "online",
  "aplikasi": "Catering Bu Sumiyati",
  "tagline": "Cita Rasa Nusantara Autentik, Higienis & Terpercaya",
  "versi": "1.0.0",
  "uptimeDetik": 154,
  "waktuServer": "2026-10-28T03:30:15.120Z",
  "lingkungan": "development",
  "kelompok": {
    "nama": "Kelompok 3",
    "kelas": "Kelas A",
    "mataKuliah": "TI-501 Pengembangan Aplikasi Web (PPAW)",
    "anggota": [
      "Ilham Fadhilah (20200140100)",
      "Danar Rohman Rozaqi (20240140233)",
      "M.Ikhlasul (20240140234)",
      "Anandya Arlys F (20240140002)"
    ]
  },
  "sistem": {
    "nodeVersion": "v24.21.0",
    "platform": "darwin",
    "memoryUsageMB": "14.28"
  }
}
```

---

### 2. `GET /api/produk`
Mengirimkan seluruh koleksi menu katering UMKM dalam bentuk **array JSON** murni.

* **Response Header:** `Content-Type: application/json; charset=utf-8`
* **Status Code:** `200 OK`
* **Contoh Response JSON:**
```json
[
  {
    "id": 1,
    "nama": "Paket Nasi Box Ayam Bakar Madu",
    "kategori": "Nasi Box",
    "deskripsi": "Ayam bakar rempah madu legit khas Solo, nasi putih pulen, tahu tempe bacem, lalapan segar, sambal bajak, dan buah pisang.",
    "harga": 28000,
    "stok": 150,
    "rating": 4.9,
    "terjual": 1250,
    "keunggulan": "Menu favorit acara kantor dan gathering kampus, rasa manis gurih meresap."
  },
  {
    "id": 2,
    "nama": "Paket Nasi Kotak Rendang Daging Sapi",
    "kategori": "Nasi Box",
    "deskripsi": "Daging sapi pilihan dimasak rendang autentik Minang 6 jam, gulai kapau nangka muda, sambal ijo, telur balado, dan kerupuk udang.",
    "harga": 38000,
    "stok": 85,
    "rating": 5.0,
    "terjual": 890,
    "keunggulan": "Daging sangat empuk, bumbu rempah kaya rempah premium nusantara."
  }
]
```

---

## 🧩 Middleware Request Logger

Middleware [middlewares/logger.js](file:///Users/macbookpro/Documents/sem13/paw/PAW-Project-CateringBuSumiyati/middlewares/logger.js) secara otomatis memotong (*intercept*) setiap transaksi HTTP dan mencatat informasi berikut:
1. **Metode HTTP:** `GET`, `POST`, dll.
2. **Endpoint URL:** Alur URI yang diminta oleh klien (`/`, `/api/status`, `/api/produk`).
3. **Status Response HTTP:** Menggunakan listener `res.on('finish')` untuk menangkap kode status akhir (`200`, `404`, `500`).
4. **Timestamp Waktu:** Format jam lokal `[HH.MM.SS]` untuk terminal dan ISO 8601 untuk berkas log.
5. **Durasi Eksekusi:** Dihitung dalam satuan milidetik (`ms`).

### Tampilan Log pada Terminal:
```text
[10.38.12] GET / -> 200 (12.45 ms) - IP: 127.0.0.1
[10.38.15] GET /api/status -> 200 (1.82 ms) - IP: 127.0.0.1
[10.38.18] GET /api/produk -> 200 (2.10 ms) - IP: 127.0.0.1
[10.38.25] GET /api/tidak-ada -> 404 (0.95 ms) - IP: 127.0.0.1
```

### Rekaman Berkas Markdown (`logs/logger.md`):
| Timestamp (ISO) | Method | Endpoint URL | Status | Durasi | Client IP |
|---|:---:|---|:---:|:---:|---|
| 2026-10-28T03:38:12.451Z | `GET` | `/` | **200** | 12.45 ms | 127.0.0.1 |
| 2026-10-28T03:38:15.120Z | `GET` | `/api/status` | **200** | 1.82 ms | 127.0.0.1 |
| 2026-10-28T03:38:18.340Z | `GET` | `/api/produk` | **200** | 2.10 ms | 127.0.0.1 |

---

## ✅ Checklist Pemenuhan Tugas Week 7

- [x] **Halaman Frontend**: Dapat diakses di `http://localhost:3000` dengan desain modern Tailwind CSS dan dinamis EJS.
- [x] **Endpoint `GET /api/status`**: Mengirimkan status aplikasi, uptime, dan data tim pengembang dalam format JSON valid.
- [x] **Endpoint `GET /api/produk`**: Mengirimkan koleksi menu catering dalam bentuk array JSON.
- [x] **Middleware Logger**: Mencatat method, URL, status code, durasi, dan waktu ke konsol terminal serta `logs/logger.md`.
- [x] **Struktur Folder Wajib (MVC)**: Seluruh folder (`config/`, `models/`, `middlewares/`, `controllers/`, `routes/`, `views/`, `utils/`, `app.js`) telah diimplementasikan sesuai tanggung jawabnya.
- [x] **Ketentuan Commit**: Format commit jelas (`Week7(feat): add status and product API endpoints with MVC and EJS`).
- [x] **Proyek Berkelanjutan**: Disiapkan untuk pengembangan tahapan database dan autentikasi berikutnya.

---
*Dikembangkan oleh Kelompok 3 Kelas A — Program Studi Teknologi Informasi, Universitas Muhammadiyah Yogyakarta.*
