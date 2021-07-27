import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  basketList: any = [];

  constructor() { }

  getBasketList() {
    return this.basketList;
  }

  setBasketList(val: any) {
    var index = this.basketList.findIndex((obj: { ProductsId: string; }) => obj.ProductsId === val.ProductsId);
    console.log(index);
    if(index == -1) {
      this.basketList.push(val);
    } else {
      this.basketList[index].Count += val.Count;
    }
    console.log(this.basketList);
  }

  removeBasketList(){
    this.basketList = [];
  }
}
