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
        <section className="bg-slate-50 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full text-center mt-12 mb-8 rounded-[2.5rem]">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-900">關於侑安國際有限公司</h2>
          <p className="text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            以品質立信，以服務致遠<br />
            台塑原料專業經銷、免洗餐具包材、客製化包材服務。<br />
            為什麼選擇我們：專業、穩定、長期。
          </p>
          <Link 
            className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition" 
            to="/about"
          >
            了解詳細企業資訊 <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </section>
      )}

      <Footer />
      <GlobalLineContact />
    </div>
  );
}
