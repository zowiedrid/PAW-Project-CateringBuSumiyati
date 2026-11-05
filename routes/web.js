const express = require('express');
const homeController = require('../controllers/homeController');

const router = express.Router();

/**
 * Routes Halaman Web Frontend (EJS):
 * 1. Beranda & Katalog Produk: GET /
 * 2. Form Actions Fallback:
 *    - POST /products
 *    - POST /products/:id/update
 *    - POST /products/:id/delete
 */
router.get('/', homeController.index);
router.post('/products', homeController.handleCreate);
router.post('/products/:id/update', homeController.handleUpdate);
router.post('/products/:id/delete', homeController.handleDelete);

module.exports = router;
