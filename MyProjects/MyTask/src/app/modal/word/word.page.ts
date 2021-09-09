import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-word',
  templateUrl: './word.page.html',
  styleUrls: ['./word.page.scss'],
})
export class WordPage implements OnInit {
  forgotWordForm: FormGroup;
  param: any;

  constructor(
    private modalController: ModalController,
    public formBuilder: FormBuilder,
    private navParams: NavParams
  ) {
    let self = this;
    self.forgotWordForm = formBuilder.group({
      title: ['', [Validators.minLength(1), Validators.maxLength(150)]],
      translation: ['', [Validators.minLength(1), Validators.maxLength(300)]],
    });
  }

  ngOnInit() {
    console.log(this.navParams.data);
    this.param = this.navParams.data.param;
    console.log(this.param.isNew);
    if (!this.param.isNew) {
      this.forgotWordForm.get('title').setValue(this.param.word.title);
      this.forgotWordForm
        .get('translation')
        .setValue(this.param.word.translation);
    }
  }

  async onClose() {
    await this.modalController.dismiss('');
  }

  async sendingData() {
    console.log(this.forgotWordForm.value);
    this.param.word = {
      title: this.forgotWordForm.get('title').value,
      translation: this.forgotWordForm.get('translation').value,
    };
    await this.modalController.dismiss(this.param);
    //await this.modalController.dismiss(this.forgotWordForm.value);
  }
}
