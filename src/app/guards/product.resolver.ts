import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

export const productResolver: ResolveFn<Product> = (
  route: ActivatedRouteSnapshot
): Observable<Product> => {
  const id = Number(route.paramMap.get('id'));
  return inject(ProductService).getProduct(id);
};
