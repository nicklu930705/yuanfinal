import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* 1. Top Announcement Bar - Handled by MainLayout/Navbar usually, but I'll add it if needed */}
      
      <main className="py-12 md:py-24">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10">
          {/* Hero Section */}
          <section className="mb-20">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-on-surface leading-tight">
              侑安國際<br />
              <span className="text-slate-muted">餐飲後勤供應的首選夥伴</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant mt-6 max-w-3xl leading-relaxed font-body">
              我們為餐飲店家提供高品質的營業用包材與環境衛生備品。從食品級耐熱袋到專業除蟲藥劑，侑安國際以合規、穩定、透明的服務，支援您的店鋪營運。
            </p>
          </section>

          {/* Hot Products Section */}
          <section className="mb-24" id="products">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-on-surface">精選營業核心品項</h2>
                <p className="text-lg text-on-surface-variant mt-2">全台超過 3,000 家餐飲門市穩定回購的明星商品</p>
              </div>
              <Link to="/products" className="text-lg font-bold text-secondary hover:underline flex items-center gap-1">
                查看全部商品 <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  id: '01_清潔袋-01_一般捲取式-大_45L',
                  name: '台塑清潔袋｜大型 45L',
                  desc: '經典大型規格，適用於大多數標準垃圾桶。特殊的防漏封口技術，能有效防止液體滲出，是居家清潔的最佳幫手。',
                  tag: '熱銷清潔袋',
                  img: '/assets/01_清潔袋/01_一般捲取式/大_45L/展示圖2.jpeg',
                  specs: ['大 45L (650x750mm)', '30張 / 捲'],
                  price: '38',
                  link: '/products/01_清潔袋-01_一般捲取式-大_45L'
                },
                {
                  id: '02_食品保鮮耐熱袋-01_台塑保鮮耐熱袋-200x300mm_150枚',
                  name: '台塑保鮮耐熱袋｜150枚',
                  desc: '選用 100% 全新食品級原料，不含塑化劑，符合衛生安全標準。強韌耐用防漏，耐熱性佳，適合食材分裝與保鮮。',
                  tag: '廚房保鮮必備',
                  img: '/assets/02_食品保鮮耐熱袋/01_台塑保鮮耐熱袋/200x300mm_150枚/展示圖.jpeg',
                  specs: ['200x300mm', '150枚 / 盒'],
                  price: '42',
                  link: '/products/02_食品保鮮耐熱袋-01_台塑保鮮耐熱袋-200x300mm_150枚'
                },
                {
                  id: '03_夾鏈袋-01_台塑LDPE夾鏈袋-01號_50x70mm',
                  name: '台塑夾鏈袋｜1號',
                  desc: '加厚材質，封口緊密。適用於各類小零件、飾品或藥品分裝，防潮防塵效果佳。',
                  tag: '分裝收納必備',
                  img: '/assets/03_夾鏈袋/01_台塑LDPE夾鏈袋/01號_50x70mm/展示圖.jpeg',
                  specs: ['01號 50x70mm', '100入 / 包'],
                  price: '25',
                  link: '/products/03_夾鏈袋-01_台塑LDPE夾鏈袋-01號_50x70mm'
                },
                {
                  id: '04_病媒防治-02_老鼠防治-一錠鼠_滅鼠餌劑',
                  name: '一錠鼠｜滅鼠餌劑',
                  desc: '環保署核准上市，針對台灣家鼠習性研發。獨家誘引配方，老鼠取食意願高，效果顯著且穩定。',
                  tag: '滅鼠首選',
                  img: '/assets/04_病媒防治/02_老鼠防治/一錠鼠_滅鼠餌劑/展示圖.jpeg',
                  specs: ['一錠鼠', '10入 / 盒'],
                  price: '120',
                  link: '/products/04_病媒防治-02_老鼠防治-一錠鼠_滅鼠餌劑'
                }
              ].map((product, idx) => (
                <Link key={idx} to={product.link} className="group relative bg-surface-container-lowest rounded-3xl border border-border-warm overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div>
                    <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden">
                      <img className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" src={product.img} alt={product.name} />
                      <span className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">{product.tag}</span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-on-surface">{product.name}</h3>
                      <p className="text-sm text-on-surface-variant mt-2 leading-relaxed line-clamp-2">{product.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Key Trust Badges */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {[
              { icon: 'verified', title: '安心合規', desc: 'SGS 食品級檢驗與環保署核准字號，符合衛生法規要求。' },
              { icon: 'local_shipping', title: '滿額免運', desc: '全館滿 $1,500 即享免運宅配，雙北市區專車配送。' },
              { icon: 'inventory_2', title: '急速發貨', desc: '常備百坪實體倉儲現貨，當日發貨營運不中斷。' },
              { icon: 'calculate', title: '箱購特惠', desc: '透明階梯報價單，單店小量亦可享連鎖批發級優惠。' }
            ].map((badge, idx) => (
              <div key={idx} className="bg-surface-container-lowest p-6 rounded-3xl border border-border-warm shadow-sm hover:shadow-md transition-shadow">
                <span className="material-symbols-outlined text-secondary text-3xl mb-4">{badge.icon}</span>
                <h3 className="text-lg font-bold mb-2">{badge.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{badge.desc}</p>
              </div>
            ))}
          </section>

          {/* Inquiry and Brand Sections */}
          <div className="flex flex-col gap-6 mb-8 w-full">
            {/* Inquiry Banner */}
            <section className="mt-12 bg-black rounded-[2rem] p-8 text-center border border-slate-800 w-full">
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
            </section>

            {/* Home Brand Section */}
            <section className="bg-transparent py-16 sm:py-24 px-4 sm:px-6 lg:px-8 w-full text-center rounded-[2.5rem]">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-900">關於侑安國際有限公司</h2>
              <p className="text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                以品質立信，以服務致遠<br />
                台塑原料專業經銷、免洗餐具包材、客製化包材服務。
              </p>
              <Link 
                className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition" 
                to="/about"
              >
                了解詳細企業資訊 <span className="material-symbols-outlined ml-1 text-[18px]">arrow_right_alt</span>
              </Link>
            </section>
          </div>

          </div>
      </main>
    </div>
  );
}
