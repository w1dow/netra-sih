const express = require('express');
const router = express.Router();

const mockAssessment = {
  id: 'assess-101',
  bidId: 'bid-101',
  tenderId: 'tend-001',
  overallScore: 94.5,
  status: 'VERIFIED',
  stages: [
    {
      id: 'stage-1',
      assessmentId: 'assess-101',
      title: 'Eligibility & Statutory Compliance',
      order: 1,
      status: 'VERIFIED',
      requirements: [
        {
          id: 'req-1',
          stageId: 'stage-1',
          title: 'Active GST Registration',
          description: 'Valid GSTIN with up-to-date filing status for the last 12 months.',
          status: 'VERIFIED',
          verificationMessage: 'GSTIN 07AAAAA0000A1Z5 verified via Live GSTN API portal. Tax return status active.',
          documents: [
            {
              id: 'doc-1',
              bidId: 'bid-101',
              fileName: 'GST_Certificate_2026.pdf',
              fileType: 'application/pdf',
              fileSize: 1048576,
              uploadedAt: '2026-08-25T10:00:00Z',
              status: 'VERIFIED',
              verificationMessage: 'Verified match on legal name and GSTIN.',
            }
          ]
        },
        {
          id: 'req-2',
          stageId: 'stage-1',
          title: 'MSE / Startup Privilege Exemption',
          description: 'Udyam registration certificate for turnover and EMD exemption.',
          status: 'VERIFIED',
          verificationMessage: 'Udyam Certificate verified. Qualified for EMD exemption.',
          documents: [
            {
              id: 'doc-2',
              bidId: 'bid-101',
              fileName: 'Udyam_Registration.pdf',
              fileType: 'application/pdf',
              fileSize: 850000,
              uploadedAt: '2026-08-25T10:15:00Z',
              status: 'VERIFIED',
              verificationMessage: 'Validated registration number with Udyam database.',
            }
          ]
        }
      ]
    },
    {
      id: 'stage-2',
      assessmentId: 'assess-101',
      title: 'Technical Standards & Past Experience',
      order: 2,
      status: 'VERIFIED',
      requirements: [
        {
          id: 'req-3',
          stageId: 'stage-2',
          title: 'ISO 27001 & ISO 9001 Certification',
          description: 'Valid Quality and Information Security Management certificates.',
          status: 'VERIFIED',
          verificationMessage: 'Certificates valid until November 2027.',
          documents: [
            {
              id: 'doc-3',
              bidId: 'bid-101',
              fileName: 'ISO_27001_Certificate.pdf',
              fileType: 'application/pdf',
              fileSize: 1200000,
              uploadedAt: '2026-08-25T10:30:00Z',
              status: 'VERIFIED',
              verificationMessage: 'Accreditation body confirmed valid.',
            }
          ]
        }
      ]
    }
  ]
};

// GET /api/compliance/:bidId - Get compliance breakdown for a bid
router.get('/:bidId', (req, res) => {
  res.json({ success: true, data: mockAssessment });
});

// POST /api/compliance/verify - Trigger AI Verification Check
router.post('/verify', (req, res) => {
  res.json({
    success: true,
    data: {
      message: 'AI document verification completed successfully.',
      score: 95.0,
      status: 'VERIFIED',
      checksPerformed: 8,
      passedChecks: 8,
    }
  });
});

module.exports = router;
