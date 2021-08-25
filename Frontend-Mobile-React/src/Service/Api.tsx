import axios from 'axios';

const API_URL = 'https://localhost:5001';

export default class Api {
  headers() {
    return {
      Authorization: 'Bearer ' + localStorage.getItem('accessToken')
    }
  }

  getPageProducts(page: any, size: any, filter: any) {
    return axios.get(API_URL + '/products/productspage?page=' + page + '&size=' + size + '&filter=' + filter, { headers: this.headers() })
  }

  addListOrders(val: any) {
    return axios.post(API_URL + '/orders/addorderslist', val, { headers: this.headers() })
  }

  getReadInfoOredrsUserPerPage(page: any, size: any): any {
    return axios.get(API_URL + '/orders/readinfooredrsuserperpage?id_user=' + localStorage.getItem("id_users") + '&page=' + page + '&size=' + size, { headers: this.headers() })
  }

  getProductFilterName(name: any): any {
    return axios.get(API_URL + '/products/filter?name=' + name, { headers: this.headers() })
  }

  login(val: any) {
    return axios.post(API_URL + '/login', val)
  }

  registration(val: any) {
    return axios.post(API_URL + '/registration', val)
  }

  refresh(val: any) {
    return axios.post(API_URL + '/refresh', val)
  }

  logout(val: any) {
    return axios.post(API_URL + '/revoke/' + val, null, { headers: this.headers() })
  }
}