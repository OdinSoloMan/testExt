import { Component } from '@angular/core';
import { home, trashBin } from 'ionicons/icons';

interface Page {
  path: string,
  title: string,
  icon: string,
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  pages: Page[] = [
    { path: '/home', title: 'Home', icon: home },
    { path: '/black-list', title: 'Black list', icon: trashBin },
  ]
  constructor() { }
}
