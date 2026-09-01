// ============================================================
// NETRA — Sample / Mock Data
// Centralized data for all components
// ============================================================

import type {
  Tender,
  Department,
  ProcurementCategory,
  ComplianceCheck,
  ComplianceWorkflowStep,
  Statistic,
  TrustPillar,
  UserProfile,
  FilterOption,
  NavLink,
  FooterSection,
} from '@/types';

// ----- Navigation Links -----
export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Active Tenders', href: '/tenders' },
  { label: 'My Tenders', href: '/my-tenders' },
  { label: 'Bidders', href: '/bidders' },
  { label: 'Compliance', href: '/compliance' },
  { label: 'Analytics', href: '/analytics' },
];

export const currentUser: UserProfile = {
  name: 'Rajesh Kumar',
  role: 'Business Development Manager\nAuthorised Bid Representative',
  department: 'ABC Technologies Pvt. Ltd.',
  email: 'rajesh.kumar@abctech.in',
  avatar: '',
};

// ----- Key Statistics -----
export const statistics: Statistic[] = [
  { id: 'stat-1', value: '12,480', label: 'Active Tenders', icon: 'FileText', accentColor: 'var(--color-govt-blue)' },
  { id: 'stat-2', value: '8,932', label: 'Bids Evaluated', icon: 'CheckCircle', accentColor: 'var(--color-green)' },
  { id: 'stat-3', value: '96.4%', label: 'Compliance Accuracy', icon: 'ShieldCheck', accentColor: 'var(--color-saffron)' },
  { id: 'stat-4', value: '2,341', label: 'Registered Bidders', icon: 'Users', accentColor: 'var(--color-govt-blue)' },
  { id: 'stat-5', value: '18,760', label: 'Documents Verified', icon: 'FileCheck', accentColor: 'var(--color-green)' },
  { id: 'stat-6', value: '42%', label: 'Reduction in Manual Review', icon: 'TrendingDown', accentColor: 'var(--color-saffron)' },
];

// ----- Departments -----
export const departments: Department[] = [
  { id: 'dept-1', name: 'Ministry of Electronics & IT', shortName: 'MeitY' },
  { id: 'dept-2', name: 'Ministry of Defence', shortName: 'MoD' },
  { id: 'dept-3', name: 'Ministry of Health & Family Welfare', shortName: 'MoHFW' },
  { id: 'dept-4', name: 'Ministry of Road Transport & Highways', shortName: 'MoRTH' },
  { id: 'dept-5', name: 'Ministry of Railways', shortName: 'MoR' },
  { id: 'dept-6', name: 'Ministry of New & Renewable Energy', shortName: 'MNRE' },
  { id: 'dept-7', name: 'Ministry of Education', shortName: 'MoE' },
  { id: 'dept-8', name: 'Ministry of Housing & Urban Affairs', shortName: 'MoHUA' },
];

