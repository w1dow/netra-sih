import React from 'react';
import type { TenderStatus } from '../../types';

interface TenderStatusBadgeProps {
  status: TenderStatus | string;
  className?: string;
}

export default function TenderStatusBadge({ status, className = '' }: TenderStatusBadgeProps) {
  const normalized = (status || '').toUpperCase().replace(/_/g, ' ');

  let bg = 'var(--color-light-bg)';
  let color = 'var(--color-text-secondary)';
  let label = normalized;

  if (normalized === 'ACTIVE') {
    bg = 'var(--color-green-bg)';
    color = 'var(--color-green)';
    label = 'ACTIVE';
  } else if (normalized === 'UPCOMING') {
    bg = 'rgba(18, 59, 120, 0.1)';
    color = 'var(--color-govt-blue)';
    label = 'UPCOMING';
  } else if (normalized.includes('EVALUATION')) {
    bg = 'rgba(255, 153, 51, 0.12)';
    color = 'var(--color-saffron-dark)';
    label = 'UNDER EVALUATION';
  } else if (normalized === 'AWARDED') {
    bg = 'var(--color-green-bg)';
    color = 'var(--color-green)';
    label = 'AWARDED';
  } else if (normalized === 'CLOSED') {
    bg = 'var(--color-light-bg)';
    color = 'var(--color-text-light)';
    label = 'CLOSED';
  }

  return (
    <span
      className={`tender-status-badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 10px',
        borderRadius: 'var(--radius-sm)',
        fontSize: 'var(--font-size-xs)',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        backgroundColor: bg,
        color: color,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}
