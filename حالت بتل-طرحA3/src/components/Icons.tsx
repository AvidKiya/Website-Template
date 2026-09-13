import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const S = ({ children, ...p }: P) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    {children}
  </svg>
);

export const Search = (p: P) => (
  <S {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20.5 20.5-4-4" />
  </S>
);

export const Cart = (p: P) => (
  <S {...p}>
    <circle cx="9" cy="20" r="1.6" />
    <circle cx="17.5" cy="20" r="1.6" />
    <path d="M2.5 3.5h2.2l2.6 12h10.9l2.3-8.5H6" />
  </S>
);

export const User = (p: P) => (
  <S {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20.5c1.4-3.4 4.2-5 7.5-5s6.1 1.6 7.5 5" />
  </S>
);

export const Heart = (p: P) => (
  <S {...p}>
    <path d="M12 20.5S3.5 15.5 3.5 9.3A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8.5 2.3c0 6.2-8.5 11.2-8.5 11.2z" />
  </S>
);

export const HeartFill = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 20.5S3.5 15.5 3.5 9.3A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8.5 2.3c0 6.2-8.5 11.2-8.5 11.2z" />
  </svg>
);

export const Star = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2.5l2.95 6.06 6.65.9-4.85 4.65 1.2 6.6L12 17.55 6.05 20.7l1.2-6.6L2.4 9.46l6.65-.9z" />
  </svg>
);

export const Phone = (p: P) => (
  <S {...p}>
    <path d="M5 3.5h4l1.5 4.5-2.2 1.8a13 13 0 0 0 5.9 5.9l1.8-2.2 4.5 1.5v4a1.8 1.8 0 0 1-2 1.8C10.4 20 4 13.6 3.2 5.5a1.8 1.8 0 0 1 1.8-2z" />
  </S>
);

