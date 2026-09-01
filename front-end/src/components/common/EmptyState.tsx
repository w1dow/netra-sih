import React from 'react';
import { Inbox, FilterX, BellOff, ShieldOff, SearchX } from 'lucide-react';
import './common.css';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: 'inbox' | 'filter' | 'notification' | 'compliance' | 'search';
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title = 'No Data Found',
  message = 'There are no items to display at this time.',
  icon = 'inbox',
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const getIcon = () => {
    switch (icon) {
      case 'filter': return <FilterX size={36} />;
      case 'notification': return <BellOff size={36} />;
      case 'compliance': return <ShieldOff size={36} />;
      case 'search': return <SearchX size={36} />;
      default: return <Inbox size={36} />;
    }
  };

  return (
    <div className="netra-empty-state">
      <div className="netra-empty-state__icon">{getIcon()}</div>
      <h3 className="netra-empty-state__title">{title}</h3>
      <p className="netra-empty-state__message">{message}</p>
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn btn--secondary" style={{ marginTop: 'var(--space-4)' }}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
