const express = require('express');
const router = express.Router();
const { getPool, isUsingFallback, memoryStore } = require('../db');

// GET /api/bids - Get bids (my bids)
router.get('/', async (req, res) => {
  try {
    if (isUsingFallback()) {
      return res.json({ success: true, data: memoryStore.bids, meta: { total: memoryStore.bids.length } });
    }
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM bids ORDER BY createdAt DESC');
    res.json({ success: true, data: rows, meta: { total: rows.length } });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

// GET /api/bids/:id - Get bid by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isUsingFallback()) {
      const bid = memoryStore.bids.find(b => b.id === id);
      if (!bid) return res.status(404).json({ success: false, error: { message: 'Bid not found' } });
      return res.json({ success: true, data: bid });
    }
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM bids WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ success: false, error: { message: 'Bid not found' } });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

// POST /api/bids - Submit/Create new bid
router.post('/', async (req, res) => {
  try {
    const newBid = {
      id: `bid-${Date.now()}`,
      tenderId: req.body.tenderId,
      bidderCompanyId: req.body.bidderCompanyId || 'comp-01',
      bidValue: parseFloat(req.body.bidValue) || 0,
      status: req.body.status || 'SUBMITTED',
      complianceScore: 92.0,
      submittedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isEditable: false,
      technicalNotes: req.body.technicalNotes || 'Submitted bid via NETRA online portal.',
    };

    if (isUsingFallback()) {
      memoryStore.bids.unshift(newBid);
      return res.status(201).json({ success: true, data: newBid });
    }

    const pool = getPool();
    await pool.query(
      `INSERT INTO bids (id, tenderId, bidderCompanyId, bidValue, status, complianceScore, submittedAt, createdAt, updatedAt, isEditable, technicalNotes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [newBid.id, newBid.tenderId, newBid.bidderCompanyId, newBid.bidValue, newBid.status, newBid.complianceScore, new Date(newBid.submittedAt), new Date(newBid.createdAt), new Date(newBid.updatedAt), false, newBid.technicalNotes]
    );

    res.status(201).json({ success: true, data: newBid });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

module.exports = router;