export const Mail = (p: P) => (
  <S {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </S>
);

export const Clock = (p: P) => (
  <S {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </S>
);

export const Pin = (p: P) => (
  <S {...p}>
    <path d="M12 21.5s7-6.2 7-11.5a7 7 0 1 0-14 0c0 5.3 7 11.5 7 11.5z" />
    <circle cx="12" cy="10" r="2.6" />
  </S>
);

export const Truck = (p: P) => (
  <S {...p}>
    <path d="M2.5 6h11.5v10H2.5zM14 9.5h4l3 3.5v3h-7" />
    <circle cx="6.5" cy="17.5" r="1.8" />
    <circle cx="17.5" cy="17.5" r="1.8" />
  </S>
);

export const Shield = (p: P) => (
  <S {...p}>
    <path d="M12 2.8 4.5 5.5v6c0 5 3.2 8.3 7.5 9.7 4.3-1.4 7.5-4.7 7.5-9.7v-6z" />
    <path d="m8.8 11.8 2.2 2.2 4.2-4.5" />
  </S>
);

export const Card = (p: P) => (
  <S {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
    <path d="M2.5 9.5h19M6 14.5h4" />
  </S>
);

export const Rotate = (p: P) => (
  <S {...p}>
    <path d="M3.5 8.5A9 9 0 0 1 20 10.5M20.5 15.5A9 9 0 0 1 4 13.5" />
    <path d="M3.5 3.5v5h5M20.5 20.5v-5h-5" />
  </S>
);

export const Headset = (p: P) => (
  <S {...p}>
    <path d="M4 13a8 8 0 0 1 16 0" />
    <rect x="3" y="13" width="4" height="6" rx="1.6" />
    <rect x="17" y="13" width="4" height="6" rx="1.6" />
    <path d="M19 19v.5a2.5 2.5 0 0 1-2.5 2.5H13" />
  </S>
);

export const Gift = (p: P) => (
  <S {...p}>
    <rect x="3.5" y="8" width="17" height="4" rx="1" />
    <path d="M5 12v8.5h14V12M12 8v12.5" />
    <path d="M12 8s-4.8.3-5.6-2C5.8 4.2 8 2.8 9.7 3.9 11.4 5 12 8 12 8zm0 0s4.8.3 5.6-2c.6-1.8-1.6-3.2-3.3-2.1C12.6 5 12 8 12 8z" />
  </S>
);

export const Flame = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12.6 2.2c.5 3-0.6 4.9-2.3 6.6C8.6 10.5 7 12.3 7 15a5 5 0 0 0 10 0c0-1.3-.4-2.4-1-3.4-.9 1-1.8 1.5-2.7 1.6.9-3 .1-6.4-.7-8.2-1-.4-1.4-1.3 0-2.8zM12 21.5a3.5 3.5 0 0 1-3.5-3.5c0-1.2.6-2.1 1.6-3.1.7-.7 1.4-1.4 1.9-2.3.9 1.4 3.5 3 3.5 5.4A3.5 3.5 0 0 1 12 21.5z" />
  </svg>
);

export const Menu = (p: P) => (
  <S {...p}>
    <path d="M3.5 6h17M3.5 12h17M3.5 18h11" />
  </S>
);

export const Close = (p: P) => (
  <S {...p}>
    <path d="m5 5 14 14M19 5 5 19" />
  </S>
);

export const Plus = (p: P) => (
  <S {...p}>
    <path d="M12 5v14M5 12h14" />
  </S>
);

export const Minus = (p: P) => (
  <S {...p}>
    <path d="M5 12h14" />
  </S>
);

export const Trash = (p: P) => (
  <S {...p}>
    <path d="M4 6.5h16M9 6.5V4.8A1.3 1.3 0 0 1 10.3 3.5h3.4A1.3 1.3 0 0 1 15 4.8v1.7M6.5 6.5 7.4 20a1.5 1.5 0 0 0 1.5 1.4h6.2a1.5 1.5 0 0 0 1.5-1.4l.9-13.5" />
    <path d="M10 10.5v6M14 10.5v6" />
  </S>
);

export const ChevronDown = (p: P) => (
  <S {...p}>
    <path d="m6 9.5 6 6 6-6" />
  </S>
);

export const ChevronLeft = (p: P) => (
  <S {...p}>
    <path d="m14.5 5.5-6.5 6.5 6.5 6.5" />
  </S>
);

export const ChevronRight = (p: P) => (
  <S {...p}>
    <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />
  </S>
);

export const ArrowUp = (p: P) => (
  <S {...p}>
    <path d="M12 19.5v-15M5.5 11 12 4.5 18.5 11" />
  </S>
);

export const Check = (p: P) => (
  <S {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </S>
);

export const Zap = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12z" />
  </svg>
);

export const Eye = (p: P) => (
  <S {...p}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="3" />
  </S>
);

export const Instagram = (p: P) => (
  <S {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
  </S>
);

export const Telegram = (p: P) => (
  <S {...p}>
    <path d="m21 4.5-3.2 15-5.6-4.4-2.7 2.9-.6-4.3L21 4.5z" />
    <path d="m8.9 13.7 9.6-7.5" />
  </S>
);

export const Whatsapp = (p: P) => (
  <S {...p}>
    <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5z" />
    <path d="M9 8.5c-.5 2.5 3 6.5 6 6.5l.8-1.8-2-1.2-.9.8c-1-.4-1.9-1.3-2.3-2.3l.9-.9-1.2-2z" />
  </S>
);

export const Youtube = (p: P) => (
  <S {...p}>
    <rect x="2.5" y="6" width="19" height="12.5" rx="3.5" />
    <path d="m10.2 9.5 4.6 2.7-4.6 2.7z" fill="currentColor" stroke="none" />
  </S>
);

export const Box = (p: P) => (
  <S {...p}>
    <path d="m12 2.8 8.5 4.4v9.6L12 21.2l-8.5-4.4V7.2z" />
    <path d="M3.5 7.2 12 11.6l8.5-4.4M12 11.6v9.6" />
  </S>
);
