import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selected = '';

  constructor(
    private translate: TranslateService,
  ) { }

  setInitialAppLanguage(val: any) {
    if (val == "ru") {
      this.translate.setDefaultLang("ru")
      this.selected = "ru";
      this.setLanguage("ru");
    }
    else {
      this.translate.setDefaultLang("en")
      this.selected = "en";
      this.setLanguage("en");
    }
  }
  
  setLanguage(lng: any) {
    console.log(lng)
    this.translate.use(lng);
    this.selected = lng;
  }
}
