import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { BoardPage } from '../modal/board/board.page';
import { TaskPage } from '../modal/task/task.page';
import { Board, BoardService, Task } from '../service/board.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  boards: Board[];
  sub: Subscription;
  dataReturned: any;

  constructor(
    private boardService: BoardService,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.sub = this.boardService.getUserBoards().subscribe(
      (boards) => {
        this.boards = boards;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async workWithBoards(): Promise<void> {
    const modal = await this.modalController.create({
      component: BoardPage,
      cssClass: 'modal-class',
      backdropDismiss: true,
      componentProps: {
        paramTitleModal: this.translate.instant('txt.add-new-board'),
        titleBoard: '',
      },
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        console.log(dataReturned);
        if (dataReturned.data !== '' && dataReturned.role !== 'backdrop')
          this.boardService.createBoard({
            title: this.dataReturned,
            priority: this.boards.length,
          });
      }
    });

    return await modal.present();
  }

  async workWithTask(board: any, task?: Task, idx?: number) {
    const newTask = { label: 'purple' };
    const modal = await this.modalController.create({
      component: TaskPage,
      cssClass: 'modal-class',
      backdropDismiss: true,
      componentProps: {
        paramTask: task
          ? { task: { ...task }, isNew: false, boardId: board.id, idx }
          : { task: newTask, isNew: true },
      },
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        console.log('data', dataReturned);
        if (dataReturned.data !== '' && dataReturned.role !== 'backdrop')
          if (dataReturned.data.isNew) {
            // add
            console.log('add');
            this.boardService.updateTasks(board.id, [
              ...board.tasks,
              dataReturned.data,
            ]);
          } else {
            // update
            const update = board.tasks;
            update.splice(dataReturned.data.idx, 1, dataReturned.data.task);
            this.boardService.updateTasks(board.id, board.tasks);
          }
      }
    });

    return await modal.present();
  }

  deleteBord(val: any) {
    this.boardService.deleteBoard(val);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
