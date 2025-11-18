import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCart from './cart.reducer';
import * as fromProducts from '../products/product.selector';

import { CartItem, CartItemDetailed } from './cart.model';
import { Product } from '../products/product.model';

export const selectCartState = createFeatureSelector<fromCart.CartState>(
  fromCart.cartFeatureKey
);

export const selectCartItems = createSelector(
  selectCartState,
  (state: fromCart.CartState) => state.items
);

export const selectCartTotalItems = createSelector(selectCartItems, (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
);

const mapCartItemToDetailes = (
  cartItem: CartItem,
  products: Product[]
): CartItemDetailed => {
  const productDetails = products.find((p) => p.id === cartItem.productId);

  const DEFAULT_PRODUCT = {
    name: 'Unknown Product',
    price: 0,
    imageUrl: '',
  };

  const product = productDetails ?? DEFAULT_PRODUCT;

  return {
        ...cartItem,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        lineTotal: product.price * cartItem.quantity,
      };
};

export const selectCartItemsWithDetails = createSelector(
  selectCartItems,
  fromProducts.selectAllProducts,
  (items, products): CartItemDetailed[] => {
    if (!products || products.length === 0) {
      return [];
    }

    return items.map(item => mapCartItemToDetailes(item, products));
  }
);

export const selectCartTotalPrice = createSelector(
  selectCartItemsWithDetails,
  (detailedItems) => detailedItems.reduce((total, item) => total + item.lineTotal, 0)
);


