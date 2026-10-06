import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 立即捲動到最上方
    window.scrollTo(0, 0);
    // 對於某些行動端或特定佈局，也捲動 html/body
    document.documentElement.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
