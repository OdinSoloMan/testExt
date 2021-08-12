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
    if (index == -1) {
      this.basketList.push(val);
    } else {
      this.basketList[index].Count += val.Count;
    }
    console.log(this.basketList);
  }

  removeBasketList() {
    this.basketList = [];
  }

  deleteItemBasket(val: any): typeof val {
    for (let i = 0; i < this.basketList.length; i++) {
      if (this.basketList[i].ProductsId == val) {
        this.basketList.splice(i, 1)
        return i;
      }
    }
    return null;
  }

  switchCount(id: any, count: any): boolean {
    var index = this.basketList.map((item: { ProductsId: any; }) => item.ProductsId).indexOf(id);
    console.log(index);
    if (typeof (Number(count)) == "number") {
      console.log("count")
      if (count > 0) {
        this.basketList[index].Count = count;
        return true;
      }
      else {
        return false;
      }
    }
  }
}
