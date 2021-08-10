import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly APIUrl: string = "https://localhost:5001";

  constructor(
    private http: HttpClient
  ) { }

  headers() {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('accessToken')
    })
  }

  getProductsList(): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/products/readallproducts', { headers: this.headers() })
  }

  addListOrders(val: any) {
    return this.http.post(this.APIUrl + '/orders/addorderslist', val, { headers: this.headers() })
  }

  getListOrders(): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/orders/readinforders/' + localStorage.getItem("id_users"), { headers: this.headers() })
  }

  login(val: any) {
    return this.http.post(this.APIUrl + '/login', val)
  }

  refresh(val: any) {
    return this.http.post(this.APIUrl + '/refresh', val)
  }

  logout(val: any) {
    return this.http.post(this.APIUrl + '/revoke/' + val, null, { headers: this.headers() })
  }

  registration(val: any) {
    return this.http.post(this.APIUrl + '/registration', val)
  }

  getPageProducts(page: any, size: any, filter: any): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/products/productspage?page=' + page + '&size=' + size + '&filter=' + filter, { headers: this.headers() })
  }

  getReadInfoOredrsUserPerPage(page: any, size: any): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/orders/readinfooredrsuserperpage?id_user=' + localStorage.getItem("id_users") + '&page=' + page + '&size=' + size, { headers: this.headers() })
  }

  getProductFilterName(name: any): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/products/filter?name=' + name, { headers: this.headers() })
  }

  getProductReadById(id: any): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/products/read/' + id, { headers: this.headers() })
  }
}
