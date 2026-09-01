import React, { useState } from 'react';
import { ShieldCheck, Upload, FileText, CheckCircle2, AlertTriangle, XCircle, Clock, Download, ChevronDown, ChevronUp, FileCode } from 'lucide-react';
import ComplianceWorkflow from './components/ComplianceWorkflow';
import { useCompliance } from '@/hooks';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import type { ComplianceRequirement, ComplianceStage, RequirementStatus } from '@/types';
import '../Pages.css';

export default function CompliancePage() {
  const { data: assessment, loading, error, refetch } = useCompliance('bid-001');
  const [expandedRequirementId, setExpandedRequirementId] = useState<string | null>('req-20');

  const getStatusIcon = (status: RequirementStatus) => {
    switch (status) {
      case 'VERIFIED':
        return <CheckCircle2 size={18} style={{ color: 'var(--color-green)' }} />;
      case 'REVIEW_REQUIRED':
        return <AlertTriangle size={18} style={{ color: 'var(--color-amber)' }} />;
      case 'NOT_COMPLIANT':
        return <XCircle size={18} style={{ color: '#dc2626' }} />;
      default:
        return <Clock size={18} style={{ color: 'var(--color-text-light)' }} />;
    }
  };

  const getStatusBadge = (status: RequirementStatus) => {
    let bg = 'var(--color-light-bg)';
    let color = 'var(--color-text-secondary)';
    let text = status.replace(/_/g, ' ');

    if (status === 'VERIFIED') {
      bg = 'var(--color-green-bg)';
      color = 'var(--color-green)';
    } else if (status === 'REVIEW_REQUIRED') {
      bg = 'var(--color-amber-bg)';
      color = 'var(--color-amber-dark)';
    } else if (status === 'NOT_COMPLIANT') {
      bg = '#FEE2E2';
      color = '#DC2626';
    }

    return (
      <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', background: bg, color: color }}>
        {text}
      </span>
    );
  };

  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          <h1 className="page__title">Bid Compliance Verification</h1>
          <p className="page__description">
            Upload bidder documents and run AI-powered compliance verification against tender requirements.
          </p>
        </div>
      </div>

      <div className="page__body">

        {/* Upload Section */}
        <div className="page__card">
          <h2 className="page__card-title">Upload Bidder Documents</h2>
          <div
            style={{
              border: '2px dashed var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-8)',
              textAlign: 'center',
              background: 'var(--color-light-bg)',
              cursor: 'pointer',
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-govt-blue)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
          >
            <Upload size={36} style={{ color: 'var(--color-govt-blue)', margin: '0 auto var(--space-3)' }} />
            <p style={{ fontWeight: 600, color: 'var(--color-text)', marginBottom: 'var(--space-1)' }}>
              Drop document files here or click to select
            </p>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
              PDF, DOCX, XLSX, ZIP — Max 25MB per document file
            </p>
          </div>
          <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)' }}>
            <button className="btn btn--primary" onClick={() => refetch()}>
              <ShieldCheck size={16} />
              Run AI Compliance Verification
            </button>
          </div>
        </div>

        {/* 4-Stage Horizontal Workflow */}
        <div className="page__card">
          <h2 className="page__card-title">Verification Workflow</h2>
          <ComplianceWorkflow />
        </div>

        {/* Compliance Results Section */}
        <div className="page__card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
            <div>
              <h2 className="page__card-title" style={{ marginBottom: '4px' }}>AI Compliance Report & Checklist</h2>
              <p className="page__card-text">
                Detailed stage-by-stage requirement evaluation generated from uploaded bidder documents.
              </p>
            </div>
            {assessment && (
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Overall Score</span>
                <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: assessment.overallScore >= 90 ? 'var(--color-green)' : 'var(--color-amber)' }}>
                  {assessment.overallScore}%
                </div>
              </div>
            )}
          </div>

          {loading ? (
            <LoadingState message="Evaluating document compliance..." />
          ) : error ? (
            <ErrorState error={error} onRetry={refetch} />
          ) : assessment ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {assessment.stages.map((stage: ComplianceStage) => (
                <div key={stage.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                  {/* Stage Header */}
                  <div style={{ background: 'var(--color-light-bg)', padding: 'var(--space-4) var(--space-5)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-light)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <span style={{ fontWeight: 800, color: 'var(--color-govt-blue)', fontSize: 'var(--font-size-sm)' }}>STAGE 0{stage.order}</span>
                      <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: 'var(--color-deep-navy)' }}>{stage.title}</h3>
                    </div>
                    {getStatusBadge(stage.status)}
                  </div>

                  {/* Requirements List */}
                  <div style={{ padding: 'var(--space-2)' }}>
                    {stage.requirements.map((req: ComplianceRequirement) => {
                      const isExpanded = expandedRequirementId === req.id;
                      return (
                        <div key={req.id} style={{ borderBottom: '1px solid var(--color-border-light)', padding: 'var(--space-3) var(--space-4)' }}>
                          <div
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                            onClick={() => setExpandedRequirementId(isExpanded ? null : req.id)}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                              {getStatusIcon(req.status)}
                              <div>
                                <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text)' }}>{req.title}</h4>
                                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>{req.description}</p>
                              </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                              {getStatusBadge(req.status)}
                              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>
                          </div>

                          {/* Expanded Content: Attached Documents & AI Message */}
                          {isExpanded && (
                            <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-4)', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-light)' }}>
                              {req.verificationMessage && (
                                <div style={{ marginBottom: 'var(--space-3)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', background: req.status === 'NOT_COMPLIANT' ? '#FEF2F2' : '#FFFBEB', border: `1px solid ${req.status === 'NOT_COMPLIANT' ? '#FCA5A5' : '#FDE68A'}`, fontSize: 'var(--font-size-xs)', color: req.status === 'NOT_COMPLIANT' ? '#991B1B' : '#92400E' }}>
                                  <strong>AI Findings:</strong> {req.verificationMessage}
                                </div>
                              )}

                              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>
                                Attached Verification Document
                              </div>

                              {req.documents && req.documents.length > 0 ? (
                                req.documents.map(doc => (
                                  <div key={doc.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3)', background: 'var(--color-white)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                      <FileCode size={20} style={{ color: 'var(--color-govt-blue)' }} />
                                      <div>
                                        <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600 }}>{doc.fileName}</div>
                                        <div style={{ fontSize: '10px', color: 'var(--color-text-light)' }}>
                                          {(doc.fileSize ? (doc.fileSize / 1024 / 1024).toFixed(2) + ' MB' : 'PDF')} • Uploaded {new Date(doc.uploadedAt).toLocaleDateString('en-IN')}
                                        </div>
                                      </div>
                                    </div>
                                    <a href={doc.downloadUrl || '#'} className="btn btn--secondary" style={{ padding: '2px 8px', fontSize: '11px' }}>
                                      <Download size={12} /> View Document
                                    </a>
                                  </div>
                                ))
                              ) : (
                                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                                  No document uploaded for this requirement yet.
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
