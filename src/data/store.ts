
export interface ProductImage {
  role: string;
  path: string;
  note?: string;
  order?: number;
}

export interface ProductSpec {
  id: string;
  size: string;
  label: string;
  dimensions: number[];
  sheets_per_box: number;
  barcode: string;
  images: ProductImage[];
}

export interface ParsedSpec {
  size_or_type: string;
  capacity_or_dim: string;
  quantity: string;
}

export interface Product {
  id: string;
  categoryId: string;
  subcategoryId: string;
  name: string;
  originalName?: string;
  description?: string;
  images: ProductImage[];
  specs: ProductSpec[];
  shared_images: ProductImage[];
  parsedSpec: ParsedSpec | null;
  notForSale?: boolean;
}

export interface Subcategory {
  id: string;
  name: string;
  cover: string;
}

export interface Category {
  id: string;
  name: string;
  cover: string;
  subcategories: Subcategory[];
}

export const categories: Category[] = [
  {
    "id": "01_清潔袋",
    "name": "清潔袋",
    "cover": "/assets/01_清潔袋/00_系列總覽/一般與業務用清潔袋/系列總覽圖__IMG_0218.JPG",
    "subcategories": [
      {
        "id": "00_系列總覽",
        "name": "系列總覽",
        "cover": "/assets/01_清潔袋/00_系列總覽/一般與業務用清潔袋/系列總覽圖__IMG_0218.JPG"
      },
      {
        "id": "01_一般捲取式",
        "name": "一般捲取式",
        "cover": "/assets/01_清潔袋/01_一般捲取式/中_20L/規格圖__IMG_0221.JPG"
      },
      {
        "id": "02_拉繩式",
        "name": "拉繩式",
        "cover": "/assets/01_清潔袋/02_拉繩式/大_45L_24張/規格圖__IMG_0230.JPG"
      },
      {
        "id": "03_抽取式與業務用",
        "name": "抽取式與業務用",
        "cover": "/assets/01_清潔袋/03_抽取式與業務用/業務用超特大_10張/規格圖_單位待確認__IMG_0227.JPG"
      },
      {
        "id": "04_醫療感染性廢棄物袋",
        "name": "醫療感染性廢棄物袋",
        "cover": "/assets/01_清潔袋/04_醫療感染性廢棄物袋/系列規格圖__IMG_0215.JPG"
      }
    ]
  },
  {
    "id": "02_食品保鮮耐熱袋",
    "name": "食品保鮮耐熱袋",
    "cover": "/assets/02_食品保鮮耐熱袋/01_台塑保鮮耐熱袋/200x300mm_150枚/包裝正面圖__IMG_0243.JPG",
    "subcategories": [
      {
        "id": "01_台塑保鮮耐熱袋",
        "name": "台塑保鮮耐熱袋",
        "cover": "/assets/02_食品保鮮耐熱袋/01_台塑保鮮耐熱袋/200x300mm_150枚/包裝正面圖__IMG_0243.JPG"
      },
      {
        "id": "02_營潔平板式耐熱袋",
        "name": "營潔平板式耐熱袋",
        "cover": "/assets/02_食品保鮮耐熱袋/02_營潔平板式耐熱袋/306.jpg"
      }
    ]
  },
  {
    "id": "03_夾鏈袋",
    "name": "夾鏈袋／密實袋／冷凍袋",
    "cover": "/assets/03_夾鏈袋/01_台塑LDPE夾鏈袋/08號_170x240mm/規格圖__IMG_0248.JPG",
    "subcategories": [
      {
        "id": "01_台塑LDPE夾鏈袋",
        "name": "台塑LDPE夾鏈袋",
        "cover": "/assets/03_夾鏈袋/01_台塑LDPE夾鏈袋/00特小號_35x40mm/規格圖__IMG_0253.JPG"
      },
      {
        "id": "02_台塑保鮮密實袋",
        "name": "台塑保鮮密實袋",
        "cover": "/assets/03_夾鏈袋/02_台塑保鮮密實袋/L_大_20張每盒/01_包裝正面主圖__IMG_0282.JPG"
      },
      {
        "id": "03_台塑保鮮冷凍袋",
        "name": "台塑保鮮冷凍袋",
        "cover": "/assets/03_夾鏈袋/03_台塑保鮮冷凍袋/L_大_14張每盒/01_包裝正面主圖__IMG_0284.JPG"
      }
    ]
  },
  {
    "id": "04_病媒防治",
    "name": "病媒防治",
    "cover": "/assets/04_病媒防治/01_蟑螂防治/快點絕_0.5百分比凝膠餌劑/04_10g與30g宣傳圖__IMG_0266.JPG",
    "subcategories": [
      {
        "id": "01_蟑螂防治",
        "name": "蟑螂防治",
        "cover": "/assets/04_病媒防治/01_蟑螂防治/00_蟑螂知識素材/蟑螂危害說明圖__IMG_0265.JPG"
      },
      {
        "id": "02_老鼠防治",
        "name": "老鼠防治",
        "cover": "/assets/04_病媒防治/02_老鼠防治/一錠鼠_滅鼠餌劑/01_包裝主圖__IMG_0268.JPG"
      }
    ]
  }
];

