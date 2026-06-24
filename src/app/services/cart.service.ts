import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSignal = signal<CartItem[]>([]);
  private http = inject(HttpClient);

  grandTotal = computed(() => {
    return this.itemsSignal().reduce((acc, item) => 
      acc + (item.product.priceAfterDiscount * item.count), 0);
  });

  getCartItems() {
    return this.itemsSignal;
  }

  addToCart(product: Product) {
    this.itemsSignal.update(items => {
      const existingItem = items.find(i => i.product.id === product.id);
      if (existingItem) {
        return items.map(i => i.product.id === product.id 
          ? { ...i, count: i.count + 1 } 
          : i);
      }
      return [...items, { product, count: 1 }];
    });
  }

  checkoutCart() {
    // Simulating connecting to api for cart checkout
    return this.http.post('https://fakestoreapi.com/carts', {
      items: this.itemsSignal()
    });
  }
}
