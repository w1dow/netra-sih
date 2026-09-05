import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Building2, ChevronRight } from 'lucide-react';
import type { Tender } from '../types';
import TenderStatusBadge from './TenderStatusBadge';
import { formatCurrency, formatDate } from '../utils';

interface TenderCardProps {
  tender: Tender;
}

export default function TenderCard({ tender }: TenderCardProps) {
  const deptName = tender.departmentName || (tender as any).department || 'Government Ministry';
  const categoryName = tender.categoryName || (tender as any).category || 'General Procurement';

  return (
    <div className="tender-card">
      <div className="tender-card__header">
        <div style={{ flex: 1 }}>
          <div className="tender-card__id-row">
            <span className="tender-card__id">{tender.tenderId}</span>
            <TenderStatusBadge status={tender.status} />
          </div>
          <h3 className="tender-card__title">
            <Link to={`/tenders/${tender.id}`}>{tender.title}</Link>
          </h3>
        </div>
      </div>

      <p className="tender-card__description">
        {tender.description?.length > 120 ? `${tender.description.substring(0, 120)}...` : tender.description}
      </p>

      <div className="tender-card__meta">
        <div className="tender-card__meta-item">
          <Building2 size={15} />
          <span>{deptName}</span>
        </div>
        <div className="tender-card__meta-item">
          <MapPin size={15} />
          <span>{tender.location}</span>
        </div>
        <div className="tender-card__meta-item">
          <Calendar size={15} />
          <span>Closing: {formatDate(tender.deadline)}</span>
        </div>
      </div>

      <div className="tender-card__footer">
        <div className="tender-card__value-box">
          <span className="tender-card__value-label">ESTIMATED VALUE</span>
          <span className="tender-card__value">{formatCurrency(tender.estimatedValue)}</span>
        </div>

        <Link to={`/tenders/${tender.id}`} className="btn btn--primary btn--sm" style={{ gap: '4px' }}>
          <span>View Details</span>
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}
