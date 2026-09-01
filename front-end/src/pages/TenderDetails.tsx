import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, MapPin, Calendar, FileText, CheckCircle2, ShieldCheck, Upload } from 'lucide-react';
import { useTender } from '../api';
import TenderStatusBadge from '../components/TenderStatusBadge';
import { LoadingState, ErrorState } from '../components/StateViews';
import { formatCurrency, formatDate } from '../utils';

export default function TenderDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: tender, loading, error, refetch } = useTender(id || '');

  if (loading) return <LoadingState message="Fetching tender details..." />;
  if (error || !tender) return <ErrorState error={error || 'Tender not found'} onRetry={refetch} />;

  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          <Link to="/tenders" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.8)', fontSize: '13px', marginBottom: '12px', textDecoration: 'none' }}>
            <ArrowLeft size={16} /> Back to Active Tenders
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--color-saffron)', fontWeight: 700, fontSize: '13px', letterSpacing: '0.05em' }}>{tender.tenderId}</span>
            <TenderStatusBadge status={tender.status} />
          </div>
          <h1 className="page__title" style={{ marginTop: '6px' }}>{tender.title}</h1>
        </div>
      </div>

      <div className="page__body">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div>
            <div className="page__card">
              <h2 className="page__card-title">Tender Overview & Description</h2>
              <p className="page__card-text">{tender.description}</p>

              <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--color-border-light)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-deep-navy)', marginBottom: '12px' }}>Required Statutory & Technical Documents</h3>
                <ul style={{ listStyle: 'disc', paddingLeft: '20px', fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                  <li>Valid GST Registration Certificate & latest GSTR-3B filings</li>
                  <li>Company Registration / Udyam MSME Certificate</li>
                  <li>Audited Financial Balance Sheet for last 3 FYs</li>
                  <li>ISO 27001 / ISO 9001 Quality & Security Accreditation</li>
                  <li>OEM Authorization Certificate (for technical hardware/software tenders)</li>
                </ul>
              </div>
            </div>

            <div className="page__card">
              <h2 className="page__card-title">AI Compliance Verification Engine</h2>
              <p className="page__card-text">
                When you submit a bid for this tender, NETRA’s automated AI audit model checks all uploaded PDF credentials against GeM and GFR 2017 criteria.
              </p>
              <div style={{ marginTop: '16px', display: 'flex', gap: '12px', background: 'var(--color-light-bg)', padding: '16px', borderRadius: '8px' }}>
                <ShieldCheck size={24} style={{ color: 'var(--color-govt-blue)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-deep-navy)' }}>Instant Evidence Mapping</h4>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                    Turnaround time: &lt; 30 seconds for complete pre-check report before formal officer review.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="page__card">
              <h3 className="page__card-title">Tender Key Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>ESTIMATED VALUE</span>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-deep-navy)', marginTop: '2px' }}>{formatCurrency(tender.estimatedValue)}</div>
                </div>

                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>DEPARTMENT</span>
                  <div style={{ fontWeight: 600, color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <Building2 size={16} /> {tender.departmentName || 'Government Ministry'}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>LOCATION</span>
                  <div style={{ fontWeight: 600, color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <MapPin size={16} /> {tender.location}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>SUBMISSION DEADLINE</span>
                  <div style={{ fontWeight: 600, color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <Calendar size={16} /> {formatDate(tender.deadline)}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '24px' }}>
                <button
                  onClick={() => navigate('/my-tenders')}
                  className="btn btn--saffron"
                  style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                >
                  <Upload size={18} />
                  <span>Prepare & Submit Bid</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
