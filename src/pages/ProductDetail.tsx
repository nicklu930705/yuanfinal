import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../data/store';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const product = products.find(p => p.id === decodeURIComponent(id || ''));
  
  const hasSpecs = product?.specs && product.specs.length > 0;
  const [selectedSpecId, setSelectedSpecId] = useState(hasSpecs ? product.specs[0].id : '');
  
  const selectedSpec = hasSpecs ? product.specs.find(s => s.id === selectedSpecId) : null;
  
  // Combine images depending on whether it has specs
  const displayImages = hasSpecs 
    ? [...(selectedSpec?.images || []), ...(product.shared_images || [])].sort((a, b) => (a.order || 0) - (b.order || 0))
    : product?.images || [];

  const [selectedImage, setSelectedImage] = useState(displayImages[0]?.path || '');
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  // Helper for arrow navigation
  const handlePrevImage = () => {
    const currentIndex = displayImages.findIndex(img => img.path === selectedImage);
    const prevIndex = (currentIndex - 1 + displayImages.length) % displayImages.length;
    setSelectedImage(displayImages[prevIndex].path);
  };

  const handleNextImage = () => {
    const currentIndex = displayImages.findIndex(img => img.path === selectedImage);
    const nextIndex = (currentIndex + 1) % displayImages.length;
    setSelectedImage(displayImages[nextIndex].path);
  };

  // Update selected image when spec changes
  useEffect(() => {
    if (displayImages.length > 0) {
      setSelectedImage(displayImages[0].path);
    }
  }, [selectedSpecId, product]);

  if (!product) {
    return <div className="p-8 text-center">商品不存在</div>;
  }

  const handleAdd = () => {
    const specName = selectedSpec ? `${selectedSpec.label} (${selectedSpec.size})` : '標準規格';
    // For new products, order_unit is not in the json directly on variant, but let's use '盒' or '件'
    const unit = selectedSpec ? '盒' : '件';

    addItem({
      id: `${product.id}-${selectedSpecId || 'default'}`,
      productId: product.id,
      productName: product.name,
      spec: specName,
      quantity,
      unit
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => navigate(-1)} className="group flex items-center text-slate-500 hover:text-primary-600 mb-6 transition font-bold">
        <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> 回上頁
      </button>

      <div className="bg-white rounded-4xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          
          {/* Image Gallery */}
          <div className="p-6 md:p-10 bg-stone-50 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col">
            <div className="relative aspect-square w-full mb-6 bg-white rounded-3xl overflow-hidden border border-slate-200 group flex items-center justify-center shadow-inner">
              {selectedImage ? (
                <>
                  <img 
                    src={selectedImage} 
                    alt={product.name} 
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" 
                  />
                  
                  {/* Arrow Controls - only show if multiple images */}
                  {displayImages.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 shadow-lg text-slate-700 opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 shadow-lg text-slate-700 opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">無圖片</div>
              )}
            </div>
            
            {displayImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {displayImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img.path)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${selectedImage === img.path ? 'border-primary-500 scale-95 shadow-md' : 'border-transparent hover:border-primary-200 opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img.path} alt={img.role || '商品圖片'} className="w-full h-full object-contain bg-white p-2" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6 md:p-10 flex flex-col">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-bold mb-4 w-fit border border-primary-100">
              {product.categoryId.split('_')[1] || product.categoryId}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">{product.name}</h1>
            
            {product.description && (
              <div className="mb-8 text-slate-600 leading-relaxed bg-primary-50/20 p-6 rounded-[2rem] border border-primary-100/50">
                <p className="whitespace-pre-line">{product.description}</p>
              </div>
            )}
            
            <div className="flex-grow">
              {hasSpecs && selectedSpec ? (
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-primary-600 rounded-full"></span>
                    規格詳情
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: '款式', value: selectedSpec.label },
                      { label: '尺寸', value: `${selectedSpec.dimensions.join(' × ')} cm` },
                      { label: '張數', value: `${selectedSpec.sheets_per_box} 張 / 單位` },
                      { label: '條碼', value: selectedSpec.barcode || '-' }
                    ].map((item, i) => (
                      <div key={i} className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        <div className="text-sm text-slate-400 font-bold uppercase mb-2">{item.label}</div>
                        <div className="text-lg md:text-xl font-extrabold text-slate-900">{item.value}</div>
                      </div>
                    ))}
                  </div>
                  
                  {product.categoryId === '03_夾鏈袋' && (
                    <div className="mt-6 text-sm text-slate-600 bg-amber-50 p-4 rounded-2xl border border-amber-100">
                      <p className="font-bold mb-1 text-amber-800">注意事項：</p>
                      <p>• 材質：LDPE（低密度聚乙烯）/ PE（聚乙烯）</p>
                      <p>• 耐冷熱範圍：-40°C ~ 60°C</p>
                      <p className="text-red-500 mt-2 font-bold">※ 不適合微波或加熱烹調；過熱食品請放涼後再放入。</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-primary-600 rounded-full"></span>
                    商品詳情
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: '規格類型', value: product.parsedSpec?.size_or_type || '-' },
                      { label: '容量尺寸', value: product.parsedSpec?.capacity_or_dim || '-' },
                      { label: '包裝數量', value: product.parsedSpec?.quantity || '-' }
                    ].map((item, i) => (
                      <div key={i} className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        <div className="text-sm text-slate-400 font-bold uppercase mb-2">{item.label}</div>
                        <div className="text-lg md:text-xl font-extrabold text-slate-900">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!product.notForSale && (
                <div className="bg-stone-50 text-slate-700 p-4 rounded-2xl flex items-start mb-8 border border-slate-200 shadow-sm">
                  <Info className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 text-primary-600" />
                  <div className="text-sm leading-relaxed font-medium">
                    價格、運費與交期由專人確認後提供。
                  </div>
                </div>
              )}
            </div>

            {hasSpecs && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">規格選擇</h3>
                <div className="flex flex-wrap gap-2.5">
                  {product.specs.map(spec => (
                    <button
                      key={spec.id}
                      onClick={() => setSelectedSpecId(spec.id)}
                      className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all border ${
                        selectedSpecId === spec.id 
                          ? 'border-primary-600 bg-primary-600 text-white shadow-lg shadow-primary-100 scale-105' 
                          : 'border-slate-200 bg-white text-slate-600 hover:border-primary-300 hover:bg-primary-50/30'
                      }`}
                    >
                      {spec.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!product.notForSale ? (
              <div className="mt-auto border-t border-slate-100 pt-8">
                <div className="flex items-center mb-6">
                  <span className="mr-6 font-bold text-slate-700 uppercase tracking-wider text-sm">訂購數量</span>
                  <div className="flex items-center bg-slate-50 p-1 rounded-2xl border border-slate-200">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                      className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm text-slate-600 transition-all font-bold"
                    >-</button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center bg-transparent border-none focus:ring-0 font-bold text-slate-800"
                    />
                    <button 
                      onClick={() => setQuantity(quantity + 1)} 
                      className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm text-slate-600 transition-all font-bold"
                    >+</button>
                  </div>
                  <span className="ml-4 text-slate-500 font-bold">{hasSpecs ? '盒' : '件'}</span>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAdd}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-4 px-8 rounded-2xl font-bold text-lg flex items-center justify-center transition-all shadow-lg shadow-primary-200 active:scale-95"
                  >
                    <ShoppingCart className="w-5 h-5 mr-3" />
                    加入詢價需求單
                  </button>
                </div>
                {showSuccess && (
                  <div className="mt-4 text-primary-600 text-sm font-bold text-center animate-bounce">
                    ✨ 已成功加入需求清單！
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-auto border-t border-slate-100 pt-8">
                <div className="bg-primary-50 p-6 rounded-[2rem] text-primary-700 text-center font-bold border-2 border-primary-100 shadow-sm">
                  此為衛教宣導素材，非販售商品
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
