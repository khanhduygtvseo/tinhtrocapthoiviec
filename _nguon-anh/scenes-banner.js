const L = require('./lib.js');
const { C, svg, rect, rr, circ, line, path, stroke, g, bgLinear, skyline, jobCard, glyphBag, glyphStar, glyphPin, magnifier, pin, coin, dots, rnd, setSeed } = L;

// Banner 1: tìm việc - thẻ việc làm, kính lúp, đường chân trời thành phố
function banner1() {
  const W = 1600, H = 640; setSeed(11);
  let s = circ(1180, 290, 360, 'url(#glow)');
  s += path(`M${W} 0 L1010 0 L1330 ${H} L${W} ${H}Z`, C.w4, 'opacity=".25"');
  s += path(`M${W} 0 L1200 0 L1480 ${H} L${W} ${H}Z`, C.w2, 'opacity=".35"');
  s += dots(690, 70, 6, 4, 26, 3, C.gold2, 0.35);
  s += skyline(640, W, H, 120, 330, '#66182E', C.w1, 0.18);
  s += skyline(700, W, H, 70, 190, '#451021', C.w1, 0.35);
  s += rect(0, H - 22, W, 22, C.w1, 'opacity=".55"');
  s += jobCard(930, 108, 420, -5, C.w3, glyphBag);
  s += jobCard(1020, 252, 440, 3, C.copper, glyphStar);
  s += jobCard(960, 398, 420, -3, C.gold, glyphPin).replace('fill="#E0A526"', 'fill="#E0A526"');
  s += magnifier(1400, 200, 92, 40);
  s += pin(820, 190, 0.9, C.gold);
  s += circ(1530, 560, 6, C.gold2) + circ(880, 560, 5, C.gold2, 'opacity=".6"');
  return svg(W, H, s, bgLinear(W, H, C.w1, C.w3));
}

// Banner 2: công cụ - máy tính, đồng hồ ngày đêm, đồng xu, cột tăng
function banner2() {
  const W = 1600, H = 640;
  let s = circ(1150, 330, 380, 'url(#glow)');
  s += path(`M0 ${H} L0 520 Q400 440 800 520 T1600 480 L1600 ${H}Z`, C.w1, 'opacity=".5"');
  // cột
  const bars = [[760, 90], [830, 150], [900, 215], [970, 290]];
  bars.forEach(([x, h], i) => { s += rr(x, 560 - h, 54, h, 12, i === 3 ? C.gold : C.cream, `opacity="${i === 3 ? 1 : 0.18 + i * 0.1}" filter="url(#sh2)"`); });
  s += stroke('M770 400 L850 330 L920 360 L1010 250', C.gold2, 6, 'stroke-dasharray="2 14"');
  // máy tính
  s += g('translate(1090 110) rotate(5)',
    rr(0, 0, 330, 430, 34, C.w1, 'filter="url(#sh)"') + rr(10, 10, 310, 410, 28, C.cream) +
    rr(30, 30, 270, 96, 16, C.w2) +
    `<text x="282" y="98" text-anchor="end" font-family="Segoe UI, Arial" font-weight="700" font-size="50" fill="${C.gold2}">0,5 × 5,5</text>` +
    [0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => rr(34 + c * 66, 150 + r * 72, 56, 56, 14, c === 3 ? C.gold : C.sand)).join('')).join('') +
    rr(34, 150 + 3 * 72 - 2, 122, 56, 14, C.w3) + rr(166, 150 + 3 * 72 - 2, 122, 56, 14, C.copper));
  // lịch năm làm việc
  s += g('translate(900 330) rotate(-4)', rr(0, 0, 250, 230, 22, C.cream, 'filter="url(#sh)"') + rr(0, 0, 250, 62, 22, C.w3) + rect(0, 40, 250, 22, C.w3) +
    rr(26, 20, 110, 14, 7, C.cream, 'opacity=".9"') +
    Array.from({ length: 12 }, (_, i) => rr(20 + (i % 4) * 56, 80 + Math.floor(i / 4) * 46, 44, 34, 9, i < 6 ? C.gold : C.sand, i === 5 ? 'opacity=".55"' : '')).join(''));  s += coin(1290, 575, 50) + coin(1362, 548, 50) + coin(1326, 500, 50);
  s += dots(660, 80, 5, 3, 26, 3, C.gold2, 0.35);
  return svg(W, H, s, bgLinear(W, H, '#4A0F20', '#8A3A1E'));
}

