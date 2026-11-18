// 檢查 src/data/erpProductMapping.ts 與商品資料是否一致，並確認每張商品圖片都存在。
// 用法：npm run check:erp-mapping
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const errors = [];
try {
  const { products } = await server.ssrLoadModule('/src/data/store.ts');
  const { erpProductMappings } = await server.ssrLoadModule('/src/data/erpProductMapping.ts');

  const byId = new Map(products.map((p) => [p.id, p]));
  const seenSku = new Set();
  const seenSpec = new Set();

  for (const row of erpProductMappings) {
    const product = byId.get(row.websiteProductId);
    if (!product) {
      errors.push(`找不到商品 ${row.websiteProductId}（${row.erpSku ?? row.websiteName}）`);
      continue;
    }
    if (row.websiteSpecId && !product.specs.some((s) => s.id === row.websiteSpecId)) {
      errors.push(`商品 ${row.websiteProductId} 沒有規格 ${row.websiteSpecId}（${row.erpSku ?? row.websiteName}）`);
    }
    if (row.erpSku) {
      if (seenSku.has(row.erpSku)) errors.push(`ERP 品號重複：${row.erpSku}`);
      seenSku.add(row.erpSku);
    }
    const specKey = `${row.websiteProductId}|${row.websiteSpecId ?? ''}`;
    if (seenSpec.has(specKey)) errors.push(`官網規格重複對照：${specKey}`);
    seenSpec.add(specKey);
  }

  // 每個官網規格（或無規格商品）都應該出現在對照表
  for (const p of products) {
    const keys = p.specs.length ? p.specs.map((s) => `${p.id}|${s.id}`) : [`${p.id}|`];
    for (const k of keys) if (!seenSpec.has(k)) errors.push(`對照表缺少官網規格：${k}`);
  }

  // 商品圖片檔案都要存在
  for (const p of products) {
    const imgs = [...p.images, ...p.shared_images, ...p.specs.flatMap((s) => s.images)];
    for (const img of imgs) {
      if (!existsSync(join('public', decodeURI(img.path)))) errors.push(`圖片不存在：${img.path}（${p.id}）`);
    }
  }

  console.log(`對照 ${erpProductMappings.length} 筆，ERP 品號 ${seenSku.size} 個，官網商品 ${products.length} 項`);
} finally {
  await server.close();
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('對照檢查通過');
