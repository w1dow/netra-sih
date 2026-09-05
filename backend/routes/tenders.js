const express = require('express');
const router = express.Router();
const { getPool, isUsingFallback, memoryStore } = require('../db');

// GET /api/tenders - List tenders with optional search and filters
router.get('/', async (req, res) => {
  try {
    const { department, category, location, status, search } = req.query;

    if (isUsingFallback()) {
      let result = [...memoryStore.tenders];
      if (department) result = result.filter(t => t.departmentName === department || t.departmentId === department);
      if (category) result = result.filter(t => t.categoryName === category || t.categoryId === category);
      if (location) result = result.filter(t => t.location === location);
      if (status) result = result.filter(t => t.status === status);
      if (search) {
        const q = search.toLowerCase();
        result = result.filter(t =>
          t.title.toLowerCase().includes(q) ||
          t.tenderId.toLowerCase().includes(q) ||
          (t.departmentName && t.departmentName.toLowerCase().includes(q)) ||
          (t.description && t.description.toLowerCase().includes(q))
        );
      }
      return res.json({ success: true, data: result, meta: { total: result.length } });
    }

    const pool = getPool();
    let query = 'SELECT * FROM tenders WHERE 1=1';
    const params = [];

    if (department) {
      query += ' AND (departmentName = ? OR departmentId = ?)';
      params.push(department, department);
    }
    if (category) {
      query += ' AND (categoryName = ? OR categoryId = ?)';
      params.push(category, category);
    }
    if (location) {
      query += ' AND location = ?';
      params.push(location);
    }
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    if (search) {
      query += ' AND (title LIKE ? OR tenderId LIKE ? OR description LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term);
    }

    query += ' ORDER BY createdAt DESC';

    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows, meta: { total: rows.length } });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

// GET /api/tenders/:id - Get single tender by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isUsingFallback()) {
      const tender = memoryStore.tenders.find(t => t.id === id || t.tenderId === id);
      if (!tender) {
        return res.status(404).json({ success: false, error: { message: 'Tender not found' } });
      }
      return res.json({ success: true, data: tender });
    }

    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM tenders WHERE id = ? OR tenderId = ?', [id, id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: { message: 'Tender not found' } });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

// POST /api/tenders - Create new tender
router.post('/', async (req, res) => {
  try {
    const tenderData = {
      id: `tend-${Date.now()}`,
      tenderId: req.body.tenderId || `GEM/${new Date().getFullYear()}/B/${Math.floor(1000000 + Math.random() * 9000000)}`,
      title: req.body.title,
      description: req.body.description || '',
      departmentId: req.body.departmentId || 'dept-1',
      departmentName: req.body.departmentName || req.body.department || 'Ministry of Electronics & IT',
      categoryId: req.body.categoryId || 'cat-1',
      categoryName: req.body.categoryName || req.body.category || 'Infrastructure',
      location: req.body.location || 'New Delhi',
      estimatedValue: parseFloat(req.body.estimatedValue) || 0,
      currency: 'INR',
      deadline: req.body.deadline || new Date(Date.now() + 30 * 86400000).toISOString(),
      status: req.body.status || 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (isUsingFallback()) {
      memoryStore.tenders.unshift(tenderData);
      return res.status(201).json({ success: true, data: tenderData });
    }

    const pool = getPool();
    await pool.query(
      `INSERT INTO tenders (id, tenderId, title, description, departmentId, departmentName, categoryId, categoryName, location, estimatedValue, currency, deadline, status, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        tenderData.id,
        tenderData.tenderId,
        tenderData.title,
        tenderData.description,
        tenderData.departmentId,
        tenderData.departmentName,
        tenderData.categoryId,
        tenderData.categoryName,
        tenderData.location,
        tenderData.estimatedValue,
        tenderData.currency,
        new Date(tenderData.deadline),
        tenderData.status,
        new Date(tenderData.createdAt),
        new Date(tenderData.updatedAt),
      ]
    );

    res.status(201).json({ success: true, data: tenderData });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

module.exports = router;
