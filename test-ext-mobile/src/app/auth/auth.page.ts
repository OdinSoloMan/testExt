import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isRegistration: boolean = false;
  nextClicked: boolean = false;

  constructor(
    private api: ApiService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private translate: TranslateService,
  ) { }

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]),
  })

  ngOnInit() {
  }

  async onSubmit() {
    if (this.nextClicked) {
      this.login();
    } else {
      this.registration();
    }

  }

  async login() {
    console.log("login")
    const loading = await this.loadingCtrl.create({ message: this.translate.instant("text.load") })
    await loading.present();

    this.api.login(this.form.value)
      .pipe(timeout(60000))
      .subscribe(
        async (response) => {
          if (response != null) {
            var result = JSON.parse(JSON.stringify(response))
            localStorage.setItem("id_users", result.id_users)
            localStorage.setItem("accessToken", result.accessToken)
            localStorage.setItem("refreshToken", result.refreshToken)
            loading.dismiss();
            this.router.navigateByUrl('/home')
          }
        },
        async (error) => {
          console.log(error)
          const alert = await this.alertCtrl.create({ message: this.translate.instant("text.load-error"), buttons: ['OK'] });
          await alert.present();
          loading.dismiss();
        }
      )
  }

  async registration() {
    console.log("registration")
    const loading = await this.loadingCtrl.create({ message: this.translate.instant("text.load") })
    await loading.present();

    this.api.registration(this.form.value)
      .pipe(timeout(60000))
      .subscribe(
        async (response) => {
          if (response != null) {
            console.log(response)
            loading.dismiss();
            this.switchForm();
            //this.router.navigateByUrl('/home')
          }
        },
        async (error) => {
          console.log(error)
          const alert = await this.alertCtrl.create({ message: error.error.message, buttons: ['OK'] });
          await alert.present();
          loading.dismiss();
        }
      )
  }

  onLoginClick(): void {
    this.nextClicked = true;
  }

  onRegistrationClick(): void {
    this.nextClicked = false;
  }

  switchForm() {
    console.log("switchForm")
    this.isRegistration = !this.isRegistration;
  }
}
