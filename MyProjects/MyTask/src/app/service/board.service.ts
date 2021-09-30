import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Board } from '../shared/board';
import { Task } from '../shared/task';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  readonly Url: string = 'https://localhost:5001';

  constructor(
    // private afAuth: AngularFireAuth,
    // private db: AngularFirestore,
    private http: HttpClient
  ) {}

  headers() {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    });
  }

  /* 
    Creates a new board for the current user
  */
  // async createBoard(data: Board) {
  //   const user = await this.afAuth.currentUser;

  //   return this.db.collection('boards').add({
  //     ...data,
  //     uid: user.uid,
  //     tasks: [{ description: 'Hello!', label: 'yellow' }],
  //   });
  // }

  /* 
    Get all boards owned by current user
  */

  getUserBoards(): Observable<any> {
    return this.http.get<any>(
      this.Url + '/board/readuser/' + localStorage.getItem('id_users')
    );
    // return this.afAuth.authState.pipe(
    //   switchMap((user) => {
    //     if (user) {
    //       return this.db
    //         .collection<Board>('boards', (ref) =>
    //           ref.where('uid', '==', user.uid).orderBy('priority')
    //         )
    //         .valueChanges({ idField: 'id' });
    //     } else {
    //       return [];
    //     }
    //   })
    // );
  }

  /* 
    Delete board
  */

  // deleteBoard(boardId: string) {
  //   return this.db.collection('boards').doc(boardId).delete();
  // }

  /*
    Updates the tasks on board
  */

  // updateTasks(boardId: string, tasks: Task[]) {
  //   return this.db.collection('boards').doc(boardId).update({ tasks });
  // }
}
