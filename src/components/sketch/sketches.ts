/**
 * Line illustrations in the hand-drawn style of Rbma's printed menu.
 * Every sketch lives in a 200×200 box and is drawn with strokes only,
 * so it can animate in by stroke length and take any colour.
 */

export type Shape =
  | { t: "path"; d: string }
  | { t: "ellipse"; cx: number; cy: number; rx: number; ry: number; r?: number }
  | { t: "rect"; x: number; y: number; w: number; h: number; rx?: number; r?: number }
  | { t: "circle"; cx: number; cy: number; r: number };

const bean = (cx: number, cy: number, rot: number, s = 1): Shape[] => [
  { t: "ellipse", cx, cy, rx: 13 * s, ry: 19 * s, r: rot },
  { t: "path", d: `M${cx} ${cy - 17 * s}c${7 * s} ${9 * s} ${-7 * s} ${25 * s} 0 ${34 * s}` },
];

export const sketches = {
  cup: [
    { t: "ellipse", cx: 100, cy: 162, rx: 72, ry: 13 },
    { t: "path", d: "M50 160c18 7 82 7 100 0" },
    { t: "path", d: "M48 92h104c0 40-20 66-52 66S48 132 48 92z" },
    { t: "ellipse", cx: 100, cy: 92, rx: 52, ry: 9 },
    { t: "path", d: "M151 102c24-6 32 20 10 32-6 3-12 5-18 5" },
    { t: "path", d: "M84 72c-9-10 9-16 0-28M100 66c-9-10 9-16 0-28M116 72c-9-10 9-16 0-28" },
  ],
  latte: [
    { t: "path", d: "M70 38l7 114a8 8 0 0 0 8 8h30a8 8 0 0 0 8-8l7-114" },
    { t: "path", d: "M66 38h68" },
    { t: "path", d: "M73 70c18 5 36-5 54 0M75 104c16 4 34-4 50 0" },
    { t: "path", d: "M130 66c28 2 28 54-3 58" },
    { t: "path", d: "M93 160v12M107 160v12" },
    { t: "ellipse", cx: 100, cy: 176, rx: 26, ry: 5 },
    { t: "path", d: "M92 28c-6-8 6-12 0-20M108 28c-6-8 6-12 0-20" },
  ],
  mojito: [
    { t: "path", d: "M60 44l12 124h56l12-124" },
    { t: "path", d: "M56 44h88" },
    { t: "path", d: "M64 78h72" },
    { t: "rect", x: 76, y: 96, w: 22, h: 22, rx: 3, r: -12 },
    { t: "rect", x: 102, y: 120, w: 20, h: 20, rx: 3, r: 10 },
    { t: "rect", x: 80, y: 136, w: 18, h: 18, rx: 3, r: 4 },
    { t: "path", d: "M112 160L140 14h14" },
    { t: "path", d: "M44 44a20 20 0 0 1 40 0" },
    { t: "path", d: "M64 44V26M64 44l-12-12M64 44l12-12" },
    { t: "path", d: "M98 70c-14-18 6-30 18-22-2 12-8 20-18 22zM98 70c4-8 9-14 14-18" },
  ],
  blender: [
    { t: "rect", x: 60, y: 18, w: 80, h: 12, rx: 4 },
    { t: "path", d: "M64 30h72l-10 98H74z" },
    { t: "path", d: "M134 46c24 0 24 52-6 58" },
    { t: "path", d: "M70 128h60l9 36H61z" },
    { t: "circle", cx: 100, cy: 148, r: 5 },
    { t: "path", d: "M86 120l14-7 14 7" },
    { t: "path", d: "M72 74c14-10 40 10 56 0M76 96c12-6 34 6 48 0" },
    { t: "path", d: "M46 60c-6 4-8 10-4 14M154 40c6 2 8 8 6 12M40 100l-8 2M38 116c-6 0-8 4-6 8" },
  ],
  jar: [
    { t: "path", d: "M58 62h84v94a12 12 0 0 1-12 12H70a12 12 0 0 1-12-12z" },
    { t: "rect", x: 64, y: 48, w: 72, h: 14, rx: 3 },
    { t: "path", d: "M78 48v-8h44v8" },
    { t: "circle", cx: 100, cy: 31, r: 8 },
    { t: "rect", x: 70, y: 128, w: 24, h: 24, rx: 3, r: -8 },
    { t: "rect", x: 100, y: 132, w: 24, h: 24, rx: 3, r: 6 },
    { t: "rect", x: 84, y: 102, w: 24, h: 24, rx: 3, r: 14 },
    { t: "rect", x: 110, y: 96, w: 22, h: 22, rx: 3, r: -10 },
    { t: "path", d: "M70 76v40" },
  ],
  kanaka: [
    { t: "path", d: "M66 72l-12 80a10 10 0 0 0 10 10h56a10 10 0 0 0 10-10l-12-80z" },
    { t: "path", d: "M58 70c28-10 56-10 84 0" },
    { t: "path", d: "M132 86l56-40" },
    { t: "path", d: "M182 50l10-8" },
    { t: "path", d: "M70 112c20 6 40-6 60 0" },
    { t: "circle", cx: 86, cy: 64, r: 3 },
    { t: "circle", cx: 100, cy: 60, r: 4 },
    { t: "circle", cx: 113, cy: 64, r: 3 },
    { t: "path", d: "M92 48c-6-8 6-12 0-20M108 48c-6-8 6-12 0-20" },
  ],
  beans: [...bean(70, 96, -25), ...bean(118, 92, 20), ...bean(96, 140, 70, 0.8)],
  heart: [{ t: "path", d: "M100 160c-40-28-62-50-62-76 0-18 14-30 30-30 14 0 26 8 32 22 6-14 18-22 32-22 16 0 30 12 30 30 0 26-22 48-62 76z" }],
} satisfies Record<string, Shape[]>;

export type SketchName = keyof typeof sketches;
