import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface Message {
  val1: string;
  val2: string;
  val3: string;
  val4: string;
}

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private message$: Subject<Message>;
  private hubConnection: HubConnection;

  constructor() {  }

  singlaRConnect() {
    let accessToken = localStorage.getItem('accessToken');

    this.message$ = new Subject<Message>();
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.hubUrl, { accessTokenFactory: () => accessToken })
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('connection started');
      })
      .catch((err) => console.log(err));

    this.hubConnection.onclose(() => {
      //debugger;
      /**
       * Time to restart the server 15 seconds
       */

      setTimeout(() => {
        //debugger;
        console.log(
          'To understand why the connection is being restored, I spent 2 hours'
        );
        /*
        if (!this.isLogout)
          this.hubConnection
            .start()
            .then(() => {
              //debugger;
              console.log('connection started');
            })
            .catch((err) => console.log(err));
            else
              this.isLogout = !this.isLogout;*/
      }, 30000);
    });

    /**
     * Specific message handler
     */
    this.hubConnection.on('clientMethodName', (data) => {
      //debugger;
      console.log('clientMethodName', data);
      this.message$.next(data);
    });

    this.hubConnection.on('WelcomeMethodName', (data) => {
      //debugger;
      console.log('WelcomeMethodName', data);
      this.message$.next(data);
      this.hubConnection
        .invoke('GetDataFromClient', 'user id', data)
        .catch((err) => console.log(err));
    });

    /**
     * Spam handler
     */
    this.hubConnection.on('SendMessage', (message) => {
      console.log('SendMessage', message);
      this.message$.next(message);
    });
  }

  public getMessage(): Observable<Message> {
    return this.message$;
  }

  public stopConnection() {
    this.hubConnection.stop();
  }
}
