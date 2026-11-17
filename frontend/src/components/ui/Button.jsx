import React from 'react';

/**
 * Button component following RuralHelp Design System
 * - Strictly NO pill shapes (rounded-DEFAULT is 4px)
 * - Micro-offset ink shadows for tactile feel
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-sans font-semibold tracking-wide transition-all select-none disabled:opacity-50 disabled:cursor-not-allowed rounded';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
    md: 'text-sm px-4 py-2 gap-2 h-10',
    lg: 'text-base px-6 py-3 gap-2.5 h-12',
  };

  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary-dark active:translate-y-0.5 tactile-button',
    secondary: 'bg-secondary text-neutral-dark hover:bg-secondary-sprout active:translate-y-0.5 tactile-lime-button',
    tertiary: 'bg-tertiary text-white hover:bg-tertiary-dark active:translate-y-0.5',
    outline: 'border-2 border-primary text-primary bg-transparent hover:bg-surface-subtle active:translate-y-0.5',
    ghost: 'text-neutral hover:bg-surface-subtle active:bg-surface-card',
    danger: 'bg-error text-white hover:opacity-90 active:translate-y-0.5',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!loading && Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}
