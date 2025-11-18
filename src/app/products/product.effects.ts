import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ProductService } from './product.service';
import { ProductActions } from './product.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class ProductEffects {
  private action$ = inject(Actions);
  private productService = inject(ProductService);

  loadProducts$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProductActions.loadProducts),
      exhaustMap(() =>
        this.productService.getProducts().pipe(
          map((products) => {
            return ProductActions.loadProductsSuccess({ products });
          }),
          catchError((error) => {
            const apiError = {
              message: error?.message || 'Failed to load products',
              code: error?.code,
              details: error
            };
            return of(ProductActions.loadProductsFailure({ error: apiError }));
          })
        )
      )
    )
  );
}
