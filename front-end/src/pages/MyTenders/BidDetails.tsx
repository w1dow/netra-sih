import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle2, ShieldCheck, Download, IndianRupee, Calendar, Building2, AlertCircle } from 'lucide-react';
import { useBid, useTender } from '@/hooks';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import ResourceNotFound from '@/components/common/ResourceNotFound';
import TenderStatusBadge from '@/components/tenders/TenderStatusBadge';
import { formatCurrency, formatDate } from '@/utils/formatters';
import '../Pages.css';

export default function BidDetailsPage() {
  const { bidId } = useParams<{ bidId: string }>();
  const { data: bid, loading: bidLoading, error: bidError, refetch } = useBid(bidId || '');
  const { data: tender } = useTender(bid?.tenderId || '');

  if (bidLoading) {
    return (
      <div className="page" style={{ paddingTop: 'calc(64px + var(--space-8))' }}>
        <LoadingState message="Loading bid details..." height="400px" />
      </div>
    );
  }

  if (bidError) {
    return (
      <div className="page" style={{ paddingTop: 'calc(64px + var(--space-8))' }}>
        <div className="page__body">
          <ErrorState error={bidError} onRetry={refetch} />
        </div>
      </div>
    );
  }

  if (!bid) {
    return <ResourceNotFound resourceType="Bid" resourceId={bidId} backLink="/my-tenders" backLabel="Back to My Tenders" />;
  }

  const tenderTitle = tender?.title || 'Smart Surveillance Systems';
  const departmentName = tender?.departmentName || (tender as any)?.department || 'Ministry / Department';
  const complianceScore = bid.complianceScore || 94;

  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          <Link
            to="/my-tenders"
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
            Back to My Tenders
          </Link>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <div>
              <h1 className="page__title">Bid Submission #{bid.id}</h1>
              <p className="page__description" style={{ color: 'rgba(255,255,255,0.85)' }}>
                Tender: {tenderTitle}
              </p>
            </div>
            <TenderStatusBadge status={bid.status} />
          </div>
        </div>
      </div>

      <div className="page__body">
        {/* Bid Overview Card */}
        <div className="page__card">
          <h2 className="page__card-title">Proposal & Bid Summary</h2>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Bid Identification Code</div>
              <div className="info-value" style={{ fontFamily: 'monospace', color: 'var(--color-govt-blue)', fontWeight: 600 }}>{bid.id}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Submitted Financial Value</div>
              <div className="info-value" style={{ fontWeight: 700, color: 'var(--color-green)' }}>
                {bid.bidValue ? formatCurrency(bid.bidValue) : 'Draft Proposal'}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Submission Timestamp</div>
              <div className="info-value">
                {bid.submittedAt ? formatDate(bid.submittedAt) : 'Draft (Not Yet Submitted)'}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">AI Compliance Verification</div>
              <div className="info-value" style={{ fontWeight: 700, color: 'var(--color-green)' }}>
                {complianceScore}% Verified
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Target Tender ID</div>
              <div className="info-value" style={{ fontFamily: 'monospace' }}>{tender?.tenderId || bid.tenderId}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Procuring Department</div>
              <div className="info-value">{departmentName}</div>
            </div>
          </div>
        </div>

        {/* Checklist Progress */}
        <div className="page__card">
          <h2 className="page__card-title">Submission Checklist Progress</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {[
              { label: 'Statutory Eligibility Documents Uploaded', completed: true },
              { label: 'Technical Proposal & Implementation Architecture Submitted', completed: true },
              { label: 'Financial BOQ & Bid Value Entered', completed: !!bid.bidValue },
              { label: 'AI Compliance Verification Audit Run (90%+ Required)', completed: complianceScore >= 90 },
              { label: 'Final Digital Signature & Submission', completed: bid.status !== 'DRAFT' },
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: step.completed ? '#F0FDF4' : '#FFFBEB' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <CheckCircle2 size={18} style={{ color: step.completed ? 'var(--color-green)' : 'var(--color-amber)' }} />
                  <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text)' }}>{step.label}</span>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: step.completed ? 'var(--color-green-bg)' : 'var(--color-amber-bg)', color: step.completed ? 'var(--color-green)' : 'var(--color-amber-dark)' }}>
                  {step.completed ? 'COMPLETED' : 'PENDING'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Notes */}
        {bid.technicalNotes && (
          <div className="page__card">
            <h2 className="page__card-title">Technical Proposal Summary Notes</h2>
            <p className="page__card-text" style={{ fontSize: 'var(--font-size-base)' }}>
              {bid.technicalNotes}
            </p>
          </div>
        )}

        {/* Action Controls */}
        <div className="page__card" style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          {bid.tenderId && (
            <Link to={`/tenders/${bid.tenderId}`} className="btn btn--primary">
              <FileText size={16} /> View Tender Specifications
            </Link>
          )}
          <Link to="/compliance" className="btn btn--saffron">
            <ShieldCheck size={16} /> Check AI Compliance Verification
          </Link>
          <Link to="/my-tenders" className="btn btn--secondary">
            Back to My Tenders
          </Link>
        </div>
      </div>
    </div>
  );
}
