import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { tap, timeout } from 'rxjs/operators';
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
    public formBuilder: FormBuilder
  ) {
    let self = this;
    self.forgotAuthForm = formBuilder.group({
      email: ['', [ValidationService.emailValidator]],
      psw: ['', [Validators.minLength(6), Validators.maxLength(100)]],
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    if (localStorage.getItem('user')) {
      this.isUserAuth = true;
    } else {
      this.isUserAuth = false;
    }
  }

  logIn(email: any, password: any) {
    this.authService
      .SignIn(email.value, password.value)
      .pipe(
        timeout(60000),
        tap((result) => console.log('result-->', result))
      )
      .subscribe(
        (res) => console.log(res),
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
    this.isUserAuth = !this.isUserAuth;
    localStorage.clear();
  }
}
