import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[55vh] flex-col items-center justify-center gap-3 text-center">
      <span className="num text-[56px] font-black leading-none text-[#ececec]">۴۰۴</span>
      <h1 className="text-[16px] font-bold text-[#202020]">صفحه مورد نظر پیدا نشد</h1>
      <p className="max-w-sm text-[12.5px] leading-7 text-[#888]">
        ممکن است این کالا حذف شده یا نشانی صفحه تغییر کرده باشد. از طریق دکمه زیر به فروشگاه
        بازگردید.
      </p>
      <div className="mt-2 flex gap-2">
        <ButtonLink href="/">صفحه اصلی</ButtonLink>
        <ButtonLink href="/category/all" variant="outline">
          همه محصولات
        </ButtonLink>
      </div>
    </div>
  );
}
