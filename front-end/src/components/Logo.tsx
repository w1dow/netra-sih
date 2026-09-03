import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const heights: Record<NonNullable<LogoProps['size']>, number> = {
    sm: 32,
    md: 44,
    lg: 60,
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
      <img
        src="/netra-logo.jpeg"
        alt="NETRA — National Evaluation & Tender Audit"
        style={{
          height: heights[size],
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
}
