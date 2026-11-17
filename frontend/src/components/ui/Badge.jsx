import React from 'react';

/**
 * Badge/Chip component conforming to DESIGN.md
 * - Flat layout with 1px border
 * - Corner radius: 4px
 * - Typography: label-md in uppercase
 */
export default function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
  icon: Icon
}) {
  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider',
    md: 'text-xs px-2.5 py-1 tracking-wider',
    lg: 'text-sm px-3 py-1.5 tracking-wide',
  };

  const variantStyles = {
    // Active / Success: lime tones
    success: 'bg-[#F7FEE7] text-[#3F6212] border border-[#84CC16]/40',
    // Pending / Escrow: amber tones
    warning: 'bg-[#FFFBEB] text-[#B45309] border border-[#D97706]/30',
    // Primary / Deep Evergreen
    primary: 'bg-primary/10 text-primary border border-primary/30',
    // Secondary / Vital Lime
    secondary: 'bg-secondary/20 text-secondary-dark border border-secondary/50',
    // Archived / Neutral
    neutral: 'bg-[#F1F5F9] text-[#475569] border border-neutral/15',
    // Error
    danger: 'bg-error/10 text-error border border-error/30',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold uppercase rounded ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}
