import { Component, Input } from '@angular/core';
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
  p: number;
  itemsPerPage = 5;
  totalItems: any;
  codeList: any = [];
  filter: string = '';

  constructor(
    private api: ApiService,
    private basket: BasketService,
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  async getProducts() {
    this.api.getPageProducts(0, this.itemsPerPage, this.filter)
      .pipe(timeout(6000))
      .subscribe(
        async (response) => {
          console.log(typeof (response), response)
          this.productsList = response.data;
          this.totalItems = response.totalPassengers;
          console.log(typeof (this.productsList))
        },
        async (error) => {
          console.log(error)
        }
      )
  }

  getPage(page) {
    this.api.getPageProducts(page, this.itemsPerPage, this.filter)
      .pipe(timeout(6000))
      .subscribe(
        async (response) => {
          console.log(typeof (response), response)
          this.productsList = response.data;
          this.totalItems = response.totalPassengers;
          console.log(typeof (this.productsList))
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

  saveCode(e): void {
    let name = e.target.value;
    let list = this.codeList.filter(x => x.name === name)[0];
    if (list?.id_Product) {
      console.log("SAVECODE", list?.id_Product);
      this.getProductReadByName(list.name)
    }
  }

  onKey(event: any) {
    this.filter = event;
    var s = event;
    if (s.length % 3 === 0 && s.length != 0) {
      console.log(typeof (event), s.length);
      this.getFilterList(event)
    }
  }

  async getProductReadByName(val: any) {
    this.api.getPageProducts(0, this.itemsPerPage, val)
      .pipe(timeout(6000))
      .subscribe(
        async (response) => {
          console.log(typeof (response), response)
          this.productsList = response.data;
          this.totalItems = response.totalPassengers;
        },
        async (error) => {
          console.log(error)
        }
      )
  }

  onEnter(val: any) {
    this.getProductReadByName(val);
  }

  async getFilterList(val: any) {
    this.api.getProductFilterName(val)
      .pipe(timeout(6000))
      .subscribe(
        async (response) => {
          console.log(typeof (response), response)
          this.codeList = response;
        },
        async (error) => {
          console.log(error)
        }
      )
  }

  ClearFilter() {
    console.log("CLEAR");
    this.filter = '';
    (document.getElementById("favorite_team") as HTMLTextAreaElement).value = "";
    this.getPage(0);
  }
}
