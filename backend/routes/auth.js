const express = require('express');
const router = express.Router();
const { memoryStore } = require('../db');

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email } = req.body;
  res.json({
    success: true,
    data: {
      token: 'mock-jwt-token-netra-2026',
      user: memoryStore.user,
    }
  });
});

// GET /api/auth/me - Current User Profile
router.get('/me', (req, res) => {
  res.json({ success: true, data: memoryStore.user });
});

module.exports = router;
