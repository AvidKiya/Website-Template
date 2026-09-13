"use client";

import { useEffect, useState } from "react";
import { MessageCircleQuestion, ThumbsUp } from "lucide-react";
import type { Question } from "@/data/types";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatDate, toPersianDigits } from "@/lib/utils";
import { useStore } from "@/store/store-provider";

export function Questions({ productSlug }: { productSlug: string }) {
  const [items, setItems] = useState<Question[] | null>(null);
  const [form, setForm] = useState({ author: "", body: "" });
  const [saving, setSaving] = useState(false);
  const { toast } = useStore();

  useEffect(() => {
    let active = true;
    fetch(`/api/questions?product=${encodeURIComponent(productSlug)}`)
      .then((r) => r.json())
      .then((d) => active && setItems(d.items ?? []))
      .catch(() => active && setItems([]));
    return () => {
      active = false;
    };
  }, [productSlug]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.author.trim() || !form.body.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, productSlug }),
      });
      const data = await res.json();
      if (data.question) setItems((prev) => [data.question, ...(prev ?? [])]);
      setForm({ author: "", body: "" });
      toast("پرسش شما ثبت شد و پس از بررسی پاسخ داده می‌شود");
    } catch {
      toast("ثبت پرسش ناموفق بود", "info");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div>
        {items === null ? (
          <div className="space-y-3">
            {[0, 1].map((i) => (
              <Skeleton key={i} className="h-[120px] rounded-[14px]" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-[14px] border border-dashed border-[#e0e0e0] px-6 py-14 text-center">
            <p className="text-[13.5px] font-medium text-[#202020]">هنوز پرسشی ثبت نشده است</p>
            <p className="mt-1.5 text-[12.5px] text-[#888]">
              سوال خود را بپرسید؛ کارشناسان ما در کمتر از ۲۴ ساعت پاسخ می‌دهند.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {items.map((q) => (
              <li key={q.id} className="rounded-[14px] border border-[#e8e8e8] p-4">
                <div className="flex items-start gap-2.5">
                  <MessageCircleQuestion size={17} className="mt-0.5 shrink-0 text-[#555]" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] font-medium leading-7 text-[#202020]">{q.body}</p>
                    <span className="mt-1 block text-[11px] text-[#aaa]">
                      {q.author} • {formatDate(q.createdAt)}
                    </span>
                  </div>
                </div>
                {q.answer ? (
                  <div className="mt-3 rounded-xl bg-[#f7f7f7] p-3">
                    <span className="mb-1 block text-[11.5px] font-medium text-[#18a86b]">
                      پاسخ کارشناس فروشگاه
                    </span>
                    <p className="text-[12.5px] leading-7 text-[#666]">{q.answer}</p>
                  </div>
                ) : (
                  <p className="mt-3 text-[11.5px] text-[#aaa]">در انتظار پاسخ کارشناس</p>
                )}
                <button
                  type="button"
                  className="mt-2.5 flex items-center gap-1.5 text-[11.5px] text-[#999] transition-colors hover:text-[#202020]"
                >
                  <ThumbsUp size={14} /> مفید بود ({toPersianDigits(q.helpful ?? 0)})
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form
        onSubmit={submit}
        className="h-fit space-y-3 rounded-[14px] border border-[#e8e8e8] p-4"
      >
        <h3 className="text-[13.5px] font-bold text-[#202020]">پرسش خود را مطرح کنید</h3>
        <p className="text-[11.5px] leading-6 text-[#888]">
          درباره جنس، سایزبندی، گارانتی یا نحوه ارسال این کالا سوال دارید؟
        </p>
        <Input
          label="نام شما"
          value={form.author}
          onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
          required
        />
        <Textarea
          label="متن پرسش"
          value={form.body}
          onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
          required
        />
        <Button type="submit" fullWidth loading={saving}>
          ارسال پرسش
        </Button>
      </form>
    </div>
  );
}
