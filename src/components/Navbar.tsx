import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { items } = useCart();
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Top Announcement Bar */}
      <div className="bg-surface-linen border-b border-border-warm py-2 px-6 text-center">
        <div className="max-w-[1360px] mx-auto flex items-center justify-center gap-3 text-on-surface-variant text-xs font-bold">
          <span className="inline-flex items-center gap-1.5 text-secondary font-bold">
            <span className="material-symbols-outlined text-[16px]">local_shipping</span>
            全館滿 $1,500 免運宅配
          </span>
          <span className="text-outline-variant">|</span>
          <span className="hidden sm:inline">營業用現貨當日發貨</span>
          <span className="hidden sm:inline text-outline-variant">|</span>
          <span className="hidden md:inline text-on-surface font-medium">歡迎申請免運試樣包</span>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <header className="w-full sticky top-0 z-50 bg-surface-cream border-b border-border-warm shadow-sm">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link className="flex items-center gap-3 group" to="/">
            <div className="w-10 h-10 rounded-lg bg-primary-container text-surface flex items-center justify-center font-headline font-bold tracking-wider shadow-sm group-hover:bg-primary transition-colors">
              侑
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-headline font-bold text-on-surface tracking-tight leading-none">
                侑安國際
              </span>
              <span className="text-[10px] text-slate-muted mt-1 tracking-wider uppercase font-bold">
                Commercial Kitchen & Logistics
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link className="text-on-surface-variant text-sm font-bold hover:text-on-surface transition-colors" to="/products">
              全部商品
            </Link>
            <Link className="text-on-surface-variant text-sm font-bold hover:text-on-surface transition-colors" to="/products?category=05_餐飲外帶包材">
              營業用包材
            </Link>
            <Link className="text-on-surface-variant text-sm font-bold hover:text-on-surface transition-colors" to="/products?category=04_病媒防治">
              環境衛生除蟲
            </Link>
            <Link className="text-on-surface-variant text-sm font-bold hover:text-on-surface transition-colors" to="/about">
              企業介紹
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link aria-label="需求清單" className="relative p-2 rounded-xl text-on-surface hover:bg-surface-linen transition-colors duration-150" to="/cart">
              <span className="material-symbols-outlined">shopping_cart</span>
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-sm">
                  {totalQuantity}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
