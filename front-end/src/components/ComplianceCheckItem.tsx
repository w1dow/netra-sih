import React from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import type { ComplianceCheck } from '@/types';
import './ComplianceCheckItem.css';

interface ComplianceCheckItemProps {
  check: ComplianceCheck;
}

const statusConfig = {
  compliant: {
    icon: CheckCircle,
    className: 'compliance-check--compliant',
    label: 'Compliant',
  },
  review: {
    icon: AlertCircle,
    className: 'compliance-check--review',
    label: 'Review Required',
  },
  'non-compliant': {
    icon: XCircle,
    className: 'compliance-check--noncompliant',
    label: 'Non-Compliant',
  },
};

export default function ComplianceCheckItem({ check }: ComplianceCheckItemProps) {
  const config = statusConfig[check.status];
  const Icon = config.icon;

  return (
    <div className={`compliance-check ${config.className}`}>
      <div className="compliance-check__icon">
        <Icon size={18} />
      </div>
      <div className="compliance-check__content">
        <span className="compliance-check__name">{check.name}</span>
        <span className="compliance-check__desc">{check.description}</span>
      </div>
      <span className="compliance-check__badge">{config.label}</span>
    </div>
  );
}
