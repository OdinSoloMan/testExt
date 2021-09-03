import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap } from 'rxjs/operators';
import { Board } from '../shared/board';
import { Task } from '../shared/task';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  /* 
    Creates a new board for the current user
  */
  async createBoard(data: Board) {
    const user = await this.afAuth.currentUser;

    return this.db.collection('boards').add({
      ...data,
      uid: user.uid,
      tasks: [{ description: 'Hello!', label: 'yellow' }],
    });
  }

  /* 
    Get all boards owned by current user
  */

  getUserBoards() {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<Board>('boards', (ref) =>
              ref.where('uid', '==', user.uid).orderBy('priority')
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
    );
  }

  /* 
    Delete board
  */

  deleteBoard(boardId: string) {
    return this.db.collection('boards').doc(boardId).delete();
  }

  /*
    Updates the tasks on board
  */

  updateTasks(boardId: string, tasks: Task[]) {
    return this.db.collection('boards').doc(boardId).update({ tasks });
  }
}
