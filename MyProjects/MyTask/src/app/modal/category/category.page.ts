import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  forgotCategoryForm: FormGroup;
  param: any;

  constructor(
    private modalController: ModalController,
    public formBuilder: FormBuilder,
    private navParams: NavParams
  ) {
    let self = this;
    self.forgotCategoryForm = formBuilder.group({
      listName: ['', [Validators.minLength(1), Validators.maxLength(150)]],
    });
  }

  ngOnInit() {
    console.log(this.navParams.data.param);
    this.param = this.navParams.data.param;
    if (!this.param.isNew) {
      this.forgotCategoryForm
        .get('listName')
        .setValue(this.param.category.listName);
    }
  }

  async onClose() {
    await this.modalController.dismiss('');
  }

  async sendingData() {
    this.param.category = {
      listName: this.forgotCategoryForm.get('listName').value,
    }
    await this.modalController.dismiss(this.param);
  }
}
