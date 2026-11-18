import type { Product } from '../data/store';

/** 商品的售賣單位：優先用商品自己的 unit，沒有就沿用原本的判斷規則。 */
export const getProductUnit = (product: Pick<Product, 'categoryId' | 'subcategoryId' | 'unit'>): '捲' | '包' | '盒' => {
  if (product.unit) return product.unit;
  if (product.categoryId === '01_清潔袋') return '捲';
  if (product.subcategoryId === '01_台塑LDPE夾鏈袋' || product.subcategoryId === '02_營潔平板式耐熱袋') return '包';
  return '盒';
};
