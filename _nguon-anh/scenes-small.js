const L = require('./lib.js');
const { C, svg, rect, rr, circ, line, path, stroke, g, bgLinear, skyline, coin, dots, rnd, setSeed } = L;

const paper = (x, y, w, h, rot = 0) => g(`translate(${x} ${y}) rotate(${rot})`, rr(0, 0, w, h, 14, C.cream, 'filter="url(#sh)"'));
const lines = (x, y, n, w, gap = 24, col = C.ink, op = 0.5) => Array.from({ length: n }, (_, i) => rr(x, y + i * gap, i % 3 === 2 ? w * 0.62 : w, 10, 5, col, `opacity="${op}"`)).join('');
const W = 800, H = 500;

// ---- 6 ảnh bìa blog (800x500) ----
const blog = {
  'blog-hop-dong': () => {
    let s = circ(600, 140, 240, 'url(#glow)');
    s += paper(210, 70, 330, 390, -4) + g('translate(210 70) rotate(-4)', rr(34, 34, 140, 18, 9, C.w3) + lines(34, 86, 6, 262, 28) + stroke('M34 320 q22 -40 40 -4 t42 -2 t36 -6', C.w3, 6) + line(34, 344, 200, 344, C.ink, 3, 'opacity=".35"'));
    s += g('translate(480 300) rotate(30)', rr(0, 0, 26, 190, 13, C.gold, 'filter="url(#sh2)"') + path('M0 190 h26 l-13 34z', C.brown) + rr(0, 0, 26, 30, 13, C.copper));
    s += circ(520, 120, 58, 'none', `stroke="${C.gold}" stroke-width="8"`) + circ(520, 120, 40, C.w3) + stroke('M502 120 l12 12 l24 -26', C.cream, 8);
    return svg(W, H, s, bgLinear(W, H, C.w1, C.w3));
  },
  'blog-thu-viec': () => {
    let s = circ(250, 380, 260, 'url(#glow)');
    s += paper(150, 70, 360, 370, 3);
    s += g('translate(150 70) rotate(3)', rr(0, 0, 360, 84, 14, C.w3) + rr(30, 24, 120, 14, 7, C.cream, 'opacity=".9"') + rr(30, 48, 80, 10, 5, C.gold, 'opacity=".9"') +
      Array.from({ length: 5 }, (_, r) => Array.from({ length: 7 }, (_, c) => { const d = r * 7 + c; return rr(24 + c * 45, 112 + r * 50, 36, 38, 9, d >= 8 && d <= 23 ? C.gold : C.sand, d >= 8 && d <= 23 ? 'opacity=".95"' : ''); }).join('')).join(''));
    s += g('translate(580 300)', path('M-60 -90 h120 l-12 70 a50 50 0 0 1 -48 0z M-60 90 h120 l-12 -70 a50 50 0 0 0 -48 0z', C.cream, 'filter="url(#sh)"') + rect(-72, -100, 144, 14, C.gold) + rect(-72, 88, 144, 14, C.gold) + path('M-30 80 h60 l-10 -26 h-40z', C.copper));
    return svg(W, H, s, bgLinear(W, H, '#8A3A1E', '#4A0F20'));
  },
  'blog-bang-luong': () => {
    let s = circ(620, 120, 220, 'url(#glow)');
    s += paper(120, 60, 400, 380, -3) + g('translate(120 60) rotate(-3)', rr(0, 0, 400, 70, 14, C.w3) + rr(28, 26, 150, 16, 8, C.cream, 'opacity=".9"') +
      [0, 1, 2, 3, 4].map((i) => rr(24, 96 + i * 50, 352, 38, 8, i % 2 ? C.sand : 'rgba(0,0,0,0)') + rr(40, 108 + i * 50, 150, 12, 6, C.ink, 'opacity=".55"') + rr(260, 108 + i * 50, 100, 12, 6, i === 4 ? C.w3 : C.ink, `opacity="${i === 4 ? 0.9 : 0.4}"`)).join(''));
    s += coin(600, 340, 62) + coin(680, 300, 62) + coin(640, 410, 62);
    s += g('translate(520 150) rotate(-12)', rr(0, 0, 210, 100, 10, C.gold2, 'filter="url(#sh2)"') + circ(105, 50, 28, 'none', `stroke="${C.brown}" stroke-width="5" opacity=".6"`) + rr(14, 14, 36, 8, 4, C.brown, 'opacity=".5"') + rr(160, 78, 36, 8, 4, C.brown, 'opacity=".5"'));
    return svg(W, H, s, bgLinear(W, H, C.w2, '#2E0813'));
  },
  'blog-lam-them-gio': () => {
    let s = circ(400, 250, 300, 'url(#glow)');
    s += g('translate(400 250)', circ(0, 0, 170, C.cream, 'filter="url(#sh)"') + circ(0, 0, 170, 'none', `stroke="${C.w3}" stroke-width="16"`) + path('M0 -150 A150 150 0 0 1 0 150Z', C.w2) +
      Array.from({ length: 12 }, (_, i) => line(0, -146, 0, i % 3 === 0 ? -122 : -134, i < 6 ? C.w3 : C.cream, 4).replace('<line', `<line transform="rotate(${i * 30})"`)).join('') +
      stroke('M0 0 L0 -96', C.gold, 12) + stroke('M0 0 L70 40', C.gold, 12) + circ(0, 0, 14, C.gold) +
      path('M-80 -50 a30 30 0 1 0 36 36 a24 24 0 1 1 -36 -36z', C.gold2));
    [['150%', 90, 70, C.gold], ['200%', 640, 120, C.copper], ['300%', 620, 380, C.rose]].forEach(([t, x, y, c], i) => {
      s += g(`translate(${x} ${y}) rotate(${i % 2 ? 6 : -6})`, rr(-62, -30, 124, 60, 30, c, 'filter="url(#sh2)"') + `<text x="0" y="12" text-anchor="middle" font-family="Segoe UI, Arial" font-weight="800" font-size="32" fill="${i === 0 ? C.w1 : C.white}">${t}</text>`);
    });
    return svg(W, H, s, bgLinear(W, H, C.w1, '#6B1830'));
  },
  'blog-noi-quy': () => {
    let s = circ(180, 120, 240, 'url(#glow)');
    s += g('translate(250 40) rotate(2)', rr(0, 0, 340, 430, 20, C.w1, 'filter="url(#sh)"') + rr(14, 24, 312, 392, 12, C.cream) + rr(110, -14, 120, 48, 14, C.gold) + circ(170, 10, 9, C.w1) +
      [0, 1, 2, 3].map((i) => rr(36, 70 + i * 82, 38, 38, 10, i === 3 ? 'none' : C.w3, i === 3 ? `stroke="${C.w3}" stroke-width="5"` : '') + (i === 3 ? '' : stroke(`M44 ${90 + i * 82} l9 9 l14 -17`, C.cream, 6)) + rr(96, 74 + i * 82, 200, 13, 6, C.ink, 'opacity=".7"') + rr(96, 98 + i * 82, 150, 10, 5, C.ink, 'opacity=".25"')).join(''));
    s += g('translate(120 330)', path('M0 -70 l70 28 v60 c0 42 -34 70 -70 88 c-36 -18 -70 -46 -70 -88 v-60z', C.gold, 'filter="url(#sh)"') + stroke('M-26 6 l20 22 l38 -46', C.w1, 12));
    return svg(W, H, s, bgLinear(W, H, '#4A0F20', C.w3));
  },
  'blog-thoi-gio-nghi-ngoi': () => {
    let s = circ(620, 380, 260, 'url(#glow)');
    s += paper(90, 70, 470, 340, -2) + g('translate(90 70) rotate(-2)', rr(0, 0, 470, 62, 14, C.w3) +
      ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d, i) => `<text x="${40 + i * 62}" y="40" text-anchor="middle" font-family="Segoe UI, Arial" font-weight="700" font-size="20" fill="${C.cream}">${d}</text>`).join('') +
      Array.from({ length: 4 }, (_, r) => Array.from({ length: 7 }, (_, c) => rr(14 + c * 62, 84 + r * 62, 52, 50, 10, c >= 5 ? C.gold : (r === 2 && c === 2 ? C.copper : C.sand), c >= 5 ? 'opacity=".95"' : '')).join('')).join(''));
    s += g('translate(630 330)', path('M-60 0 h110 a0 0 0 0 1 0 0 v50 a50 50 0 0 1 -50 50 h-10 a50 50 0 0 1 -50 -50z', C.cream, 'filter="url(#sh)"') + stroke('M50 20 h20 a24 24 0 0 1 0 48 h-26', C.cream, 12) + rr(-60, 0, 110, 30, 10, C.copper, 'opacity=".85"') +
      stroke('M-30 -20 q-12 -20 0 -36 M0 -20 q-12 -20 0 -36 M30 -20 q-12 -20 0 -36', C.gold2, 6, 'opacity=".8"'));
    s += g('translate(100 400)', path('M0 0 c60 -90 130 -120 210 -110 c-30 20 -60 40 -80 70 c60 -30 120 -20 160 10 c-60 0 -110 20 -150 60z', C.rose, 'opacity="0"'));
    return svg(W, H, s, bgLinear(W, H, '#2E0813', '#8A3A1E'));
  },
};

