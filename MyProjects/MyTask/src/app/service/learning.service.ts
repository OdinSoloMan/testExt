import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import LearningLanguage from '../shared/learningLanguage';

@Injectable({
  providedIn: 'root',
})
export class LearningService {
  private dbPath = localStorage.getItem('user');
  user = this.afAuth.currentUser;
  userThread = JSON.parse(this.dbPath);

  learningLanguageRef: AngularFireList<LearningLanguage>;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.learningLanguageRef = db.list(this.userThread.uid);
  }

  getAll(): AngularFireList<LearningLanguage> {
    return this.learningLanguageRef;
  }

  create(learningLanguage: LearningLanguage): any {
    return this.learningLanguageRef.push(learningLanguage);
  }

  createObj(learningLanguageObj: any) {
    return this.learningLanguageRef.push(learningLanguageObj);
  }

  update(key: string, value: any): Promise<void> {
    return this.learningLanguageRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.learningLanguageRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.learningLanguageRef.remove();
  }

  filter(val: any): AngularFireList<LearningLanguage> {
    return this.db.list(this.userThread.uid, (ref) =>
      ref.orderByChild('title').startAt(val).endAt(`${val}\uf8ff`)
    );
  }

  getWordInfo(val: any): AngularFireList<LearningLanguage> {
    console.log(val)
    return this.db.list(this.userThread.uid, (ref) =>
      ref.limitToFirst(1).orderByKey().startAt(val)
    );
    //return this.db.list(this.userThread.uid + `/${val}`);
  }
}
