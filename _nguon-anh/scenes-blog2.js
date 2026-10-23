const L = require('./lib.js');
const { C, svg, rect, rr, circ, line, path, stroke, g, bgLinear, coin, dots } = L;
const W = 800, H = 500;
const txt = (x, y, t, size, fill, anchor = 'middle', wt = 800) => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Segoe UI, Arial" font-weight="${wt}" font-size="${size}" fill="${fill}">${t}</text>`;

const blog = {
  // Phân biệt các loại trợ cấp: 3 thẻ
  'blog-phan-biet-tro-cap': () => {
    let s = circ(400, 240, 300, 'url(#glow)');
    const cards = [[110, 90, -5, C.w3, '½'], [290, 70, 0, C.gold, '1'], [470, 90, 5, C.copper, '%']];
    cards.forEach(([x, y, r, col, t]) => {
      s += g(`translate(${x} ${y}) rotate(${r} 110 170)`, rr(0, 0, 220, 340, 20, C.cream, 'filter="url(#sh)"') + rr(0, 0, 220, 96, 20, col) + rect(0, 70, 220, 26, col) +
        txt(110, 72, t, 56, t === '1' ? C.w1 : C.cream) + rr(28, 130, 140, 14, 7, C.ink, 'opacity=".7"') + rr(28, 160, 100, 11, 5, C.ink, 'opacity=".25"') +
        rr(28, 200, 164, 11, 5, C.ink, 'opacity=".2"') + rr(28, 224, 150, 11, 5, C.ink, 'opacity=".2"') + rr(28, 248, 120, 11, 5, C.ink, 'opacity=".2"') +
        rr(28, 290, 70, 26, 13, col, 'opacity=".9"'));
    });
    return svg(W, H, s, bgLinear(W, H, C.w1, C.w3));
  },
  // Thời gian làm việc để tính trợ cấp: thanh thời gian
  'blog-thoi-gian-lam-viec': () => {
    let s = circ(600, 120, 260, 'url(#glow)');
    s += g('translate(70 150)', rr(0, 0, 660, 200, 24, C.cream, 'filter="url(#sh)"'));
    s += rr(110, 230, 580, 44, 22, C.sand);
    s += rr(110, 230, 250, 44, 22, C.w3) + rr(360, 230, 150, 44, 0, C.gold) + rr(480, 230, 30, 44, 22, C.gold);
    s += rect(360, 230, 30, 44, C.gold);
    for (let i = 0; i <= 12; i++) s += line(110 + i * (580 / 12), 290, 110 + i * (580 / 12), i % 4 === 0 ? 312 : 300, C.ink, 3, 'opacity=".4"');
    s += rr(110, 190, 250, 14, 7, C.w3, 'opacity=".35"') + rr(360, 190, 150, 14, 7, C.gold, 'opacity=".55"');
    s += pinMark(235, 168, C.w3) + pinMark(435, 168, C.copper);
    s += rr(110, 332, 160, 12, 6, C.ink, 'opacity=".3"') + rr(110, 354, 110, 12, 6, C.ink, 'opacity=".18"');
    s += path('M70 120 h60', 'none', `stroke="${C.gold2}" stroke-width="5" stroke-linecap="round"`);
    return svg(W, H, s, bgLinear(W, H, '#8A3A1E', '#4A0F20'));
  },
  // Tiền lương 6 tháng liền kề: 6 cột + đường bình quân
  'blog-tien-luong-can-cu': () => {
    let s = circ(180, 150, 260, 'url(#glow)');
    s += rr(70, 70, 660, 360, 26, C.cream, 'filter="url(#sh)"');
    const hs = [150, 170, 160, 190, 175, 185];
    hs.forEach((h, i) => { s += rr(120 + i * 92, 380 - h, 60, h, 12, i === 5 ? C.gold : C.w3, i === 5 ? '' : `opacity="${0.55 + i * 0.07}"`); s += rr(128 + i * 92, 392, 44, 9, 4, C.ink, 'opacity=".3"'); });
    s += line(100, 262, 700, 262, C.copper, 5, 'stroke-dasharray="3 14"');
    s += g('translate(640 262)', circ(0, 0, 40, C.w3) + txt(0, 13, '&#8960;', 38, C.cream, 'middle', 700));
    s += coin(690, 120, 40);
    return svg(W, H, s, bgLinear(W, H, C.w2, '#2E0813'));
  },
  // Các khoản nhận khi nghỉ việc: ví + phong bì + checklist
  'blog-khoan-tien-khi-nghi-viec': () => {
    let s = circ(600, 330, 280, 'url(#glow)');
    s += g('translate(120 120) rotate(-4)', rr(0, 0, 300, 330, 20, C.cream, 'filter="url(#sh)"') + [0, 1, 2, 3].map((i) => rr(30, 40 + i * 70, 34, 34, 9, i < 3 ? C.w3 : 'none', i < 3 ? '' : `stroke="${C.w3}" stroke-width="5"`) + (i < 3 ? stroke(`M37 ${57 + i * 70} l8 8 l13 -16`, C.cream, 6) : '') + rr(84, 44 + i * 70, 170, 13, 6, C.ink, 'opacity=".7"') + rr(84, 68 + i * 70, 120, 10, 5, C.ink, 'opacity=".25"')).join(''));
    s += g('translate(430 210) rotate(5)', rr(0, 40, 270, 190, 26, C.copper, 'filter="url(#sh)"') + rr(0, 20, 270, 60, 22, C.brown) + rr(190, 100, 80, 56, 16, C.gold) + circ(220, 128, 10, C.brown));
    s += coin(560, 150, 46) + coin(630, 120, 46);
    return svg(W, H, s, bgLinear(W, H, C.w1, C.w3));
  },
  // Mất việc do thay đổi cơ cấu: sơ đồ tổ chức
  'blog-mat-viec-co-cau': () => {
    let s = circ(400, 200, 300, 'url(#glow)');
    const box = (x, y, w, col, op = 1, dash = false) => rr(x, y, w, 70, 16, dash ? 'none' : col, `opacity="${op}" ${dash ? `stroke="${C.cream}" stroke-width="4" stroke-dasharray="10 9"` : ''} filter="url(#sh2)"`) + (dash ? '' : circ(x + 36, y + 35, 14, C.cream, 'opacity=".9"') + rr(x + 62, y + 24, w - 90, 12, 6, C.cream, 'opacity=".85"') + rr(x + 62, y + 44, w - 120, 10, 5, C.cream, 'opacity=".4"'));
    s += stroke('M400 150 V190 M400 190 H200 V230 M400 190 H600 V230 M200 300 V340 M600 300 V340', C.gold2, 5, 'opacity=".85"');
    s += box(290, 80, 220, C.w4) + box(90, 230, 220, C.w3) + box(490, 230, 220, C.w3, 1);
    s += box(90, 340, 220, C.w3) + box(490, 340, 220, C.w3, 1, true);
    s += g('translate(400 400)', circ(0, 0, 54, C.gold, 'filter="url(#sh)"') + stroke('M-22 0 h38 M2 -18 l18 18 l-18 18', C.w1, 9));
    return svg(W, H, s, bgLinear(W, H, '#2E0813', C.w3));
  },
  // Chấm dứt hợp đồng: văn bản + mũi tên ra cửa
  'blog-cham-dut-hop-dong': () => {
    let s = circ(250, 250, 280, 'url(#glow)');
    s += g('translate(100 60) rotate(-3)', rr(0, 0, 330, 390, 18, C.cream, 'filter="url(#sh)"') + rr(30, 34, 130, 16, 8, C.w3) + [0, 1, 2, 3, 4].map((i) => rr(30, 84 + i * 30, i % 3 === 2 ? 190 : 270, 10, 5, C.ink, 'opacity=".45"')).join('') +
      stroke('M30 290 q24 -34 44 -4 t44 0', C.w3, 6) + path('M0 340 L330 310 L330 390 L0 390Z', C.sand) + stroke('M0 340 L330 310', C.copper, 4, 'stroke-dasharray="3 12"'));
    s += g('translate(470 100)', rr(0, 0, 200, 300, 14, C.w1, 'filter="url(#sh)"') + path('M20 20 h160 v260 h-160z', C.copper) + path('M20 20 l70 -8 v296 l-70 -8z', C.brown) + circ(78, 150, 8, C.gold2));
    s += g('translate(400 240)', circ(0, 0, 50, C.gold, 'filter="url(#sh)"') + stroke('M-20 0 h36 M2 -17 l17 17 l-17 17', C.w1, 9));
    return svg(W, H, s, bgLinear(W, H, '#4A0F20', '#8A3A1E'));
  },
};
function pinMark(x, y, col) { return path(`M${x} ${y + 26} c-16 -14 -20 -22 -20 -30 a20 20 0 0 1 40 0 c0 8 -4 16 -20 30z`, col, 'filter="url(#sh2)"') + circ(x, y - 4, 7, C.cream); }
module.exports = { blog };
