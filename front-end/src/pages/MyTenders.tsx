import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle, Clock, ChevronRight, ShieldCheck } from 'lucide-react';
import { useMyBids } from '../api';
import TenderStatusBadge from '../components/TenderStatusBadge';
import { LoadingState, ErrorState, EmptyState } from '../components/StateViews';
import { formatCurrency, formatDate } from '../utils';

export default function MyTenders() {
  const { data: bids, loading, error, refetch } = useMyBids();

  if (loading) return <LoadingState message="Loading your submitted bids..." />;
  if (error) return <ErrorState error={error} onRetry={refetch} />;

  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          <h1 className="page__title">My Submitted Bids</h1>
          <p className="page__description">
            Track status, compliance audits, and submission history for all your company's tender bids.
          </p>
        </div>
      </div>

      <div className="page__body">
        {bids && bids.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {bids.map((bid) => (
              <div
                key={bid.id}
                style={{
                  background: 'var(--color-white)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ flex: '1 1 300px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-govt-blue)' }}>BID ID: {bid.id}</span>
                    <TenderStatusBadge status={bid.status} />
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-deep-navy)', marginBottom: '6px' }}>
                    Tender Reference: {bid.tenderId}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                    Submitted: {formatDate(bid.submittedAt || bid.createdAt)}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>BID AMOUNT</span>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-deep-navy)' }}>{formatCurrency(bid.bidValue)}</div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>AI COMPLIANCE SCORE</span>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#15803d', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <ShieldCheck size={18} /> {bid.complianceScore || 90}%
                    </div>
                  </div>

                  <Link to={`/my-tenders/${bid.id}`} className="btn btn--secondary btn--sm">
                    <span>View Bid Details</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="file"
            title="No Bids Submitted Yet"
            message="You haven't submitted any bids yet. Explore active tenders and submit your proposal."
            actionLabel="Browse Active Tenders"
            onAction={() => window.location.href = '/tenders'}
          />
        )}
      </div>
    </div>
  );
}
