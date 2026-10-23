// Sinh toàn bộ website tĩnh. Chạy: node build.js
// BASE: tên miền khi xuất bản (ví dụ 'https://ten-mien.com'). Để trống thì canonical/sitemap dùng đường dẫn gốc ('/trang.html').
const fs = require('fs');
const path = require('path');
const { SITE, REGIONS, INDUSTRIES, REGION_TEXT, INDUSTRY_TEXT } = require('./content-hubs.js');
const { TABS, POSTS, LAW_SRC, CHECKED } = require('./content-posts.js');
const Calc = require('./assets/js/severance-calc.js');

const BASE = '';
const ROOT = __dirname;
const OUT = process.env.OUT_DIR ? path.resolve(process.env.OUT_DIR) : ROOT;
const TOOL = 'cong-cu/tinh-tro-cap-thoi-viec-mat-viec.html';
const TOOL_NAME = 'Tính trợ cấp thôi việc, trợ cấp mất việc làm';
const pages = [];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const money = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const dec = (n) => String(n).replace('.', ',');
const viDate = (iso) => iso.split('-').reverse().join('/');
const allRegions = REGIONS.flatMap((g) => g.items.map((x) => ({ ...x, group: g.group })));
const postBySlug = (s) => POSTS.find((p) => p.slug === s);
const tabName = (id) => TABS.find((t) => t.id === id).name;
const first = (s) => { let o = ''; for (const x of s.split(/(?<=[a-zà-ỹ]{2}\.)\s/)) { if ((o + ' ' + x).trim().length > 160) break; o = (o + ' ' + x).trim(); } return o || s.slice(0, 157); };
const words = (arr) => arr.join(' ').trim().split(/\s+/).length;

const ico = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  up: '<svg class="ar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7l8.5 6 8.5-6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
};

function write(rel, html, indexable = true) {
  const f = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html);
  pages.push({ file: rel, indexable });
}
const url = (rel) => `${BASE}/${rel}`;

function layout({ file, title, desc, main, schema = [], crumbs = [], bodyClass = '', noindex = false, preload = '' }) {
  const depth = file.split('/').length - 1;
  const R = '../'.repeat(depth);
  const L = (p) => R + p;
  const ld = [
    { '@context': 'https://schema.org', '@type': 'Organization', name: SITE.name, legalName: SITE.legal, email: SITE.email,
      address: [{ '@type': 'PostalAddress', streetAddress: SITE.hcm.addr, addressCountry: 'VN' }, { '@type': 'PostalAddress', streetAddress: SITE.hn.addr, addressCountry: 'VN' }],
      contactPoint: [{ '@type': 'ContactPoint', telephone: SITE.hcm.tel, contactType: 'customer support', areaServed: 'VN', availableLanguage: 'vi' }] },
    { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, inLanguage: 'vi' },
  ];
  if (crumbs.length) ld.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, ...(c.href !== undefined ? { item: url(c.href) } : {}) })) });
  schema.forEach((s) => ld.push({ '@context': 'https://schema.org', ...s }));

  const cur = (p) => (file === p ? ' aria-current="page"' : '');
  const mega = `<div class="mega" id="mega"><div class="mega-col"><h4><a href="${L('khu-vuc/index.html')}">Theo khu vực</a></h4>${allRegions.map((r) => `<a href="${L('khu-vuc/' + r.slug + '.html')}">${esc(r.name)}</a>`).join('')}</div>
<div class="mega-col"><h4><a href="${L('nganh-nghe/index.html')}">Theo ngành nghề</a></h4>${INDUSTRIES.map((i) => `<a href="${L('nganh-nghe/' + i.slug + '.html')}">${esc(i.name)}</a>`).join('')}</div></div>`;
  const header = `<header class="hd" id="top">
<div class="hd-top"><div class="container"><a href="tel:${SITE.hcm.telHref}">${ico.phone}${esc(SITE.hcm.tel)}</a><a href="mailto:${SITE.email}">${ico.mail}${esc(SITE.email)}</a></div></div>
<div class="container hd-main">
<a class="logo" href="${L('index.html')}" aria-label="CareerViet, về trang chủ"><img src="${L('assets/img/careerviet-logo.png')}" width="184" height="46" alt="CareerViet"></a>
<nav class="nav" id="nav" aria-label="Menu chính">
<div class="nav-item"><a href="${L('viec-lam/index.html')}"${cur('viec-lam/index.html')}>Việc làm</a><button class="dd-t" type="button" aria-expanded="false" aria-controls="mega" aria-label="Mở danh sách việc làm theo khu vực và ngành nghề">${ico.chev}</button>${mega}</div>
<a href="${L('blog/index.html')}"${cur('blog/index.html')}>Blog</a>
<a href="${L(TOOL)}"${cur(TOOL)}>Công cụ</a>
<a href="${L('gioi-thieu.html')}"${cur('gioi-thieu.html')}>Giới thiệu</a>
<a class="btn btn-wine btn-sm hd-cta" href="${L('lien-he.html')}">Liên hệ ${ico.arrow}</a>
</nav>
<button class="burger" type="button" aria-label="Mở menu" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span></button>
</div></header>`;

  const footer = `<footer class="ft"><div class="container ft-grid">
<div><span class="ft-logo"><img src="${L('assets/img/careerviet-logo.png')}" width="160" height="40" alt="CareerViet" loading="lazy"></span>
<p>${esc(SITE.legal)}</p><p>Thông tin về việc làm theo khu vực, ngành nghề, bài viết về quyền lợi người lao động và công cụ tính trợ cấp.</p></div>
<div><h3>Việc làm</h3><a href="${L('khu-vuc/index.html')}">Theo khu vực</a><a href="${L('nganh-nghe/index.html')}">Theo ngành nghề</a><a href="${L('viec-lam/index.html')}">Tổng quan việc làm</a></div>
<div><h3>Khám phá</h3><a href="${L('blog/index.html')}">Blog</a><a href="${L(TOOL)}">Công cụ tính trợ cấp</a><a href="${L('gioi-thieu.html')}">Giới thiệu</a><a href="${L('lien-he.html')}">Liên hệ</a><a href="${L('chinh-sach.html')}">Chính sách</a></div>
<div><h3>Liên hệ</h3><p><strong>${esc(SITE.hcm.label)}:</strong> ${esc(SITE.hcm.addr)}<br><a href="tel:${SITE.hcm.telHref}">${esc(SITE.hcm.tel)}</a></p><p><strong>${esc(SITE.hn.label)}:</strong> ${esc(SITE.hn.addr)}<br><a href="tel:${SITE.hn.telHref}">${esc(SITE.hn.tel)}</a></p><a href="mailto:${SITE.email}">${esc(SITE.email)}</a></div>
</div><div class="ft-bot-wrap"><div class="container ft-bot"><p class="ft-copy">Copyright © Công Ty Cổ Phần Giải Pháp CareerViet</p></div></div></footer>
<button class="top-ring" type="button" aria-label="Lên đầu trang"><svg class="ring" viewBox="0 0 58 58" aria-hidden="true"><circle class="bg" cx="29" cy="29" r="26"/><circle class="fg" cx="29" cy="29" r="26"/></svg>${ico.up}</button>`;

  const scripts = `<script src="${L('assets/js/main.js')}" defer></script>` + (file === TOOL ? `<script src="${L('assets/js/severance-calc.js')}" defer></script><script src="${L('assets/js/tool.js')}" defer></script>` : '');
  return `<!doctype html>
<html lang="vi" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${noindex ? '<meta name="robots" content="noindex, follow">' : `<link rel="canonical" href="${url(file)}">`}
<meta property="og:type" content="website"><meta property="og:locale" content="vi_VN"><meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}">
<meta name="theme-color" content="#151C6B">
<link rel="preload" href="${L('assets/fonts/BeVietnamPro-700-vietnamese.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${L('assets/fonts/BeVietnamPro-400-vietnamese.woff2')}" as="font" type="font/woff2" crossorigin>
${preload}<link rel="stylesheet" href="${L('assets/css/fonts.css')}">
<link rel="stylesheet" href="${L('assets/css/style.css')}">
${ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
</head>
<body class="${bodyClass}">
<a class="skip" href="#main">Bỏ qua, đến nội dung chính</a>
<div class="curtain" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
${header}
<main id="main">
${main}
</main>
${footer}
${scripts}
</body>
</html>
`;
}

