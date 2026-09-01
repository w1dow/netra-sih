import React from 'react';
import { User, Mail, Building2, Shield, Calendar, FileText, CheckCircle, MapPin, Phone } from 'lucide-react';
import { currentUser } from '@/data';
import './Pages.css';

export default function ProfilePage() {
  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          <h1 className="page__title">My Profile</h1>
          <p className="page__description">Manage your account, company details and tender participation.</p>
        </div>
      </div>
      <div className="page__body">
        
        {/* Personal Details */}
        <div className="profile-header">
          <div className="profile-avatar">
            <User size={36} />
          </div>
          <div className="profile-info">
            <h2>{currentUser.name}</h2>
            <p style={{ fontWeight: 600 }}>{currentUser.role.split('\n')[0]}</p>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
              {currentUser.role.split('\n')[1]} — {currentUser.department}
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-3)', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                <Mail size={14} /> {currentUser.email}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                <Phone size={14} /> +91 98765 43210
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                <MapPin size={14} /> New Delhi, India
              </span>
            </div>
          </div>
        </div>

        <div className="page__card">
          <h2 className="page__card-title">Bidding Profile</h2>
          <div className="page__stats-grid">
            <div className="page__stat-card">
              <div className="page__stat-value">12</div>
              <div className="page__stat-label">Tenders Participated</div>
            </div>
            <div className="page__stat-card">
              <div className="page__stat-value">4</div>
              <div className="page__stat-label">Active Bids</div>
            </div>
            <div className="page__stat-card">
              <div className="page__stat-value" style={{ color: 'var(--color-green)' }}>94%</div>
              <div className="page__stat-label">Compliance Score</div>
            </div>
            <div className="page__stat-card">
              <div className="page__stat-value">28</div>
              <div className="page__stat-label">Documents Verified</div>
            </div>
          </div>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Bidder ID</div>
              <div className="info-value" style={{ fontFamily: 'monospace', color: 'var(--color-govt-blue)' }}>NETRA/BID/2026/00482</div>
            </div>
            <div className="info-item">
              <div className="info-label">Bidder Status</div>
              <div className="info-value">
                <span style={{ color: 'var(--color-green)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle size={14} /> Active
                </span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Registration Status</div>
              <div className="info-value">Verified</div>
            </div>
            <div className="info-item">
              <div className="info-label">Risk Status</div>
              <div className="info-value">
                <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'var(--color-green-bg)', color: 'var(--color-green)', fontSize: 'var(--font-size-xs)', fontWeight: 700 }}>LOW</span>
              </div>
            </div>
          </div>
        </div>

        <div className="form-row" style={{ marginTop: 'var(--space-5)' }}>
          <div className="page__card" style={{ marginTop: 0 }}>
            <h2 className="page__card-title">Company Details</h2>
            <div className="info-grid" style={{ gridTemplateColumns: '1fr' }}>
              <div className="info-item">
                <div className="info-label">Company Name</div>
                <div className="info-value">{currentUser.department}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Company Type</div>
                <div className="info-value">Private Limited</div>
              </div>
              <div className="info-item">
                <div className="info-label">Business Category</div>
                <div className="info-value">IT & Electronics</div>
              </div>
              <div className="info-item">
                <div className="info-label">GSTIN</div>
                <div className="info-value" style={{ fontFamily: 'monospace' }}>07AABCA1234Z1Z5</div>
              </div>
              <div className="info-item">
                <div className="info-label">PAN</div>
                <div className="info-value" style={{ fontFamily: 'monospace' }}>AABCA****Z</div>
              </div>
            </div>
          </div>

          <div className="page__card" style={{ marginTop: 0 }}>
            <h2 className="page__card-title">Verification Status</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {[
                'Company Registration',
                'GST Verification',
                'PAN Verification',
                'Udyam/MSME Registration',
                'Authorised Representative',
                'Bank Details'
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3)', border: '1px solid var(--color-border-light)', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>{item}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', borderRadius: 'var(--radius-sm)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', background: 'var(--color-green-bg)', color: 'var(--color-green)' }}>
                    <CheckCircle size={12} /> Verified
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
