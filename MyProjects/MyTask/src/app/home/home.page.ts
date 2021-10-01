import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { BoardPage } from '../modal/board/board.page';
import { ConfirmPage } from '../modal/confirm/confirm.page';
import { TaskPage } from '../modal/task/task.page';
import { BoardService } from '../service/board.service';
import { Task } from '../shared/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  boards: any[];
  sub: Subscription;
  dataReturned: any;
  fileContent: any;
  totalString: string;

  constructor(
    private boardService: BoardService,
    private translate: TranslateService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.boardService
      .getUserBoards()
      .pipe(timeout(60000))
      .subscribe(
        async (res: any) => {
          console.log(res);
          this.boards = res;
        },
        async (err: any) => {
          console.log(err);
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
          this.boardService
            .createBoard({
              Name: dataReturned.data,
              UserId: localStorage.getItem('id_users'),
            })
            .pipe(timeout(60000))
            .subscribe(
              (res) => {
                console.log(res);
                this.addBoard(res);
              },
              (err) => {
                console.log(err);
              }
            );
      }
    });

    return await modal.present();
  }

  async workWithTask(board: any, task?: Task, idx?: string) {
    const newTask = { BoardId: board.Id };
    const modal = await this.modalController.create({
      component: TaskPage,
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
            this.boardService
              .addTaskToBoard(dataReturned.data.task)
              .pipe(timeout(60000))
              .subscribe(
                (res) => {
                  console.log(res);
                  this.addTask(res);
                },
                (err) => {
                  console.log(err);
                }
              );
          } else {
            // update
            console.log('update');
            dataReturned.data.task['Id'] = dataReturned.data.idx;
            this.boardService
              .updateTaskToBoard(dataReturned.data.idx, dataReturned.data.task)
              .pipe(timeout(60000))
              .subscribe(
                (res) => {
                  console.log(res);
                  this.updateTask(res);
                },
                (err) => {
                  console.log(err);
                }
              );
          }
      }
    });

    return await modal.present();
  }

  async workDelete(numberWorking: any, board: any, val: any, i?: any) {
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
                )} " ${val} " ?`,
              }
            : {
                title: this.translate.instant('txt.delete-task'),
                message: `${this.translate.instant('txt.remove-the-task')} " ${
                  board.Name
                } " ${this.translate.instant('txt.from-the-board')}  " ${
                  val.Name
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
                console.log(board);
                this.boardService
                  .deleteBoard(board)
                  .pipe(timeout(60000))
                  .subscribe(
                    (res) => {
                      console.log(res);
                      let ls = JSON.parse(JSON.stringify(res));
                      let aa = this.deleteBoard(ls.delete_board);
                    },
                    (err) => {
                      console.log(err);
                    }
                  );
                break;
              }
              case 2: {
                console.log('delete task');
                console.log('i', board.Id, val.Id);
                //this.boardService.updateTasks(val.id, newTasks);
                this.boardService
                  .deleteTaskToBoard(val.Id)
                  .pipe(timeout(60000))
                  .subscribe(
                    (res) => {
                      console.log(res);
                      let ls = JSON.parse(JSON.stringify(res));
                      let aa = this.deleteTaskBoard(board.Id, ls.delete_mytask);
                    },
                    (err) => {
                      console.log(err);
                    }
                  );
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
      console.log('Null');
      return;
    }

    let file = input.files[0];
    console.log(file);
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function (x) {
      self.fileContent = fileReader.result;
      self.txtCheck();
    };
    fileReader.readAsText(file);
  }

  linkFile: any;

  txtCheck() {
    let self = this;
    var resConvert = window.btoa(
      unescape(encodeURIComponent(self.fileContent))
    );
    //console.log(resConvert);

    self.linkFile = resConvert;

    console.log('------');
    var resDeconvert = decodeURIComponent(escape(window.atob(resConvert)));
    //console.log(resDeconvert);
  }

  handleFileInput(event) {
    console.log(event);
    console.log(event.target.files[0]);
  }

  onDowloadFile() {
    const linkSource = `data:application/zip;base64,${this.linkFile}`;
    const downloadLink = document.createElement('a');
    const fileName = 'vct_illustration.zip';

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  addBoard(newBoard: any) {
    this.boards.push({
      Id: newBoard.id,
      Name: newBoard.name,
      UserId: newBoard.userId,
      MyTasks: [],
    });
    console.log('push', this.boards);
  }

  deleteBoard(idDeleteBoardL: any) {
    var index = this.boards
      .map((item: { Id: any }) => item.Id)
      .indexOf(idDeleteBoardL);
    console.log(index);
    this.boards.splice(index, 1);
  }

  addTask(newTask: any) {
    var index = this.boards
      .map((item: { Id: any }) => item.Id)
      .indexOf(newTask.boardId);
    console.log(index);
    this.boards[index].MyTasks.push({
      Id: newTask?.id,
      Name: newTask?.name,
      Description: newTask?.description,
      File: newTask?.file,
      DateTime: newTask?.dateTime,
      BoardId: newTask?.boardId,
    });
  }

  updateTask(task: any) {
    var index = this.boards.findIndex(
      (obj: { Id: string }) => obj.Id === task.boardId
    );
    console.log(index);
    var index1 = this.boards[index].MyTasks.findIndex(
      (obj: { Id: string }) => obj.Id === task.id
    );
    console.log(index1);
    this.boards[index].MyTasks[index1] = {
      Id: task?.id,
      Name: task?.name,
      Description: task?.description,
      File: task?.file,
      DateTime: task?.dateTime,
      BoardId: task?.boardId,
    };
  }

  deleteTaskBoard(boardId: any, taskId: any) {
    var index = this.boards
      .map((item: { Id: any }) => item.Id)
      .indexOf(boardId);
    console.log(index);
    var index1 = this.boards[index].MyTasks.findIndex(
      (obj: { Id: string }) => obj.Id === taskId
    );
    console.log(index1);
    this.boards[index].MyTasks.splice(index1, 1);
  }
}
