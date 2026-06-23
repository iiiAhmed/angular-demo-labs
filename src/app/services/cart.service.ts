import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSignal = signal<Product[]>([]);

  constructor() {}

  addToCart(product: Product) {
    this.itemsSignal.update(items => [...items, product]);
  }

  getCartItems() {
    return this.itemsSignal;
  }
}
