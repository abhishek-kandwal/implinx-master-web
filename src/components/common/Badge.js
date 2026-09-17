import React from 'react';

export const Badge = ({
  children,
  variant = 'default', // 'default' | 'primary' | 'success' | 'warning' | 'outline'
  size = 'md',
  icon: Icon = null,
  className = '',
  ...rest
}) => {
  return (
    <span className={`badge badge-${variant} ${className}`} {...rest}>
      {Icon && <Icon size={size === 'sm' ? 12 : 14} />}
      {children}
    </span>
  );
};
