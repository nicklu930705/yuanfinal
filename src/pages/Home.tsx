import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <main>
        {/* Hero Section - Full Width, Aligned to Top */}
        <section className="relative w-full overflow-hidden bg-slate-900 min-h-[460px] md:min-h-[640px] flex items-center">
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
            {/* Desktop Image */}
            <img 
              src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Premium%20minimalist%20catering%20packaging%20supplies%20showcase%2C%20professional%20product%20photography%20of%20neatly%20organized%20bags%20and%20containers%2C%20elegant%20studio%20lighting%2C%20clean%20aesthetic%2C%20high-end%20materials%2C%208k&image_size=landscape_16_9" 
              alt="Professional Catering Supplies Desktop" 
              className="hidden md:block w-full h-full object-cover opacity-60"
            />
            {/* Mobile Image - Optimized for Portrait */}
            <img 
              src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Premium%20minimalist%20catering%20packaging%20supplies%20showcase%2C%20professional%20product%20photography%20of%20neatly%20organized%20bags%20and%20containers%2C%20elegant%20studio%20lighting%2C%20clean%20aesthetic%2C%20high-end%20materials%2C%208k&image_size=portrait_16_9" 
              alt="Professional Catering Supplies Mobile" 
              className="block md:hidden w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent md:bg-gradient-to-r md:from-black/85 md:via-black/50 md:to-transparent bg-gradient-to-b from-black/70 via-black/40 to-black/20"></div>
          </div>

          {/* Content Layer */}
          <div className="relative z-10 w-full max-w-[1360px] mx-auto px-6 md:px-10 py-20 md:py-32">
            <div className="max-w-4xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] tracking-tight">
                侑安國際<br />
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-300 mt-2 block opacity-90">
                  餐飲後勤供應的首選夥伴
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-100 mt-6 sm:mt-8 max-w-2xl leading-relaxed font-body font-medium opacity-90">
                我們為餐飲店家提供高品質的營業用包材與環境衛生備品。從食品級耐熱袋到專業除蟲藥劑，侑安國際以合規、穩定、透明的服務，支援您的店鋪營運。
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-8 md:py-16">
          {/* Inquiry and Brand Sections */}
          <div className="flex flex-col gap-2 mb-0 w-full">
            {/* Inquiry Banner */}
            <section className="mt-8 bg-black rounded-[2.5rem] p-8 md:p-12 border border-slate-800 w-full">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl md:text-4xl font-bold text-white">不確定規格？讓我們協助您挑選。</h3>
                  <p className="text-slate-400 text-sm md:text-lg">提供需要的品項、尺寸與數量，透過 LINE 聯繫採購。</p>
                </div>
                <a 
                  href="https://line.me/R/ti/p/%40593cexey" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 px-10 py-5 bg-[#00B900] hover:bg-[#00B900]/90 text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(0,185,0,0.3)] active:scale-95 text-xl whitespace-nowrap"
                >
                  <span className="material-symbols-outlined">chat</span>
                  LINE 聯絡詢價
                </a>
              </div>
            </section>

            {/* Home Brand Section */}
            <section className="bg-transparent pt-10 sm:pt-16 pb-4 px-4 sm:px-6 lg:px-8 w-full text-center rounded-[2.5rem]">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-900 tracking-tight">關於侑安國際有限公司</h2>
              <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto font-medium">
                以品質立信，以服務致遠<br />
                台塑原料專業經銷、免洗餐具包材、客製化包材服務。
              </p>
              <Link 
                className="inline-flex items-center text-base text-primary-600 font-bold hover:text-primary-700 transition group" 
                to="/about"
              >
                了解詳細企業資訊 <span className="material-symbols-outlined ml-1 text-[18px] group-hover:translate-x-2 transition-transform">arrow_right_alt</span>
              </Link>
            </section>
          </div>

          </div>
      </main>
    </div>
  );
}
