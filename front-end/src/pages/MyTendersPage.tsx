import React, { useState } from 'react';
import { Search, Filter, ChevronRight, FileText, Download, Edit3, ArrowRight } from 'lucide-react';
import './Pages.css';

// Types for the bidder tenders
type BidStatus = 'DRAFT' | 'SUBMITTED' | 'UNDER EVALUATION' | 'AWARDED' | 'REJECTED' | 'CLOSED';

interface BidTender {
  id: string;
  title: string;
  department: string;
  value: string;
  submissionDate: string;
  deadline: string;
  compliance: number;
  status: BidStatus;
}

const myTendersData: BidTender[] = [
  {
    id: 'GEM/2026/PROC/01842',
    title: 'Supply and Installation of Smart Surveillance Systems',
    department: 'Ministry / Government Department',
    value: '₹2.4 Cr',
    submissionDate: '05 Sep 2026',
    deadline: '12 Sep 2026, 17:00',
    compliance: 94,
    status: 'UNDER EVALUATION',
  },
  {
    id: 'GEM/2026/IT/01721',
    title: 'Enterprise Network Infrastructure Upgrade',
    department: 'Ministry of Electronics & IT',
    value: '₹1.8 Cr',
    submissionDate: '21 Aug 2026',
    deadline: '28 Aug 2026',
    compliance: 98,
    status: 'SUBMITTED',
  },
  {
    id: 'GEM/2026/PROC/01934',
    title: 'National Digital Education Platform Development',
    department: 'Ministry of Education',
    value: '₹38.5 Cr',
    submissionDate: '-',
    deadline: '15 Oct 2026, 15:00',
    compliance: 85,
    status: 'DRAFT',
  },
  {
    id: 'GEM/2026/HEALTH/01589',
    title: 'Medical Equipment Procurement',
    department: 'Government Health Department',
    value: '₹3.2 Cr',
    submissionDate: '14 Aug 2026',
    deadline: '22 Aug 2026',
    compliance: 91,
    status: 'AWARDED',
  },
  {
    id: 'GEM/2026/TRANS/01342',
    title: 'Intelligent Traffic Monitoring System',
    department: 'Transport Department',
    value: '₹4.7 Cr',
    submissionDate: '02 Aug 2026',
    deadline: '15 Aug 2026',
    compliance: 82,
    status: 'CLOSED',
  },
];

const filters = ['All', 'Draft', 'Submitted', 'Under Evaluation', 'Awarded', 'Rejected', 'Closed'];

