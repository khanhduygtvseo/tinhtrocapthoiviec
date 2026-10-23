// Tải font về lưu trong site (không gọi dịch vụ ngoài khi chạy). Chạy: node tools/get-fonts.js
const fs = require('fs');
const path = require('path');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const FAMILIES = [
  { name: 'Be Vietnam Pro', q: 'family=Be+Vietnam+Pro:wght@400;500;600;700;800', file: 'BeVietnamPro' },
];
const keep = ['vietnamese', 'latin', 'latin-ext'];
(async () => {
  const root = path.join(__dirname, '..', 'assets');
  fs.mkdirSync(path.join(root, 'fonts'), { recursive: true });
  let css = '';
  for (const f of FAMILIES) {
    const res = await fetch(`https://fonts.googleapis.com/css2?${f.q}&display=swap`, { headers: { 'User-Agent': UA } });
    const text = await res.text();
    const blocks = text.split('/* ').slice(1);
    for (const b of blocks) {
      const subset = b.split(' */')[0].trim();
      if (!keep.includes(subset)) continue;
      const url = b.match(/url\((https:[^)]+\.woff2)\)/)[1];
      const style = b.match(/font-style:\s*(\w+)/)[1];
      const weight = b.match(/font-weight:\s*([\d ]+);/)[1].trim();
      const range = b.match(/unicode-range:\s*([^;]+);/)[1];
      const fname = `${f.file}-${style === 'italic' ? 'Italic-' : ''}${weight.replace(/ /g, '-')}-${subset}.woff2`;
      const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
      fs.writeFileSync(path.join(root, 'fonts', fname), buf);
      css += `@font-face{font-family:'${f.name}';font-style:${style};font-weight:${weight};font-display:swap;src:url('../fonts/${fname}') format('woff2');unicode-range:${range};}\n`;
      console.log(fname, buf.length);
    }
  }
  fs.mkdirSync(path.join(root, 'css'), { recursive: true });
  fs.writeFileSync(path.join(root, 'css', 'fonts.css'), css);
})();

