import React from 'react';
import { User as UserIcon, Mail, Building2, Shield, Calendar, FileText, CheckCircle, MapPin, Phone, Award, AlertCircle } from 'lucide-react';
import { useCurrentUser, useCompany } from '@/hooks';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import '../Pages.css';

export default function ProfilePage() {
  const { data: user, loading: userLoading, error: userError, refetch: refetchUser } = useCurrentUser();
  const { data: company, loading: companyLoading } = useCompany(user?.companyId || 'company-001');

  if (userLoading || companyLoading) {
    return (
      <div className="page" style={{ paddingTop: 'calc(64px + var(--space-8))' }}>
        <LoadingState message="Loading bidder profile..." height="400px" />
      </div>
    );
  }

  if (userError) {
    return (
      <div className="page" style={{ paddingTop: 'calc(64px + var(--space-8))' }}>
        <div className="page__body">
          <ErrorState error={userError} onRetry={refetchUser} />
        </div>
      </div>
    );
  }

  const companyName = company?.legalName || 'ABC Technologies Pvt. Ltd.';
  const stats = company?.biddingStats || {
    tendersParticipated: 12,
    activeBids: 4,
    complianceScore: 94,
    documentsVerified: 28,
    riskStatus: 'LOW',
  };

  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          <h1 className="page__title">Bidder Profile & Account</h1>
          <p className="page__description">Manage your company credentials, authorised representative details and verification status.</p>
        </div>
      </div>
      <div className="page__body">

        {/* Personal & Authorised Representative Details */}
        <div className="profile-header">
          <div className="profile-avatar">
            <UserIcon size={36} />
          </div>
          <div className="profile-info">
            <h2>{user?.name || 'Rajesh Kumar'}</h2>
            <p style={{ fontWeight: 600, color: 'var(--color-govt-blue)' }}>{user?.designation || 'Business Development Manager'}</p>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
              Authorised Representative — {companyName}
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-3)', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                <Mail size={14} /> {user?.email || 'rajesh.kumar@abctech.in'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                <Phone size={14} /> {user?.phone || '+91 98765 43210'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                <MapPin size={14} /> New Delhi, India
              </span>
            </div>
          </div>
        </div>

        {/* Bidding Summary Cards */}
        <div className="page__card">
          <h2 className="page__card-title">Bidding Performance Overview</h2>
          <div className="page__stats-grid">
            <div className="page__stat-card">
              <div className="page__stat-value">{stats.tendersParticipated}</div>
              <div className="page__stat-label">Tenders Participated</div>
            </div>
            <div className="page__stat-card">
              <div className="page__stat-value">{stats.activeBids}</div>
              <div className="page__stat-label">Active Bids</div>
            </div>
            <div className="page__stat-card">
              <div className="page__stat-value" style={{ color: 'var(--color-green)' }}>{stats.complianceScore}%</div>
              <div className="page__stat-label">Avg. Compliance Score</div>
            </div>
            <div className="page__stat-card">
              <div className="page__stat-value">{stats.documentsVerified}</div>
              <div className="page__stat-label">Documents Verified</div>
            </div>
          </div>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Bidder Registration ID</div>
              <div className="info-value" style={{ fontFamily: 'monospace', color: 'var(--color-govt-blue)' }}>NETRA/BID/2026/00482</div>
            </div>
            <div className="info-item">
              <div className="info-label">Bidder Account Status</div>
              <div className="info-value">
                <span style={{ color: 'var(--color-green)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle size={14} /> Active & Verified
                </span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">GeM Portal Integration</div>
              <div className="info-value">Synced & Compliant</div>
            </div>
            <div className="info-item">
              <div className="info-label">Entity Risk Rating</div>
              <div className="info-value">
                <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'var(--color-green-bg)', color: 'var(--color-green)', fontSize: 'var(--font-size-xs)', fontWeight: 700 }}>
                  {stats.riskStatus || 'LOW RISK'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Company Specifications & Statutory Status */}
        <div className="form-row" style={{ marginTop: 'var(--space-5)' }}>
          <div className="page__card" style={{ marginTop: 0 }}>
            <h2 className="page__card-title">Company Profile Details</h2>
            <div className="info-grid" style={{ gridTemplateColumns: '1fr' }}>
              <div className="info-item">
                <div className="info-label">Legal Entity Name</div>
                <div className="info-value" style={{ fontWeight: 600 }}>{companyName}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Registration Number (CIN)</div>
                <div className="info-value" style={{ fontFamily: 'monospace' }}>{company?.registrationNumber || 'U72200DL2015PTC281456'}</div>
              </div>
              <div className="info-item">
                <div className="info-label">GSTIN</div>
                <div className="info-value" style={{ fontFamily: 'monospace' }}>{company?.gstin || '07AABCA1234Z1Z5'}</div>
              </div>
              <div className="info-item">
                <div className="info-label">PAN</div>
                <div className="info-value" style={{ fontFamily: 'monospace' }}>{company?.pan || 'AABCA1234B'}</div>
              </div>
              <div className="info-item">
                <div className="info-label">MSME / Udyam Number</div>
                <div className="info-value" style={{ fontFamily: 'monospace' }}>{company?.udyamNumber || 'UDYAM-DL-07-0012345'}</div>
              </div>
            </div>
          </div>

          <div className="page__card" style={{ marginTop: 0 }}>
            <h2 className="page__card-title">Statutory Verification Status</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {[
                { name: 'Company Incorporation Certificate', key: 'registration' },
                { name: 'GSTIN Registration Verification', key: 'gst' },
                { name: 'PAN Card Validation', key: 'pan' },
                { name: 'Udyam / MSME Registration', key: 'udyam' },
                { name: 'Authorised Representative Resolution', key: 'authorisedRep' },
                { name: 'Bank Details & Canceled Cheque', key: 'bankDetails' },
              ].map((item, i) => {
                const isVerified = company?.verificationStatus ? (company.verificationStatus as any)[item.key] !== false : true;
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3)', border: '1px solid var(--color-border-light)', borderRadius: 'var(--radius-md)' }}>
                    <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>{item.name}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', borderRadius: 'var(--radius-sm)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', background: isVerified ? 'var(--color-green-bg)' : 'var(--color-amber-bg)', color: isVerified ? 'var(--color-green)' : 'var(--color-amber)' }}>
                      <CheckCircle size={12} /> {isVerified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
