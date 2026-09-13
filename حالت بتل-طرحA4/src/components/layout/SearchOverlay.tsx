"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Clock, Search, TrendingUp, X } from "lucide-react";
import { categories } from "@/data/categories";
import type { Product } from "@/data/types";
import { formatPrice } from "@/lib/utils";
import { useStore } from "@/store/store-provider";

const SUGGESTIONS = ["کفش کتانی", "ساعت مچی", "پیراهن مردانه", "سرم ویتامین ث", "کیف چرم"];

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, searchHistory, pushSearch, clearSearchHistory } = useStore();
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (searchOpen) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 120);
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
      document.addEventListener("keydown", onKey);
      return () => {
        window.clearTimeout(t);
        document.removeEventListener("keydown", onKey);
      };
    }
  }, [searchOpen, setSearchOpen]);

  useEffect(() => {
    if (!term.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const t = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(term)}&perPage=6`);
        const data = await res.json();
        setResults(data.items ?? []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 260);
    return () => window.clearTimeout(t);
  }, [term]);

  const submit = (value: string) => {
    const q = value.trim();
    if (!q) return;
    pushSearch(q);
    setSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <AnimatePresence>
      {searchOpen ? (
        <div className="fixed inset-0 z-[105]" role="dialog" aria-modal="true" aria-label="جستجو">
          <motion.button
            type="button"
            aria-label="بستن جستجو"
            onClick={() => setSearchOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 h-full w-full cursor-default bg-black/45"
          />
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
            className="absolute start-0 end-0 top-0 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.14)]"
          >
            <div className="container-x py-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit(term);
                }}
                className="flex items-center gap-2"
              >
                <div className="flex h-12 flex-1 items-center gap-2.5 rounded-xl bg-[#f7f7f7] px-3.5">
                  <Search size={18} className="shrink-0 text-[#888]" />
                  <input
                    ref={inputRef}
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="جستجوی محصول، برند یا دسته‌بندی..."
                    aria-label="جستجو"
                    className="h-full w-full bg-transparent text-[13.5px] text-[#202020] placeholder:text-[#999] focus:outline-none"
                  />
                  {term ? (
                    <button
                      type="button"
                      onClick={() => setTerm("")}
                      aria-label="پاک کردن"
                      className="text-[#999] hover:text-[#333]"
                    >
                      <X size={16} />
                    </button>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="h-12 shrink-0 rounded-xl px-3 text-[13px] text-[#666] transition-colors hover:bg-[#f7f7f7]"
                >
                  انصراف
                </button>
              </form>

              <div className="mt-4 grid gap-6 pb-6 md:grid-cols-[260px_1fr]">
                <div className="space-y-5">
                  {searchHistory.length > 0 ? (
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-[12px] font-medium text-[#555]">
                          <Clock size={14} /> جستجوهای اخیر
                        </span>
                        <button
                          type="button"
                          onClick={clearSearchHistory}
                          className="text-[11.5px] text-[#999] hover:text-[#e53935]"
                        >
                          پاک کردن
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {searchHistory.map((h) => (
                          <button
                            key={h}
                            type="button"
                            onClick={() => submit(h)}
                            className="rounded-lg bg-[#f7f7f7] px-2.5 py-1.5 text-[12px] text-[#444] transition-colors hover:bg-[#ededed]"
                          >
                            {h}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div>
                    <span className="mb-2 flex items-center gap-1.5 text-[12px] font-medium text-[#555]">
                      <TrendingUp size={14} /> جستجوهای پرطرفدار
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => submit(s)}
                          className="rounded-lg border border-[#e8e8e8] px-2.5 py-1.5 text-[12px] text-[#444] transition-colors hover:border-[#252525]"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="mb-2 block text-[12px] font-medium text-[#555]">
                      دسته‌بندی‌ها
                    </span>
                    <ul className="space-y-1">
                      {categories.slice(0, 5).map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/category/${c.slug}`}
                            onClick={() => setSearchOpen(false)}
                            className="block rounded-lg px-2 py-1.5 text-[12.5px] text-[#444] transition-colors hover:bg-[#f7f7f7]"
                          >
                            {c.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <span className="mb-2 block text-[12px] font-medium text-[#555]">
                    {term ? "نتایج پیشنهادی" : "پیشنهاد ویژه امروز"}
                  </span>
                  {loading ? (
                    <div className="grid gap-2 sm:grid-cols-2">
                      {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="skeleton h-[76px] rounded-xl" />
                      ))}
                    </div>
                  ) : results.length > 0 ? (
                    <div className="grid gap-2 sm:grid-cols-2">
                      {results.map((p) => (
                        <Link
                          key={p.slug}
                          href={`/product/${p.slug}`}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center gap-3 rounded-xl border border-[#e8e8e8] p-2 transition-colors hover:border-[#dcdcdc] hover:bg-[#fafafa]"
                        >
                          <span className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-[#f7f7f7]">
                            <Image src={p.images[0]} alt="" fill sizes="56px" className="object-cover" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="line-2 block text-[12.5px] text-[#202020]">{p.title}</span>
                            <span className="num mt-1 block text-[12.5px] font-bold text-[#202020]">
                              {formatPrice(p.price)}
                              <span className="mx-1 text-[10.5px] font-normal text-[#888]">تومان</span>
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : term ? (
                    <p className="rounded-xl bg-[#f7f7f7] px-4 py-6 text-center text-[12.5px] text-[#888]">
                      نتیجه‌ای برای «{term}» پیدا نشد. املای عبارت را بررسی کنید.
                    </p>
                  ) : (
                    <p className="rounded-xl bg-[#f7f7f7] px-4 py-6 text-center text-[12.5px] text-[#888]">
                      برای مشاهده نتایج، عبارتی را وارد کنید.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
