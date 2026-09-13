"use client";

import { useEffect, useState } from "react";
import { PenLine, ThumbsUp } from "lucide-react";
import type { Review } from "@/data/types";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Stars } from "@/components/ui/Rating";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn, formatDate, toPersianDigits } from "@/lib/utils";
import { useStore } from "@/store/store-provider";

export function Reviews({ productSlug, rating }: { productSlug: string; rating: number }) {
  const [items, setItems] = useState<Review[] | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ author: "", title: "", body: "", rating: 5 });
  const [saving, setSaving] = useState(false);
  const { toast } = useStore();

  useEffect(() => {
    let active = true;
    fetch(`/api/reviews?product=${encodeURIComponent(productSlug)}`)
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
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, productSlug }),
      });
      const data = await res.json();
      if (data.review) setItems((prev) => [data.review, ...(prev ?? [])]);
      setForm({ author: "", title: "", body: "", rating: 5 });
      setOpen(false);
      toast("دیدگاه شما ثبت شد");
    } catch {
      toast("ثبت دیدگاه ناموفق بود", "info");
    } finally {
      setSaving(false);
    }
  };

  const average =
    items && items.length > 0
      ? items.reduce((s, r) => s + r.rating, 0) / items.length
      : rating;

  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = items?.filter((r) => r.rating === star).length ?? 0;
    const total = items?.length || 1;
    return { star, count, percent: Math.round((count / total) * 100) };
  });

  return (
    <div id="reviews" className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div className="h-fit rounded-[14px] border border-[#e8e8e8] p-5">
        <div className="flex flex-col items-center gap-2 border-b border-[#f0f0f0] pb-4">
          <span className="num text-[30px] font-bold leading-none text-[#202020]">
            {toPersianDigits(average.toFixed(1))}
          </span>
          <Stars value={average} />
          <span className="num text-[12px] text-[#888]">
            از {toPersianDigits(items?.length ?? 0)} دیدگاه ثبت‌شده
          </span>
        </div>

        <div className="space-y-2 py-4">
          {distribution.map((d) => (
            <div key={d.star} className="flex items-center gap-2">
              <span className="num w-4 text-[11.5px] text-[#777]">{toPersianDigits(d.star)}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#f0f0f0]">
                <span
                  className="block h-full rounded-full bg-[#f5a623] transition-[width] duration-500"
                  style={{ width: `${d.percent}%` }}
                />
              </span>
              <span className="num w-6 text-[11px] text-[#aaa]">{toPersianDigits(d.count)}</span>
            </div>
          ))}
        </div>

        <Button fullWidth variant="outline" onClick={() => setOpen(true)}>
          <PenLine size={16} />
          ثبت دیدگاه
        </Button>
      </div>

      <div>
        {items === null ? (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-[110px] rounded-[14px]" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-[14px] border border-dashed border-[#e0e0e0] px-6 py-14 text-center">
            <p className="text-[13.5px] font-medium text-[#202020]">هنوز دیدگاهی ثبت نشده است</p>
            <p className="mt-1.5 text-[12.5px] leading-7 text-[#888]">
              اولین نفری باشید که تجربه خرید این کالا را با دیگران به اشتراک می‌گذارد.
            </p>
            <Button className="mt-4" onClick={() => setOpen(true)}>
              نوشتن دیدگاه
            </Button>
          </div>
        ) : (
          <ul className="space-y-3">
            {items.map((review) => (
              <li key={review.id} className="rounded-[14px] border border-[#e8e8e8] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-9 place-items-center rounded-full bg-[#f7f7f7] text-[12px] font-bold text-[#666]">
                      {review.author.slice(0, 1)}
                    </span>
                    <div>
                      <span className="block text-[12.5px] font-medium text-[#202020]">
                        {review.author}
                      </span>
                      <span className="block text-[11px] text-[#aaa]">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                  </div>
                  <Stars value={review.rating} size={13} />
                </div>
                {review.title ? (
                  <h4 className="mt-3 text-[13px] font-bold text-[#202020]">{review.title}</h4>
                ) : null}
                <p className="mt-1.5 text-[12.5px] leading-8 text-[#666]">{review.body}</p>
                <button
                  type="button"
                  className="mt-2.5 flex items-center gap-1.5 text-[11.5px] text-[#999] transition-colors hover:text-[#202020]"
                >
                  <ThumbsUp size={14} /> مفید بود ({toPersianDigits(review.helpful ?? 0)})
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="ثبت دیدگاه" className="max-w-lg">
        <form onSubmit={submit} className="space-y-3 p-5">
          <h3 className="text-[14px] font-bold text-[#202020]">دیدگاه خود را بنویسید</h3>
          <div>
            <span className="mb-1.5 block text-[12.5px] text-[#555]">امتیاز شما</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, rating: n }))}
                  aria-label={`${n} ستاره`}
                  className={cn(
                    "grid size-9 place-items-center rounded-lg border transition-colors",
                    n <= form.rating ? "border-[#f5a623] bg-[#fff7e8]" : "border-[#e8e8e8]",
                  )}
                >
                  <span className="num text-[12px] text-[#555]">{toPersianDigits(n)}</span>
                </button>
              ))}
            </div>
          </div>
          <Input
            label="نام شما"
            value={form.author}
            onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
            required
          />
          <Input
            label="عنوان دیدگاه"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />
          <Textarea
            label="متن دیدگاه"
            value={form.body}
            onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
            required
          />
          <div className="flex gap-2 pt-1">
            <Button type="submit" loading={saving} fullWidth>
              ثبت دیدگاه
            </Button>
            <Button type="button" variant="soft" onClick={() => setOpen(false)}>
              انصراف
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
