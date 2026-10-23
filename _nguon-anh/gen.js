// Sinh SVG nguồn. Chạy: node gen.js  (sau đó render-png.ps1)
const fs = require('fs');
const path = require('path');
const B = require('./scenes-banner.js');
const S = require('./scenes-small.js');
const B2 = require('./scenes-blog2.js');
const RECOLOR = {
  '#3A0A18': '#0E1550', '#7A1B34': '#2F4BC0', '#561224': '#1D2780', '#9B2A47': '#4468D8', '#C25A74': '#7E9BF2',
  '#4C1224': '#17206E', '#66182E': '#1E2A8C', '#5A162B': '#1B267E', '#451021': '#141C66', '#4A1022': '#151D68',
  '#2E0813': '#0B1040', '#4A0F20': '#121A62', '#2A0B15': '#0D1345', '#6B1830': '#25339A', '#8A3A1E': '#2A55B8',
  '#F7EFE2': '#F4F7FF', '#E6D3B8': '#D5DEF5', '#1F1015': '#0F1535', '#1B0509': '#070B2E',
  '#E0A526': '#F5A623', '#F3C95C': '#FFC857', '#C4702A': '#E8832A',
};
const recolor = (s) => s.replace(/#[0-9A-Fa-f]{6}\b/g, (h) => RECOLOR[h.toUpperCase()] || h);const out = path.join(__dirname, 'svg');
fs.mkdirSync(out, { recursive: true });
const jobs = {
  'banner-1': B.banner1, 'banner-2': B.banner2, 'banner-3': B.banner3, 'banner-gioi-thieu': B.bannerAbout,
  ...B2.blog, ...S.region, ...S.icon,
};
const list = [];
for (const [name, fn] of Object.entries(jobs)) {
  const s = recolor(fn());
  fs.writeFileSync(path.join(out, name + '.svg'), s);
  const m = s.match(/width="(\d+)" height="(\d+)"/);
  list.push(`${name}|${m[1]}|${m[2]}`);
}
fs.writeFileSync(path.join(__dirname, 'list.txt'), list.join('\n'));
console.log(list.length + ' file SVG');


