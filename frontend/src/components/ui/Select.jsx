import React from 'react';

export default function Select({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
  ...props
}) {
  const selectId = id || name;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={selectId} className="block text-xs font-bold text-neutral uppercase tracking-wider mb-1.5">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`w-full h-11 px-3 bg-surface-card text-neutral text-sm rounded border ${
          error
            ? 'border-error focus:ring-1 focus:ring-error'
            : 'border-surface-border-strong focus:outline-none focus:border-2 focus:border-primary'
        } disabled:bg-surface-subtle disabled:cursor-not-allowed transition-all`}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-error font-medium">{error}</p>}
      {!error && helperText && <p className="mt-1 text-xs text-neutral-muted">{helperText}</p>}
    </div>
  );
}
