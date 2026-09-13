import { useState } from "react";
import { cn, fa } from "../lib/utils";
import { faqs } from "../data/shop";
import { useShop } from "../lib/store";
import { Crumb } from "./Shop";
import {
  Chevron,
  BoxSearch,
  Lifebuoy,
  Support,
  Phone,
  Sms,
  Check,
  Info,
  Truck,
  Card,
} from "../components/Icons";

/* ---------------------------------- FAQ -------------------------------- */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-[1000px] px-3 py-5 sm:px-5">
      <Crumb items={[{ l: "خانه", to: "/" }, { l: "پرسش و پاسخ" }]} />
      <PageHead
        Icon={<Info className="h-6 w-6" />}
        title="پرسش و پاسخ"
        sub="پاسخ پرتکرارترین سوالات شما درباره خرید از پارس کالا"
      />

      <div className="space-y-2.5">
        {faqs.map((f, i) => (
          <div
            key={f.q}
            className={cn(
              "overflow-hidden rounded-2xl border bg-surface transition",
              open === i ? "border-pk/40" : "border-line"
            )}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center gap-3 p-4 text-start"
            >
              <span
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-xl transition",
                  open === i ? "bg-pk text-white" : "bg-surface-2 text-pk"
                )}
              >
                <Info className="h-4 w-4" />
              </span>
              <span className="flex-1 text-[13px] font-black text-fg">{f.q}</span>
              <Chevron
                className={cn(
                  "h-4 w-4 shrink-0 text-fg-mute transition",
                  open === i && "-rotate-90"
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300",
                open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="border-t border-line px-4 py-4 text-[12.5px] leading-7 text-fg-dim">
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { Icon: Truck, t: "رویه ارسال سفارش", d: "ارسال به سراسر ایران" },
          { Icon: Card, t: "شیوه‌های پرداخت", d: "آنلاین، کیف پول، در محل" },
          { Icon: Lifebuoy, t: "شرایط بازگشت کالا", d: "۷ روز ضمانت بی‌قید و شرط" },
        ].map(({ Icon, t, d }) => (
          <div
            key={t}
            className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-pk/10 text-pk ring-1 ring-pk/20">
              <Icon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-[12.5px] font-black text-fg">{t}</span>
              <span className="block text-[10.5px] text-fg-mute">{d}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- TRACK -------------------------------- */
const STEPS = [
  { t: "ثبت سفارش", d: "۱۴۰۴/۰۳/۱۲ - ۱۰:۲۴", done: true },
  { t: "پردازش و بسته‌بندی", d: "۱۴۰۴/۰۳/۱۲ - ۱۶:۰۲", done: true },
  { t: "تحویل به پیک", d: "۱۴۰۴/۰۳/۱۳ - ۰۹:۱۵", done: true },
  { t: "در حال ارسال", d: "در انتظار", done: false },
  { t: "تحویل به مشتری", d: "در انتظار", done: false },
];

export function Track() {
  const { toast } = useShop();
  const [code, setCode] = useState("");
  const [show, setShow] = useState(false);

  return (
    <div className="mx-auto max-w-[900px] px-3 py-5 sm:px-5">
      <Crumb items={[{ l: "خانه", to: "/" }, { l: "پیگیری سفارش" }]} />
      <PageHead
        Icon={<BoxSearch className="h-6 w-6" />}
        title="پیگیری سفارش"
        sub="کد رهگیری مرسوله خود را وارد کنید"
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!code.trim()) return toast("کد رهگیری را وارد کنید", "info");
          setShow(true);
        }}
        className="mb-6 flex flex-col gap-2 rounded-3xl border border-line bg-surface p-4 sm:flex-row"
      >
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="PK-428913"
          className="num h-12 flex-1 rounded-2xl border border-line bg-ink px-4 text-[13px] outline-none transition placeholder:text-fg-mute focus:border-pk/60"
        />
        <button className="h-12 shrink-0 rounded-2xl bg-pk px-6 text-[13px] font-black text-white transition hover:bg-pk-dark">
          پیگیری
        </button>
      </form>

      {show && (
        <div className="fade-up rounded-3xl border border-line bg-surface p-5">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
            <div>
              <p className="text-[11.5px] text-fg-mute">کد سفارش</p>
              <p className="num text-[15px] font-black text-white">{code || "PK-428913"}</p>
            </div>
            <div>
              <p className="text-[11.5px] text-fg-mute">مبلغ کل</p>
              <p className="num text-[15px] font-black text-pk">۲٬۳۴۸٬۰۰۰ تومان</p>
            </div>
            <span className="rounded-full bg-gold/15 px-3 py-1.5 text-[11.5px] font-black text-gold ring-1 ring-gold/25">
              در حال ارسال
            </span>
          </div>

          <ol className="relative space-y-6 ps-7">
            <span className="absolute bottom-2 right-[13px] top-2 w-0.5 bg-line" />
            {STEPS.map((s, i) => (
              <li key={s.t} className="relative">
                <span
                  className={cn(
                    "absolute -right-[30px] top-0 grid h-7 w-7 place-items-center rounded-full ring-4 ring-surface",
                    s.done ? "bg-lime text-black" : "bg-surface-3 text-fg-mute"
                  )}
                >
                  {s.done ? <Check className="h-4 w-4" /> : <span className="h-2 w-2 rounded-full bg-fg-mute" />}
                </span>
                <p className="text-[13px] font-black text-fg">
                  {fa(i + 1)}. {s.t}
                </p>
                <p className="num mt-0.5 text-[11px] text-fg-mute">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

/* ------------------------------- CONTACT ------------------------------- */
export function Contact() {
  const { toast } = useShop();
  const [f, setF] = useState({ name: "", mail: "", msg: "" });
  return (
    <div className="mx-auto max-w-[1100px] px-3 py-5 sm:px-5">
      <Crumb items={[{ l: "خانه", to: "/" }, { l: "تماس با ما" }]} />
      <PageHead
        Icon={<Lifebuoy className="h-6 w-6" />}
        title="تماس با ما"
        sub="۲۴ ساعته، ۷ روز هفته پاسخگوی شما هستیم"
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!f.name || !f.msg) return toast("اطلاعات را کامل کنید", "info");
            toast("پیام شما ارسال شد. به زودی پاسخ می‌دهیم ✓");
            setF({ name: "", mail: "", msg: "" });
          }}
          className="space-y-3 rounded-3xl border border-line bg-surface p-5"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="نام و نام خانوادگی"
              value={f.name}
              on={(v) => setF({ ...f, name: v })}
            />
            <Field
              label="ایمیل یا شماره تماس"
              value={f.mail}
              on={(v) => setF({ ...f, mail: v })}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-black text-fg">
              متن پیام
            </label>
            <textarea
              value={f.msg}
              onChange={(e) => setF({ ...f, msg: e.target.value })}
              rows={6}
              className="w-full resize-none rounded-2xl border border-line bg-ink p-4 text-[12.5px] leading-6 outline-none transition placeholder:text-fg-mute focus:border-pk/60"
              placeholder="پیام خود را بنویسید..."
            />
          </div>
          <button className="w-full rounded-2xl bg-pk py-3.5 text-[13.5px] font-black text-white transition hover:bg-pk-dark">
            ارسال پیام
          </button>
        </form>

        <div className="space-y-3">
          {[
            { Icon: Phone, t: "تلفن پشتیبانی", v: "۰۹۱۶ ۷۹۷ ۱۸۸۶", href: "tel:09167971886" },
            { Icon: Sms, t: "ایمیل", v: "support@parskalas.com", href: "mailto:support@parskalas.com" },
            { Icon: Support, t: "ساعات پاسخگویی", v: "هر روز، ۲۴ ساعته" },
          ].map((c) => (
            <div
              key={c.t}
              className="flex items-center gap-3 rounded-3xl border border-line bg-surface p-4"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-pk/10 text-pk ring-1 ring-pk/20">
                <c.Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[11.5px] text-fg-mute">{c.t}</span>
                <span className="num block truncate text-[13px] font-black text-fg">
                  {c.href ? (
                    <a href={c.href} className="hover:text-pk">
                      {c.v}
                    </a>
                  ) : (
                    c.v
                  )}
                </span>
              </span>
            </div>
          ))}
          <div className="overflow-hidden rounded-3xl border border-line bg-surface">
            <div className="pk-grid grid h-44 place-items-center bg-gradient-to-br from-surface-2 to-ink text-center">
              <div>
                <Lifebuoy className="mx-auto mb-2 h-9 w-9 text-pk" />
                <p className="text-[12.5px] font-black text-fg">دفتر مرکزی پارس کالا</p>
                <p className="mt-1 text-[11px] text-fg-mute">
                  تهران، خیابان ولیعصر، پاساژ پارس کالا
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  on,
}: {
  label: string;
  value: string;
  on: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[12px] font-black text-fg">{label}</label>
      <input
        value={value}
        onChange={(e) => on(e.target.value)}
        className="h-12 w-full rounded-2xl border border-line bg-ink px-4 text-[12.5px] outline-none transition focus:border-pk/60"
      />
    </div>
  );
}

function PageHead({
  Icon,
  title,
  sub,
}: {
  Icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3 rounded-3xl border border-line bg-surface p-5">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-pk/12 text-pk ring-1 ring-pk/25">
        {Icon}
      </span>
      <div>
        <h1 className="text-lg font-black text-white">{title}</h1>
        <p className="mt-0.5 text-[11.5px] text-fg-mute">{sub}</p>
      </div>
    </div>
  );
}
