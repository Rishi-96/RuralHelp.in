import React from 'react';

export default function Textarea({
  label,
  id,
  name,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  required = false,
  rows = 4,
  disabled = false,
  className = '',
  ...props
}) {
  const textareaId = id || name;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={textareaId} className="block text-xs font-bold text-neutral uppercase tracking-wider mb-1.5">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        className={`w-full p-3 bg-surface-card text-neutral text-sm rounded border ${
          error
            ? 'border-error focus:ring-1 focus:ring-error focus:border-error'
            : 'border-surface-border-strong focus:outline-none focus:border-2 focus:border-primary'
        } placeholder:text-neutral-muted/60 disabled:bg-surface-subtle disabled:cursor-not-allowed transition-all`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-error font-medium">{error}</p>}
      {!error && helperText && <p className="mt-1 text-xs text-neutral-muted">{helperText}</p>}
    </div>
  );
}
