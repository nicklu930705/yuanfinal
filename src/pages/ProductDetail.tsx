import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Info, ChevronLeft, ChevronRight, ListPlus, CheckCircle } from 'lucide-react';
import { products } from '../data/store';
import { getProductUnit } from '../utils/productUnit';
import { useCart } from '../context/CartContext';
import { buildLineMessageUrl, getShipmentName } from '../utils/lineInquiry';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items: cartItems, addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const product = products.find(p => p.id === decodeURIComponent(id || ''));
  
  const hasSpecs = product?.specs && product.specs.length > 0;
  
  // Group specs by size (款式) for multi-step selection
  const groupedSpecs = React.useMemo(() => {
    if (!hasSpecs) return {};
    return product.specs.reduce((acc, spec) => {
      if (!acc[spec.size]) acc[spec.size] = [];
      acc[spec.size].push(spec);
      return acc;
    }, {} as Record<string, typeof product.specs>);
  }, [product, hasSpecs]);

  const sizes = Object.keys(groupedSpecs);
  const isMultiStep = sizes.length > 1 && sizes.some(s => groupedSpecs[s].length > 0);

  const [selectedSize, setSelectedSize] = useState(sizes[0] || '');
  const [selectedSpecId, setSelectedSpecId] = useState('');

  // Update selectedSpecId when size changes or when component mounts
  useEffect(() => {
    if (selectedSize && groupedSpecs[selectedSize]) {
      const currentSpecs = groupedSpecs[selectedSize];
      // Keep current spec if it matches the new size, otherwise pick first
      const currentSpec = currentSpecs.find(s => s.id === selectedSpecId);
      if (!currentSpec) {
        setSelectedSpecId(currentSpecs[0].id);
      }
    }
  }, [selectedSize, groupedSpecs]);

  const selectedSpec = hasSpecs ? product.specs.find(s => s.id === selectedSpecId) : null;
  
  // Combine images depending on whether it has specs
  // For cleaning bags, we prioritize showing the main product images (which are usually spec images)
  // but also include shared images as fallback
  const displayImages = [...(product?.images || []), ...(product?.shared_images || [])];
  
  // If it's not a cleaning bag and has specific spec images, we might want to prioritize those
  // but for now, let's keep it simple and include all relevant images
  const allAvailableImages = hasSpecs 
    ? [...displayImages, ...(selectedSpec?.images || [])]
    : displayImages;

  // Sort by order and filter unique paths
  const sortedImages = allAvailableImages
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .filter((img, index, self) => 
      index === self.findIndex((t) => t.path === img.path)
    );

  const [selectedImage, setSelectedImage] = useState(sortedImages[0]?.path || '');
  const [quantity, setQuantity] = useState(1);

  // Helper for arrow navigation
  const handlePrevImage = () => {
    const currentIndex = sortedImages.findIndex(img => img.path === selectedImage);
    const prevIndex = (currentIndex - 1 + sortedImages.length) % sortedImages.length;
    setSelectedImage(sortedImages[prevIndex].path);
  };

  const handleNextImage = () => {
    const currentIndex = sortedImages.findIndex(img => img.path === selectedImage);
    const nextIndex = (currentIndex + 1) % sortedImages.length;
    setSelectedImage(sortedImages[nextIndex].path);
  };

  // Update selected image when spec changes
  useEffect(() => {
    if (sortedImages.length > 0) {
      setSelectedImage(sortedImages[0].path);
    }
  }, [selectedSpecId, product]);

  if (!product) {
    return <div className="p-8 text-center">商品不存在</div>;
  }

  const specName = selectedSpec ? `${selectedSpec.label} (${selectedSpec.size})` : '標準規格';
  const unit = getProductUnit(product);
  const shipmentName = getShipmentName(product.id, hasSpecs ? selectedSpecId || null : null);
  const inquiryMessage = [
    '您好，我想詢問以下商品：',
    `商品：${product.name}`,
    ...(shipmentName ? [`　（出貨單：${shipmentName}）`] : []),
    ...(selectedSpec ? [`規格：${specName}`] : []),
    `數量：${quantity} ${unit}`,
    '請協助提供報價、運費與交期，謝謝。',
  ].join('\n');
  const lineInquiryUrl = buildLineMessageUrl(inquiryMessage);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToList = () => {
    addItem({
      id: `${product.id}-${selectedSpecId || 'default'}`,
      productId: product.id,
      productName: product.name,
      spec: specName,
      quantity,
      unit,
    });
    setJustAdded(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => navigate(-1)} className="group flex items-center text-slate-500 hover:text-primary-600 mb-6 transition font-bold">
        <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> 回上頁
      </button>

      <div className="bg-transparent rounded-4xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Image Gallery */}
          <div className="flex flex-col">
            <div className="relative aspect-square w-full mb-6 bg-white rounded-3xl overflow-hidden border border-slate-200 group flex items-center justify-center">
              {selectedImage ? (
                <img 
                  src={selectedImage} 
                  alt={product.name} 
                  className={`w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ${
                    product.name.includes('營潔') ? 'p-12 md:p-20' : 'p-4'
                  }`} 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">無圖片</div>
              )}

              {/* Floating Navigation Arrows */}
              {sortedImages.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevImage}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-slate-900 hover:bg-white transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 z-10"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={handleNextImage}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-slate-900 hover:bg-white transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 z-10"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnails */}
            {sortedImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {sortedImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img.path)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === img.path ? 'border-primary-600 ring-2 ring-primary-50' : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <img src={img.path} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-black text-white text-xs font-bold mb-4 w-fit">
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
                  <div className="grid grid-cols-2 gap-y-4 text-sm">
                    {[
                      { label: '款式', value: selectedSpec.label },
                      {
                        label: '規格',
                        value: !selectedSpec.dimensions?.length
                          ? null
                          : product.categoryId === '01_清潔袋'
                          ? (product.subcategoryId === '04_醫療感染性廢棄物袋'
                              ? `${selectedSpec.dimensions.join(' × ')}cm`
                              : `${selectedSpec.size} (${selectedSpec.dimensions.map(d => d * 10).join(' × ')}mm)`)
                          : `${selectedSpec.dimensions.join(' × ')} cm`
                      },
                      {
                        label: '張數',
                        value: selectedSpec.sheets_per_box ? `${selectedSpec.sheets_per_box} 枚/${unit}` : null
                      }
                    ].filter(item => item.value !== null).map((item, i) => (
                      <React.Fragment key={i}>
                        <div className="text-slate-500">{item.label}</div>
                        <div className="font-medium text-right text-slate-900">{item.value}</div>
                      </React.Fragment>
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
                  <div className="grid grid-cols-2 gap-y-4 text-sm">
                    {[
                      { label: '款式', value: product.parsedSpec?.size_or_type || '-' },
                      { label: '規格', value: product.parsedSpec?.capacity_or_dim || '-' },
                      { label: '包裝數量', value: product.parsedSpec?.quantity || '-' }
                    ]
                    .filter(item => item.value !== '-')
                    .map((item, i) => (
                      <React.Fragment key={i}>
                        <div className="text-slate-500">{item.label}</div>
                        <div className="font-medium text-right text-slate-900">{item.value}</div>
                      </React.Fragment>
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

            {hasSpecs && (sizes.length > 1 || (sizes[0] && groupedSpecs[sizes[0]].length > 1)) && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">規格選擇</h3>
                
                {/* Step 1: Select Size/Type (款式) */}
                {sizes.length > 1 && (
                  <div>
                    <div className="flex flex-wrap gap-2.5">
                      {sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all border ${
                            selectedSize === size 
                              ? 'border-primary-600 bg-primary-600 text-white shadow-lg shadow-primary-100 scale-105' 
                              : 'border-slate-200 bg-white text-slate-600 hover:border-primary-300 hover:bg-primary-50/30'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Select Color/Variant (顏色) */}
                {selectedSize && groupedSpecs[selectedSize] && groupedSpecs[selectedSize].length > 1 && product.subcategoryId !== '04_醫療感染性廢棄物袋' && (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2.5">
                      {groupedSpecs[selectedSize].map(spec => (
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
                  <span className="ml-4 text-slate-500 font-bold">
                    {unit}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleAddToList}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center transition-all shadow-lg shadow-primary-200 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  >
                    <ListPlus aria-hidden="true" className="w-5 h-5 mr-2" />
                    加入詢價清單
                  </button>
                  <a
                    href={lineInquiryUrl}
                    className="flex-1 bg-[#06C755] hover:bg-[#05b14c] text-white py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center transition-all shadow-lg shadow-green-100 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06C755]"
                  >
                    <MessageCircle aria-hidden="true" className="w-5 h-5 mr-2" />
                    LINE 直接詢價
                  </a>
                </div>
                <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                  只問這一項：按「LINE 直接詢價」。要問多樣：先「加入詢價清單」，最後在清單頁一次用 LINE 送出。
                </p>
                {justAdded && (
                  <div role="status" className="mt-4 flex items-center justify-between gap-3 bg-green-50 border border-green-200 text-green-800 rounded-2xl px-4 py-3">
                    <span className="flex items-center gap-2 text-sm font-bold">
                      <CheckCircle className="w-5 h-5 text-green-600" aria-hidden="true" />
                      已加入詢價清單（共 {cartCount} 件）
                    </span>
                    <Link to="/cart" className="shrink-0 text-sm font-bold text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl transition">
                      前往清單送出
                    </Link>
                  </div>
                )}

                {/* Shopping Guide Summary */}
                <div className="mt-8 p-6 bg-slate-50 rounded-3xl border border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-wider">
                    <span className="w-1 h-4 bg-slate-400 rounded-full"></span>
                    購買須知摘要
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-2 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      現貨 1–3 個工作天內出貨
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      北北基滿 $5,000 免運宅配
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      提供貨到收現或銀行轉帳
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      紙本發票隨貨附（統編請備註）
                    </li>
                  </ul>
                  <Link 
                    to="/shopping-guide" 
                    className="mt-4 inline-flex items-center text-xs font-bold text-primary-600 hover:text-primary-700 transition"
                  >
                    查看完整購物須知 <ChevronRight size={14} className="ml-0.5" />
                  </Link>
                </div>
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
