/**
 * Model Data Produk - Catering Bu Sumiyati (PPAW Week 8 - PostgreSQL + Sequelize)
 * Mengelola skema tabel 'products' dan operasi CRUD database.
 * Menyediakan method query terstruktur agar Controller tidak menulis query SQL mentah secara langsung.
 */

const { DataTypes, Op } = require('sequelize');
const sequelize = require('../config/database');

// 1. Definisi Skema Tabel Produk
const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nama: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Nama produk tidak boleh kosong' }
    }
  },
  kategori: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Kategori produk wajib dipilih/diisi' }
    }
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  harga: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: { args: [0], msg: 'Harga tidak boleh bernilai negatif' }
    }
  },
  stok: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: { args: [0], msg: 'Stok tidak boleh bernilai negatif' }
    }
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 5.0
  },
  terjual: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  gambar: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: '/images/default-menu.jpg'
  },
  keunggulan: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'products',
  timestamps: true
});

// Data awal (Seed Data) untuk inisialisasi pertama kali
const initialProducts = [
  {
    nama: 'Paket Nasi Box Ayam Bakar Madu',
    kategori: 'Nasi Box',
    deskripsi: 'Ayam bakar rempah madu legit khas Solo, nasi putih pulen, tahu tempe bacem, lalapan segar, sambal bajak, dan buah pisang.',
    harga: 28000,
    stok: 150,
    rating: 4.9,
    terjual: 1250,
    gambar: '/images/nasi-box-ayam-madu.jpg',
    keunggulan: 'Menu favorit acara kantor dan gathering kampus, rasa manis gurih meresap.'
  },
  {
    nama: 'Paket Nasi Kotak Rendang Daging Sapi',
    kategori: 'Nasi Box',
    deskripsi: 'Daging sapi pilihan dimasak rendang autentik Minang 6 jam, gulai kapau nangka muda, sambal ijo, telur balado, dan kerupuk udang.',
    harga: 38000,
    stok: 85,
    rating: 5.0,
    terjual: 890,
    gambar: '/images/nasi-kotak-rendang.jpg',
    keunggulan: 'Daging sangat empuk, bumbu rempah kaya rempah premium nusantara.'
  },
  {
    nama: 'Paket Prasmanan Tradisional Joglo (Min. 50 Porsi)',
    kategori: 'Prasmanan',
    deskripsi: 'Nasi liwet wangi, ayam kremes gurih, gurame filet asam manis, sop kimlo bakso ikan, sambal goreng ati krecek, es puter kelapa kopyor.',
    harga: 65000,
    stok: 25,
    rating: 4.8,
    terjual: 320,
    gambar: '/images/prasmanan-joglo.jpg',
    keunggulan: 'Termasuk meja saji, pemanas chafing dish, perlengkapan makan, dan 2 staf pramusaji.'
  },
  {
    nama: 'Snack Box Premium Syukuran',
    kategori: 'Snack Box',
    deskripsi: 'Lemper ayam bakar pulen, risoles ragout mayo, pastel basah telur daging, bolu gulung keju lembut, dan air mineral botol 330ml.',
    harga: 16500,
    stok: 200,
    rating: 4.9,
    terjual: 2400,
    gambar: '/images/snack-box-syukuran.jpg',
    keunggulan: 'Kemasan box eksklusif laminasi food grade, cocok untuk seminar & pengajian.'
  },
  {
    nama: 'Nasi Tumpeng Kuning Komplit (15-20 Porsi)',
    kategori: 'Tumpeng',
    deskripsi: 'Tumpeng kerucut kuning harum gurih kelapa, ayam suwir pedas manis, perkedel kentang lembut, orek tempe kacang, telur dadar rawis, urap sayur, dan hiasan wortel/cabai cantik.',
    harga: 450000,
    stok: 12,
    rating: 5.0,
    terjual: 145,
    gambar: '/images/tumpeng-komplit.jpg',
    keunggulan: 'Pusat perhatian untuk peresmian, ulang tahun, dan selamatan dengan ucapan custom.'
  },
  {
    nama: 'Paket Tumpeng Mini Selamatan Personal',
    kategori: 'Tumpeng',
    deskripsi: 'Nasi tumpeng mini personal dengan lauk ayam goreng serundeng, mie goreng kecap, telur balado separuh, kering kentang mustofa, dan timun garnish.',
    harga: 35000,
    stok: 120,
    rating: 4.9,
    terjual: 780,
    gambar: '/images/tumpeng-mini.jpg',
    keunggulan: 'Wadah mika kubah transparan higienis dengan pita hias, praktis dibagikan ke tetangga.'
  }
];

