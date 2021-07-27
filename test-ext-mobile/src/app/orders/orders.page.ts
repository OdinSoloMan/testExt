import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  ordersList: any = []

  constructor(
    private api : ApiService,
  ) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(){
    console.log("getOrders")
    this.api.getListOrders()
    .pipe(timeout(60000))
    .subscribe(
      async (response) => {
        console.log(response)
        this.ordersList = response
      },
      async (error) => {
        console.log(error)
      }
    )
  }
}
