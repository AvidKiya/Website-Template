import { cn } from "../lib/utils";

export function Logo({
  className,
  compact,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5 select-none", className)}>
      <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-pk to-pk-dark shadow-[0_6px_20px_-6px_rgba(239,57,78,.9)]">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3.5 6h3l1.8 8.4a1.6 1.6 0 0 0 1.6 1.3h6.7a1.6 1.6 0 0 0 1.6-1.3L20 8H6.6" />
          <circle cx="10" cy="19" r="1.2" fill="currentColor" />
          <circle cx="17" cy="19" r="1.2" fill="currentColor" />
        </svg>
        <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-gold ring-2 ring-ink" />
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block text-[19px] font-black tracking-tight text-white">
            پارس <span className="text-pk">کالا</span>
          </span>
          <span className="mt-1 block text-[9px] font-bold tracking-[0.28em] text-fg-mute">
            PARSKALA.COM
          </span>
        </span>
      )}
    </span>
  );
}
