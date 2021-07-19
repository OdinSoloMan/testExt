import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly APIUrl : string = "https://localhost:5001";

  constructor(
    private http: HttpClient
  ) { }

  // headers() {
  //   return new HttpHeaders({
  //     Authorization: 'Bearer ' + localStorage.getItem('token')
  //   })
  // }

  getProductsList(): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/products/readallproducts')
  }

  addListOrders(val: any){
    return this.http.post(this.APIUrl + '/orders/addorderslist', val)
  }
}
