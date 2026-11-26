/**
 * 官網商品 ↔ 公司 ERP 品號對照表（2026-11 成本單版本，業主已逐項確認）。
 * 用途：內部對帳，以及 LINE 詢價訊息裡附上「出貨單」品名（src/utils/lineInquiry.ts）。網站畫面不顯示。
 * 這是公開 repo：這裡只放品名、規格與品號，絕不放任何成本、價格或帳戶資料。
 * 檢查方式：npm run check:erp-mapping
 */

export type ErpMappingStatus =
  | 'matched' // 官網原有商品，已對上 ERP 品號
  | 'matched_flagged' // 已對上，但官網資料與成本單有出入，業主指示先保留
  | 'erp_only_added' // 成本單有、官網原本沒有，2026-11 補上
  | 'website_only'; // 官網有、成本單沒有

export interface ErpProductMapping {
  erpSku: string | null;
  erpName: string | null;
  websiteProductId: string;
  websiteSpecId: string | null;
  websiteName: string;
  status: ErpMappingStatus;
  note?: string;
}

const m = (
  erpSku: string | null,
  erpName: string | null,
  websiteProductId: string,
  websiteSpecId: string | null,
  websiteName: string,
  status: ErpMappingStatus,
  note?: string,
): ErpProductMapping => ({ erpSku, erpName, websiteProductId, websiteSpecId, websiteName, status, ...(note ? { note } : {}) });

const R = '01_清潔袋-01_一般捲取式-';
const D = '01_清潔袋-02_拉繩式-';
const B = '01_清潔袋-03_抽取式與業務用-';
const Z = '03_夾鏈袋-01_台塑LDPE夾鏈袋-';
const YP = '02_食品保鮮耐熱袋-02_營潔平板式耐熱袋-';
const YR = '02_食品保鮮耐熱袋-03_營潔卷裝耐熱袋-';
const T = '05_遮蔽防塵膠帶-01_台塑遮蔽防塵膠帶-';

