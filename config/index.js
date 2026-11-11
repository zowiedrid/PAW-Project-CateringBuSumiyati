require('dotenv').config();
const path = require('path');

const config = {
  appName: 'Catering Bu Sumiyati',
  tagline: 'Cita Rasa Nusantara Autentik, Higienis & Terpercaya',
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  logDir: path.join(__dirname, '..', 'logs'),
  logFile: 'logger.md',
  database: {
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'catering_db',
    user: process.env.DB_USER || 'postgres'
  },
  gemini: {
    modelName: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
    storeName: process.env.STORE_NAME || 'Catering Bu Sumiyati',
    configured: Boolean(process.env.GEMINI_API_KEY)
  },
  kelompok: {
    nama: 'Kelompok 3',
    kelas: 'Kelas A',
    mataKuliah: 'TI-501 Pengembangan Aplikasi Web (PPAW)',
    anggota: [
      { nama: 'Ilham Fadhilah', nim: '20200140100', peran: 'Lead Backend & MVC Architecture' },
      { nama: 'Danar Rohman Rozaqi', nim: '20240140233', peran: 'Database & Data Modeling' },
      { nama: 'M.Ikhlasul', nim: '20240140234', peran: 'Frontend EJS & Tailwind Styling' },
      { nama: 'Anandya Arlys F', nim: '20240140002', peran: 'API Testing & Quality Assurance' }
    ]
  }
};

module.exports = config;
