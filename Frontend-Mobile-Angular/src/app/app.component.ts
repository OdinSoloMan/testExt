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
  isLogin: boolean = false

  constructor(
    private api: ApiService,
    private languageService: LanguageService,
  ) { }

  ngOnInit() {
    this.languageService.setInitialAppLanguage("en");
    this.refresh();
    this.checkLoging();
  }

  checkLoging() {
    if (localStorage.getItem("id_users") && localStorage.getItem("refreshToken") && localStorage.getItem("accessToken")) {
      this.isLogin = true;
      console.log("if", this.isLogin)
    } else {
      this.isLogin = false;
      console.log("else", this.isLogin)
    }
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

  logout() {
    if (localStorage.getItem("id_users") && localStorage.getItem("refreshToken") && localStorage.getItem("accessToken")) {
      this.api.logout(localStorage.getItem("id_users"))
        .pipe(timeout(60000))
        .subscribe(
          async (responce) => {
            console.log("responce", responce);
          },
          async (error) => {
            console.log(error);
          },
          async () => {
            console.log("full");
            localStorage.clear();
            this.ngOnInit();
            // this.router.navigateByUrl("login")
            // this.toastr.info(this.translate.instant("toastr.msg.logout"), this.translate.instant("toastr.title.info"), {
            //   timeOut: 1000,
            //   closeButton: true
            // });
          }
        )
      console.log("logout()")
    }
  }
}