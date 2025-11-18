import { createReducer, on } from '@ngrx/store';
import { ProductState } from './product.model';
import { ProductActions } from './product.actions';

export const productsFeatureKey = 'products';

export const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const productsReducer = createReducer(
  initialState,

  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products: products,
    loading: false,
    error: null,
  })),

  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);
