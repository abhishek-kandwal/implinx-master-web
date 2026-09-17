import React from 'react';

export const Card = ({
  children,
  interactive = false,
  glass = false,
  className = '',
  onClick = null,
  style = {},
  ...rest
}) => {
  const classes = [
    'card',
    interactive && 'card-interactive',
    glass && 'card-glass',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} onClick={onClick} style={style} {...rest}>
      {children}
    </div>
  );
};
