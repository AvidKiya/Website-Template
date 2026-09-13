"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TabItem = {
  id: string;
  label: string;
  badge?: number;
  content: ReactNode;
};

export function Tabs({ items, className }: { items: TabItem[]; className?: string }) {
  const [active, setActive] = useState(items[0]?.id);

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="اطلاعات محصول"
        className="hide-scrollbar flex gap-1 overflow-x-auto border-b border-[#e8e8e8]"
      >
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${item.id}`}
              onClick={() => setActive(item.id)}
              className={cn(
                "relative shrink-0 px-4 py-3 text-[13.5px] font-medium transition-colors duration-200",
                isActive ? "text-[#202020]" : "text-[#888] hover:text-[#444]",
              )}
            >
              {item.label}
              {item.badge ? (
                <span className="num mx-1 rounded-md bg-[#f7f7f7] px-1.5 py-0.5 text-[11px] text-[#666]">
                  {item.badge}
                </span>
              ) : null}
              <span
                className={cn(
                  "absolute start-0 end-0 -bottom-px block h-[2px] rounded-full transition-all duration-200",
                  isActive ? "bg-[#252525]" : "bg-transparent",
                )}
              />
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`panel-${item.id}`}
          aria-labelledby={`tab-${item.id}`}
          hidden={item.id !== active}
          className="pt-5"
        >
          {item.id === active ? item.content : null}
        </div>
      ))}
    </div>
  );
}
