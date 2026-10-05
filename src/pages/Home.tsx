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
                  id: '01_清潔袋',
                  name: '特厚抗撕裂垃圾袋',
                  desc: '45L / 94L / 120L 承重不漏。圓底高壓無縫封口不滴湯水，營業廚餘耐磨抗刺穿。',
                  tag: '營業後廚必備',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-oSSaRpf1WMtzTpSsK1W-6ET51vLfSqbbXcQNX1ex_p3xIPV1uysJkgljHzFef61D5pJYv_eGCr0sbBu0bcSeWmYJG_q4GJlhMp2WW9128lcDs2vFHveUHX-kWeDPVPbznuAmGqQSIJB-FUH26PH872soGo3NcYCT0fUHgj9nJYNhfg-sLCVSRWchNU9ISbeOpJvXgkzxzU2D6WYfNo7HaVkswK-Sjo4V6c0GcdA_0oB5PCA8d1q38Q',
                  specs: ['特厚 0.045mm ~ 0.06mm', '50包 / 箱 (批發現貨)'],
                  price: '38',
                  link: '/products?category=01_清潔袋'
                },
                {
                  id: '02_食品保鮮耐熱袋',
                  name: '食品級高密度耐熱袋',
                  desc: '耐熱 110°C / 防油防燙。SGS 溶出檢驗零塑化劑。4兩、6兩、半斤至3斤全規格現貨。',
                  tag: '熱湯外帶專用',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSBJ9G7F1DalXiBgCHGHFNnoGgrBIREpr40TQM7Ek6SMoDkM5NJeWUg3O4idky9oOyCQe5IjU9htFyQpQiM_m1QDrxFGOTgI8c6V_w9nfr9m-jnGBYXqO4dfSJp7rMdhi_OeFppd9NmrnSwCiZMqyOlKUC-8PnSErozwWn-9AbJ3851tKowFClPoC0VMNk77MIMyTPLSu7u1-SqQDriTUhVX0AA18P_O-kV69chvB2Thv-hBtR6ZZt6A',
                  specs: ['4兩 ~ 3斤 (全規格)', 'SGS 食品級 HDPE'],
                  price: '42',
                  link: '/products?category=02_食品保鮮耐熱袋'
                },
                {
                  id: '03_夾鏈袋',
                  name: '密封加厚夾鏈袋',
                  desc: '加厚 0.08mm 緊密咬合。冷凍冷藏不脆化，防潮保鮮必備，1號至12號常備供應。',
                  tag: '乾貨備料分裝',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFYYwZXtrKri0OlMpVJe-1aPEpvmg1csR7yTT_WDxVaXsZbL0-v_R9cr005EQW7O6HwXYncpemDWQeZjFlrx-RSSeKp7iRX7gBcb995pV96B3j_z7pgpiHLdoPACsTgEPbRlA6HA6QZYYuUgyLiY06-Moc61BBbvJBT--XPR1YeqPZJOA8Qj8qgd2Fw0ZbN7vAfqk4ewBwL5v1D1VYgw__7gjBqbsy31SnZhXMw7mkVjPEFupttPtTAg',
                  specs: ['特厚 0.08mm', '1號 ~ 12號 (全系列)'],
                  price: '25',
                  link: '/products?category=03_夾鏈袋'
                },
                {
                  id: 'yuan-product-sealing-film',
                  name: '通用型自動封口膜',
                  desc: 'PP/PE/紙杯通用。高韌性易撕取，印刷清晰不掉漆，適用各式市售封口機。',
                  tag: '飲品外帶必備',
                  img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=rolls+of+plastic+cup+sealing+film+with+cute+boba+tea+patterns+on+a+bright+modern+background&image_size=landscape_4_3',
                  specs: ['PP / PE / 紙杯通用', '可封約 2,500 杯'],
                  price: '320',
                  link: '/products/yuan-product-sealing-film'
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
                          <span>出貨</span>
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

          {/* Featured Pest Control Section */}
          <section className="mb-24">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-on-surface">環境衛生專業備品</h2>
                <p className="text-lg text-on-surface-variant mt-2">協助餐飲店家建立標準化衛生防線，符合環保署稽查規範</p>
              </div>
              <Link to="/products?category=04_病媒防治" className="text-lg font-bold text-secondary hover:underline flex items-center gap-1">
                查看全部藥劑 <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: '滅蟑凝膠餌劑 (營業用)',
                  desc: '環署核准字號。針對連鎖餐飲開發，點膠式設計不污染環境，有效連鎖滅蟑。',
                  tag: '稽查合格藥劑',
                  img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional+cockroach+gel+bait+syringe+in+a+clean+commercial+kitchen+environment+close-up&image_size=landscape_4_3',
                  feature: '提供出貨單與SDS備查',
                  price: '180',
                  link: '/products/04_病媒防治-01_蟑螂防治-快點絕_0.5百分比凝膠餌劑'
                },
                {
                  name: '上鎖式安全鼠餌盒',
                  desc: '符合 HACCP 規範。防止人員與寵物誤觸，黑色隱蔽設計增加老鼠取食意願。',
                  tag: '防止誤食',
                  img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=black+matte+plastic+rodent+bait+station+lockbox+placed+discreetly+against+a+warehouse+wall&image_size=landscape_4_3',
                  feature: '專用鑰匙上鎖式',
                  price: '120',
                  link: '/products/yuan-product-bait-station'
                },
                {
                  name: '電子吸入式捕蚊燈',
                  desc: '靜音渦流吸入。UV 特殊波長誘蚊，無電擊噪音，適合咖啡廳與餐廳外場環境。',
                  tag: '物理滅蚊',
                  img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=modern+minimalist+black+electronic+mosquito+trap+lamp+with+soft+blue+UV+light+in+a+cafe+interior&image_size=landscape_4_3',
                  feature: '約 10 ~ 15 坪適用',
                  price: '950',
                  link: '/products/yuan-product-mosquito-lamp'
                },
                {
                  name: '自動噴霧定時除臭機',
                  desc: '壁掛式設計。智慧定時噴灑，搭配植物性除臭配方，有效分解化妝室及廚房異味。',
                  tag: '異味抑制',
                  img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=white+sleek+wall-mounted+automatic+aerosol+dispenser+in+a+modern+clean+restroom&image_size=landscape_4_3',
                  feature: '定時噴灑間隔可調',
                  price: '480',
                  link: '/products/yuan-product-deodorizer'
                }
              ].map((product, idx) => (
                <div key={idx} className="group relative bg-surface-container-lowest rounded-3xl border border-border-warm overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div>
                    <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden">
                      <img className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" src={product.img} alt={product.name} />
                      <span className="absolute top-3 left-3 bg-[#15803D] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">{product.tag}</span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-on-surface">{product.name}</h3>
                      <p className="text-sm text-on-surface-variant mt-2 leading-relaxed line-clamp-2">{product.desc}</p>
                      <div className="mt-4 pt-4 border-t border-border-subtle text-sm">
                        <div className="flex items-center justify-between text-slate-muted">
                          <span>特色</span>
                          <span className="text-[#15803D] font-medium">{product.feature}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <div className="bg-surface-linen p-3 rounded-2xl border border-border-warm mb-4">
                      <span className="text-xs font-bold text-secondary block">批發價起</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-on-surface">${product.price}</span>
                        <span className="text-xs text-slate-muted">/ 件</span>
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
          <section className="relative rounded-[2.5rem] overflow-hidden bg-primary text-white p-8 md:p-20">
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
