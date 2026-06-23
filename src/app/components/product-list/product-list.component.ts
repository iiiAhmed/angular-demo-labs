import { Component } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Laptop',
      price: 1000,
      priceAfterDiscount: 900,
      photoUrl: 'https://static.vecteezy.com/system/resources/thumbnails/023/981/506/small/laptop-zoom-in-animation-computer-background-placeholder-video.jpg'
    },
    {
      id: 2,
      name: 'Phone',
      price: 500,
      priceAfterDiscount: 450,
      photoUrl: 'https://png.pngtree.com/png-vector/20240708/ourmid/pngtree-blank-screen-phone-png-image_12848533.png'
    }
  ];

  constructor(private cartService: CartService) { }

  onAddedToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
