import { createReducer, on } from "@ngrx/store";
import { CartItem } from "./cart.model";
import { CartActions } from "./cart.action";

export const cartFeatureKey = 'cart';

export interface CartState {
  items: CartItem[];
}

export const initialState: CartState = {
  items: [],
}

export const cartReducer = createReducer(
  initialState,

  on(CartActions.addItem, CartActions.increaseQuantity, (state, { productId }) => {
    const existingItemIndex = state.items.findIndex(item => item.productId === productId);

    const updatedItems: CartItem[] = existingItemIndex > -1
      ? state.items.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [...state.items, { productId, quantity: 1 }];

    return { ...state, items: updatedItems };
  }),

  on(CartActions.removeItem, (state, { productId }) => ({
    ...state,
    items: state.items.filter(item => item.productId !== productId),
  })),

  on(CartActions.decreaseQuantity, (state, { productId }) => {
    const existingItem = state.items.find(item => item.productId === productId);

    if (!existingItem || existingItem.quantity <= 1) {
      return {
        ...state,
        items: state.items.filter(item => item.productId !== productId),
      };
    }

    return {
      ...state,
      items: state.items.map(item =>
        item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
    };
  }),

  on(CartActions.clearCart, (state) => ({
    ...state,
    items: [],
  })),
);
