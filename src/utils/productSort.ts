
import type { Product } from '../data/store';

/**
 * 計算商品的尺寸分數，用於從小到大排序
 * 邏輯：
 * 1. 清潔袋：以公升數 (L) 為準
 * 2. 夾鏈袋/保鮮袋：以面積 (寬 x 高) 為準，統一換算為 cm²
 * 3. 其他：以 size_or_type 的關鍵字權重為準
 */
export const getProductSortValue = (product: Product): number => {
  const spec = product.parsedSpec;
  const sizeOrType = spec?.size_or_type || '';
  const capacityOrDim = spec?.capacity_or_dim || '';
  const combinedStr = `${product.name} ${sizeOrType} ${capacityOrDim}`;

  // 1. 處理清潔袋 (Capacity based)
  if (product.categoryId === '01_清潔袋') {
    // 嘗試從字串中提取 L 數值
    const lMatch = combinedStr.match(/(\d+)L/);
    if (lMatch) return parseInt(lMatch[1]) * 1000;

    // 關鍵字權重排序 (按最長/最特殊優先匹配)
    if (combinedStr.includes('超巨霸')) return 260 * 1000;
    if (combinedStr.includes('超巨大')) return 165 * 1000;
    if (combinedStr.includes('巨無霸')) return 130 * 1000;
    if (combinedStr.includes('超特大')) return 125 * 1000;
    if (combinedStr.includes('超大')) return 90 * 1000;
    if (combinedStr.includes('特大')) return 70 * 1000;
    if (combinedStr.includes('巨大')) return 165 * 1000;
    if (combinedStr.includes('巨霸')) return 260 * 1000;
    if (combinedStr.includes('大')) return 45 * 1000;
    if (combinedStr.includes('中')) return 20 * 1000;
    if (combinedStr.includes('超小')) return 5 * 1000;
    if (combinedStr.includes('小')) return 10 * 1000;
    
    return 999 * 1000;
  }

  // 1b. 遮蔽防塵膠帶：以寬度 (mm) 為準
  if (product.categoryId === '05_遮蔽防塵膠帶') {
    const wMatch = combinedStr.match(/(\d+)\s*mm/);
    if (wMatch) return parseInt(wMatch[1]);
  }

  // 2. 處理多規格商品 (Specs based)
  if (product.specs && product.specs.length > 0) {
    const s = product.specs[0];
    if (s.dimensions && s.dimensions.length >= 2) {
      return s.dimensions[0] * s.dimensions[1];
    }
  }

  // 3. 處理單規格尺寸 (Dimension based) - 檢查所有可能欄位
  // 匹配格式如 "200x300mm" 或 "15.5x19.5cm"
  const dimMatch = combinedStr.toLowerCase().match(/([\d.]+)\s*[x*×]\s*([\d.]+)\s*(mm|cm)/);
  if (dimMatch) {
    let w = parseFloat(dimMatch[1]);
    let h = parseFloat(dimMatch[2]);
    const unit = dimMatch[3];
    
    if (unit === 'mm') {
      w /= 10;
      h /= 10;
    }
    return w * h;
  }

  // 4. 處理夾鏈袋號數 (Number based)
  const numMatch = sizeOrType.match(/(\d+)號/);
  if (numMatch) {
    const num = parseInt(numMatch[1]);
    // 00號 -> -1, 0號 -> 0, 1號 -> 1 ...
    if (sizeOrType.includes('00')) return -1 * 10;
    return num * 10;
  }

  // 5. 預設回傳
  return 0;
};

/**
 * 全局商品排序函數
 * 排序優先級：
 * 1. 類別排序 (categoryId): 清潔袋 -> 食品保鮮耐熱袋 -> 夾鏈袋 -> 病媒防治
 * 2. 子類別排序 (subcategoryId): 確保如耐熱袋中「台塑」排在「營潔」之前
 * 3. 尺寸排序 (getProductSortValue): 從小到大
 */
export const sortProductsBySize = (products: Product[]): Product[] => {
  return [...products].sort((a, b) => {
    // 1. 首先按類別 ID 排序 (確保清潔袋 -> 耐熱袋 -> 夾鏈袋 的大順序)
    if (a.categoryId !== b.categoryId) {
      return a.categoryId.localeCompare(b.categoryId);
    }

    // 2. 按子類別 ID 排序 (確保台塑排在營潔之前)
    if (a.subcategoryId !== b.subcategoryId) {
      return a.subcategoryId.localeCompare(b.subcategoryId);
    }

    // 3. 同子類別內，按尺寸從小到大排序
    const valA = getProductSortValue(a);
    const valB = getProductSortValue(b);
    
    if (valA !== valB) {
      return valA - valB;
    }
    
    // 4. 尺寸也相同時，按名稱排序
    return a.name.localeCompare(b.name);
  });
};