export default function MyTendersPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredTenders = myTendersData.filter(t => 
    activeFilter === 'All' ? true : t.status.toLowerCase() === activeFilter.toLowerCase()
  );

  const getStatusColor = (status: BidStatus) => {
    switch (status) {
      case 'DRAFT': return { bg: 'var(--color-light-bg)', color: 'var(--color-text-secondary)' };
      case 'SUBMITTED': return { bg: '#e0f2fe', color: '#0284c7' };
      case 'UNDER EVALUATION': return { bg: 'var(--color-amber-bg)', color: 'var(--color-amber)' };
      case 'AWARDED': return { bg: 'var(--color-green-bg)', color: 'var(--color-green)' };
      case 'REJECTED': return { bg: '#fee2e2', color: '#dc2626' };
      case 'CLOSED': return { bg: '#f1f5f9', color: '#64748b' };
      default: return { bg: 'var(--color-light-bg)', color: 'var(--color-text-secondary)' };
    }
  };

  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'var(--color-green)';
    if (score >= 70) return 'var(--color-amber)';
    return '#dc2626'; // Red
  };

  const renderAction = (status: BidStatus) => {
    switch (status) {
      case 'DRAFT': return <button className="btn btn--primary" style={{ padding: '4px 12px', fontSize: '12px' }}><Edit3 size={14} /> Continue</button>;
      case 'SUBMITTED': return <button className="btn btn--secondary" style={{ padding: '4px 12px', fontSize: '12px' }}><FileText size={14} /> View Bid</button>;
      case 'UNDER EVALUATION': return <button className="btn btn--secondary" style={{ padding: '4px 12px', fontSize: '12px' }}><ArrowRight size={14} /> Track Status</button>;
      case 'AWARDED': return <button className="btn btn--saffron" style={{ padding: '4px 12px', fontSize: '12px' }}><FileText size={14} /> Details</button>;
      case 'CLOSED':
      case 'REJECTED': return <button className="btn btn--secondary" style={{ padding: '4px 12px', fontSize: '12px' }}><FileText size={14} /> Details</button>;
      default: return null;
    }
  };

  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          <h1 className="page__title">My Tenders</h1>
          <p className="page__description">
            Track your company's tender participation, submissions and bid status.
          </p>
        </div>
      </div>
      <div className="page__body">
        
        {/* Summary Cards */}
        <div className="page__stats-grid" style={{ marginBottom: 'var(--space-8)' }}>
          {[
            { label: 'Tenders Participated', value: '12' },
            { label: 'Active Bids', value: '4' },
            { label: 'Under Evaluation', value: '3' },
            { label: 'Awarded', value: '2' },
            { label: 'Closed', value: '3' },
          ].map((stat, i) => (
            <div key={i} className="page__stat-card" style={{ padding: 'var(--space-4)' }}>
              <div className="page__stat-value" style={{ fontSize: 'var(--font-size-xl)' }}>{stat.value}</div>
              <div className="page__stat-label" style={{ fontSize: '10px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters Toolbar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1', minWidth: '280px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
              <input type="text" placeholder="Search by tender ID, title or department" style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: 'var(--font-size-sm)' }} />
            </div>
            <button className="btn btn--secondary" style={{ padding: '8px 16px' }}><Filter size={16} /> Filters</button>
          </div>
          
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {filters.map(f => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: '6px 16px',
                  borderRadius: '100px',
                  fontSize: '12px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  background: activeFilter === f ? 'var(--color-deep-navy)' : 'var(--color-light-bg)',
                  color: activeFilter === f ? 'var(--color-white)' : 'var(--color-text-secondary)',
                  border: `1px solid ${activeFilter === f ? 'var(--color-deep-navy)' : 'var(--color-border)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Tenders Table (Desktop) / Cards (Mobile) */}
        <div className="page__card" style={{ padding: 0, overflow: 'hidden' }}>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-size-sm)', minWidth: '900px' }}>
              <thead style={{ background: 'var(--color-light-bg)' }}>
                <tr>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--color-border-light)' }}>Tender ID</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--color-border-light)' }}>Tender Title & Department</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--color-border-light)' }}>Bid Value</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--color-border-light)' }}>Dates (Sub / Dead)</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--color-border-light)' }}>Compliance</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--color-border-light)' }}>Status</th>
                  <th style={{ padding: '16px', textAlign: 'right', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--color-border-light)' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTenders.map(t => {
                  const statusColors = getStatusColor(t.status);
                  return (
                    <tr key={t.id} style={{ borderBottom: '1px solid var(--color-border-light)', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ padding: '16px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--color-govt-blue)', verticalAlign: 'top' }}>{t.id}</td>
                      <td style={{ padding: '16px', verticalAlign: 'top', maxWidth: '300px' }}>
                        <div style={{ fontWeight: 600, color: 'var(--color-deep-navy)', marginBottom: '4px', lineHeight: '1.4' }}>{t.title}</div>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{t.department}</div>
                        
                        {/* Bid Progress (only for Draft/Submitted) */}
                        {(t.status === 'DRAFT' || t.status === 'SUBMITTED') && (
                           <div style={{ marginTop: '12px', display: 'flex', gap: '8px', alignItems: 'center', fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                             <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--color-green)' }}><CheckCircle size={10} /> Docs</span>
                             <ChevronRight size={10} style={{ opacity: 0.5 }} />
                             <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--color-green)' }}><CheckCircle size={10} /> Tech</span>
                             <ChevronRight size={10} style={{ opacity: 0.5 }} />
                             <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: t.status === 'SUBMITTED' ? 'var(--color-green)' : 'var(--color-text)' }}>{t.status === 'SUBMITTED' ? <CheckCircle size={10} /> : <div style={{width: 10, height: 10, borderRadius: '50%', border: '1px solid currentColor'}}></div>} Fin</span>
                           </div>
                        )}
                      </td>
                      <td style={{ padding: '16px', verticalAlign: 'top', fontWeight: 500 }}>{t.value}</td>
                      <td style={{ padding: '16px', verticalAlign: 'top', fontSize: '12px' }}>
                        <div><span style={{ color: 'var(--color-text-light)' }}>Sub:</span> {t.submissionDate}</div>
                        <div style={{ marginTop: '4px' }}><span style={{ color: 'var(--color-text-light)' }}>End:</span> {t.deadline.split(',')[0]}</div>
                      </td>
                      <td style={{ padding: '16px', verticalAlign: 'top', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-light-bg)', color: getComplianceColor(t.compliance), fontWeight: 700, fontSize: '12px', border: `2px solid ${getComplianceColor(t.compliance)}` }}>
                          {t.compliance}%
                        </div>
                      </td>
                      <td style={{ padding: '16px', verticalAlign: 'top' }}>
                        <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.04em', background: statusColors.bg, color: statusColors.color }}>
                          {t.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px', verticalAlign: 'top', textAlign: 'right' }}>
                        {renderAction(t.status)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {filteredTenders.length === 0 && (
              <div style={{ padding: '48px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                No tenders found matching the selected filters.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// A helper for inline icons if not imported
function CheckCircle({ size }: { size: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
}
