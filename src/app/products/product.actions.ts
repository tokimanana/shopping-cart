import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Product } from "./product.model";

export const ProductActions = createActionGroup({
  source: 'Products',
  events: {
    'Load products': emptyProps(),
    'Load products success': props<{ products: Product[] }>(),
    'Load products failure': props<{ error: any }>(),
  }
})
