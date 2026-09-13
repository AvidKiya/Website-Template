import { useMemo, useState } from "react";
import { cn, fa, money } from "../lib/utils";
import { products, catFilters, brands } from "../data/shop";
import { ProductCard } from "../components/ProductCard";
import { useRoute, navigate } from "../lib/router";
import { useShop } from "../lib/store";
import { Rail } from "../components/Rail";
import { Chevron, Close, Grid, Heart, Scale, Search } from "../components/Icons";

const SORTS = [
  { k: "def", l: "پیش‌فرض" },
  { k: "pop", l: "محبوب‌ترین" },
  { k: "rate", l: "بالاترین امتیاز" },
  { k: "new", l: "جدیدترین" },
  { k: "cheap", l: "ارزان‌ترین" },
  { k: "exp", l: "گران‌ترین" },
  { k: "off", l: "بیشترین تخفیف" },
];

export default function Shop() {
  const route = useRoute();
  const { wish, compare } = useShop();
  const q = route.query.get("q") || "";
  const cat = route.query.get("cat") || "all";
  const tab = route.query.get("tab") || "";
  const sort = route.query.get("sort") || "def";

  const [max, setMax] = useState(550000000);
  const [onlyOff, setOnlyOff] = useState(false);
  const [inStock, setInStock] = useState(false);
  const [brand, setBrand] = useState<string[]>([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const per = 12;

  const setParam = (k: string, v: string) => {
    const p = new URLSearchParams(route.query.toString());
    if (v === "all" || !v) p.delete(k);
    else p.set(k, v);
    navigate(`/shop?${p.toString()}`);
    setPage(1);
  };

  const list = useMemo(() => {
    let out = products.filter((p) => {
      if (q && !(p.title + " " + (p.en ?? "") + " " + p.cat).includes(q))
        return false;
      if (cat !== "all" && !p.cats.includes(cat)) return false;
      if (p.price > max) return false;
      if (onlyOff && !p.off) return false;
      if (inStock && p.stock !== "∞" && (p.stock as number) <= 0) return false;
      if (brand.length && !p.en && !brand.some((b) => p.title.includes(b.slice(0, 4))))
        return false;
      return true;
    });
    const s: Record<string, (a: any, b: any) => number> = {
      pop: (a, b) => b.votes - a.votes,
      rate: (a, b) => b.rate - a.rate,
      new: (a, b) => +b.id.slice(1) - +a.id.slice(1),
      cheap: (a, b) => a.price - b.price,
      exp: (a, b) => b.price - a.price,
      off: (a, b) => (b.off || 0) - (a.off || 0),
      def: () => 0,
    };
    return [...out].sort(s[sort] || s.def);
  }, [q, cat, max, onlyOff, inStock, brand, sort]);

  const pages = Math.max(1, Math.ceil(list.length / per));
  const slice = list.slice((page - 1) * per, page * per);

  if (tab === "wish") {
    const w = products.filter((p) => wish.includes(p.id));
    return (
      <div className="mx-auto max-w-[1320px] px-3 py-6 sm:px-5">
        <Crumb items={[{ l: "خانه", to: "/" }, { l: "علاقه‌مندی‌ها" }]} />
        <Header
          title="لیست علاقه‌مندی‌ها"
          sub={`${fa(w.length)} کالا ذخیره شده است`}
          Icon={<Heart className="h-5 w-5" />}
        />
        {w.length ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {w.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        ) : (
          <Empty text="هنوز کالایی به علاقه‌مندی‌ها اضافه نکرده‌اید." />
        )}
      </div>
    );
  }

  if (tab === "cmp") {
    const c = products.filter((p) => compare.includes(p.id));
    return (
      <div className="mx-auto max-w-[1320px] px-3 py-6 sm:px-5">
        <Crumb items={[{ l: "خانه", to: "/" }, { l: "مقایسه کالاها" }]} />
        <Header
          title="لیست مقایسه"
          sub={`${fa(c.length)} کالا برای مقایسه انتخاب شده است`}
          Icon={<Scale className="h-5 w-5" />}
        />
        {c.length ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {c.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        ) : (
          <Empty text="برای مقایسه، روی آیکون ترازو در کارت کالا بزنید." />
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1320px] px-3 py-4 sm:px-5 sm:py-6">
      <Crumb
        items={[
          { l: "خانه", to: "/" },
          { l: "فروشگاه", to: "/shop" },
          ...(q ? [{ l: `جستجوی «${q}»` }] : []),
        ]}
      />

      {/* quick category rail */}
      <div className="mb-4">
        <Rail>
          {catFilters.map((c) => (
            <button
              key={c.key}
              onClick={() => setParam("cat", c.key)}
              className={cn(
                "shrink-0 snap-start rounded-2xl border px-4 py-2.5 text-[12.5px] font-black transition",
                cat === c.key
                  ? "border-pk bg-pk/12 text-pk"
                  : "border-line bg-surface text-fg-dim hover:border-pk/40 hover:text-white"
              )}
            >
              {c.label}
              <span className="num ms-1.5 text-[10.5px] opacity-70">
                {c.key === "all"
                  ? fa(products.length)
                  : fa(products.filter((p) => p.cats.includes(c.key)).length)}
              </span>
            </button>
          ))}
        </Rail>
      </div>

      <div className="grid gap-4 lg:grid-cols-[276px_1fr]">
        {/* filters */}
        <aside className="lg:sticky lg:top-[84px] lg:h-fit">
          <button
            onClick={() => setOpenFilter((v) => !v)}
            className="mb-3 flex w-full items-center justify-between rounded-2xl border border-line bg-surface px-4 py-3 text-[13px] font-black text-fg lg:hidden"
          >
            <span className="flex items-center gap-2">
              <Search className="h-4 w-4 text-pk" /> فیلترها
            </span>
            <Chevron className={cn("h-4 w-4 transition", openFilter ? "rotate-90" : "")} />
          </button>

          <div className={cn("space-y-3", openFilter ? "block" : "hidden lg:block")}>
            <Box title="دسته‌بندی‌ها">
              <div className="space-y-1">
                {catFilters.map((c) => {
                  const n =
                    c.key === "all"
                      ? products.length
                      : products.filter((p) => p.cats.includes(c.key)).length;
                  return (
                    <button
                      key={c.key}
                      onClick={() => setParam("cat", c.key)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl px-3 py-2 text-[12px] font-bold transition",
                        cat === c.key
                          ? "bg-pk/12 text-pk"
                          : "text-fg-dim hover:bg-surface-2 hover:text-white"
                      )}
                    >
                      {c.label}
                      <span className="num text-[10.5px] opacity-70">{fa(n)}</span>
                    </button>
                  );
                })}
              </div>
            </Box>

            <Box title="محدوده قیمت">
              <input
                type="range"
                min={100000}
                max={550000000}
                step={100000}
                value={max}
                onChange={(e) => setMax(+e.target.value)}
                className="w-full accent-pk"
              />
              <div className="mt-2 flex items-center justify-between text-[11px] font-bold text-fg-mute">
                <span>تا</span>
                <span className="num text-pk">{money(max)} تومان</span>
              </div>
            </Box>

            <Box title="وضعیت کالا">
              <Check label="فقط کالاهای دارای تخفیف" v={onlyOff} on={() => setOnlyOff((v) => !v)} />
              <Check label="نمایش کالاهای موجود" v={inStock} on={() => setInStock((v) => !v)} />
            </Box>

            <Box title="برند">
              <div className="max-h-44 space-y-1 overflow-y-auto pe-1">
                {brands.slice(0, 10).map((b) => (
                  <Check
                    key={b}
                    label={b}
                    v={brand.includes(b)}
                    on={() =>
                      setBrand((s) =>
                        s.includes(b) ? s.filter((x) => x !== b) : [...s, b]
                      )
                    }
                  />
                ))}
              </div>
            </Box>

            <button
              onClick={() => {
                setMax(550000000);
                setOnlyOff(false);
                setInStock(false);
                setBrand([]);
                setParam("cat", "all");
              }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-line bg-surface py-3 text-[12px] font-black text-fg-dim transition hover:border-pk/40 hover:text-pk"
            >
              <Close className="h-4 w-4" /> حذف همه فیلترها
            </button>
          </div>
        </aside>

        {/* listing */}
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2 rounded-2xl border border-line bg-surface p-3">
            <span className="text-[12px] font-bold text-fg-mute">مرتب‌سازی:</span>
            <div className="no-bar flex flex-1 gap-1.5 overflow-x-auto">
              {SORTS.map((s) => (
                <button
                  key={s.k}
                  onClick={() => setParam("sort", s.k)}
                  className={cn(
                    "shrink-0 rounded-xl px-3 py-1.5 text-[11.5px] font-black transition",
                    sort === s.k
                      ? "bg-pk text-white"
                      : "text-fg-dim hover:bg-surface-2 hover:text-white"
                  )}
                >
                  {s.l}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 rounded-xl border border-line bg-ink p-1">
              {(["grid", "list"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  aria-label={v}
                  className={cn(
                    "grid h-7 w-7 place-items-center rounded-lg transition",
                    view === v ? "bg-pk text-white" : "text-fg-mute hover:text-white"
                  )}
                >
                  <Grid className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          <p className="mb-3 text-[11.5px] font-bold text-fg-mute">
            نمایش {fa(slice.length)} کالا از {fa(list.length)} کالا
            {q && <> برای «{q}»</>}
          </p>

          {slice.length ? (
            <div
              className={cn(
                "grid gap-3",
                view === "grid"
                  ? "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1 sm:grid-cols-2"
              )}
            >
              {slice.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          ) : (
            <Empty text="کالایی با این فیلترها پیدا نشد. فیلترها را تغییر دهید." />
          )}

          {pages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-1.5">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="rounded-xl border border-line bg-surface px-3 py-2 text-[12px] font-black text-fg-dim disabled:opacity-40"
              >
                قبلی
              </button>
              {Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={cn(
                    "num h-9 w-9 rounded-xl border text-[12px] font-black transition",
                    page === i + 1
                      ? "border-pk bg-pk text-white"
                      : "border-line bg-surface text-fg-dim hover:text-white"
                  )}
                >
                  {fa(i + 1)}
                </button>
              ))}
              <button
                disabled={page === pages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-xl border border-line bg-surface px-3 py-2 text-[12px] font-black text-fg-dim disabled:opacity-40"
              >
                بعدی
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Crumb({ items }: { items: { l: string; to?: string }[] }) {
  return (
    <nav className="mb-4 flex items-center gap-1.5 overflow-x-auto text-[11.5px] font-bold text-fg-mute">
      {items.map((i, idx) => (
        <span key={i.l + idx} className="flex shrink-0 items-center gap-1.5">
          {i.to ? (
            <a href={"#" + i.to} className="transition hover:text-pk">
              {i.l}
            </a>
          ) : (
            <span className="text-fg-dim">{i.l}</span>
          )}
          {idx < items.length - 1 && <span className="text-fg-mute">/</span>}
        </span>
      ))}
    </nav>
  );
}

function Box({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-3.5">
      <h4 className="mb-3 text-[12.5px] font-black text-white">{title}</h4>
      {children}
    </div>
  );
}

function Check({
  label,
  v,
  on,
}: {
  label: string;
  v: boolean;
  on: () => void;
}) {
  return (
    <button
      onClick={on}
      className="flex w-full items-center gap-2.5 rounded-xl px-1 py-1.5 text-start text-[11.5px] font-bold text-fg-dim transition hover:text-white"
    >
      <span
        className={cn(
          "grid h-[18px] w-[18px] shrink-0 place-items-center rounded-md border transition",
          v ? "border-pk bg-pk text-white" : "border-line-2 bg-ink"
        )}
      >
        {v && <span className="h-2 w-2 rounded-sm bg-white" />}
      </span>
      {label}
    </button>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="grid place-items-center gap-3 rounded-3xl border border-dashed border-line bg-surface py-16 text-center">
      <span className="grid h-20 w-20 place-items-center rounded-full bg-surface-2 text-fg-mute">
        <Search className="h-9 w-9" />
      </span>
      <p className="text-[13px] font-bold text-fg-dim">{text}</p>
    </div>
  );
}

function Header({
  title,
  sub,
  Icon,
}: {
  title: string;
  sub: string;
  Icon: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-surface-2 text-pk ring-1 ring-line">
        {Icon}
      </span>
      <div>
        <h1 className="text-lg font-black text-white">{title}</h1>
        <p className="text-[11.5px] text-fg-mute">{sub}</p>
      </div>
    </div>
  );
}
