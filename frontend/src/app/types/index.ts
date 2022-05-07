export interface Goods {
  id: string;
  category: string;
  category_id: number;
  name: string;
  price: number;
  description: string;
  images: {
    id: string;
    image: string;
    updated_at: string;
    goods: number;
  }[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
}