// ----- Active Tenders -----
export const tenders: Tender[] = [
  {
    id: '1',
    tenderId: 'GEM/2026/PROC/01842',
    title: 'Supply and Installation of Smart Surveillance Systems',
    department: 'Ministry of Electronics & IT',
    location: 'New Delhi',
    bidDeadline: '12 Sep 2026, 17:00',
    estimatedValue: '₹2.4 Cr',
    status: 'ACTIVE',
    category: 'IT & Electronics',
    description: 'Procurement of AI-enabled smart surveillance camera systems with edge computing capabilities for government premises security enhancement.',
  },
  {
    id: '2',
    tenderId: 'GEM/2026/PROC/01856',
    title: 'Construction of Six-Lane National Highway NH-48 Extension',
    department: 'Ministry of Road Transport & Highways',
    location: 'Gujarat',
    bidDeadline: '18 Sep 2026, 15:00',
    estimatedValue: '₹186 Cr',
    status: 'ACTIVE',
    category: 'Infrastructure',
    description: 'Design, construction, and maintenance of six-lane highway extension with service roads, toll plazas, and intelligent traffic management systems.',
  },
  {
    id: '3',
    tenderId: 'GEM/2026/PROC/01873',
    title: 'Procurement of Modular ICU Equipment for District Hospitals',
    department: 'Ministry of Health & Family Welfare',
    location: 'Multiple States',
    bidDeadline: '25 Sep 2026, 12:00',
    estimatedValue: '₹45.8 Cr',
    status: 'ACTIVE',
    category: 'Healthcare',
    description: 'Supply, installation, and commissioning of modular ICU setups including ventilators, patient monitors, and infusion systems for 120 district hospitals.',
  },
  {
    id: '4',
    tenderId: 'GEM/2026/PROC/01901',
    title: 'Armoured Vehicle Fleet Maintenance Contract',
    department: 'Ministry of Defence',
    location: 'Pune',
    bidDeadline: '30 Sep 2026, 14:00',
    estimatedValue: '₹320 Cr',
    status: 'ACTIVE',
    category: 'Defence & Security',
    description: 'Comprehensive annual maintenance contract for armoured vehicle fleet including spare parts supply, overhaul services, and field maintenance support.',
  },
  {
    id: '5',
    tenderId: 'GEM/2026/PROC/01915',
    title: 'Solar Power Plant Installation — 50MW Capacity',
    department: 'Ministry of New & Renewable Energy',
    location: 'Rajasthan',
    bidDeadline: '05 Oct 2026, 17:00',
    estimatedValue: '₹210 Cr',
    status: 'ACTIVE',
    category: 'Energy',
    description: 'Engineering, procurement, and construction of a 50MW ground-mounted solar photovoltaic power plant with 25-year power purchase agreement.',
  },
  {
    id: '6',
    tenderId: 'GEM/2026/PROC/01928',
    title: 'Metro Rail Signalling System Upgrade — Phase III',
    department: 'Ministry of Housing & Urban Affairs',
    location: 'Bangalore',
    bidDeadline: '10 Oct 2026, 16:00',
    estimatedValue: '₹95.2 Cr',
    status: 'ACTIVE',
    category: 'Transportation',
    description: 'Upgrade of existing CBTC signalling system to next-generation GoA4 communication-based train control for Namma Metro Phase III corridors.',
  },
  {
    id: '7',
    tenderId: 'GEM/2026/PROC/01934',
    title: 'National Digital Education Platform Development',
    department: 'Ministry of Education',
    location: 'New Delhi',
    bidDeadline: '15 Oct 2026, 15:00',
    estimatedValue: '₹38.5 Cr',
    status: 'ACTIVE',
    category: 'IT & Electronics',
    description: 'Development and deployment of a scalable national digital education platform supporting 10 million concurrent users with multilingual content delivery.',
  },
  {
    id: '8',
    tenderId: 'GEM/2026/PROC/01947',
    title: 'Railway Station Modernisation — Tier-II Cities',
    department: 'Ministry of Railways',
    location: 'Multiple Cities',
    bidDeadline: '20 Oct 2026, 17:00',
    estimatedValue: '₹156 Cr',
    status: 'UPCOMING',
    category: 'Infrastructure',
    description: 'Comprehensive modernisation of 15 railway stations including platform upgrades, passenger amenities, accessibility features, and smart station management.',
  },
  {
    id: '9',
    tenderId: 'GEM/2026/PROC/01953',
    title: 'Telemedicine Infrastructure for Primary Health Centres',
    department: 'Ministry of Health & Family Welfare',
    location: 'Madhya Pradesh',
    bidDeadline: '08 Sep 2026, 12:00',
    estimatedValue: '₹12.6 Cr',
    status: 'UNDER EVALUATION',
    category: 'Healthcare',
    description: 'Establishment of telemedicine hubs in 200 primary health centres with video conferencing equipment, diagnostic devices, and cloud-based health records.',
  },
];

// ----- Procurement Categories -----
export const procurementCategories: ProcurementCategory[] = [
  { id: 'cat-1', name: 'Infrastructure', icon: 'Building2', activeTenders: 2156 },
  { id: 'cat-2', name: 'IT & Electronics', icon: 'Monitor', activeTenders: 1842 },
  { id: 'cat-3', name: 'Healthcare', icon: 'Heart', activeTenders: 1534 },
  { id: 'cat-4', name: 'Defence & Security', icon: 'Shield', activeTenders: 987 },
  { id: 'cat-5', name: 'Transportation', icon: 'Train', activeTenders: 1245 },
  { id: 'cat-6', name: 'Education', icon: 'GraduationCap', activeTenders: 1120 },
  { id: 'cat-7', name: 'Energy', icon: 'Zap', activeTenders: 1678 },
  { id: 'cat-8', name: 'Public Works', icon: 'HardHat', activeTenders: 1918 },
];

// ----- Compliance Checks -----
export const complianceChecks: ComplianceCheck[] = [
  { id: 'cc-1', name: 'GST Registration', status: 'compliant', description: 'Goods and Services Tax registration verified' },
  { id: 'cc-2', name: 'PAN Verification', status: 'compliant', description: 'Permanent Account Number validation complete' },
  { id: 'cc-3', name: 'Udyam / MSME Registration', status: 'compliant', description: 'Micro, Small & Medium Enterprise registration verified' },
  { id: 'cc-4', name: 'Income Tax / ITR Compliance', status: 'compliant', description: 'Income tax returns filed and verified for last 3 years' },
  { id: 'cc-5', name: 'EPFO / ESIC Compliance', status: 'review', description: 'Employee provident fund and state insurance records under review' },
  { id: 'cc-6', name: 'Startup India', status: 'compliant', description: 'DPIIT recognised startup registration verified' },
  { id: 'cc-7', name: 'NSIC Registration', status: 'compliant', description: 'National Small Industries Corporation registration active' },
  { id: 'cc-8', name: 'OEM Authorization', status: 'review', description: 'Original Equipment Manufacturer authorization letter pending verification' },
  { id: 'cc-9', name: 'Make in India / Local Content', status: 'compliant', description: 'Local content requirements meet minimum threshold' },
  { id: 'cc-10', name: 'Blacklisting / Debarment', status: 'non-compliant', description: 'Entity flagged in debarment registry — manual review required' },
  { id: 'cc-11', name: 'DigiLocker Verification', status: 'compliant', description: 'Digital document locker verification completed successfully' },
];

