import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronRight, FileText, Edit3, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useMyBids, useTenders } from '@/hooks';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import EmptyState from '@/components/common/EmptyState';
import TenderStatusBadge from '@/components/tenders/TenderStatusBadge';
import { formatCurrency, formatDate } from '@/utils/formatters';
import type { Bid, BidStatus } from '@/types';
import '../Pages.css';

const filterTabs = ['All', 'Draft', 'Submitted', 'Under Evaluation', 'Awarded', 'Closed'];

export default function MyTendersPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: bids, loading: bidsLoading, error: bidsError, refetch } = useMyBids();
  const { data: tenders } = useTenders();

  // Create lookup map for tenders
  const tenderMap = useMemo(() => {
    const map = new Map<string, any>();
    if (tenders) {
      tenders.forEach(t => map.set(t.id, t));
    }
    return map;
  }, [tenders]);

  const filteredBids = useMemo(() => {
    if (!bids) return [];
    return bids.filter(bid => {
      // Filter by tab
      if (activeFilter !== 'All') {
        const normStatus = bid.status.replace(/_/g, ' ').toUpperCase();
        if (normStatus !== activeFilter.toUpperCase()) return false;
      }
      // Filter by search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const tender = tenderMap.get(bid.tenderId);
        const titleMatch = tender?.title?.toLowerCase().includes(q);
        const idMatch = bid.id.toLowerCase().includes(q) || (tender?.tenderId || '').toLowerCase().includes(q);
        if (!titleMatch && !idMatch) return false;
      }
      return true;
    });
  }, [bids, activeFilter, searchTerm, tenderMap]);

  const stats = useMemo(() => {
    if (!bids) return { total: 0, active: 0, evaluation: 0, awarded: 0, closed: 0 };
    return {
      total: bids.length,
      active: bids.filter(b => b.status === 'SUBMITTED' || b.status === 'DRAFT').length,
      evaluation: bids.filter(b => b.status === 'UNDER_EVALUATION' || (b.status as any) === 'UNDER EVALUATION').length,
      awarded: bids.filter(b => b.status === 'AWARDED').length,
      closed: bids.filter(b => b.status === 'CLOSED').length,
    };
  }, [bids]);

  const getComplianceColor = (score?: number) => {
    if (!score) return 'var(--color-text-secondary)';
    if (score >= 90) return 'var(--color-green)';
    if (score >= 70) return 'var(--color-amber)';
    return '#dc2626';
  };

  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          <h1 className="page__title">My Tenders & Bids</h1>
          <p className="page__description">
            Track your company's tender participation, submitted proposals, compliance scores and bid evaluation status.
          </p>
        </div>
      </div>
      <div className="page__body">

        {/* Summary Stats */}
        <div className="page__stats-grid" style={{ marginBottom: 'var(--space-8)' }}>
          {[
            { label: 'Total Bids', value: stats.total },
            { label: 'Active / Draft', value: stats.active },
            { label: 'Under Evaluation', value: stats.evaluation },
            { label: 'Awarded', value: stats.awarded },
            { label: 'Closed', value: stats.closed },
          ].map((stat, i) => (
            <div key={i} className="page__stat-card" style={{ padding: 'var(--space-4)' }}>
              <div className="page__stat-value" style={{ fontSize: 'var(--font-size-xl)' }}>{stat.value}</div>
              <div className="page__stat-label" style={{ fontSize: '10px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search & Filter Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1', minWidth: '280px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
              <input
                type="text"
                placeholder="Search my bids by tender ID or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: 'var(--font-size-sm)' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {filterTabs.map(f => (
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
                  transition: 'all 0.15s',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        {bidsLoading ? (
          <LoadingState message="Fetching your bids..." />
        ) : bidsError ? (
          <ErrorState error={bidsError} onRetry={refetch} />
        ) : filteredBids.length === 0 ? (
          <EmptyState
            icon="inbox"
            title="No Bids Found"
            message="No bids match your selected status filter or search query."
            actionLabel="Reset Search & Filters"
            onAction={() => { setActiveFilter('All'); setSearchTerm(''); }}
          />
        ) : (
          <div className="page__card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-size-sm)', minWidth: '900px' }}>
                <thead style={{ background: 'var(--color-light-bg)' }}>
                  <tr>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--color-border-light)' }}>Bid ID / Tender ID</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--color-border-light)' }}>Tender Title & Department</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--color-border-light)' }}>Bid Amount</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--color-border-light)' }}>Submitted On</th>
                    <th style={{ padding: '16px', textAlign: 'center', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--color-border-light)' }}>Compliance Score</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--color-border-light)' }}>Status</th>
                    <th style={{ padding: '16px', textAlign: 'right', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--color-border-light)' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBids.map(bid => {
                    const tender = tenderMap.get(bid.tenderId);
                    const title = tender?.title || 'Tender Bid Proposal';
                    const dept = tender?.departmentName || (tender as any)?.department || 'Ministry / Department';
                    const gemId = tender?.tenderId || bid.tenderId;

                    return (
                      <tr key={bid.id} style={{ borderBottom: '1px solid var(--color-border-light)', transition: 'background 0.15s' }}>
                        <td style={{ padding: '16px', verticalAlign: 'top' }}>
                          <div style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--color-govt-blue)', fontWeight: 600 }}>{bid.id}</div>
                          <div style={{ fontSize: '11px', color: 'var(--color-text-light)', fontFamily: 'monospace', marginTop: '2px' }}>{gemId}</div>
                        </td>
                        <td style={{ padding: '16px', verticalAlign: 'top', maxWidth: '320px' }}>
                          <Link to={`/tenders/${bid.tenderId}`} style={{ fontWeight: 600, color: 'var(--color-deep-navy)', textDecoration: 'none', lineHeight: '1.4', display: 'block', marginBottom: '4px' }}>
                            {title}
                          </Link>
                          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{dept}</div>
                        </td>
                        <td style={{ padding: '16px', verticalAlign: 'top', fontWeight: 600 }}>
                          {bid.bidValue ? formatCurrency(bid.bidValue) : 'Draft'}
                        </td>
                        <td style={{ padding: '16px', verticalAlign: 'top', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                          {bid.submittedAt ? formatDate(bid.submittedAt) : 'Not Submitted'}
                        </td>
                        <td style={{ padding: '16px', verticalAlign: 'top', textAlign: 'center' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-light-bg)', color: getComplianceColor(bid.complianceScore), fontWeight: 700, fontSize: '12px', border: `2px solid ${getComplianceColor(bid.complianceScore)}` }}>
                            {bid.complianceScore ? `${bid.complianceScore}%` : 'N/A'}
                          </div>
                        </td>
                        <td style={{ padding: '16px', verticalAlign: 'top' }}>
                          <TenderStatusBadge status={bid.status} />
                        </td>
                        <td style={{ padding: '16px', verticalAlign: 'top', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <Link to={`/my-tenders/${bid.id}`} className="btn btn--secondary" style={{ padding: '4px 10px', fontSize: '12px' }}>
                              <FileText size={14} /> View
                            </Link>
                            <Link to="/compliance" className="btn btn--saffron" style={{ padding: '4px 10px', fontSize: '12px' }}>
                              Compliance
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
