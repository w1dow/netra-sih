export type VerificationStatus = 'VERIFIED' | 'REVIEW_REQUIRED' | 'NOT_COMPLIANT' | 'PENDING';
export type RequirementStatus = VerificationStatus;

export interface ComplianceDocument {
  id: string;
  bidId: string;
  complianceRequirementId?: string;
  fileName: string;
  fileType: string;
  fileSize?: number;
  uploadedAt: string;
  status: VerificationStatus;
  verificationMessage?: string;
  downloadUrl?: string;
}

export interface ComplianceRequirement {
  id: string;
  stageId: string;
  title: string;
  description: string;
  status: RequirementStatus;
  verificationMessage?: string;
  documents: ComplianceDocument[];
}

export interface ComplianceStage {
  id: string;
  assessmentId: string;
  title: string;
  order: number;
  status: VerificationStatus;
  requirements: ComplianceRequirement[];
}

export interface ComplianceAssessment {
  id: string;
  bidId: string;
  tenderId: string;
  overallScore: number;
  status: VerificationStatus;
  stages: ComplianceStage[];
}
