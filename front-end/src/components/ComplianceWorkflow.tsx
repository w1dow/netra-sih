import React, { useState } from 'react';
import { Upload, Scan, ShieldCheck, UserCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { complianceWorkflowSteps } from '../constants';

const STEP_ICONS: Record<string, any> = {
  Upload,
  Scan,
  ShieldCheck,
  UserCheck,
};

export default function ComplianceWorkflow() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <div className="compliance-workflow">
      <div className="compliance-workflow__steps">
        {complianceWorkflowSteps.map((step, idx) => {
          const IconComp = STEP_ICONS[step.icon] || ShieldCheck;
          const isActive = idx === activeStepIndex;
          const isCompleted = idx < activeStepIndex;

          return (
            <div
              key={step.id}
              onClick={() => setActiveStepIndex(idx)}
              className={`compliance-workflow__step-card ${isActive ? 'compliance-workflow__step-card--active' : ''} ${isCompleted ? 'compliance-workflow__step-card--completed' : ''}`}
            >
              <div className="compliance-workflow__step-header">
                <span className="compliance-workflow__step-number">STEP 0{idx + 1}</span>
                {isCompleted ? <CheckCircle2 size={18} style={{ color: '#16a34a' }} /> : null}
              </div>
              <div className="compliance-workflow__icon-box">
                <IconComp size={24} />
              </div>
              <h4 className="compliance-workflow__step-title">{step.title}</h4>
              <p className="compliance-workflow__step-desc">{step.description}</p>
            </div>
          );
        })}
      </div>

      <div className="compliance-workflow__preview-box">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-saffron)', letterSpacing: '0.05em' }}>
            AI ENGINE WORKFLOW DEMO
          </span>
          <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            Active Stage: <strong>{complianceWorkflowSteps[activeStepIndex].title}</strong>
          </span>
        </div>

        <p style={{ fontSize: '14px', color: 'var(--color-text)', lineHeight: 1.6 }}>
          {activeStepIndex === 0 && 'The bidder securely uploads statutory PDFs (GST certificate, Udyam registration, PAN, Audited Balance Sheet). Digital hashes are verified on arrival.'}
          {activeStepIndex === 1 && 'Optical Character Recognition (OCR) and Natural Language Processing (NLP) extract document metadata, tax numbers, turnover numbers, and ISO validity dates.'}
          {activeStepIndex === 2 && 'Automated rule engine verifies Make-In-India local content %, MSE privilege compliance, and flags potential document inconsistencies or missing attachments.'}
          {activeStepIndex === 3 && 'Procurement officers review the AI Compliance Score (e.g. 94.5%) and audit trail report before issuing formal technical acceptance or rejection.'}
        </p>

        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveStepIndex((prev) => (prev + 1) % complianceWorkflowSteps.length)}
            className="btn btn--primary btn--sm"
          >
            <span>Next Stage Demo</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
