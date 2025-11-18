import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectAllProducts,
  selectProductsError,
  selectProductsLoading,
} from '../products/product.selector';
import { Product } from '../products/product.model';
import { ProductActions } from '../products/product.actions';
import { CartActions } from '../cart/cart.action';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  private readonly store = inject(Store);

  readonly products$ = this.store.select(selectAllProducts);
  readonly isLoading$ = this.store.select(selectProductsLoading);
  readonly error$ = this.store.select(selectProductsError);

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  addToCart(productId: string): void {
    this.store.dispatch(CartActions.addItem({ productId }));
  }
}
