import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../models/product.model';
import { CartService } from '../../../services/cart.service';
import { DiscountPipe } from '../../../shared/pipes/discount.pipe';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe,
    DiscountPipe
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  private cartService = inject(CartService);
  private router = inject(Router);

  // Resolved product mapped from route data automatically using withComponentInputBinding
  product = input<Product | null>(null);

  onAddToCart() {
    const prod = this.product();
    if (prod) {
      this.cartService.addToCart(prod);
    }
  }

  editProduct() {
    const prod = this.product();
    if (prod) {
      this.router.navigate(['/products', prod.id, 'edit']);
    }
  }
}
