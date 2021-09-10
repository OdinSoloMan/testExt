import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import TaskManager from '../shared/task-manager';
import {forkJoin} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {
  private dpPath = localStorage.getItem('user');
  user = this.afAuth.currentUser;
  userThread = JSON.parse(this.dpPath);

  listTaskRef: AngularFireList<TaskManager>;

  constructor(
    public db: AngularFireDatabase,
    private afAuth: AngularFireAuth, 
  ) { 
    this.listTaskRef = db.list(this.userThread.uid+'/task');
  }

  getAll(): AngularFireList<TaskManager> {
    return this.db.list(this.userThread.uid+'/task');
  }

  create(task: TaskManager, keyDay: string) {
    return this.db.list(this.userThread.uid + '/task/' + keyDay).push(task);
  }
}
