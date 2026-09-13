export const fa = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

export const money = (n: number) => fa(n.toLocaleString("en-US"));

export const cn = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export const px = (id: number, s = 640) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${s}&h=${s}&fit=crop`;

export const pad = (n: number) => fa(String(n).padStart(2, "0"));

export function useNow(ms = 1000) {
  return ms;
}
