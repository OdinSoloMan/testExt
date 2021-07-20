import { MenuComponent } from './../menu/menu.component';
import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { ApiService } from '../shared/api.service';
import { BasketService } from '../shared/basket.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  productsList: any = [];
  isNullList: any = -1;

  constructor(
    private api: ApiService,
    private basket: BasketService,
    private menu: MenuComponent,
  ) { }

  ngOnInit() {
    this.getProdts()
  }

  async getProdts() {
    this.api.getProductsList()
      .pipe(timeout(60000))
      .subscribe(
        async (responce) => {
          console.log(responce);
          if (responce.length == 0) {
            this.isNullList = 0;
          }
          else {
            this.productsList = responce;
          }
        },
        async (error) => {
          this.isNullList = 1;
          console.log(error);
        },
        async () => {
          console.log("full");
        }
      )
  }

  decrement(val: any) {
    console.log(val);
    var numberProduct = Number(document.getElementById(val)?.getAttribute('value'));
    if (numberProduct > 1) {
      console.log("decrement")
      document.getElementById(val)?.setAttribute('value', String(numberProduct - 1))
    }
  }

  increment(val: any) {
    console.log(val)
    var numberProduct = Number(document.getElementById(val)?.getAttribute('value'));
    if (numberProduct < 99) {
      console.log("increment")
      document.getElementById(val)?.setAttribute('value', String(numberProduct + 1))
    }
  }

  modalInfo(val: any) {
    var data = {
      ProductsId: val,
      Name: document.getElementById('name-' + val)?.getAttribute('data-value'),
      Description: document.getElementById('description-' + val)?.getAttribute('data-value'),
      Count: Number(document.getElementById(val)?.getAttribute('value'))
    }
    this.basket.setBasketList(data);
    this.menu.countPositionFn(this.basket.getBasketList().length)
  }
}
