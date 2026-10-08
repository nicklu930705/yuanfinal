import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Truck, CreditCard, RefreshCcw } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, icon, children, isOpen, onToggle }) => {
  return (
    <div className="border border-slate-200 rounded-[2rem] overflow-hidden mb-4 transition-all duration-300 bg-white shadow-sm hover:shadow-md">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        </div>
        {isOpen ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 pt-0 border-t border-slate-50 text-slate-600 leading-relaxed font-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default function ShoppingGuide() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">購物須知</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          感謝您選擇侑安國際。為了確保您的購物體驗順暢，請在訂購前詳閱以下說明。
        </p>
      </div>

      <div className="space-y-6">
        <AccordionItem
          title="出貨配送"
          icon={<Truck className="w-6 h-6" />}
          isOpen={openIndex === 0}
          onToggle={() => toggle(0)}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-slate-900 mb-2">出貨時間</h4>
              <p>• 現貨商品：於確認訂單後 1–3 個工作天內出貨。</p>
              <p>• 缺貨或客製化商品：出貨時間將由專人另行通知。</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2">配送費用</h4>
              <p>• 北北基（基隆、台北、新北）地區：單筆詢價總額滿 $5,000 即享免運宅配服務。</p>
              <p>• 其他縣市：委由新竹物流配送，運費將根據商品體積與重量另行計算，並於報價時告知。</p>
            </div>
          </div>
        </AccordionItem>

        <AccordionItem
          title="付款發票"
          icon={<CreditCard className="w-6 h-6" />}
          isOpen={openIndex === 1}
          onToggle={() => toggle(1)}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-slate-900 mb-2">付款方式</h4>
              <p>我們提供以下彈性付款方式：</p>
              <p>• 貨到收現：於商品送達時將款項交予配送人員。</p>
              <p>• 銀行轉帳：請於出貨前完成匯款，並告知帳號後五碼以利對帳。</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2">發票開立</h4>
              <p>• 所有商品皆附隨貨紙本發票（可選擇二聯式或三聯式）。</p>
              <p>• 若有統一編號需求，請務必於訂購時主動告知。</p>
              <p>• 電子發票載具：目前相關系統建置中（狀態：待確認），暫不支援電子載具。</p>
            </div>
          </div>
        </AccordionItem>

        <AccordionItem
          title="退換貨須知"
          icon={<RefreshCcw className="w-6 h-6" />}
          isOpen={openIndex === 2}
          onToggle={() => toggle(2)}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-slate-900 mb-2">退換貨條件</h4>
              <p>• 若收到商品有重大瑕疵或品項不符，請於收到貨後 7 天內聯繫客服處理。</p>
              <p>• 消耗性產品（如清潔袋、耐熱袋、夾鏈袋等）一經拆封後，除商品本身瑕疵外，恕不接受退換貨。</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2">法律權益說明</h4>
              <p>• 我們尊重法定七日解除權，但依據《通訊交易解除權合理例外情事適用準則》，部分特定商品性質（如客製化商品、已拆封之消耗品）不適用七日鑑賞期，請於購買前知悉。</p>
              <p>• 退貨運費：依相關法令及退貨原因判定處理，非因瑕疵之退貨可能需由消費者負擔回運費用。</p>
            </div>
          </div>
        </AccordionItem>
      </div>

      <div className="mt-16 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 text-center">
        <p className="text-slate-600 mb-4 font-medium">如有任何疑問，歡迎透過 LINE 與我們聯繫</p>
        <a 
          href="https://line.me/R/ti/p/%40593cexey" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#00B900] text-white font-bold rounded-2xl hover:bg-[#00B900]/90 transition-all"
        >
          立即聯繫 LINE 客服
        </a>
      </div>
    </div>
  );
}
