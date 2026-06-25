import { Component, Signal, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../models/cart-item.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  private cartService = inject(CartService);

  items: Signal<CartItem[]> = this.cartService.getCartItems();
  grandTotal: Signal<number> = this.cartService.grandTotal;

  onCheckout() {
    this.cartService.checkoutCart().subscribe({
      next: () => {
        alert('Checkout successful!');
      },
      error: () => {
        alert('Checkout failed!');
      }
    });
  }
}