export const products: Product[] = [
{
    "id": "01_清潔袋-01_一般捲取式-中_20L",
    "categoryId": "01_清潔袋",
    "subcategoryId": "01_一般捲取式",
    "name": "台塑清潔袋｜中型 20L",
    "originalName": "中_20L",
    "description": "採用高品質 HDPE 原料，強韌耐用不易破裂。平底封口設計，增加承重空間，適合一般家庭、辦公室日常垃圾收集使用。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/01_清潔袋/01_一般捲取式/中_20L/規格圖__IMG_0221.JPG",
        "note": "",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "中",
      "capacity_or_dim": "20L",
      "quantity": "54張/捲"
    }
  },
  {
    "id": "01_清潔袋-01_一般捲取式-大_45L",
    "categoryId": "01_清潔袋",
    "subcategoryId": "01_一般捲取式",
    "name": "台塑清潔袋｜大型 45L",
    "originalName": "大_45L",
    "description": "經典大型規格，適用於大多數標準垃圾桶。特殊的防漏封口技術，能有效防止液體滲出，是居家清潔的最佳幫手。",
    "images": [
      {
        "role": "展示圖",
        "path": "/assets/01_清潔袋/01_一般捲取式/大_45L/展示圖2.jpeg",
        "note": "",
        "order": 0
      },
      {
        "role": "規格圖",
        "path": "/assets/01_清潔袋/01_一般捲取式/大_45L/規格圖__IMG_0222.JPG",
        "note": "",
        "order": 1
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "大",
      "capacity_or_dim": "45L",
      "quantity": "30張/捲"
    }
  },
  {
    "id": "01_清潔袋-01_一般捲取式-特大_70L",
    "categoryId": "01_清潔袋",
    "subcategoryId": "01_一般捲取式",
    "name": "台塑清潔袋｜特大型 70L",
    "originalName": "特大_70L",
    "description": "加厚型強韌設計，適合處理較重或體積較大的垃圾。廣泛應用於餐廳、社區與商業空間，提供優異的抗刺穿能力。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/01_清潔袋/01_一般捲取式/特大_70L/規格圖__IMG_0225.JPG",
        "note": "",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "特大",
      "capacity_or_dim": "70L",
      "quantity": "22張/捲"
    }
  },
  {
    "id": "01_清潔袋-01_一般捲取式-超大_90L",
    "categoryId": "01_清潔袋",
    "subcategoryId": "01_一般捲取式",
    "name": "台塑清潔袋｜超大型 90L",
    "originalName": "超大_90L",
    "description": "專業級超大容量，滿足高強度清理需求。一捲多張，經濟實惠，是大型活動、工地或營業場所清潔的理想選擇。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/01_清潔袋/01_一般捲取式/超大_90L/規格圖__IMG_0224.JPG",
        "note": "",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "超大",
      "capacity_or_dim": "90L",
      "quantity": "16張/捲"
    }
  },
  {
    "id": "01_清潔袋-01_一般捲取式-超小_10L",
    "categoryId": "01_清潔袋",
    "subcategoryId": "01_一般捲取式",
    "name": "台塑清潔袋｜超小型 10L",
    "originalName": "超小_10L",
    "description": "採用高品質 HDPE 原料，強韌耐用不易破裂。平底封口設計，增加承重空間，適合一般家庭、辦公室日常垃圾收集使用。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/01_清潔袋/01_一般捲取式/超小_10L/規格圖__IMG_0223.JPG",
        "note": "",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "超小",
      "capacity_or_dim": "10L",
      "quantity": "100張/捲"
    }
  },
  {
    "id": "01_清潔袋-01_一般捲取式-飯店旅館無心捲_10L",
    "categoryId": "01_清潔袋",
    "subcategoryId": "01_一般捲取式",
    "name": "台塑清潔袋｜飯店旅館無心捲型 10L",
    "originalName": "飯店旅館無心捲_10L",
    "description": "專為飯店旅館設計的無心捲規格，節省空間且更換便利。採用高品質 HDPE 材質，強韌抗拉扯，是專業住宿空間清潔的優質選擇。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/01_清潔袋/01_一般捲取式/飯店旅館無心捲_10L/規格圖__IMG_0228.JPG",
        "note": "",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "飯店旅館無心捲",
      "capacity_or_dim": "10L",
      "quantity": "100張/捲"
    }
  },
  {
    "id": "01_清潔袋-02_拉繩式-大_45L_24張",
    "categoryId": "01_清潔袋",
    "subcategoryId": "02_拉繩式",
    "name": "台塑拉繩清潔袋｜大型 45L",
    "originalName": "大_45L_24張",
    "description": "獨特拉繩設計，一拉即收，不髒手且封口快速便利。採用加厚強韌材質，抗刺穿力強，適合廚房及各類居家清潔使用。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/01_清潔袋/02_拉繩式/大_45L_24張/規格圖__IMG_0230.JPG",
        "note": "",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "大",
      "capacity_or_dim": "45L",
      "quantity": "24張"
    }
  },
  {
    "id": "01_清潔袋-02_拉繩式-巨無霸_130L_20張",
    "categoryId": "01_清潔袋",
    "subcategoryId": "02_拉繩式",
    "name": "台塑拉繩清潔袋｜巨無霸型 130L",
    "originalName": "巨無霸_130L_20張",
    "description": "獨特拉繩設計，一拉即收，不髒手且封口快速便利。採用加厚強韌材質，抗刺穿力強，適合廚房及各類居家清潔使用。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/01_清潔袋/02_拉繩式/巨無霸_130L_20張/規格圖__IMG_0231.JPG",
        "note": "",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "巨無霸",
      "capacity_or_dim": "130L",
      "quantity": "20張"
    }
  },
  {
    "id": "01_清潔袋-02_拉繩式-特大_70L_18張",
    "categoryId": "01_清潔袋",
    "subcategoryId": "02_拉繩式",
    "name": "台塑拉繩清潔袋｜特大型 70L",
    "originalName": "特大_70L_18張",
    "description": "獨特拉繩設計，一拉即收，不髒手且封口快速便利。採用加厚強韌材質，抗刺穿力強，適合廚房及各類居家清潔使用。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/01_清潔袋/02_拉繩式/特大_70L_18張/規格圖__IMG_0232.JPG",
        "note": "",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "特大",
      "capacity_or_dim": "70L",
      "quantity": "18張"
    }
  },
  {
    "id": "01_清潔袋-02_拉繩式-超大_90L_14張",
    "categoryId": "01_清潔袋",
    "subcategoryId": "02_拉繩式",
    "name": "台塑拉繩清潔袋｜超大型 90L",
    "originalName": "超大_90L_14張",
    "description": "獨特拉繩設計，一拉即收，不髒手且封口快速便利。採用加厚強韌材質，抗刺穿力強，適合廚房及各類居家清潔使用。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/01_清潔袋/02_拉繩式/超大_90L_14張/規格圖__IMG_0233.JPG",
        "note": "IMG_0233寫840×950mm，IMG_0220的14張款寫84×95cm；容量名稱依原圖。",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "超大",
      "capacity_or_dim": "90L",
      "quantity": "14張"
    }
  },
  {
    "id": "01_清潔袋-02_拉繩式-超大超值包_90L_25張",
    "categoryId": "01_清潔袋",
    "subcategoryId": "02_拉繩式",
    "name": "台塑拉繩清潔袋｜超大超值包型 90L",
    "originalName": "超大超值包_90L_25張",
    "description": "獨特拉繩設計，一拉即收，不髒手且封口快速便利。採用加厚強韌材質，抗刺穿力強，適合廚房及各類居家清潔使用。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/01_清潔袋/02_拉繩式/超大超值包_90L_25張/規格圖__IMG_0234.JPG",
        "note": "",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "超大超值包",
      "capacity_or_dim": "90L",
      "quantity": "25張"
    }
  },
  {
    "id": "01_清潔袋-02_拉繩式-超特大_125L_15張",
    "categoryId": "01_清潔袋",
    "subcategoryId": "02_拉繩式",
    "name": "台塑拉繩清潔袋｜超特大型 125L",
    "originalName": "超特大_125L_15張",
    "description": "獨特拉繩設計，一拉即收，不髒手且封口快速便利。採用加厚強韌材質，抗刺穿力強，適合廚房及各類居家清潔使用。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/01_清潔袋/02_拉繩式/超特大_125L_15張/規格圖__IMG_0235.JPG",
        "note": "",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "超特大",
      "capacity_or_dim": "125L",
      "quantity": "15張"
    }
  },
  {
    "id": "01_清潔袋-03_抽取式與業務用-超大_黑色_28張",
    "categoryId": "01_清潔袋",
    "subcategoryId": "03_抽取式與業務用",
    "name": "台塑清潔袋(抽取/業務用)｜超大 黑色",
    "originalName": "超大_黑色_28張",
    "description": "專業級大容量設計，滿足高強度清理需求。加厚材質提供優異的抗刺穿與承重能力，是大型活動、工地或營業場所清潔的理想選擇。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/01_清潔袋/03_抽取式與業務用/超大_黑色_28張/規格圖__IMG_0239.JPG",
        "note": "",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "超大",
      "capacity_or_dim": "黑色",
      "quantity": "28張"
    }
  },
  {
    "id": "01_清潔袋-03_抽取式與業務用-超巨大_165L_22張",
    "categoryId": "01_清潔袋",
    "subcategoryId": "03_抽取式與業務用",
    "name": "台塑清潔袋(抽取/業務用)｜超巨大 165L",
    "originalName": "超巨大_165L_22張",
    "description": "專業級大容量設計，滿足高強度清理需求。加厚材質提供優異的抗刺穿與承重能力，是大型活動、工地或營業場所清潔的理想選擇。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/01_清潔袋/03_抽取式與業務用/超巨大_165L_22張/規格圖__IMG_0237.JPG",
        "note": "",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "超巨大",
      "capacity_or_dim": "165L",
      "quantity": "22張"
    }
  },
  {
    "id": "01_清潔袋-03_抽取式與業務用-超巨霸_260L_17張",
    "categoryId": "01_清潔袋",
    "subcategoryId": "03_抽取式與業務用",
    "name": "台塑清潔袋(抽取/業務用)｜超巨霸 260L",
    "originalName": "超巨霸_260L_17張",
    "description": "專業級大容量設計，滿足高強度清理需求。加厚材質提供優異的抗刺穿與承重能力，是大型活動、工地或營業場所清潔的理想選擇。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/01_清潔袋/03_抽取式與業務用/超巨霸_260L_17張/規格圖__IMG_0238.JPG",
        "note": "",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "超巨霸",
      "capacity_or_dim": "260L",
      "quantity": "17張"
    }
  },
  {
    "id": "01_清潔袋-03_抽取式與業務用-超特大_125L_21張",
    "categoryId": "01_清潔袋",
    "subcategoryId": "03_抽取式與業務用",
    "name": "台塑清潔袋(抽取/業務用)｜超特大 125L",
    "originalName": "超特大_125L_21張",
    "description": "專業級大容量設計，滿足高強度清理需求。加厚材質提供優異的抗刺穿與承重能力，是大型活動、工地或營業場所清潔的理想選擇。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/01_清潔袋/03_抽取式與業務用/超特大_125L_21張/規格圖__IMG_0229.JPG",
        "note": "總覽列黑與透明，這張標題僅寫透明；實際供貨顏色待確認。",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "超特大",
      "capacity_or_dim": "125L",
      "quantity": "21張"
    }
  },
  {
    "id": "01_清潔袋-03_抽取式與業務用-超特大_一般30張與加厚27張",
    "categoryId": "01_清潔袋",
    "subcategoryId": "03_抽取式與業務用",
    "name": "台塑清潔袋(抽取/業務用)｜超特大 一般30張與加厚27張",
    "originalName": "超特大_一般30張與加厚27張",
    "description": "專業級大容量設計，滿足高強度清理需求。提供一般型與加厚型兩種規格選擇，具備優異的抗刺穿與承重能力，是各類專業清潔的最佳選擇。",
    "images": [
      {
        "role": "雙款規格圖",
        "path": "/assets/01_清潔袋/03_抽取式與業務用/超特大_一般30張與加厚27張/雙款規格圖__IMG_0236.JPG",
        "note": "同一張含一般黑與透明30張，以及加厚黑27張，網站需拆為不同規格選項。",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "超特大",
      "capacity_or_dim": "一般與加厚",
      "quantity": "一般 30張 / 加厚 27張"
    }
  },
  {
    "id": "01_清潔袋-04_醫療感染性廢棄物袋-感染袋_多尺寸",
    "categoryId": "01_清潔袋",
    "subcategoryId": "04_醫療感染性廢棄物袋",
    "name": "醫療感染性廢棄物袋",
    "originalName": "感染袋_多尺寸",
    "description": "符合醫療廢棄物處理標準，採用高密度強韌材質，防漏性極佳。鮮明顏色與警示標誌，確保醫療廢棄物收集過程的安全性與規範性。",
    "images": [],
    "specs": [
      {
        "id": "medical-waste-bag-8l",
        "size": "8L",
        "label": "8L",
        "dimensions": [39, 40],
        "sheets_per_box": 40,
        "barcode": "",
        "images": [
          {
            "role": "系列規格圖",
            "path": "/assets/01_清潔袋/04_醫療感染性廢棄物袋/系列規格圖__IMG_0215.JPG",
            "order": 1
          }
        ]
      },
      {
        "id": "medical-waste-bag-20l",
        "size": "20L",
        "label": "20L",
        "dimensions": [52, 55],
        "sheets_per_box": 22,
        "barcode": "",
        "images": [
          {
            "role": "系列規格圖",
            "path": "/assets/01_清潔袋/04_醫療感染性廢棄物袋/系列規格圖__IMG_0215.JPG",
            "order": 1
          }
        ]
      },
      {
        "id": "medical-waste-bag-50l",
        "size": "50L",
        "label": "50L",
        "dimensions": [69, 78],
        "sheets_per_box": 12,
        "barcode": "",
        "images": [
          {
            "role": "系列規格圖",
            "path": "/assets/01_清潔袋/04_醫療感染性廢棄物袋/系列規格圖__IMG_0215.JPG",
            "order": 1
          }
        ]
      },
      {
        "id": "medical-waste-bag-70l",
        "size": "70L",
        "label": "70L",
        "dimensions": [77, 92],
        "sheets_per_box": 8,
        "barcode": "",
        "images": [
          {
            "role": "系列規格圖",
            "path": "/assets/01_清潔袋/04_醫療感染性廢棄物袋/系列規格圖__IMG_0215.JPG",
            "order": 1
          }
        ]
      },
      {
        "id": "medical-waste-bag-90l",
        "size": "90L",
        "label": "90L",
        "dimensions": [95, 84],
        "sheets_per_box": 12,
        "barcode": "",
        "images": [
          {
            "role": "系列規格圖",
            "path": "/assets/01_清潔袋/04_醫療感染性廢棄物袋/系列規格圖__IMG_0215.JPG",
            "order": 1
          }
        ]
      }
    ],
    "shared_images": [
      {
        "role": "封面圖",
        "path": "/assets/01_清潔袋/04_醫療感染性廢棄物袋/醫療感染性廢棄物袋封面圖.png",
        "order": 2
      }
    ],
    "parsedSpec": null
  },
  {
    "id": "02_食品保鮮耐熱袋-01_台塑保鮮耐熱袋-200x300mm_150枚",
    "categoryId": "02_食品保鮮耐熱袋",
    "subcategoryId": "01_台塑保鮮耐熱袋",
    "name": "台塑保鮮耐熱袋｜200x300mm 150枚",
    "originalName": "200x300mm_150枚",
    "description": "選用 100% 全新食品級原料，不含塑化劑，符合衛生安全標準。採用高品質封口技術，強韌耐用防漏，耐熱性佳，適用於食材保鮮、分裝與加熱，是廚房料理與食品儲存的安心首選。",
    "images": [
      {
        "role": "包裝正面圖",
        "path": "/assets/02_食品保鮮耐熱袋/01_台塑保鮮耐熱袋/200x300mm_150枚/包裝正面圖__IMG_0243.JPG",
        "note": "",
        "order": 0
      },
      {
        "role": "包裝背面圖",
        "path": "/assets/02_食品保鮮耐熱袋/01_台塑保鮮耐熱袋/200x300mm_150枚/包裝背面圖__IMG_0240.JPG",
        "note": "",
        "order": 0
      },
      {
        "role": "規格圖",
        "path": "/assets/02_食品保鮮耐熱袋/01_台塑保鮮耐熱袋/200x300mm_150枚/規格圖__IMG_0216.JPG",
        "note": "規格圖寫每捲；包裝是盒裝，售賣單位請再確認。",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "200x300mm",
      "capacity_or_dim": "150枚",
      "quantity": "150枚/盒"
    }
  },
  {
    "id": "02_食品保鮮耐熱袋-01_台塑保鮮耐熱袋-280x410mm_100枚",
    "categoryId": "02_食品保鮮耐熱袋",
    "subcategoryId": "01_台塑保鮮耐熱袋",
    "name": "台塑保鮮耐熱袋｜280x410mm 100枚",
    "originalName": "280x410mm_100枚",
    "description": "選用 100% 全新食品級原料，不含塑化劑，符合衛生安全標準。採用高品質封口技術，強韌耐用防漏，耐熱性佳，適用於食材保鮮、分裝與加熱，是廚房料理與食品儲存的安心首選。",
    "images": [
      {
        "role": "包裝正面圖",
        "path": "/assets/02_食品保鮮耐熱袋/01_台塑保鮮耐熱袋/280x410mm_100枚/包裝正面圖__IMG_0241.JPG",
        "note": "",
        "order": 0
      },
      {
        "role": "包裝背面圖",
        "path": "/assets/02_食品保鮮耐熱袋/01_台塑保鮮耐熱袋/280x410mm_100枚/包裝背面圖__IMG_0242.JPG",
        "note": "",
        "order": 0
      },
      {
        "role": "規格圖",
        "path": "/assets/02_食品保鮮耐熱袋/01_台塑保鮮耐熱袋/280x410mm_100枚/規格圖__IMG_0217.JPG",
        "note": "規格圖寫每捲；包裝是盒裝，售賣單位請再確認。",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "280x410mm",
      "capacity_or_dim": "100枚",
      "quantity": "100枚/盒"
    }
  },
  {
    "id": "02_食品保鮮耐熱袋-02_營潔平板式耐熱袋-四兩裝_15.5x19.5cm",
    "categoryId": "02_食品保鮮耐熱袋",
    "subcategoryId": "02_營潔平板式耐熱袋",
    "name": "營潔平板式耐熱袋｜四兩裝 15.5x19.5cm",
    "originalName": "四兩裝_15.5x19.5cm",
    "description": "選用 100% 全新食品級原料，不含塑化劑，符合衛生安全標準。採用高品質封口技術，強韌耐用防漏，耐熱性佳，適用於食材保鮮、分裝與加熱，是廚房料理與食品儲存的安心首選。",
    "images": [
      {
        "role": "包裝正面圖",
        "path": "/assets/02_食品保鮮耐熱袋/02_營潔平板式耐熱袋/306.jpg",
        "note": "HDPE高密度聚乙烯，360張±5%",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "四兩裝",
      "capacity_or_dim": "15.5x19.5cm",
      "quantity": "360張"
    }
  },
  {
    "id": "03_夾鏈袋-01_台塑LDPE夾鏈袋-00特小號_35x40mm",
    "categoryId": "03_夾鏈袋",
    "subcategoryId": "01_台塑LDPE夾鏈袋",
    "name": "台塑夾鏈袋｜00號",
    "originalName": "00特小號_35x40mm",
    "description": "高品質食品級 PE 材質，透明度高，方便內容物辨識。獨家高品質夾鏈封口，密封性極佳，適合乾貨、文具、衣物或各類生活小物分類收納。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/03_夾鏈袋/01_台塑LDPE夾鏈袋/00特小號_35x40mm/規格圖__IMG_0253.JPG",
        "note": "原圖號數為00號；厚0.04mm，100張。00號與0號是不同尺寸。",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "00號",
      "capacity_or_dim": "35x40mm",
      "quantity": "100張/包"
    }
  },
  {
    "id": "03_夾鏈袋-01_台塑LDPE夾鏈袋-00號_40x60mm",
    "categoryId": "03_夾鏈袋",
    "subcategoryId": "01_台塑LDPE夾鏈袋",
    "name": "台塑夾鏈袋｜0號",
    "originalName": "00號_40x60mm",
    "description": "高品質食品級 PE 材質，透明度高，方便內容物辨識。獨家高品質夾鏈封口，密封性極佳，適合乾貨、文具、衣物或各類生活小物分類收納。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/03_夾鏈袋/01_台塑LDPE夾鏈袋/00號_40x60mm/規格圖__IMG_0254.JPG",
        "note": "原圖號數為0號；厚0.04mm，100張。00號與0號是不同尺寸。",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "0號",
      "capacity_or_dim": "40x60mm",
      "quantity": "100張/包"
    }
  },
  {
    "id": "03_夾鏈袋-01_台塑LDPE夾鏈袋-01號_50x70mm",
    "categoryId": "03_夾鏈袋",
    "subcategoryId": "01_台塑LDPE夾鏈袋",
    "name": "台塑夾鏈袋｜1號",
    "originalName": "01號_50x70mm",
    "description": "高品質食品級 PE 材質，透明度高，方便內容物辨識。獨家高品質夾鏈封口，密封性極佳，適合乾貨、文具、衣物或各類生活小物分類收納。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/03_夾鏈袋/01_台塑LDPE夾鏈袋/01號_50x70mm/規格圖__IMG_0255.JPG",
        "note": "原圖號數為1號；厚0.04mm，100張。00號與0號是不同尺寸。",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "1號",
      "capacity_or_dim": "50x70mm",
      "quantity": "100張/包"
    }
  },
  {
    "id": "03_夾鏈袋-01_台塑LDPE夾鏈袋-02號_60x85mm",
    "categoryId": "03_夾鏈袋",
    "subcategoryId": "01_台塑LDPE夾鏈袋",
    "name": "台塑夾鏈袋｜2號",
    "originalName": "02號_60x85mm",
    "description": "高品質食品級 PE 材質，透明度高，方便內容物辨識。獨家高品質夾鏈封口，密封性極佳，適合乾貨、文具、衣物或各類生活小物分類收納。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/03_夾鏈袋/01_台塑LDPE夾鏈袋/02號_60x85mm/規格圖__IMG_0256.JPG",
        "note": "原圖號數為2號；厚0.04mm，100張。00號與0號是不同尺寸。",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "2號",
      "capacity_or_dim": "60x85mm",
      "quantity": "100張/包"
    }
  },
  {
    "id": "03_夾鏈袋-01_台塑LDPE夾鏈袋-03號_70x100mm",
    "categoryId": "03_夾鏈袋",
    "subcategoryId": "01_台塑LDPE夾鏈袋",
    "name": "台塑夾鏈袋｜3號",
    "originalName": "03號_70x100mm",
    "description": "高品質食品級 PE 材質，透明度高，方便內容物辨識。獨家高品質夾鏈封口，密封性極佳，適合乾貨、文具、衣物或各類生活小物分類收納。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/03_夾鏈袋/01_台塑LDPE夾鏈袋/03號_70x100mm/規格圖__IMG_0257.JPG",
        "note": "原圖號數為3號；厚0.04mm，100張。00號與0號是不同尺寸。",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "3號",
      "capacity_or_dim": "70x100mm",
      "quantity": "100張/包"
    }
  },
  {
    "id": "03_夾鏈袋-01_台塑LDPE夾鏈袋-04號_85x120mm",
    "categoryId": "03_夾鏈袋",
    "subcategoryId": "01_台塑LDPE夾鏈袋",
    "name": "台塑夾鏈袋｜4號",
    "originalName": "04號_85x120mm",
    "description": "高品質食品級 PE 材質，透明度高，方便內容物辨識。獨家高品質夾鏈封口，密封性極佳，適合乾貨、文具、衣物或各類生活小物分類收納。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/03_夾鏈袋/01_台塑LDPE夾鏈袋/04號_85x120mm/規格圖__IMG_0244.JPG",
        "note": "原圖號數為4號；厚0.04mm，100張。00號與0號是不同尺寸。",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "4號",
      "capacity_or_dim": "85x120mm",
      "quantity": "100張/包"
    }
  },
  {
    "id": "03_夾鏈袋-01_台塑LDPE夾鏈袋-05號_100x140mm",
    "categoryId": "03_夾鏈袋",
    "subcategoryId": "01_台塑LDPE夾鏈袋",
    "name": "台塑夾鏈袋｜5號",
    "originalName": "05號_100x140mm",
    "description": "高品質食品級 PE 材質，透明度高，方便內容物辨識。獨家高品質夾鏈封口，密封性極佳，適合乾貨、文具、衣物或各類生活小物分類收納。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/03_夾鏈袋/01_台塑LDPE夾鏈袋/05號_100x140mm/規格圖__IMG_0245.JPG",
        "note": "原圖號數為5號；厚0.04mm，100張。00號與0號是不同尺寸。",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "5號",
      "capacity_or_dim": "100x140mm",
      "quantity": "100張/包"
    }
  },
  {
    "id": "03_夾鏈袋-01_台塑LDPE夾鏈袋-06號_120x170mm",
    "categoryId": "03_夾鏈袋",
    "subcategoryId": "01_台塑LDPE夾鏈袋",
    "name": "台塑夾鏈袋｜6號",
    "originalName": "06號_120x170mm",
    "description": "高品質食品級 PE 材質，透明度高，方便內容物辨識。獨家高品質夾鏈封口，密封性極佳，適合乾貨、文具、衣物或各類生活小物分類收納。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/03_夾鏈袋/01_台塑LDPE夾鏈袋/06號_120x170mm/規格圖__IMG_0246.JPG",
        "note": "原圖號數為6號；厚0.04mm，100張。00號與0號是不同尺寸。",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "6號",
      "capacity_or_dim": "120x170mm",
      "quantity": "100張/包"
    }
  },
  {
    "id": "03_夾鏈袋-01_台塑LDPE夾鏈袋-07號_140x200mm",
    "categoryId": "03_夾鏈袋",
    "subcategoryId": "01_台塑LDPE夾鏈袋",
    "name": "台塑夾鏈袋｜7號",
    "originalName": "07號_140x200mm",
    "description": "高品質食品級 PE 材質，透明度高，方便內容物辨識。獨家高品質夾鏈封口，密封性極佳，適合乾貨、文具、衣物或各類生活小物分類收納。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/03_夾鏈袋/01_台塑LDPE夾鏈袋/07號_140x200mm/規格圖__IMG_0247.JPG",
        "note": "原圖號數為7號；厚0.04mm，100張。00號與0號是不同尺寸。",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "7號",
      "capacity_or_dim": "140x200mm",
      "quantity": "100張/包"
    }
  },
  {
    "id": "03_夾鏈袋-01_台塑LDPE夾鏈袋-08號_170x240mm",
    "categoryId": "03_夾鏈袋",
    "subcategoryId": "01_台塑LDPE夾鏈袋",
    "name": "台塑夾鏈袋｜8 號",
    "originalName": "08號_170x240mm",
    "description": "高品質食品級 PE 材質，透明度高，方便內容物辨識。獨家高品質夾鏈封口，密封性極佳，適合乾貨、文具、衣物或各類生活小物分類收納。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/03_夾鏈袋/01_台塑LDPE夾鏈袋/08號_170x240mm/規格圖__IMG_0248.JPG",
        "note": "原圖號數為8號；厚0.04mm，100張。00號與0號是不同尺寸。",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "8號",
      "capacity_or_dim": "170x240mm",
      "quantity": "100張/包"
    }
  },
  {
    "id": "03_夾鏈袋-01_台塑LDPE夾鏈袋-09號_200x280mm",
    "categoryId": "03_夾鏈袋",
    "subcategoryId": "01_台塑LDPE夾鏈袋",
    "name": "台塑夾鏈袋｜9號",
    "originalName": "09號_200x280mm",
    "description": "高品質食品級 PE 材質，透明度高，方便內容物辨識。獨家高品質夾鏈封口，密封性極佳，適合乾貨、文具、衣物或各類生活小物分類收納。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/03_夾鏈袋/01_台塑LDPE夾鏈袋/09號_200x280mm/規格圖__IMG_0249.JPG",
        "note": "原圖號數為9號；厚0.04mm，100張。00號與0號是不同尺寸。",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "9號",
      "capacity_or_dim": "200x280mm",
      "quantity": "100張/包"
    }
  },
  {
    "id": "03_夾鏈袋-01_台塑LDPE夾鏈袋-10號_240x340mm",
    "categoryId": "03_夾鏈袋",
    "subcategoryId": "01_台塑LDPE夾鏈袋",
    "name": "台塑夾鏈袋｜10號",
    "originalName": "10號_240x340mm",
    "description": "高品質食品級 PE 材質，透明度高，方便內容物辨識。獨家高品質夾鏈封口，密封性極佳，適合乾貨、文具、衣物或各類生活小物分類收納。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/03_夾鏈袋/01_台塑LDPE夾鏈袋/10號_240x340mm/規格圖__IMG_0250.JPG",
        "note": "原圖號數為10號；厚0.04mm，100張。00號與0號是不同尺寸。",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "10號",
      "capacity_or_dim": "240x340mm",
      "quantity": "100張/包"
    }
  },
  {
    "id": "03_夾鏈袋-01_台塑LDPE夾鏈袋-11號_280x400mm",
    "categoryId": "03_夾鏈袋",
    "subcategoryId": "01_台塑LDPE夾鏈袋",
    "name": "台塑夾鏈袋｜11號",
    "originalName": "11號_280x400mm",
    "description": "高品質食品級 PE 材質，透明度高，方便內容物辨識。獨家高品質夾鏈封口，密封性極佳，適合乾貨、文具、衣物或各類生活小物分類收納。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/03_夾鏈袋/01_台塑LDPE夾鏈袋/11號_280x400mm/規格圖__IMG_0251.JPG",
        "note": "原圖號數為11號；厚0.04mm，100張。00號與0號是不同尺寸。",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "11號",
      "capacity_or_dim": "280x400mm",
      "quantity": "100張/包"
    }
  },
  {
    "id": "03_夾鏈袋-01_台塑LDPE夾鏈袋-12號_340x450mm",
    "categoryId": "03_夾鏈袋",
    "subcategoryId": "01_台塑LDPE夾鏈袋",
    "name": "台塑夾鏈袋｜12號",
    "originalName": "12號_340x450mm",
    "description": "高品質食品級 PE 材質，透明度高，方便內容物辨識。獨家高品質夾鏈封口，密封性極佳，適合乾貨、文具、衣物或各類生活小物分類收納。",
    "images": [
      {
        "role": "規格圖",
        "path": "/assets/03_夾鏈袋/01_台塑LDPE夾鏈袋/12號_340x450mm/規格圖__IMG_0252.JPG",
        "note": "原圖號數為12號；厚0.04mm，100張。00號與0號是不同尺寸。",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "12號",
      "capacity_or_dim": "340x450mm",
      "quantity": "100張/包"
    }
  },
  {
    "id": "04_病媒防治-01_蟑螂防治-00_蟑螂知識素材",
    "categoryId": "04_病媒防治",
    "subcategoryId": "01_蟑螂防治",
    "name": "00",
    "originalName": "00_蟑螂知識素材",
    "description": "提供專業的蟑螂防治衛教知識，幫助您了解蟑螂的習性與危害，並掌握正確的防治方法，維護居家環境衛生。",
    "images": [
      {
        "role": "蟑螂危害說明圖",
        "path": "/assets/04_病媒防治/01_蟑螂防治/00_蟑螂知識素材/蟑螂危害說明圖__IMG_0265.JPG",
        "note": "衛教類素材，不是獨立商品。",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "00",
      "capacity_or_dim": "蟑螂知識素材",
      "quantity": ""
    },
    "notForSale": true
  },
  {
    "id": "04_病媒防治-01_蟑螂防治-快點絕_0.5百分比凝膠餌劑",
    "categoryId": "04_病媒防治",
    "subcategoryId": "01_蟑螂防治",
    "name": "快點絕",
    "originalName": "快點絕_0.5百分比凝膠餌劑",
    "description": "專業級滅蟑配方，誘引力強且連鎖滅除效果顯著。針筒式設計方便施藥於縫隙死角，是居家與營業場所環境衛生維護的專業選擇。",
    "images": [
      {
        "role": "01_包裝與針筒主圖",
        "path": "/assets/04_病媒防治/01_蟑螂防治/快點絕_0.5百分比凝膠餌劑/01_包裝與針筒主圖__IMG_0259.JPG",
        "note": "",
        "order": 0
      },
      {
        "role": "02_包裝橫圖",
        "path": "/assets/04_病媒防治/01_蟑螂防治/快點絕_0.5百分比凝膠餌劑/02_包裝橫圖__IMG_0260.JPG",
        "note": "",
        "order": 0
      },
      {
        "role": "03_針筒單品圖",
        "path": "/assets/04_病媒防治/01_蟑螂防治/快點絕_0.5百分比凝膠餌劑/03_針筒單品圖__IMG_0261.JPG",
        "note": "433×577，解析度偏低，避免大幅放大。",
        "order": 0
      },
      {
        "role": "04_10g與30g宣傳圖",
        "path": "/assets/04_病媒防治/01_蟑螂防治/快點絕_0.5百分比凝膠餌劑/04_10g與30g宣傳圖__IMG_0266.JPG",
        "note": "同圖含10g與30g；不要當成兩款皆有獨立主圖。",
        "order": 0
      },
      {
        "role": "05_產品介紹與特點",
        "path": "/assets/04_病媒防治/01_蟑螂防治/快點絕_0.5百分比凝膠餌劑/05_產品介紹與特點__IMG_0264.JPG",
        "note": "頁面未直接標出品名；依同批快點絕版式與達特胺內容暫歸，需確認。",
        "order": 0
      },
      {
        "role": "06_使用方法與注意事項",
        "path": "/assets/04_病媒防治/01_蟑螂防治/快點絕_0.5百分比凝膠餌劑/06_使用方法與注意事項__IMG_0262.JPG",
        "note": "頁面未直接標出品名；依版式、環署衛輸字第0807號與同批資料暫歸快點絕，需確認對應。",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "快點絕",
      "capacity_or_dim": "0.5百分比凝膠餌劑",
      "quantity": ""
    }
  },
  {
    "id": "04_病媒防治-02_老鼠防治-一錠鼠_滅鼠餌劑",
    "categoryId": "04_病媒防治",
    "subcategoryId": "02_老鼠防治",
    "name": "一錠鼠",
    "originalName": "一錠鼠_滅鼠餌劑",
    "description": "強力誘引配方搭配高效滅鼠成分，針對老鼠習性設計。投藥簡便，能有效解決鼠患問題，維護環境整潔與衛生安全。",
    "images": [
      {
        "role": "01_包裝主圖",
        "path": "/assets/04_病媒防治/02_老鼠防治/一錠鼠_滅鼠餌劑/01_包裝主圖__IMG_0268.JPG",
        "note": "使用說明與功效文字僅保留原圖，不代表已核驗；不可自行補寫劑量。",
        "order": 0
      },
      {
        "role": "02_宣傳主視覺",
        "path": "/assets/04_病媒防治/02_老鼠防治/一錠鼠_滅鼠餌劑/02_宣傳主視覺__IMG_0258.JPG",
        "note": "使用說明與功效文字僅保留原圖，不代表已核驗；不可自行補寫劑量。",
        "order": 0
      },
      {
        "role": "03_產品介紹",
        "path": "/assets/04_病媒防治/02_老鼠防治/一錠鼠_滅鼠餌劑/03_產品介紹__IMG_0269.JPG",
        "note": "使用說明與功效文字僅保留原圖，不代表已核驗；不可自行補寫劑量。",
        "order": 0
      },
      {
        "role": "04_產品特點",
        "path": "/assets/04_病媒防治/02_老鼠防治/一錠鼠_滅鼠餌劑/04_產品特點__IMG_0267.JPG",
        "note": "使用說明與功效文字僅保留原圖，不代表已核驗；不可自行補寫劑量。",
        "order": 0
      },
      {
        "role": "05_使用情境",
        "path": "/assets/04_病媒防治/02_老鼠防治/一錠鼠_滅鼠餌劑/05_使用情境__IMG_0270.JPG",
        "note": "使用說明與功效文字僅保留原圖，不代表已核驗；不可自行補寫劑量。",
        "order": 0
      },
      {
        "role": "06_使用方法與注意事項",
        "path": "/assets/04_病媒防治/02_老鼠防治/一錠鼠_滅鼠餌劑/06_使用方法與注意事項__IMG_0271.JPG",
        "note": "使用說明與功效文字僅保留原圖，不代表已核驗；不可自行補寫劑量。",
        "order": 0
      }
    ],
    "specs": [],
    "shared_images": [],
    "parsedSpec": {
      "size_or_type": "一錠鼠",
      "capacity_or_dim": "滅鼠餌劑",
      "quantity": ""
    }
  },
  {
    "id": "fp-zipper-storage",
    "categoryId": "03_夾鏈袋",
    "subcategoryId": "02_台塑保鮮密實袋",
    "name": "台塑保鮮密實袋",
    "originalName": "台塑保鮮密實袋",
    "description": "加厚材質設計，具備優異的防潮與保鮮功能。強化夾鏈封口，能有效防止異味混雜與液體滲漏，適合冰箱冷藏儲存與食材保鮮。",
    "images": [],
    "specs": [
      {
        "id": "fp-zipper-storage-l",
        "size": "L",
        "label": "大",
        "dimensions": [
          26.8,
          27.3
        ],
        "sheets_per_box": 20,
        "barcode": "4711046993138",
        "images": [
          {
            "role": "包裝正面主圖",
            "path": "/assets/03_夾鏈袋/02_台塑保鮮密實袋/L_大_20張每盒/01_包裝正面主圖__IMG_0282.JPG",
            "order": 1
          },
          {
            "role": "包裝用途面",
            "path": "/assets/03_夾鏈袋/02_台塑保鮮密實袋/L_大_20張每盒/02_包裝用途面__IMG_0276.JPG",
            "order": 2
          },
          {
            "role": "包裝背面規格",
            "path": "/assets/03_夾鏈袋/02_台塑保鮮密實袋/L_大_20張每盒/03_包裝背面規格__IMG_0277.JPG",
            "order": 3
          }
        ]
      },
      {
        "id": "fp-zipper-storage-m",
        "size": "M",
        "label": "中",
        "dimensions": [
          17.8,
          19.5
        ],
        "sheets_per_box": 40,
        "barcode": "4711046993121",
        "images": [
          {
            "role": "包裝正面主圖",
            "path": "/assets/03_夾鏈袋/02_台塑保鮮密實袋/M_中_40張每盒/01_包裝正面主圖__IMG_0278.JPG",
            "order": 1
          },
          {
            "role": "包裝用途面",
            "path": "/assets/03_夾鏈袋/02_台塑保鮮密實袋/M_中_40張每盒/02_包裝用途面__IMG_0279.JPG",
            "order": 2
          },
          {
            "role": "包裝背面規格",
            "path": "/assets/03_夾鏈袋/02_台塑保鮮密實袋/M_中_40張每盒/03_包裝背面規格__IMG_0280.JPG",
            "order": 3
          }
        ]
      }
    ],
    "shared_images": [
      {
        "role": "系列規格圖",
        "path": "/assets/03_夾鏈袋/02_台塑保鮮密實袋/00_系列共用/04_系列規格圖__IMG_0281.JPG",
        "order": 4
      }
    ],
    "parsedSpec": null
  },
  {
    "id": "fp-freezer-bag",
    "categoryId": "03_夾鏈袋",
    "subcategoryId": "03_台塑保鮮冷凍袋",
    "name": "台塑保鮮冷凍袋",
    "originalName": "台塑保鮮冷凍袋",
    "description": "專為冷凍環境設計的加厚材質，耐低溫且不易脆裂。強效夾鏈封口能嚴密隔絕空氣，防止食材凍傷與水分流失，是冷凍儲存的最佳選擇。",
    "images": [],
    "specs": [
      {
        "id": "fp-freezer-bag-l",
        "size": "L",
        "label": "大",
        "dimensions": [
          26.8,
          27.3
        ],
        "sheets_per_box": 14,
        "barcode": "4711046993152",
        "images": [
          {
            "role": "包裝正面主圖",
            "path": "/assets/03_夾鏈袋/03_台塑保鮮冷凍袋/L_大_14張每盒/01_包裝正面主圖__IMG_0284.JPG",
            "order": 1
          },
          {
            "role": "包裝用途面",
            "path": "/assets/03_夾鏈袋/03_台塑保鮮冷凍袋/L_大_14張每盒/02_包裝用途面__IMG_0285.JPG",
            "order": 2
          },
          {
            "role": "包裝背面規格",
            "path": "/assets/03_夾鏈袋/03_台塑保鮮冷凍袋/L_大_14張每盒/03_包裝背面規格__IMG_0286.JPG",
            "order": 3
          }
        ]
      },
      {
        "id": "fp-freezer-bag-m",
        "size": "M",
        "label": "中",
        "dimensions": [
          17.8,
          19.5
        ],
        "sheets_per_box": 30,
        "barcode": "4711046993145",
        "images": [
          {
            "role": "包裝正面主圖",
            "path": "/assets/03_夾鏈袋/03_台塑保鮮冷凍袋/M_中_30張每盒/01_包裝正面主圖__IMG_0287.JPG",
            "order": 1
          },
          {
            "role": "包裝用途面",
            "path": "/assets/03_夾鏈袋/03_台塑保鮮冷凍袋/M_中_30張每盒/02_包裝用途面__IMG_0288.JPG",
            "order": 2
          },
          {
            "role": "包裝背面規格",
            "path": "/assets/03_夾鏈袋/03_台塑保鮮冷凍袋/M_中_30張每盒/03_包裝背面規格__IMG_0289.JPG",
            "order": 3
          }
        ]
      }
    ],
    "shared_images": [
      {
        "role": "系列規格圖",
        "path": "/assets/03_夾鏈袋/03_台塑保鮮冷凍袋/00_系列共用/04_系列規格圖__IMG_0283.JPG",
        "order": 4
      }
    ],
    "parsedSpec": null
  }
];