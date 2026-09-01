import React from 'react';
import { Link } from 'react-router-dom';
import { FileX, ArrowLeft, Building2, ShieldAlert } from 'lucide-react';
import './common.css';

interface ResourceNotFoundProps {
  resourceType: 'Tender' | 'Bid' | 'Compliance Information' | 'Company' | 'Notification';
  resourceId?: string;
  backLink?: string;
  backLabel?: string;
}

export default function ResourceNotFound({
  resourceType,
  resourceId,
  backLink = '/tenders',
  backLabel = 'Back to Active Tenders',
}: ResourceNotFoundProps) {
  return (
    <div className="netra-resource-not-found">
      <div className="netra-resource-not-found__card">
        <div className="netra-resource-not-found__icon">
          <FileX size={44} />
        </div>
        <h2>{resourceType} Not Found</h2>
        {resourceId && (
          <p className="netra-resource-not-found__id">
            Requested ID: <code>{resourceId}</code>
          </p>
        )}
        <p className="netra-resource-not-found__text">
          The {resourceType.toLowerCase()} you are looking for could not be found in the NETRA database or may have been archived.
        </p>
        <div className="netra-resource-not-found__actions">
          <Link to={backLink} className="btn btn--primary">
            <ArrowLeft size={16} /> {backLabel}
          </Link>
          <Link to="/" className="btn btn--secondary">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
