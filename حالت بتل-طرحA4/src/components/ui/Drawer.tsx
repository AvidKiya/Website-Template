"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Side = "start" | "end" | "bottom";

export function Drawer({
  open,
  onClose,
  title,
  side = "end",
  children,
  footer,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  side?: Side;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const motionProps =
    side === "bottom"
      ? {
          initial: { y: "100%" },
          animate: { y: 0 },
          exit: { y: "100%" },
        }
      : {
          initial: { x: side === "end" ? "-100%" : "100%" },
          animate: { x: 0 },
          exit: { x: side === "end" ? "-100%" : "100%" },
        };

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label={title}>
          <motion.button
            type="button"
            aria-label="بستن"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 h-full w-full cursor-default bg-black/40"
          />
          <motion.aside
            {...motionProps}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "absolute flex flex-col bg-white shadow-2xl",
              side === "bottom"
                ? "start-0 end-0 bottom-0 max-h-[86vh] w-full rounded-t-2xl"
                : "inset-y-0 w-[min(420px,92vw)]",
              side === "end" && "end-0",
              side === "start" && "start-0",
              className,
            )}
          >
            <header className="flex items-center justify-between border-b border-[#e8e8e8] px-4 py-3.5">
              <h2 className="text-[14px] font-semibold text-[#202020]">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="بستن"
                className="grid size-9 place-items-center rounded-lg text-[#555] transition-colors hover:bg-[#f7f7f7]"
              >
                <X size={18} />
              </button>
            </header>
            <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>
            {footer ? <div className="border-t border-[#e8e8e8] p-4">{footer}</div> : null}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
