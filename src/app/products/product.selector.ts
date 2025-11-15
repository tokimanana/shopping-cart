import { ProductState } from './product.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductState,
  (state) => state.products
)

export const selectProductById = (productId: string) => createSelector(
  selectAllProducts,
  (products) => products.find(p => p.id === productId)
)
