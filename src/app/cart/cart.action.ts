import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Add item': props<{ productId: string }>(),
    'Remove item': props<{ productId: string }>(),
    'Increase quantity': props<{ productId: string }>(),
    'Decrease quantity': props<{ productId: string }>(),
    'Clear cart': emptyProps(),
  },
});
