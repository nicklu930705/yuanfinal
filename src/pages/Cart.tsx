import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    phone: '',
    address: '',
    email: '',
    taxId: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successId, setSuccessId] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const orderId = 'REQ' + Date.now().toString().slice(-6);
      const newOrder = {
        id: orderId,
        date: new Date().toISOString(),
        status: '待處理',
        items: [...items],
        customer: formData
      };
      
      const existingOrders = JSON.parse(localStorage.getItem('yuan-orders') || '[]');
      localStorage.setItem('yuan-orders', JSON.stringify([newOrder, ...existingOrders]));
      
      setIsSubmitting(false);
      setSuccessId(orderId);
      clearCart();
    }, 1000);
  };

  if (successId) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100 shadow-sm">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">詢價需求已送出！</h1>
        <p className="text-lg text-slate-600 mb-2">您的需求單號為：<span className="font-bold text-primary-600">{successId}</span></p>
        <p className="text-slate-600 mb-10 max-w-md mx-auto">我們已收到您的詢價需求，將會有專人儘速與您聯絡，確認最終價格、運費及交期。</p>
        <Link to="/products" className="inline-flex items-center bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 active:scale-95">
          繼續瀏覽商品
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-900 flex items-center gap-3">
        <span className="w-2 h-8 bg-primary-600 rounded-full"></span>
        訂購需求清單
      </h1>
      
      {items.length === 0 ? (
        <div className="bg-white p-20 text-center rounded-4xl shadow-xl border border-slate-100">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-slate-300" />
          </div>
          <p className="text-slate-500 text-xl font-bold mb-8">您的清單目前沒有任何商品</p>
          <Link to="/products" className="inline-flex items-center bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-primary-700 transition-all shadow-lg shadow-primary-200">
            前往瀏覽商品
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-4xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-5 border-b border-slate-100 bg-stone-50 font-bold text-slate-500 uppercase tracking-widest text-xs hidden sm:grid sm:grid-cols-12 gap-4">
                <div className="col-span-6 pl-4">商品資訊</div>
                <div className="col-span-3 text-center">訂購數量</div>
                <div className="col-span-3 text-right pr-4">管理</div>
              </div>
              <ul className="divide-y divide-slate-100">
                {items.map(item => (
                  <li key={item.id} className="p-6 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center hover:bg-slate-50/50 transition-colors">
                    <div className="col-span-6 w-full flex flex-col">
                      <Link to={`/products/${encodeURIComponent(item.productId)}`} className="font-bold text-lg text-slate-900 hover:text-primary-600 transition-colors">
                        {item.productName}
                      </Link>
                      <div className="mt-1 text-sm text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-lg w-fit">
                        {item.spec}
                      </div>
                    </div>
                    <div className="col-span-3 w-full flex justify-center items-center my-4 sm:my-0">
                      <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-1 shadow-sm">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-slate-50 text-slate-600 transition-all font-bold">-</button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-12 text-center bg-transparent border-none focus:ring-0 font-bold text-slate-800"
                        />
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-slate-50 text-slate-600 transition-all font-bold">+</button>
                      </div>
                      <span className="ml-3 text-slate-500 font-bold text-sm">{item.unit}</span>
                    </div>
                    <div className="col-span-3 w-full flex justify-end">
                      <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500 p-3 rounded-2xl hover:bg-red-50 transition-all flex items-center group">
                        <Trash2 className="w-5 h-5" />
                        <span className="sm:hidden ml-2 font-bold">移除商品</span>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6 bg-primary-50 text-primary-800 p-6 rounded-[2rem] flex items-start border border-primary-100 shadow-sm">
              <AlertCircle className="w-6 h-6 mr-4 flex-shrink-0 text-primary-600" />
              <div className="text-sm leading-relaxed font-medium">
                <span className="font-bold block mb-1">詢價提醒：</span>
                此清單為訂購需求確認，送出後不代表訂單成立。最終價格、運費及交期將由專人與您聯繫確認後，才會正式成立訂單。
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-4xl shadow-xl border border-slate-100 p-8 sticky top-24">
              <h2 className="text-xl font-bold mb-8 text-slate-900 border-b border-slate-100 pb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary-600 rounded-full"></span>
                聯絡資料
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">公司 / 店名 <span className="text-red-500">*</span></label>
                  <input required type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} className="w-full px-4 py-3 border border-slate-200 rounded-2xl bg-stone-50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" placeholder="請輸入單位名稱" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">聯絡人 <span className="text-red-500">*</span></label>
                  <input required type="text" name="contactName" value={formData.contactName} onChange={handleInputChange} className="w-full px-4 py-3 border border-slate-200 rounded-2xl bg-stone-50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" placeholder="請輸入姓名" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">聯絡電話 <span className="text-red-500">*</span></label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 border border-slate-200 rounded-2xl bg-stone-50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" placeholder="請輸入電話" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">配送地址 <span className="text-red-500">*</span></label>
                  <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 border border-slate-200 rounded-2xl bg-stone-50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" placeholder="請輸入詳細地址" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">統一編號</label>
                    <input type="text" name="taxId" value={formData.taxId} onChange={handleInputChange} className="w-full px-4 py-3 border border-slate-200 rounded-2xl bg-stone-50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" placeholder="選填" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 border border-slate-200 rounded-2xl bg-stone-50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" placeholder="選填" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">備註需求</label>
                  <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 border border-slate-200 rounded-2xl bg-stone-50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" placeholder="有任何特殊需求請註明"></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-2xl shadow-lg font-bold text-lg transition-all active:scale-95 ${isSubmitting ? 'bg-slate-300 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-200'}`}
                >
                  {isSubmitting ? '處理中...' : '送出詢價需求單'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
