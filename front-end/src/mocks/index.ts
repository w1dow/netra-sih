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
  { label: 'Compliance', href: '/compliance' },
  { label: 'Company', href: '/company' },
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
    departmentName: 'Ministry of Electronics & IT',
    location: 'New Delhi',
    deadline: '2026-09-12T17:00:00+05:30',
    estimatedValue: 24000000,
    status: 'ACTIVE',
    categoryName: 'IT & Electronics',
    description: 'Procurement of AI-enabled smart surveillance camera systems with edge computing capabilities for government premises security enhancement.',
  },
  {
    id: '2',
    tenderId: 'GEM/2026/PROC/01856',
    title: 'Construction of Six-Lane National Highway NH-48 Extension',
    departmentName: 'Ministry of Road Transport & Highways',
    location: 'Gujarat',
    deadline: '2026-09-18T15:00:00+05:30',
    estimatedValue: 1860000000,
    status: 'ACTIVE',
    categoryName: 'Infrastructure',
    description: 'Design, construction, and maintenance of six-lane highway extension with service roads, toll plazas, and intelligent traffic management systems.',
  },
  {
    id: '3',
    tenderId: 'GEM/2026/PROC/01873',
    title: 'Procurement of Modular ICU Equipment for District Hospitals',
    departmentName: 'Ministry of Health & Family Welfare',
    location: 'Multiple States',
    deadline: '2026-09-25T12:00:00+05:30',
    estimatedValue: 458000000,
    status: 'ACTIVE',
    categoryName: 'Healthcare',
    description: 'Supply, installation, and commissioning of modular ICU setups including ventilators, patient monitors, and infusion systems for 120 district hospitals.',
  },
  {
    id: '4',
    tenderId: 'GEM/2026/PROC/01901',
    title: 'Armoured Vehicle Fleet Maintenance Contract',
    departmentName: 'Ministry of Defence',
    location: 'Pune',
    deadline: '2026-09-30T14:00:00+05:30',
    estimatedValue: 3200000000,
    status: 'ACTIVE',
    categoryName: 'Defence & Security',
    description: 'Comprehensive annual maintenance contract for armoured vehicle fleet including spare parts supply, overhaul services, and field maintenance support.',
  },
  {
    id: '5',
    tenderId: 'GEM/2026/PROC/01915',
    title: 'Solar Power Plant Installation — 50MW Capacity',
    departmentName: 'Ministry of New & Renewable Energy',
    location: 'Rajasthan',
    deadline: '2026-10-05T17:00:00+05:30',
    estimatedValue: 2100000000,
    status: 'ACTIVE',
    categoryName: 'Energy',
    description: 'Engineering, procurement, and construction of a 50MW ground-mounted solar photovoltaic power plant with 25-year power purchase agreement.',
  },
  {
    id: '6',
    tenderId: 'GEM/2026/PROC/01928',
    title: 'Metro Rail Signalling System Upgrade — Phase III',
    departmentName: 'Ministry of Housing & Urban Affairs',
    location: 'Bangalore',
    deadline: '2026-10-10T16:00:00+05:30',
    estimatedValue: 952000000,
    status: 'ACTIVE',
    categoryName: 'Transportation',
    description: 'Upgrade of existing CBTC signalling system to next-generation GoA4 communication-based train control for Namma Metro Phase III corridors.',
  },
  {
    id: '7',
    tenderId: 'GEM/2026/PROC/01934',
    title: 'National Digital Education Platform Development',
    departmentName: 'Ministry of Education',
    location: 'New Delhi',
    deadline: '2026-10-15T15:00:00+05:30',
    estimatedValue: 385000000,
    status: 'ACTIVE',
    categoryName: 'IT & Electronics',
    description: 'Development and deployment of a scalable national digital education platform supporting 10 million concurrent users with multilingual content delivery.',
  },
  {
    id: '8',
    tenderId: 'GEM/2026/PROC/01947',
    title: 'Railway Station Modernisation — Tier-II Cities',
    departmentName: 'Ministry of Railways',
    location: 'Multiple Cities',
    deadline: '2026-10-20T17:00:00+05:30',
    estimatedValue: 1560000000,
    status: 'UPCOMING',
    categoryName: 'Infrastructure',
    description: 'Comprehensive modernisation of 15 railway stations including platform upgrades, passenger amenities, accessibility features, and smart station management.',
  },
  {
    id: '9',
    tenderId: 'GEM/2026/PROC/01953',
    title: 'Telemedicine Infrastructure for Primary Health Centres',
    departmentName: 'Ministry of Health & Family Welfare',
    location: 'Madhya Pradesh',
    deadline: '2026-09-08T12:00:00+05:30',
    estimatedValue: 126000000,
    status: 'UNDER_EVALUATION',
    categoryName: 'Healthcare',
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
      { label: 'Home', href: '/' },
      { label: 'Active Tenders', href: '/tenders' },
      { label: 'My Tenders', href: '/my-tenders' },
      { label: 'Compliance', href: '/compliance' },
      { label: 'Company Profile', href: '/company' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'User Guide', href: '/tenders' },
      { label: 'Procurement Guidelines', href: '/tenders' },
      { label: 'FAQs', href: '/compliance' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/' },
      { label: 'Terms of Use', href: '/' },
      { label: 'Data Security', href: '/' },
    ],
  },
];

// ----- Quick Actions -----
export const quickActions = [
  { label: 'Browse Active Tenders', href: '/tenders', icon: 'FileText' },
  { label: 'View My Bids', href: '/my-tenders', icon: 'FilePlus' },
  { label: 'Check Bid Compliance', href: '/compliance', icon: 'ShieldCheck' },
  { label: 'Company Credentials', href: '/company', icon: 'BarChart3' },
];
