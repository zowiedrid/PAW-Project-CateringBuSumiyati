/**
 * Routing Endpoint Chat AI Assistant
 * PPAW Week 9 - Generative AI
 * Menghubungkan endpoint /api/chat dengan middleware validasi dan controller chat.
 */

const express = require('express');
const router = express.Router();
const validateChatInput = require('../middlewares/validateChatInput');
const chatController = require('../controllers/chat.controller');

// POST /api/chat (Public endpoint untuk chat dengan AI Assistant)
router.post('/', validateChatInput, chatController.chat);

module.exports = router;
