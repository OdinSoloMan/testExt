import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import ListCategories from '../shared/list-categories';

@Injectable({
  providedIn: 'root',
})
export class ListCategoriesService {
  private dpPath = localStorage.getItem('user');
  user = this.afAuth.currentUser;
  userThread = JSON.parse(this.dpPath);

  listCategoriesRef: AngularFireList<ListCategories>;

  constructor(
    public db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.listCategoriesRef = db.list(this.userThread.uid+'/categories');
  }

  getAll(): AngularFireList<ListCategories> {
    return this.listCategoriesRef;
  }

  create(listСategory: ListCategories) {
    return this.listCategoriesRef.push(listСategory);
  }

  update(key: string, value: any) : Promise<void>{
    return this.listCategoriesRef.update(key, value)
  }

  delete(key: string): Promise<void> {
    return this.listCategoriesRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.listCategoriesRef.remove();
  }
}
