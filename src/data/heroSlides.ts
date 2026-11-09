import { products } from './store';

const featuredProducts = [
  {
    productId: '01_清潔袋-01_一般捲取式-大_45L',
    image: '/assets/hero/carousel/cleaning-45l.webp',
    category: '日常清潔',
    detail: '45L・650 × 750 mm',
    description: '從日常分類到營業環境整理，為每一次清潔準備好合適的清潔袋。',
  },
  {
    productId: '02_食品保鮮耐熱袋-01_台塑保鮮耐熱袋-200x300mm_150枚',
    image: '/assets/hero/carousel/food-bags.webp',
    category: '廚房保鮮',
    detail: '200 × 300 mm・150 枚',
    description: '食材分裝、備料與保鮮，讓廚房的每一個準備步驟井然有序。',
  },
  {
    productId: '03_夾鏈袋-01_台塑LDPE夾鏈袋-08號_170x240mm',
    image: '/assets/hero/carousel/zipper-08.webp',
    category: '分類收納',
    detail: '8 號・170 × 240 mm',
    description: '透明袋身搭配夾鏈封口，乾貨、文具與生活小物，一袋一袋整理好。',
  },
  {
    productId: '01_清潔袋-02_拉繩式-大_45L_24張',
    image: '/assets/hero/carousel/drawstring-45l.webp',
    category: '便利清潔',
    detail: '45L・24 個',
    description: '拉繩設計方便收口，從廚房到居家空間，讓日常清潔更順手。',
  },
];

// Build destinations from the live catalog and exclude products no longer sold.
export const heroSlides = featuredProducts.flatMap((slide) => {
  const product = products.find((item) => item.id === slide.productId && !item.notForSale);
  return product ? [{ ...slide, product }] : [];
});
