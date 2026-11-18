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
    return res.status(200).json({
      success: true,
      message: 'Respon fallback asisten katering',
      data: {
        reply: 'Halo Kak! 😊 Mohon maaf jaringan AI sedang mengalami kepadatan lalu lintas. Untuk pilihan menu Catering Bu Sumiyati, kami menyediakan Paket Nasi Box Ayam Bakar Madu (Rp 28.000), Nasi Kotak Rendang (Rp 38.000), Tumpeng Kuning Komplit (Rp 450.000), Prasmanan Tradisional Joglo (Rp 65.000), dan Snack Box (Rp 16.500). Ada yang bisa Bu Sumiyati bantu siapkan untuk acara Kakak?'
      }
    });
  }
}

module.exports = {
  chat
};

