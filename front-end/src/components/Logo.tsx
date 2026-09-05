import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const heights: Record<NonNullable<LogoProps['size']>, number> = {
    sm: 36,
    md: 52,
    lg: 72,
  };

  const h = heights[size];

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      <img
        src="/netra-logo.png"
        alt="NETRA — National Evaluation and Tender Risk Assessment"
        style={{
          height: h,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
          /* PNG has transparency — no background rectangle */
          imageRendering: 'auto',
        }}
      />
    </div>
  );
}
