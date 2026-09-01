import React from 'react';
import { ShieldCheck, Upload } from 'lucide-react';
import ComplianceWorkflow from '@/components/ComplianceWorkflow';
import ComplianceCheckItem from '@/components/ComplianceCheckItem';
import { complianceChecks } from '@/data';
import './Pages.css';

export default function CompliancePage() {
  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          <h1 className="page__title">Bid Compliance Verification</h1>
          <p className="page__description">
            Upload bidder documents and run AI-powered compliance checks against tender requirements.
          </p>
        </div>
      </div>
      <div className="page__body">
        {/* Upload section */}
        <div className="page__card">
          <h2 className="page__card-title">Upload Bidder Documents</h2>
          <div style={{
            border: '2px dashed var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-10)',
            textAlign: 'center',
            background: 'var(--color-light-bg)',
            cursor: 'pointer',
            transition: 'border-color 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-govt-blue)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
          >
            <Upload size={32} style={{ color: 'var(--color-text-light)', margin: '0 auto var(--space-3)' }} />
            <p style={{ fontWeight: 600, color: 'var(--color-text)', marginBottom: 'var(--space-1)' }}>
              Drop files here or click to upload
            </p>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
              PDF, DOCX, XLSX — Max 25MB per file
            </p>
          </div>
          <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)' }}>
            <button className="btn btn--primary">
              <ShieldCheck size={16} />
              Run Compliance Check
            </button>
          </div>
        </div>

        {/* Workflow */}
        <div className="page__card">
          <h2 className="page__card-title">Verification Workflow</h2>
          <ComplianceWorkflow />
        </div>

        {/* Checks */}
        <div className="page__card">
          <h2 className="page__card-title">Compliance Checklist</h2>
          <p className="page__card-text" style={{ marginBottom: 'var(--space-4)' }}>
            Below is a sample AI-generated compliance report. In production, results will be generated from uploaded bidder documents.
          </p>
          <div style={{
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}>
            {complianceChecks.map((check) => (
              <ComplianceCheckItem key={check.id} check={check} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
