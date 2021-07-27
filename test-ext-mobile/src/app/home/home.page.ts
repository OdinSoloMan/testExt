import { Component } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  productsList: any = []

  constructor(
    private api: ApiService
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
}
