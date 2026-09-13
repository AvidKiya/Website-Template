"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "soft" | "danger" | "light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-[#252525] text-white hover:bg-[#111] active:bg-[#000]",
  outline: "border border-[#e8e8e8] bg-white text-[#202020] hover:border-[#252525]",
  ghost: "text-[#202020] hover:bg-[#f7f7f7]",
  soft: "bg-[#f7f7f7] text-[#202020] hover:bg-[#eeeeee]",
  danger: "bg-[#e53935] text-white hover:bg-[#c92e2a]",
  light: "bg-white text-[#202020] hover:bg-white/90",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[12.5px] rounded-lg",
  md: "h-11 px-5 text-[13.5px] rounded-xl",
  lg: "h-12 px-6 text-[14.5px] rounded-xl",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  loading,
  className,
  children,
  ...rest
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      disabled={rest.disabled || loading}
      className={cn(
        "no-tap-highlight inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-55",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className,
      )}
    >
      {loading ? (
        <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  children,
  ariaLabel,
}: BaseProps & { href: string; ariaLabel?: string }) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        "no-tap-highlight inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-out",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className,
      )}
    >
      {children}
    </Link>
  );
}
