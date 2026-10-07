import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-linen border-t border-border-warm mt-20 font-body">
      <div className="w-full px-6 md:px-10 py-16 max-w-[1360px] mx-auto">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-600 text-surface flex items-center justify-center font-bold text-sm shadow-sm">
              侑
            </div>
            <span className="text-xl font-headline font-bold text-on-surface">侑安國際</span>
          </div>
          <p className="text-sm text-on-surface-variant max-w-sm leading-relaxed font-medium">
            以品質立信，以服務致遠。我們提供台塑原料專業經銷、免洗餐具包材、客製化包材服務。 為什麼選擇我們：專業、穩定、長期。
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-4">
            <Link className="text-sm font-bold text-on-surface-variant hover:text-primary-600 transition-colors" to="/">首頁</Link>
            <Link className="text-sm font-bold text-on-surface-variant hover:text-primary-600 transition-colors" to="/products">全部商品</Link>
            <Link className="text-sm font-bold text-on-surface-variant hover:text-primary-600 transition-colors" to="/about">關於我們</Link>
          </div>
          <div className="flex flex-col gap-2 mt-6 text-sm text-slate-muted font-medium">
            <p>電話：02-24521268 | 地址：基隆市七堵區工建北路5號</p>
            <p>© {new Date().getFullYear()} 侑安國際有限公司 版權所有</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
