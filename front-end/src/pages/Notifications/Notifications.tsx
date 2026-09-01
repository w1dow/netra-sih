import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Bell, AlertTriangle, Calendar, CheckCircle2, Clock, ArrowRight, Check } from 'lucide-react';
import { useNotifications } from '@/hooks';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import EmptyState from '@/components/common/EmptyState';
import { formatDate } from '@/utils/formatters';
import type { Notification, NotificationType } from '@/types';
import '../Pages.css';

const filterTabs = [
  { id: 'ALL', label: 'All Alerts' },
  { id: 'UNREAD', label: 'Unread' },
  { id: 'ACTION', label: 'Action Required' },
  { id: 'DEADLINE', label: 'Deadlines' },
  { id: 'UPDATES', label: 'Status Updates' },
];

export default function NotificationsPage() {
  const { data: notificationsData, loading, error, refetch } = useNotifications();
  const [activeTab, setActiveTab] = useState('ALL');
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const notifications = useMemo(() => {
    if (!notificationsData) return [];
    return notificationsData.map(n => ({
      ...n,
      read: n.read || readIds.has(n.id),
    }));
  }, [notificationsData, readIds]);

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      if (activeTab === 'UNREAD') return !n.read;
      if (activeTab === 'ACTION') return n.type === 'COMPLIANCE_ACTION_REQUIRED';
      if (activeTab === 'DEADLINE') return n.type === 'TENDER_DEADLINE';
      if (activeTab === 'UPDATES') return n.type === 'TENDER_STATUS_UPDATED' || n.type === 'BID_SUBMITTED' || n.type === 'COMPLIANCE_COMPLETED';
      return true;
    });
  }, [notifications, activeTab]);

  const markAsRead = (id: string) => {
    setReadIds(prev => new Set(prev).add(id));
  };

  const markAllAsRead = () => {
    const all = new Set(notifications.map(n => n.id));
    setReadIds(all);
  };

  const getTypeIcon = (type: NotificationType) => {
    switch (type) {
      case 'COMPLIANCE_ACTION_REQUIRED':
        return <AlertTriangle size={20} style={{ color: 'var(--color-amber-dark)' }} />;
      case 'TENDER_DEADLINE':
        return <Calendar size={20} style={{ color: 'var(--color-govt-blue)' }} />;
      case 'TENDER_STATUS_UPDATED':
      case 'COMPLIANCE_COMPLETED':
        return <CheckCircle2 size={20} style={{ color: 'var(--color-green)' }} />;
      default:
        return <Bell size={20} style={{ color: 'var(--color-govt-blue)' }} />;
    }
  };

  const getActionLink = (n: Notification) => {
    if (n.type === 'COMPLIANCE_ACTION_REQUIRED') {
      return (
        <Link to="/compliance" className="btn btn--saffron" style={{ padding: '4px 12px', fontSize: '12px' }}>
          Check Compliance <ArrowRight size={12} />
        </Link>
      );
    }
    if (n.tenderId) {
      return (
        <Link to={`/tenders/${n.tenderId}`} className="btn btn--primary" style={{ padding: '4px 12px', fontSize: '12px' }}>
          View Tender <ArrowRight size={12} />
        </Link>
      );
    }
    return null;
  };

  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <div>
              <h1 className="page__title">Notifications & Alert Centre</h1>
              <p className="page__description">
                Stay updated on tender deadlines, compliance verification requirements and evaluation status changes.
              </p>
            </div>
            {notifications.some(n => !n.read) && (
              <button className="btn btn--secondary" onClick={markAllAsRead} style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>
                <Check size={16} /> Mark All as Read
              </button>
            )}
          </div>
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

        {/* Notifications List */}
        {loading ? (
          <LoadingState message="Loading notifications..." />
        ) : error ? (
          <ErrorState error={error} onRetry={refetch} />
        ) : filteredNotifications.length === 0 ? (
          <EmptyState
            icon="notification"
            title="You're All Caught Up!"
            message="No notifications or alerts match your selected tab filter."
            actionLabel="View All Alerts"
            onAction={() => setActiveTab('ALL')}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {filteredNotifications.map((n) => (
              <div
                key={n.id}
                style={{
                  background: n.read ? 'var(--color-white)' : '#F0F7FF',
                  border: `1px solid ${n.read ? 'var(--color-border)' : 'var(--color-govt-blue)'}`,
                  borderLeft: `4px solid ${n.type === 'COMPLIANCE_ACTION_REQUIRED' ? 'var(--color-saffron)' : 'var(--color-govt-blue)'}`,
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-5)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 'var(--space-4)',
                  transition: 'background 0.15s',
                }}
              >
                <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: n.type === 'COMPLIANCE_ACTION_REQUIRED' ? 'var(--color-amber-bg)' : 'var(--color-light-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {getTypeIcon(n.type)}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: 'var(--color-deep-navy)' }}>
                        {n.title}
                      </h3>
                      {!n.read && (
                        <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', background: 'var(--color-govt-blue)', color: '#fff', textTransform: 'uppercase' }}>
                          NEW
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: 'var(--space-3)' }}>
                      {n.message}
                    </p>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> Received {formatDate(n.createdAt)}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 'var(--space-3)' }}>
                  {getActionLink(n)}
                  {!n.read && (
                    <button
                      onClick={() => markAsRead(n.id)}
                      style={{ fontSize: '11px', color: 'var(--color-text-secondary)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Mark as read
                    </button>
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
