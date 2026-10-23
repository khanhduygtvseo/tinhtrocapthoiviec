// Thư viện vẽ minh họa vector (bảng màu đỏ rượu + vàng đồng)
const C = {
  w1: '#3A0A18', w2: '#561224', w3: '#7A1B34', w4: '#9B2A47', rose: '#C25A74', blush: '#EBC9C0',
  cream: '#F7EFE2', sand: '#E6D3B8', gold: '#E0A526', gold2: '#F3C95C', copper: '#C4702A', brown: '#8A4420',
  ink: '#1F1015', white: '#FFFFFF',
};

let seed = 7;
const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const setSeed = (n) => { seed = n; };

const svg = (w, h, inner, bg) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs>
<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.16 0"/></filter>
<filter id="sh" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="14" stdDeviation="13" flood-color="#1b0509" flood-opacity=".38"/></filter>
<filter id="sh2" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#1b0509" flood-opacity=".28"/></filter>
<radialGradient id="glow"><stop offset="0" stop-color="#F3C95C" stop-opacity=".75"/><stop offset="1" stop-color="#E0A526" stop-opacity="0"/></radialGradient>
<linearGradient id="gGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F3C95C"/><stop offset="1" stop-color="#C4702A"/></linearGradient>
<linearGradient id="gWine" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9B2A47"/><stop offset="1" stop-color="#561224"/></linearGradient>
</defs>
${bg || ''}${inner}
<rect width="${w}" height="${h}" filter="url(#grain)" opacity=".9"/>
</svg>`;

const rect = (x, y, w, h, fill, o = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${o}/>`;
const rr = (x, y, w, h, r, fill, o = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${o}/>`;
const circ = (cx, cy, r, fill, o = '') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${o}/>`;
const line = (x1, y1, x2, y2, stroke, sw, o = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" ${o}/>`;
const path = (d, fill, o = '') => `<path d="${d}" fill="${fill}" ${o}/>`;
const stroke = (d, col, sw, o = '') => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" ${o}/>`;
const g = (t, inner) => `<g transform="${t}">${inner}</g>`;
const bgLinear = (w, h, a, b, ang = 'diag') => {
  const xy = ang === 'v' ? 'x1="0" y1="0" x2="0" y2="1"' : 'x1="0" y1="0" x2="1" y2="1"';
  return `<defs><linearGradient id="bg" ${xy}><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#bg)"/>`;
};

// dãy cửa sổ
function windows(x, y, w, h, cols, rows, col, lit = 0.5, litCol = C.gold2) {
  let s = '';
  const gx = w / cols, gy = h / rows;
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
    const on = rnd() < lit;
    s += rr(x + i * gx + gx * 0.2, y + j * gy + gy * 0.22, gx * 0.6, gy * 0.5, 2, on ? litCol : col, on ? 'opacity=".85"' : 'opacity=".55"');
  }
  return s;
}
// tòa nhà
function building(x, base, w, h, fill, winCol, lit, cols, rows, topStyle = 0) {
  let s = rect(x, base - h, w, h, fill);
  if (topStyle === 1) s += rect(x + w * 0.35, base - h - 26, w * 0.3, 26, fill);
  if (topStyle === 2) s += rect(x + w * 0.46, base - h - 50, 6, 50, fill) + circ(x + w * 0.46 + 3, base - h - 52, 4, C.gold);
  if (topStyle === 3) s += path(`M${x} ${base - h} L${x + w / 2} ${base - h - 30} L${x + w} ${base - h}Z`, fill);
  s += windows(x + 8, base - h + 14, w - 16, h - 28, cols, rows, winCol, lit);
  return s;
}
function skyline(x0, x1, base, hMin, hMax, fill, winCol, lit) {
  let s = '', x = x0;
  while (x < x1) {
    const w = 46 + Math.floor(rnd() * 60), h = hMin + Math.floor(rnd() * (hMax - hMin));
    const cols = Math.max(2, Math.floor(w / 18)), rows = Math.max(3, Math.floor(h / 26));
    s += building(x, base, w, h, fill, winCol, lit, cols, rows, Math.floor(rnd() * 4));
    x += w + 6 + Math.floor(rnd() * 14);
  }
  return s;
}
// thẻ việc làm
function jobCard(x, y, w, rot, accent, mark) {
  const h = 118;
  return g(`translate(${x} ${y}) rotate(${rot})`,
    rr(0, 0, w, h, 20, C.cream, 'filter="url(#sh)"') +
    circ(48, h / 2, 28, accent) + mark(48, h / 2) +
    rr(92, 30, w * 0.46, 15, 7, C.ink, 'opacity=".78"') +
    rr(92, 56, w * 0.32, 11, 5, C.ink, 'opacity=".28"') +
    rr(92, 80, 62, 20, 10, C.gold, 'opacity=".9"') + rr(162, 80, 48, 20, 10, C.w3, 'opacity=".25"') +
    circ(w - 40, h / 2, 17, 'none', `stroke="${C.w3}" stroke-width="5"`) + stroke(`M${w - 48} ${h / 2} l6 7 l12 -14`, C.w3, 5));
}
const glyphBag = (cx, cy) => rr(cx - 14, cy - 8, 28, 20, 4, C.cream) + stroke(`M${cx - 6} ${cy - 8} v-5 h12 v5`, C.cream, 3.5);
const glyphStar = (cx, cy) => path(`M${cx} ${cy - 15} l4.5 9.5 10.5 1.4 -7.7 7.2 2 10.4 -9.3 -5.1 -9.3 5.1 2 -10.4 -7.7 -7.2 10.5 -1.4z`, C.cream);
const glyphPin = (cx, cy) => path(`M${cx} ${cy + 15} c-12 -11 -14 -16 -14 -21 a14 14 0 0 1 28 0 c0 5 -2 10 -14 21z`, C.cream) + circ(cx, cy - 6, 5, C.w3);

function magnifier(cx, cy, r, tilt = 45) {
  return g(`rotate(${tilt} ${cx} ${cy})`,
    rr(cx - 11, cy + r - 6, 22, 130, 11, `url(#gGold)`, 'filter="url(#sh2)"') +
    circ(cx, cy, r, 'rgba(247,239,226,.14)', `stroke="url(#gGold)" stroke-width="22" filter="url(#sh2)"`) +
    stroke(`M${cx - r * 0.55} ${cy - r * 0.2} a${r * 0.6} ${r * 0.6} 0 0 1 ${r * 0.35} -${r * 0.4}`, C.cream, 8, 'opacity=".7"'));
}
function pin(x, y, s, col) {
  return g(`translate(${x} ${y}) scale(${s})`, path('M0 0 c-30 -28 -34 -44 -34 -58 a34 34 0 0 1 68 0 c0 14 -4 30 -34 58z', col, 'filter="url(#sh2)"') + circ(0, -58, 12, C.w1));
}
function coin(x, y, r, label) {
  return circ(x, y, r, 'url(#gGold)', 'filter="url(#sh2)"') + circ(x, y, r * 0.74, 'none', `stroke="${C.brown}" stroke-width="3" opacity=".55"`) +
    (label ? `<text x="${x}" y="${y + r * 0.28}" text-anchor="middle" font-family="Segoe UI, Arial" font-weight="800" font-size="${r * 0.8}" fill="${C.brown}">${label}</text>` : stroke(`M${x - r * 0.25} ${y - r * 0.35} v${r * 0.7}`, C.brown, 5, 'opacity=".7"'));
}
function dots(x, y, cols, rows, gap, r, col, op = 0.5) {
  let s = '';
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) s += circ(x + i * gap, y + j * gap, r, col, `opacity="${op}"`);
  return s;
}

module.exports = { C, svg, rect, rr, circ, line, path, stroke, g, bgLinear, windows, building, skyline, jobCard, glyphBag, glyphStar, glyphPin, magnifier, pin, coin, dots, rnd, setSeed };
