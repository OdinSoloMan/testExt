import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly API_URL = 'https://localhost:5001/'

  constructor(
    private http: HttpClient,
  ) { }

  getListProducts(): Observable<any> {
    return this.http.get(this.API_URL + 'api/Product')
  }

  getDataWeather(): Observable<any> {
    return this.http.get('https://api.openweathermap.org/data/2.5/forecast?q=London,us&units=metric&mode=json&appid=b28b41fb608f23c9d2cf47062efb7f5f');
  }

  getPageProducts(page: any, size: any, filter: any): Observable<any> {
    return this.http.get<any>(this.API_URL + 'products/productspage?page=' + page + '&size=' + size + '&filter=' + filter)
  }

  updateProduct(val: any) {
    return this.http.put(this.API_URL + 'products/updateproducts', val);
  }

  deleteProduct(val: any) {
    return this.http.delete(this.API_URL + 'products/delete/' + val);
  }

  addProduct(val: any) {
    return this.http.post(this.API_URL + 'products/addproducts', val);
  }
}
