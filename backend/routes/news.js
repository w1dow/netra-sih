const express = require('express');
const router = express.Router();
const { memoryStore } = require('../db');

// GET /api/news
router.get('/', (req, res) => {
  res.json({ success: true, data: memoryStore.news });
});

module.exports = router;
