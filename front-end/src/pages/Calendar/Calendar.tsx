import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, AlertTriangle, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCalendarEvents } from '@/hooks';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import EmptyState from '@/components/common/EmptyState';
import { formatDate } from '@/utils/formatters';
import type { CalendarEvent } from '@/types';
import '../Pages.css';

const filterTabs = [
  { id: 'ALL', label: 'All Events' },
  { id: 'TENDER_DEADLINE', label: 'Tender Deadlines' },
  { id: 'COMPLIANCE_DEADLINE', label: 'Compliance Deadlines' },
  { id: 'EVALUATION_UPDATE', label: 'Evaluations' },
];

export default function CalendarPage() {
  const { data: events, loading, error, refetch } = useCalendarEvents();
  const [activeTab, setActiveTab] = useState('ALL');

  const filteredEvents = useMemo(() => {
    if (!events) return [];
    return events.filter(evt => {
      if (activeTab !== 'ALL' && evt.type !== activeTab) return false;
      return true;
    });
  }, [events, activeTab]);

  const getBadge = (type: string) => {
    switch (type) {
      case 'TENDER_DEADLINE':
        return <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, background: '#FEF2F2', color: '#DC2626' }}>TENDER DEADLINE</span>;
      case 'COMPLIANCE_DEADLINE':
        return <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, background: 'var(--color-amber-bg)', color: 'var(--color-amber-dark)' }}>COMPLIANCE ACTION</span>;
      case 'EVALUATION_UPDATE':
        return <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, background: 'var(--color-green-bg)', color: 'var(--color-green)' }}>EVALUATION EXPECTED</span>;
      default:
        return <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, background: 'var(--color-light-bg)', color: 'var(--color-govt-blue)' }}>EVENT</span>;
    }
  };

  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          <h1 className="page__title">Procurement Schedule & Deadlines</h1>
          <p className="page__description">
            Track key tender submission deadlines, document resubmission windows and expected evaluation result dates.
          </p>
        </div>
      </div>

      <div className="page__body">
        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: 'var(--space-6)', paddingBottom: '4px' }}>
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 18px',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                background: activeTab === tab.id ? 'var(--color-deep-navy)' : 'var(--color-light-bg)',
                color: activeTab === tab.id ? 'var(--color-white)' : 'var(--color-text-secondary)',
                border: `1px solid ${activeTab === tab.id ? 'var(--color-deep-navy)' : 'var(--color-border)'}`,
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <LoadingState message="Loading procurement calendar..." />
        ) : error ? (
          <ErrorState error={error} onRetry={refetch} />
        ) : filteredEvents.length === 0 ? (
          <EmptyState
            icon="filter"
            title="No Scheduled Events"
            message="No procurement deadlines or events match your current filter selection."
            actionLabel="View All Schedule Events"
            onAction={() => setActiveTab('ALL')}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                style={{
                  background: 'var(--color-white)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 'var(--space-4)',
                }}
              >
                <div style={{ display: 'flex', gap: 'var(--space-5)', alignItems: 'center' }}>
                  {/* Date Box */}
                  <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-md)', background: 'var(--color-deep-navy)', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-saffron)' }}>
                      {new Date(evt.start).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800 }}>
                      {new Date(evt.start).getDate()}
                    </span>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-1)' }}>
                      {getBadge(evt.type)}
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} /> {formatDate(evt.start)}
                      </span>
                    </div>
                    <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: 'var(--color-deep-navy)', marginBottom: '4px' }}>
                      {evt.title}
                    </h3>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                      {evt.description}
                    </p>
                  </div>
                </div>

                <div>
                  {evt.tenderId && (
                    <Link to={`/tenders/${evt.tenderId}`} className="btn btn--primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                      <FileText size={14} /> View Tender Details
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
