import { Truck, RotateCcw, ShieldCheck, CreditCard } from "lucide-react";

const items = [
  {
    icon: Truck,
    title: "پرداخت در محل",
    desc: "برای بسیاری از کالاها",
  },
  {
    icon: RotateCcw,
    title: "۷ روز ضمانت بازگشت کالا",
    desc: "شرایط بازگشت کالا",
  },
  {
    icon: ShieldCheck,
    title: "ضمانت اصل بودن کالا",
    desc: "تضمین بهترین قیمت",
  },
  {
    icon: CreditCard,
    title: "فروش اقساطی",
    desc: "بدون ضامن و چک",
  },
];

export default function TrustBadges() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white p-6 shadow-sm sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-right">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
              <item.icon size={22} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-700 sm:text-sm">{item.title}</h4>
              <p className="text-[10px] text-gray-400 sm:text-xs">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
