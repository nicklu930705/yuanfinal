import ImageCarousel from './ImageCarousel';
import { brandHeroSlides } from '../data/brandHeroSlides';

export default function BrandHeroCarousel() {
  return <ImageCarousel id="home-brand-carousel" label="首頁品牌主視覺輪播" slides={brandHeroSlides} appearance="brand" showControls={false} />;
}
