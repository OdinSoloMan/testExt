import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  productsList : any = [];
  isNullList : any = -1;
  modal_guid = "";
  modal_name = "";
  modal_description = "";
  modal_coutn = "";

  constructor(
    private api: ApiService
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
        if(responce.length == 0){
          this.isNullList = 0;
        }
        else{
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

  decrement(val: any){
    console.log(val)
    if(Number(document.getElementById(val)?.getAttribute('value')) > 1) {
      console.log("decrement")
      document.getElementById(val)?.setAttribute('value', String(Number(document.getElementById(val)?.getAttribute('value')) - 1))
    } 
  }

  increment(val: any){
    console.log(val)
    if(Number(document.getElementById(val)?.getAttribute('value')) < 99) {
      console.log("increment")
      document.getElementById(val)?.setAttribute('value', String(Number(document.getElementById(val)?.getAttribute('value')) + 1))
    } 
  }

  modalInfo(val: any){
    this.modal_guid = "Id : " + val;
    this.modal_name = "Name : " + document.getElementById('name-' + val)?.getAttribute('data-value');
    this.modal_description = "Discription : " + document.getElementById('description-' + val)?.getAttribute('data-value');
    this.modal_coutn = "Count : " + String(document.getElementById(val)?.getAttribute('value'))
    //document.getElementById('modal-guid')?.innerText = "Id : " + val;
  }
}
