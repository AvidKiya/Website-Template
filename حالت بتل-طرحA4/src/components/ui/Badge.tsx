import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "danger" | "success" | "dark" | "muted" | "accent";

const tones: Record<Tone, string> = {
  danger: "bg-[#e53935] text-white",
  success: "bg-[#18a86b] text-white",
  dark: "bg-[#252525] text-white",
  muted: "bg-[#f7f7f7] text-[#555]",
  accent: "bg-[#f5a623] text-[#2b2000]",
};

export function Badge({
  tone = "muted",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md px-1.5 py-0.5 text-[11px] font-medium leading-5",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
