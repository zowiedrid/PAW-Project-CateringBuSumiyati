const ProdukModel = require('../models/produkModel');
const config = require('../config');
const sequelize = require('../config/database');

/**
 * Controller API - Mengelola endpoint REST API JSON untuk operasi CRUD
 * Terhubung langsung ke database PostgreSQL melalui Model layer
 */
const apiController = {
  /**
   * GET /api/status
   * Mengirimkan response dalam format JSON yang menunjukkan status aplikasi, database, dan server.
   */
  async getStatus(req, res) {
    let dbStatus = 'terputus';
    try {
      await sequelize.authenticate();
      dbStatus = 'terhubung';
    } catch (err) {
      dbStatus = `gagal (${err.message})`;
    }

    const totalProduk = await ProdukModel.ProductEntity.count().catch(() => 0);

    const statusData = {
      status: 'online',
      aplikasi: config.appName,
      tagline: config.tagline,
      versi: '3.0.0 (Week 9 - Gemini AI Assistant & CRUD)',
      database: {
        status: dbStatus,
        dialect: config.database.dialect,
        host: config.database.host,
        port: config.database.port,
        namaDatabase: config.database.name,
        totalTersimpan: totalProduk
      },
      aiAssistant: {
        status: config.gemini.configured ? 'aktif' : 'belum dikonfigurasi',
        model: config.gemini.modelName,
        provider: 'Google Gemini',
        endpoint: 'POST /api/chat',
        groundingSource: 'PostgreSQL products table'
      },
      uptimeDetik: Math.round(process.uptime()),
      waktuServer: new Date().toISOString(),
      lingkungan: config.env,
      kelompok: {
        nama: config.kelompok.nama,
        kelas: config.kelompok.kelas,
        mataKuliah: config.kelompok.mataKuliah,
        anggota: config.kelompok.anggota.map(a => `${a.nama} (${a.nim})`)
      },
      sistem: {
        nodeVersion: process.version,
        platform: process.platform,
        memoryUsageMB: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
      }
    };

    return res.status(200).json(statusData);
  },

  /**
   * GET /api/produk
   * Mengambil dan menampilkan seluruh data produk dari database.
   * Mendukung query filter: ?kategori=Nasi Box & ?q=Ayam
   */
  async getProduk(req, res) {
    try {
      const { kategori, q, search, wrap } = req.query;
      const data = await ProdukModel.getAll({
        kategori: kategori,
        search: q || search
      });

      // Jika format dibungkus objek { sukses: true, total: N, data: [...] }
      if (wrap === 'true' || wrap === '1') {
        return res.status(200).json({
          sukses: true,
          total: data.length,
          kategori: kategori || 'Semua',
          data: data
        });
      }

      // Default: Array JSON murni sesuai spesifikasi tugas
      return res.status(200).json(data);
    } catch (error) {
      console.error('[API getProduk ERROR]:', error);
      return res.status(500).json({
        sukses: false,
        pesan: 'Gagal mengambil data produk dari database.',
        error: error.message
      });
    }
  },

  /**
   * GET /api/produk/:id
   * Mengambil detail satu data produk berdasarkan ID dari database.
   */
  async getProdukById(req, res) {
    try {
      const { id } = req.params;
      const produk = await ProdukModel.getById(id);

      if (!produk) {
        return res.status(404).json({
          sukses: false,
          pesan: `Produk dengan ID #${id} tidak ditemukan di database.`
        });
      }

      return res.status(200).json(produk);
    } catch (error) {
      console.error('[API getProdukById ERROR]:', error);
      return res.status(500).json({
        sukses: false,
        pesan: 'Terjadi kesalahan saat mencari produk.',
        error: error.message
      });
    }
  },

  /**
   * POST /api/produk
   * Menambahkan data baru ke dalam database.
   */
  async createProduk(req, res) {
    try {
      const { nama, kategori, harga, stok, deskripsi, keunggulan, rating, gambar } = req.body;

      // Validasi input wajib
      if (!nama || String(nama).trim() === '') {
        return res.status(400).json({
          sukses: false,
          pesan: 'Nama produk wajib diisi.'
        });
      }

      if (!kategori || String(kategori).trim() === '') {
        return res.status(400).json({
          sukses: false,
          pesan: 'Kategori produk wajib diisi.'
        });
      }

      if (harga === undefined || harga === null || isNaN(Number(harga)) || Number(harga) < 0) {
        return res.status(400).json({
          sukses: false,
          pesan: 'Harga produk harus berupa angka valid dan tidak boleh negatif.'
        });
      }

      const newProduct = await ProdukModel.create({
        nama: String(nama).trim(),
        kategori: String(kategori).trim(),
        harga: Number(harga),
        stok: stok !== undefined && !isNaN(Number(stok)) ? Number(stok) : 0,
        deskripsi: deskripsi ? String(deskripsi).trim() : null,
        keunggulan: keunggulan ? String(keunggulan).trim() : 'Higienis, lezat, dan terpercaya.',
        rating: rating !== undefined && !isNaN(Number(rating)) ? Number(rating) : 5.0,
        gambar: gambar || '/images/default-menu.jpg'
      });

      return res.status(201).json({
        sukses: true,
        pesan: 'Produk berhasil ditambahkan ke database!',
        data: newProduct
      });
    } catch (error) {
      console.error('[API createProduk ERROR]:', error);
      return res.status(500).json({
        sukses: false,
        pesan: 'Gagal menambahkan produk ke database.',
        error: error.message
      });
    }
  },

  /**
   * PUT /api/produk/:id
   * Memperbarui data produk berdasarkan ID di database.
   */
  async updateProduk(req, res) {
    try {
      const { id } = req.params;
      const existing = await ProdukModel.getById(id);

      if (!existing) {
        return res.status(404).json({
          sukses: false,
          pesan: `Produk dengan ID #${id} tidak ditemukan untuk diperbarui.`
        });
      }

      const { nama, kategori, harga, stok, deskripsi, keunggulan, rating, gambar, terjual } = req.body;

      if (harga !== undefined && (isNaN(Number(harga)) || Number(harga) < 0)) {
        return res.status(400).json({
          sukses: false,
          pesan: 'Harga produk harus berupa angka valid dan tidak boleh negatif.'
        });
      }

      if (stok !== undefined && (isNaN(Number(stok)) || Number(stok) < 0)) {
        return res.status(400).json({
          sukses: false,
          pesan: 'Stok produk harus berupa angka valid dan tidak boleh negatif.'
        });
      }

      const updatedProduct = await ProdukModel.update(id, {
        nama: nama ? String(nama).trim() : undefined,
        kategori: kategori ? String(kategori).trim() : undefined,
        harga: harga !== undefined ? Number(harga) : undefined,
        stok: stok !== undefined ? Number(stok) : undefined,
        deskripsi: deskripsi !== undefined ? String(deskripsi).trim() : undefined,
        keunggulan: keunggulan !== undefined ? String(keunggulan).trim() : undefined,
        rating: rating !== undefined ? Number(rating) : undefined,
        terjual: terjual !== undefined ? Number(terjual) : undefined,
        gambar: gambar !== undefined ? gambar : undefined
      });

      return res.status(200).json({
        sukses: true,
        pesan: `Produk ID #${id} berhasil diperbarui di database!`,
        data: updatedProduct
      });
    } catch (error) {
      console.error('[API updateProduk ERROR]:', error);
      return res.status(500).json({
        sukses: false,
        pesan: 'Gagal memperbarui data produk di database.',
        error: error.message
      });
    }
  },

  /**
   * DELETE /api/produk/:id
   * Menghapus data produk berdasarkan ID dari database.
   */
  async deleteProduk(req, res) {
    try {
      const { id } = req.params;
      const existing = await ProdukModel.getById(id);

      if (!existing) {
        return res.status(404).json({
          sukses: false,
          pesan: `Produk dengan ID #${id} tidak ditemukan untuk dihapus.`
        });
      }

      await ProdukModel.delete(id);

      return res.status(200).json({
        sukses: true,
        pesan: `Produk '${existing.nama}' (ID #${id}) berhasil dihapus dari database.`,
        deletedId: Number(id)
      });
    } catch (error) {
      console.error('[API deleteProduk ERROR]:', error);
      return res.status(500).json({
        sukses: false,
        pesan: 'Gagal menghapus produk dari database.',
        error: error.message
      });
    }
  }
};

module.exports = apiController;
