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
}
