import { useEffect, useState } from "react";

type Props = {
  src: string;
  /** local asset used when the remote asset fails to load */
  fallbackSrc?: string;
  alt?: string;
  className?: string;
  wrapClassName?: string;
  fallbackText?: string;
  gradient?: [string, string];
  contain?: boolean;
};

/**
 * Image with a two-stage graceful degradation:
 * remote asset -> bundled local asset -> themed gradient placeholder.
 */
export default function SafeImg({
  src,
  fallbackSrc,
  alt = "",
  className = "",
  wrapClassName = "",
  fallbackText,
  gradient = ["#1d1d24", "#0f0f13"],
  contain = false,
}: Props) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    setStage(0);
  }, [src]);

  const current = stage === 0 ? src : stage === 1 && fallbackSrc ? fallbackSrc : null;

  if (!current) {
    return (
      <div
        className={`flex items-center justify-center text-center ${wrapClassName} ${className}`}
        style={{
          background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
        }}
      >
        {fallbackText ? (
          <span className="px-3 text-[11px] leading-5 font-medium text-ink-300 line-clamp-3">
            {fallbackText}
          </span>
        ) : (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-ink-500" fill="none">
            <rect x="3" y="4.5" width="18" height="15" rx="3" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="8.5" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.4" />
            <path
              d="m4.5 17 4.7-4.3 3.4 3 2.6-2.2 4.3 3.8"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    );
  }

  return (
    <img
      src={current}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setStage((s) => (s === 0 && fallbackSrc ? 1 : 2))}
      className={`${contain ? "object-contain" : "object-cover"} ${className}`}
    />
  );
}
