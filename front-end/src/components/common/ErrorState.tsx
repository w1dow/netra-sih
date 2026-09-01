import React from 'react';
import { AlertTriangle, RefreshCw, WifiOff, ShieldAlert, FileX } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ApiError } from '../../types';
import './common.css';

interface ErrorStateProps {
  error?: ApiError | any;
  onRetry?: () => void;
  title?: string;
  message?: string;
}

export default function ErrorState({ error, onRetry, title, message }: ErrorStateProps) {
  const status = error?.status;
  const code = error?.code;

  let displayTitle = title || 'Unable to Process Request';
  let displayMessage = message || error?.message || 'An unexpected error occurred while communicating with the server.';
  let Icon = AlertTriangle;

  if (status === 401) {
    displayTitle = 'Session Expired / Authentication Required';
    displayMessage = 'Your session has expired. Please log in again to access this resource.';
    Icon = ShieldAlert;
  } else if (status === 403) {
    displayTitle = 'Access Denied (403)';
    displayMessage = 'You do not have permission to view or modify this tender resource.';
    Icon = ShieldAlert;
  } else if (status === 404) {
    displayTitle = 'Resource Not Found (404)';
    displayMessage = error?.message || 'The requested tender item or endpoint could not be found.';
    Icon = FileX;
  } else if (status >= 500) {
    displayTitle = 'Server Error (500)';
    displayMessage = 'The NETRA server encountered an error processing your request. Please try again later.';
    Icon = AlertTriangle;
  } else if (!status || code === 'NETWORK_ERROR') {
    displayTitle = 'Unable to Connect to Server';
    displayMessage = 'Could not reach the NETRA backend services. Please check your internet connection or backend server status.';
    Icon = WifiOff;
  }

  return (
    <div className="netra-error-state" role="alert">
      <div className="netra-error-state__icon">
        <Icon size={40} />
      </div>
      <h3 className="netra-error-state__title">{displayTitle}</h3>
      <p className="netra-error-state__message">{displayMessage}</p>
      {code && <span className="netra-error-state__code">Error Code: {code}</span>}
      <div className="netra-error-state__actions">
        {onRetry && (
          <button onClick={onRetry} className="btn btn--primary">
            <RefreshCw size={16} /> Retry Request
          </button>
        )}
        {status === 401 && (
          <Link to="/login" className="btn btn--saffron">
            Go to Login
          </Link>
        )}
        <Link to="/" className="btn btn--secondary">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
