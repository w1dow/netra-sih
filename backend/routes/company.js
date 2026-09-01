const express = require('express');
const router = express.Router();
const { memoryStore } = require('../db');

// GET /api/company
router.get('/', (req, res) => {
  res.json({ success: true, data: memoryStore.company });
});

// GET /api/company/:id
router.get('/:id', (req, res) => {
  res.json({ success: true, data: memoryStore.company });
});

module.exports = router;
