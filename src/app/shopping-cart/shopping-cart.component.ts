import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCartItemsWithDetails,
  selectCartTotalPrice,
} from '../cart/cart.selectors';
import { CartActions } from '../cart/cart.action';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent {
  private readonly store = inject(Store);

  readonly cartItem$ = this.store.select(selectCartItemsWithDetails);
  readonly totalPrice$ = this.store.select(selectCartTotalPrice);

  increase(productId: string) {
    this.store.dispatch(CartActions.increaseQuantity({ productId }));
  }

  decrease(productId: string) {
    this.store.dispatch(CartActions.decreaseQuantity({ productId }));
  }

  remove(productId: string) {
    this.store.dispatch(CartActions.removeItem({ productId }));
  }

  clearCart() {
    if(confirm('Are you sure you want to clear the Cart?')) {
      this.store.dispatch(CartActions.clearCart());
    }
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://placehold.co/300x200/cccccc/ffffff?text=Image+Error';
  }
}
