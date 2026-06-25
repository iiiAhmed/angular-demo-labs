import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

export const productsResolver: ResolveFn<Product[]> = (): Observable<Product[]> => {
  return inject(ProductService).getProducts();
};
