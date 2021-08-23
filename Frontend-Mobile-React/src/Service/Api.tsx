const axios = require('axios');
const API_URL = 'https://localhost:5001';

export default class Api {

    getPageProducts(page: any, size: any, filter: any) {
        return axios.get(API_URL + '/products/productspage?page=' + page + '&size=' + size + '&filter=' + filter)
    }

    /*
      getPageProducts(page: any, size: any, filter: any): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/products/productspage?page=' + page + '&size=' + size + '&filter=' + filter, { headers: this.headers() })
  } */
}