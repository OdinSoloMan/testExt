import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {
  forgotBoardForm: FormGroup;
  paramTitleModal: any;
  titleBoard: any;

  constructor(
    private modalController: ModalController,
    public formBuilder: FormBuilder,
    private navParams: NavParams
  ) {
    let self = this;
    self.forgotBoardForm = formBuilder.group({
      title: ['', [Validators.minLength(3), Validators.maxLength(15)]],
    });
  }

  ngOnInit() {
    console.log(this.navParams);
    this.paramTitleModal = this.navParams.data.paramTitleModal;
    this.titleBoard = this.navParams.data.titleBoard;
  }

  async onClose() {
    await this.modalController.dismiss("");
  }

  async addBoard() {
    const onClosedData: string = this.forgotBoardForm.value.title;
    await this.modalController.dismiss(onClosedData);
  }
}
