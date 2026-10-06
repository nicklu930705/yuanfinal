import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { products, categories } from '../data/store';
import { sortProductsBySize } from '../utils/productSort';

export default function ProductGrid() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category') || '';
  const subcategoryFilter = searchParams.get('subcategory') || '';
  const pageParam = parseInt(searchParams.get('page') || '1');
  const initialSearch = searchParams.get('q') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const ITEMS_PER_PAGE = 16;

  // Sync search input with URL after a small delay
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const newParams = new URLSearchParams(window.location.search);
      const currentQ = newParams.get('q') || '';
      
      if (searchTerm !== currentQ) {
        if (searchTerm) {
          newParams.set('q', searchTerm);
        } else {
          newParams.delete('q');
        }
        newParams.set('page', '1'); // reset page on search
        setSearchParams(newParams);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, setSearchParams]);

  const filteredProducts = useMemo(() => {
    const q = initialSearch.toLowerCase().replace(/[\sxX×]/g, '');
    
    const filtered = products.filter(p => {
      // Filter out non-sellable items when viewing "All Products"
      if (!categoryFilter && !subcategoryFilter && p.notForSale) return false;
      
      const matchCat = categoryFilter ? p.categoryId === categoryFilter : true;
      const matchSub = subcategoryFilter ? p.subcategoryId === subcategoryFilter : true;
      
      const searchString = (p.name + p.categoryId + p.subcategoryId + (p.originalName || '')).toLowerCase().replace(/[\sxX×]/g, '');
      const matchSearch = q ? searchString.includes(q) : true;
      
      return matchCat && matchSub && matchSearch;
    });

    return sortProductsBySize(filtered);
  }, [categoryFilter, subcategoryFilter, initialSearch]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentPage = Math.min(Math.max(1, pageParam), Math.max(1, totalPages));
  
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (catId: string, subId = '') => {
    const newParams = new URLSearchParams(searchParams);
    if (catId) newParams.set('category', catId);
    else newParams.delete('category');
    
    if (subId) newParams.set('subcategory', subId);
    else newParams.delete('subcategory');
    
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-24">
            <h2 className="text-lg font-bold mb-4 border-b pb-2">分類篩選</h2>
            <div className="overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              <ul className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 min-w-max lg:min-w-0">
                <li>
                  <button
                    onClick={() => handleCategoryChange('', '')}
                    className={`whitespace-nowrap w-full text-left px-4 py-2.5 rounded-2xl transition ${!categoryFilter ? 'bg-primary-50 text-primary-600 font-bold border border-primary-200' : 'hover:bg-slate-50 border border-transparent text-slate-600'}`}
                  >
                    全部商品
                  </button>
                </li>
                {categories.map(cat => (
                  <li key={cat.id} className="flex flex-col">
                    <button
                      onClick={() => handleCategoryChange(cat.id, '')}
                      className={`whitespace-nowrap w-full text-left px-4 py-2.5 rounded-2xl transition ${categoryFilter === cat.id && !subcategoryFilter ? 'bg-primary-50 text-primary-600 font-bold border border-primary-200' : 'hover:bg-slate-50 border border-transparent text-slate-600'}`}
                    >
                      {cat.name}
                    </button>
                    {/* Subcategories */}
                    {categoryFilter === cat.id && cat.subcategories && cat.subcategories.length > 0 && (
                      <>
                        <ul className="pl-4 mt-1 space-y-1 hidden lg:block">
                          {cat.subcategories.map(sub => (
                            <li key={sub.id}>
                              <button
                                onClick={() => handleCategoryChange(cat.id, sub.id)}
                                className={`w-full text-left px-3 py-2 text-sm rounded-xl transition ${subcategoryFilter === sub.id ? 'text-primary-600 font-bold bg-primary-50/50' : 'text-slate-500 hover:text-primary-600 hover:bg-slate-50'}`}
                              >
                                {sub.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                        {cat.subcategories.map(sub => (
                          <li key={sub.id} className="lg:hidden">
                            <button
                              onClick={() => handleCategoryChange(cat.id, sub.id)}
                              className={`whitespace-nowrap px-4 py-2.5 rounded-2xl transition border ${subcategoryFilter === sub.id ? 'bg-primary-50 text-primary-600 font-bold border-primary-200' : 'hover:bg-slate-50 border-transparent text-slate-600'}`}
                            >
                              {sub.name}
                            </button>
                          </li>
                        ))}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Search Bar & Results Count */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="搜尋品名、尺寸、號數..."
                className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-2xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 sm:text-sm shadow-sm transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="text-slate-500 text-sm font-medium bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
              顯示 {filteredProducts.length} 項商品
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
            {currentProducts.map(product => {
              const hasSpecs = product.specs && product.specs.length > 0;
              const coverImg = hasSpecs ? (product.specs[0]?.images?.[0]?.path || product.shared_images?.[0]?.path) : (product.images[0]?.path || '');
              
              // Extract subcategory name for display
              const subName = product.subcategoryId.split('_')[1] || product.subcategoryId;
              
              // Build key spec string
              let specString = '';
              if (hasSpecs) {
                specString = product.specs.map(s => s.label).join(' / ');
              } else if (product.parsedSpec) {
                specString = [product.parsedSpec.size_or_type, product.parsedSpec.capacity_or_dim].filter(Boolean).join(' ');
              }

              return (
                <Link key={product.id} to={`/products/${encodeURIComponent(product.id)}`} className="group bg-white rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary-200 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-w-4 aspect-h-3 w-full bg-stone-50 relative border-b border-slate-50 overflow-hidden">
                    {coverImg ? (
                      <img src={coverImg} alt={product.name} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">無圖片</div>
                    )}
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col flex-grow">
                    <div className="text-[10px] sm:text-xs text-primary-600 font-bold mb-1.5 uppercase tracking-wider">
                      {subName}
                    </div>
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-slate-900 mb-1 sm:mb-2 line-clamp-2 leading-tight group-hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="text-xs sm:text-sm text-slate-500 mb-4 line-clamp-1 bg-slate-50 px-2 py-1 rounded-lg w-fit">
                      {specString || '標準規格'}
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-slate-400 text-xs sm:text-sm font-medium group-hover:text-primary-600 transition-colors flex items-center gap-1">
                        {product.notForSale ? '查看詳情' : '查看規格'}
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                      </span>
                      {!product.notForSale && (
                        <span className="text-primary-600 font-bold text-[10px] sm:text-xs bg-primary-50 px-2.5 py-1 rounded-full border border-primary-100 shadow-sm">批量詢價</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-slate-100 shadow-sm mt-4">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-1">找不到符合條件的商品</h3>
              <p className="text-slate-500">請嘗試更換關鍵字或清除篩選條件。</p>
              <button 
                onClick={() => { setSearchTerm(''); handleCategoryChange('', ''); }}
                className="mt-4 text-primary-600 font-medium hover:text-primary-700"
              >
                清除所有條件
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center">
              <nav className="flex items-center space-x-1 sm:space-x-2 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-bold"
                >
                  上一頁
                </button>
                
                <div className="hidden sm:flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-xl border transition flex items-center justify-center font-bold text-sm ${
                        currentPage === page 
                          ? 'bg-primary-600 text-white border-primary-600 shadow-md shadow-primary-200' 
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <div className="sm:hidden px-4 py-2 text-slate-600 font-bold">
                  {currentPage} / {totalPages}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-bold"
                >
                  下一頁
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
