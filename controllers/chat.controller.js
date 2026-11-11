/**
 * Controller Chat AI Assistant (Google Gemini)
 * PPAW Week 9 - Generative AI & LLM
 * Menerima request pesan dari klien/frontend, memanggil service Gemini berkonteks,
 * dan mengembalikan respon standar JSON.
 */

const { askGemini } = require('../services/gemini.service');

/**
 * Handle POST /api/chat
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function chat(req, res) {
  try {
    const { message } = req.body;

    // Panggil service Gemini yang telah ter-grounding dengan data PostgreSQL
    const reply = await askGemini(message);

    return res.status(200).json({
      success: true,
      message: 'Berhasil mendapatkan balasan dari AI Assistant',
      data: {
        reply: reply
      }
    });
  } catch (error) {
    console.error('❌ [CHAT CONTROLLER ERROR]:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Gagal menghubungi asisten AI, silakan coba lagi beberapa saat.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

module.exports = {
  chat
};
