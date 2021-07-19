import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { ApiService } from './shared/api.service';
import { LanguageService } from './shared/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-ang';
  mySub: Subscription | undefined;

  constructor(
    private languageService: LanguageService,
    private api: ApiService,
  ) {
    this.mySub = interval(60000 * 4.5).subscribe((func) => {
      this.refresh();
    })
  }

  ngOnInit() {
    this.languageService.setInitialAppLanguage("en");
    this.refresh()
  }

  refresh() {
    if (localStorage.getItem("id_users") && localStorage.getItem("refreshToken") && localStorage.getItem("accessToken")) {
      this.api.refresh({
        id_users: localStorage.getItem("id_users"),
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken"),
      })
        .pipe(timeout(60000))
        .subscribe(
          async (responce) => {
            console.log(responce);
            if (responce != null) {
              var result = JSON.parse(JSON.stringify(responce))
              localStorage.setItem("id_users", result.id_users)
              localStorage.setItem("accessToken", result.accessToken)
              localStorage.setItem("refreshToken", result.refreshToken)
            }
          },
          async (error) => {
            console.log(error.code);
            // if(error.code)
          },
          async () => {
            console.log("full");
          }
        )
    } else {
      console.log("not auth")
      localStorage.clear()
    }
  }
}
