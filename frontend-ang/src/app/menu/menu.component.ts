import { Router } from '@angular/router';
import { timeout } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/api.service';
import { Component, OnInit } from '@angular/core';

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
            localStorage.clear();
            this.ngOnInit()
            this.router.navigateByUrl("login")
          },
          async (error) => {
            console.log(error);
          },
          async () => {
            console.log("full");
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
