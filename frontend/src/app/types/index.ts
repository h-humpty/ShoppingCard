export interface Goods {
  id: number;
  category: string;
  category_id: number;
  name: string;
  price: number;
  description: string;
  images: {
    id: number;
    image: string;
    updated_at: string;
    goods: number;
  }[];
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Cart {
  id: number;
  goods_detail: {
    id: number;
    category: string;
    category_id: number;
    images: string[];
    name: string;
    price: number;
    description: string;
  };
  goods: number;
  numbers: number;
  created_at: string;
  updated_at: string;
}