export const erpProductMappings: ErpProductMapping[] = [
  // ===== 已配對：一般捲取式（ERP「實心垃圾袋」＝官網「台塑清潔袋」）=====
  m('YA-T-10N', '實心垃圾袋 10L 超小 9.5mic 透明', `${R}超小_10L`, `${R}超小_10L-transparent`, '台塑清潔袋｜超小型 10L 透明', 'matched'),
  m('YA-T-10B', '實心垃圾袋 10L 超小 9.5mic 黑', `${R}超小_10L`, `${R}超小_10L-black`, '台塑清潔袋｜超小型 10L 黑色', 'matched'),
  m('YA-T-20S', '實心垃圾袋 20L 中 粉紅', `${R}中_20L`, `${R}中_20L-pink`, '台塑清潔袋｜中型 20L 粉色', 'matched'),
  m('YA-T-20W', '實心垃圾袋 20L 中 透明', `${R}中_20L`, `${R}中_20L-transparent`, '台塑清潔袋｜中型 20L 透明', 'matched'),
  m('YA-T-20B', '實心垃圾袋 20L 中 黑色', `${R}中_20L`, `${R}中_20L-black`, '台塑清潔袋｜中型 20L 黑色', 'matched'),
  m('YA-E-45U', '實心垃圾袋 45L 大 藍色', `${R}大_45L`, `${R}大_45L-blue`, '台塑清潔袋｜大型 45L 藍色', 'matched'),
  m('YA-T-45P', '實心垃圾袋 45L 大 粉紅', `${R}大_45L`, `${R}大_45L-pink`, '台塑清潔袋｜大型 45L 粉色', 'matched'),
  m('YA-T-45N', '實心垃圾袋 45L 大 透明', `${R}大_45L`, `${R}大_45L-transparent`, '台塑清潔袋｜大型 45L 透明', 'matched'),
  m('YA-T-45B', '實心垃圾袋 45L 大 黑色', `${R}大_45L`, `${R}大_45L-black`, '台塑清潔袋｜大型 45L 黑色', 'matched'),
  m('YA-N-70B', '實心垃圾袋 70L 特大 黑色', `${R}特大_70L`, `${R}特大_70L-black`, '台塑清潔袋｜特大型 70L 黑色', 'matched'),
  m('YA-N-70N', '實心垃圾袋 70L 特大 透明', `${R}特大_70L`, `${R}特大_70L-transparent`, '台塑清潔袋｜特大型 70L 透明', 'matched'),
  m('YA-F-90B', '實心垃圾袋 90L 超大 黑色', `${R}超大_90L`, `${R}超大_90L-black`, '台塑清潔袋｜超大型 90L 黑色', 'matched'),
  m('YA-F-90N', '實心垃圾袋 90L 超大 透明', `${R}超大_90L`, `${R}超大_90L-transparent`, '台塑清潔袋｜超大型 90L 透明', 'matched'),
  m('YA-E-W12W', '實心垃圾袋 12L 特小 透明', `${R}飯店旅館無心捲_10L`, null, '台塑清潔袋｜飯店旅館無心捲型 12L', 'matched', '業主確認同一商品，只有透明一色；官網容量依成本單改為 12L（商品 id 保留舊名）'),

  // ===== 已配對：拉繩式 =====
  m('YA-CT-45B', '拉繩垃圾袋 45L 大 黑色', `${D}大_45L_24張`, `${D}大_45L_24張-black`, '台塑拉繩清潔袋｜大型 45L 黑色', 'matched'),
  m('YA-CT-45W', '拉繩垃圾袋 45L 大 透明', `${D}大_45L_24張`, `${D}大_45L_24張-transparent`, '台塑拉繩清潔袋｜大型 45L 透明', 'matched'),
  m('YA-CT-70W', '拉繩垃圾袋 70L 特大 黑色', `${D}特大_70L_18張`, `${D}特大_70L_18張-black`, '台塑拉繩清潔袋｜特大型 70L 黑色', 'matched', '品號 70W 為黑色，業主確認正確'),
  m('YA-CT-70L', '拉繩垃圾袋 70L 特大 透明', `${D}特大_70L_18張`, `${D}特大_70L_18張-transparent`, '台塑拉繩清潔袋｜特大型 70L 透明', 'matched', '品號 70L 為透明，業主確認正確'),
  m('YA-CT-90S', '拉繩垃圾袋 90L 經濟包 黑色', `${D}超大_90L_14張`, `${D}超大_90L_14張-black`, '台塑拉繩清潔袋｜超大型 90L 黑色', 'matched', '業主確認'),
  m('YA-CT-90SW', '拉繩垃圾袋 90L 經濟包 透明', `${D}超大_90L_14張`, `${D}超大_90L_14張-transparent`, '台塑拉繩清潔袋｜超大型 90L 透明', 'matched', '業主確認'),
  m('YA-CT-90B', '拉繩垃圾袋 90L 超量包 黑色', `${D}超大超值包_90L_25張`, `${D}超大超值包_90L_25張-black`, '台塑拉繩清潔袋｜超大超量包型 90L 黑色', 'matched', '業主確認'),
  m('YA-CT-90W', '拉繩垃圾袋 90L 超量包 透明', `${D}超大超值包_90L_25張`, `${D}超大超值包_90L_25張-transparent`, '台塑拉繩清潔袋｜超大超量包型 90L 透明', 'matched', '業主確認'),
  m('YA-CT-125L', '拉繩垃圾袋 125L 黑色', `${D}超特大_125L_15張`, `${D}超特大_125L_15張-black`, '台塑拉繩清潔袋｜超特大型 125L 黑色', 'matched'),
  m('YA-CT-125W', '拉繩垃圾袋 125L 透明', `${D}超特大_125L_15張`, `${D}超特大_125L_15張-transparent`, '台塑拉繩清潔袋｜超特大型 125L 透明', 'matched'),
  m('YA-CT-130L', '拉繩垃圾袋 130L 黑色', `${D}巨無霸_130L_20張`, `${D}巨無霸_130L_20張-black`, '台塑拉繩清潔袋｜巨無霸型 130L 黑色', 'matched'),
  m('YA-CT-130W', '拉繩垃圾袋 130L 透明', `${D}巨無霸_130L_20張`, `${D}巨無霸_130L_20張-transparent`, '台塑拉繩清潔袋｜巨無霸型 130L 透明', 'matched'),

  // ===== 已配對：抽取式與業務用（ERP「超特大垃圾袋」）=====
  m('YA-GP-T125B', '超特大垃圾袋 超特大 30張 黑色', `${B}超特大_一般30張與加厚27張`, `${B}超特大-standard-black`, '台塑清潔袋(抽取/業務用)｜超特大 一般30張 黑色', 'matched'),
  m('YA-GP-T125N', '超特大垃圾袋 超特大 30張 透明', `${B}超特大_一般30張與加厚27張`, `${B}超特大-standard-transparent`, '台塑清潔袋(抽取/業務用)｜超特大 一般30張 透明', 'matched'),
  m('YA-GP-T130B', '超特大垃圾袋 加厚 27張 黑色', `${B}超特大_一般30張與加厚27張`, `${B}超特大-thickened-black`, '台塑清潔袋(抽取/業務用)｜超特大 加厚27張 黑色', 'matched'),
  m('YA-GP-T115B', '超特大垃圾袋 超特大 28張 黑色', `${B}超大_黑色_28張`, `${B}超大-black`, '台塑清潔袋(抽取/業務用)｜超大 28張 黑色', 'matched', '業主確認'),
  m('YA-GP-T165B', '超特大垃圾袋 超巨大 22張 32mic 黑色', `${B}超巨大_165L_22張`, `${B}超巨大_165L-black`, '台塑清潔袋(抽取/業務用)｜超巨大 165L 黑色', 'matched'),
  m('YA-GP-T165N', '超特大垃圾袋 超巨大 22張 30mic 透明', `${B}超巨大_165L_22張`, `${B}超巨大_165L-transparent`, '台塑清潔袋(抽取/業務用)｜超巨大 165L 透明', 'matched'),
  m('YA-GP-T260B', '超特大垃圾袋 超巨霸 17張 32mic 黑色', `${B}超巨霸_260L_17張`, `${B}超巨霸_260L-black`, '台塑清潔袋(抽取/業務用)｜超巨霸 260L 黑色', 'matched'),
  m('YA-GP-T260N', '超特大垃圾袋 超巨霸 17張 30mic 透明', `${B}超巨霸_260L_17張`, `${B}超巨霸_260L-transparent`, '台塑清潔袋(抽取/業務用)｜超巨霸 260L 透明', 'matched'),
  m('YA-RP-T120B', '超特大垃圾袋 經濟 21張 黑色', `${B}超特大_125L_21張`, `${B}超特大_125L-transparent`, '台塑清潔袋(抽取/業務用)｜超特大 125L 21張 透明', 'matched_flagged', '成本單寫黑色、官網寫透明；業主指示先保留不改'),

  // ===== 已配對：食品保鮮耐熱袋 =====
  m('YA-FPC100', '耐熱袋 100PCS（大）', '02_食品保鮮耐熱袋-01_台塑保鮮耐熱袋-280x410mm_100枚', null, '台塑保鮮耐熱袋｜280x410mm 100枚', 'matched', '業主確認'),
  m('YA-FPC150', '耐熱袋 150PCS（小）', '02_食品保鮮耐熱袋-01_台塑保鮮耐熱袋-200x300mm_150枚', null, '台塑保鮮耐熱袋｜200x300mm 150枚', 'matched', '業主確認'),
  m('YA-EH-P02', '營潔耐熱袋 四兩，15.5×19.5 cm，360張/包', `${YP}四兩裝_15.5x19.5cm`, null, '營潔平板式耐熱袋｜四兩裝 15.5x19.5cm', 'matched'),

  // ===== 已配對：夾鏈袋／密實袋／冷凍袋 =====
  m('YA-00', '台塑夾鏈袋 3.5×4 cm，100張/包', `${Z}00特小號_35x40mm`, null, '台塑夾鏈袋｜00號', 'matched'),
  m('YA-0', '台塑夾鏈袋 4×6 cm，100張/包', `${Z}00號_40x60mm`, null, '台塑夾鏈袋｜0號', 'matched'),
  m('YA-1', '台塑夾鏈袋 5×7 cm，100張/包', `${Z}01號_50x70mm`, null, '台塑夾鏈袋｜1號', 'matched'),
  m('YA-2', '台塑夾鏈袋 6×8.5 cm，100張/包', `${Z}02號_60x85mm`, null, '台塑夾鏈袋｜2號', 'matched'),
  m('YA-3', '台塑夾鏈袋 7×10 cm，100張/包', `${Z}03號_70x100mm`, null, '台塑夾鏈袋｜3號', 'matched'),
  m('YA-4', '台塑夾鏈袋 8.5×12 cm，100張/包', `${Z}04號_85x120mm`, null, '台塑夾鏈袋｜4號', 'matched'),
  m('YA-5', '台塑夾鏈袋 10×14 cm，100張/包', `${Z}05號_100x140mm`, null, '台塑夾鏈袋｜5號', 'matched'),
  m('YA-6', '台塑夾鏈袋 12×17 cm，100張/包', `${Z}06號_120x170mm`, null, '台塑夾鏈袋｜6號', 'matched'),
  m('YA-7', '台塑夾鏈袋 14×20 cm，100張/包', `${Z}07號_140x200mm`, null, '台塑夾鏈袋｜7號', 'matched'),
  m('YA-8', '台塑夾鏈袋 17×24 cm，100張/包', `${Z}08號_170x240mm`, null, '台塑夾鏈袋｜8 號', 'matched'),
  m('YA-9', '台塑夾鏈袋 20×28 cm，100張/包', `${Z}09號_200x280mm`, null, '台塑夾鏈袋｜9號', 'matched'),
  m('YA-10', '台塑夾鏈袋 24×34 cm，100張/包', `${Z}10號_240x340mm`, null, '台塑夾鏈袋｜10號', 'matched'),
  m('YA-11', '台塑夾鏈袋 28×40 cm，100張/包', `${Z}11號_280x400mm`, null, '台塑夾鏈袋｜11號', 'matched'),
  m('YA-12', '台塑夾鏈袋 34×45 cm，100張/包', `${Z}12號_340x450mm`, null, '台塑夾鏈袋｜12號', 'matched'),
  m('YA-SB-M', '密實袋 中', 'fp-zipper-storage', 'fp-zipper-storage-m', '台塑保鮮密實袋 中', 'matched'),
  m('YA-SB-L', '密實袋 大', 'fp-zipper-storage', 'fp-zipper-storage-l', '台塑保鮮密實袋 大', 'matched'),
  m('YA-FB-M', '冷凍袋 中', 'fp-freezer-bag', 'fp-freezer-bag-m', '台塑保鮮冷凍袋 中', 'matched'),
  m('YA-FB-L', '冷凍袋 大', 'fp-freezer-bag', 'fp-freezer-bag-l', '台塑保鮮冷凍袋 大', 'matched'),

  // ===== 2026-11 補上（成本單有、官網原本沒有）=====
  m('YA-T-15S', '實心垃圾袋 15L 小 粉紅', `${R}小_15L`, `${R}小_15L-pink`, '台塑清潔袋｜小型 15L 粉色', 'erp_only_added'),
  m('YA-T-15B', '實心垃圾袋 15L 小 黑色', `${R}小_15L`, `${R}小_15L-black`, '台塑清潔袋｜小型 15L 黑色', 'erp_only_added'),
  m('YA-T-15W', '實心垃圾袋 15L 小 透明', `${R}小_15L`, `${R}小_15L-transparent`, '台塑清潔袋｜小型 15L 透明', 'erp_only_added'),
  m('YA-KA-T91B', '實心垃圾袋 910×1100 黑色', `${B}業務用超特大_10張`, `${B}業務用超特大_10張-black`, '台塑抽取清潔袋(業務用)｜超特大 91×110cm 黑色', 'erp_only_added', '尺寸與原有實拍圖 IMG_0227 相同'),
  m('YA-KA-T91N', '實心垃圾袋 910×1100 透明', `${B}業務用超特大_10張`, `${B}業務用超特大_10張-transparent`, '台塑抽取清潔袋(業務用)｜超特大 91×110cm 透明', 'erp_only_added', '尺寸與原有實拍圖 IMG_0227 相同'),
  m('YA-KA-84N', '實心垃圾袋 840×1020 透明', `${B}業務用_84x102cm`, `${B}業務用_84x102cm-transparent`, '台塑清潔袋(業務用)｜84×102cm 透明', 'erp_only_added'),
  m('YA-GP-T115N', '超特大垃圾袋 超特大 28張 白色', `${B}超大_黑色_28張`, `${B}超大-white`, '台塑清潔袋(抽取/業務用)｜超大 28張 白色', 'erp_only_added'),
  m('YA-EC-T90N', '環保清潔袋 90L 超大 28mic 透明', '01_清潔袋-05_環保清潔袋-超大_90L_28mic', '01_清潔袋-05_環保清潔袋-超大_90L_28mic-transparent', '環保清潔袋｜超大型 90L 28mic 透明', 'erp_only_added'),
  m('YA-EH-P03', '營潔耐熱袋 六兩，18.5×23 cm，255張/包', `${YP}六兩裝_18.5x23cm`, null, '營潔平板式耐熱袋｜六兩裝 18.5x23cm', 'erp_only_added'),
  m('YA-EH-P05', '營潔耐熱袋 半斤，22×27 cm，183張/包', `${YP}半斤裝_22x27cm`, null, '營潔平板式耐熱袋｜半斤裝 22x27cm', 'erp_only_added'),
  m('YA-EH-P10', '營潔耐熱袋 1斤，24×31 cm，146張/包', `${YP}1斤裝_24x31cm`, null, '營潔平板式耐熱袋｜1斤裝 24x31cm', 'erp_only_added'),
  m('YA-EH-P20', '營潔耐熱袋 2斤，28×39 cm，99張/包', `${YP}2斤裝_28x39cm`, null, '營潔平板式耐熱袋｜2斤裝 28x39cm', 'erp_only_added'),
  m('YA-EH-P30', '營潔耐熱袋 3斤，32×43 cm，79張/包', `${YP}3斤裝_32x43cm`, null, '營潔平板式耐熱袋｜3斤裝 32x43cm', 'erp_only_added'),
  m('YA-EH-P50', '營潔耐熱袋 5斤，35×50 cm，52張/包', `${YP}5斤裝_35x50cm`, null, '營潔平板式耐熱袋｜5斤裝 35x50cm', 'erp_only_added'),
  m('YA-EH-P100', '營潔耐熱袋 10斤，45×62 cm，26張/包', `${YP}10斤裝_45x62cm`, null, '營潔平板式耐熱袋｜10斤裝 45x62cm', 'erp_only_added'),
  m('YA-EH-P150', '營潔耐熱袋 15斤，48×65 cm，22張/包', `${YP}15斤裝_48x65cm`, null, '營潔平板式耐熱袋｜15斤裝 48x65cm', 'erp_only_added', '成本單原寫 5斤，包裝實際印 15斤；業主確認為 15斤（LINE 出貨單品名也寫 15斤）'),
  m('YA-EH-R02', '營潔卷裝耐熱袋 四兩，15.5×19.5 cm，1822張/捲', `${YR}四兩_15.5x19.5cm`, null, '營潔卷裝耐熱袋｜四兩 15.5x19.5cm', 'erp_only_added'),
  m('YA-EH-R03', '營潔卷裝耐熱袋 六兩，18.5×23 cm，1275張/捲', `${YR}六兩_18.5x23cm`, null, '營潔卷裝耐熱袋｜六兩 18.5x23cm', 'erp_only_added'),
  m('YA-EH-R05', '營潔卷裝耐熱袋 半斤，22×27 cm，897張/捲', `${YR}半斤_22x27cm`, null, '營潔卷裝耐熱袋｜半斤 22x27cm', 'erp_only_added'),
  m('YA-EH-R10', '營潔卷裝耐熱袋 1斤，24×31 cm，708張/捲', `${YR}1斤_24x31cm`, null, '營潔卷裝耐熱袋｜1斤 24x31cm', 'erp_only_added'),
  m('YA-EH-R20', '營潔卷裝耐熱袋 2斤，28×39 cm，472張/捲', `${YR}2斤_28x39cm`, null, '營潔卷裝耐熱袋｜2斤 28x39cm', 'erp_only_added'),
  m('YA-EH-R30', '營潔卷裝耐熱袋 3斤，32×43 cm，367張/捲', `${YR}3斤_32x43cm`, null, '營潔卷裝耐熱袋｜3斤 32x43cm', 'erp_only_added'),
  m('YA-EH-R50', '營潔卷裝耐熱袋 5斤，35×50 cm，236張/捲', `${YR}5斤_35x50cm`, null, '營潔卷裝耐熱袋｜5斤 35x50cm', 'erp_only_added'),
  m('YA-MF-550', '台塑遮蔽防塵膠帶 550mm×25y（22.8m）', `${T}550mm`, null, '台塑遮蔽防塵膠帶｜550mm', 'erp_only_added'),
  m('YA-MF-1100', '台塑遮蔽防塵膠帶 1100mm×25y（22.8m）', `${T}1100mm`, null, '台塑遮蔽防塵膠帶｜1100mm', 'erp_only_added'),
  m('YA-MF-1500', '台塑遮蔽防塵膠帶 1500mm×25y（22.8m）', `${T}1500mm`, null, '台塑遮蔽防塵膠帶｜1500mm', 'erp_only_added'),
  m('YA-MF-2100', '台塑遮蔽防塵膠帶 2100mm×25y（22.8m）', `${T}2100mm`, null, '台塑遮蔽防塵膠帶｜2100mm', 'erp_only_added'),
  m('YA-MF-2700', '台塑遮蔽防塵膠帶 2700mm×25y（22.8m）', `${T}2700mm`, null, '台塑遮蔽防塵膠帶｜2700mm', 'erp_only_added'),
  m('YA-MF-3200', '台塑遮蔽防塵膠帶 3200mm×25y（22.8m）', `${T}3200mm`, null, '台塑遮蔽防塵膠帶｜3200mm', 'erp_only_added'),
  m('YA-GV-S', '手套 小', '06_手套-01_手套-手套', '06_手套-01_手套-手套-s', '手套 小', 'erp_only_added', '材質與每盒數量待業主補充'),
  m('YA-GV-M', '手套 中', '06_手套-01_手套-手套', '06_手套-01_手套-手套-m', '手套 中', 'erp_only_added', '材質與每盒數量待業主補充'),
  m('YA-GV-L', '手套 大', '06_手套-01_手套-手套', '06_手套-01_手套-手套-l', '手套 大', 'erp_only_added', '材質與每盒數量待業主補充'),

  // ===== 官網有、成本單沒有 =====
  m(null, null, '01_清潔袋-04_醫療感染性廢棄物袋-感染袋_多尺寸', 'medical-waste-bag-8l', '醫療感染性廢棄物袋 8L', 'website_only'),
  m(null, null, '01_清潔袋-04_醫療感染性廢棄物袋-感染袋_多尺寸', 'medical-waste-bag-20l', '醫療感染性廢棄物袋 20L', 'website_only'),
  m(null, null, '01_清潔袋-04_醫療感染性廢棄物袋-感染袋_多尺寸', 'medical-waste-bag-50l', '醫療感染性廢棄物袋 50L', 'website_only'),
  m(null, null, '01_清潔袋-04_醫療感染性廢棄物袋-感染袋_多尺寸', 'medical-waste-bag-70l', '醫療感染性廢棄物袋 70L', 'website_only'),
  m(null, null, '01_清潔袋-04_醫療感染性廢棄物袋-感染袋_多尺寸', 'medical-waste-bag-90l', '醫療感染性廢棄物袋 90L', 'website_only'),
  m(null, null, '04_病媒防治-01_蟑螂防治-快點絕_0.5百分比凝膠餌劑', null, '快點絕', 'website_only'),
  m(null, null, '04_病媒防治-02_老鼠防治-一錠鼠_滅鼠餌劑', null, '一錠鼠', 'website_only'),
];
