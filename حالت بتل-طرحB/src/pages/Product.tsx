import { useState } from "react";
import { cn, px, money, fa } from "../lib/utils";
import { products } from "../data/shop";
import { useShop } from "../lib/store";
import { navigate } from "../lib/router";
import { Crumb } from "./Shop";
import { ProductCard, Stars, DiscountPill } from "../components/ProductCard";
import { SectionTitle } from "../components/Rail";
import {
  Heart,
  Scale,
  Shield,
  Truck,
  Refresh,
  Cart,
  Check,
  Support as Store,
  Chevron,
  Star,
} from "../components/Icons";

export default function ProductPage({ id }: { id: string }) {
  const p = products.find((x) => x.id === id);
  const { add, wish, toggleWish, compare, toggleCompare } = useShop();
  const [img, setImg] = useState(0);
  const [color, setColor] = useState(0);
  const [tab, setTab] = useState<"specs" | "desc" | "comments">("desc");

  if (!p)
    return (
      <div className="mx-auto max-w-[1320px] px-4 py-24 text-center">
        <p className="text-lg font-black text-white">کالا یافت نشد</p>
        <button
          onClick={() => navigate("/shop")}
          className="mt-4 rounded-2xl bg-pk px-5 py-2.5 text-[13px] font-black text-white"
        >
          بازگشت به فروشگاه
        </button>
      </div>
    );

  const gallery = p.gallery ?? [p.img];
  const liked = wish.includes(p.id);
  const cmp = compare.includes(p.id);
  const related = products
    .filter((x) => x.id !== p.id && x.cats.some((c) => p.cats.includes(c)))
    .slice(0, 6);
  const totalStock = p.stock === "∞" ? 20 : (p.stock as number);

  return (
    <div className="mx-auto max-w-[1320px] px-3 py-4 sm:px-5 sm:py-6">
      <Crumb
        items={[
          { l: "خانه", to: "/" },
          { l: "فروشگاه", to: "/shop" },
          { l: p.cat, to: "/shop" },
          { l: p.title },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_1.15fr_320px]">
        {/* gallery */}
        <div className="rounded-3xl border border-line bg-surface p-4">
          <div className="relative overflow-hidden rounded-2xl bg-[#f4f4f6]">
            <img
              src={px(gallery[img], 900)}
              alt={p.title}
              className="aspect-square w-full object-cover"
            />
            {!!p.off && (
              <span className="num absolute right-3 top-3 rounded-xl bg-pk px-2.5 py-1.5 text-[12px] font-black text-white">
                ٪{fa(p.off)}
              </span>
            )}
          </div>
          <div className="mt-3 flex gap-2">
            {gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setImg(i)}
                className={cn(
                  "h-16 w-16 overflow-hidden rounded-xl ring-2 transition",
                  img === i ? "ring-pk" : "ring-line hover:ring-line-2"
                )}
              >
                <img src={px(g, 160)} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => toggleWish(p.id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-2xl border py-2.5 text-[12px] font-black transition",
                liked
                  ? "border-pk bg-pk text-white"
                  : "border-line bg-surface-2 text-fg-dim hover:text-pk"
              )}
            >
              <Heart className="h-4 w-4" filled={liked} />
              {liked ? "در علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی"}
            </button>
            <button
              onClick={() => toggleCompare(p.id)}
              className={cn(
                "grid h-11 w-11 place-items-center rounded-2xl border transition",
                cmp
                  ? "border-pk bg-pk text-white"
                  : "border-line bg-surface-2 text-fg-dim hover:text-pk"
              )}
              title="مقایسه"
            >
              <Scale className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* info */}
        <div className="rounded-3xl border border-line bg-surface p-5">
          <h1 className="text-[17px] font-black leading-8 text-white sm:text-xl">
            {p.title}
          </h1>
          {p.en && (
            <p className="mt-1 text-[11.5px] font-medium tracking-wide text-fg-mute">
              {p.en}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-line pb-4">
            <Stars rate={p.rate} votes={p.votes} />
            <span className="flex items-center gap-1.5 text-[11.5px] font-bold text-fg-dim">
              <Store className="h-4 w-4 text-pk" />
              فروشنده: <span className="text-fg">{p.seller}</span>
            </span>
            <span
              className={cn(
                "text-[11.5px] font-black",
                p.stock === "∞" ? "text-lime" : "text-gold"
              )}
            >
              {p.stock === "∞"
                ? "موجود در انبار"
                : `${fa(p.stock)} عدد در انبار باقی مانده`}
            </span>
          </div>

          {!!p.colors?.length && (
            <div className="mt-4">
              <p className="mb-2.5 text-[12px] font-black text-fg">
                انتخاب رنگ:{" "}
                <span className="font-bold text-fg-dim">{p.colors[color].name}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {p.colors.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(i)}
                    className={cn(
                      "flex items-center gap-2 rounded-xl border px-3 py-2 text-[11.5px] font-bold transition",
                      color === i
                        ? "border-pk bg-pk/10 text-white"
                        : "border-line bg-surface-2 text-fg-dim hover:text-white"
                    )}
                  >
                    <span
                      className="h-4 w-4 rounded-full ring-1 ring-white/25"
                      style={{ background: c.hex }}
                    />
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5">
            <div className="mb-3 flex gap-1 rounded-2xl border border-line bg-surface-2 p-1.5">
              {(
                [
                  { k: "desc", l: "معرفی" },
                  { k: "specs", l: "مشخصات" },
                  { k: "comments", l: "دیدگاه‌ها" },
                ] as const
              ).map((t) => (
                <button
                  key={t.k}
                  onClick={() => setTab(t.k)}
                  className={cn(
                    "flex-1 rounded-xl py-2 text-[12px] font-black transition",
                    tab === t.k ? "bg-pk text-white" : "text-fg-dim hover:text-white"
                  )}
                >
                  {t.l}
                </button>
              ))}
            </div>

            {tab === "desc" && (
              <div className="fade-up space-y-3 text-[12.5px] leading-7 text-fg-dim">
                <p>{p.desc}</p>
                <p>
                  این کالا با ضمانت اصالت و سلامت فیزیکی کالا توسط فروشگاه اینترنتی
                  پارس کالا عرضه می‌شود. در صورت مشاهده هرگونه مغایرت، تا ۷ روز فرصت
                  دارید درخواست مرجوعی ثبت کنید. ارسال برای شهر تهران در کمتر از ۲۴
                  ساعت انجام می‌شود.
                </p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {[
                    "گارانتی معتبر شرکتی",
                    "ارسال از انبار تهران",
                    "امکان پرداخت در محل",
                    "بسته‌بندی ضدضربه",
                  ].map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 rounded-xl bg-surface-2 px-3 py-2 text-[11.5px] font-bold text-fg"
                    >
                      <Check className="h-4 w-4 text-lime" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tab === "specs" && (
              <div className="fade-up overflow-hidden rounded-2xl border border-line">
                {(p.specs ?? [{ k: "دسته‌بندی", v: p.cat }]).map((s, i) => (
                  <div
                    key={s.k}
                    className={cn(
                      "flex items-center justify-between gap-4 px-4 py-3 text-[12px]",
                      i % 2 ? "bg-surface" : "bg-surface-2"
                    )}
                  >
                    <span className="font-bold text-fg-mute">{s.k}</span>
                    <span className="font-black text-fg">{s.v}</span>
                  </div>
                ))}
              </div>
            )}

            {tab === "comments" && (
              <div className="fade-up space-y-3">
                {[
                  { n: "کاربر پارس کالا", r: 5, t: "کیفیت ساخت عالی بود، ارسال هم سریع انجام شد. پیشنهاد می‌کنم." },
                  { n: "محمد ر.", r: 4, t: "نسبت به قیمتش ارزش خرید داره، فقط بسته‌بندی می‌تونست بهتر باشه." },
                ].map((c) => (
                  <div
                    key={c.n}
                    className="rounded-2xl border border-line bg-surface-2 p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-2 text-[12px] font-black text-fg">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-pk/15 text-[11px] text-pk">
                          {c.n.slice(0, 1)}
                        </span>
                        {c.n}
                      </span>
                      <span className="flex items-center gap-0.5 text-gold">
                        {Array.from({ length: c.r }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5" />
                        ))}
                      </span>
                    </div>
                    <p className="text-[12px] leading-6 text-fg-dim">{c.t}</p>
                  </div>
                ))}
                <button className="w-full rounded-2xl border border-dashed border-line py-3 text-[12px] font-black text-fg-dim transition hover:border-pk/50 hover:text-pk">
                  ثبت دیدگاه جدید
                </button>
              </div>
            )}
          </div>
        </div>

        {/* buy box */}
        <aside className="lg:sticky lg:top-[84px] lg:h-fit">
          <div className="rounded-3xl border border-line bg-surface p-5">
            <div className="mb-1 flex items-center justify-end gap-2">
              {!!p.old && (
                <span className="num text-[13px] text-fg-mute line-through">
                  {money(p.old)}
                </span>
              )}
              {!!p.off && <DiscountPill off={p.off} />}
            </div>
            <div className="flex items-baseline justify-end gap-1.5">
              <span className="num text-2xl font-black text-white">
                {money(p.price)}
              </span>
              <span className="text-[12px] font-bold text-fg-dim">تومان</span>
            </div>
            {!!p.old && (
              <p className="num mt-2 rounded-xl bg-pk/10 px-3 py-2 text-[11.5px] font-bold text-pk">
                سود شما از این خرید: {money(p.old - p.price)} تومان
              </p>
            )}

            <button
              onClick={() => add(p.id, p.colors?.[color]?.name)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-pk py-3.5 text-[13.5px] font-black text-white shadow-[0_16px_36px_-18px_rgba(239,57,78,1)] transition hover:bg-pk-dark"
            >
              <Cart className="h-5 w-5" />
              افزودن به سبد خرید
            </button>

            {totalStock <= 7 && (
              <div className="mt-3">
                <div className="mb-1.5 flex items-center justify-between text-[10.5px] font-bold text-fg-mute">
                  <span>موجودی انبار</span>
                  <span className="num text-gold">{fa(totalStock)} عدد</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-surface-3">
                  <div
                    className="h-full rounded-full bg-gradient-to-l from-gold to-pk"
                    style={{ width: `${Math.min(100, (totalStock / 20) * 100)}%` }}
                  />
                </div>
              </div>
            )}

            <ul className="mt-5 space-y-3 border-t border-line pt-4">
              {[
                { Icon: Shield, t: "اصل بودن کالا تضمین می‌شود" },
                { Icon: Truck, t: "ارسال سریع به سراسر ایران" },
                { Icon: Refresh, t: "۷ روز ضمانت بازگشت کالا" },
              ].map(({ Icon, t }) => (
                <li
                  key={t}
                  className="flex items-center gap-2.5 text-[11.5px] font-bold text-fg-dim"
                >
                  <Icon className="h-[18px] w-[18px] shrink-0 text-pk" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-8">
          <SectionTitle
            title="کالاهای مشابه"
            sub="پیشنهاد پارس کالا برای شما"
            action="مشاهده همه"
            onAction={() => navigate("/shop")}
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {related.map((r) => (
              <ProductCard key={r.id} p={r} />
            ))}
          </div>
        </section>
      )}

      <button
        onClick={() => navigate("/shop")}
        className="mx-auto mt-8 flex items-center gap-2 rounded-2xl border border-line bg-surface px-5 py-3 text-[12.5px] font-black text-fg-dim transition hover:border-pk/40 hover:text-pk"
      >
        <Chevron className="h-4 w-4" />
        بازگشت به فروشگاه
      </button>
    </div>
  );
}
