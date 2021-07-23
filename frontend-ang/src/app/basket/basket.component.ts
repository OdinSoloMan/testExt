import { MenuComponent } from './../menu/menu.component';
import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { ApiService } from '../shared/api.service';
import { BasketService } from '../shared/basket.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  baskeList: any;

  constructor(
    private api: ApiService,
    private basket: BasketService,
    private menu: MenuComponent,
    private toastr: ToastrService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.baskeList = this.basket.getBasketList()
    console.log(this.baskeList)
  }

  async Buy() {
    var data = await this.baskeList;
    console.log("data", data);

    data = data.map((u: { ProductsId: any; Count: any; }) => ({ ProductsId: u.ProductsId, Count: u.Count, UsersId: localStorage.getItem("id_users") }));
    console.log("res", data)

    this.api.addListOrders(data)
      .pipe(timeout(60000))
      .subscribe(
        async (responce) => {
          console.log("responce", responce);
          this.toastr.success(this.translate.instant("toastr.msg.product-add-orders-true"), this.translate.instant("toastr.title.success"), {
            timeOut: 1000,
            closeButton: true
          });
          this.Clear(false);
        },
        async (error) => {
          this.toastr.error(this.translate.instant("toastr.msg.product-add-orders-false"), this.translate.instant("toastr.title.error"), {
            timeOut: 1000,
            closeButton: true
          });
          console.log(error);
        },
        async () => {
          console.log("full");
        }
      )
  }

  Clear(isClear: boolean) {
    this.basket.removeBasketList();
    this.menu.countPositionFn(this.basket.getBasketList().length)
    this.ngOnInit();
    if(isClear)
    this.toastr.warning(this.translate.instant("btn.btn-clear"), this.translate.instant("title.title-basket"), {
      timeOut: 1000,
      closeButton: true
    });
  }
}
