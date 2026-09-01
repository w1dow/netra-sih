import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, FileText, ArrowLeft, ShieldAlert } from 'lucide-react';
import './common.css';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="netra-404-container">
      <div className="netra-404-card">
        <div className="netra-404-badge">
          <ShieldAlert size={28} />
          <span>ERROR 404</span>
        </div>
        <h1 className="netra-404-title">Page Not Found</h1>
        <p className="netra-404-message">
          The page you are looking for doesn't exist, has been moved, or is temporarily unavailable in the NETRA portal.
        </p>
        <div className="netra-404-actions">
          <Link to="/" className="btn btn--primary">
            <Home size={16} /> Go to Home
          </Link>
          <Link to="/tenders" className="btn btn--saffron">
            <FileText size={16} /> View Active Tenders
          </Link>
          <button onClick={() => navigate(-1)} className="btn btn--secondary">
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
