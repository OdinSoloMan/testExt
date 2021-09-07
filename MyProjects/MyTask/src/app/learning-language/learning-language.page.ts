import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { map, timeout } from 'rxjs/operators';
import { ConfirmPage } from '../modal/confirm/confirm.page';
import { WordPage } from '../modal/word/word.page';
import { LearningService } from '../service/learning.service';
import LearningLanguage from '../shared/learningLanguage';
import { TestingPage } from '../testing/testing.page';

@Component({
  selector: 'app-learning-language',
  templateUrl: './learning-language.page.html',
  styleUrls: ['./learning-language.page.scss'],
})
export class LearningLanguagePage implements OnInit {
  listWord: LearningLanguage[];

  constructor(
    private learningService: LearningService,
    private modalController: ModalController,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000,
    });
    this.getAllWord();
    await loading.present();
  }

  async getAllWord() {
    this.learningService
      .getAll()
      .snapshotChanges()
      .pipe(
        timeout(60000),
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(
        async (data) => {
          this.listWord = data;
        },
        async (err) => {}
      );
  }

  /**
   *     key?: string | null;
    title?: string;
    translation?: string;
    uid?: string;
   */
  async addWord(word?: any) {
    const modal = await this.modalController.create({
      component: WordPage,
      cssClass: 'modal-class',
      backdropDismiss: true,
      componentProps: {
        param: word
          ? { word: word, isNew: false }
          : { word: null, isNew: true },
      },
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data !== '' && dataReturned.role !== 'backdrop') {
          console.log('dataReturned.data', dataReturned.data);
          if (dataReturned.data.isNew) {
            // Add
            this.learningService.create(dataReturned.data.word).then(
              (res) => {
                console.log(res);
              },
              (err) => {
                console.log(err);
              }
            );
          } else {
            //update
            this.learningService.update(word.key, dataReturned.data.word);
            console.log('update', word.key);
          }
        }
      }
    });

    return await modal.present();
  }

  async onDelete(val: any) {
    const modal = await this.modalController.create({
      component: ConfirmPage,
      cssClass: 'modal-class',
      backdropDismiss: true,
      componentProps: {
        confirm: {
          title: 'Delete word',
          message: `You definitely want to delete the word "${val.title}" ?`,
        },
        isWorking: false,
      },
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data !== '' && dataReturned.role !== 'backdrop') {
          if (dataReturned.data.isWorking) {
            this.learningService.delete(val.key).then(
              (res) => {
                console.log(res);
              },
              (err) => {
                console.log(err);
              }
            );
          }
        }
      }
    });

    return await modal.present();
    // console.log(val);
    // this.learningService.delete(val).then(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }

  filterFn(val: any) {
    this.learningService
      .filter(val)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.listWord = data;
        console.log(this.listWord);
      });
  }

  async onDetail(word?: any) {
    const modal = await this.modalController.create({
      component: WordPage,
      cssClass: 'modal-class',
      backdropDismiss: true,
      componentProps: {
        param: word
          ? { word: word, isNew: false }
          : { word: null, isNew: true },
      },
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data !== '' && dataReturned.role !== 'backdrop') {
          console.log('dataReturned.data', dataReturned.data);
          if (dataReturned.data.isNew) {
            // Add
            this.learningService.create(dataReturned.data.word).then(
              (res) => {
                console.log(res);
              },
              (err) => {
                console.log(err);
              }
            );
          } else {
            //update
            this.learningService.update(word.key, dataReturned.data.word);
            console.log('update', word.key);
          }
        }
      }
    });

    return await modal.present();
  }

  async testing(val: any) {
    const modal = await this.modalController.create({
      component: TestingPage,
      backdropDismiss: true,
      componentProps: {
        param: { arr: [...val], title: 'Testing language' },
      },
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data !== '' && dataReturned.role !== 'backdrop') {
          console.log('dataReturned.data', dataReturned.data);
        }
      }
    });

    return await modal.present();
  }
}
