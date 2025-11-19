export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: ApiError | null;
}
