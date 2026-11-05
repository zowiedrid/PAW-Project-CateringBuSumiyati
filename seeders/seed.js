/**
 * Script Seeder Manual - Database PostgreSQL
 * Menjalankan sinkronisasi skema tabel dan mengisi data awal.
 * Eksekusi via terminal: npm run seed
 */

const { sequelize, ProdukModel } = require('../models');

async function runSeed() {
  try {
    console.log('🔄 Menghubungkan ke database...');
    await sequelize.authenticate();
    console.log('✅ Koneksi database berhasil.');

    console.log('📦 Melakukan sinkronisasi tabel...');
    await ProdukModel.initAndSeed();

    console.log('🎉 Seeder selesai dijalankan!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Terjadi kesalahan saat seeding:', error);
    process.exit(1);
  }
}

runSeed();
