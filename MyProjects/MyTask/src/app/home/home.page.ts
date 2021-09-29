import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { BoardPage } from '../modal/board/board.page';
import { ConfirmPage } from '../modal/confirm/confirm.page';
import { TaskPage } from '../modal/task/task.page';
import { BoardService } from '../service/board.service';
import { SignalRService } from '../service/signal-r.service';
import { Board } from '../shared/board';
import { Task } from '../shared/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  boards: Board[];
  sub: Subscription;
  dataReturned: any;
  fileContent: any;

  // Message all users to timer 2 sec
  private signalRSubscription: Subscription;
  totalString: string;

  constructor(
    private signalrService: SignalRService,
    private boardService: BoardService,
    private translate: TranslateService,
    private modalController: ModalController
  ) {
    // Signal R Handler
    // this.signalRSubscription = this.signalrService.getMessage()
    // .subscribe(
    //   (message: any) => {
    //       this.totalString = `${message.val1} ${message.val2} ${message.val3} ${message.val4}`;
    //       console.log(this.totalString)
    // });
  }

  ngOnInit() {
    this.sub = this.boardService.getUserBoards().subscribe(
      async (res) => {
        this.boards = res;
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
              dataReturned.data.task,
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

  async workDelete(numberWorking: any, val: any, name: any, i?: any) {
    const modal = await this.modalController.create({
      component: ConfirmPage,
      cssClass: 'modal-class',
      backdropDismiss: true,
      componentProps: {
        confirm:
          // need to think
          numberWorking == 1
            ? {
                title: this.translate.instant('txt.delete-board'),
                message: `${this.translate.instant(
                  'txt.remove-the-board'
                )} " ${name} " ?`,
              }
            : {
                title: this.translate.instant('txt.delete-task'),
                message: `${this.translate.instant('txt.remove-the-task')} " ${
                  val.tasks[i].description
                } " ${this.translate.instant('txt.from-the-board')}  " ${
                  val.title
                } " ?`,
              },
        isWorking: false,
      },
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data !== '' && dataReturned.role !== 'backdrop') {
          if (dataReturned.data.isWorking) {
            switch (numberWorking) {
              case 1: {
                this.boardService.deleteBoard(val);
                break;
              }
              case 2: {
                console.log(val.id, val.tasks);
                let newTasks = val.tasks.filter(
                  (item) => item !== val.tasks[i]
                );
                this.boardService.updateTasks(val.id, newTasks);
                break;
              }
              default: {
                break;
              }
            }
          }
        }
      }
    });

    return await modal.present();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  
  onChange(fileList: Event): void {
    let input = fileList.target as HTMLInputElement;

    if (!input.files?.length) {
        console.log("Null")
        return;
    }

    let file = input.files[0];
    console.log(file);
    // let fileL = fileList.target.fileList;
    // console.log(fileL)
    // let file = fileL[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function (x) {
      self.fileContent = fileReader.result;
      self.txtCheck();
    };
    fileReader.readAsText(file);
  }
  
  txtCheck() {
    let self = this;
    var resConvert = window.btoa(unescape(encodeURIComponent(self.fileContent)));
    console.log(resConvert);

    console.log('------');
    var resDeconvert = decodeURIComponent(escape(window.atob(resConvert)));
    console.log(resDeconvert);
  }

  handleFileInput(event) {
    console.log(event);
    console.log(event.target.files[0]);
  }
}
