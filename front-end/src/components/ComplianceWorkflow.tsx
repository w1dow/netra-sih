import React from 'react';
import { Upload, Scan, ShieldCheck, UserCheck } from 'lucide-react';
import { complianceWorkflowSteps } from '@/data';
import './ComplianceWorkflow.css';

const iconMap: Record<string, React.ComponentType<{ size: number }>> = {
  Upload,
  Scan,
  ShieldCheck,
  UserCheck,
};

export default function ComplianceWorkflow() {
  return (
    <div className="compliance-workflow-wrapper">
      <div className="compliance-workflow">
        {complianceWorkflowSteps.map((step, index) => {
          const Icon = iconMap[step.icon] || ShieldCheck;
          return (
            <div key={step.id} className={`workflow-stage stage-${index + 1}`}>
              <div className="workflow-stage__content">
                <div className="workflow-stage__header">
                  <span className="workflow-stage__number">0{index + 1}</span>
                  <Icon size={24} className="workflow-stage__icon" />
                </div>
                <h4 className="workflow-stage__title">{step.title}</h4>
                <p className="workflow-stage__desc">{step.description}</p>
              </div>
              {/* Arrow tail for next stage (using CSS borders in the stylesheet) */}
              {index < complianceWorkflowSteps.length - 1 && (
                <div className="workflow-stage__arrow-head"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
