import { Component } from '@angular/core';
import { LanguageService } from './shared/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-ang';

  constructor(
    private languageService : LanguageService
  ){  }

  ngOnInit() {
    this.languageService.setInitialAppLanguage("en");
  }
}
