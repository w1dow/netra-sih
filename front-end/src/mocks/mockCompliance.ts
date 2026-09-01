import type { ComplianceAssessment } from '../types';

export const mockCompliance: ComplianceAssessment[] = [
  {
    id: 'ca-001',
    bidId: 'bid-001',
    tenderId: '8f1a2c',
    overallScore: 94,
    status: 'REVIEW_REQUIRED',
    stages: [
      {
        id: 'stage-01',
        assessmentId: 'ca-001',
        title: 'Company Eligibility',
        order: 1,
        status: 'VERIFIED',
        requirements: [
          { id: 'req-01', stageId: 'stage-01', title: 'Company Registration', description: 'Valid company registration certificate', status: 'VERIFIED', documents: [{ id: 'doc-01', bidId: 'bid-001', complianceRequirementId: 'req-01', fileName: 'Company_Registration.pdf', fileType: 'application/pdf', fileSize: 1240000, uploadedAt: '2026-08-25T10:00:00+05:30', status: 'VERIFIED', downloadUrl: '#' }] },
          { id: 'req-02', stageId: 'stage-01', title: 'PAN Card', description: 'Permanent Account Number card', status: 'VERIFIED', documents: [{ id: 'doc-02', bidId: 'bid-001', complianceRequirementId: 'req-02', fileName: 'PAN_Card.pdf', fileType: 'application/pdf', fileSize: 520000, uploadedAt: '2026-08-25T10:05:00+05:30', status: 'VERIFIED', downloadUrl: '#' }] },
          { id: 'req-03', stageId: 'stage-01', title: 'Authorized Signatory', description: 'Board resolution for authorized signatory', status: 'VERIFIED', documents: [{ id: 'doc-03', bidId: 'bid-001', complianceRequirementId: 'req-03', fileName: 'Board_Resolution.pdf', fileType: 'application/pdf', fileSize: 890000, uploadedAt: '2026-08-25T10:10:00+05:30', status: 'VERIFIED', downloadUrl: '#' }] },
          { id: 'req-04', stageId: 'stage-01', title: 'Udyam Registration', description: 'MSME/Udyam registration certificate', status: 'VERIFIED', documents: [{ id: 'doc-04', bidId: 'bid-001', complianceRequirementId: 'req-04', fileName: 'Udyam_Certificate.pdf', fileType: 'application/pdf', fileSize: 340000, uploadedAt: '2026-08-25T10:15:00+05:30', status: 'VERIFIED', downloadUrl: '#' }] },
          { id: 'req-05', stageId: 'stage-01', title: 'Bank Details', description: 'Bank account verification letter', status: 'VERIFIED', documents: [{ id: 'doc-05', bidId: 'bid-001', complianceRequirementId: 'req-05', fileName: 'Bank_Verification.pdf', fileType: 'application/pdf', fileSize: 210000, uploadedAt: '2026-08-25T10:20:00+05:30', status: 'VERIFIED', downloadUrl: '#' }] },
        ],
      },
      {
        id: 'stage-02',
        assessmentId: 'ca-001',
        title: 'Statutory Compliance',
        order: 2,
        status: 'VERIFIED',
        requirements: [
          { id: 'req-06', stageId: 'stage-02', title: 'GST Certificate', description: 'Goods and Services Tax registration', status: 'VERIFIED', documents: [{ id: 'doc-06', bidId: 'bid-001', complianceRequirementId: 'req-06', fileName: 'GST_Certificate.pdf', fileType: 'application/pdf', fileSize: 440000, uploadedAt: '2026-08-26T09:00:00+05:30', status: 'VERIFIED', downloadUrl: '#' }] },
          { id: 'req-07', stageId: 'stage-02', title: 'Income Tax Returns', description: 'ITR filing for last 3 financial years', status: 'VERIFIED', documents: [{ id: 'doc-07', bidId: 'bid-001', complianceRequirementId: 'req-07', fileName: 'ITR_2023-24.pdf', fileType: 'application/pdf', fileSize: 1100000, uploadedAt: '2026-08-26T09:10:00+05:30', status: 'VERIFIED', downloadUrl: '#' }] },
          { id: 'req-08', stageId: 'stage-02', title: 'EPFO Compliance', description: 'Employee Provident Fund registration', status: 'VERIFIED', documents: [{ id: 'doc-08', bidId: 'bid-001', complianceRequirementId: 'req-08', fileName: 'EPFO_Certificate.pdf', fileType: 'application/pdf', fileSize: 320000, uploadedAt: '2026-08-26T09:15:00+05:30', status: 'VERIFIED', downloadUrl: '#' }] },
          { id: 'req-09', stageId: 'stage-02', title: 'ESIC Compliance', description: 'Employees State Insurance registration', status: 'VERIFIED', documents: [{ id: 'doc-09', bidId: 'bid-001', complianceRequirementId: 'req-09', fileName: 'ESIC_Certificate.pdf', fileType: 'application/pdf', fileSize: 280000, uploadedAt: '2026-08-26T09:20:00+05:30', status: 'VERIFIED', downloadUrl: '#' }] },
          { id: 'req-10', stageId: 'stage-02', title: 'NSIC Registration', description: 'National Small Industries Corporation registration', status: 'VERIFIED', documents: [{ id: 'doc-10', bidId: 'bid-001', complianceRequirementId: 'req-10', fileName: 'NSIC_Certificate.pdf', fileType: 'application/pdf', fileSize: 190000, uploadedAt: '2026-08-26T09:25:00+05:30', status: 'VERIFIED', downloadUrl: '#' }] },
          { id: 'req-11', stageId: 'stage-02', title: 'DigiLocker Verification', description: 'Documents verified through DigiLocker', status: 'VERIFIED', documents: [] },
          { id: 'req-12', stageId: 'stage-02', title: 'Blacklisting Check', description: 'Debarment/blacklisting registry check', status: 'VERIFIED', documents: [] },
          { id: 'req-13', stageId: 'stage-02', title: 'Make in India Compliance', description: 'Local content requirement verification', status: 'VERIFIED', documents: [] },
        ],
      },
      {
        id: 'stage-03',
        assessmentId: 'ca-001',
        title: 'Technical Compliance',
        order: 3,
        status: 'REVIEW_REQUIRED',
        requirements: [
          { id: 'req-14', stageId: 'stage-03', title: 'Technical Proposal', description: 'Complete technical approach document', status: 'VERIFIED', documents: [{ id: 'doc-11', bidId: 'bid-001', complianceRequirementId: 'req-14', fileName: 'Technical_Proposal.pdf', fileType: 'application/pdf', fileSize: 4200000, uploadedAt: '2026-08-28T10:00:00+05:30', status: 'VERIFIED', downloadUrl: '#' }] },
          { id: 'req-15', stageId: 'stage-03', title: 'Past Experience', description: 'Relevant project experience certificates', status: 'VERIFIED', documents: [{ id: 'doc-12', bidId: 'bid-001', complianceRequirementId: 'req-15', fileName: 'Experience_Certificates.pdf', fileType: 'application/pdf', fileSize: 3100000, uploadedAt: '2026-08-28T10:10:00+05:30', status: 'VERIFIED', downloadUrl: '#' }] },
          { id: 'req-16', stageId: 'stage-03', title: 'Quality Certifications', description: 'ISO/BIS quality certifications', status: 'VERIFIED', documents: [{ id: 'doc-13', bidId: 'bid-001', complianceRequirementId: 'req-16', fileName: 'ISO_9001.pdf', fileType: 'application/pdf', fileSize: 520000, uploadedAt: '2026-08-28T10:15:00+05:30', status: 'VERIFIED', downloadUrl: '#' }] },
          { id: 'req-17', stageId: 'stage-03', title: 'Equipment Specifications', description: 'Detailed equipment specs matching tender requirements', status: 'VERIFIED', documents: [{ id: 'doc-14', bidId: 'bid-001', complianceRequirementId: 'req-17', fileName: 'Equipment_Specs.pdf', fileType: 'application/pdf', fileSize: 2800000, uploadedAt: '2026-08-28T10:20:00+05:30', status: 'VERIFIED', downloadUrl: '#' }] },
          { id: 'req-18', stageId: 'stage-03', title: 'Manpower Deployment Plan', description: 'Team structure and key personnel CVs', status: 'VERIFIED', documents: [{ id: 'doc-15', bidId: 'bid-001', complianceRequirementId: 'req-18', fileName: 'Deployment_Plan.pdf', fileType: 'application/pdf', fileSize: 1500000, uploadedAt: '2026-08-28T10:25:00+05:30', status: 'VERIFIED', downloadUrl: '#' }] },
          { id: 'req-19', stageId: 'stage-03', title: 'Project Timeline', description: 'Implementation schedule and milestones', status: 'VERIFIED', documents: [{ id: 'doc-16', bidId: 'bid-001', complianceRequirementId: 'req-19', fileName: 'Project_Timeline.pdf', fileType: 'application/pdf', fileSize: 890000, uploadedAt: '2026-08-28T10:30:00+05:30', status: 'VERIFIED', downloadUrl: '#' }] },
          { id: 'req-20', stageId: 'stage-03', title: 'OEM Authorization', description: 'Original Equipment Manufacturer authorization letter', status: 'NOT_COMPLIANT', verificationMessage: 'Required OEM authorization evidence was not found in the uploaded document. The letter must be on OEM letterhead and specifically reference this tender.', documents: [{ id: 'doc-17', bidId: 'bid-001', complianceRequirementId: 'req-20', fileName: 'OEM_Auth_Draft.pdf', fileType: 'application/pdf', fileSize: 340000, uploadedAt: '2026-08-28T10:35:00+05:30', status: 'NOT_COMPLIANT', verificationMessage: 'Document does not contain valid OEM authorization', downloadUrl: '#' }] },
        ],
      },
      {
        id: 'stage-04',
        assessmentId: 'ca-001',
        title: 'Financial Compliance',
        order: 4,
        status: 'VERIFIED',
        requirements: [
          { id: 'req-21', stageId: 'stage-04', title: 'Audited Financial Statements', description: 'Last 3 years audited balance sheet and P&L', status: 'VERIFIED', documents: [{ id: 'doc-18', bidId: 'bid-001', complianceRequirementId: 'req-21', fileName: 'Audited_Financials.pdf', fileType: 'application/pdf', fileSize: 5600000, uploadedAt: '2026-08-29T09:00:00+05:30', status: 'VERIFIED', downloadUrl: '#' }] },
          { id: 'req-22', stageId: 'stage-04', title: 'Turnover Certificate', description: 'CA-certified turnover certificate', status: 'VERIFIED', documents: [{ id: 'doc-19', bidId: 'bid-001', complianceRequirementId: 'req-22', fileName: 'Turnover_Certificate.pdf', fileType: 'application/pdf', fileSize: 420000, uploadedAt: '2026-08-29T09:10:00+05:30', status: 'VERIFIED', downloadUrl: '#' }] },
          { id: 'req-23', stageId: 'stage-04', title: 'EMD/Bid Security', description: 'Earnest Money Deposit or Bank Guarantee', status: 'VERIFIED', documents: [{ id: 'doc-20', bidId: 'bid-001', complianceRequirementId: 'req-23', fileName: 'EMD_BankGuarantee.pdf', fileType: 'application/pdf', fileSize: 310000, uploadedAt: '2026-08-29T09:15:00+05:30', status: 'VERIFIED', downloadUrl: '#' }] },
          { id: 'req-24', stageId: 'stage-04', title: 'Solvency Certificate', description: 'Bank solvency certificate', status: 'VERIFIED', documents: [{ id: 'doc-21', bidId: 'bid-001', complianceRequirementId: 'req-24', fileName: 'Solvency_Certificate.pdf', fileType: 'application/pdf', fileSize: 180000, uploadedAt: '2026-08-29T09:20:00+05:30', status: 'VERIFIED', downloadUrl: '#' }] },
        ],
      },
      {
        id: 'stage-05',
        assessmentId: 'ca-001',
        title: 'Final Verification',
        order: 5,
        status: 'REVIEW_REQUIRED',
        requirements: [
          { id: 'req-25', stageId: 'stage-05', title: 'Cross-Reference Check', description: 'AI cross-reference verification of all submitted documents', status: 'REVIEW_REQUIRED', verificationMessage: '1 document flagged for OEM authorization — requires manual review by procurement officer.', documents: [] },
        ],
      },
    ],
  },
];
