import { useState } from "react";
import { Send } from "lucide-react";

export default function Newsletter() {
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim().length >= 10) {
      setSent(true);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-gray-900 via-gray-800 to-gray-900 px-6 py-10 text-center text-white">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-red-600/20 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />
        <h3 className="relative text-lg font-extrabold sm:text-2xl">پاسخگوی شما هستیم</h3>
        <p className="relative mx-auto mt-2 max-w-md text-xs text-gray-300 sm:text-sm">
          شماره همراه خود را وارد کنید تا آخرین تخفیفات سایت در لحظه پیامک شود.
        </p>
        <form
          onSubmit={submit}
          className="relative mx-auto mt-5 flex max-w-md flex-col gap-2 sm:flex-row"
        >
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="شماره موبایل خود را وارد نمایید"
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-center text-sm text-white placeholder:text-gray-400 outline-none focus:border-red-400"
            dir="ltr"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold transition hover:bg-red-700"
          >
            <Send size={16} />
            ثبت‌نام
          </button>
        </form>
        {sent ? (
          <p className="relative mt-3 text-xs text-emerald-400">
            با تشکر، شماره شما با موفقیت ثبت شد.
          </p>
        ) : null}
      </div>
    </div>
  );
}
