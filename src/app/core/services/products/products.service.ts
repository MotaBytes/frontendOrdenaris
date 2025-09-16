import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'https://api.escuelajs.co/api/v1/products';

  get4Products(limit: number = 4, offset: number = 0): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
  }

  getProductsByCategory(categoryId: number, limit: number, offset: number): Observable<Product[]> {
    const apiUrl = 'https://api.escuelajs.co/api/v1/categories';
    return this.http.get<Product[]>(`${apiUrl}/${categoryId}/products?limit=${limit}&offset=${offset}`);
  }
  
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}