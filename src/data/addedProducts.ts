import type { Product, ProductSpec } from './store';

/**
 * 2026-11 對照 ERP 成本單後補上的商品。
 * 規格只寫成本單或實拍圖上看得到的資料，不知道的欄位一律省略（畫面上不顯示）。
 * 「規格圖」右側用真實商品照片（白底、已去掉來源網站的標記）。營潔卷裝耐熱袋 7 種共用六兩那捲的實拍照，規格文字各自依成本單。
 * 每個規格對應的 ERP 品號見 erpProductMapping.ts。
 */

const img = (path: string, role = '示意圖') => [{ role, path, note: role === '示意圖' ? '依網站風格繪製之示意圖，非實拍' : '', order: 0 }];

const colorSpec = (
  base: string,
  key: string,
  size: string,
  label: string,
  extra: Partial<ProductSpec> = {},
): ProductSpec => ({ id: `${base}-${key}`, size, label, barcode: '', images: [], ...extra });

// ---------- 清潔袋 ----------

const BAG_15L = '01_清潔袋-01_一般捲取式-小_15L';
const BAG_91 = '01_清潔袋-03_抽取式與業務用-業務用超特大_10張';
const BAG_84 = '01_清潔袋-03_抽取式與業務用-業務用_84x102cm';
const ECO_90 = '01_清潔袋-05_環保清潔袋-超大_90L_28mic';

const cleaningBags: Product[] = [
  {
    id: BAG_15L,
    categoryId: '01_清潔袋',
    subcategoryId: '01_一般捲取式',
    name: '台塑清潔袋｜小型 15L',
    originalName: '小_15L',
    description: '一般捲取式同系列的小型規格，平底封口設計，適合家庭、辦公室的小型垃圾桶使用。',
    images: img('/assets/01_清潔袋/01_一般捲取式/小_15L/規格圖__小15L.png', '規格圖'),
    specs: [
      colorSpec(BAG_15L, 'pink', '小', '粉色', { dimensions: [43, 56], sheets_per_box: 72 }),
      colorSpec(BAG_15L, 'black', '小', '黑色', { dimensions: [43, 56], sheets_per_box: 72 }),
      colorSpec(BAG_15L, 'transparent', '小', '透明', { dimensions: [43, 56], sheets_per_box: 72 }),
    ],
    shared_images: [],
    parsedSpec: null,
  },
  {
    id: BAG_91,
    categoryId: '01_清潔袋',
    subcategoryId: '03_抽取式與業務用',
    name: '台塑抽取清潔袋(業務用)｜超特大 91×110cm',
    originalName: '業務用超特大_10張',
    description: '實心單張抽取式，業務用超特大尺寸，每捲 10 張，適合營業場所、工地等大量垃圾收集。',
    images: [
      {
        role: '規格圖',
        path: '/assets/01_清潔袋/03_抽取式與業務用/業務用超特大_10張/規格圖_單位待確認__IMG_0227.JPG',
        note: '圖左文字誤寫 91*110mm，包裝實際為 91×110cm',
        order: 0,
      },
    ],
    specs: [
      colorSpec(BAG_91, 'black', '超特大', '黑色', { dimensions: [91, 110], sheets_per_box: 10 }),
      colorSpec(BAG_91, 'transparent', '超特大', '透明', { dimensions: [91, 110], sheets_per_box: 10 }),
    ],
    shared_images: [],
    parsedSpec: null,
  },
  {
    id: BAG_84,
    categoryId: '01_清潔袋',
    subcategoryId: '03_抽取式與業務用',
    name: '台塑清潔袋(業務用)｜84×102cm 透明',
    originalName: '業務用_84x102cm',
    description: '業務用大尺寸清潔袋，84×102cm，透明款。每捲張數請洽專人確認。',
    images: img('/assets/01_清潔袋/03_抽取式與業務用/業務用_84x102cm/規格圖__84x102cm透明.png', '規格圖'),
    specs: [colorSpec(BAG_84, 'transparent', '業務用', '透明', { dimensions: [84, 102] })],
    shared_images: [],
    parsedSpec: null,
  },
  {
    id: ECO_90,
    categoryId: '01_清潔袋',
    subcategoryId: '05_環保清潔袋',
    name: '環保清潔袋｜超大型 90L 28mic',
    originalName: '超大_90L_28mic',
    description: '超大型 90L 環保清潔袋，厚度 28mic，透明款。每捲張數請洽專人確認。',
    images: img('/assets/01_清潔袋/05_環保清潔袋/超大_90L_28mic/規格圖__環保清潔袋90L.png', '規格圖'),
    specs: [colorSpec(ECO_90, 'transparent', '超大 90L', '透明')],
    shared_images: [],
    parsedSpec: null,
  },
];

// ---------- 營潔耐熱袋 ----------

interface HeatBag { key: string; type: string; dim: string; qty: number }

// 平板式（包裝）：四兩已在舊資料中，這裡補其他尺寸
const flatHeatBags: HeatBag[] = [
  { key: '六兩裝_18.5x23cm', type: '六兩裝', dim: '18.5x23cm', qty: 255 },
  { key: '半斤裝_22x27cm', type: '半斤裝', dim: '22x27cm', qty: 183 },
  { key: '1斤裝_24x31cm', type: '1斤裝', dim: '24x31cm', qty: 146 },
  { key: '2斤裝_28x39cm', type: '2斤裝', dim: '28x39cm', qty: 99 },
  { key: '3斤裝_32x43cm', type: '3斤裝', dim: '32x43cm', qty: 79 },
  { key: '5斤裝_35x50cm', type: '5斤裝', dim: '35x50cm', qty: 52 },
  { key: '10斤裝_45x62cm', type: '10斤裝', dim: '45x62cm', qty: 26 },
  { key: '15斤裝_48x65cm', type: '15斤裝', dim: '48x65cm', qty: 22 },
];

