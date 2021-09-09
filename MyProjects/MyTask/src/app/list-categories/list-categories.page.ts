import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { map, timeout } from 'rxjs/operators';
import { CategoryPage } from '../modal/category/category.page';
import { ConfirmPage } from '../modal/confirm/confirm.page';
import { LearningService } from '../service/learning.service';
import { ListCategoriesService } from '../service/list-categories.service';
import ListCategories from '../shared/list-categories';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.page.html',
  styleUrls: ['./list-categories.page.scss'],
})
export class ListCategoriesPage implements OnInit {
  listCategory: ListCategories[];

  constructor(
    private listCategoriesService: ListCategoriesService,
    public router: Router,
    public navController: NavController,
    private learningService: LearningService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.listCategoriesService
      .getAll()
      .snapshotChanges()
      .pipe(
        timeout(60000),
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(
        (data) => {
          this.listCategory = data;
          console.log('this.listCategory', this.listCategory);
        },
        (err) => {}
      );
  }

  onReadCategory(val: any, title: any) {
    let _state = {
      key: val,
      title: title,
    };
    this.navController.navigateForward('/learning', { state: _state });
  }

  async workingCategory(category?: any) {
    const modal = await this.modalController.create({
      component: CategoryPage,
      backdropDismiss: true,
      componentProps: {
        param: category
          ? { category: category, isNew: false }
          : { category: null, isNew: true },
      },
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data !== '' && dataReturned.role !== 'backdrop') {
          console.log('dataReturned.data', dataReturned.data);
          if (dataReturned.data.isNew) {
            // Add
            this.listCategoriesService.create(dataReturned.data.category).then(
              (res) => {
                console.log(res);
              },
              (err) => {
                console.log(err);
              }
            );
          } else {
            //update
            this.listCategoriesService.update(category.key, dataReturned.data.category);
            console.log('update', category.key);
          }
        }
      }
    });

    return await modal.present();
  }

  async onDelete(val: any) {
    const modal = await this.modalController.create({
      component: ConfirmPage,
      backdropDismiss: true,
      componentProps: {
        confirm: {
          title: 'Delete category',
          message: `You need delete "${val.listName}" ?`,
        },
        isWorking: false,
      },
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data !== '' && dataReturned.role !== 'backdrop') {
          if (dataReturned.data.isWorking) {
            this.listCategoriesService.delete(val.key);
            this.learningService.deleteCategory(val.key);
          }
        }
      }
    });

    return await modal.present();
  }
}
