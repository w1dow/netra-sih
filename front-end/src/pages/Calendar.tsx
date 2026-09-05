import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useCalendarEvents } from '../api';
import { LoadingState, ErrorState, EmptyState } from '../components/StateViews';
import { formatDate } from '../utils';

export default function Calendar() {
  const { data: events, loading, error, refetch } = useCalendarEvents();

  if (loading) return <LoadingState message="Loading calendar schedule..." />;
  if (error) return <ErrorState error={error} onRetry={refetch} />;

  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          <h1 className="page__title">Procurement Calendar</h1>
          <p className="page__description">
            Schedule of tender submission deadlines, technical bid openings, and compliance verification milestones.
          </p>
        </div>
      </div>

      <div className="page__body">
        {events && events.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {events.map((evt) => (
              <div
                key={evt.id}
                style={{
                  background: 'var(--color-white)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                }}
              >
                <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--color-light-bg)', color: 'var(--color-saffron)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CalendarIcon size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-govt-blue)', textTransform: 'uppercase', marginBottom: '2px' }}>
                    {evt.type.replace('_', ' ')}
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-deep-navy)', marginBottom: '4px' }}>{evt.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>{evt.description}</p>
                </div>
                <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>DATE & TIME</span>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-deep-navy)' }}>{formatDate(evt.start)}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="No Scheduled Events" message="No upcoming deadlines found on your schedule." />
        )}
      </div>
    </div>
  );
}
