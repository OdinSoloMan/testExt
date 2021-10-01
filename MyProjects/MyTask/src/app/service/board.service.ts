import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  /**
   * Select info board user
   * @returns
   */
  getUserBoards(): Observable<any> {
    return this.http.get<any>(
      this.Url + '/board/readuser/' + localStorage.getItem('id_users'),
      { headers: this.headers() }
    );
  }

  /**
   * Delete board
   * @param boardId id board
   * @returns
   */
  deleteBoard(boardId: any) {
    return this.http.delete(this.Url + '/board/delete/' + boardId, {
      headers: this.headers(),
    });
  }

  /**
   * Create Board
   * @param val Board
   * @returns
   */
  createBoard(val: any) {
    return this.http.post(this.Url + '/board/add', val, {
      headers: this.headers(),
    });
  }

  /**
   * Add task to board
   * @param val Task
   * @returns
   */
  addTaskToBoard(val: any) {
    return this.http.post(this.Url + '/mytask/add', val, {
      headers: this.headers(),
    });
  }

  /**
   * Update task to board
   * @param id Id task
   * @param val body task
   * @returns
   */
  updateTaskToBoard(id: any, val: any) {
    return this.http.put(this.Url + '/mytask/update/' + id, val, {
      headers: this.headers(),
    });
  }

  /**
   * Delete task to board
   * @param id Id task
   * @returns 
   */
  deleteTaskToBoard(id: any) {
    return this.http.delete(this.Url + '/mytask/delete/' + id, {
      headers: this.headers(),
    });
  }
}
