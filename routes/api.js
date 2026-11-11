const express = require('express');
const apiController = require('../controllers/apiController');
const chatRoutes = require('./chat.routes');

const router = express.Router();

/**
 * Endpoint Status & Health Check
 * GET /api/status
 */
router.get('/status', apiController.getStatus);

/**
 * Endpoint REST API CRUD Produk:
 * 1. READ ALL : GET /api/produk
 * 2. READ ONE : GET /api/produk/:id
 * 3. CREATE   : POST /api/produk
 * 4. UPDATE   : PUT /api/produk/:id
 * 5. DELETE   : DELETE /api/produk/:id
 */
router.get('/produk', apiController.getProduk);
router.get('/produk/:id', apiController.getProdukById);
router.post('/produk', apiController.createProduk);
router.put('/produk/:id', apiController.updateProduk);
router.delete('/produk/:id', apiController.deleteProduk);

/**
 * Endpoint AI Assistant (Google Gemini):
 * POST /api/chat
 */
router.use('/chat', chatRoutes);

module.exports = router;
