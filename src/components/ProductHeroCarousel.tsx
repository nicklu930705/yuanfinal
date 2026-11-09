import ImageCarousel from './ImageCarousel';
import { heroSlides } from '../data/heroSlides';

const slides = heroSlides.map((slide) => ({
  id: slide.productId,
  label: slide.product.name,
  image: slide.image,
  alt: `${slide.product.name}商品情境圖`,
  href: `/products/${encodeURIComponent(slide.productId)}`,
  category: slide.category,
  detail: slide.detail,
  description: slide.description,
}));

export default function ProductHeroCarousel() {
  return <ImageCarousel id="home-product-carousel" label="精選商品輪播" slides={slides} />;
}
