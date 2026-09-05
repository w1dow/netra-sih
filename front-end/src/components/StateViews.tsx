import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2, AlertTriangle, FileX, ArrowLeft, Home, Search, RefreshCw } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading details...' }: LoadingStateProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center' }}>
      <Loader2 size={36} className="spin" style={{ color: 'var(--color-govt-blue)', marginBottom: '16px' }} />
      <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{message}</p>
    </div>
  );
}

interface ErrorStateProps {
  error?: any;
  onRetry?: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  const msg = typeof error === 'string' ? error : error?.message || 'Unable to connect to Express backend server.';

  return (
    <div style={{ background: '#fff', border: '1px solid #fecaca', borderRadius: '12px', padding: '40px 24px', textAlign: 'center', maxWidth: '520px', margin: '40px auto' }}>
      <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
        <AlertTriangle size={28} />
      </div>
      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#991b1b', marginBottom: '8px' }}>Backend Connection Error</h3>
      <p style={{ fontSize: '14px', color: '#7f1d1d', marginBottom: '20px', lineHeight: 1.5 }}>{msg}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn--primary" style={{ gap: '8px' }}>
          <RefreshCw size={16} />
          <span>Retry Connection</span>
        </button>
      )}
    </div>
  );
}

interface EmptyStateProps {
  icon?: 'search' | 'filter' | 'file';
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon = 'file', title = 'No Data Found', message = 'There are no items to display.', actionLabel, onAction }: EmptyStateProps) {
  return (
    <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '60px 20px', textAlign: 'center', margin: '20px 0' }}>
      <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'var(--color-light-bg)', color: 'var(--color-govt-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
        {icon === 'search' ? <Search size={28} /> : icon === 'filter' ? <Search size={28} /> : <FileX size={28} />}
      </div>
      <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-deep-navy)', marginBottom: '8px' }}>{title}</h3>
      <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', maxWidth: '400px', margin: '0 auto 20px auto', lineHeight: 1.5 }}>{message}</p>
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn btn--secondary">
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '75vh', padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>
        <h1 style={{ fontSize: '72px', fontWeight: 900, color: 'var(--color-govt-blue)', lineHeight: 1, marginBottom: '8px' }}>404</h1>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-deep-navy)', marginBottom: '12px' }}>Page Not Found</h2>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '24px', lineHeight: 1.6 }}>
          The requested page or procurement resource could not be located.
        </p>
        <Link to="/" className="btn btn--primary" style={{ gap: '8px' }}>
          <Home size={18} />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
