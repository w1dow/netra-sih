import React from 'react';
import { Building2, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { useCompany } from '../api';
import { LoadingState, ErrorState } from '../components/StateViews';

export default function Company() {
  const { data: company, loading, error, refetch } = useCompany('comp-01');

  if (loading) return <LoadingState message="Loading company credentials..." />;
  if (error || !company) return <ErrorState error={error || 'Company not found'} onRetry={refetch} />;

  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          <h1 className="page__title">{company.legalName}</h1>
          <p className="page__description">
            Verified Organization Credentials & Statutory Procurement Profile
          </p>
        </div>
      </div>

      <div className="page__body">
        <div className="page__card" style={{ marginBottom: '24px' }}>
          <h2 className="page__card-title">Registration & Tax Identification</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ background: 'var(--color-light-bg)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>GSTIN</span>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-deep-navy)', marginTop: '2px' }}>{company.gstin}</div>
              <span style={{ fontSize: '11px', color: '#15803d', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <CheckCircle2 size={12} /> Active & Verified
              </span>
            </div>

            <div style={{ background: 'var(--color-light-bg)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>PAN NUMBER</span>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-deep-navy)', marginTop: '2px' }}>{company.pan}</div>
              <span style={{ fontSize: '11px', color: '#15803d', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <CheckCircle2 size={12} /> Validated
              </span>
            </div>

            <div style={{ background: 'var(--color-light-bg)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>UDYAM REGISTRATION</span>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-deep-navy)', marginTop: '2px' }}>{company.udyamNumber}</div>
              <span style={{ fontSize: '11px', color: '#15803d', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <CheckCircle2 size={12} /> MSE Exemptions Active
              </span>
            </div>

            <div style={{ background: 'var(--color-light-bg)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>CATEGORY</span>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-deep-navy)', marginTop: '2px' }}>{company.category}</div>
              <span style={{ fontSize: '11px', color: 'var(--color-govt-blue)', fontWeight: 600, marginTop: '4px', display: 'block' }}>Class-I Local Supplier</span>
            </div>
          </div>
        </div>

        <div className="page__card">
          <h2 className="page__card-title">Registered Office Address</h2>
          <p className="page__card-text" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={18} style={{ color: 'var(--color-saffron)' }} />
            <span>{company.address}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