function crumbHtml(items, R) {
  return `<nav class="crumb" aria-label="Breadcrumb"><ol>${items.map((c, i) => (i === items.length - 1 ? `<li aria-current="page">${esc(c.name)}</li>` : `<li><a href="${R}${c.href}">${esc(c.name)}</a></li>`)).join('')}</ol></nav>`;
}
function pageHead({ R, crumbs, h1, lead, img }) {
  return `<section class="ph"><div class="container">${crumbHtml(crumbs, R)}<div class="ph-text"><h1 data-split>${esc(h1)}</h1>${lead ? `<p class="lead" data-r="up">${esc(lead)}</p>` : ''}</div></div></section>`;
}

const ART = {
  jobs: { src: 'banner-1.jpg', w: 1882, h: 836, alt: 'Banner khám phá ngành nghề phù hợp với bạn', wide: true },
  land: { src: 'banner-3.jpg', w: 1882, h: 836, alt: 'Banner tìm việc theo khu vực', wide: true },
  office: { src: 'banner-gioi-thieu.jpg', w: 1600, h: 520, alt: 'Minh họa tòa nhà văn phòng và la bàn', wide: true },
  calc: { src: 'banner-2.jpg', w: 1882, h: 836, alt: 'Banner công cụ tính tiền nhanh chóng, chính xác', wide: true },
};
function related(key, exclude) {
  let h = 0; for (const c of key) h = (h * 31 + c.charCodeAt(0)) % 997;
  const list = POSTS.filter((p) => p.slug !== exclude);
  const out = [];
  for (let i = 0; out.length < 3; i++) out.push(list[(h + i) % list.length]);
  return out;
}
function postCard(p, R, i = 0, extra = '') {
  return `<a class="pcard tilt spot" ${extra} href="${R}blog/${p.slug}.html" data-r="up" style="--i:${i}"><div class="pimg"><img src="${R}assets/img/${p.cover}.jpg" width="800" height="500" alt="Minh họa cho bài ${esc(p.title)}" loading="lazy"></div><div class="pcard-b"><span class="tag">${esc(tabName(p.tab))}</span><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p><span class="meta"><span>${viDate(p.published)}</span><span>${p.read} phút đọc</span></span><span class="more">Đọc bài ${ico.arrow}</span></div></a>`;
}
function relatedBlock(list, R, heading = 'Bài viết nên đọc') {
  return `<section class="rel"><h2 data-split>${heading}</h2><div class="cards3">${list.map((p, i) => postCard(p, R, i)).join('')}</div><p class="center"><a class="btn btn-wine magnetic" href="${R}blog/index.html">Xem tất cả bài viết ${ico.arrow}</a></p></section>`;
}
const STRIP = (R) => `<div class="explore" data-r="up"><h2>Khám phá thêm</h2><a class="btn btn-gold magnetic" href="${R}index.html">Trang chủ</a><a class="btn btn-ghost magnetic" href="${R}khu-vuc/index.html">Việc làm theo khu vực</a><a class="btn btn-ghost magnetic" href="${R}nganh-nghe/index.html">Việc làm theo ngành</a><a class="btn btn-ghost magnetic" href="${R}${TOOL}">Công cụ tính trợ cấp</a></div>`;

