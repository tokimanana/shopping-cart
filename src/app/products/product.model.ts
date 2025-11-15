export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: any;
}
