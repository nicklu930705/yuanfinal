import type { CartItem } from '../context/CartContext';

/** 官方 LINE 帳號 */
export const LINE_ID = '@593cexey';

/** 加官方 LINE 好友的連結 */
export const LINE_ADD_FRIEND_URL = `https://line.me/R/ti/p/${encodeURIComponent(LINE_ID)}`;

/**
 * 打開與官方 LINE 的聊天室，並把文字預先填好。
 * LINE 不允許網站替使用者自動送出，客人需要在 LINE 裡自己按「傳送」。
 */
export const buildLineMessageUrl = (text: string) =>
  `https://line.me/R/oaMessage/${encodeURIComponent(LINE_ID)}/?${encodeURIComponent(text)}`;

export interface InquiryContact {
  contactName: string;
  phone: string;
  companyName: string;
  address: string;
  taxId: string;
  email: string;
  invoiceCarrier: string;
  notes: string;
}

export const emptyContact: InquiryContact = {
  contactName: '',
  phone: '',
  companyName: '',
  address: '',
  taxId: '',
  email: '',
  invoiceCarrier: '',
  notes: '',
};

const CONTACT_LABELS: [keyof InquiryContact, string][] = [
  ['contactName', '聯絡人'],
  ['phone', '電話'],
  ['companyName', '公司／店名'],
  ['address', '配送地址'],
  ['taxId', '統一編號'],
  ['email', 'Email'],
  ['invoiceCarrier', '電子發票載具'],
  ['notes', '備註'],
];

/** 把詢價清單和聯絡資料組成要傳到 LINE 的文字 */
export const buildCartInquiryText = (items: CartItem[], contact: InquiryContact) => {
  const lines: string[] = ['您好，我想詢價以下商品：'];
  items.forEach((item, i) => {
    const spec = item.spec && item.spec !== '標準規格' ? `（${item.spec}）` : '';
    lines.push(`${i + 1}. ${item.productName}${spec} × ${item.quantity} ${item.unit}`);
  });
  const filled = CONTACT_LABELS.filter(([key]) => contact[key].trim());
  if (filled.length) {
    lines.push('', '【聯絡資料】');
    filled.forEach(([key, label]) => lines.push(`${label}：${contact[key].trim()}`));
  }
  lines.push('', '請協助提供報價、運費與交期，謝謝。');
  return lines.join('\n');
};

/** 複製文字到剪貼簿（舊瀏覽器用備援做法） */
export const copyText = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const el = document.createElement('textarea');
      el.value = text;
      el.setAttribute('readonly', '');
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(el);
      return ok;
    } catch {
      return false;
    }
  }
};
