import type {
  NavLink,
  FooterSection,
  Department,
  ProcurementCategory,
  FilterOption,
  Statistic,
  TrustPillar,
  ComplianceWorkflowStep,
} from './types';

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Active Tenders', href: '/tenders' },
  { label: 'My Tenders', href: '/my-tenders' },
  { label: 'Compliance', href: '/compliance' },
  { label: 'Company', href: '/company' },
];

export const statistics: Statistic[] = [
  { id: 'stat-1', value: '12,480', label: 'Active Tenders', icon: 'FileText', accentColor: 'var(--color-govt-blue)' },
  { id: 'stat-2', value: '8,932', label: 'Bids Evaluated', icon: 'CheckCircle', accentColor: 'var(--color-green)' },
  { id: 'stat-3', value: '96.4%', label: 'Compliance Accuracy', icon: 'ShieldCheck', accentColor: 'var(--color-saffron)' },
  { id: 'stat-4', value: '2,341', label: 'Registered Bidders', icon: 'Users', accentColor: 'var(--color-govt-blue)' },
  { id: 'stat-5', value: '18,760', label: 'Documents Verified', icon: 'FileCheck', accentColor: 'var(--color-green)' },
  { id: 'stat-6', value: '42%', label: 'Reduction in Manual Review', icon: 'TrendingDown', accentColor: 'var(--color-saffron)' },
];

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

export const complianceWorkflowSteps: ComplianceWorkflowStep[] = [
  { id: 'step-1', title: 'DOCUMENT UPLOAD', description: 'Bidder uploads required statutory and technical documents', icon: 'Upload' },
  { id: 'step-2', title: 'AI DOCUMENT ANALYSIS', description: 'AI extracts key information, clauses and evidence from submitted documents', icon: 'Scan' },
  { id: 'step-3', title: 'COMPLIANCE & RISK ASSESSMENT', description: 'Requirements are verified and potential compliance gaps and risks are identified', icon: 'ShieldCheck' },
  { id: 'step-4', title: 'OFFICER DECISION', description: 'Procurement officer reviews AI findings and makes the final decision', icon: 'UserCheck' },
];

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
      { label: 'Bidder Guidelines', href: '/tenders' },
      { label: 'Procurement Rules', href: '/tenders' },
      { label: 'FAQs & Help', href: '/compliance' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/' },
      { label: 'Terms of Service', href: '/' },
      { label: 'Data Security', href: '/' },
    ],
  },
];

export const quickActions = [
  { label: 'Browse Active Tenders', href: '/tenders', icon: 'FileText' },
  { label: 'View My Bids', href: '/my-tenders', icon: 'FilePlus' },
  { label: 'Check Bid Compliance', href: '/compliance', icon: 'ShieldCheck' },
  { label: 'Company Credentials', href: '/company', icon: 'BarChart3' },
];
