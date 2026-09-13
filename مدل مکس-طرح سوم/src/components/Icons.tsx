type P = { className?: string };
const base = "w-5 h-5";

export const Search = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.2-3.2" />
  </svg>
);
export const Cart = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 4h2l2.2 10.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.55L20 8H6" />
    <circle cx="10" cy="20" r="1.4" />
    <circle cx="17" cy="20" r="1.4" />
  </svg>
);
export const User = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <circle cx="12" cy="8" r="3.6" />
    <path d="M4.5 20c1.3-3.6 4-5.4 7.5-5.4S18.2 16.4 19.5 20" />
  </svg>
);
export const Heart = ({ className = base, filled = false }: P & { filled?: boolean }) => (
  <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
    <path d="M12 20s-7.3-4.4-8.9-9A4.6 4.6 0 0 1 12 7.3 4.6 4.6 0 0 1 20.9 11c-1.6 4.6-8.9 9-8.9 9Z" />
  </svg>
);
export const Menu = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
);
export const Close = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const ChevronLeft = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="m14 6-6 6 6 6" />
  </svg>
);
export const ChevronRight = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="m10 6 6 6-6 6" />
  </svg>
);
export const ChevronDown = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);
export const Star = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z" />
  </svg>
);
export const Phone = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 4h3.5l1.6 4-2 1.4a12 12 0 0 0 5.5 5.5l1.4-2 4 1.6V18a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
  </svg>
);
export const Support = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M4 13a8 8 0 0 1 16 0" />
    <rect x="2.5" y="13" width="4" height="6" rx="1.6" />
    <rect x="17.5" y="13" width="4" height="6" rx="1.6" />
    <path d="M19 19v.6a2.4 2.4 0 0 1-2.4 2.4H13" />
  </svg>
);
export const Truck = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7h11v9H2zM13 10h4l3 3v3h-7" />
    <circle cx="6.5" cy="18" r="1.6" />
    <circle cx="17" cy="18" r="1.6" />
  </svg>
);
export const Shield = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
    <path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6z" />
    <path d="m9 12 2 2 4-4" strokeLinecap="round" />
  </svg>
);
export const Refresh = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 11a8 8 0 1 0-1.2 5" />
    <path d="M20 5v6h-6" />
  </svg>
);
export const Home = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
    <path d="M4 10.5 12 4l8 6.5V20h-5v-5H9v5H4z" />
  </svg>
);
export const Grid = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <rect x="4" y="4" width="6.5" height="6.5" rx="2" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="2" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="2" />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="2" />
  </svg>
);
export const Bolt = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
  </svg>
);
export const Plus = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const Minus = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 12h14" />
  </svg>
);
export const Trash = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
  </svg>
);
export const Instagram = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="1" fill="currentColor" />
  </svg>
);
export const Telegram = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.6 4.3 2.9 11.4c-.9.3-.9 1.6.1 1.9l4.6 1.4 1.8 5.3c.3.8 1.3 1 1.9.4l2.5-2.4 4.6 3.4c.7.5 1.7.1 1.9-.7l3-14.6c.2-.9-.7-1.6-1.7-1.3z" />
  </svg>
);
export const Whatsapp = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.3A10 10 0 1 0 12 2Zm5.3 14c-.2.7-1.3 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6a10 10 0 0 1-4-3.6c-.3-.5-.8-1.4-.8-2.3 0-.9.5-1.4.7-1.6.2-.2.4-.3.6-.3h.5c.2 0 .4 0 .6.5l.7 1.7c.1.2 0 .4-.1.5l-.3.4c-.1.1-.3.3-.1.6.2.3.7 1.2 1.5 1.9 1 .9 1.8 1.1 2.1 1.3.2.1.4 0 .5-.1l.7-.8c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.4.3.1.1.1.5 0 1.1Z" />
  </svg>
);
export const Apple = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.4 12.5c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.9-1.4-.1-2.8.9-3.5.9s-1.8-.9-3-.8c-1.5 0-2.9.9-3.7 2.2-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.2 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.8-2.2c.9-1.2 1.2-2.4 1.2-2.5 0 0-2.4-.9-2.4-3.4ZM14.2 5.3c.6-.8 1-1.9.9-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-.9 2.9 1 .1 2-.5 2.7-1.3Z" />
  </svg>
);
export const Android = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 9h12v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zM4 10.5a1.5 1.5 0 0 1 3 0v4a1.5 1.5 0 0 1-3 0zM17 10.5a1.5 1.5 0 0 1 3 0v4a1.5 1.5 0 0 1-3 0zM9 19h2v3a1 1 0 1 1-2 0zM13 19h2v3a1 1 0 1 1-2 0zM7.5 8a4.5 4.5 0 0 1 9 0z" />
  </svg>
);
export const ArrowUp = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);
export const Compare = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <path d="M7 20V8m0 0L4 11m3-3 3 3M17 4v12m0 0 3-3m-3 3-3-3" />
  </svg>
);
export const Eye = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
