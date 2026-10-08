import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { items } = useCart();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: '全部商品', path: '/products' },
    { name: '關於我們', path: '/about' },
  ];

  return (
    <div className="flex flex-col w-full sticky top-0 z-50 shadow-sm">
      {/* Main Navigation Bar */}
      <header className="w-full bg-surface-cream border-b border-border-warm">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link className="flex items-center gap-3 group" to="/" onClick={() => setIsMenuOpen(false)}>
            <div className="w-10 h-10 rounded-xl bg-primary-600 text-surface flex items-center justify-center font-headline font-bold tracking-wider shadow-md group-hover:bg-primary-700 transition-all duration-300 group-hover:scale-105">
              侑
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-headline font-bold text-on-surface tracking-tight leading-none group-hover:text-primary-600 transition-colors">
                侑安國際
              </span>
              <span className="text-xs text-slate-muted mt-1 tracking-wider uppercase font-bold opacity-80">
                包裝與清潔用品
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                className="text-on-surface-variant text-sm font-bold hover:text-primary-600 transition-colors relative group" 
                to={link.path}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary-600 transition-all ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Cart Icon (Visible on all screens) */}
            <Link 
              aria-label="需求清單" 
              className="relative flex p-2.5 rounded-xl text-on-surface hover:bg-primary-50 hover:text-primary-600 transition-all duration-300 border border-transparent hover:border-primary-100 shadow-sm hover:shadow" 
              to="/cart"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-lg border-2 border-white">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-on-surface hover:bg-primary-50 hover:text-primary-600 transition-all duration-300"
              aria-label="選單"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`lg:hidden fixed inset-0 top-[113px] bg-white z-40 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <nav className="flex flex-col p-6 gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                className="text-xl font-bold text-on-surface hover:text-primary-600 transition-colors py-2 border-b border-slate-100" 
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {/* Mobile Cart Link in Menu */}
            <Link 
              className="text-xl font-bold text-on-surface hover:text-primary-600 transition-colors py-2 flex items-center justify-between" 
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <span>需求清單</span>
                {totalQuantity > 0 && (
                  <span className="bg-primary-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {totalQuantity}
                  </span>
                )}
              </div>
              <span className="material-symbols-outlined">shopping_cart</span>
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}
