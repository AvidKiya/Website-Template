/**
 * Central media helper. Replacing the CDN / asset source only requires
 * changing this file — components always consume `img(id)`.
 */
export function img(id: number, width = 1000): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

export const MEDIA = {
  apparel: [18533669, 38652629, 38652616, 4458521, 38652623, 38652624, 33970684, 2364580],
  footwear: [27256462, 2364580, 12185075, 38652629],
  watches: [8839887, 15210883, 16958879, 28977357, 13273982, 179908],
  bags: [12185075, 33970684, 8372217],
  beauty: [24602077, 35976902, 4841525, 19117855, 5113052, 4354698, 4354693],
  digital: [3394650, 3394653, 20140155],
  editorial: [28863302, 23911182, 15051712, 8342914, 30713507, 33681519, 6827577],
} as const;
