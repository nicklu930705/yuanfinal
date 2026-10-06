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

          {/* Key Trust Badges */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
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
                  specs: ['大 45L', '30張 / 捲'],
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
                  desc: '高品質食品級 PE 材質，透明度高。獨家高品質夾鏈封口，密封性極佳，適合各類生活小物分類收納。',
                  tag: '分類收納神器',
                  img: '/assets/03_夾鏈袋/01_台塑LDPE夾鏈袋/01號_50x70mm/規格圖__IMG_0255.JPG',
                  specs: ['1號 (50x70mm)', '100張 / 包'],
                  price: '25',
                  link: '/products/03_夾鏈袋-01_台塑LDPE夾鏈袋-01號_50x70mm'
                },
                {
                  id: '04_病媒防治-02_老鼠防治-一錠鼠_滅鼠餌劑',
                  name: '一錠鼠｜滅鼠餌劑',
                  desc: '強力誘引配方搭配高效滅鼠成分，針對老鼠習性設計。投藥簡便，能有效解決鼠患問題，維護環境衛生。',
                  tag: '專業病媒防治',
                  img: '/assets/04_病媒防治/02_老鼠防治/一錠鼠_滅鼠餌劑/01_包裝主圖__IMG_0268.JPG',
                  specs: ['高效滅鼠餌劑', '環境衛生用藥'],
                  price: '120',
                  link: '/products/04_病媒防治-02_老鼠防治-一錠鼠_滅鼠餌劑'
                }
              ].map((product, idx) => (
                <div key={idx} className="group relative bg-surface-container-lowest rounded-3xl border border-border-warm overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div>
                    <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden">
                      <img className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" src={product.img} alt={product.name} />
                      <span className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">{product.tag}</span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-on-surface">{product.name}</h3>
                      <p className="text-sm text-on-surface-variant mt-2 leading-relaxed line-clamp-2">{product.desc}</p>
                      <div className="mt-4 pt-4 border-t border-border-subtle space-y-1.5 text-sm">
                        <div className="flex items-center justify-between text-slate-muted">
                          <span>規格</span>
                          <span className="text-on-surface font-medium">{product.specs[0]}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-muted">
                          <span>包裝數量</span>
                          <span className="text-on-surface font-medium">{product.specs[1]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <div className="bg-surface-linen p-3 rounded-2xl border border-border-warm mb-4">
                      <span className="text-xs font-bold text-secondary block">批發價起</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-on-surface">${product.price}</span>
                        <span className="text-xs text-slate-muted">/ 包 (箱購)</span>
                      </div>
                    </div>
                    <Link className="w-full py-3 px-4 bg-primary text-white hover:bg-stone-800 rounded-2xl font-bold flex items-center justify-center gap-1.5 transition-colors" to={product.link}>
                      <span>立即選購</span>
                      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Wholesale Pricing Summary */}
          <section className="mb-24 bg-surface-container-low rounded-[2.5rem] border border-border-warm p-8 md:p-16">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-on-surface">量大更有利：大宗箱購階梯價</h2>
              <p className="text-lg text-on-surface-variant mt-4 font-body">專為連鎖品牌與獨立店家設計，透明採購級距，買越多省越多</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: '單店備貨', range: '1 箱起訂', desc: '適合小型餐飲店，享 95 折優惠，滿 $1,500 免運。' },
                { title: '合購熱銷', range: '5 箱以上', desc: '整箱 88 折，專車配送直送門市，最划算的營運選擇。', featured: true },
                { title: '連鎖品牌', range: '20 箱以上', desc: '專屬合約批發價，支援多點分批配送，企業月結服務。' }
              ].map((tier, idx) => (
                <div key={idx} className={`bg-white p-8 rounded-3xl border ${tier.featured ? 'border-2 border-secondary shadow-lg relative' : 'border-border-warm shadow-sm'} transition-transform hover:scale-[1.02]`}>
                  {tier.featured && <span className="absolute -top-3 right-6 bg-secondary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">Most Popular</span>}
                  <span className={`text-xs font-bold uppercase tracking-widest ${tier.featured ? 'text-secondary' : 'text-slate-muted'}`}>{tier.title}</span>
                  <h3 className="text-2xl font-bold mt-2">{tier.range}</h3>
                  <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">{tier.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-2xl font-bold hover:bg-stone-800 transition-all shadow-lg active:scale-95" to="/products">
                查看詳細階梯價目表 <span className="material-symbols-outlined text-[20px]">receipt_long</span>
              </Link>
            </div>
          </section>

          {/* Sample Request Banner */}
          <section className="relative rounded-[2.5rem] overflow-hidden bg-black text-white p-8 md:p-20">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center md:text-left">
                <h2 className="text-4xl font-headline font-bold mb-6">還在猜尺寸與厚度嗎？</h2>
                <p className="text-lg text-primary-fixed-dim opacity-90 leading-relaxed font-body">我們免費提供營業用袋類全規格樣品包。新北物流中心掛號配送，讓您親自試裝確認品質後再訂購。</p>
              </div>
              <Link className="bg-surface-cream text-primary px-12 py-5 rounded-2xl font-bold text-xl hover:bg-white transition-all shadow-xl active:scale-[0.98]" to="/products">
                免費索取樣品包
              </Link>
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full -mr-32 -mt-32 blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full -ml-20 -mb-20 blur-[80px]"></div>
          </section>
        </div>
      </main>
    </div>
  );
}
