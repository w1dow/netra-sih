import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, IndianRupee, Building2, ArrowRight } from 'lucide-react';
import type { Tender } from '@/types';
import './TenderCard.css';

interface TenderCardProps {
  tender: Tender;
}

const statusClass: Record<string, string> = {
  ACTIVE: 'tender-card__status--active',
  CLOSED: 'tender-card__status--closed',
  UPCOMING: 'tender-card__status--upcoming',
  'UNDER EVALUATION': 'tender-card__status--evaluation',
};

export default function TenderCard({ tender }: TenderCardProps) {
  return (
    <article className="tender-card" tabIndex={0}>
      <div className="tender-card__header">
        <span className="tender-card__id">{tender.tenderId}</span>
        <span className={`tender-card__status ${statusClass[tender.status] || ''}`}>
          {tender.status}
        </span>
      </div>
      <h3 className="tender-card__title">{tender.title}</h3>
      <div className="tender-card__meta">
        <div className="tender-card__meta-item">
          <Building2 size={14} />
          <span>{tender.department}</span>
        </div>
        <div className="tender-card__meta-item">
          <MapPin size={14} />
          <span>{tender.location}</span>
        </div>
        <div className="tender-card__meta-item">
          <Calendar size={14} />
          <span>{tender.bidDeadline}</span>
        </div>
        <div className="tender-card__meta-item tender-card__meta-value">
          <IndianRupee size={14} />
          <span>{tender.estimatedValue}</span>
        </div>
      </div>
      <div className="tender-card__actions">
        <Link to={`/tenders/${tender.id}`} className="tender-card__btn tender-card__btn--primary">
          View Tender
          <ArrowRight size={14} />
        </Link>
        <button className="tender-card__btn tender-card__btn--secondary">
          Participate
        </button>
      </div>
    </article>
  );
}
