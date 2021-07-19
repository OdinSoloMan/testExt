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
  modal_guid_product = "";
  modal_name_product = "";
  modal_description_product = "";
  modal_coutn_product = "";

  constructor(
    private api: ApiService,
    private basket: BasketService
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
      ProductsId : val,
      Name: document.getElementById('name-' + val)?.getAttribute('data-value'),
      Description:  document.getElementById('description-' + val)?.getAttribute('data-value'),
      Count: Number(document.getElementById(val)?.getAttribute('value'))
    }
    this.basket.setBasketList(data);
    // this.modal_guid_product = "Id : " + val;
    // this.modal_name_product = "Name : " + document.getElementById('name-' + val)?.getAttribute('data-value');
    // this.modal_description_product = "Discription : " + document.getElementById('description-' + val)?.getAttribute('data-value');
    // this.modal_coutn_product = "Count : " + String(document.getElementById(val)?.getAttribute('value'))
  }

  // Buy(){
    
  //   var data = {
  //     Count : Number(this.modal_coutn_product.substr(8)), 
  //     User_Id : localStorage.getItem("id_User"),
  //     Product_Id : this.modal_guid_product.substr(5)
  //   }

  //   console.log(data, null, 2)

  //   /*
  //           if (localStorage.getItem("id_User") != null) {
  //           var data = {
  //               Count: Number(document.getElementById('testCoun').innerHTML.substr(8)),
  //               UsersId: localStorage.getItem("id_User"),
  //               ProductsId: document.getElementById('testGuid').innerHTML.substr(5)
  //           }
  //           console.log(data, null, 2)
  //           const url = 'https://localhost:5001/orders/addorders';
  //           try {
  //               const response = await fetch(url, {
  //                   method: 'POST',
  //                   body: JSON.stringify(data),
  //                   headers: {
  //                       'Content-Type': 'application/json'
  //                   }
  //               });
  //               const json = await response.json();
  //               console.log('Успех:', JSON.stringify(json));
  //               alert("Order made");
  //           } catch (error) {
  //               console.error('Ошибка:', error);
  //           }
  //       } else {
  //           alert("Need Authorization");
  //       }
  //   }
    
  //   */ 
  // }
}
