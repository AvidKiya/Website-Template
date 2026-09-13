"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useStore } from "@/store/store-provider";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [code, setCode] = useState("");
  const { toast } = useStore();

  return (
    <div className="container-x pb-16">
      <Breadcrumb items={[{ title: "ورود | ثبت‌نام" }]} />
      <div className="mx-auto max-w-[400px] rounded-[16px] border border-[#e8e8e8] bg-white p-6">
        <h1 className="text-[16px] font-bold text-[#202020]">ورود یا ثبت‌نام</h1>
        <p className="mt-1.5 text-[12.5px] leading-7 text-[#888]">
          برای ادامه، شماره موبایل خود را وارد کنید. کد تایید از طریق پیامک ارسال می‌شود.
        </p>

        <form
          className="mt-5 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (step === "phone") {
              if (phone.trim().length < 10) return;
              setStep("code");
              toast("کد تایید ارسال شد (نسخه نمایشی)", "info");
            } else {
              toast("ورود در نسخه نمایشی فعال نیست", "info");
            }
          }}
        >
          {step === "phone" ? (
            <Input
              label="شماره موبایل"
              inputMode="tel"
              placeholder="۰۹xxxxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          ) : (
            <Input
              label="کد تایید پنج رقمی"
              inputMode="numeric"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              hint={`کد به شماره ${phone} ارسال شد`}
              required
            />
          )}
          <Button type="submit" size="lg" fullWidth>
            {step === "phone" ? "دریافت کد تایید" : "ورود به حساب"}
          </Button>
        </form>

        <p className="mt-4 flex items-start gap-1.5 text-[11px] leading-6 text-[#999]">
          <ShieldCheck size={14} className="mt-1 shrink-0" />
          ورود شما به معنای پذیرش شرایط استفاده و سیاست حریم خصوصی فروشگاه است.
        </p>
      </div>
    </div>
  );
}
