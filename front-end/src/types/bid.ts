export type BidStatus = 'DRAFT' | 'SUBMITTED' | 'UNDER_EVALUATION' | 'AWARDED' | 'REJECTED' | 'CLOSED';

export interface Bid {
  id: string;
  tenderId: string;
  bidderCompanyId: string;
  bidValue?: number;
  status: BidStatus;
  complianceScore?: number;
  submittedAt?: string;
  createdAt: string;
  updatedAt: string;
  isEditable?: boolean;
  allowedActions?: string[];
  technicalNotes?: string;
}
