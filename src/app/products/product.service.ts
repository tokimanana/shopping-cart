import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, Observable, throwError } from 'rxjs';
import { Product } from './product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);

  private readonly productUrl = environment.production
    ? '/api/products'  // ← Vercel Serverless Function
    : `${environment.apiUrl}/products`;  // ← json-server local

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl).pipe(
      delay(1000),
      catchError(() => {
        return throwError(() => new Error('Failed to fetch products, please try again later.'));
      })
    );
  }
}
