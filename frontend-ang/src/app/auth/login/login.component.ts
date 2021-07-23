import { TranslateService } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { MenuComponent } from './../../menu/menu.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { timeout } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isRegistration: boolean = false;
  nextClicked = false;

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]),
  })

  constructor(
    private api: ApiService,
    private menu: MenuComponent,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    if (localStorage.getItem("id_users") && localStorage.getItem("refreshToken") && localStorage.getItem("accessToken")) {
      this.router.navigateByUrl("/score");
    } else {
      localStorage.clear();
    }
  }

  async onSubmit() {
    if (this.nextClicked) {
      this.login();
    } else {
      this.registration();
    }
  }

  login() {
    this.api.login(this.form.value)
      .pipe(timeout(60000))
      .subscribe(
        async (responce) => {
          console.log(responce);
          if (responce != null) {
            var result = JSON.parse(JSON.stringify(responce))
            localStorage.setItem("id_users", result.id_users)
            localStorage.setItem("accessToken", result.accessToken)
            localStorage.setItem("refreshToken", result.refreshToken)
            this.menu.refreshMenu();
            this.router.navigateByUrl("/score");
            this.toastr.info(this.translate.instant("toastr.msg.auth-true"), this.translate.instant("toastr.title.info"), {
              timeOut: 1000,
              closeButton: true
            });
          }
        },
        async (error) => {
          console.log(error);
          this.toastr.error(this.translate.instant("toastr.msg.auth-false"), this.translate.instant("toastr.title.error"), {
            timeOut: 1000,
            closeButton: true
          });
        },
        async () => {
          console.log("full");
        }
      )
  }

  registration() {
    this.api.registration(this.form.value)
      .pipe(timeout(60000))
      .subscribe(
        async (responce) => {
          console.log(responce);
          if (responce != null) {
            this.switchForm();
            this.toastr.info(this.translate.instant("toastr.msg.registr-true"), this.translate.instant("toastr.title.info"), {
              timeOut: 1000,
              closeButton: true
            });
          }
        },
        async (error) => {
          console.log(error);
          //alert(error.error.message);
          this.toastr.error(error.error.message, this.translate.instant("toastr.title.error"), {
            timeOut: 1000,
            closeButton: true
          });
        },
        async () => {
          console.log("full");
        }
      )
  }

  public onLoginClick(): void {
    this.nextClicked = true;
  }

  public onRegistrationClick(): void {
    this.nextClicked = false;
  }

  switchForm() {
    this.isRegistration = !this.isRegistration;
  }
}
