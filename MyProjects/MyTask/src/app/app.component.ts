import { Component } from '@angular/core';
import {
  home,
  personCircleOutline,
  buildOutline,
  listCircleOutline,
  carSportOutline,
} from 'ionicons/icons';
import { LanguageService } from './service/language.service';

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
  ];

  constructor(private lngService: LanguageService) {}

  ngOnInit() {
    this.lngService.setInitialAppLanguage('en');
  }
}
