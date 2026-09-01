import React from 'react';
import { Loader2 } from 'lucide-react';
import './common.css';

interface LoadingStateProps {
  message?: string;
  height?: string;
}

export default function LoadingState({
  message = 'Loading data...',
  height = '300px',
}: LoadingStateProps) {
  return (
    <div className="netra-loading" style={{ minHeight: height }} role="status">
      <Loader2 className="netra-loading__spinner" size={36} />
      <p className="netra-loading__text">{message}</p>
    </div>
  );
}
