import { Component } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { ApiService } from '../service/api.service';
import NotImage from '../img/not-image.json';
import { BasketService } from '../service/basket.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  productsList: any = []
  img: any = NotImage.img;

  constructor(
    private api: ApiService,
    private basket: BasketService,
  ) { }

  ngOnInit() {
    this.getProducts()
  }

  async getProducts() {
    this.api.getProductsList()
      .pipe(timeout(6000))
      .subscribe(
        async (response) => {
          console.log(response)
          this.productsList = response;
        },
        async (error) => {
          console.log(error)
        }
      )
  }

  decrement(val: any) {
    console.log("decrement", val)
    var numberProduct = Number(document.getElementById(val)?.innerHTML);
    numberProduct > 1 ? (document.getElementById(val).innerHTML = String(numberProduct - 1)) : ""
  }

  increment(val: any) {
    console.log("increment", val)
    var numberProduct = Number(document.getElementById(val)?.innerHTML);
    numberProduct < 99 ? (document.getElementById(val).innerHTML = String(numberProduct + 1)) : ""
  }

  modalInfo(val: any) {
    var data = {
      ProductsId: val,
      Name: document.getElementById('name-' + val)?.getAttribute('data-value'),
      Description: document.getElementById('description-' + val)?.getAttribute('data-value'),
      Count: Number(document.getElementById(val)?.innerHTML)
    }
    console.log("data", data)
    this.basket.setBasketList(data);
  }
}
