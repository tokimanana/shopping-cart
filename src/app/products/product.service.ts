import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { Product } from './product.model';
import { environment } from '../../environments/environment';

type ProductsResponse = { products: Product[] };

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);

  private readonly productUrl = environment.production ? '/db.json' : `${environment.apiUrl}/products`;

  getProducts(): Observable<Product[]> {
    if (environment.production) {
      return this.http.get<ProductsResponse>(this.productUrl).pipe(
        delay(1000),
        map(response => response.products),
        catchError(() => throwError(() => new Error('Failed to fetch products, please try again later.')))
      );
    } else {
      return this.http.get<Product[]>(this.productUrl).pipe(
        delay(1000),
        catchError(() => throwError(() => new Error('Failed to fetch products, please try again later.')))
      );
    }
  }
}
