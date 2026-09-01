import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import '../../Pages.css';

export default function EditBid() {
  const { bidId } = useParams();

  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          {/* Breadcrumbs */}
          <div style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Link to="/my-tenders" style={{ color: 'var(--color-govt-blue)', textDecoration: 'none' }}>My Tenders</Link>
            <span>/</span>
            <Link to={`/my-tenders/${bidId}`} style={{ color: 'var(--color-govt-blue)', textDecoration: 'none' }}>{bidId}</Link>
            <span>/</span>
            <span>Edit</span>
          </div>
          
          <h1 className="page__title">Edit Bid</h1>
          <p className="page__description">
            Update your bid information and replace documents before the deadline.
          </p>
        </div>
      </div>
      
      <div className="page__body">
        <div className="page__card">
          <h2 className="page__card-title">Bid Information</h2>
          <div className="form-group">
            <label className="form-label">Bid Value (INR)</label>
            <input type="text" className="form-input" defaultValue="2,40,00,000" />
          </div>
          
          <div className="form-group">
            <label className="form-label">Technical Notes</label>
            <textarea className="form-input" rows={4} defaultValue="System architecture includes dual-redundant AI edge nodes..." />
          </div>
          
          <div style={{ display: 'flex', gap: '12px', marginTop: 'var(--space-6)' }}>
            <button className="btn btn--primary">
              <Save size={16} /> Save Changes
            </button>
            <Link to={`/my-tenders/${bidId}`} className="btn btn--secondary">
              <X size={16} /> Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