// Banner 3: khu vực - phong cảnh nhiều lớp: núi, cầu, cảng, ruộng bậc thang
function banner3() {
  const W = 1600, H = 640; setSeed(21);
  let s = circ(1240, 230, 150, 'url(#gGold)', 'opacity=".95"') + circ(1240, 230, 230, 'url(#glow)');
  // núi xa
  s += path(`M300 520 L560 400 L760 250 L900 340 L1060 190 L1250 330 L1400 250 L1600 360 L1600 ${H} L560 ${H}Z`, C.w3, 'opacity=".55"');
  s += path(`M420 520 L700 430 L900 320 L1040 390 L1230 290 L1420 380 L1600 330 L1600 ${H} L700 ${H}Z`, C.w4, 'opacity=".7"');
  // cầu dây văng
  let br = rect(700, 430, 720, 14, C.cream, 'opacity=".9"');
  [[880, 240], [1210, 240]].forEach(([x, top]) => {
    br += rect(x - 8, top, 16, 190, C.cream, 'opacity=".95"');
    for (let i = 1; i <= 8; i++) { br += line(x, top + 12 + i * 6, x - i * 22 - 10, 432, C.gold2, 2.2, 'opacity=".85"'); br += line(x, top + 12 + i * 6, x + i * 22 + 10, 432, C.gold2, 2.2, 'opacity=".85"'); }
  });
  s += br;
  // thành phố
  s += skyline(1290, 1580, 520, 90, 240, '#4C1224', C.w1, 0.3);
  // cần cẩu cảng
  s += g('translate(600 290)', rect(0, 0, 14, 240, C.gold) + rect(86, 40, 14, 200, C.gold) + rect(-20, 20, 150, 18, C.copper) + rect(-90, 20, 74, 10, C.gold) + line(-84, 30, -84, 90, C.cream, 3) + rr(-98, 90, 28, 26, 3, C.rose));
  // sóng nước
  s += path(`M0 ${H} L0 528 Q200 500 420 528 T860 528 T1300 528 T1600 520 L1600 ${H}Z`, '#2E0813');
  // ruộng bậc thang trước
  const cols = ['#B2663A', '#9B5530', '#C4702A', '#8A4420'];
  for (let i = 0; i < 4; i++) s += path(`M0 ${H} L0 ${560 + i * 20} Q300 ${520 + i * 24} 640 ${566 + i * 16} T1280 ${560 + i * 18} T1600 ${548 + i * 20} L1600 ${H}Z`, cols[i], 'opacity=".95"');
  // thuyền
  s += g('translate(1090 508)', path('M-40 0 h80 l-14 16 h-52z', C.cream) + path('M0 -62 v58 l36 0z', C.gold2) + path('M-4 -56 v52 l-30 0z', C.cream, 'opacity=".9"'));
  s += dots(660, 80, 5, 3, 26, 3, C.gold2, 0.3);
  return svg(W, H, s, bgLinear(W, H, '#2A0B15', '#6B1830', 'v'));
}

// Banner giới thiệu: tòa nhà văn phòng, la bàn, bậc thang
function bannerAbout() {
  const W = 1600, H = 520; setSeed(5);
  let s = circ(1100, 260, 330, 'url(#glow)');
  s += skyline(760, 1600, H, 90, 300, '#5A162B', C.w1, 0.3);
  // tòa nhà chính
  s += rect(1000, 110, 230, 410, C.cream, 'filter="url(#sh)"');
  for (let i = 0; i < 4; i++) for (let j = 0; j < 9; j++) s += rr(1020 + i * 52, 134 + j * 42, 34, 24, 4, (i + j) % 3 === 0 ? C.gold : C.w3, 'opacity=".85"');
  s += rect(1235, 220, 150, 300, C.sand);
  for (let i = 0; i < 3; i++) for (let j = 0; j < 6; j++) s += rr(1250 + i * 44, 240 + j * 44, 28, 22, 4, C.w3, 'opacity=".7"');
  // la bàn
  s += g('translate(1420 150)', circ(0, 0, 78, C.w1, 'filter="url(#sh)"') + circ(0, 0, 66, C.cream) + circ(0, 0, 66, 'none', `stroke="${C.gold}" stroke-width="6"`) +
    path('M0 -50 L12 0 L0 50 L-12 0Z', C.w3) + path('M0 -50 L12 0 L-12 0Z', C.gold) + circ(0, 0, 6, C.w1));
  // bậc thang
  [0, 1, 2, 3].forEach((i) => { s += rr(720 + i * 70, 450 - i * 55, 70, 70 + i * 55, 8, i === 3 ? C.gold : C.cream, `opacity="${i === 3 ? 1 : 0.22 + i * 0.1}"`); });
  s += path('M740 400 L810 350 L880 300 L950 235', 'none', `stroke="${C.gold2}" stroke-width="5" stroke-dasharray="2 14" stroke-linecap="round"`);
  return svg(W, H, s, bgLinear(W, H, C.w1, C.w3));
}

module.exports = { banner1, banner2, banner3, bannerAbout };



