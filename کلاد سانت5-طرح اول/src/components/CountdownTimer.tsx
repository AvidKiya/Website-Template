import { useEffect, useState } from "react";

function toFa(n: number) {
  return n.toLocaleString("fa-IR", { minimumIntegerDigits: 2 });
}

export default function CountdownTimer() {
  const [seconds, setSeconds] = useState(6 * 3600 + 24 * 60 + 12);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const Box = ({ value }: { value: number }) => (
    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/20 text-sm font-bold">
      {toFa(value)}
    </span>
  );

  return (
    <div className="flex items-center gap-1 text-white" dir="ltr">
      <Box value={s} />
      <span>:</span>
      <Box value={m} />
      <span>:</span>
      <Box value={h} />
    </div>
  );
}
