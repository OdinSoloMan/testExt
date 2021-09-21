import { Component } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';
import {
  home,
  personCircleOutline,
  buildOutline,
  listCircleOutline,
  carSportOutline,
  calendarClearOutline,
} from 'ionicons/icons';
import { Subscription } from 'rxjs';
import { LanguageService } from './service/language.service';
import { SignalRService } from './service/signal-r.service';

interface Page {
  path: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  pages: Page[] = [
    { path: '/home', title: 'title.home', icon: home },
    { path: '/test', title: 'title.test', icon: buildOutline },
    {
      path: '/list-categories',
      title: 'title.categories',
      icon: listCircleOutline,
    },
    { path: '/transfer-data', title: 'title.transfer', icon: carSportOutline },
    { path: '/login', title: 'title.auth', icon: personCircleOutline },
    // The page needs to be redesigned. Since it does not really work,
    // all the functionality works through three knees, which was
    // implemented. so I better just hide her
    // {
    //   path: '/task-manager',
    //   title: 'title.task-manager',
    //   icon: calendarClearOutline,
    // },
  ];

  private signalRSubscription: Subscription;
  totalString: string;

  constructor(
    private lngService: LanguageService,
    private signalrService: SignalRService
  ) {}

  ngOnInit() {
    this.lngService.setInitialAppLanguage('en');

    this.signalRSubscription = this.signalrService
      .getMessage()
      .subscribe((message: any) => {
        console.log('aaaa', message);
      });
  }
}
