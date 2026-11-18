import type { CartItem } from '../context/CartContext';
import { erpProductMappings } from '../data/erpProductMapping';

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

/**
 * 官網商品規格 → 出貨單（ERP 成本單）品名，方便業務在 LINE 一眼對到出貨品項。
 * 官網獨有、或與成本單有出入待確認的品項不附。
 */
const shipmentNames = new Map(
  erpProductMappings
    .filter((m) => m.erpName && (m.status === 'matched' || m.status === 'erp_only_added'))
    .map((m) => [`${m.websiteProductId}|${m.websiteSpecId ?? ''}`, m.erpName as string]),
);

export const getShipmentName = (productId: string, specId: string | null) =>
  shipmentNames.get(`${productId}|${specId ?? ''}`);

/** 從清單項目 id 取回規格 id（商品頁：`商品id-規格id` 或 `商品id-default`；快速選購：無規格時就是商品 id） */
const specIdOf = (item: CartItem) => {
  const rest = item.id.slice(item.productId.length);
  return !rest || rest === '-default' ? null : rest.slice(1);
};

/** 把詢價清單和聯絡資料組成要傳到 LINE 的文字 */
export const buildCartInquiryText = (items: CartItem[], contact: InquiryContact) => {
  const lines: string[] = ['您好，我想詢價以下商品：'];
  items.forEach((item, i) => {
    const spec = item.spec && item.spec !== '標準規格' ? `（${item.spec}）` : '';
    lines.push(`${i + 1}. ${item.productName}${spec} × ${item.quantity} ${item.unit}`);
    const shipment = getShipmentName(item.productId, specIdOf(item));
    if (shipment) lines.push(`　（出貨單：${shipment}）`);
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
