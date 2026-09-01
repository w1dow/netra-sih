export * from './auth';
export * from './user';
export * from './company';
export * from './tender';
export * from './bid';
export * from './compliance';
export * from './document';
export * from './notification';
export * from './calendar';
export * from './news';
export * from './api';

// UI Helper types
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

export interface UserProfile {
  name: string;
  role: string;
  department: string;
  email: string;
  avatar: string;
}

export interface ComplianceWorkflowStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ComplianceCheck {
  id: string;
  name: string;
  status: 'compliant' | 'review' | 'non-compliant';
  description: string;
}
