/**
 * Middleware Validasi Input Chat AI Assistant
 * PPAW Week 9 - Defense-in-Depth AI Guardrail
 * Memvalidasi payload pesan sebelum diteruskan ke Controller dan Gemini Service.
 */

const MAX_MESSAGE_LENGTH = 500;

function validateChatInput(req, res, next) {
  const { message } = req.body;

  // 1. Validasi keberadaan pesan dan tipe data
  if (message === undefined || message === null || typeof message !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Parameter "message" wajib diisi dalam format string.'
    });
  }

  const trimmedMessage = message.trim();

  // 2. Validasi pesan kosong atau hanya spasi
  if (trimmedMessage.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Pesan chat tidak boleh kosong.'
    });
  }

  // 3. Validasi batas panjang pesan (mencegah payload attack / resource exhaustion)
  if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({
      success: false,
      message: `Pesan terlalu panjang (maksimal ${MAX_MESSAGE_LENGTH} karakter). Karakter saat ini: ${trimmedMessage.length}.`
    });
  }

  // Simpan versi trimmed pada req.body agar controller menerima pesan yang bersih
  req.body.message = trimmedMessage;

  next();
}

module.exports = validateChatInput;