/* ================= Trang chủ ================= */
function home() {
  const file = 'index.html', R = '';
  const picks = [].concat(...INDUSTRIES.map((i) => i.jobs.slice(0, 2).map((j) => j[0])));
  const mq = (hid) => `<span ${hid ? 'aria-hidden="true"' : ''}>${picks.join('</span><span ' + (hid ? 'aria-hidden="true"' : '') + '>')}</span>`;
  const feats = POSTS.slice(0, 5);
  const main = `
<section class="hero" aria-label="Banner">
<div class="hero-slides">
<a class="hero-slide on" href="nganh-nghe/index.html"><img src="assets/img/banner-1.jpg" width="1882" height="836" alt="Khám phá ngành nghề phù hợp với bạn"></a>
<a class="hero-slide" href="${TOOL}" tabindex="-1"><img src="assets/img/banner-2.jpg" width="1882" height="836" alt="Công cụ tính tiền nhanh chóng, chính xác" loading="lazy"></a>
<a class="hero-slide" href="khu-vuc/index.html" tabindex="-1"><img src="assets/img/banner-3.jpg" width="1882" height="836" alt="Tìm việc theo khu vực" loading="lazy"></a></div>
<div class="hero-pills"><div class="container" role="tablist" aria-label="Chọn banner">
<button class="pill on" role="tab" aria-selected="true" type="button"><b>01 · Ngành nghề</b><i></i></button>
<button class="pill" role="tab" aria-selected="false" type="button"><b>02 · Công cụ</b><i></i></button>
<button class="pill" role="tab" aria-selected="false" type="button"><b>03 · Khu vực</b><i></i></button></div></div>
</section>
<section class="hero-intro"><div class="container"><div class="hero-in">
<span class="eyebrow" data-r="left">CareerViet</span>
<h1 id="h1" data-split>Tìm hướng đi nghề nghiệp, <em>hiểu rõ quyền lợi</em> của mình</h1>
<p class="hero-lead" data-r="up" style="--i:3">Xem nhóm việc làm theo khu vực và ngành nghề, đọc bài về quyền lợi người lao động và tính nhanh trợ cấp thôi việc, trợ cấp mất việc làm.</p>
<div class="hero-cta" data-r="up" style="--i:4"><a class="btn btn-gold magnetic" href="khu-vuc/index.html">Xem việc làm theo khu vực ${ico.arrow}</a><a class="btn btn-ghost magnetic" href="${TOOL}">Tính trợ cấp thôi việc</a></div>
</div></div></section>
<div class="marquee" aria-hidden="true"><div class="marquee-track">${mq(false)}${mq(true)}</div></div>

<section class="sec" id="khu-vuc"><div class="container">
<div class="sec-head" data-r="up"><span class="sec-num">01</span><h2>Việc làm theo khu vực</h2><p>Chọn một thành phố hoặc tỉnh để xem nhóm việc làm nổi bật và những điều nên hỏi trước khi nhận việc.</p><a class="btn btn-line magnetic" href="khu-vuc/index.html">Tất cả khu vực ${ico.arrow}</a></div>
<div class="scroller"><div class="scroll-track" tabindex="0" aria-label="Danh sách khu vực, cuộn ngang">
${allRegions.map((r, i) => `<a class="tile tilt" href="khu-vuc/${r.slug}.html" data-r="right" style="--i:${i % 4}"><img src="assets/img/${r.img}.jpg" width="640" height="400" alt="Minh họa ${esc(r.name)}" loading="lazy"><span class="tile-go">${ico.arrow}</span><span class="tile-body"><small>${esc(r.group)}</small><strong>${esc(r.name)}</strong><em>${esc(r.tag)}</em></span></a>`).join('')}
</div><div class="scroll-ctl"><button class="round" type="button" data-dir="-1" aria-label="Cuộn sang trái">${ico.arrow}</button><div class="scroll-bar" aria-hidden="true"><i></i></div><button class="round" type="button" data-dir="1" aria-label="Cuộn sang phải">${ico.arrow}</button></div></div>
</div></section>

<section class="sec sec-dark" id="nganh-nghe"><div class="container">
<div class="sec-head" data-r="up"><span class="sec-num">02</span><h2>Việc làm theo ngành nghề</h2><p>Mỗi ngành gồm nhiều vị trí khác nhau. Mở từng ngành để biết công việc cụ thể và hướng phát triển.</p><a class="btn btn-gold magnetic" href="nganh-nghe/index.html">Tất cả ngành nghề ${ico.arrow}</a></div>
<div class="ind-list">${INDUSTRIES.map((n, i) => `<a class="ind-row" href="nganh-nghe/${n.slug}.html" data-r="up" style="--i:${i % 2}"><span class="ind-n">${String(i + 1).padStart(2, '0')}</span><img src="assets/img/${n.icon}.svg" width="56" height="56" alt="" loading="lazy"><span><strong>${esc(n.name)}</strong><small>${n.jobs.slice(0, 3).map((j) => esc(j[0])).join(' · ')}</small></span>${ico.arrow}</a>`).join('')}</div>
</div></section>

<section class="sec" id="bai-viet"><div class="container">
<div class="stack-wrap"><div class="stack-side" data-r="left"><span class="sec-num">03</span><h2>Bài viết nổi bật</h2><p>Các bài giải thích rõ ràng về trợ cấp thôi việc, trợ cấp mất việc làm và những khoản tiền khi nghỉ việc, đối chiếu với Bộ luật Lao động 2019.</p><a class="btn btn-wine magnetic" href="blog/index.html">Xem tất cả bài viết ${ico.arrow}</a></div>
<div class="stack">${feats.map((p, i) => `<a class="scard tilt spot" style="--i:${i}" href="blog/${p.slug}.html"><span class="scard-img"><img src="assets/img/${p.cover}.jpg" width="800" height="500" alt="Minh họa cho bài ${esc(p.title)}" loading="lazy"></span><span class="scard-b"><span class="tag">${esc(tabName(p.tab))}</span><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p><span class="meta"><span>${viDate(p.published)}</span><span>${p.read} phút đọc</span></span><span class="more">Đọc bài ${ico.arrow}</span></span></a>`).join('')}</div></div>
</div></section>

<section class="tool-band" id="cong-cu"><div class="container">
<span class="eyebrow">Công cụ</span>
<h2 data-split>Tính trợ cấp thôi việc, trợ cấp mất việc làm</h2>
<p data-r="up">Nhập thời gian làm việc và tiền lương bình quân 6 tháng liền kề, kết quả hiện ngay theo Bộ luật Lao động 2019.</p>
<ul class="tool-points" data-r="up" style="--i:1"><li>${ico.check}<span>Hiện kết quả tức thì, không cần đăng ký</span></li><li>${ico.check}<span>Tự trừ thời gian đã tham gia bảo hiểm thất nghiệp</span></li><li>${ico.check}<span>Không lưu và không gửi đi số liệu bạn nhập</span></li></ul>
<a class="btn btn-gold magnetic" href="${TOOL}">Mở công cụ tính ${ico.arrow}</a>
</div></section>

<section class="sec sec-cream" id="gioi-thieu"><div class="container about">
<div data-r="up"><span class="sec-num">04</span><h2>Giới thiệu và liên hệ</h2>
<p>CareerViet là nền tảng tuyển dụng trực tuyến kết nối ứng viên và nhà tuyển dụng. Website này tập hợp thông tin về việc làm theo khu vực, theo ngành nghề, các bài viết về quyền lợi người lao động và công cụ tính trợ cấp.</p>
<p><a class="btn btn-wine magnetic" href="gioi-thieu.html">Đọc phần giới thiệu ${ico.arrow}</a></p></div>
<div><div class="stats"><div class="stat" data-r="zoom"><div class="odo" data-odo="${SITE.members}"></div><p>thành viên</p></div><div class="stat" data-r="zoom" style="--i:1"><div class="odo" data-odo="${SITE.companies}"></div><p>doanh nghiệp</p></div></div>
<div class="contact-cards"><div class="ccard" data-r="up"><h3>${esc(SITE.hcm.label)}</h3><p>${esc(SITE.hcm.addr)}</p><a href="tel:${SITE.hcm.telHref}">${esc(SITE.hcm.tel)}</a></div><div class="ccard" data-r="up" style="--i:1"><h3>${esc(SITE.hn.label)}</h3><p>${esc(SITE.hn.addr)}</p><a href="tel:${SITE.hn.telHref}">${esc(SITE.hn.tel)}</a></div></div>
<p style="margin-top:18px"><a href="mailto:${SITE.email}">${esc(SITE.email)}</a></p></div>
</div></section>`;
  write(file, layout({
    file, title: 'CareerViet · Việc làm theo khu vực, ngành nghề và công cụ tính trợ cấp',
    desc: 'Xem nhóm việc làm theo khu vực và ngành nghề, đọc bài về quyền lợi người lao động và tính nhanh trợ cấp thôi việc, trợ cấp mất việc làm.',
    main, bodyClass: 'home', preload: '<link rel="preload" href="assets/img/banner-1.jpg" as="image">\n',
    schema: [{ '@type': 'ItemList', name: 'Bài viết nổi bật', itemListElement: feats.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.title })) }],
  }));
}

