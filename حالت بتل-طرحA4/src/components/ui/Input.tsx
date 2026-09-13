"use client";

import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { useId } from "react";
import { cn } from "@/lib/utils";

type FieldProps = {
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
};

export function Input({
  label,
  hint,
  error,
  className,
  ...rest
}: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={id} className="mb-1.5 block text-[12.5px] text-[#555]">
          {label}
        </label>
      ) : null}
      <input
        id={id}
        {...rest}
        aria-invalid={Boolean(error)}
        className={cn(
          "h-11 w-full rounded-xl border border-[#e8e8e8] bg-white px-3.5 text-[13.5px] text-[#202020] placeholder:text-[#aaa] transition-colors duration-200 focus:border-[#252525] focus:outline-none",
          error && "border-[#e53935]",
          className,
        )}
      />
      {error ? (
        <p className="mt-1 text-[11.5px] text-[#e53935]">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-[11.5px] text-[#999]">{hint}</p>
      ) : null}
    </div>
  );
}

export function Textarea({
  label,
  hint,
  error,
  className,
  ...rest
}: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={id} className="mb-1.5 block text-[12.5px] text-[#555]">
          {label}
        </label>
      ) : null}
      <textarea
        id={id}
        {...rest}
        aria-invalid={Boolean(error)}
        className={cn(
          "min-h-[110px] w-full rounded-xl border border-[#e8e8e8] bg-white px-3.5 py-3 text-[13.5px] leading-7 text-[#202020] placeholder:text-[#aaa] transition-colors duration-200 focus:border-[#252525] focus:outline-none",
          error && "border-[#e53935]",
          className,
        )}
      />
      {error ? (
        <p className="mt-1 text-[11.5px] text-[#e53935]">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-[11.5px] text-[#999]">{hint}</p>
      ) : null}
    </div>
  );
}
