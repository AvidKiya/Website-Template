type P = { className?: string; strokeWidth?: number };

const base = (className?: string) => className ?? "w-5 h-5";

export const IconSearch = ({ className, strokeWidth = 1.7 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)}>
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth={strokeWidth} />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconCart = ({ className, strokeWidth = 1.7 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)}>
    <path
      d="M3 4h2l2.2 10.4a2 2 0 0 0 2 1.6h7.1a2 2 0 0 0 2-1.55L20 8H6.2"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="10" cy="20" r="1.4" fill="currentColor" />
    <circle cx="17" cy="20" r="1.4" fill="currentColor" />
  </svg>
);

export const IconUser = ({ className, strokeWidth = 1.7 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)}>
    <circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth={strokeWidth} />
    <path
      d="M4.5 20c1-3.6 4-5.4 7.5-5.4s6.5 1.8 7.5 5.4"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

export const IconHeart = ({ className, strokeWidth = 1.7, filled = false }: P & { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} className={base(className)}>
    <path
      d="M12 20s-7.5-4.4-7.5-9.4A4.1 4.1 0 0 1 12 8.2a4.1 4.1 0 0 1 7.5 2.4C19.5 15.6 12 20 12 20Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
  </svg>
);

export const IconCompare = ({ className, strokeWidth = 1.7 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)}>
    <path d="M7 7h11m0 0-3-3m3 3-3 3" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 17H6m0 0 3-3m-3 3 3 3" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconMenu = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)}>
    <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconGrid = ({ className, strokeWidth = 1.7 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="2" stroke="currentColor" strokeWidth={strokeWidth} />
    <rect x="13.5" y="3.5" width="7" height="7" rx="2" stroke="currentColor" strokeWidth={strokeWidth} />
    <rect x="3.5" y="13.5" width="7" height="7" rx="2" stroke="currentColor" strokeWidth={strokeWidth} />
    <rect x="13.5" y="13.5" width="7" height="7" rx="2" stroke="currentColor" strokeWidth={strokeWidth} />
  </svg>
);

export const IconClose = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)}>
    <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconChevron = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)}>
    <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconPhone = ({ className, strokeWidth = 1.7 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)}>
    <path
      d="M6.5 3.5h2.2l1.4 3.5-1.8 1.2a11 11 0 0 0 5.5 5.5l1.2-1.8 3.5 1.4v2.2c0 1.1-.9 2-2 2A14.5 14.5 0 0 1 4.5 5.5c0-1.1.9-2 2-2Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
  </svg>
);

export const IconStar = ({ className, filled = true }: P & { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} className={base(className)}>
    <path
      d="m12 3.6 2.5 5.1 5.6.8-4 3.9 1 5.6-5.1-2.7-5 2.7 1-5.6-4.1-3.9 5.6-.8L12 3.6Z"
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.6}
      strokeLinejoin="round"
    />
  </svg>
);

export const IconTruck = ({ className, strokeWidth = 1.6 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)}>
    <path d="M3 6.5h10v9H3zM13 9.5h4l3 3v3h-7z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
    <circle cx="7" cy="17.5" r="1.6" stroke="currentColor" strokeWidth={strokeWidth} />
    <circle cx="17" cy="17.5" r="1.6" stroke="currentColor" strokeWidth={strokeWidth} />
  </svg>
);

export const IconShield = ({ className, strokeWidth = 1.6 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)}>
    <path d="M12 3.5 19 6v6c0 4-3 7-7 8.5C8 19 5 16 5 12V6l7-2.5Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
    <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconBox = ({ className, strokeWidth = 1.6 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)}>
    <path d="m12 3 8 4.2v9.6L12 21l-8-4.2V7.2L12 3Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
    <path d="m4 7.2 8 4.2 8-4.2M12 21v-9.6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
  </svg>
);

export const IconInfo = ({ className, strokeWidth = 1.6 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth={strokeWidth} />
    <path d="M12 11v5.2M12 7.9h.01" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconLifebuoy = ({ className, strokeWidth = 1.6 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth={strokeWidth} />
    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth={strokeWidth} />
    <path d="m6 6 3.5 3.5M18 6l-3.5 3.5M6 18l3.5-3.5M18 18l-3.5-3.5" stroke="currentColor" strokeWidth={strokeWidth} />
  </svg>
);

export const IconHome = ({ className, strokeWidth = 1.6 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)}>
    <path d="m4 10.5 8-6.2 8 6.2V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19v-8.5Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
  </svg>
);

export const IconFlash = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={base(className)}>
    <path d="M13.5 2 5 13.2h5.3L9.8 22l8.7-11.4h-5.4L13.5 2Z" />
  </svg>
);

export const IconPlus = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)}>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconMinus = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)}>
    <path d="M5 12h14" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconTrash = ({ className, strokeWidth = 1.6 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)}>
    <path d="M4.5 6.5h15M9.5 6.5V4.8h5v1.7M6.8 6.5 7.6 20h8.8l.8-13.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconFilter = ({ className, strokeWidth = 1.7 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)}>
    <path d="M4 6.5h16M7 12h10M10 17.5h4" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const Social = {
  instagram: (c?: string) => (
    <svg viewBox="0 0 24 24" fill="none" className={base(c)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="7" r="1.1" fill="currentColor" />
    </svg>
  ),
  telegram: (c?: string) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={base(c)}>
      <path d="M21 4.5 2.9 11.3c-1 .4-1 1.7.1 2l4.4 1.3 1.7 5c.3.9 1.4 1 2 .4l2.4-2.3 4.5 3.3c.8.6 1.9.2 2.1-.8l3-14c.2-1-.8-1.9-1.8-1.5Z" />
    </svg>
  ),
  whatsapp: (c?: string) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={base(c)}>
      <path d="M12 2.8a9.1 9.1 0 0 0-7.8 13.8L3 21.5l5.1-1.3A9.1 9.1 0 1 0 12 2.8Zm5.3 12.9c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1a12 12 0 0 1-5.6-4.8c-.4-.7-.9-1.6-.9-2.5s.5-1.4.7-1.6c.2-.2.4-.3.6-.3h.5c.2 0 .4 0 .6.4l.8 1.9c.1.2 0 .4-.1.6l-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2 1.3 2.3 1.4.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.4.3v.7Z" />
    </svg>
  ),
  twitter: (c?: string) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={base(c)}>
      <path d="M17.5 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.1 21H2l7.3-8.3L2.2 3h6.4l4.4 5.9L17.5 3Z" />
    </svg>
  ),
  youtube: (c?: string) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={base(c)}>
      <path d="M22 12s0-3.2-.4-4.7c-.2-.9-.9-1.5-1.7-1.7C18.3 5.2 12 5.2 12 5.2s-6.3 0-7.9.4c-.8.2-1.5.8-1.7 1.7C2 8.8 2 12 2 12s0 3.2.4 4.7c.2.9.9 1.5 1.7 1.7 1.6.4 7.9.4 7.9.4s6.3 0 7.9-.4c.8-.2 1.5-.8 1.7-1.7.4-1.5.4-4.7.4-4.7Zm-11.8 3V9l5.2 3-5.2 3Z" />
    </svg>
  ),
  linkedin: (c?: string) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={base(c)}>
      <path d="M4.9 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3.2 9.2h3.4V21H3.2V9.2Zm6 0h3.2v1.6a3.6 3.6 0 0 1 3.2-1.8c3 0 3.6 1.9 3.6 4.5V21h-3.4v-6c0-1.4 0-3.2-2-3.2s-2.2 1.5-2.2 3.1V21H9.2V9.2Z" />
    </svg>
  ),
};
