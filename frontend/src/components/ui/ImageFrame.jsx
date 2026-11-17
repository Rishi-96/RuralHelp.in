import React from 'react';

/**
 * Image Frame as specified in DESIGN.md:
 * "Every merchant photo or product thumbnail is encased in a 1px solid border
 * (rgba(30, 41, 59, 0.15)) with an internal 2px inset white matting line,
 * celebrating local store owners and authentic craft with museum-grade care."
 */
export default function ImageFrame({
  src,
  alt = '',
  aspectRatio = 'aspect-[16/10]',
  className = '',
  caption,
  badge
}) {
  return (
    <figure className={`group block overflow-hidden ${className}`}>
      <div className="relative border border-neutral/15 p-1 bg-surface-card rounded shadow-tactile-sm transition-transform duration-300 group-hover:shadow-tactile">
        <div className={`relative overflow-hidden rounded-[2px] bg-surface-subtle ${aspectRatio}`}>
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {badge && (
            <div className="absolute top-2.5 left-2.5">
              {badge}
            </div>
          )}
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs font-serif italic text-neutral-muted text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
