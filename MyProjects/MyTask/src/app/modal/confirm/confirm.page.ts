import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {
  data: any;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    console.log(this.navParams.data);
    this.data = this.navParams.data;
  }

  async onClose() {
    await this.modalController.dismiss('');
  }

  async workingYes() {
    this.data.isWorking = true;
    await this.modalController.dismiss(this.data);
  }
}
