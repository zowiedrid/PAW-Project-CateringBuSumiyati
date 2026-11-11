const express = require('express');
const webRoutes = require('./web');
const apiRoutes = require('./api');
const chatRoutes = require('./chat.routes');

const router = express.Router();

/**
 * Hubungkan Route API, Chat AI, dan Route Web
 */
router.use('/api/chat', chatRoutes);
router.use('/api', apiRoutes);
router.use('/', webRoutes);

module.exports = router;
