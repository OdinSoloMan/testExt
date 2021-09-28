import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { tap, timeout } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { SignalRService } from 'src/app/service/signal-r.service';
import { AuthenticationService } from '../../service/authentication.service';
import { ValidationService } from '../../service/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  forgotAuthForm: FormGroup;
  isUserAuth: boolean = false;

  constructor(
    public authService: AuthenticationService,
    private translate: TranslateService,
    private navCtrl: NavController,
    public formBuilder: FormBuilder,
    private router: Router,
    private signalrService: SignalRService,
    private appComponent : AppComponent,
  ) {
    let self = this;
    self.forgotAuthForm = formBuilder.group({
      email: ['', [ValidationService.emailValidator]],
      psw: ['', [Validators.minLength(6), Validators.maxLength(100)]],
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    if (localStorage.getItem('accessToken')) {
      this.isUserAuth = true;
    } else {
      this.isUserAuth = false;
    }
  }

  logIn(email: any, password: any) {
    let self = this;
    self.authService
      .SignIn(email.value, password.value)
      .pipe(
        timeout(60000),
        tap((result) => console.log('result-->', result))
      )
      .subscribe(
        (res) => {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("id_users", res.id_users);
          localStorage.setItem("refreshToken", res.refreshToken);
          console.log(res);
          self.isUserAuth = !self.isUserAuth;
          self.router.navigateByUrl("home");

          this.appComponent.singnalRConnect();
        },
        (err) => console.log(err)
      );
    // this.authService
    //   .SignIn(email.value, password.value)
    //   .then((res) => {
    //     if (this.authService.isEmailVerified) {
    //       this.openRoute('home');
    //     } else {
    //       window.alert(this.translate.instant('alert.email-is-not-verified'));
    //       return false;
    //     }
    //   })
    //   .catch((error) => {
    //     window.alert(error.message);
    //   });
  }

  resetPassword() {
    this.openRoute('forgot-password');
  }

  singUp() {
    this.openRoute('registration');
  }

  openRoute(route: any) {
    this.navCtrl.navigateRoot(route);
  }

  logOut() {
    console.log("ggggggg")
    let self = this;
    self.isUserAuth = !self.isUserAuth;
    self.appComponent.singnalRDisconnect();
    localStorage.clear();

  }
}
