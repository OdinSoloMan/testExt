import { Component } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { ApiService } from './service/api.service';
import { LanguageService } from './service/language.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private api: ApiService,
    private languageService: LanguageService,
  ) { }

  ngOnInit() {
    this.languageService.setInitialAppLanguage("en");
    this.refresh();
  }

  refresh() {
    if (localStorage.getItem("id_users") && localStorage.getItem("refreshToken") && localStorage.getItem("accessToken")) {
      this.api.refresh({
        id_users: localStorage.getItem("id_users"),
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken"),
      })
      .pipe(timeout(6000))
      .subscribe(
        async (response) => {
          if (response != null) {
            var result = JSON.parse(JSON.stringify(response))
            localStorage.setItem("id_users", result.id_users)
            localStorage.setItem("accessToken", result.accessToken)
            localStorage.setItem("refreshToken", result.refreshToken)
          }
        },
        async (error) => {
          console.log(error);
        }
      )
    } else {
      console.log("Not auth")
      localStorage.clear()
    }
  }
}