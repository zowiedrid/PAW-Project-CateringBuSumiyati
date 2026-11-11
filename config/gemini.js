/**
 * Konfigurasi Integrasi Google Gemini API
 * PPAW Week 9 - Generative AI & LLM Google Gemini
 * Mengelola client GoogleGenerativeAI dan model configuration secara aman dari server-side.
 */

require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn('⚠️  [PERINGATAN] GEMINI_API_KEY belum diset pada berkas .env. Fitur AI Assistant tidak akan berfungsi.');
}

// Client Google Gemini - API Key HANYA dibaca di sisi backend/server dan tidak pernah dikirim ke frontend
const genAI = new GoogleGenerativeAI(apiKey || '');

// Model Gemini yang digunakan (gemini-3.8-flash)
const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
const STORE_NAME = process.env.STORE_NAME || 'Catering Bu Sumiyati';

module.exports = {
  genAI,
  MODEL_NAME,
  STORE_NAME,
  isConfigured: Boolean(apiKey)
};
