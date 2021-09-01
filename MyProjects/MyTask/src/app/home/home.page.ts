import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Board, BoardService, Task } from '../service/board.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  boards: Board[];
  sub: Subscription;

  constructor(
    private boardService: BoardService,
    private alertCtrl: AlertController,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.sub = this.boardService
      .getUserBoards()
      .subscribe((boards) => (this.boards = boards));
  }

  addBoards(val: any) {
    this.boardService.createBoard({
      title: val,
      priority: this.boards.length,
    });
  }

  async openAlertForAddBoards() {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant('txt.add-new-board'),
      inputs: [
        {
          name: 'title',
          placeholder: this.translate.instant('txt.ent-new-board-plc'),
        },
      ],
      buttons: [
        {
          text: this.translate.instant('btn.cancel'),
          role: 'cancel',
          handler: (data) => {
            console.log('Cancel clicked');
          },
        },
        {
          text: this.translate.instant('btn.add'),
          handler: (data) => {
            this.addBoards(data.title);
          },
        },
      ],
    });
    await alert.present();
  }

  async openAlertForAddTask(task?: any, idx?: string) {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant('txt.add-new-task'),
      inputs: [
        {
          name: 'description',
          placeholder: this.translate.instant('txt.ent-new-task-descr'),
        },
        {
          name: 'label',
          placeholder: this.translate.instant('txt.ent-new-task-label'),
        },
      ],
      buttons: [
        {
          text: this.translate.instant('btn.cancel'),
          role: 'cancel',
          handler: (data) => {
            console.log('Cancel clicked');
          },
        },
        {
          text: this.translate.instant('btn.add'),
          handler: (data) => {
            this.addTaskToBorder(task, idx, {
              description: data.description,
              label: data.label,
            });
          },
        },
      ],
    });
    await alert.present();
  }

  addTaskToBorder(task?: any, idx?: string, newTask?: Task) {
    console.log(task);
    this.boardService.updateTasks(idx, [...task, newTask]);
  }

  async openAlertForUpdateTask(task?: any, idx?: any, _id?: any) {
    let alert = await this.alertCtrl.create({
      header: 'Add new task for board',
      inputs: [
        {
          name: 'description',
          placeholder: 'Enter description task',
        },
        {
          name: 'label',
          placeholder: 'Enter label task',
        },
      ],
      buttons: [
        {
          text: this.translate.instant('btn.cancel'),
          role: 'cancel',
          handler: (data) => {
            console.log('Cancel clicked');
          },
        },
        {
          text: this.translate.instant('btn.update'),
          handler: (data) => {
            this.updateTask(task, idx, _id, {
              description: data.description,
              label: data.label,
            });
          },
        },
      ],
    });
    await alert.present();
  }

  updateTask(task?: any, idx?: any, _id?: any, _val?: any) {
    var index = this.boards.map((item) => item.id).indexOf(_id);
    var board = this.boards[index];
    board.tasks[idx] = _val;
    this.boardService.updateTasks(board.id, board.tasks);
  }

  deleteBord(val: any) {
    this.boardService.deleteBoard(val);
  }
}
