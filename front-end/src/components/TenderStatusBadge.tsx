import React from 'react';
import type { TenderStatus, BidStatus, VerificationStatus } from '../types';

interface StatusBadgeProps {
  status: TenderStatus | BidStatus | VerificationStatus | string;
}

export default function TenderStatusBadge({ status }: StatusBadgeProps) {
  const normalized = (status || '').toUpperCase();

  let label = status;
  let bg = 'rgba(100, 116, 139, 0.1)';
  let color = '#475569';
  let border = 'rgba(100, 116, 139, 0.2)';

  if (normalized === 'ACTIVE' || normalized === 'VERIFIED' || normalized === 'COMPLIANT') {
    label = normalized === 'ACTIVE' ? 'Active' : 'Verified';
    bg = 'rgba(22, 163, 74, 0.1)';
    color = '#15803d';
    border = 'rgba(22, 163, 74, 0.25)';
  } else if (normalized === 'UPCOMING' || normalized === 'DRAFT' || normalized === 'PENDING') {
    label = normalized === 'UPCOMING' ? 'Upcoming' : normalized === 'DRAFT' ? 'Draft' : 'Pending';
    bg = 'rgba(30, 62, 98, 0.1)';
    color = '#1E3E62';
    border = 'rgba(30, 62, 98, 0.25)';
  } else if (normalized === 'UNDER_EVALUATION' || normalized === 'UNDER EVALUATION' || normalized === 'REVIEW_REQUIRED') {
    label = 'Under Evaluation';
    bg = 'rgba(245, 158, 11, 0.1)';
    color = '#b45309';
    border = 'rgba(245, 158, 11, 0.25)';
  } else if (normalized === 'AWARDED' || normalized === 'SUBMITTED') {
    label = normalized === 'AWARDED' ? 'Awarded' : 'Submitted';
    bg = 'rgba(14, 116, 144, 0.1)';
    color = '#0e7490';
    border = 'rgba(14, 116, 144, 0.25)';
  } else if (normalized === 'CLOSED' || normalized === 'REJECTED' || normalized === 'NOT_COMPLIANT') {
    label = normalized === 'CLOSED' ? 'Closed' : normalized === 'REJECTED' ? 'Rejected' : 'Non-Compliant';
    bg = 'rgba(225, 29, 72, 0.1)';
    color = '#be123c';
    border = 'rgba(225, 29, 72, 0.25)';
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 10px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: 700,
        backgroundColor: bg,
        color: color,
        border: `1px solid ${border}`,
        letterSpacing: '0.03em',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </span>
  );
}
