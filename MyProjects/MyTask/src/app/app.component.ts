import { Component } from '@angular/core';
import {
  home,
  trashBin,
  personCircleOutline,
  buildOutline,
  languageOutline,
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
    { path: '/black-list', title: 'title.black-list', icon: trashBin },
    { path: '/login', title: 'title.auth', icon: personCircleOutline },
    { path: '/test', title: 'title.test', icon: buildOutline },
    {
      path: '/learning-language',
      title: 'title.learning-language',
      icon: languageOutline,
    },
  ];

  constructor(private lngService: LanguageService) {}

  ngOnInit() {
    this.lngService.setInitialAppLanguage('en');
  }
}
