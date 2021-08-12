import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { timeout } from 'rxjs/operators';
import { ApiService } from '../service/api.service';
import { BasketService } from '../service/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
})
export class BasketPage implements OnInit {
  basketList: any = [];

  constructor(
    private api: ApiService,
    private basket: BasketService,
    private translate: TranslateService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    //this.getListBasketProducts();
  }

  async switchCount(val: any) {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant('text.header-alert-new-count-product'),
      inputs: [
        {
          name: 'Count',
          placeholder: this.translate.instant('text.enter-new-count')
        },
      ],
      buttons: [
        {
          text: this.translate.instant('btn.cancel'),
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.translate.instant('btn.ok'),
          handler: data => {
            console.log("data.Count", data.Count);
            console.log("this.basket.switch", this.basket.switchCount(val, data.Count))
          }
        }
      ]
    });
    await alert.present();
  }

  getListBasketProducts() {
    this.basketList = this.basket.getBasketList();
    // this.basketList = [
    //   {
    //     "ProductsId": "7f91fa3b-078c-4725-18b8-08d950244ae1",
    //     "Name": "test",
    //     "Description": "Description",
    //     "Count": 2
    //   },
    //   {
    //     "ProductsId": "784664b3-24f4-46c8-18b9-08d950244ae1",
    //     "Name": "test1",
    //     "Description": "Description1",
    //     "Count": 1
    //   },
    //   {
    //     "ProductsId": "41ae182a-a2d5-4ddb-18ba-08d950244ae1",
    //     "Name": "test2",
    //     "Description": "Description2",
    //     "Count": 1
    //   }
    // ]
    console.log(this.basketList)
  }

  ionViewWillEnter() {
    this.getListBasketProducts();
  }

  deleteItemBasket(val: any) {
    console.log(val)
    let index = this.basket.deleteItemBasket(val);
    //index != null ? this.basketList.splice(index, 1) : ""
    console.log(this.basketList)
  }

  Clear() {
    console.log("Clear")
    this.basket.removeBasketList();
    this.basketList = [];
  }

  async Buy() {
    console.log("Buy")
    var data = await this.basketList;

    data = data.map((u: { ProductsId: any; Count: any; }) => ({ ProductsId: u.ProductsId, Count: u.Count, UsersId: localStorage.getItem("id_users") }));
    console.log("data", data)

    const loading = await this.loadingCtrl.create({ message: this.translate.instant("text.add-orders") })
    await loading.present();

    this.api.addListOrders(data)
      .pipe(timeout(60000))
      .subscribe(
        async (response) => {
          console.log(response)
          this.Clear()
          loading.dismiss();
          const toast = await this.toastCtrl.create({ message: this.translate.instant("text.add-orders-true"), duration: 2000, color: 'dark' })
          await toast.present();
        },
        async (error) => {
          console.log(error)
          const alert = await this.alertCtrl.create({ message: this.translate.instant("text.add-orders-error"), buttons: ['OK'] });
          await alert.present();
          loading.dismiss();
        }
      )
  }
}
