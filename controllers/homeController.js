const ProdukModel = require('../models/produkModel');
const config = require('../config');
const { formatRupiah } = require('../utils/currency');

/**
 * Controller Frontend (Web Pages)
 * Mengatur alur pemrosesan request untuk merender tampilan EJS berbasis data langsung dari database
 */
const homeController = {
  /**
   * Halaman Utama (Homepage)
   * Mengambil data produk langsung dari PostgreSQL via ProdukModel
   */
  async index(req, res) {
    try {
      const { kategori, q } = req.query;

      // Ambil data produk dari database (dengan filter opsional)
      const daftarProduk = await ProdukModel.getAll({
        kategori: kategori,
        search: q
      });

      // Ambil daftar kategori unik dari database
      const kategoriList = await ProdukModel.getCategories();

      // Hitung statistik ringkas dari database
      const totalProduk = daftarProduk.length;
      const totalStok = daftarProduk.reduce((acc, curr) => acc + (curr.stok || 0), 0);
      const totalTerjual = daftarProduk.reduce((acc, curr) => acc + (curr.terjual || 0), 0);
      const rataRataHarga = totalProduk > 0 
        ? Math.round(daftarProduk.reduce((acc, curr) => acc + (curr.harga || 0), 0) / totalProduk)
        : 0;

      res.render('index', {
        judul: `${config.appName} — PPAW Week 8 (CRUD & Database)`,
        config: config,
        produk: daftarProduk,
        kategoriList: kategoriList,
        kategoriAktif: kategori || 'Semua',
        pencarianAktif: q || '',
        formatRupiah: formatRupiah,
        stats: {
          totalProduk,
          totalStok,
          totalTerjual,
          rataRataHarga
        },
        anggotaKelompok: config.kelompok.anggota,
        pesanSukses: req.query.success || null,
        pesanError: req.query.error || null
      });
    } catch (error) {
      console.error('[homeController.index ERROR]:', error);
      res.status(500).render('index', {
        judul: `${config.appName} — Error`,
        config: config,
        produk: [],
        kategoriList: ['Semua'],
        kategoriAktif: 'Semua',
        pencarianAktif: '',
        formatRupiah: formatRupiah,
        stats: { totalProduk: 0, totalStok: 0, totalTerjual: 0, rataRataHarga: 0 },
        anggotaKelompok: config.kelompok.anggota,
        pesanSukses: null,
        pesanError: 'Gagal mengambil data dari database: ' + error.message
      });
    }
  },

  /**
   * Action Handler untuk form submission POST biasa (dukungan form non-AJAX)
   */
  async handleCreate(req, res) {
    try {
      const { nama, kategori, harga, stok, deskripsi, keunggulan } = req.body;
      if (!nama || !kategori || !harga) {
        return res.redirect('/?error=' + encodeURIComponent('Nama, kategori, dan harga wajib diisi!'));
      }

      await ProdukModel.create({
        nama,
        kategori,
        harga,
        stok: stok || 0,
        deskripsi,
        keunggulan
      });

      return res.redirect('/?success=' + encodeURIComponent(`Menu '${nama}' berhasil ditambahkan ke database!`));
    } catch (error) {
      return res.redirect('/?error=' + encodeURIComponent(error.message));
    }
  },

  /**
   * Action Handler untuk form submission UPDATE biasa
   */
  async handleUpdate(req, res) {
    try {
      const { id } = req.params;
      const { nama, kategori, harga, stok, deskripsi, keunggulan } = req.body;

      await ProdukModel.update(id, {
        nama,
        kategori,
        harga,
        stok,
        deskripsi,
        keunggulan
      });

      return res.redirect('/?success=' + encodeURIComponent(`Menu ID #${id} berhasil diperbarui di database!`));
    } catch (error) {
      return res.redirect('/?error=' + encodeURIComponent(error.message));
    }
  },

  /**
   * Action Handler untuk form submission DELETE biasa
   */
  async handleDelete(req, res) {
    try {
      const { id } = req.params;
      await ProdukModel.delete(id);
      return res.redirect('/?success=' + encodeURIComponent(`Menu ID #${id} berhasil dihapus dari database!`));
    } catch (error) {
      return res.redirect('/?error=' + encodeURIComponent(error.message));
    }
  }
};

module.exports = homeController;
