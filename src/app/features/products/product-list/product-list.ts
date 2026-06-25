import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../models/product.model';
import { CartService } from '../../../services/cart.service';
import { DiscountPipe } from '../../../shared/pipes/discount.pipe';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe,
    DiscountPipe
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  private cartService = inject(CartService);
  private router = inject(Router);

  // Resolved products mapped from route data automatically using withComponentInputBinding
  products = input<Product[]>([]);

  onAddToCart(product: Product, event: Event) {
    event.stopPropagation(); // Avoid navigating to details on click
    this.cartService.addToCart(product);
  }

  viewDetails(id: number) {
    this.router.navigate(['/products', id]);
  }

  editProduct(id: number, event: Event) {
    event.stopPropagation();
    this.router.navigate(['/products', id, 'edit']);
  }
}
