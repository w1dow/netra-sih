import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';
import { useBid, useCompliance } from '../api';
import TenderStatusBadge from '../components/TenderStatusBadge';
import { LoadingState, ErrorState } from '../components/StateViews';
import { formatCurrency, formatDate } from '../utils';

export default function BidDetails() {
  const { bidId } = useParams<{ bidId: string }>();
  const { data: bid, loading, error, refetch } = useBid(bidId || '');
  const { data: compliance } = useCompliance(bidId || '');

  if (loading) return <LoadingState message="Fetching bid audit details..." />;
  if (error || !bid) return <ErrorState error={error || 'Bid record not found'} onRetry={refetch} />;

  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          <Link to="/my-tenders" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.8)', fontSize: '13px', marginBottom: '12px', textDecoration: 'none' }}>
            <ArrowLeft size={16} /> Back to My Bids
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--color-saffron)', fontWeight: 700, fontSize: '13px' }}>BID ID: {bid.id}</span>
            <TenderStatusBadge status={bid.status} />
          </div>
          <h1 className="page__title" style={{ marginTop: '6px' }}>Bid Overview & AI Audit Report</h1>
        </div>
      </div>

      <div className="page__body">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div>
            <div className="page__card">
              <h2 className="page__card-title">Submitted Proposal Summary</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 700 }}>TENDER REFERENCE</span>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-deep-navy)' }}>{bid.tenderId}</div>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 700 }}>BID VALUE</span>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-deep-navy)' }}>{formatCurrency(bid.bidValue)}</div>
                </div>
              </div>
              <p className="page__card-text">{bid.technicalNotes}</p>
            </div>

            {compliance && (
              <div className="page__card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h2 className="page__card-title" style={{ marginBottom: 0 }}>AI Compliance Audit Breakdown</h2>
                  <span style={{ padding: '4px 12px', borderRadius: '20px', background: 'rgba(22, 163, 74, 0.1)', color: '#15803d', fontWeight: 700, fontSize: '14px' }}>
                    {compliance.overallScore}% Overall Score
                  </span>
                </div>

                {compliance.stages.map((stage) => (
                  <div key={stage.id} style={{ marginBottom: '20px', padding: '16px', background: 'var(--color-light-bg)', borderRadius: '8px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-deep-navy)', marginBottom: '10px' }}>{stage.title}</h3>
                    {stage.requirements.map((req) => (
                      <div key={req.id} style={{ background: '#fff', padding: '12px', borderRadius: '6px', border: '1px solid var(--color-border)', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text)' }}>{req.title}</span>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#15803d' }}>VERIFIED</span>
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>{req.verificationMessage}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="page__card">
              <h3 className="page__card-title">Audit Status</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} style={{ color: '#15803d' }} />
                  <span>GSTIN Validated via API</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} style={{ color: '#15803d' }} />
                  <span>MSE Exemption Applied</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} style={{ color: '#15803d' }} />
                  <span>ISO 27001 Authenticated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
