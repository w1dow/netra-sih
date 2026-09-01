const express = require('express');
const router = express.Router();
const { memoryStore } = require('../db');

// GET /api/notifications
router.get('/', (req, res) => {
  res.json({ success: true, data: memoryStore.notifications, meta: { unreadCount: memoryStore.notifications.filter(n => !n.read).length } });
});

// PUT /api/notifications/:id/read - Mark notification as read
router.put('/:id/read', (req, res) => {
  const notif = memoryStore.notifications.find(n => n.id === req.params.id);
  if (notif) notif.read = true;
  res.json({ success: true, data: notif || null });
});

module.exports = router;
