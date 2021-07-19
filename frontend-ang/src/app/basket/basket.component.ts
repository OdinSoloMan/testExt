import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { ApiService } from '../shared/api.service';
import { BasketService } from '../shared/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  baskeList: any;

  constructor(
    private api: ApiService,
    private basket: BasketService
  ) { }

  ngOnInit() {
    this.baskeList = this.basket.getBasketList()
    console.log(this.baskeList)
  }

  async Buy() {
    var data = await this.baskeList;
    console.log("data", data);

    data = data.map((u: { ProductsId: any; Count: any; }) => ({ ProductsId: u.ProductsId, Count: u.Count, UsersId: localStorage.getItem("id_users") }));
    console.log("res", data)

    this.api.addListOrders(data)
      .pipe(timeout(60000))
      .subscribe(
        async (responce) => {
          console.log("responce", responce);
          this.basket.removeBasketList();
          this.ngOnInit();
        },
        async (error) => {
          console.log(error);
        },
        async () => {
          console.log("full");
        }
      )
  }

  Clear() {
    this.basket.removeBasketList();
    this.ngOnInit();
  }
}
