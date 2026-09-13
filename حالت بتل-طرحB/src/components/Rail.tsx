import { useRef } from "react";
import { cn } from "../lib/utils";
import { Chevron } from "./Icons";

export function SectionTitle({
  title,
  sub,
  action,
  onAction,
  accent = "pk",
  icon,
}: {
  title: string;
  sub?: string;
  action?: string;
  onAction?: () => void;
  accent?: "pk" | "gold" | "sky";
  icon?: React.ReactNode;
}) {
  const line =
    accent === "gold"
      ? "from-gold to-transparent"
      : accent === "sky"
      ? "from-sky to-transparent"
      : "from-pk to-transparent";
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div className="flex items-center gap-3">
        {icon && (
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-surface-2 text-pk ring-1 ring-line">
            {icon}
          </span>
        )}
        <div>
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-white sm:text-xl">
            <span className={cn("h-5 w-1.5 rounded-full bg-gradient-to-b", line)} />
            {title}
          </h2>
          {sub && <p className="mt-1 pr-3.5 text-xs text-fg-mute">{sub}</p>}
        </div>
      </div>
      {action && (
        <button
          onClick={onAction}
          className="group flex shrink-0 items-center gap-1 rounded-full bg-surface-2 px-3 py-1.5 text-xs font-bold text-fg-dim ring-1 ring-line transition hover:bg-surface-3 hover:text-white"
        >
          {action}
          <Chevron className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
        </button>
      )}
    </div>
  );
}

export function Rail({
  children,
  className,
  itemClass,
}: {
  children: React.ReactNode;
  className?: string;
  itemClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 900), behavior: "smooth" });
  };
  return (
    <div className={cn("group/rail relative", className)}>
      <div
        ref={ref}
        className={cn("no-bar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1", itemClass)}
      >
        {children}
      </div>
      <Btn dir="next" onClick={() => scroll(-1)} />
      <Btn dir="prev" onClick={() => scroll(1)} />
    </div>
  );
}

function Btn({ dir, onClick }: { dir: "next" | "prev"; onClick: () => void }) {
  /* RTL: «بعدی» سمت چپ، «قبلی» سمت راست */
  const pos =
    dir === "next"
      ? "left-0 -translate-x-1/2 lg:left-2 lg:translate-x-0"
      : "right-0 translate-x-1/2 lg:right-2 lg:translate-x-0";
  return (
    <button
      onClick={onClick}
      aria-label={dir}
      className={cn(
        "absolute top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-ink-2/90 text-white opacity-0 shadow-card backdrop-blur transition-all duration-300 group-hover/rail:opacity-100 hover:border-pk hover:bg-pk lg:grid",
        pos
      )}
    >
      <Chevron className={cn("h-5 w-5", dir === "prev" && "rotate-180")} />
    </button>
  );
}
