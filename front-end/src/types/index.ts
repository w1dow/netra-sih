// ============================================================
// NETRA — TypeScript Types & Interfaces
// ============================================================

export interface Tender {
  id: string;
  tenderId: string;
  title: string;
  department: string;
  location: string;
  bidDeadline: string;
  estimatedValue: string;
  status: 'ACTIVE' | 'CLOSED' | 'UPCOMING' | 'UNDER EVALUATION';
  category: string;
  description: string;
}

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

export interface ComplianceCheck {
  id: string;
  name: string;
  status: 'compliant' | 'review' | 'non-compliant';
  description: string;
}

export interface ComplianceWorkflowStep {
  id: string;
  title: string;
  description: string;
  icon: string;
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

export interface UserProfile {
  name: string;
  role: string;
  department: string;
  email: string;
  avatar: string;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface TenderFilters {
  department: string;
  category: string;
  location: string;
  tenderValue: string;
  closingDate: string;
  status: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}
