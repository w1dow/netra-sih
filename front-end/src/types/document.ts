export type DocumentStatus = 'VERIFIED' | 'REVIEW_REQUIRED' | 'NOT_COMPLIANT' | 'PENDING';

export interface Document {
  id: string;
  bidId: string;
  complianceRequirementId?: string;
  fileName: string;
  fileType: string;
  fileSize?: number;
  uploadedAt: string;
  status: DocumentStatus;
  verificationStatus?: DocumentStatus;
  verificationMessage?: string;
  downloadUrl?: string;
  evidence?: string;
}
