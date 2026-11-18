import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, Copy, Check, MessageCircle, ChevronDown, ExternalLink } from 'lucide-react';
import { useCart } from '../context/CartContext';
import {
  buildCartInquiryText,
  buildLineMessageUrl,
  copyText,
  emptyContact,
  LINE_ADD_FRIEND_URL,
  LINE_ID,
  type InquiryContact,
} from '../utils/lineInquiry';

const CONTACT_STORAGE_KEY = 'yuan-inquiry-contact';

const loadContact = (): InquiryContact => {
  try {
    const saved = localStorage.getItem(CONTACT_STORAGE_KEY);
    return saved ? { ...emptyContact, ...JSON.parse(saved) } : emptyContact;
  } catch {
    return emptyContact;
  }
};

const inputClass =
  'w-full px-4 py-3 border border-slate-200 rounded-2xl bg-stone-50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all';
const labelClass = 'block text-sm font-bold text-slate-700 mb-2';

const steps = ['挑選商品加入清單', '填寫聯絡資料', '在 LINE 按「傳送」'];

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const [contact, setContact] = useState<InquiryContact>(loadContact);
  const [opened, setOpened] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // 記住聯絡資料，下次詢價不用重填（只存在客人自己的瀏覽器）
  useEffect(() => {
    try {
      localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(contact));
    } catch {
      /* 無痕模式等情況存不了就算了 */
    }
  }, [contact]);

  const message = useMemo(() => buildCartInquiryText(items, contact), [items, contact]);
  const lineUrl = buildLineMessageUrl(message);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpened(true);
    // 開新分頁，這頁留著顯示「請在 LINE 按傳送」與複製備援；被擋就直接跳轉
    const win = window.open(lineUrl, '_blank');
    if (win) win.opener = null;
    else window.location.href = lineUrl;
  };

  const handleCopy = async () => {
    const ok = await copyText(message);
    setCopied(ok);
    if (ok) setTimeout(() => setCopied(false), 2500);
  };

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-3 text-slate-900 flex items-center gap-3">
        <span className="w-2 h-8 bg-primary-600 rounded-full"></span>
        詢價清單
      </h1>
      <p className="text-slate-600 mb-6">
        把需要的商品加進清單、填好聯絡資料，按一下就會打開官方 LINE，詢價內容已自動填好，您只要按「傳送」。
      </p>

      {/* 下單步驟 */}
      <ol className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
        {steps.map((step, i) => {
          const active = i === 0 ? items.length === 0 : i === 1 ? items.length > 0 && !opened : opened;
          return (
            <li
              key={step}
              className={`rounded-2xl border px-3 py-3 sm:px-5 sm:py-4 text-center sm:text-left transition-colors ${
                active ? 'bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-100' : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              <div className={`text-xs font-bold mb-1 ${active ? 'text-primary-100' : 'text-slate-400'}`}>步驟 {i + 1}</div>
              <div className="text-sm sm:text-base font-bold leading-snug">{step}</div>
            </li>
          );
        })}
      </ol>

      {items.length === 0 ? (
        <div className="bg-white p-12 sm:p-20 text-center rounded-4xl shadow-xl border border-slate-100">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-slate-300" />
          </div>
          <p className="text-slate-700 text-xl font-bold mb-2">清單目前沒有商品</p>
          <p className="text-slate-500 mb-8">在商品頁按「加入詢價清單」，或用快速選購一次挑多樣。</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/products" className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-primary-700 transition-all shadow-lg shadow-primary-200">
              瀏覽全部商品
            </Link>
            <Link to="/quick-order" className="inline-flex items-center justify-center bg-white text-primary-700 border border-primary-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-primary-50 transition-all">
              快速選購
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* 清單 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-4xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-5 border-b border-slate-100 bg-stone-50 flex items-center justify-between">
                <span className="font-bold text-slate-700">共 {items.length} 項商品・{totalQuantity} 件</span>
                <Link to="/products" className="text-sm font-bold text-primary-600 hover:text-primary-700">+ 繼續加商品</Link>
              </div>
              <ul className="divide-y divide-slate-100">
                {items.map(item => (
                  <li key={item.id} className="p-5 sm:p-6 flex flex-col sm:grid sm:grid-cols-12 gap-4 sm:items-center">
                    <div className="sm:col-span-6 w-full flex flex-col">
                      <Link to={`/products/${encodeURIComponent(item.productId)}`} className="font-bold text-lg text-slate-900 hover:text-primary-600 transition-colors">
                        {item.productName}
                      </Link>
                      {item.spec && item.spec !== '標準規格' && (
                        <div className="mt-1 text-sm text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-lg w-fit">{item.spec}</div>
                      )}
                    </div>
                    <div className="sm:col-span-4 w-full flex items-center sm:justify-center">
                      <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-1 shadow-sm">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="減少數量" className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-50 text-slate-600 transition-all font-bold">-</button>
                        <input
                          type="number"
                          min="1"
                          aria-label="數量"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-14 text-center bg-transparent border-none focus:ring-0 font-bold text-slate-800"
                        />
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="增加數量" className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-50 text-slate-600 transition-all font-bold">+</button>
                      </div>
                      <span className="ml-3 text-slate-500 font-bold text-sm">{item.unit}</span>
                    </div>
                    <div className="sm:col-span-2 w-full flex justify-end">
                      <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500 p-2 rounded-2xl hover:bg-red-50 transition-all flex items-center text-sm font-bold">
                        <Trash2 className="w-5 h-5" />
                        <span className="ml-1 sm:sr-only">移除</span>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 bg-primary-50 text-primary-800 p-5 rounded-[2rem] border border-primary-100 text-sm leading-relaxed font-medium">
              <span className="font-bold">價格怎麼算？</span>
              送出後由專人在 LINE 回覆報價、運費與交期，確認後才成立訂單。北北基單筆滿 $5,000 免運，其他地區運費另計，詳見
              <Link to="/shopping-guide" className="text-primary-600 underline mx-1">購物須知</Link>。
            </div>
          </div>

          {/* 聯絡資料與送出 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-4xl shadow-xl border border-slate-100 p-6 sm:p-8 lg:sticky lg:top-24">
              {opened ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#06C755]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-[#06C755]" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">請在 LINE 按「傳送」</h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    LINE 已開啟並填好詢價內容。<b>要在 LINE 裡按下傳送</b>，我們才會收到。
                  </p>
                  <div className="space-y-3">
                    <a href={lineUrl} className="w-full flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b14c] text-white py-3.5 rounded-2xl font-bold transition-all">
                      <MessageCircle className="w-5 h-5" /> 重新開啟 LINE
                    </a>
                    <button onClick={handleCopy} className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 py-3.5 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                      {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                      {copied ? '已複製，可貼到 LINE' : '複製詢價內容'}
                    </button>
                    <a href={LINE_ADD_FRIEND_URL} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-primary-600 py-2">
                      還沒加好友？加入官方 LINE {LINE_ID} <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-2">
                    <button
                      onClick={() => { clearCart(); setOpened(false); }}
                      className="w-full py-3 rounded-2xl font-bold text-primary-700 bg-primary-50 hover:bg-primary-100 transition-all"
                    >
                      已傳送，清空清單
                    </button>
                    <button onClick={() => setOpened(false)} className="text-sm text-slate-500 hover:text-slate-700 py-1">
                      返回修改清單或資料
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-6 text-slate-900 border-b border-slate-100 pb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-primary-600 rounded-full"></span>
                    聯絡資料
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="contactName" className={labelClass}>聯絡人 <span className="text-red-500">*</span></label>
                        <input id="contactName" required type="text" name="contactName" autoComplete="name" value={contact.contactName} onChange={handleInputChange} className={inputClass} placeholder="姓名" />
                      </div>
                      <div>
                        <label htmlFor="phone" className={labelClass}>電話 <span className="text-red-500">*</span></label>
                        <input id="phone" required type="tel" name="phone" autoComplete="tel" value={contact.phone} onChange={handleInputChange} className={inputClass} placeholder="手機或市話" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="companyName" className={labelClass}>公司／店名 <span className="text-slate-400 font-normal">（選填）</span></label>
                      <input id="companyName" type="text" name="companyName" autoComplete="organization" value={contact.companyName} onChange={handleInputChange} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="address" className={labelClass}>配送地址 <span className="text-slate-400 font-normal">（選填，方便估運費）</span></label>
                      <input id="address" type="text" name="address" autoComplete="street-address" value={contact.address} onChange={handleInputChange} className={inputClass} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="taxId" className={labelClass}>統一編號</label>
                        <input id="taxId" type="text" name="taxId" inputMode="numeric" value={contact.taxId} onChange={handleInputChange} className={inputClass} placeholder="選填" />
                      </div>
                      <div>
                        <label htmlFor="email" className={labelClass}>Email</label>
                        <input id="email" type="email" name="email" autoComplete="email" value={contact.email} onChange={handleInputChange} className={inputClass} placeholder="選填" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="invoiceCarrier" className={labelClass}>電子發票載具 <span className="text-slate-400 font-normal">（選填）</span></label>
                      <input
                        id="invoiceCarrier"
                        type="text"
                        name="invoiceCarrier"
                        value={contact.invoiceCarrier}
                        onChange={handleInputChange}
                        autoCapitalize="characters"
                        autoComplete="off"
                        spellCheck={false}
                        className={inputClass}
                        placeholder="例如 /AB12CD3"
                      />
                    </div>
                    <div>
                      <label htmlFor="notes" className={labelClass}>備註</label>
                      <textarea id="notes" name="notes" value={contact.notes} onChange={handleInputChange} rows={2} className={inputClass} placeholder="希望到貨日、指定規格等"></textarea>
                    </div>

                    {/* 預覽要傳到 LINE 的內容 */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50">
                      <button type="button" onClick={() => setShowPreview(!showPreview)} className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-slate-600">
                        預覽要傳到 LINE 的內容
                        <ChevronDown className={`w-4 h-4 transition-transform ${showPreview ? 'rotate-180' : ''}`} />
                      </button>
                      {showPreview && (
                        <pre className="px-4 pb-4 text-xs text-slate-600 whitespace-pre-wrap font-sans leading-relaxed">{message}</pre>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl shadow-lg font-bold text-lg transition-all active:scale-95 bg-[#06C755] hover:bg-[#05b14c] text-white shadow-green-200"
                    >
                      <MessageCircle className="w-6 h-6" />
                      用 LINE 送出詢價
                    </button>
                    <p className="text-xs text-slate-500 leading-relaxed text-center">
                      會打開官方 LINE（{LINE_ID}），內容已自動填好，請在 LINE 按「傳送」。
                      電腦版若沒有開啟 LINE，可按送出後的「複製詢價內容」再貼到 LINE。
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
