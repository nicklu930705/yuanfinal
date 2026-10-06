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
            <div className="w-10 h-10 rounded-xl bg-primary-600 text-surface flex items-center justify-center font-headline font-bold tracking-wider shadow-md group-hover:bg-primary-700 transition-all duration-300 group-hover:scale-105">
              侑
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-headline font-bold text-on-surface tracking-tight leading-none group-hover:text-primary-600 transition-colors">
                侑安國際
              </span>
              <span className="text-[10px] text-slate-muted mt-1 tracking-wider uppercase font-bold opacity-80">
                Commercial Kitchen & Logistics
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link className="text-on-surface-variant text-sm font-bold hover:text-primary-600 transition-colors relative group" to="/products">
              全部商品
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link className="text-on-surface-variant text-sm font-bold hover:text-primary-600 transition-colors relative group" to="/products?category=05_餐飲外帶包材">
              營業用包材
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link className="text-on-surface-variant text-sm font-bold hover:text-primary-600 transition-colors relative group" to="/products?category=04_病媒防治">
              環境衛生除蟲
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link className="text-on-surface-variant text-sm font-bold hover:text-primary-600 transition-colors relative group" to="/about">
              企業介紹
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link aria-label="需求清單" className="relative p-2.5 rounded-xl text-on-surface hover:bg-primary-50 hover:text-primary-600 transition-all duration-300 border border-transparent hover:border-primary-100 shadow-sm hover:shadow" to="/cart">
              <span className="material-symbols-outlined">shopping_cart</span>
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-lg border-2 border-white">
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
