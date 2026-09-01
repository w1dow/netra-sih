import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  IndianRupee,
  Building2,
  ArrowLeft,
  Download,
  FileText,
  Clock,
  Users,
} from 'lucide-react';
import { tenders } from '@/data';
import './Pages.css';

export default function TenderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const tender = tenders.find((t) => t.id === id);

  if (!tender) {
    return (
      <div className="page">
        <div className="page__header">
          <div className="page__header-inner">
            <h1 className="page__title">Tender Not Found</h1>
          </div>
        </div>
        <div className="page__body">
          <div className="page__placeholder">
            <p className="page__placeholder-text">
              The tender you are looking for does not exist or has been removed.
            </p>
            <Link to="/tenders" className="btn btn--primary" style={{ marginTop: 'var(--space-4)' }}>
              <ArrowLeft size={16} />
              Back to Tenders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          <Link to="/tenders" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-3)', textDecoration: 'none' }}>
            <ArrowLeft size={14} />
            Back to Tenders
          </Link>
          <h1 className="page__title">{tender.title}</h1>
          <p className="page__description" style={{ fontFamily: 'monospace', letterSpacing: '0.04em' }}>
            {tender.tenderId}
          </p>
        </div>
      </div>
      <div className="page__body">
        {/* Overview Card */}
        <div className="page__card">
          <h2 className="page__card-title">Tender Overview</h2>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Department</div>
              <div className="info-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Building2 size={16} style={{ color: 'var(--color-govt-blue)' }} />
                {tender.department}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Location</div>
              <div className="info-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} style={{ color: 'var(--color-govt-blue)' }} />
                {tender.location}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Bid Deadline</div>
              <div className="info-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={16} style={{ color: 'var(--color-saffron)' }} />
                {tender.bidDeadline}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Estimated Value</div>
              <div className="info-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <IndianRupee size={16} style={{ color: 'var(--color-green)' }} />
                {tender.estimatedValue}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Category</div>
              <div className="info-value">{tender.category}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Status</div>
              <div className="info-value">
                <span style={{
                  display: 'inline-block',
                  padding: '2px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  background: tender.status === 'ACTIVE' ? 'var(--color-green-bg)' : 'var(--color-amber-bg)',
                  color: tender.status === 'ACTIVE' ? 'var(--color-green)' : 'var(--color-amber)',
                }}>
                  {tender.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="page__card">
          <h2 className="page__card-title">Description</h2>
          <p className="page__card-text">{tender.description}</p>
        </div>

        {/* Actions */}
        <div className="page__card">
          <h2 className="page__card-title">Actions</h2>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <button className="btn btn--primary">
              <FileText size={16} />
              Submit Bid
            </button>
            <button className="btn btn--secondary">
              <Download size={16} />
              Download Documents
            </button>
            <Link to="/compliance" className="btn btn--saffron">
              <Users size={16} />
              Check Compliance
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
