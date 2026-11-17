import React from 'react';

/**
 * Input component conforming to DESIGN.md
 * - Height: 44px
 * - Focus: 2px solid Deep Evergreen border outline with no diffuse glow
 * - Label placed outside and above
 */
export default function Input({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
  icon: Icon,
  ...props
}) {
  const inputId = id || name;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-xs font-bold text-neutral uppercase tracking-wider mb-1.5">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-muted">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          className={`w-full h-11 px-3.5 ${Icon ? 'pl-10' : ''} bg-surface-card text-neutral text-sm rounded border ${
            error
              ? 'border-error focus:ring-1 focus:ring-error focus:border-error'
              : 'border-surface-border-strong focus:outline-none focus:border-2 focus:border-primary'
          } placeholder:text-neutral-muted/60 disabled:bg-surface-subtle disabled:cursor-not-allowed transition-all`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-error font-medium">{error}</p>}
      {!error && helperText && <p className="mt-1 text-xs text-neutral-muted">{helperText}</p>}
    </div>
  );
}
