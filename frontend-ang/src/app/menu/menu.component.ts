import { Router } from '@angular/router';
import { timeout } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/api.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  countPosition = null;
  isLogin = false

  constructor(
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.checkLoging();
    console.log(".checkLoging()")
  }

  checkLoging() {
    if (localStorage.getItem("id_users") && localStorage.getItem("refreshToken") && localStorage.getItem("accessToken")) {
      this.isLogin = false;
      console.log("else", this.isLogin)
    } else {
      this.isLogin = true;
      console.log("else", this.isLogin)
    }
  }

  logout() {
    if (localStorage.getItem("id_users")) {
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
            this.ngOnInit()
            this.router.navigateByUrl("login")
            this.toastr.info(this.translate.instant("toastr.msg.logout"), this.translate.instant("toastr.title.info"), {
              timeOut: 1000,
              closeButton: true
            });
          }
        )
      console.log("logout()")
    }
  }

  refreshMenu() {
    console.log("test()")
    this.ngOnInit()
  }

  countPositionFn(val: any) {
    console.log("countPositionFn", val)
    this.countPosition = val;
    this.ngOnInit()
  }
}
