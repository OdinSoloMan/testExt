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

  getDataWeather() : Observable<any> {
    return this.http.get('https://api.openweathermap.org/data/2.5/find?q=London&units=metric,us&mode=json&appid=b28b41fb608f23c9d2cf47062efb7f5f');
  }
}
