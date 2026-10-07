import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalLineContact from '../components/GlobalLineContact';
import { ArrowRight } from 'lucide-react';

export default function MainLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col pb-[60px] md:pb-0">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Global Brand Section before Footer */}
      {!isHomePage && (
        <div className="flex flex-col gap-2 mb-0 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
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

          {/* Brand Info */}
          <section className="bg-transparent pt-12 sm:pt-20 pb-6 px-4 sm:px-6 lg:px-8 w-full text-center rounded-[2.5rem]">
            <h2 className="text-4xl sm:text-6xl font-bold mb-10 text-slate-900 tracking-tight">關於侑安國際有限公司</h2>
            <p className="text-xl sm:text-3xl text-slate-600 mb-12 leading-relaxed max-w-4xl mx-auto font-medium">
              以品質立信，以服務致遠<br />
              台塑原料專業經銷、免洗餐具包材、客製化包材服務。
            </p>
            <Link 
              className="inline-flex items-center text-2xl text-primary-600 font-extrabold hover:text-primary-700 transition group" 
              to="/about"
            >
              了解詳細企業資訊 <ArrowRight className="ml-3 w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </Link>
          </section>
        </div>
      )}

      <Footer />
      <GlobalLineContact />
    </div>
  );
}