/* ================= Hub khu vực ================= */
const REGION_INDEX_TEXT = {
  intro: 'Danh sách khu vực nhóm theo ba miền. Chọn một nơi để xem nhóm việc làm tiêu biểu và những điều nên hỏi trước khi nhận việc.',
  body: [
    'Cả nước có thị trường việc làm khác nhau theo từng vùng. Miền Bắc nổi bật với văn phòng ở thủ đô, cảng biển và khu công nghiệp; miền Trung có du lịch, dịch vụ và đào tạo; miền Nam là nơi tập trung thương mại, tài chính, sản xuất và chế biến nông sản.',
    'Khi chọn nơi làm việc, bạn không chỉ nhìn mức thu nhập mà nên cân nhắc cả quãng đường đi làm, chi phí sinh hoạt, ca làm và chế độ phúc lợi. Cùng một ngành nhưng ở hai địa phương có thể khác nhau khá nhiều về quy mô công ty và cách tuyển dụng.',
    'Ở các thành phố lớn, số lượng vị trí văn phòng nhiều hơn, còn tỉnh công nghiệp thường cần người cho sản xuất và kỹ thuật. Dù ở đâu, hãy đọc kỹ hợp đồng, hỏi rõ cách trả lương, tiền làm thêm giờ và các khoản trợ cấp để hiểu quyền lợi của mình ngay từ đầu.',
  ],
};
function regionsPages() {
  // trang tổng
  {
    const file = 'khu-vuc/index.html', R = '../';
    const crumbs = [{ name: 'Trang chủ', href: 'index.html' }, { name: 'Việc làm', href: 'viec-lam/index.html' }, { name: 'Khu vực' }];
    const tileHtml = (r, i, label) => `<a class="tile tilt" href="${r.slug}.html" data-r="up" style="--i:${i}"><img src="${R}assets/img/${r.img}.jpg" width="640" height="400" alt="Minh họa ${esc(r.name)}" loading="lazy"><span class="tile-go">${ico.arrow}</span><span class="tile-body"><small>${esc(label)}</small><strong>${esc(r.name)}</strong><em>${esc(r.tag)}</em></span></a>`;
    const blocks = REGIONS.map((g) => ({ title: g.group, tiles: g.items.map((r) => [r, g.group]) }));
    const groupsHtml = blocks.map((b) => `<div class="group"><div class="group-h" data-r="left"><h2>${esc(b.title)}</h2></div><div class="tiles">${b.tiles.map(([r, label], i) => tileHtml(r, i, label)).join('')}</div></div>`).join('');
    const main = `${pageHead({ R, crumbs, h1: 'Việc làm theo khu vực', lead: REGION_INDEX_TEXT.intro, img: ART.land })}
<section class="page-sec"><div class="container">${groupsHtml}
<div class="read-card" data-r="up"><h2>Thị trường việc làm theo vùng</h2>${REGION_INDEX_TEXT.body.map((t) => `<p>${esc(t)}</p>`).join('')}</div>
${relatedBlock(related('khu-vuc'), R)}</div></section>`;
    write(file, layout({ file, title: 'Việc làm theo khu vực: Bắc, Trung, Nam | CareerViet', desc: 'Danh sách khu vực nhóm theo miền, kèm thông tin các nhóm việc làm và lưu ý khi chọn nơi làm việc tại từng thành phố, tỉnh.', main, crumbs: crumbs.map((c) => ({ name: c.name, href: c.href })) }));
  }
  allRegions.forEach((r) => {
    const file = `khu-vuc/${r.slug}.html`, R = '../', t = REGION_TEXT[r.slug];
    const crumbs = [{ name: 'Trang chủ', href: 'index.html' }, { name: 'Việc làm', href: 'viec-lam/index.html' }, { name: 'Khu vực', href: 'khu-vuc/index.html' }, { name: r.name }];
    const main = `${pageHead({ R, crumbs, h1: `Việc làm tại ${r.name}`, lead: t.intro, img: { src: r.img + '.jpg', w: 640, h: 400, alt: `Minh họa ${r.name}` } })}
<section class="page-sec"><div class="container"><div class="hub-grid">
<article class="read-card" data-r="up"><h2>Thị trường việc làm tại ${esc(r.name)}</h2>${t.body.map((x) => `<p>${esc(x)}</p>`).join('')}</article>
<aside class="aside-box" data-r="right"><h3>Khu vực khác</h3>${REGIONS.map((g) => g.items.map((x) => `<a href="${x.slug}.html"${x.slug === r.slug ? ' aria-current="page"' : ''}><span>${esc(x.name)}</span><span>${esc(g.group.replace('Miền ', ''))}</span></a>`).join('')).join('')}</aside></div>
<div class="chips" style="margin-top:34px"><strong style="align-self:center">Ngành nghề thường gặp:</strong>${INDUSTRIES.map((n) => `<a class="chip" href="${R}nganh-nghe/${n.slug}.html">${esc(n.name)}</a>`).join('')}</div>
${relatedBlock(related(r.slug), R)}${STRIP(R)}</div></section>`;
    write(file, layout({ file, title: `Việc làm tại ${r.name}: nhóm việc nổi bật | CareerViet`, desc: first(t.intro), main, crumbs: crumbs.map((c) => ({ name: c.name, href: c.href })), schema: [] }));
  });
}

/* ================= Hub ngành nghề ================= */
const IND_INDEX_TEXT = {
  intro: 'Mỗi thẻ là một ngành, bên trong là các nghề cụ thể. Chọn ngành bạn quan tâm để xem công việc hằng ngày và hướng phát triển.',
  body: [
    'Một ngành nghề thường gồm nhiều vị trí khác nhau, từ người trực tiếp làm việc với khách hàng đến người xử lý số liệu, chứng từ hay vận hành. Việc nhìn theo ngành giúp bạn so sánh các lựa chọn gần nhau trước khi quyết định hướng đi.',
    'Khi tìm hiểu, hãy chú ý tên gọi vị trí có thể khác nhau giữa các công ty dù công việc tương tự. Đọc phần mô tả công việc, yêu cầu về kỹ năng và cách tính thu nhập sẽ cho bạn hình dung rõ hơn so với chỉ đọc tên chức danh.',
    'Người mới nên bắt đầu ở vị trí giúp làm quen quy trình, sau đó chuyên sâu dần. Người đã có kinh nghiệm có thể chuyển sang ngành liên quan nếu có kỹ năng dùng chung. Ở bất kỳ ngành nào, việc nắm quyền lợi trong hợp đồng lao động cũng là bước chuẩn bị quan trọng.',
  ],
};
function industriesPages() {
  {
    const file = 'nganh-nghe/index.html', R = '../';
    const crumbs = [{ name: 'Trang chủ', href: 'index.html' }, { name: 'Việc làm', href: 'viec-lam/index.html' }, { name: 'Ngành nghề' }];
    const main = `${pageHead({ R, crumbs, h1: 'Việc làm theo ngành nghề', lead: IND_INDEX_TEXT.intro, img: ART.jobs })}
<section class="page-sec"><div class="container">
<div class="ind-grid">${INDUSTRIES.map((n, i) => `<a class="ind-card tilt spot" href="${n.slug}.html" data-r="up" style="--i:${i % 3}"><img src="${R}assets/img/${n.icon}.svg" width="60" height="60" alt="" loading="lazy"><h3>${esc(n.name)}</h3><p>${n.jobs.map((j) => esc(j[0])).join(', ')}.</p><span class="more">Xem ngành ${ico.arrow}</span></a>`).join('')}</div>
<div class="read-card" style="margin-top:48px" data-r="up"><h2>Cách chọn ngành nghề</h2>${IND_INDEX_TEXT.body.map((t) => `<p>${esc(t)}</p>`).join('')}</div>
${relatedBlock(related('nganh-nghe'), R)}</div></section>`;
    write(file, layout({ file, title: 'Việc làm theo ngành nghề: 8 ngành phổ biến | CareerViet', desc: 'Thẻ ngành nghề và các vị trí bên trong: kinh doanh, marketing, hành chính, kế toán, công nghệ thông tin, logistics, xây dựng, ngân hàng.', main, crumbs: crumbs.map((c) => ({ name: c.name, href: c.href })) }));
  }
  INDUSTRIES.forEach((n) => {
    const file = `nganh-nghe/${n.slug}.html`, R = '../', t = INDUSTRY_TEXT[n.slug];
    const crumbs = [{ name: 'Trang chủ', href: 'index.html' }, { name: 'Việc làm', href: 'viec-lam/index.html' }, { name: 'Ngành nghề', href: 'nganh-nghe/index.html' }, { name: n.name }];
    const main = `${pageHead({ R, crumbs, h1: `Việc làm ngành ${n.name}`, lead: t.intro, img: { src: n.icon + '.svg', w: 200, h: 200, alt: `Biểu tượng ngành ${n.name}` } }).replace('class="ph-img"', 'class="ph-img" style="width:150px;aspect-ratio:1;border:0;box-shadow:none;border-radius:34px"').replace('data-r="clip"', 'data-r="zoom"')}
<section class="page-sec"><div class="container">
<h2 data-split>Các nghề trong ngành</h2><div class="jobs">${n.jobs.map((j, i) => `<div class="job-card spot" data-r="up" style="--i:${i % 3}"><h3>${esc(j[0])}</h3><p>${esc(j[1])}</p></div>`).join('')}</div>
<div class="hub-grid" style="margin-top:44px"><article class="read-card" data-r="up"><h2>Thông tin ngành ${esc(n.name)}</h2>${t.body.map((x) => `<p>${esc(x)}</p>`).join('')}</article>
<aside class="aside-box" data-r="right"><h3>Ngành nghề khác</h3>${INDUSTRIES.map((x) => `<a href="${x.slug}.html"${x.slug === n.slug ? ' aria-current="page"' : ''}><span>${esc(x.name)}</span></a>`).join('')}</aside></div>
<div class="chips" style="margin-top:34px"><strong style="align-self:center">Xem theo khu vực:</strong>${allRegions.map((r) => `<a class="chip" href="${R}khu-vuc/${r.slug}.html">${esc(r.name)}</a>`).join('')}</div>
${relatedBlock(related(n.slug), R)}${STRIP(R)}</div></section>`;
    write(file, layout({ file, title: `Việc làm ngành ${n.name} | CareerViet`, desc: first(t.intro), main, crumbs: crumbs.map((c) => ({ name: c.name, href: c.href })) }));
  });
}

