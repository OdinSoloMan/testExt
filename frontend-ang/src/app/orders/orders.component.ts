import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orderList: any = [];

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.getOrders();
  }

  async getOrders() {
    if (localStorage.getItem("id_users")) {
      this.api.getListOrders()
        .pipe(timeout(60000))
        .subscribe(
          async (responce) => {
            console.log(responce);
            this.orderList = responce
          },
          async (error) => {
            console.log(error);
          },
          async () => {
            console.log("full");
          }
        )
    }
  }
}
