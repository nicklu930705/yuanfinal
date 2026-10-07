import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-20 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Company Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">侑安國際有限公司</h3>
            <p className="text-sm">
              以品質立信，以服務致遠<br />
              台塑原料專業經銷、免洗餐具包材、客製化包材服務。<br />
              為什麼選擇我們：專業、穩定、長期。
            </p>
            <p className="text-sm mt-4 text-slate-400 italic">
              ※ 本站為展示系統，價格與交期將由專人與您確認
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">快速連結</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">首頁</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">全部商品</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">關於我們</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">聯絡我們</h3>
            <ul className="space-y-2 text-sm">
              <li>電話：02-24521268</li>
              <li>FAX：02-24521579</li>
              <li>LINE ID：@593cexey</li>
              <li>地址：基隆市七堵區工建北路5號</li>
            </ul>
          </div>
        </div>

        {/* LINE Inquiry Banner inside Footer */}
        <div className="mt-12 bg-slate-800 rounded-[2rem] p-8 text-center border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-2">不確定規格？讓我們協助您挑選。</h3>
          <p className="text-slate-400 mb-6">提供需要的品項、尺寸與數量，透過 LINE 聯繫採購。</p>
          <a 
            href="https://line.me/R/ti/p/%40593cexey" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center px-8 py-3 bg-[#00B900] hover:bg-[#009900] text-white font-bold rounded-xl transition shadow-lg active:scale-95"
          >
            LINE 聯絡詢價
          </a>
        </div>
      </div>
    </footer>
  );
}
