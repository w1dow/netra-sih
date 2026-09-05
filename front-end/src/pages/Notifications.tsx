import React from 'react';
import { Bell, ShieldCheck } from 'lucide-react';
import { useNotifications } from '../api';
import { LoadingState, ErrorState, EmptyState } from '../components/StateViews';
import { formatDate } from '../utils';

export default function Notifications() {
  const { data: notifications, loading, error, refetch } = useNotifications();

  if (loading) return <LoadingState message="Loading notifications..." />;
  if (error) return <ErrorState error={error} onRetry={refetch} />;

  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          <h1 className="page__title">System Notifications</h1>
          <p className="page__description">
            Real-time procurement alerts, compliance audits, and tender deadline updates.
          </p>
        </div>
      </div>

      <div className="page__body">
        {notifications && notifications.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {notifications.map((notif) => (
              <div
                key={notif.id}
                style={{
                  background: notif.read ? 'var(--color-white)' : 'rgba(30, 62, 98, 0.04)',
                  border: `1px solid ${notif.read ? 'var(--color-border)' : 'var(--color-govt-blue)'}`,
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                }}
              >
                <div style={{ padding: '8px', borderRadius: '8px', background: 'var(--color-light-bg)', color: 'var(--color-govt-blue)', marginTop: '2px' }}>
                  {notif.type.includes('COMPLIANCE') ? <ShieldCheck size={20} /> : <Bell size={20} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-deep-navy)' }}>{notif.title}</h3>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{formatDate(notif.createdAt)}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{notif.message}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="No Notifications" message="You're all caught up! There are no pending alerts." />
        )}
      </div>
    </div>
  );
}
