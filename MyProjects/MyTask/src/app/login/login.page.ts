import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    private translate: TranslateService,
    private navCtrl : NavController,
  ) { }

  ngOnInit() {
  }

  logIn(email: any, password: any) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        if (this.authService.isEmailVerified) {
          this.openRoute('home')
        } else {
          window.alert(this.translate.instant('alert.email-is-not-verified'))
          return false;
        }
      }).catch((error) => {
        window.alert(error.message);
      })
  }

  resetPassword(){
    this.openRoute('forgot-password');
  }

  singUp() {
    this.openRoute('registration');
  }

  openRoute(route: any) {
		this.navCtrl.navigateRoot(route);
  }
}
