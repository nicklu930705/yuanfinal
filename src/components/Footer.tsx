import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface-linen border-t border-border-warm py-12 mt-20 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Company Info */}
          <div>
            <h3 className="text-on-surface text-lg font-bold mb-4">侑安國際有限公司</h3>
            <div className="text-sm text-on-surface-variant space-y-3">
              <p className="leading-relaxed">
                以品質立信，以服務致遠。我們提供台塑原料專業經銷、免洗餐具包材、客製化包材服務。
              </p>
              <p className="leading-relaxed">
                侑安國際有限公司專注於餐飲營業包材與專業環境衛生用藥，做全台餐飲頭家最堅實的後勤支柱。
              </p>
              <p className="font-bold">
                為什麼選擇我們：專業、穩定、長期。
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-on-surface text-lg font-bold mb-4">快速連結</h3>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              <li>
                <Link to="/" className="hover:text-primary-600 transition-colors">首頁</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-primary-600 transition-colors">全部商品</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-600 transition-colors">關於我們</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-on-surface text-lg font-bold mb-4">聯絡我們</h3>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              <li>電話：02-24521268</li>
              <li>FAX：02-24521579</li>
              <li>LINE ID：@593cexey</li>
              <li>地址：基隆市七堵區工建北路5號</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
