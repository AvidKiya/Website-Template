import React from "react";

type P = { className?: string };

const S = ({
  className,
  children,
  filled = false,
  sw = 1.8,
}: P & { children: React.ReactNode; filled?: boolean; sw?: number }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill={filled ? "currentColor" : "none"}
    stroke={filled ? "none" : "currentColor"}
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const SearchIcon = (p: P) => (
  <S {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20.5 20.5-3.8-3.8" />
  </S>
);

export const CartIcon = (p: P) => (
  <S {...p}>
    <path d="M2.5 4h2l2.2 12.2a1.5 1.5 0 0 0 1.5 1.3h8.9a1.5 1.5 0 0 0 1.5-1.2L20.5 8H6" />
    <circle cx="9.5" cy="21" r="1.4" />
    <circle cx="17.5" cy="21" r="1.4" />
  </S>
);

export const UserIcon = (p: P) => (
  <S {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20.5c1.6-3.4 4.3-5 7.5-5s5.9 1.6 7.5 5" />
  </S>
);

export const HeartIcon = ({ className, filled = false }: P & { filled?: boolean }) => (
  <S className={className} filled={filled}>
    <path
      d="M12 20.3 4.8 13a4.7 4.7 0 0 1 0-6.6 4.5 4.5 0 0 1 6.5 0l.7.7.7-.7a4.5 4.5 0 0 1 6.5 0 4.7 4.7 0 0 1 0 6.6L12 20.3Z"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.8}
    />
  </S>
);

export const StarIcon = (p: P) => (
  <S {...p} filled>
    <path d="m12 2.8 2.8 5.9 6.2.8-4.6 4.4 1.2 6.3L12 17.1l-5.6 3.1 1.2-6.3L3 9.5l6.2-.8L12 2.8Z" />
  </S>
);

export const ChevronLeftIcon = (p: P) => (
  <S {...p}>
    <path d="m14.5 5.5-6.5 6.5 6.5 6.5" />
  </S>
);

export const ChevronRightIcon = (p: P) => (
  <S {...p}>
    <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />
  </S>
);

export const ChevronDownIcon = (p: P) => (
  <S {...p}>
    <path d="m5.5 9.5 6.5 6.5 6.5-6.5" />
  </S>
);

export const CloseIcon = (p: P) => (
  <S {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </S>
);

export const PlusIcon = (p: P) => (
  <S {...p}>
    <path d="M12 5v14M5 12h14" />
  </S>
);

export const MinusIcon = (p: P) => (
  <S {...p}>
    <path d="M5 12h14" />
  </S>
);

export const TrashIcon = (p: P) => (
  <S {...p}>
    <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6.5 7l1 12.2A2 2 0 0 0 9.5 21h5a2 2 0 0 0 2-1.8L17.5 7M10 11v6M14 11v6" />
  </S>
);

export const MenuIcon = (p: P) => (
  <S {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </S>
);

export const MessageIcon = (p: P) => (
  <S {...p}>
    <path d="M21 12a8.5 8.5 0 0 1-8.5 8.5c-1.6 0-3.2-.4-4.5-1.2L3 20.5l1.3-4.6A8.5 8.5 0 1 1 21 12Z" />
    <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" strokeWidth={2.4} />
  </S>
);

export const PhoneIcon = (p: P) => (
  <S {...p}>
    <path d="M5.5 3h3l1.7 4.3-2.1 1.6a12.5 12.5 0 0 0 5 5l1.6-2.1L19 13.5v3A2.5 2.5 0 0 1 16.5 19 14.5 14.5 0 0 1 3 5.5 2.5 2.5 0 0 1 5.5 3Z" />
  </S>
);

export const TruckIcon = (p: P) => (
  <S {...p}>
    <path d="M14 17H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11Z" />
    <path d="M14 8h3.5L20.5 11v3.5a2 2 0 0 1-2 2H14" />
    <circle cx="7.5" cy="17.5" r="1.7" />
    <circle cx="16.5" cy="17.5" r="1.7" />
  </S>
);

export const ShieldIcon = (p: P) => (
  <S {...p}>
    <path d="M12 2.8 4.5 5.6v5.6c0 4.6 3.2 8 7.5 9.8 4.3-1.8 7.5-5.2 7.5-9.8V5.6L12 2.8Z" />
    <path d="m8.8 11.8 2.3 2.3 4.2-4.4" />
  </S>
);

export const WalletIcon = (p: P) => (
  <S {...p}>
    <rect x="3" y="6" width="18" height="13" rx="2.5" />
    <path d="M3 10h18" />
    <path d="M15.5 14.8h2.5" />
  </S>
);

export const ZapIcon = (p: P) => (
  <S {...p}>
    <path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12l1-8Z" />
  </S>
);

export const StoreIcon = (p: P) => (
  <S {...p}>
    <path d="M4 9.5 5.5 4h13L20 9.5M4 9.5a2.3 2.3 0 0 0 4.6 0 2.3 2.3 0 0 0 4.7 0 2.3 2.3 0 0 0 4.7 0H20v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9ZM9.5 20.5v-6h5v6" />
  </S>
);

export const GiftIcon = (p: P) => (
  <S {...p}>
    <rect x="3.5" y="8" width="17" height="4" rx="1" />
    <path d="M5.5 12v7a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 0 0 1.5-1.5v-7M12 8v12.5M12 8s-4.8.3-5.8-1.6C5.4 4.8 7.6 3 9.2 4c1.4.9 2.8 4 2.8 4Zm0 0s4.8.3 5.8-1.6C18.6 4.8 16.4 3 14.8 4c-1.4.9-2.8 4-2.8 4Z" />
  </S>
);

export const DownloadIcon = (p: P) => (
  <S {...p}>
    <path d="M12 3.5v11M7.5 10 12 14.5 16.5 10M4.5 17v2.5A1.5 1.5 0 0 0 6 21h12a1.5 1.5 0 0 0 1.5-1.5V17" />
  </S>
);

export const AppleIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M16.6 12.9c0-2.4 2-3.6 2-3.6-1.1-1.6-2.8-1.8-3.4-1.8-1.5-.2-2.9.9-3.6.9-.8 0-1.9-.9-3.2-.85-1.6 0-3.1.95-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3.1 2.45 1.2-.05 1.7-.8 3.2-.8s1.9.8 3.2.75c1.3 0 2.2-1.2 3-2.4.95-1.4 1.3-2.7 1.35-2.75-.05-.05-2.6-1-2.85-3.85ZM14.4 5.6c.7-.85 1.15-2 1-3.1-1 .05-2.2.65-2.9 1.5-.65.75-1.2 1.95-1 3 1.1.1 2.2-.55 2.9-1.4Z" />
  </svg>
);

export const PlayIcon = (p: P) => (
  <S {...p} filled>
    <path d="M7 4.8c0-.9 1-1.5 1.8-1L19.5 11c.8.5.8 1.6 0 2.1L8.8 19.6c-.8.5-1.8-.05-1.8-1V4.8Z" />
  </S>
);

export const MapPinIcon = (p: P) => (
  <S {...p}>
    <path d="M12 21.5S5 14.9 5 9.9a7 7 0 0 1 14 0c0 5-7 11.6-7 11.6Z" />
    <circle cx="12" cy="9.8" r="2.6" />
  </S>
);

export const BoxIcon = (p: P) => (
  <S {...p}>
    <path d="m12 2.7 8.5 4.4v9.8L12 21.3l-8.5-4.4V7.1L12 2.7Z" />
    <path d="M3.6 7.2 12 11.6l8.4-4.4M12 11.6v9.6" />
  </S>
);

export const HeadsetIcon = (p: P) => (
  <S {...p}>
    <path d="M4 13a8 8 0 0 1 16 0" />
    <rect x="3" y="13" width="4" height="6" rx="1.5" />
    <rect x="17" y="13" width="4" height="6" rx="1.5" />
    <path d="M20 19v.5a2.5 2.5 0 0 1-2.5 2.5H13" />
  </S>
);

export const SparkIcon = (p: P) => (
  <S {...p}>
    <path d="M12 2.5 14 9l6.5 2L14 13l-2 6.5L10 13l-6.5-2L10 9l2-6.5Z" />
    <path d="M19 16.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
  </S>
);

export const CheckIcon = (p: P) => (
  <S {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </S>
);

export const ClockIcon = (p: P) => (
  <S {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5.2l3.2 1.9" />
  </S>
);

export const TagIcon = (p: P) => (
  <S {...p}>
    <path d="M3 11.5V4.5A1.5 1.5 0 0 1 4.5 3h7L20 12.5a1.8 1.8 0 0 1 0 2.5l-5 5a1.8 1.8 0 0 1-2.5 0L3 11.5Z" />
    <circle cx="8" cy="8" r="1.4" />
  </S>
);

/* ---- category icons ---- */

export const PhoneDeviceIcon = (p: P) => (
  <S {...p}>
    <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
    <path d="M10.5 5h3" />
    <path d="M12 18.5h.01" strokeWidth={2.4} />
  </S>
);

export const LaptopIcon = (p: P) => (
  <S {...p}>
    <rect x="4.5" y="4.5" width="15" height="10" rx="1.5" />
    <path d="M2.5 18.5h19l-1.6-2.4H4.1l-1.6 2.4Z" />
  </S>
);

export const MonitorIcon = (p: P) => (
  <S {...p}>
    <rect x="3" y="4" width="18" height="12" rx="1.8" />
    <path d="M9 20h6M12 16.5V20" />
  </S>
);

export const TvIcon = (p: P) => (
  <S {...p}>
    <rect x="3" y="5" width="18" height="12.5" rx="1.8" />
    <path d="m10 2.5 2 2 2-2" />
  </S>
);

export const ShoeIcon = (p: P) => (
  <S {...p}>
    <path d="M3 15.5V9.8c0-.9 1.1-1.3 1.7-.6l1.9 2.2c.4.5 1.2.5 1.6 0l1.3-1.6c.3-.4.8-.5 1.2-.2L15 12l4.8 1.6c1.5.5 2.2 1.2 2.2 2.4v1.2c0 .5-.4.8-.8.8H4.2c-.7 0-1.2-.4-1.2-1.5Z" />
    <path d="M3 18.5h18" />
  </S>
);

export const BagIcon = (p: P) => (
  <S {...p}>
    <path d="M5 8.5h14l-1 11a2 2 0 0 1-2 1.8H8a2 2 0 0 1-2-1.8l-1-11Z" />
    <path d="M8.5 8.5V7a3.5 3.5 0 0 1 7 0v1.5" />
  </S>
);

export const DressIcon = (p: P) => (
  <S {...p}>
    <path d="M9 3c0 1.6.7 2.4 3 2.4S15 4.6 15 3M9.5 3 8 7l-3 4.5 2.8 1.2L5.5 20a1.5 1.5 0 0 0 1.5 1.8h10a1.5 1.5 0 0 0 1.5-1.8l-2.3-7.3L19 11.5 16 7 14.5 3" />
  </S>
);

export const TshirtIcon = (p: P) => (
  <S {...p}>
    <path d="m8.5 3.5-5 3 2 3.5 2.3-1.2V20.5h8.4V8.8L18.5 10l2-3.5-5-3a4.5 4.5 0 0 1-7 0Z" />
  </S>
);

export const CreamIcon = (p: P) => (
  <S {...p}>
    <path d="M8 9h8v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9Z" />
    <path d="M9 9V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V9M8 13.5h8" />
  </S>
);

export const DumbbellIcon = (p: P) => (
  <S {...p}>
    <path d="M7 8v8M4.5 9.5v5M17 8v8M19.5 9.5v5M7 12h10" />
  </S>
);

export const BookIcon = (p: P) => (
  <S {...p}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" />
    <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5A2.5 2.5 0 0 1 4 20.5ZM8 7.5h8" />
  </S>
);

export const GamepadIcon = (p: P) => (
  <S {...p}>
    <path d="M6.8 6.5h10.4a5 5 0 0 1 5 4.6l.4 4.5a2.8 2.8 0 0 1-5 2L16.5 15h-9l-1.1 2.6a2.8 2.8 0 0 1-5-2l.4-4.5a5 5 0 0 1 5-4.6Z" />
    <path d="M7.5 10.5v3M6 12h3M16 10.8h.01M18.2 12.8h.01" strokeWidth={2.2} />
  </S>
);