// ---- 8 ô khu vực (640x400) ----
const RW = 640, RH = 400;
const regionBase = (a, b) => bgLinear(RW, RH, a, b, 'v') + circ(480, 120, 160, 'url(#glow)');
const region = {
  'khu-vuc-do-thi': () => { // Hà Nội - mái ngói phố cổ + tháp
    setSeed(2); let s = '';
    s += skyline(300, 640, 330, 80, 190, '#4A1022', C.w1, 0.3);
    // nhà phố cổ
    [[40, 60], [130, 80], [230, 66]].forEach(([x, w], i) => { const h = 120 + i * 20; s += rect(x, 330 - h, w, h, i === 1 ? C.sand : C.cream) + path(`M${x - 10} ${330 - h} L${x + w / 2} ${330 - h - 40} L${x + w + 10} ${330 - h}Z`, i === 1 ? C.w3 : C.copper) + rr(x + w / 2 - 12, 330 - 62, 24, 62, 4, C.w2) + rr(x + 10, 330 - h + 20, w - 20, 18, 3, C.w3, 'opacity=".5"'); });
    // tháp rùa kiểu tháp nhỏ
    s += g('translate(480 150)', rect(-26, 90, 52, 90, C.cream) + rect(-34, 70, 68, 22, C.gold) + rect(-20, 40, 40, 30, C.cream) + path('M-30 40 L0 6 L30 40Z', C.gold) + rect(-2, -26, 4, 32, C.gold));
    s += rect(0, 330, RW, 70, '#2E0813') + rect(0, 330, RW, 8, C.gold, 'opacity=".7"');
    return svg(RW, RH, s, regionBase(C.w1, C.w3));
  },
  'khu-vuc-cang': () => { // Hải Phòng - cần cẩu, tàu
    let s = '';
    s += rect(0, 300, RW, 100, '#2E0813');
    for (let i = 0; i < 5; i++) s += path(`M0 ${322 + i * 16} Q80 ${312 + i * 16} 160 ${322 + i * 16} T320 ${322 + i * 16} T480 ${322 + i * 16} T640 ${322 + i * 16}`, 'none', `stroke="${C.rose}" stroke-width="3" opacity=".35"`);
    [[130, 0.7], [290, 0.55]].forEach(([x, k]) => { s += g(`translate(${x} ${300}) scale(${k})`, rect(0, -220, 14, 220, C.gold) + rect(110, -180, 14, 180, C.gold) + rect(-30, -220, 190, 18, C.copper) + rect(-110, -216, 90, 10, C.gold) + line(-100, -206, -100, -140, C.cream, 3) + rr(-114, -140, 28, 24, 3, C.rose) + line(0, -220, 62, -262, C.gold2, 4) + line(124, -220, 62, -262, C.gold2, 4)); });
    // tàu container
    s += g('translate(380 250)', path('M0 40 h230 l-26 32 h-180z', C.cream, 'filter="url(#sh2)"') + ['#C25A74', '#E0A526', '#F7EFE2', '#C4702A', '#9B2A47'].map((c, i) => rect(14 + i * 40, 8, 38, 32, c)).join('') + ['#E0A526', '#C25A74', '#C4702A'].map((c, i) => rect(54 + i * 40, -22, 38, 30, c)).join(''));
    return svg(RW, RH, s, regionBase('#2A0B15', '#6B1830'));
  },
  'khu-vuc-bien': () => { // Quảng Ninh - đảo đá vôi, thuyền buồm
    let s = '';
    s += path('M0 300 L60 180 L100 220 L150 120 L210 230 L250 200 L300 300Z', C.w3, 'opacity=".9"');
    s += path('M260 300 L330 160 L370 210 L420 100 L480 220 L520 190 L600 300Z', C.w4);
    s += path('M120 300 L170 210 L210 250 L260 190 L320 300Z', C.w2);
    s += rect(0, 296, RW, 104, '#2E0813');
    for (let i = 0; i < 4; i++) s += path(`M0 ${322 + i * 20} Q80 ${312 + i * 20} 160 ${322 + i * 20} T320 ${322 + i * 20} T480 ${322 + i * 20} T640 ${322 + i * 20}`, 'none', `stroke="${C.gold2}" stroke-width="3" opacity=".3"`);
    s += g('translate(420 296)', path('M-50 0 h100 l-18 24 h-64z', C.cream) + path('M0 -110 v104 l60 0z', C.gold2) + path('M-6 -96 v90 l-46 0z', C.cream, 'opacity=".95"') + line(0, -112, 0, 0, C.brown, 3));
    return svg(RW, RH, s, regionBase('#3A0A18', '#8A3A1E'));
  },
  'khu-vuc-cau': () => { // Đà Nẵng - cầu & núi
    let s = '';
    s += path('M0 260 Q120 160 260 230 Q380 150 520 220 Q600 190 640 230 L640 400 L0 400Z', C.w3, 'opacity=".8"');
    s += rect(0, 292, RW, 108, '#2E0813');
    s += rect(40, 280, 560, 12, C.cream);
    [[210, 110], [430, 110]].forEach(([x, t]) => { s += rect(x - 7, t, 14, 176, C.gold); for (let i = 1; i <= 7; i++) { s += line(x, t + 8 + i * 8, x - i * 26, 281, C.gold2, 2.2, 'opacity=".9"') + line(x, t + 8 + i * 8, x + i * 26, 281, C.gold2, 2.2, 'opacity=".9"'); } });
    for (let i = 0; i < 4; i++) s += path(`M0 ${322 + i * 20} Q80 ${312 + i * 20} 160 ${322 + i * 20} T320 ${322 + i * 20} T480 ${322 + i * 20} T640 ${322 + i * 20}`, 'none', `stroke="${C.rose}" stroke-width="3" opacity=".3"`);
    return svg(RW, RH, s, regionBase('#2A0B15', '#7A1B34'));
  },
  'khu-vuc-nui': () => { // Huế - cổng thành, sông
    let s = '';
    s += rect(0, 300, RW, 100, '#2E0813');
    s += g('translate(150 120)', rect(0, 120, 340, 60, C.sand) + rect(20, 90, 300, 32, C.cream) + rect(60, 40, 220, 52, C.sand) + path('M40 40 L170 -20 L300 40Z', C.w3) + path('M20 90 L170 40 L320 90Z', C.copper, 'opacity="0"') +
      [0, 1, 2].map((i) => path(`M${70 + i * 90} 180 v-40 a20 20 0 0 1 40 0 v40z`, C.w1)).join('') + rect(165, -46, 10, 28, C.gold) + path('M175 -46 l50 14 l-50 14z', C.gold2));
    s += stroke('M0 340 Q160 320 320 340 T640 340', C.gold2, 3, 'opacity=".35"');
    s += path('M440 330 q20 -14 40 0 q-20 8 -40 0z', C.cream, 'opacity=".9"') + line(460, 330, 460, 316, C.gold, 3);
    return svg(RW, RH, s, regionBase('#3A0A18', '#6B1830'));
  },
  'khu-vuc-song': () => { // TP.HCM - tòa nhà cao, sông
    setSeed(9); let s = '';
    s += skyline(60, 640, 320, 100, 250, '#4C1224', C.w1, 0.4);
    s += g('translate(300 20)', path('M0 300 L18 80 L26 0 L34 80 L52 300Z', C.cream) + rect(24, -38, 4, 40, C.gold) + stroke('M10 140 h32 M8 200 h36', C.w3, 5, 'opacity=".5"'));
    s += rect(0, 318, RW, 82, '#2E0813');
    for (let i = 0; i < 4; i++) s += path(`M0 ${340 + i * 16} Q80 ${330 + i * 16} 160 ${340 + i * 16} T320 ${340 + i * 16} T480 ${340 + i * 16} T640 ${340 + i * 16}`, 'none', `stroke="${C.gold2}" stroke-width="3" opacity="${0.3 - i * 0.05}"`);
    s += g('translate(120 350)', path('M0 0 h70 l-12 14 h-46z', C.gold) + rect(14, -16, 40, 16, C.cream));
    return svg(RW, RH, s, regionBase('#2A0B15', '#8A3A1E'));
  },
  'khu-vuc-khu-cong-nghiep': () => { // Đồng Nai - nhà xưởng, ống khói
    let s = rect(0, 320, RW, 80, '#2E0813');
    s += g('translate(60 190)', rect(0, 60, 150, 70, C.cream) + path('M0 60 l30 -34 v34 M30 60 l30 -34 v34 M60 60 l30 -34 v34 M90 60 l30 -34 v34 M120 60 l30 -34 v34', C.sand) + rect(20, 90, 28, 40, C.w3));
    s += g('translate(250 130)', rect(0, 60, 200, 130, C.sand) + rect(16, 20, 22, 40, C.copper) + rect(60, 0, 22, 60, C.copper) + [0, 1, 2].map((i) => rr(20 + i * 62, 100, 44, 52, 4, C.w3, 'opacity=".75"')).join(''));
    [[520, 150], [570, 190]].forEach(([x, y]) => { s += rect(x, y, 30, 330 - y, C.w4) + rect(x - 4, y, 38, 14, C.gold) + circ(x + 30, y - 30, 22, C.cream, 'opacity=".25"') + circ(x + 50, y - 62, 28, C.cream, 'opacity=".16"'); });
    s += stroke('M0 330 H640', C.gold, 4, 'opacity=".6"');
    return svg(RW, RH, s, regionBase('#3A0A18', '#7A1B34'));
  },
  'khu-vuc-kinh-te-bien': () => { // Thanh Hóa - khu kinh tế ven biển: bể chứa, tháp chưng cất, ngọn lửa, tàu
    let s = path('M0 250 Q120 200 240 240 Q360 190 480 235 Q560 215 640 245 L640 330 L0 330Z', C.w3, 'opacity=".55"');
    s += rect(0, 300, RW, 100, '#2E0813');
    for (let i = 0; i < 4; i++) s += path(`M0 ${326 + i * 18} Q80 ${316 + i * 18} 160 ${326 + i * 18} T320 ${326 + i * 18} T480 ${326 + i * 18} T640 ${326 + i * 18}`, 'none', `stroke="${C.rose}" stroke-width="3" opacity=".3"`);
    // bể chứa
    [[70, 70], [170, 58]].forEach(([x, w]) => { s += rect(x, 238, w, 62, C.cream) + path(`M${x} 238 q${w / 2} -22 ${w} 0z`, C.sand) + rect(x, 262, w, 4, C.w3, 'opacity=".35"'); });
    // tháp chưng cất + ống khói + ngọn lửa
    s += g('translate(310 90)', rect(0, 40, 26, 170, C.sand) + rect(-4, 40, 34, 8, C.gold) + rect(-4, 100, 34, 8, C.gold) + rect(-4, 160, 34, 8, C.gold) + rect(48, 0, 12, 210, C.cream) + rect(44, 0, 20, 8, C.gold) + path('M54 -6 c-16 -22 14 -30 0 -52 c26 14 30 40 0 52z', C.copper) + path('M54 -6 c-8 -12 6 -18 0 -30 c14 8 16 22 0 30z', C.gold2));
    s += stroke('M26 190 H340 M26 214 H340', C.gold2, 4, 'opacity=".5"').replace('d="M26', 'transform="translate(310 90)" d="M26');
    // cần cẩu cảng + tàu
    s += g('translate(470 300) scale(.62)', rect(0, -220, 14, 220, C.gold) + rect(110, -180, 14, 180, C.gold) + rect(-30, -220, 190, 18, C.copper) + line(0, -220, 62, -262, C.gold2, 4) + line(124, -220, 62, -262, C.gold2, 4));
    s += g('translate(500 268)', path('M0 40 h120 l-14 24 h-92z', C.cream, 'filter="url(#sh2)"') + ['#C25A74', '#E0A526', '#F7EFE2', '#C4702A'].map((c, i) => rect(10 + i * 26, 14, 24, 26, c)).join(''));
    return svg(RW, RH, s, regionBase('#2A0B15', '#6B1830'));
  },
  'khu-vuc-ruong': () => { // Cần Thơ - sông nước, ruộng, ghe
    let s = '';
    const bands = ['#B2663A', '#9B5530', '#C4702A', '#8A4420'];
    for (let i = 0; i < 4; i++) s += path(`M0 400 L0 ${240 + i * 28} Q160 ${216 + i * 28} 320 ${240 + i * 28} T640 ${232 + i * 28} L640 400Z`, bands[i]);
    s += path('M0 330 Q160 300 320 330 T640 320 L640 360 Q480 380 320 360 T0 370Z', '#2E0813', 'opacity=".95"');
    s += g('translate(300 300)', path('M-70 0 h140 l-22 26 h-96z', C.gold, 'filter="url(#sh2)"') + path('M-30 0 q30 -44 60 0z', C.cream) + line(60, -4, 100, -34, C.sand, 4));
    [[80, 120], [540, 140]].forEach(([x, y]) => { s += rect(x, y, 6, 90, C.w1) + path(`M${x + 3} ${y} q-30 -4 -44 24 M${x + 3} ${y} q30 -4 44 24 M${x + 3} ${y} q-26 -26 -50 -18 M${x + 3} ${y} q26 -26 50 -18`, 'none', `stroke="${C.cream}" stroke-width="6" stroke-linecap="round" opacity=".85"`); });
    return svg(RW, RH, s, regionBase('#4A0F20', '#8A3A1E'));
  },
};