// ----- Compliance Workflow Steps -----
export const complianceWorkflowSteps: ComplianceWorkflowStep[] = [
  { id: 'step-1', title: 'DOCUMENT UPLOAD', description: 'Bidder uploads required statutory and technical documents', icon: 'Upload' },
  { id: 'step-2', title: 'AI DOCUMENT ANALYSIS', description: 'AI extracts key information, clauses and evidence from submitted documents', icon: 'Scan' },
  { id: 'step-3', title: 'COMPLIANCE & RISK ASSESSMENT', description: 'Requirements are verified and potential compliance gaps and risks are identified', icon: 'ShieldCheck' },
  { id: 'step-4', title: 'OFFICER DECISION', description: 'Procurement officer reviews AI findings and makes the final decision', icon: 'UserCheck' },
];

// ----- Trust / Transparency Pillars -----
export const trustPillars: TrustPillar[] = [
  {
    id: 'tp-1',
    title: 'Secure Document Processing',
    description: 'Sensitive bidder documents are processed through controlled digital workflows with encryption and access controls.',
    icon: 'Lock',
  },
  {
    id: 'tp-2',
    title: 'AI-Assisted Verification',
    description: 'AI identifies relevant evidence, compliance gaps and potential risks from bidder documentation.',
    icon: 'Brain',
  },
  {
    id: 'tp-3',
    title: 'Audit-Ready Decisions',
    description: 'Every verification step and finding is logged and traceable end-to-end, with full compliance reports available for download.',
    icon: 'ClipboardCheck',
  },
  {
    id: 'tp-4',
    title: 'Human-in-the-Loop Approval',
    description: 'Final procurement decisions remain with the authorised procurement officer at all times.',
    icon: 'UserCheck',
  },
];

// ----- Filter Options -----
export const departmentOptions: FilterOption[] = [
  { value: '', label: 'All Departments' },
  ...departments.map(d => ({ value: d.name, label: d.name })),
];

export const categoryOptions: FilterOption[] = [
  { value: '', label: 'All Categories' },
  { value: 'Infrastructure', label: 'Infrastructure' },
  { value: 'IT & Electronics', label: 'IT & Electronics' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Defence & Security', label: 'Defence & Security' },
  { value: 'Transportation', label: 'Transportation' },
  { value: 'Education', label: 'Education' },
  { value: 'Energy', label: 'Energy' },
  { value: 'Public Works', label: 'Public Works' },
];

export const locationOptions: FilterOption[] = [
  { value: '', label: 'All Locations' },
  { value: 'New Delhi', label: 'New Delhi' },
  { value: 'Gujarat', label: 'Gujarat' },
  { value: 'Multiple States', label: 'Multiple States' },
  { value: 'Pune', label: 'Pune' },
  { value: 'Rajasthan', label: 'Rajasthan' },
  { value: 'Bangalore', label: 'Bangalore' },
  { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
  { value: 'Multiple Cities', label: 'Multiple Cities' },
];

export const tenderValueOptions: FilterOption[] = [
  { value: '', label: 'Any Value' },
  { value: 'under-10', label: 'Under ₹10 Cr' },
  { value: '10-50', label: '₹10 Cr — ₹50 Cr' },
  { value: '50-100', label: '₹50 Cr — ₹100 Cr' },
  { value: '100-200', label: '₹100 Cr — ₹200 Cr' },
  { value: 'above-200', label: 'Above ₹200 Cr' },
];

export const statusOptions: FilterOption[] = [
  { value: '', label: 'All Statuses' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'UPCOMING', label: 'Upcoming' },
  { value: 'UNDER EVALUATION', label: 'Under Evaluation' },
  { value: 'CLOSED', label: 'Closed' },
];

// ----- Footer -----
export const footerSections: FooterSection[] = [
  {
    title: 'Platform',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Active Tenders', href: '/tenders' },
      { label: 'Bidders', href: '/bidders' },
      { label: 'Compliance', href: '/compliance' },
      { label: 'Analytics', href: '/analytics' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'User Guide', href: '/resources/guide' },
      { label: 'Procurement Guidelines', href: '/resources/guidelines' },
      { label: 'FAQs', href: '/resources/faqs' },
      { label: 'Help Centre', href: '/resources/help' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Terms of Use', href: '/legal/terms' },
      { label: 'Data Security', href: '/legal/security' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Support', href: '/contact/support' },
      { label: 'Grievance', href: '/contact/grievance' },
      { label: 'Technical Help', href: '/contact/technical' },
    ],
  },
];

// ----- Quick Actions -----
export const quickActions = [
  { label: 'Browse Active Tenders', href: '/tenders', icon: 'FileText' },
  { label: 'Create New Tender', href: '/tenders/create', icon: 'FilePlus' },
  { label: 'Check Bid Compliance', href: '/compliance', icon: 'ShieldCheck' },
  { label: 'View Evaluations', href: '/evaluations', icon: 'BarChart3' },
];
