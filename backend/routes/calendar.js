const express = require('express');
const router = express.Router();

const mockEvents = [
  {
    id: 'cal-1',
    tenderId: 'tend-001',
    type: 'TENDER_DEADLINE',
    title: 'Bid Submission Deadline: AI Document Verification System',
    start: '2026-09-30T17:00:00Z',
    description: 'Final date for electronic submission of technical and financial bids on GeM portal.',
  },
  {
    id: 'cal-2',
    tenderId: 'tend-002',
    type: 'EVALUATION_UPDATE',
    title: 'Technical Bid Opening: 4-Lane Elevated Corridor NH-48',
    start: '2026-10-16T10:00:00Z',
    description: 'Public opening of technical proposals by committee officers.',
  },
  {
    id: 'cal-3',
    tenderId: 'tend-003',
    type: 'COMPLIANCE_DEADLINE',
    title: 'OEM Authorization Document Audit Due',
    start: '2026-09-15T12:00:00Z',
    description: 'Deadline for updating verified manufacturer authorization certificate.',
  }
];

// GET /api/calendar
router.get('/', (req, res) => {
  res.json({ success: true, data: mockEvents });
});

module.exports = router;