// ---- 8 biểu tượng ngành (256x256) ----
const I = 256;
const iconTile = (inner) => svg(I, I, rr(0, 0, I, I, 52, 'url(#gWine)') + circ(190, 70, 110, 'url(#glow)', 'opacity=".4"') + inner.replace(/GOLD/g, C.gold2));
const st = (d, sw = 11) => stroke(d, 'GOLD', sw);
const icon = {
  'icon-kinh-doanh': () => iconTile(st('M62 190 V120 M110 190 V92 M158 190 V140 M62 74 l56 -26 l30 24 l46 -34') + st('M170 40 h26 v26', 10)),
  'icon-marketing': () => iconTile(st('M64 118 h28 l70 -42 v108 l-70 -42 h-28z') + st('M178 104 q16 14 0 28') + st('M96 160 l12 38 h26 l-12 -38')),
  'icon-nhan-su': () => iconTile(st('M70 76 h62 l22 24 h40 v94 H70z') + st('M70 120 h120', 9) + st('M104 150 h52', 9)),
  'icon-ke-toan': () => iconTile(rr(68, 52, 120, 154, 18, 'none', 'stroke="#F3C95C" stroke-width="11"') + st('M90 92 h76', 10) + [0, 1, 2].map((r) => [0, 1, 2].map((c) => circ(98 + c * 30, 128 + r * 28, 5.5, '#F3C95C')).join('')).join('')),
  'icon-cntt': () => iconTile(rr(56, 62, 144, 98, 14, 'none', 'stroke="#F3C95C" stroke-width="11"') + st('M110 100 l-20 20 l20 20 M146 100 l20 20 l-20 20', 10) + st('M104 192 h48 M128 160 v32')),
  'icon-logistics': () => iconTile(st('M44 168 V92 h92 v76') + st('M136 118 h42 l32 34 v16 h-74') + circ(84, 178, 18, '#7A1B34', 'stroke="#F3C95C" stroke-width="10"') + circ(176, 178, 18, '#7A1B34', 'stroke="#F3C95C" stroke-width="10"')),
  'icon-xay-dung': () => iconTile(st('M78 204 L100 64 L122 204 M86 150 H114 M92 106 H108') + st('M50 64 H208') + st('M184 64 V112', 9) + rr(168, 112, 32, 26, 4, 'none', 'stroke=\"#F3C95C\" stroke-width=\"9\"') + st('M58 204 H142')),
  'icon-ngan-hang': () => iconTile(st('M52 98 L128 54 L204 98z') + st('M78 112 v66 M128 112 v66 M178 112 v66', 12) + st('M56 198 h144')),
};

module.exports = { blog, region, icon };

