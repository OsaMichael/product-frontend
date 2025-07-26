import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:21855/api/Products';
  // private apiUrl2 = 'http://localhost:21855/api/Products';
  // private apiUrl3 = 'http://localhost:21855/api/Products';
  // private apiUrl4 = 'http://localhost:21855/api/Products';
  //  private apiUrl5 = 'http://localhost:21855/api/Products';
  constructor(private http: HttpClient) {}


  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`); 
  }
  addProduct(product: Partial<Product>): Observable<Product> {
       console.log('about to call api service and save product');
    return this.http.post<Product>(`${this.apiUrl}/add`, product);
  }

  getProductById(id: number): Observable<Product> {
  var resp = this.http.get<Product>(`${this.apiUrl}/getId/${id}`);
 console.log(`response from api: ${resp}`);
  return resp;
}

 updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/update/${id}`, product );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
