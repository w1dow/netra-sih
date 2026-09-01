import React from 'react';
import { Eye } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const iconSizes = { sm: 20, md: 26, lg: 34 };
  const fontSizes = { sm: '1.1rem', md: '1.4rem', lg: '1.8rem' };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
      <div
        style={{
          width: iconSizes[size] + 12,
          height: iconSizes[size] + 12,
          borderRadius: '8px',
          background: 'linear-gradient(135deg, var(--color-deep-navy, #0B192C) 0%, var(--color-govt-blue, #1E3E62) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FF6500',
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        }}
      >
        <Eye size={iconSizes[size]} />
      </div>
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: fontSizes[size],
              fontWeight: 800,
              letterSpacing: '0.05em',
              color: 'var(--color-deep-navy, #0B192C)',
              lineHeight: 1,
            }}
          >
            NETRA
          </span>
          <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--color-saffron, #FF6500)', letterSpacing: '0.1em' }}>
            NATIONAL EVALUATION & TENDER AUDIT
          </span>
        </div>
      )}
    </div>
  );
}