// 2. Facade Model untuk Operasi CRUD Database
const ProdukModel = {
  // Expose model Sequelize mentah jika diperlukan relasi lanjut
  ProductEntity: Product,

  /**
   * Mengambil semua produk dari database PostgreSQL
   * @param {Object} filter { kategori, search }
   * @returns {Promise<Array>}
   */
  async getAll(filter = {}) {
    const whereClause = {};

    if (filter.kategori && filter.kategori.toLowerCase() !== 'semua') {
      whereClause.kategori = filter.kategori;
    }

    if (filter.search && filter.search.trim() !== '') {
      const q = `%${filter.search.trim()}%`;
      whereClause[Op.or] = [
        { nama: { [Op.iLike]: q } },
        { deskripsi: { [Op.iLike]: q } },
        { keunggulan: { [Op.iLike]: q } }
      ];
    }

    const items = await Product.findAll({
      where: whereClause,
      order: [['id', 'ASC']]
    });

    return items.map(item => item.toJSON());
  },

  /**
   * Mengambil detail satu produk berdasarkan ID dari database
   * @param {number|string} id
   * @returns {Promise<Object|null>}
   */
  async getById(id) {
    const item = await Product.findByPk(id);
    return item ? item.toJSON() : null;
  },

  /**
   * Menambahkan produk baru ke dalam database
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async create(data) {
    const newRecord = await Product.create({
      nama: data.nama,
      kategori: data.kategori,
      deskripsi: data.deskripsi || null,
      harga: parseInt(data.harga, 10) || 0,
      stok: parseInt(data.stok, 10) || 0,
      rating: parseFloat(data.rating) || 5.0,
      terjual: parseInt(data.terjual, 10) || 0,
      gambar: data.gambar || '/images/default-menu.jpg',
      keunggulan: data.keunggulan || 'Higienis, lezat, dan terpercaya.'
    });

    return newRecord.toJSON();
  },

  /**
   * Memperbarui data produk berdasarkan ID di database
   * @param {number|string} id
   * @param {Object} data
   * @returns {Promise<Object|null>}
   */
  async update(id, data) {
    const record = await Product.findByPk(id);
    if (!record) return null;

    const updatedData = {
      nama: data.nama !== undefined ? data.nama : record.nama,
      kategori: data.kategori !== undefined ? data.kategori : record.kategori,
      deskripsi: data.deskripsi !== undefined ? data.deskripsi : record.deskripsi,
      harga: data.harga !== undefined ? parseInt(data.harga, 10) : record.harga,
      stok: data.stok !== undefined ? parseInt(data.stok, 10) : record.stok,
      rating: data.rating !== undefined ? parseFloat(data.rating) : record.rating,
      terjual: data.terjual !== undefined ? parseInt(data.terjual, 10) : record.terjual,
      gambar: data.gambar !== undefined ? data.gambar : record.gambar,
      keunggulan: data.keunggulan !== undefined ? data.keunggulan : record.keunggulan
    };

    await record.update(updatedData);
    return record.toJSON();
  },

  /**
   * Menghapus data produk berdasarkan ID dari database
   * @param {number|string} id
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    const record = await Product.findByPk(id);
    if (!record) return false;

    await record.destroy();
    return true;
  },

  /**
   * Mengambil daftar kategori unik yang ada di database
   * @returns {Promise<Array>}
   */
  async getCategories() {
    const products = await Product.findAll({
      attributes: ['kategori'],
      group: ['kategori'],
      order: [['kategori', 'ASC']]
    });

    const categories = products.map(p => p.kategori).filter(Boolean);
    return ['Semua', ...new Set(categories)];
  },

  /**
   * Inisialisasi tabel dan seeder otomatis jika tabel masih kosong
   */
  async initAndSeed() {
    await Product.sync({ alter: true });
    const count = await Product.count();
    if (count === 0) {
      console.log('🌱 Menjalankan Seeder Data Awal Produk ke PostgreSQL...');
      await Product.bulkCreate(initialProducts);
      console.log(`✅ Berhasil menambahkan ${initialProducts.length} data awal produk ke database.`);
    }
  }
};

module.exports = ProdukModel;
