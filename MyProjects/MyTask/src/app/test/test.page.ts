import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {}

  ngOnInit() {}

  async closeModal() {
    await this.modalController.dismiss();
  }
}
