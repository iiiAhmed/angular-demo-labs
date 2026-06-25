import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'https://fakestoreapi.com/products';

  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map(item => ({
        id: item.id,
        name: item.title,
        price: item.price,
        // Simulating a 10% discount for the demo since Fake Store API doesn't provide one
        priceAfterDiscount: item.price * 0.9,
        photoUrl: item.image
      })))
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(item => ({
        id: item.id,
        name: item.title,
        price: item.price,
        priceAfterDiscount: item.price * 0.85, // Simulating 15% discount on details
        photoUrl: item.image
      }))
    );
  }

  addProduct(product: Omit<Product, 'id'>): Observable<Product> {
    // FakeStoreAPI allows POST, which returns the added product with a new ID
    return this.http.post<any>(this.apiUrl, {
      title: product.name,
      price: product.price,
      image: product.photoUrl,
      description: 'demo description',
      category: 'electronic'
    }).pipe(
      map(item => ({
        id: item.id,
        name: item.title || product.name,
        price: item.price || product.price,
        priceAfterDiscount: (item.price || product.price) * 0.9,
        photoUrl: item.image || product.photoUrl
      }))
    );
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    // FakeStoreAPI allows PUT/PATCH
    return this.http.put<any>(`${this.apiUrl}/${id}`, {
      title: product.name,
      price: product.price,
      image: product.photoUrl
    }).pipe(
      map(item => ({
        id: id,
        name: item.title || product.name || '',
        price: item.price || product.price || 0,
        priceAfterDiscount: (item.price || product.price || 0) * 0.9,
        photoUrl: item.image || product.photoUrl || ''
      }))
    );
  }
}
