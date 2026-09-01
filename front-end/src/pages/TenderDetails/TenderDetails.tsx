import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  IndianRupee,
  Building2,
  ArrowLeft,
  Download,
  FileText,
  ShieldCheck,
  CheckCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { useTender } from '@/hooks';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import ResourceNotFound from '@/components/common/ResourceNotFound';
import TenderStatusBadge from '@/components/tenders/TenderStatusBadge';
import { formatCurrency, formatDate } from '@/utils/formatters';
import '../Pages.css';

export default function TenderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: tender, loading, error, refetch } = useTender(id || '');
  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'documents'>('overview');

  if (loading) {
    return (
      <div className="page" style={{ paddingTop: 'calc(64px + var(--space-8))' }}>
        <LoadingState message="Loading tender details..." height="400px" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page" style={{ paddingTop: 'calc(64px + var(--space-8))' }}>
        <div className="page__body">
          <ErrorState error={error} onRetry={refetch} />
        </div>
      </div>
    );
  }

  if (!tender) {
    return <ResourceNotFound resourceType="Tender" resourceId={id} backLink="/tenders" backLabel="Back to Active Tenders" />;
  }

  const departmentName = tender.departmentName || (tender as any).department || 'Government Department';
  const categoryName = tender.categoryName || (tender as any).category || 'General';
  const deadlineText = formatDate(tender.deadline || (tender as any).bidDeadline);
  const valueText = formatCurrency(tender.estimatedValue);

  return (
    <div className="page">
      {/* Header */}
      <div className="page__header">
        <div className="page__header-inner">
          <Link
            to="/tenders"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'rgba(255,255,255,0.7)',
              fontSize: 'var(--font-size-sm)',
              marginBottom: 'var(--space-3)',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={14} />
            Back to Active Tenders
          </Link>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <div>
              <h1 className="page__title">{tender.title}</h1>
              <p className="page__description" style={{ fontFamily: 'monospace', letterSpacing: '0.04em' }}>
                TENDER ID: {tender.tenderId}
              </p>
            </div>
            <TenderStatusBadge status={tender.status} />
          </div>
        </div>
      </div>

      <div className="page__body">
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: 'var(--space-2)', borderBottom: '1px solid var(--color-border)', marginBottom: 'var(--space-6)' }}>
          {[
            { id: 'overview', label: 'Tender Overview' },
            { id: 'eligibility', label: 'Eligibility & Technical Requirements' },
            { id: 'documents', label: 'Required Documents & Bid Submission' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: 'var(--space-3) var(--space-5)',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: 'var(--font-size-sm)',
                color: activeTab === tab.id ? 'var(--color-govt-blue)' : 'var(--color-text-secondary)',
                borderBottom: activeTab === tab.id ? '3px solid var(--color-govt-blue)' : '3px solid transparent',
                background: 'none',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <>
            <div className="page__card">
              <h2 className="page__card-title">General Specifications</h2>
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-label">Issuing Department</div>
                  <div className="info-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Building2 size={16} style={{ color: 'var(--color-govt-blue)' }} />
                    {departmentName}
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-label">Location / State</div>
                  <div className="info-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={16} style={{ color: 'var(--color-govt-blue)' }} />
                    {tender.location}
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-label">Submission Deadline</div>
                  <div className="info-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={16} style={{ color: 'var(--color-saffron)' }} />
                    {deadlineText}
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-label">Estimated Tender Value</div>
                  <div className="info-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--color-green)' }}>
                    <IndianRupee size={16} />
                    {valueText}
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-label">Procurement Category</div>
                  <div className="info-value">{categoryName}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Evaluation Mode</div>
                  <div className="info-value">Two-Stage AI & Officer Evaluation</div>
                </div>
              </div>
            </div>

            <div className="page__card">
              <h2 className="page__card-title">Scope of Work & Description</h2>
              <p className="page__card-text" style={{ fontSize: 'var(--font-size-base)', lineHeight: 1.7 }}>
                {tender.description}
              </p>
            </div>
          </>
        )}

        {/* TAB 2: ELIGIBILITY */}
        {activeTab === 'eligibility' && (
          <div className="page__card">
            <h2 className="page__card-title">Eligibility Criteria & Qualifications</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {[
                'Registered Indian entity with minimum 3 years of operation in relevant sector',
                'Valid GSTIN, PAN, and EPFO/ESIC registrations',
                'Average annual turnover of at least 30% of estimated tender value for last 3 financial years',
                'No record of debarment or blacklisting by any Central/State Government agency',
                'ISO 9001 quality management certification required',
                'OEM authorization letter required for core equipment components',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', padding: 'var(--space-3)', border: '1px solid var(--color-border-light)', borderRadius: 'var(--radius-md)' }}>
                  <CheckCircle size={18} style={{ color: 'var(--color-green)', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DOCUMENTS */}
        {activeTab === 'documents' && (
          <div className="page__card">
            <h2 className="page__card-title">Mandatory Submission Documents</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
              {[
                'Company Registration Certificate & Articles of Association',
                'Audited Financial Statements (Last 3 Financial Years)',
                'Technical Proposal & Implementation Schedule',
                'Original Equipment Manufacturer (OEM) Authorization Letter',
                'Earnest Money Deposit (EMD) / Bank Guarantee Proof',
                'Make in India Local Content Declaration',
              ].map((doc, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-white)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <FileText size={20} style={{ color: 'var(--color-govt-blue)' }} />
                    <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>{doc}</span>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: 'var(--color-amber-bg)', color: 'var(--color-amber-dark)' }}>
                    REQUIRED
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fixed Action Box */}
        <div className="page__card" style={{ background: 'linear-gradient(135deg, var(--color-deep-navy) 0%, var(--color-govt-blue) 100%)', color: 'var(--color-white)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <div>
              <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>Ready to Submit Your Bid?</h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.8)' }}>
                Verify bid compliance using NETRA AI engine before final submission.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <Link to="/my-tenders" className="btn btn--saffron">
                <FileSpreadsheet size={16} /> Submit Bid Proposal
              </Link>
              <Link to="/compliance" className="btn btn--secondary" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>
                <ShieldCheck size={16} /> Run Compliance Check
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
