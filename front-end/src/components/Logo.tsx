import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ variant = 'light', size = 'md' }: LogoProps) {
  const sizes = {
    sm: { icon: 28, text: '1rem', sub: '0.55rem' },
    md: { icon: 36, text: '1.25rem', sub: '0.6rem' },
    lg: { icon: 48, text: '1.75rem', sub: '0.75rem' },
  };

  const s = sizes[size];
  const textColor = variant === 'light' ? '#FFFFFF' : 'var(--color-deep-navy)';
  const subColor = variant === 'light' ? 'rgba(255,255,255,0.7)' : 'var(--color-text-secondary)';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      {/* NETRA Icon — abstract shield + verification symbol */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Shield outline */}
        <path
          d="M24 4L6 12v12c0 11.1 7.68 21.48 18 24 10.32-2.52 18-12.9 18-24V12L24 4z"
          fill={variant === 'light' ? 'rgba(255,255,255,0.12)' : 'rgba(7,26,74,0.08)'}
          stroke={variant === 'light' ? 'rgba(255,255,255,0.5)' : 'var(--color-govt-blue)'}
          strokeWidth="1.5"
        />
        {/* Inner shield */}
        <path
          d="M24 8L10 14.4v9.6c0 8.88 5.98 17.18 14 19.2 8.02-2.02 14-10.32 14-19.2v-9.6L24 8z"
          fill={variant === 'light' ? 'rgba(255,255,255,0.08)' : 'rgba(18,59,120,0.06)'}
        />
        {/* Checkmark */}
        <path
          d="M17 24l5 5 9-10"
          stroke="var(--color-saffron)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Eye/verification dot */}
        <circle cx="24" cy="17" r="2" fill={variant === 'light' ? '#FFFFFF' : 'var(--color-govt-blue)'} opacity="0.6" />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
        <span
          style={{
            fontSize: s.text,
            fontWeight: 800,
            color: textColor,
            letterSpacing: '0.12em',
          }}
        >
          NETRA
        </span>
        <span
          style={{
            fontSize: s.sub,
            fontWeight: 400,
            color: subColor,
            letterSpacing: '0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          National Evaluation & Tender Risk Assessment
        </span>
      </div>
    </div>
  );
}
