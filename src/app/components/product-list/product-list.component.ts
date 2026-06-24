import { Component, inject } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  private cartService = inject(CartService);
  private productService = inject(ProductService);

  // Use toSignal to convert Observable to a signal
  products = toSignal(this.productService.getProducts(), { initialValue: [] });

  onAddedToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
