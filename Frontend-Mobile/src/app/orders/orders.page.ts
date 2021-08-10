import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { ApiService } from '../service/api.service';
import NotImage from '../img/not-image.json';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  ordersList: any = []
  img: any = NotImage.img;
  p: number;
  itemsPerPage = 4;
  totalItems: any;

  constructor(
    private api : ApiService,
  ) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(){
    console.log("getOrders")
    this.api.getReadInfoOredrsUserPerPage(0, this.itemsPerPage)
    .pipe(timeout(60000))
    .subscribe(
      async (response) => {
        console.log(response)
        this.ordersList = response.data;
        this.totalItems = response.totalPassengers;
      },
      async (error) => {
        console.log(error)
      }
    )
  }

  getPage(page) {
    this.api.getReadInfoOredrsUserPerPage(page, this.itemsPerPage)
      .pipe(timeout(6000))
      .subscribe(
        async (response) => {
          console.log(response)
          this.ordersList = response.data;
          this.totalItems = response.totalPassengers;
        },
        async (error) => {
          console.log(error)
        }
      )
  }
}
