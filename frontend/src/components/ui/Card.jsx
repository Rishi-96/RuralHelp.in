import React from 'react';

/**
 * Card / Ledger Block component conforming to DESIGN.md
 * - Background: #FFFFFF (surface-card)
 * - Border: 1px solid rgba(30, 41, 59, 0.12)
 * - Internal sections separated by continuous 1px rules
 * - Optional header tinted #F4EFEA
 */
export default function Card({
  children,
  header,
  headerRight,
  footer,
  className = '',
  bodyClassName = 'p-5 sm:p-6',
  hover = false,
  ...props
}) {
  return (
    <div
      className={`bg-surface-card border border-surface-border rounded-lg overflow-hidden ${
        hover ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-tactile' : ''
      } ${className}`}
      {...props}
    >
      {header && (
        <div className="bg-surface-subtle px-5 py-3.5 border-b border-surface-border flex items-center justify-between">
          <div className="font-sans font-bold text-sm tracking-wide text-neutral">
            {header}
          </div>
          {headerRight && <div>{headerRight}</div>}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
      {footer && (
        <div className="bg-surface-subtle/50 px-5 py-3 border-t border-surface-border">
          {footer}
        </div>
      )}
    </div>
  );
}
