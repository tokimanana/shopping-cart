import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, Observable, throwError } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);

  private readonly productUrl = 'http://localhost:3000/products';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl).pipe(
      delay(1000),
      catchError(() => {
        return throwError(() => new Error('Failed to fetch products, please try again later.'));
      })
    );
  }
}
