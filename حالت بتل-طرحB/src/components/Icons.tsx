type P = { className?: string; strokeWidth?: number };
const base = (c?: string) => ({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: c,
});

export const Search = ({ className, strokeWidth = 1.8 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.2-3.2" />
  </svg>
);
export const Cart = ({ className, strokeWidth = 1.8 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M2.5 3h2l2.2 11.2a2 2 0 0 0 2 1.6h8.3a2 2 0 0 0 2-1.6L21 7H6" />
    <circle cx="9.5" cy="20" r="1.4" />
    <circle cx="17.5" cy="20" r="1.4" />
  </svg>
);
export const User = ({ className, strokeWidth = 1.8 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M4.5 20c1.4-3.6 4.2-5.2 7.5-5.2s6.1 1.6 7.5 5.2" />
  </svg>
);
export const Phone = ({ className, strokeWidth = 1.8 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M5 3.5h3l1.6 4-2 1.4a12 12 0 0 0 5.5 5.5l1.4-2 4 1.6v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 5.7 2 2 0 0 1 5 3.5Z" />
  </svg>
);
export const Heart = ({
  className,
  strokeWidth = 1.8,
  filled,
}: P & { filled?: boolean }) => (
  <svg {...base(className)} strokeWidth={strokeWidth} fill={filled ? "currentColor" : "none"}>
    <path d="M12 20s-7.5-4.4-7.5-9.4A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7.5 3C19.5 15.6 12 20 12 20Z" />
  </svg>
);
export const Star = ({
  className,
  half,
}: P & { half?: boolean }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    {half ? (
      <>
        <defs>
          <linearGradient id="halfg">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          fill="url(#halfg)"
          stroke="currentColor"
          strokeWidth="1.2"
          d="m12 3.6 2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.8l5.9-.8Z"
        />
      </>
    ) : (
      <path d="m12 3.6 2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.8l5.9-.8Z" />
    )}
  </svg>
);
export const Chevron = ({ className, strokeWidth = 2 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="m15 5-7 7 7 7" />
  </svg>
);
export const Menu = ({ className, strokeWidth = 1.9 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
  </svg>
);
export const Close = ({ className, strokeWidth = 2 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const Info = ({ className, strokeWidth = 1.8 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5.5M12 7.8v.4" />
  </svg>
);
export const BoxSearch = ({ className, strokeWidth = 1.8 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5Z" />
    <path d="M3.5 7.5 12 12l8.5-4.5M12 12v9" />
    <circle cx="11" cy="11" r="0.01" />
  </svg>
);
export const Lifebuoy = ({ className, strokeWidth = 1.8 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4" />
    <path d="M5.6 5.6 9.4 9.4M18.4 5.6l-3.8 3.8M18.4 18.4l-3.8-3.8M5.6 18.4l3.8-3.8" />
  </svg>
);
export const Home = ({ className, strokeWidth = 1.8 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1Z" />
  </svg>
);
export const Grid = ({ className, strokeWidth = 1.8 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
  </svg>
);
export const Shield = ({ className, strokeWidth = 1.8 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M12 3 5 5.8v5.4c0 4.3 2.9 7.6 7 9.8 4.1-2.2 7-5.5 7-9.8V5.8Z" />
    <path d="m9 12 2.2 2.2L15.2 10" />
  </svg>
);
export const Truck = ({ className, strokeWidth = 1.8 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M2.5 6.5h10v10h-10zM12.5 10h4l3 3v3.5h-7z" />
    <circle cx="6" cy="18" r="1.5" />
    <circle cx="17" cy="18" r="1.5" />
  </svg>
);
export const Refresh = ({ className, strokeWidth = 1.8 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M20 12a8 8 0 1 1-2.4-5.7M20 4v4h-4" />
  </svg>
);
export const Card = ({ className, strokeWidth = 1.8 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
    <path d="M2.5 10h19" />
  </svg>
);
export const Bell = ({ className, strokeWidth = 1.8 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M6.5 10a5.5 5.5 0 0 1 11 0c0 4 1.5 5.5 1.5 5.5H5s1.5-1.5 1.5-5.5Z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
);
export const Chat = ({ className, strokeWidth = 1.8 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M20.5 12c0 4-3.8 7-8.5 7-1 0-2-.1-2.9-.4L4 20.5l1.3-3.7A6.7 6.7 0 0 1 3.5 12c0-4 3.8-7 8.5-7s8.5 3 8.5 7Z" />
  </svg>
);
export const Fire = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2s1 3-1.5 5.5S7 11 7 13.5A5 5 0 0 0 17 14c0-2-1-3-1-3s2 .5 2 3.5A6.5 6.5 0 0 1 5.5 15C5.5 9 12 8 12 2Z" />
  </svg>
);
export const Plus = ({ className, strokeWidth = 2 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const Minus = ({ className, strokeWidth = 2 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M5 12h14" />
  </svg>
);
export const Trash = ({ className, strokeWidth = 1.7 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13M10.5 11v5.5M13.5 11v5.5" />
  </svg>
);
export const Eye = ({ className, strokeWidth = 1.7 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="2.8" />
  </svg>
);
export const Scale = ({ className, strokeWidth = 1.7 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M12 4v16M7 20h10M5 8h14M5 8 2.5 14a3 3 0 0 0 5 0ZM19 8l-2.5 6a3 3 0 0 0 5 0Z" />
  </svg>
);
export const Check = ({ className, strokeWidth = 2.2 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
);
export const Sms = ({ className, strokeWidth = 1.7 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <rect x="2.5" y="5" width="19" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);
export const Support = ({ className, strokeWidth = 1.7 }: P) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M4.5 13v-1a7.5 7.5 0 0 1 15 0v1" />
    <rect x="2.5" y="12.5" width="4" height="6" rx="1.6" />
    <rect x="17.5" y="12.5" width="4" height="6" rx="1.6" />
    <path d="M19.5 18.5c0 1.7-2 2.5-4.5 2.5" />
  </svg>
);
export const Sparkle = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2.5l1.7 5.3 5.3 1.7-5.3 1.7L12 16.5l-1.7-5.3L5 9.5l5.3-1.7ZM19 15l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9Z" />
  </svg>
);
