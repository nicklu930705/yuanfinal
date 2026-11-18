import { Link, useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

/** 手機版：清單有商品時，畫面底部固定顯示「前往送出」，避免客人找不到下一步 */
export default function InquiryBar() {
  const { items } = useCart();
  const { pathname } = useLocation();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  if (count === 0 || pathname === '/cart') return null;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 h-[60px] bg-white border-t border-slate-200 shadow-[0_-4px_16px_rgba(15,23,42,0.08)] px-4 flex items-center justify-between gap-3">
      <span className="text-sm font-bold text-slate-700">
        詢價清單 <span className="text-primary-600">{items.length}</span> 項・{count} 件
      </span>
      <Link to="/cart" className="flex items-center gap-1.5 bg-[#06C755] text-white text-sm font-bold px-4 py-2.5 rounded-xl">
        <MessageCircle className="w-4 h-4" aria-hidden="true" />
        前往用 LINE 送出
      </Link>
    </div>
  );
}
