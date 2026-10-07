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
        <div className="flex flex-col gap-6 mb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
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

          {/* Brand Info */}
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
              了解詳細企業資訊 <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </section>
        </div>
      )}

      <Footer />
      <GlobalLineContact />
    </div>
  );
}
