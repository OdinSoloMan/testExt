import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  productsList : any = []

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
        console.log(responce)
        this.productsList = responce
      },
      async (error) => {
        console.log(error)
      },
      async () => {
        console.log("full")
      }
    )  
  }
}
