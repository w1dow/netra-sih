import React from 'react';
import { Users, Building2, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import './Pages.css';

const sampleBidders = [
  { name: 'Tata Consulting Engineers Ltd.', location: 'Mumbai', registrations: 5, compliance: 'Verified', category: 'IT & Electronics' },
  { name: 'Larsen & Toubro Infrastructure', location: 'New Delhi', registrations: 8, compliance: 'Verified', category: 'Infrastructure' },
  { name: 'Bharat Electronics Limited', location: 'Bangalore', registrations: 12, compliance: 'Verified', category: 'Defence & Security' },
  { name: 'Wipro Healthcare Solutions', location: 'Hyderabad', registrations: 3, compliance: 'Under Review', category: 'Healthcare' },
  { name: 'Adani Solar Energy Pvt. Ltd.', location: 'Ahmedabad', registrations: 6, compliance: 'Verified', category: 'Energy' },
  { name: 'HCL Technologies', location: 'Noida', registrations: 9, compliance: 'Verified', category: 'IT & Electronics' },
];

export default function BiddersPage() {
  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          <h1 className="page__title">Registered Bidders</h1>
          <p className="page__description">
            View and manage registered bidder organisations and their compliance status.
          </p>
        </div>
      </div>
      <div className="page__body">
        <div className="page__stats-grid">
          <div className="page__stat-card">
            <div className="page__stat-value">2,341</div>
            <div className="page__stat-label">Total Bidders</div>
          </div>
          <div className="page__stat-card">
            <div className="page__stat-value">1,987</div>
            <div className="page__stat-label">Verified</div>
          </div>
          <div className="page__stat-card">
            <div className="page__stat-value">354</div>
            <div className="page__stat-label">Under Review</div>
          </div>
          <div className="page__stat-card">
            <div className="page__stat-value">89</div>
            <div className="page__stat-label">New This Month</div>
          </div>
        </div>

        <div className="page__card">
          <h2 className="page__card-title">Recent Bidders</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-size-sm)' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)', textAlign: 'left' }}>
                  <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontSize: 'var(--font-size-xs)', letterSpacing: '0.04em' }}>Organisation</th>
                  <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontSize: 'var(--font-size-xs)', letterSpacing: '0.04em' }}>Location</th>
                  <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontSize: 'var(--font-size-xs)', letterSpacing: '0.04em' }}>Category</th>
                  <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontSize: 'var(--font-size-xs)', letterSpacing: '0.04em' }}>Bids</th>
                  <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontSize: 'var(--font-size-xs)', letterSpacing: '0.04em' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {sampleBidders.map((bidder, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--color-border-light)', transition: 'background 0.15s' }} onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-light-bg)')} onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                    <td style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 500 }}>{bidder.name}</td>
                    <td style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--color-text-secondary)' }}>{bidder.location}</td>
                    <td style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--color-text-secondary)' }}>{bidder.category}</td>
                    <td style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--color-text-secondary)' }}>{bidder.registrations}</td>
                    <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                        padding: '2px 8px', borderRadius: 'var(--radius-sm)',
                        fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
                        background: bidder.compliance === 'Verified' ? 'var(--color-green-bg)' : 'var(--color-amber-bg)',
                        color: bidder.compliance === 'Verified' ? 'var(--color-green)' : 'var(--color-amber)',
                      }}>
                        {bidder.compliance === 'Verified' ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                        {bidder.compliance}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
