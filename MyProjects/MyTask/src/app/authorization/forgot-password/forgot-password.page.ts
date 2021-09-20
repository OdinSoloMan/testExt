import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { pipe } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { AuthenticationService } from '../../service/authentication.service';
import { ValidationService } from '../../service/validation.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  forgotPswForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    public formBuilder: FormBuilder,
    private toastController: ToastController,
    private translate: TranslateService,
  ) {
    let self = this;
    self.forgotPswForm = formBuilder.group({
      email: ['', [ValidationService.emailValidator]],
    });
  }

  ngOnInit() {}

  async PasswordRecover(val: any) {
    console.log(val.value);
    this.authService
      .PasswordRecoverMessageEmail({ Email: val.value })
      .pipe(timeout(60000))
      .subscribe(
        async (res) => {
          console.log(res);
          const toast = await this.toastController.create({
            message: this.translate.instant('txt.psw-reset-true'),
            duration: 2000,
          });
          toast.present();
        },
        async (err) => {
          console.log(err);
          const toast = await this.toastController.create({
            message: this.translate.instant('txt.error'),
            duration: 2000,
          });
          toast.present();
        }
      );
    
  }
}
