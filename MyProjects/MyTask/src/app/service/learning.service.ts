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
    this.learningLanguageRef = db.list(this.userThread.uid + '/data');
  }

  getAll(keyList: any): AngularFireList<LearningLanguage> {
    return this.db.list(this.userThread.uid + '/data/' + keyList);
  }

  create(learningLanguage: LearningLanguage, keyList: string): any {
    return this.db.list(this.userThread.uid + '/data/' + keyList).push(learningLanguage);
  }

  update(key: string, value: any, keyList: string): Promise<void> {
    return this.db.list(this.userThread.uid + '/data/' + keyList).update(key, value);
  }

  deleteCategory(key: string): Promise<void> {
    return this.learningLanguageRef.remove(key);
  }

  deleteWordOfCategory(key: string, keyList: string): Promise<void> {
    return this.db.list(this.userThread.uid + '/data/' + keyList).remove(key);
  }

  deleteAll(): Promise<void> {
    return this.learningLanguageRef.remove();
  }

  filter(val: any, keyList: string): AngularFireList<LearningLanguage> {
    return this.db.list(this.userThread.uid + '/data/' + keyList, (ref) =>
      ref.orderByChild('title').startAt(val).endAt(`${val}\uf8ff`)
    );
  }

  getWordInfo(val: any): AngularFireList<LearningLanguage> {
    console.log(val);
    return this.db.list(this.userThread.uid, (ref) =>
      ref.limitToFirst(1).orderByKey().startAt(val)
    );
    //return this.db.list(this.userThread.uid + `/${val}`);
  }
}
