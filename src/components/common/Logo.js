import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ImPlinx Adaptive Brand Logo Component
 * Supports:
 * - variant: 'icon' | 'default' | 'full' (with tagline)
 * - size: 'sm' | 'md' | 'lg' | 'xl'
 * - asLink: boolean (defaults to true)
 */
export const Logo = ({
  variant = 'default',
  size = 'md',
  asLink = true,
  className = '',
  customTagline = null
}) => {
  const sizeMap = {
    sm: { icon: 24, fontSize: '1.05rem', taglineSize: '0.68rem', gap: '0.45rem' },
    md: { icon: 32, fontSize: '1.25rem', taglineSize: '0.75rem', gap: '0.6rem' },
    lg: { icon: 40, fontSize: '1.5rem', taglineSize: '0.85rem', gap: '0.75rem' },
    xl: { icon: 52, fontSize: '1.95rem', taglineSize: '0.95rem', gap: '0.85rem' }
  };

  const dimensions = sizeMap[size] || sizeMap.md;

  const IconSVG = (
    <svg
      width={dimensions.icon}
      height={dimensions.icon}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-grad-1" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="50%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="logo-grad-2" x1="16" y1="12" x2="48" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="#0F172A" />
      <path
        d="M22 18 C14 18 10 24 10 32 C10 40 14 46 22 46 C28 46 32 41 35 37 L29 31 C27 34 25 36 22 36 C19 36 18 34 18 32 C18 30 19 28 22 28 C25 28 27 30 29 33 L35 27 C32 23 28 18 22 18 Z"
        fill="url(#logo-grad-1)"
      />
      <path
        d="M42 46 C50 46 54 40 54 32 C54 24 50 18 42 18 C36 18 32 23 29 27 L35 33 C37 30 39 28 42 28 C45 28 46 30 46 32 C46 34 45 36 42 36 C39 36 37 34 35 31 L29 37 C32 41 36 46 42 46 Z"
        fill="url(#logo-grad-2)"
      />
      <circle cx="32" cy="32" r="3.5" fill="#FFFFFF" />
    </svg>
  );

  const LogoContent = (
    <div
      className={`implinx-logo-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: dimensions.gap,
        textDecoration: 'none'
      }}
    >
      {IconSVG}

      {variant !== 'icon' && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: dimensions.fontSize,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)'
            }}
          >
            ImPlinx
          </span>
          {variant === 'full' && (
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: dimensions.taglineSize,
                color: 'var(--text-muted)',
                fontWeight: 500,
                marginTop: '0.15rem'
              }}
            >
              {customTagline || 'One place for everything connected.'}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link to="/" aria-label="ImPlinx Home" style={{ textDecoration: 'none' }}>
        {LogoContent}
      </Link>
    );
  }

  return LogoContent;
};
