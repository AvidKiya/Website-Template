"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/store/store-provider";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useStore();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("لطفا یک ایمیل معتبر وارد کنید.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setEmail("");
      toast("عضویت شما در خبرنامه ثبت شد");
    } catch {
      setError("ثبت ایمیل انجام نشد. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-x section-gap" aria-label="خبرنامه">
      <div className="flex flex-col items-center gap-5 rounded-[16px] bg-[#f7f7f7] px-5 py-8 md:flex-row md:justify-between md:px-10">
        <div className="flex items-center gap-3.5">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#252525] text-white">
            <Mail size={19} />
          </span>
          <div>
            <h2 className="text-[14.5px] font-bold text-[#202020]">
              از تخفیف‌ها زودتر باخبر شوید
            </h2>
            <p className="mt-0.5 text-[12px] text-[#888]">
              هفته‌ای یک ایمیل، شامل کالکشن‌های تازه و کدهای تخفیف اختصاصی.
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="flex w-full max-w-md flex-col gap-2 md:w-auto">
          <div className="flex w-full items-center gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ایمیل خود را وارد کنید"
              aria-label="ایمیل"
              className="h-11 flex-1 rounded-xl border border-[#e8e8e8] bg-white px-3.5 text-[13px] placeholder:text-[#aaa] focus:border-[#252525] focus:outline-none md:w-72"
            />
            <Button type="submit" loading={loading} className="shrink-0">
              عضویت
            </Button>
          </div>
          {error ? <span className="text-[11.5px] text-[#e53935]">{error}</span> : null}
        </form>
      </div>
    </section>
  );
}
