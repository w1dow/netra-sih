import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileText, ArrowLeft, Edit3, ShieldCheck } from 'lucide-react';
import '../MyTenders.tsx'; // Ensure we can route properly
import '../../Pages.css';

export default function BidDetails() {
  const { bidId } = useParams();

  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          {/* Breadcrumbs */}
          <div style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Link to="/my-tenders" style={{ color: 'var(--color-govt-blue)', textDecoration: 'none' }}>My Tenders</Link>
            <span>/</span>
            <span>{bidId}</span>
          </div>
          
          <h1 className="page__title">Bid Details: {bidId}</h1>
          <p className="page__description">
            Complete details and status of your submitted bid.
          </p>
        </div>
      </div>
      <div className="page__body">
        
        <div className="page__card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
            <h2 className="page__card-title" style={{ margin: 0 }}>Tender Information</h2>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link to={`/my-tenders/${bidId}/edit`} className="btn btn--primary">
                <Edit3 size={16} /> Edit Bid
              </Link>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
            <div>
              <p style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Bid Status</p>
              <div style={{ fontWeight: 600, color: 'var(--color-green)' }}>Submitted</div>
            </div>
            <div>
              <p style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Submission Date</p>
              <div style={{ fontWeight: 600 }}>05 Sep 2026, 14:30 IST</div>
            </div>
          </div>
        </div>

        <div className="page__card">
          <h2 className="page__card-title">Uploaded Documents</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', border: '1px solid var(--color-border-light)', borderRadius: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FileText size={20} color="var(--color-govt-blue)" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>Technical_Proposal.pdf</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>4.2 MB • Uploaded on 04 Sep 2026</div>
                </div>
              </div>
              <ShieldCheck size={18} color="var(--color-green)" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
