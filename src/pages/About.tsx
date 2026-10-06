import { Building2, FileCheck, Phone, MapPin } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-4xl shadow-xl border border-slate-100 overflow-hidden">
        
        <div className="bg-primary-600 text-white p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6 relative z-10">關於侑安國際有限公司</h1>
          <p className="text-primary-50 max-w-2xl mx-auto text-lg leading-relaxed relative z-10 font-medium">
            以品質立信，以服務致遠<br/>
            台塑原料專業經銷、免洗餐具包材、客製化包材服務。<br/>
            專業、穩定、長期是我們對客戶的承諾。
          </p>
        </div>

        <div className="p-8 md:p-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <div>
              <div className="flex items-center text-primary-600 mb-6">
                <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center mr-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">企業介紹</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg">
                我們提供多樣化的產品線，從一般清潔袋、醫療感染袋到各類食品保鮮袋與病媒防治產品，滿足您在營業或工業上的各種需求。我們堅持品質，提供最可靠的產品。
              </p>
            </div>
            
            <div>
              <div className="flex items-center text-primary-600 mb-6">
                <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center mr-4">
                  <FileCheck className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">認證與授權</h2>
              </div>
              <div className="bg-stone-50 p-6 rounded-3xl border border-slate-200 shadow-inner">
                <img 
                  src="/assets/90_企業與授權資料/01_廣告委託及許可資料/金禾盛與佑安_授權附件/授權及執照合併圖__IMG_0263.JPG" 
                  alt="授權及執照" 
                  className="w-full h-auto rounded-2xl shadow-md mb-4"
                />
                <p className="text-sm font-bold text-slate-400 text-center uppercase tracking-widest">
                  相關廣告委託及許可資料
                </p>
              </div>
            </div>
          </div>

          <hr className="border-slate-100 mb-16" />

          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center flex items-center justify-center gap-4">
              <span className="w-8 h-1 bg-primary-600 rounded-full"></span>
              聯絡資訊
              <span className="w-8 h-1 bg-primary-600 rounded-full"></span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: <Phone className="w-5 h-5" />, label: '電話', value: '02-24521268' },
                { icon: <span className="font-bold">F</span>, label: 'FAX', value: '02-24521579' },
                { icon: <span className="font-bold text-lg">L</span>, label: 'LINE 官方帳號', value: '@593cexey' },
                { icon: <MapPin className="w-5 h-5" />, label: '地址', value: '基隆市七堵區工建北路5號' }
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-start gap-4 hover:bg-white hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary-600 shadow-sm border border-slate-100 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</div>
                    <div className="text-slate-900 font-bold">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
