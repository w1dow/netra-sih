import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, IndianRupee, Building2, ArrowRight } from 'lucide-react';
import type { Tender } from '@/types';
import TenderStatusBadge from '../tenders/TenderStatusBadge';
import { formatCurrency, formatDate } from '@/utils/formatters';
import './TenderCard.css';

interface TenderCardProps {
  tender: Tender;
}

export default function TenderCard({ tender }: TenderCardProps) {
  const departmentName = tender.departmentName || (tender as any).department || 'Government Department';
  const deadlineText = formatDate(tender.deadline || (tender as any).bidDeadline);
  const valueText = formatCurrency(tender.estimatedValue);

  return (
    <article className="tender-card" tabIndex={0}>
      <div className="tender-card__header">
        <span className="tender-card__id">{tender.tenderId}</span>
        <TenderStatusBadge status={tender.status} />
      </div>
      <h3 className="tender-card__title">{tender.title}</h3>
      <div className="tender-card__meta">
        <div className="tender-card__meta-item">
          <Building2 size={14} />
          <span>{departmentName}</span>
        </div>
        <div className="tender-card__meta-item">
          <MapPin size={14} />
          <span>{tender.location}</span>
        </div>
        <div className="tender-card__meta-item">
          <Calendar size={14} />
          <span>{deadlineText}</span>
        </div>
        <div className="tender-card__meta-item tender-card__meta-value">
          <IndianRupee size={14} />
          <span>{valueText}</span>
        </div>
      </div>
      <div className="tender-card__actions">
        <Link to={`/tenders/${tender.id}`} className="tender-card__btn tender-card__btn--primary">
          View Tender Details
          <ArrowRight size={14} />
        </Link>
        <Link to={`/tenders/${tender.id}`} className="tender-card__btn tender-card__btn--secondary">
          Participate
        </Link>
      </div>
    </article>
  );
}
