require('dotenv').config();
const { Sequelize } = require('sequelize');

const dbName = process.env.DB_NAME || 'catering_db';
const dbUser = process.env.DB_USER || 'postgres';
const dbPass = process.env.DB_PASS || 'postgres';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 5432;
const dbDialect = process.env.DB_DIALECT || 'postgres';

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: Number(dbPort),
  dialect: dbDialect,
  logging: false, // Set to console.log to debug raw SQL queries
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: true,
    underscored: false
  }
});

module.exports = sequelize;
