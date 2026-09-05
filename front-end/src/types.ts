// ============================================================
// NETRA — Centralized Data Models & TypeScript Interfaces
// ============================================================

export type TenderStatus = 'ACTIVE' | 'UPCOMING' | 'UNDER_EVALUATION' | 'UNDER EVALUATION' | 'AWARDED' | 'CLOSED';
export type BidStatus = 'DRAFT' | 'SUBMITTED' | 'UNDER_EVALUATION' | 'AWARDED' | 'REJECTED' | 'CLOSED';
export type VerificationStatus = 'VERIFIED' | 'REVIEW_REQUIRED' | 'NOT_COMPLIANT' | 'PENDING';
export type RequirementStatus = VerificationStatus;
export type UserRole = 'BIDDER' | 'PROCUREMENT_OFFICER' | 'ADMIN';
export type NotificationType =
  | 'COMPLIANCE_ACTION_REQUIRED'
  | 'TENDER_DEADLINE'
  | 'BID_SUBMITTED'
  | 'COMPLIANCE_COMPLETED'
  | 'TENDER_STATUS_UPDATED';

export interface Tender {
  id: string;
  tenderId: string;
  title: string;
  description: string;
  departmentId?: string;
  departmentName?: string;
  categoryId?: string;
  categoryName?: string;
  location: string;
  estimatedValue: number;
  currency?: string;
  deadline?: string;
  status: TenderStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface TenderFilters {
  department?: string;
  category?: string;
  location?: string;
  tenderValue?: string;
  closingDate?: string;
  status?: string;
  search?: string;
}

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

export interface Company {
  id: string;
  legalName: string;
  registrationNumber: string;
  gstin: string;
  pan: string;
  udyamNumber: string;
  category: string;
  address: string;
  verificationStatus: {
    registration: boolean;
    gst: boolean;
    pan: boolean;
    udyam: boolean;
    authorisedRep: boolean;
    bankDetails: boolean;
  };
  biddingStats?: {
    tendersParticipated: number;
    activeBids: number;
    completedBids: number;
    complianceScore: number;
    documentsVerified: number;
    riskStatus: 'LOW' | 'MEDIUM' | 'HIGH';
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  role: UserRole;
  companyId: string;
  avatar?: string;
  location?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  tenderId?: string;
  bidId?: string;
  read: boolean;
  createdAt: string;
}

export interface CalendarEvent {
  id: string;
  userId?: string;
  tenderId?: string;
  bidId?: string;
  type: 'TENDER_DEADLINE' | 'COMPLIANCE_DEADLINE' | 'DOCUMENT_DEADLINE' | 'EVALUATION_UPDATE' | 'TENDER_UPDATE';
  title: string;
  start: string;
  end?: string;
  description?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source?: string;
  publishedAt: string;
  url?: string;
  category?: string;
}

// UI Helper Types
export interface Department {
  id: string;
  name: string;
  shortName: string;
}

export interface ProcurementCategory {
  id: string;
  name: string;
  icon: string;
  activeTenders: number;
}

export interface Statistic {
  id: string;
  value: string;
  label: string;
  icon: string;
  accentColor: string;
}

export interface TrustPillar {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: NavLink[];
}

export interface ComplianceWorkflowStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  meta?: any;
  error?: {
    message: string;
    code?: string;
  };
}
