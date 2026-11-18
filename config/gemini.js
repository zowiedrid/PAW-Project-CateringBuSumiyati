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

// Model Gemini utama yang digunakan (default: gemini-flash-lite-latest yang sangat cepat dan stabil)
const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-flash-lite-latest';
const STORE_NAME = process.env.STORE_NAME || 'Catering Bu Sumiyati';

// Daftar model fallback jika model utama mengalami lonjakan 503 / 429
const FALLBACK_MODELS = [
  'gemini-flash-lite-latest',
  'gemini-flash-latest',
  'gemini-3.8-flash-lite',
  'gemini-3.8-flash'
];

module.exports = {
  genAI,
  MODEL_NAME,
  STORE_NAME,
  FALLBACK_MODELS,
  isConfigured: Boolean(apiKey)
};