const rollHeatBags: HeatBag[] = [
  { key: '四兩_15.5x19.5cm', type: '四兩', dim: '15.5x19.5cm', qty: 1822 },
  { key: '六兩_18.5x23cm', type: '六兩', dim: '18.5x23cm', qty: 1275 },
  { key: '半斤_22x27cm', type: '半斤', dim: '22x27cm', qty: 897 },
  { key: '1斤_24x31cm', type: '1斤', dim: '24x31cm', qty: 708 },
  { key: '2斤_28x39cm', type: '2斤', dim: '28x39cm', qty: 472 },
  { key: '3斤_32x43cm', type: '3斤', dim: '32x43cm', qty: 367 },
  { key: '5斤_35x50cm', type: '5斤', dim: '35x50cm', qty: 236 },
];

const heatBags: Product[] = [
  ...flatHeatBags.map((b): Product => ({
    id: `02_食品保鮮耐熱袋-02_營潔平板式耐熱袋-${b.key}`,
    categoryId: '02_食品保鮮耐熱袋',
    subcategoryId: '02_營潔平板式耐熱袋',
    name: `營潔平板式耐熱袋｜${b.type} ${b.dim}`,
    originalName: b.key,
    description: '營潔平板式耐熱袋同系列尺寸，適用於食材分裝與熱食外帶包裝。',
    images: img(`/assets/02_食品保鮮耐熱袋/02_營潔平板式耐熱袋/${b.key}/規格圖__營潔耐熱袋${b.type}${b.dim}.png`, '規格圖'),
    specs: [],
    shared_images: [],
    parsedSpec: { size_or_type: b.type, capacity_or_dim: b.dim, quantity: `${b.qty}枚/包` },
    unit: '包',
  })),
  ...rollHeatBags.map((b): Product => ({
    id: `02_食品保鮮耐熱袋-03_營潔卷裝耐熱袋-${b.key}`,
    categoryId: '02_食品保鮮耐熱袋',
    subcategoryId: '03_營潔卷裝耐熱袋',
    name: `營潔卷裝耐熱袋｜${b.type} ${b.dim}`,
    originalName: b.key,
    description: '營潔耐熱袋卷裝規格，整捲連續撕取，適合餐飲業、早餐店等大量使用的場所。',
    images: img(`/assets/02_食品保鮮耐熱袋/03_營潔卷裝耐熱袋/${b.key}/商品圖__營潔卷裝耐熱袋${b.type}.webp`, '展示圖'),
    specs: [],
    shared_images: [],
    parsedSpec: { size_or_type: b.type, capacity_or_dim: b.dim, quantity: `${b.qty}枚/捲` },
    unit: '捲',
  })),
];

// ---------- 台塑遮蔽防塵膠帶 ----------

const tapes: { width: number; perBox: number }[] = [
  { width: 550, perBox: 60 },
  { width: 1100, perBox: 40 },
  { width: 1500, perBox: 30 },
  { width: 2100, perBox: 24 },
  { width: 2700, perBox: 20 },
  { width: 3200, perBox: 20 },
];

const maskingTapes: Product[] = tapes.map((t): Product => ({
  id: `05_遮蔽防塵膠帶-01_台塑遮蔽防塵膠帶-${t.width}mm`,
  categoryId: '05_遮蔽防塵膠帶',
  subcategoryId: '01_台塑遮蔽防塵膠帶',
  name: `台塑遮蔽防塵膠帶｜${t.width}mm`,
  originalName: `${t.width}mm`,
  description: '膠帶與遮蔽膜一體，裝修、油漆施工時用來遮蓋保護家具、門窗與地面，可依需要的寬度選用。',
  images: img(`/assets/05_遮蔽防塵膠帶/01_台塑遮蔽防塵膠帶/${t.width}mm/規格圖__遮蔽防塵膠帶${t.width}mm.png`, '規格圖'),
  specs: [],
  shared_images: [],
  parsedSpec: { size_or_type: '寬幅', capacity_or_dim: `${t.width}mm × 25y（22.8m）`, quantity: `每箱 ${t.perBox} 捲` },
  unit: '捲',
}));

// ---------- 手套 ----------

const GLOVES = '06_手套-01_手套-手套';

const gloves: Product[] = [
  {
    id: GLOVES,
    categoryId: '06_手套',
    subcategoryId: '01_手套',
    name: '手套',
    originalName: '手套',
    description: '提供小、中、大三種尺寸。材質與每盒數量請洽專人確認。',
    images: img('/assets/06_手套/01_手套/規格圖__手套.png', '規格圖'),
    specs: [
      colorSpec(GLOVES, 's', '手套', '小'),
      colorSpec(GLOVES, 'm', '手套', '中'),
      colorSpec(GLOVES, 'l', '手套', '大'),
    ],
    shared_images: [],
    parsedSpec: null,
    unit: '盒',
  },
];

export const addedProducts: Product[] = [...cleaningBags, ...heatBags, ...maskingTapes, ...gloves];
