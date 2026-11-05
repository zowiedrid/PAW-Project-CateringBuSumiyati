const sequelize = require('../config/database');
const ProdukModel = require('./produkModel');

module.exports = {
  sequelize,
  Product: ProdukModel.ProductEntity,
  ProdukModel
};
