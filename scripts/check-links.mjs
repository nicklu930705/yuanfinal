// 檢查程式碼裡手寫的商品編號（首頁小卡、輪播、Hero 等）是否都對得上真正的商品，避免點進去「商品不存在」。
// 用法：npm run check:links
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
let products;
try {
  ({ products } = await server.ssrLoadModule('/src/data/store.ts'));
} finally {
  await server.close();
}

const ids = new Set(products.map((p) => p.id));
// HeroOrbit 用來挑圖片的別名，程式會換成真正的醫療感染袋商品編號後才產生連結
const ALIASES = new Set(['01_清潔袋-04_醫療感染性廢棄物袋-封面', '01_清潔袋-04_醫療感染性廢棄物袋-規格']);
const specIds = new Set(products.flatMap((p) => p.specs.map((s) => s.id)));

const files = [];
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|jsx?)$/.test(f) && !/store\.ts$|addedProducts\.ts$|erpProductMapping\.ts$/.test(f)) files.push(p);
  }
};
walk('src');

// 商品編號格式：0X_大類-0X_小類-品項（不含 / 的字串）
const ID_RE = /['"`](0\d_[^'"`/\s]+-\d\d_[^'"`/\s]+-[^'"`/\s]+)['"`]/g;
const LINK_RE = /\/products\/([^'"`?\s$]+)/g;
const errors = [];
let count = 0;
for (const f of files) {
  const src = readFileSync(f, 'utf8');
  for (const m of src.matchAll(ID_RE)) {
    count++;
    if (!ids.has(m[1]) && !specIds.has(m[1]) && !ALIASES.has(m[1])) errors.push(`${f}: 找不到商品編號 ${m[1]}`);
  }
  for (const m of src.matchAll(LINK_RE)) {
    if (m[1].startsWith('${')) continue; // 程式產生的連結
    count++;
    const id = decodeURIComponent(m[1]);
    if (!ids.has(id)) errors.push(`${f}: 連結 /products/${id} 找不到商品`);
  }
}
console.log(`檢查 ${files.length} 個檔案、${count} 個手寫商品編號／連結`);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('連結檢查通過');
