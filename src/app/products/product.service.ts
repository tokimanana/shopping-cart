import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { Product } from './product.model';
import { environment } from '../../environments/environment';

interface PaginatedResponse {
  data: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);

  private readonly productUrl = environment.production
    ? '/api/products'  // ← Vercel Serverless Function
    : `${environment.apiUrl}/products`;  // ← json-server local

  getProducts(page: number = 1, limit: number = 5): Observable<Product[]> {
    let params = new HttpParams();
    if (environment.production) {
      params = params.set('page', page.toString());
      params = params.set('limit', limit.toString());
    }

    return this.http.get<PaginatedResponse | Product[]>(this.productUrl, { params }).pipe(
      map(response => {
        if (Array.isArray(response)) {
          return response;
        }
        return response.data;
      }),
      delay(1000),
      catchError(() => {
        return throwError(() => new Error('Failed to fetch products, please try again later.'));
      })
    );
  }
}