function jobsOverview() {
  const file = 'viec-lam/index.html', R = '../';
  const crumbs = [{ name: 'Trang chủ', href: 'index.html' }, { name: 'Việc làm' }];
  const main = `${pageHead({ R, crumbs, h1: 'Việc làm theo khu vực và ngành nghề', lead: 'Chọn cách xem phù hợp: theo nơi làm việc hoặc theo nhóm nghề bạn quan tâm.' })}
<section class="page-sec"><div class="container"><div class="vl-grid">
<div class="read-card spot vl-card" data-r="up"><img class="card-art" src="${R}assets/img/banner-3.jpg" width="1882" height="836" alt="Banner tìm việc theo khu vực" loading="lazy"><h2>Theo khu vực</h2><p>Chín thành phố, tỉnh nhóm theo ba miền, mỗi nơi có thông tin về nhóm việc làm nổi bật.</p>${REGIONS.map((g) => `<p class="grp">${esc(g.group)}</p><div class="chips">${g.items.map((r) => `<a class="chip" href="${R}khu-vuc/${r.slug}.html">${esc(r.name)}</a>`).join('')}</div>`).join('')}<p class="vl-go"><a class="btn btn-wine magnetic" href="${R}khu-vuc/index.html">Xem khu vực ${ico.arrow}</a></p></div>
<div class="read-card spot vl-card" data-r="up" style="--i:1"><img class="card-art" src="${R}assets/img/banner-1.jpg" width="1882" height="836" alt="Banner khám phá ngành nghề phù hợp với bạn" loading="lazy"><h2>Theo ngành nghề</h2><p>Tám ngành phổ biến, bên trong là các vị trí cụ thể cùng mô tả công việc.</p><div class="chips">${INDUSTRIES.map((n) => `<a class="chip" href="${R}nganh-nghe/${n.slug}.html">${esc(n.name)}</a>`).join('')}</div><p class="vl-go"><a class="btn btn-wine magnetic" href="${R}nganh-nghe/index.html">Xem ngành nghề ${ico.arrow}</a></p></div></div>
${relatedBlock(related('viec-lam'), R)}</div></section>`;
  write(file, layout({ file, title: 'Việc làm: xem theo khu vực hoặc ngành nghề | CareerViet', desc: 'Chọn xem việc làm theo chín khu vực hoặc tám ngành nghề phổ biến, kèm thông tin các nhóm việc và lưu ý khi ứng tuyển.', main, crumbs: crumbs.map((c) => ({ name: c.name, href: c.href })) }));
}

