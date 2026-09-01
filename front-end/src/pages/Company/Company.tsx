import React from 'react';
import { Building2, ShieldCheck, CheckCircle2, FileText, Award, AlertCircle } from 'lucide-react';
import { useCurrentUser, useCompany } from '@/hooks';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import '../Pages.css';

export default function CompanyPage() {
  const { data: user } = useCurrentUser();
  const { data: company, loading, error, refetch } = useCompany(user?.companyId || 'company-001');

  if (loading) {
    return (
      <div className="page" style={{ paddingTop: 'calc(64px + var(--space-8))' }}>
        <LoadingState message="Loading company credentials..." height="400px" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page" style={{ paddingTop: 'calc(64px + var(--space-8))' }}>
        <div className="page__body">
          <ErrorState error={error} onRetry={refetch} />
        </div>
      </div>
    );
  }

  const vStatus = company?.verificationStatus || {
    registration: true,
    gst: true,
    pan: true,
    udyam: true,
    authorisedRep: true,
    bankDetails: true,
  };

  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          <h1 className="page__title">Company Credentials & Compliance Profile</h1>
          <p className="page__description">
            Registered corporate profile, statutory identity numbers and verified government bidding status.
          </p>
        </div>
      </div>

      <div className="page__body">
        {/* Company Identity Banner */}
        <div className="profile-header">
          <div className="profile-avatar" style={{ borderRadius: 'var(--radius-lg)' }}>
            <Building2 size={36} />
          </div>
          <div className="profile-info">
            <h2>{company?.legalName || 'ABC Technologies Pvt. Ltd.'}</h2>
            <p style={{ fontWeight: 600, color: 'var(--color-govt-blue)' }}>Category: {company?.category || 'IT & Electronics'}</p>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
              {company?.address || '42, Tech Park, Sector 62, Noida, Uttar Pradesh 201309'}
            </p>
          </div>
        </div>

        {/* Verification Status Cards Grid */}
        <div className="page__card">
          <h2 className="page__card-title">Statutory Identification Numbers</h2>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Company Registration (CIN)</div>
              <div className="info-value" style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--color-govt-blue)' }}>
                {company?.registrationNumber || 'U72200DL2015PTC281456'}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">GSTIN Identifier</div>
              <div className="info-value" style={{ fontFamily: 'monospace', fontWeight: 600 }}>
                {company?.gstin || '07AABCA1234B1Z5'}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">PAN Number</div>
              <div className="info-value" style={{ fontFamily: 'monospace', fontWeight: 600 }}>
                {company?.pan || 'AABCA1234B'}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Udyam Registration Number</div>
              <div className="info-value" style={{ fontFamily: 'monospace', fontWeight: 600 }}>
                {company?.udyamNumber || 'UDYAM-DL-07-0012345'}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Verification Checklist */}
        <div className="page__card">
          <h2 className="page__card-title">Statutory Document Verification Status</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>
            {[
              { label: 'Company Incorporation Certificate', status: vStatus.registration },
              { label: 'GSTIN Portal Verification', status: vStatus.gst },
              { label: 'PAN Card Validation', status: vStatus.pan },
              { label: 'Udyam / MSME Registration', status: vStatus.udyam },
              { label: 'Authorised Representative Resolution', status: vStatus.authorisedRep },
              { label: 'Bank Account & Solvency Proof', status: vStatus.bankDetails },
            ].map((item, i) => (
              <div key={i} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--color-white)' }}>
                <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text)' }}>{item.label}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', background: item.status ? 'var(--color-green-bg)' : 'var(--color-amber-bg)', color: item.status ? 'var(--color-green)' : 'var(--color-amber)' }}>
                  <CheckCircle2 size={12} /> {item.status ? 'VERIFIED' : 'PENDING'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
