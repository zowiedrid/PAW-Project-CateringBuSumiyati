# PAW-Project-CateringBuSumiyati 🍲
> **PPAW — WEEK 8: Integrasi Database dan Implementasi CRUD (Proyek Berkelanjutan)**  
> Proyek Berkelanjutan Pengembangan Aplikasi Web (TI-501) · Semester Antara / Ganjil 2026  
> **Teknologi Informasi — Fakultas Teknik, Universitas Muhammadiyah Yogyakarta**

---

## 👥 Tim Pengembang (Kelompok 3 — Kelas A)

| No | Foto / Inisial | Nama Mahasiswa | NIM | Peran Utama | Akun GitHub |
|:--:|:--:|:---|:---:|:---|:---|
| 1 | 👨‍💻 | **Ilham Fadhilah** | `20200140100` | Lead Backend, REST API CRUD, Sequelize Model & Controller | [@zowiedrid](https://github.com/zowiedrid) |
| 2 | 🗄️ | **Danar Rohman Rozaqi** | `20240140233` | Database PostgreSQL Schema, Migration & Seeder | [@danarrohman](https://github.com) |
| 3 | 🎨 | **M.Ikhlasul** | `20240140234` | Frontend EJS UI, Interactive CRUD Modals (Create/Edit/Delete) | [@mikhlasul](https://github.com) |
| 4 | 🧪 | **Anandya Arlys F** | `20240140002` | API Testing, Request Logger, Terminal Tester & Dokumentasi | [@anandyaarlys](https://github.com) |

---

## 📖 Deskripsi Proyek Week 8
Proyek ini merupakan kelanjutan dari **Week 7** untuk **Catering Bu Sumiyati** (studi kasus UMKM kuliner nusantara).  
Pada **Week 8 (Integrasi Database & Implementasi CRUD)**, proyek berevolusi dari penyimpanan data statis/array menjadi **sistem terintegrasi penuh dengan Database Relasional PostgreSQL** menggunakan ORM **Sequelize**:

1. **Integrasi Database Nyata (PostgreSQL & Sequelize)**:
   - Data produk tidak lagi menggunakan array statis, melainkan disimpan dan diambil langsung dari database relasional PostgreSQL (`catering_db`).
   - Koneksi dikelola secara aman via variabel lingkungan (`.env` dan `.env.example`).
   - Menyediakan skrip seeder (`npm run seed`) untuk mengisi data awal katalog produk.
2. **Implementasi Lengkap REST API CRUD (5 Endpoint Utama + 1 Status)**:
   - `GET /api/status` : Menampilkan kesehatan server, status koneksi database nyata, dan data tim.
   - `GET /api/produk` : Mengambil seluruh data produk dari database (dengan filter kategori & search query).
   - `GET /api/produk/:id` : Mengambil rincian 1 data produk berdasarkan primary key ID.
   - `POST /api/produk` : Menambahkan data produk baru ke tabel database PostgreSQL (validasi input + HTTP 201 Created).
   - `PUT /api/produk/:id` : Memperbarui data produk yang ada di database (HTTP 200 OK / HTTP 404 Not Found).
   - `DELETE /api/produk/:id` : Menghapus data produk dari database secara permanen (HTTP 200 OK / HTTP 404 Not Found).
3. **Pengembangan Antarmuka Frontend Interaktif**:
   - Menampilkan katalog dinamis dari database PostgreSQL dengan kartu menu informatif.
   - **Modal Tambah Produk**: Input interaktif dengan validasi langsung ke API `POST /api/produk`.
   - **Modal Edit Produk**: Autofill data produk yang dipilih, dapat memperbarui nama, kategori, harga, stok, deskripsi langsung ke API `PUT /api/produk/:id`.
   - **Modal Hapus Produk**: Konfirmasi aksi hapus yang aman langsung ke API `DELETE /api/produk/:id`.
   - **Live Terminal Tester & Toast Notifications**: Memungkinkan pengujian 6 skenario API secara langsung dari antarmuka web dengan output JSON terformat rapi dan notifikasi visual status operasi.
4. **Middleware Logger Berkelanjutan**:
   - Tetap aktif mencatat setiap transaksi HTTP (Method, URL, Status HTTP, Response Time, Timestamp, dan Client IP) ke konsol terminal serta berkas `logs/logger.md`.

---

## 🧱 Struktur Folder Wajib (Arsitektur MVC)

Struktur proyek disusun rapi mematuhi pola Model-View-Controller (MVC) standar modul PPAW:

```text
PAW-Project-CateringBuSumiyati/
├── config/
│   ├── index.js             # Konfigurasi aplikasi, port, environment & data kelompok
│   └── database.js          # Inisialisasi Sequelize ORM & koneksi pool PostgreSQL
├── models/
│   ├── index.js             # Sentral ekspor instance Sequelize dan model
│   └── produkModel.js       # Definisi model Sequelize Product & wrapper facade query
├── middlewares/
│   └── logger.js            # Middleware logger pencatat method, endpoint, status, durasi & waktu
├── controllers/
│   ├── homeController.js    # Mengatur query database untuk rendering halaman frontend EJS
│   └── apiController.js     # Logika pemrosesan request-response JSON untuk REST API CRUD
├── routes/
│   ├── index.js             # Router sentral penggabung rute web dan API
│   ├── web.js               # Definisi rute antarmuka pengguna (GET /, form actions)
│   └── api.js               # Definisi rute REST API CRUD lengkap (/api/status, /api/produk)
├── seeders/
│   └── seed.js              # Script inisialisasi tabel dan 6 data awal menu katering
├── views/
│   ├── index.ejs            # Antarmuka utama: hero, statistik, katalog CRUD, modal & live tester
│   └── partials/
│       ├── head.ejs         # Partial HTML head, font Inter & konfigurasi CDN Tailwind
│       ├── navbar.ejs       # Komponen navigasi atas dengan indikator status DB
│       └── footer.ejs       # Komponen footer dengan informasi tim dan hak cipta
├── utils/
│   ├── currency.js          # Helper fungsi format mata uang Rupiah standar Indonesia
│   └── responseHelper.js    # Helper standardisasi respon API JSON
├── logs/
│   └── logger.md            # Berkas catatan riwayat request HTTP dalam format tabel Markdown
├── public/                  # Aset statis klien (gambar, icon, css tambahan)
│   └── images/
├── .env.example             # Template konfigurasi variabel lingkungan database
├── app.js                   # Entry point Express: inisialisasi server, sync DB & middleware
├── package.json             # Metadata proyek, dependencies (sequelize, pg, express, ejs)
└── README.md                # Dokumentasi komprehensif proyek
```

---

## 🚀 Panduan Menjalankan Proyek

### 1. Prasyarat Sistem
- **Node.js**: Versi LTS (v18, v20, atau v24).
- **PostgreSQL Database Server**: Port default `5432` aktif.
- **NPM**: Versi 9 ke atas.

### 2. Konfigurasi Database PostgreSQL
Pastikan database PostgreSQL telah dibuat. Anda dapat membuatnya melalui terminal `psql`:
```sql
CREATE DATABASE catering_db;
```

Salin template berkas lingkungan dan sesuaikan kredensial Anda:
```bash
cp .env.example .env
```
Isi berkas `.env`:
```env
PORT=3000
NODE_ENV=development
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=catering_db
DB_USER=postgres
DB_PASS=postgres
```

### 3. Instalasi Dependensi
Jalankan perintah berikut di direktori proyek:
```bash
npm install
```

### 4. Eksekusi Database Seeder
Isi tabel `products` di database PostgreSQL dengan 6 menu awal katering:
```bash
npm run seed
```

### 5. Menjalankan Server Development
Jalankan server dengan nodemon (*auto-reload*):
```bash
npm run dev
```
Atau menggunakan mode standar:
```bash
npm start
```

### 6. Mengakses Aplikasi
Buka peramban (*browser*) dan akses URL berikut:
- 🌐 **Halaman Utama Frontend (CRUD UI):** [http://localhost:3000](http://localhost:3000)
- 📊 **Endpoint Status & Koneksi Database:** [http://localhost:3000/api/status](http://localhost:3000/api/status)
- 🍱 **Endpoint REST API Produk (JSON):** [http://localhost:3000/api/produk](http://localhost:3000/api/produk)

---

## 📡 Dokumentasi Endpoint REST API CRUD

| Method | Endpoint | Deskripsi | Status Code Berhasil |
|:---:|:---|:---|:---:|
| `GET` | `/api/status` | Mengecek kesehatan server, uptime, dan status koneksi database | `200 OK` |
| `GET` | `/api/produk` | Mengambil seluruh koleksi menu katering dari database | `200 OK` |
| `GET` | `/api/produk/:id` | Mengambil detail 1 produk berdasarkan ID | `200 OK` (atau `404`) |
| `POST` | `/api/produk` | Menambahkan produk baru ke database | `201 Created` (atau `400`) |
| `PUT` | `/api/produk/:id` | Memperbarui atribut produk berdasarkan ID | `200 OK` (atau `404`/`400`) |
| `DELETE` | `/api/produk/:id` | Menghapus produk dari database berdasarkan ID | `200 OK` (atau `404`) |

---

### Contoh Request & Response

#### 1. `GET /api/status`
```json
{
  "status": "online",
  "aplikasi": "Catering Bu Sumiyati",
  "versi": "1.1.0",
  "waktuServer": "2026-11-05T03:02:18.120Z",
  "database": {
    "status": "terhubung",
    "dialect": "postgres",
    "host": "localhost",
    "database": "catering_db",
    "totalTersimpan": 6
  },
  "kelompok": {
    "nama": "Kelompok 3",
    "kelas": "Kelas A",
    "anggota": [
      "Ilham Fadhilah (20200140100)",
      "Danar Rohman Rozaqi (20240140233)",
      "M.Ikhlasul (20240140234)",
      "Anandya Arlys F (20240140002)"
    ]
  }
}
```

#### 2. `POST /api/produk` (Create)
* **Headers:** `Content-Type: application/json`
* **Request Body:**
```json
{
  "nama": "Paket Bento Ayam Teriyaki Spesial",
  "kategori": "Bento Box",
  "deskripsi": "Ayam fillet saus teriyaki gurih manis, nasi wijen jepang, salad mayones, egg roll, dan sup miso.",
  "harga": 32000,
  "stok": 50,
  "keunggulan": "Kemasan sekat rapi anti tumpah, cita rasa ala resto Jepang."
}
```
* **Response (201 Created):**
```json
{
  "success": true,
  "message": "Produk berhasil ditambahkan ke database",
  "data": {
    "id": 7,
    "nama": "Paket Bento Ayam Teriyaki Spesial",
    "kategori": "Bento Box",
    "harga": 32000,
    "stok": 50,
    "rating": 5.0,
    "terjual": 0,
    "createdAt": "2026-11-05T03:02:24.450Z",
    "updatedAt": "2026-11-05T03:02:24.450Z"
  }
}
```

#### 3. `PUT /api/produk/:id` (Update)
* **Request URL:** `PUT /api/produk/7`
* **Request Body:**
```json
{
  "harga": 34000,
  "stok": 60,
  "deskripsi": "Ayam fillet saus teriyaki premium gurih manis disajikan lengkap dengan salad dan gyoza."
}
```
* **Response (200 OK):**
```json
{
  "success": true,
  "message": "Data produk ID 7 berhasil diperbarui di database",
  "data": {
    "id": 7,
    "nama": "Paket Bento Ayam Teriyaki Spesial",
    "harga": 34000,
    "stok": 60,
    "updatedAt": "2026-11-05T03:02:28.112Z"
  }
}
```

#### 4. `DELETE /api/produk/:id` (Delete)
* **Request URL:** `DELETE /api/produk/7`
* **Response (200 OK):**
```json
{
  "success": true,
  "message": "Produk \"Paket Bento Ayam Teriyaki Spesial\" (ID: 7) berhasil dihapus dari database",
  "data": {
    "id": 7,
    "nama": "Paket Bento Ayam Teriyaki Spesial"
  }
}
```

---

## 🧩 Middleware Request Logger

Middleware [middlewares/logger.js](file:///Users/macbookpro/Documents/sem13/paw/PAW-Project-CateringBuSumiyati/middlewares/logger.js) secara konsisten mencatat setiap operasi CRUD:

### Contoh Log Konsol Terminal:
```text
[10.02.18] GET /api/status -> 200 (1.45 ms) - IP: ::1
[10.02.21] GET /api/produk -> 200 (4.20 ms) - IP: ::1
[10.02.24] POST /api/produk -> 201 (18.32 ms) - IP: ::1
[10.02.28] PUT /api/produk/7 -> 200 (12.15 ms) - IP: ::1
[10.02.31] DELETE /api/produk/7 -> 200 (8.90 ms) - IP: ::1
[10.02.38] DELETE /api/produk/7 -> 404 (3.12 ms) - IP: ::1
```

### Rekaman Berkas Markdown (`logs/logger.md`):
Setiap transaksi otomatis dicatat ke tabel Markdown di berkas [logs/logger.md](file:///Users/macbookpro/Documents/sem13/paw/PAW-Project-CateringBuSumiyati/logs/logger.md).

---

## 🖼️ Tangkapan Layar Pengujian (Screenshots)

Berikut adalah bukti tangkapan layar hasil pengujian antarmuka dan endpoint yang disimpan di direktori proyek:
1. `screenshot_week8_home.png`: Tampilan hero, badge database PostgreSQL online, dan ringkasan metrik statistik dinamis.
2. `screenshot_week8_crud_cards.png`: Kartu menu katalog katering dengan tombol aksi interaktif **Edit Menu** dan **Hapus**.
3. `screenshot_week8_api_status.png`: Hasil pengujian endpoint `GET /api/status` melalui browser yang menampilkan status database `"terhubung"`.
4. `screenshot_week8_api_crud_produk.png`: Hasil pengujian endpoint `GET /api/produk` yang menampilkan data JSON riil dari database PostgreSQL.
5. `screenshot_week8_fullpage.png`: Tangkapan layar utuh dari navbar, hero, live tester, statistik, hingga katalog dan footer.

---

## ✅ Checklist Pemenuhan Tugas Week 8

- [x] **Frontend Dinamis Berbasis Database**: Data produk diambil langsung dari database PostgreSQL, bukan array statis.
- [x] **Antarmuka CRUD Lengkap**:
  - [x] Tampil Data (Read): Katalog kartu produk dengan filter & pencarian.
  - [x] Tambah Data (Create): Modal tambah produk dengan validasi form.
  - [x] Ubah Data (Update): Modal edit produk dengan autofill nilai lama.
  - [x] Hapus Data (Delete): Modal dialog konfirmasi hapus data.
- [x] **REST API CRUD Terhubung Database**:
  - [x] `GET /api/status` (Health check & status database).
  - [x] `GET /api/produk` (Read all produk).
  - [x] `GET /api/produk/:id` (Read single produk by ID).
  - [x] `POST /api/produk` (Create produk baru dengan validasi).
  - [x] `PUT /api/produk/:id` (Update atribut produk).
  - [x] `DELETE /api/produk/:id` (Delete produk dari DB).
- [x] **Integrasi Database**: Menggunakan PostgreSQL dan Sequelize ORM dengan struktur model dan seeder yang lengkap.
- [x] **Middleware Logger**: Tetap berjalan aktif mencatat seluruh request HTTP ke konsol dan `logs/logger.md`.
- [x] **Commit Terstruktur**: Riwayat commit Git dibuat bertahap dan rapi mencerminkan setiap fitur yang dibangun.

---
*Dikembangkan oleh Kelompok 3 Kelas A — Program Studi Teknologi Informasi, Universitas Muhammadiyah Yogyakarta.*