/* ================= Blog ================= */
function renderBlocks(blocks, R) {
  const toolLink = `<a href="${R}${TOOL}">công cụ tính trợ cấp thôi việc, trợ cấp mất việc làm</a>`;
  const inline = (s) => esc(s).replace(/\{\{tool\}\}/g, toolLink).replace(/\{\{post:([a-z0-9-]+)\}\}/g, (m, slug) => `<a href="${R}blog/${slug}.html">bài "${esc(postBySlug(slug).title)}"</a>`);
  return blocks.map((b) => {
    if (b.p) return `<p>${inline(b.p)}</p>`;
    if (b.h3) return `<h3>${esc(b.h3)}</h3>`;
    if (b.ul) return `<ul>${b.ul.map((x) => `<li>${inline(x)}</li>`).join('')}</ul>`;
    if (b.table) return `<div class="tbl-wrap"><table class="tbl"><thead><tr>${b.table.head.map((h) => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${b.table.rows.map((r) => `<tr>${r.map((c, i) => `<td data-l="${esc(b.table.head[i])}">${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    return '';
  }).join('');
}
function blogIndex() {
  const file = 'blog/index.html', R = '../';
  const crumbs = [{ name: 'Trang chủ', href: 'index.html' }, { name: 'Blog' }];
  const main = `${pageHead({ R, crumbs, h1: 'Quyền lợi khi nghỉ việc và cách tính trợ cấp', lead: 'Các bài viết giải thích trợ cấp thôi việc, trợ cấp mất việc làm và những khoản tiền khi chấm dứt hợp đồng lao động, đối chiếu với Bộ luật Lao động 2019.', img: ART.jobs })}
<section class="page-sec"><div class="container">
<div class="tabs" role="tablist" aria-label="Chủ đề bài viết"><button class="tab" role="tab" type="button" data-tab="all" aria-selected="true">Tất cả</button>${TABS.map((t) => `<button class="tab" role="tab" type="button" data-tab="${t.id}" aria-selected="false">${esc(t.name)}</button>`).join('')}</div>
<div class="cards3">${POSTS.map((p, i) => postCard(p, R, i % 3, `data-tab="${p.tab}"`)).join('')}</div>
</div></section>`;
  write(file, layout({ file, title: 'Blog: trợ cấp thôi việc, mất việc làm, quyền lợi khi nghỉ việc | CareerViet', desc: 'Bài viết về trợ cấp thôi việc, trợ cấp mất việc làm, các khoản tiền khi nghỉ việc và cách đơn phương chấm dứt hợp đồng lao động.', main, crumbs: crumbs.map((c) => ({ name: c.name, href: c.href })) }));
}
function postPage(p) {
  const file = `blog/${p.slug}.html`, R = '../';
  const crumbs = [{ name: 'Trang chủ', href: 'index.html' }, { name: 'Blog', href: 'blog/index.html' }, { name: p.title }];
  const sameTab = POSTS.filter((x) => x.slug !== p.slug && x.tab === p.tab), others = POSTS.filter((x) => x.slug !== p.slug && x.tab !== p.tab);
  const rel = sameTab.concat(others).slice(0, 3);
  const toc = p.sections.map((s, i) => `<li><a href="#s${i + 1}">${esc(s.h2)}</a></li>`).join('');
  const body = p.sections.map((s, i) => `<h2 id="s${i + 1}">${esc(s.h2)}</h2>${renderBlocks(s.blocks, R)}`).join('');
  const main = `${pageHead({ R, crumbs, h1: p.title, img: { src: p.cover + '.jpg', w: 800, h: 500, alt: 'Minh họa cho bài ' + p.title } })}
<section class="page-sec"><div class="container"><div class="art-grid">
<nav class="toc" aria-label="Mục lục"><button class="toc-toggle" type="button" aria-expanded="false">Mục lục ${ico.chev}</button><h2>Mục lục</h2><ol><span class="toc-ind"></span>${toc}</ol></nav>
<article class="art">
<p class="art-meta"><span>Tác giả: <b>CareerViet</b></span><span>Cập nhật: <b>${viDate(SITE.updated)}</b></span><span>${p.read} phút đọc</span></p>
<div class="summary"><h2>Tóm tắt</h2><ul>${p.summary.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
<div class="prose">${body}</div>
<aside class="callout"><strong>Muốn tính thử?</strong> Dùng <a href="${R}${TOOL}">công cụ tính trợ cấp thôi việc, trợ cấp mất việc làm</a>: nhập thời gian làm việc và lương bình quân, kết quả hiện ngay.</aside>
<section class="sources" aria-labelledby="src"><h2 id="src">Nguồn tham khảo</h2><ul>${p.sources.map((x) => `<li>${esc(x)}</li>`).join('')}</ul><p>Đối chiếu ngày ${CHECKED}.</p></section>
</article></div>
${relatedBlock(rel, R, 'Bài liên quan')}</div></section>`;
  write(file, layout({
    file, title: `${p.title} | CareerViet`.replace(/(.{70}).*(\|.*)/, '$1…$2'), desc: p.desc, main, crumbs: crumbs.map((c) => ({ name: c.name, href: c.href })),
    schema: [{ '@type': 'Article', headline: p.title, description: p.desc, inLanguage: 'vi', datePublished: p.published, dateModified: SITE.updated, author: { '@type': 'Organization', name: SITE.name }, publisher: { '@type': 'Organization', name: SITE.name }, mainEntityOfPage: url(file) }],
  }));
}

/* ================= Công cụ ================= */
const FAQ = [
  ['Trợ cấp thôi việc và trợ cấp mất việc làm khác nhau thế nào?', 'Trợ cấp thôi việc (Điều 46) trả nửa tháng tiền lương cho mỗi năm làm việc khi hợp đồng chấm dứt thuộc các trường hợp luật quy định. Trợ cấp mất việc làm (Điều 47) trả một tháng tiền lương cho mỗi năm, thấp nhất hai tháng lương, khi người lao động mất việc vì doanh nghiệp thay đổi cơ cấu, công nghệ, lý do kinh tế hoặc các trường hợp ở Điều 43. Hai khoản này đều do người sử dụng lao động trả.'],
  ['Phải làm việc bao lâu mới được nhận trợ cấp?', 'Người lao động cần làm việc thường xuyên cho người sử dụng lao động từ đủ 12 tháng trở lên. Dưới mốc này, công cụ sẽ báo không thuộc diện.'],
  ['Tháng lẻ được tính như thế nào?', 'Thời gian tính theo năm đủ 12 tháng. Phần tháng lẻ ít hơn hoặc bằng 06 tháng tính là 1/2 năm, trên 06 tháng tính là 1 năm (điểm c khoản 3 Điều 8 Nghị định 145/2020/NĐ-CP).'],
  ['Thời gian đã đóng bảo hiểm thất nghiệp có bị trừ không?', 'Có. Thời gian tính trợ cấp là tổng thời gian làm việc thực tế cho người sử dụng lao động, trừ thời gian đã tham gia bảo hiểm thất nghiệp và thời gian đã được trả trợ cấp thôi việc, trợ cấp mất việc làm. Hãy nhập các khoảng này ở hai ô tương ứng trong công cụ.'],
  ['Tiền lương dùng để tính là lương nào?', 'Là tiền lương bình quân của 06 tháng liền kề theo hợp đồng lao động, trước khi người lao động thôi việc hoặc mất việc làm. Bạn có thể nhập thẳng mức bình quân hoặc nhập lương của từng tháng trong sáu tháng để công cụ tự chia trung bình.'],
  ['Ai là người trả trợ cấp?', 'Người sử dụng lao động, tức đơn vị đã ký hợp đồng lao động với bạn. Các khoản thanh toán khi chấm dứt hợp đồng phải được hoàn tất trong 14 ngày làm việc, một số trường hợp đặc biệt có thể kéo dài nhưng không quá 30 ngày (Điều 48 Bộ luật Lao động 2019).'],
  ['Công cụ có lưu số liệu tôi nhập không?', 'Không. Mọi phép tính chạy ngay trong trình duyệt của bạn; số liệu không được lưu và không được gửi đi đâu, cũng không cần email hay đăng ký.'],
];
function toolPage() {
  const file = TOOL, R = '../';
  const crumbs = [{ name: 'Trang chủ', href: 'index.html' }, { name: 'Công cụ', href: TOOL }, { name: TOOL_NAME }];
  const ex1 = Calc.calc({ type: 'thoi-viec', situation: 'eligible', totalMonths: 63, avgSalary: 12000000 });
  const ex2 = Calc.calc({ type: 'mat-viec', totalMonths: 96, unemploymentMonths: 36, avgSalary: 15000000 });
  const fld = (id, unit, lab) => `<div class="inp u"><input id="${id}" type="text" inputmode="numeric" autocomplete="off" maxlength="3" placeholder="0" aria-label="${lab}"><span class="u-t">${unit}</span></div>`;
  const rel = [POSTS[0], POSTS[1], POSTS[2]];
  const main = `${pageHead({ R, crumbs, h1: TOOL_NAME, lead: 'Nhập thời gian làm việc và tiền lương bình quân, kết quả hiện ngay theo Bộ luật Lao động 2019 và Nghị định 145/2020/NĐ-CP. Không cần đăng ký.', img: ART.calc })}
<section class="page-sec"><div class="container">
<div class="tool-grid">
<form class="panel" id="sev-form" novalidate data-r="up">
<div class="seg" data-v="thoi-viec" role="group" aria-label="Loại trợ cấp"><button type="button" data-v="thoi-viec" aria-pressed="true">Trợ cấp thôi việc</button><button type="button" data-v="mat-viec" aria-pressed="false">Trợ cấp mất việc làm</button></div>
<div class="fld" id="sit-wrap"><label for="situation">Lý do chấm dứt hợp đồng lao động</label><select id="situation">
<option value="eligible">Hết hạn hợp đồng, hoàn thành công việc, hai bên thỏa thuận hoặc một bên đơn phương chấm dứt đúng quy định</option>
<option value="luong-huu">Người lao động đã đủ điều kiện hưởng lương hưu</option>
<option value="bo-viec">Người lao động tự ý bỏ việc từ 05 ngày làm việc liên tục trở lên, không có lý do chính đáng</option>
<option value="sa-thai">Bị xử lý kỷ luật sa thải</option>
<option value="trai-luat">Người lao động đơn phương chấm dứt hợp đồng trái pháp luật</option></select></div>
<p class="hint" id="mv-hint" hidden>Chọn khi bạn mất việc vì doanh nghiệp thay đổi cơ cấu, thay đổi công nghệ, lý do kinh tế, hoặc chia, tách, hợp nhất, sáp nhập, chuyển đổi doanh nghiệp (Điều 42, Điều 43).</p>
<div class="fld"><span class="lab">Tổng thời gian làm việc cho người sử dụng lao động</span><span class="hint">Tính từ ngày bắt đầu làm việc đến ngày chấm dứt hợp đồng.</span><div class="pair">${fld('t-y', 'năm', 'Số năm làm việc')}${fld('t-m', 'tháng', 'Số tháng lẻ làm việc')}</div></div>
<div class="fld"><span class="lab">Thời gian đã tham gia bảo hiểm thất nghiệp</span><span class="hint">Để trống nếu không có.</span><div class="pair">${fld('b-y', 'năm', 'Số năm tham gia bảo hiểm thất nghiệp')}${fld('b-m', 'tháng', 'Số tháng lẻ tham gia bảo hiểm thất nghiệp')}</div></div>
<div class="fld"><span class="lab">Thời gian đã được trả trợ cấp thôi việc hoặc mất việc làm</span><span class="hint">Chỉ nhập nếu trước đây bạn đã nhận một khoản trợ cấp từ cùng người sử dụng lao động.</span><div class="pair">${fld('p-y', 'năm', 'Số năm đã được trả trợ cấp')}${fld('p-m', 'tháng', 'Số tháng lẻ đã được trả trợ cấp')}</div></div>
<div class="fld"><span class="lab">Tiền lương bình quân 6 tháng liền kề</span><div class="sal-mode"><button type="button" data-m="avg" aria-pressed="true">Nhập mức bình quân</button><button type="button" data-m="six" aria-pressed="false">Nhập từng tháng</button></div>
<div id="sal-avg"><div class="inp u"><input id="s-avg" class="money" type="text" inputmode="numeric" autocomplete="off" placeholder="Ví dụ: 12.000.000" aria-label="Tiền lương bình quân mỗi tháng"><span class="u-t">đồng</span></div></div>
<div id="sal-six" hidden><div class="six">${[1, 2, 3, 4, 5, 6].map((i) => `<div><label for="s-${i}">Tháng ${i}</label><div class="inp"><input id="s-${i}" class="money" type="text" inputmode="numeric" autocomplete="off" placeholder="0"></div></div>`).join('')}</div><p class="hint" id="six-avg" style="margin-top:8px"></p></div></div>
<p class="err" id="sev-err" role="alert"></p>
<button class="btn btn-line btn-sm" type="button" id="sev-reset">Đặt lại</button>
</form>
<div class="tool-side" data-r="right"><aside class="res" aria-live="polite"><h2 id="res-title">Trợ cấp thôi việc ước tính</h2>
<p class="res-empty" id="res-empty">Nhập thời gian làm việc và tiền lương để xem kết quả ngay.</p>
<div id="res-body" hidden><div class="res-amt"><span class="odo" id="res-amt" role="text"></span><small id="res-unit">đồng</small></div>
<div class="bar" aria-hidden="true"><i class="b1"></i><i class="b2"></i><i class="b3"></i></div>
<div class="legend" aria-hidden="true"><span style="--c:var(--rose)">Bảo hiểm thất nghiệp</span><span style="--c:var(--copper)">Đã được trả trợ cấp</span><span style="--c:var(--gold)">Thời gian tính trợ cấp</span></div>
<dl id="res-rows"></dl><p class="res-note" id="res-note" hidden></p></div></aside>
<div class="prep"><h2>Chuẩn bị trước khi tính</h2><ul><li>Hợp đồng lao động và các phụ lục, để biết ngày bắt đầu và ngày chấm dứt.</li><li>Bảng lương 6 tháng liền kề cuối cùng.</li><li>Thông tin thời gian đã tham gia bảo hiểm thất nghiệp, xem trong sổ bảo hiểm xã hội.</li><li>Quyết định hoặc thông báo chấm dứt hợp đồng, để xác định đúng lý do.</li></ul></div></div>
</div>

<div class="read-card" style="margin-top:48px" data-r="up"><h2>Cách tính và căn cứ pháp lý</h2>
<p>Hai khoản trợ cấp đều dựa trên ba dữ kiện: thời gian làm việc được tính, tiền lương bình quân 6 tháng liền kề theo hợp đồng lao động và mức hưởng theo từng năm.</p>
<div class="formula"><div class="fbox"><h3>Trợ cấp thôi việc (Điều 46)</h3><code>Tiền trợ cấp = 1/2 × số năm tính trợ cấp × tiền lương bình quân</code></div><div class="fbox"><h3>Trợ cấp mất việc làm (Điều 47)</h3><code>Tiền trợ cấp = 1 × số năm tính trợ cấp × tiền lương bình quân, thấp nhất bằng 2 tháng lương</code></div></div>
<ul><li><strong>Điều kiện:</strong> làm việc thường xuyên cho người sử dụng lao động từ đủ 12 tháng trở lên.</li>
<li><strong>Thời gian tính trợ cấp:</strong> tổng thời gian làm việc thực tế, trừ thời gian đã tham gia bảo hiểm thất nghiệp và thời gian đã được trả trợ cấp thôi việc, trợ cấp mất việc làm.</li>
<li><strong>Tháng lẻ:</strong> ít hơn hoặc bằng 06 tháng tính 1/2 năm; trên 06 tháng tính 1 năm.</li>
<li><strong>Tiền lương:</strong> bình quân của 06 tháng liền kề theo hợp đồng lao động trước khi thôi việc hoặc mất việc làm.</li>
<li><strong>Không được trợ cấp thôi việc:</strong> người lao động đã đủ điều kiện hưởng lương hưu; tự ý bỏ việc từ 05 ngày làm việc liên tục trở lên không có lý do chính đáng; không thuộc các trường hợp ở Điều 46 như bị sa thải hoặc đơn phương chấm dứt trái pháp luật.</li></ul>
<p><strong>Căn cứ:</strong> ${esc(LAW_SRC.blld)}: Điều 34, 42, 43, 46, 47, 48. ${esc(LAW_SRC.nd145)}: Điều 8.</p></div>

<h2 style="margin-top:48px" data-split>Ví dụ minh họa</h2>
<div class="ex" data-r="up"><h3>Ví dụ 1: trợ cấp thôi việc</h3><ol><li>Làm việc 5 năm 3 tháng (63 tháng), không có thời gian bảo hiểm thất nghiệp, lương bình quân 12.000.000 đồng.</li><li>Phần dư 3 tháng tính 0,5 năm, nên thời gian tính trợ cấp là ${dec(ex1.years)} năm.</li><li>Tiền trợ cấp = 0,5 × ${dec(ex1.years)} × 12.000.000 = <strong>${money(ex1.amount)} đồng</strong>.</li></ol></div>
<div class="ex" data-r="up"><h3>Ví dụ 2: trợ cấp mất việc làm</h3><ol><li>Làm việc 8 năm (96 tháng), trong đó 3 năm đã tham gia bảo hiểm thất nghiệp, lương bình quân 15.000.000 đồng.</li><li>Thời gian tính trợ cấp: 96 − 36 = 60 tháng, tức ${dec(ex2.years)} năm.</li><li>Tiền trợ cấp = 1 × ${dec(ex2.years)} × 15.000.000 = <strong>${money(ex2.amount)} đồng</strong>, cao hơn mức thấp nhất 2 tháng lương nên giữ nguyên.</li></ol></div>

<h2 style="margin-top:48px" data-split>Câu hỏi thường gặp</h2>
<div class="faq">${FAQ.map(([q, a]) => `<details data-r="up"><summary>${esc(q)}</summary><div class="ans"><div>${esc(a)}</div></div></details>`).join('')}</div>

<div class="disc"><strong>Lưu ý:</strong> kết quả mang tính tham khảo theo mức tối thiểu của pháp luật. Hợp đồng lao động, thỏa ước lao động tập thể hoặc quy chế của doanh nghiệp có thể quy định mức cao hơn. Với tình huống cụ thể, hãy trao đổi với người sử dụng lao động hoặc cơ quan quản lý lao động.</div>
${relatedBlock(rel, R)}</div></section>`;
  write(file, layout({
    file, title: `${TOOL_NAME} | CareerViet`, desc: 'Công cụ tính trợ cấp thôi việc và trợ cấp mất việc làm theo Bộ luật Lao động 2019: nhập thời gian làm việc và lương bình quân, có kết quả ngay, không cần đăng ký.',
    main, crumbs: crumbs.map((c) => ({ name: c.name, href: c.href })), bodyClass: 'tool',
    schema: [
      { '@type': 'WebApplication', name: TOOL_NAME, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', inLanguage: 'vi', offers: { '@type': 'Offer', price: '0', priceCurrency: 'VND' } },
      { '@type': 'FAQPage', mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    ],
  }));
}

/* ================= Trang thông tin ================= */
function aboutPage() {
  const file = 'gioi-thieu.html', R = '';
  const crumbs = [{ name: 'Trang chủ', href: 'index.html' }, { name: 'Giới thiệu' }];
  const main = `${pageHead({ R, crumbs, h1: 'Giới thiệu CareerViet', lead: 'Website thông tin dành cho người đang tìm việc và người đang đi làm.', img: ART.office })}
<section class="page-sec"><div class="container">
<div class="hub-grid"><div class="read-card" data-r="up"><h2>Website này có gì</h2>
<p>CareerViet là nền tảng tuyển dụng trực tuyến kết nối ứng viên và nhà tuyển dụng, do ${esc(SITE.legal)} vận hành. Website này tổng hợp ba nhóm nội dung: việc làm theo khu vực và ngành nghề, bài viết về quyền lợi người lao động, và công cụ tính trợ cấp thôi việc, trợ cấp mất việc làm.</p>
<p>Các bài viết về pháp luật lao động được viết dựa trên Bộ luật Lao động 2019 và Nghị định 145/2020/NĐ-CP, ghi rõ điều khoản ở cuối bài. Tác giả các bài viết là CareerViet.</p>
<h2>Con số về CareerViet</h2><div class="stats"><div class="stat"><div class="odo" data-odo="${SITE.members}"></div><p>thành viên</p></div><div class="stat"><div class="odo" data-odo="${SITE.companies}"></div><p>doanh nghiệp</p></div></div></div>
<aside class="aside-box aside-top"><h3>Đi nhanh tới</h3><a href="khu-vuc/index.html"><span>Việc làm theo khu vực</span></a><a href="nganh-nghe/index.html"><span>Việc làm theo ngành nghề</span></a><a href="blog/index.html"><span>Blog</span></a><a href="${TOOL}"><span>Công cụ tính trợ cấp</span></a><a href="lien-he.html"><span>Liên hệ</span></a></aside></div>
</div></section>`;
  write(file, layout({ file, title: 'Giới thiệu CareerViet | CareerViet', desc: 'CareerViet là nền tảng tuyển dụng trực tuyến. Website cung cấp thông tin việc làm theo khu vực, ngành nghề, bài viết quyền lợi lao động và công cụ tính trợ cấp.', main, crumbs: crumbs.map((c) => ({ name: c.name, href: c.href })), schema: [{ '@type': 'AboutPage', name: 'Giới thiệu CareerViet' }] }));
}
function contactPage() {
  const file = 'lien-he.html', R = '';
  const crumbs = [{ name: 'Trang chủ', href: 'index.html' }, { name: 'Liên hệ' }];
  const main = `${pageHead({ R, crumbs, h1: 'Liên hệ CareerViet', lead: 'Gọi điện, gửi email hoặc đến trực tiếp văn phòng tại TP. Hồ Chí Minh và Hà Nội.', img: ART.office })}
<section class="page-sec"><div class="container"><div class="contact-cards" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr))">
<div class="ccard spot" data-r="up"><h3>${esc(SITE.hcm.label)}</h3><p>${esc(SITE.hcm.addr)}</p><p><a href="tel:${SITE.hcm.telHref}">${esc(SITE.hcm.tel)}</a></p></div>
<div class="ccard spot" data-r="up" style="--i:1"><h3>${esc(SITE.hn.label)}</h3><p>${esc(SITE.hn.addr)}</p><p><a href="tel:${SITE.hn.telHref}">${esc(SITE.hn.tel)}</a></p></div>
<div class="ccard spot" data-r="up" style="--i:2"><h3>Email</h3><p>Gửi câu hỏi hoặc góp ý qua email.</p><p><a href="mailto:${SITE.email}">${esc(SITE.email)}</a></p></div></div>
${STRIP(R)}</div></section>`;
  write(file, layout({ file, title: 'Liên hệ CareerViet: địa chỉ, điện thoại, email', desc: 'Thông tin liên hệ CareerViet: trụ sở tại TP. Hồ Chí Minh, văn phòng Hà Nội, số điện thoại và email.', main, crumbs: crumbs.map((c) => ({ name: c.name, href: c.href })), schema: [{ '@type': 'ContactPage', name: 'Liên hệ CareerViet' }] }));
}
function policyPage() {
  const file = 'chinh-sach.html', R = '';
  const crumbs = [{ name: 'Trang chủ', href: 'index.html' }, { name: 'Chính sách' }];
  const main = `${pageHead({ R, crumbs, h1: 'Chính sách và điều khoản sử dụng', lead: 'Cách website xử lý dữ liệu và phạm vi sử dụng nội dung.', img: ART.jobs })}
<section class="page-sec"><div class="container"><div class="hub-grid"><div class="read-card doc" data-r="up">
<h2 id="rieng-tu">Quyền riêng tư</h2>
<p>Website không yêu cầu đăng ký và không yêu cầu email để xem nội dung hay dùng công cụ. Công cụ tính trợ cấp chạy hoàn toàn trong trình duyệt của bạn: số liệu về thời gian làm việc và tiền lương bạn nhập không được lưu và không được gửi đi.</p>
<p>Website không đặt cookie theo dõi. Để chạy hiệu ứng chuyển trang, trình duyệt có thể ghi một giá trị tạm thời trong bộ nhớ phiên của thẻ đang mở; giá trị này không chứa thông tin cá nhân và tự mất khi bạn đóng thẻ.</p>
<h2 id="pham-vi">Phạm vi nội dung</h2>
<p>Nội dung về việc làm, ngành nghề và khu vực mang tính giới thiệu chung. Các bài viết và công cụ về trợ cấp dựa trên Bộ luật Lao động 2019 và Nghị định 145/2020/NĐ-CP, có tính chất tham khảo và không thay thế tư vấn pháp lý cho từng trường hợp cụ thể. Khi cần xác định quyền lợi chính xác, hãy trao đổi với người sử dụng lao động hoặc cơ quan quản lý lao động.</p>
<h2 id="dieu-khoan">Điều khoản sử dụng</h2>
<p>Bạn được xem và dùng công cụ miễn phí cho mục đích cá nhân. Vui lòng không sao chép toàn bộ nội dung website để đăng lại khi chưa có sự đồng ý của CareerViet.</p>
<h2 id="lien-he">Liên hệ</h2>
<p>Mọi thắc mắc về chính sách, vui lòng gửi tới <a href="mailto:${SITE.email}">${esc(SITE.email)}</a> hoặc xem trang <a href="lien-he.html">Liên hệ</a>.</p>
</div><aside class="aside-box aside-top" data-r="right"><h3>Nội dung chính sách</h3><a href="#rieng-tu"><span>Quyền riêng tư</span></a><a href="#pham-vi"><span>Phạm vi nội dung</span></a><a href="#dieu-khoan"><span>Điều khoản sử dụng</span></a><a href="#lien-he"><span>Liên hệ</span></a></aside></div></div></section>`;
  write(file, layout({ file, title: 'Chính sách và điều khoản sử dụng | CareerViet', desc: 'Chính sách quyền riêng tư, phạm vi nội dung và điều khoản sử dụng website CareerViet; công cụ tính trợ cấp không lưu số liệu bạn nhập.', main, crumbs: crumbs.map((c) => ({ name: c.name, href: c.href })) }));
}
function notFound() {
  const file = '404.html';
  const main = `<section class="nf"><div class="container" data-r="zoom"><strong>404</strong><h1>Không tìm thấy trang</h1><p>Đường dẫn bạn mở không tồn tại hoặc đã được đổi.</p><p><a class="btn btn-wine" href="index.html">Về trang chủ ${ico.arrow}</a> <a class="btn btn-line" href="blog/index.html">Xem blog</a></p></div></section>`;
  write(file, layout({ file, title: 'Không tìm thấy trang | CareerViet', desc: 'Trang bạn tìm không tồn tại. Quay lại trang chủ hoặc xem blog CareerViet.', main, noindex: true }), false);
}

function meta() {
  const idx = pages.filter((p) => p.indexable);
  fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${idx.map((p) => `  <url><loc>${url(p.file)}</loc></url>`).join('\n')}\n</urlset>\n`);
  fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n${BASE ? `Sitemap: ${BASE}/sitemap.xml\n` : ''}`);
}

home(); jobsOverview(); regionsPages(); industriesPages(); blogIndex(); POSTS.forEach(postPage); toolPage(); aboutPage(); contactPage(); policyPage(); notFound(); meta();
console.log(pages.length + ' trang HTML, ' + pages.filter((p) => p.indexable).length + ' trang index được');









