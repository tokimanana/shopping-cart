import { inject, Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { ProductService } from './product.service';

import { ProductActions } from './product.action';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class ProductEffects {
  private action$ = inject(Actions);
  private productService = inject(ProductService);

  loadProducts$ = this.action$.pipe(ofType(ProductActions.loadProducts),exhaustMap(() =>
    this.productService.getProducts().pipe(
      map(products => {
        return ProductActions.loadProductsSuccess({ products });
      }),
      catchError(error => {
        return of(ProductActions.loadProductsFailure({ error}))
      } )
    )
  ));
}
