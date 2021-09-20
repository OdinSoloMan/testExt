import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { timeout } from 'rxjs/operators';
import { AuthenticationService } from '../../service/authentication.service';
import { ValidationService } from '../../service/validation.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  forgotRegistrForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public formBuilder: FormBuilder,
    private toastController: ToastController,
    private translate: TranslateService
  ) {
    let self = this;
    self.forgotRegistrForm = formBuilder.group(
      {
        email: ['', [ValidationService.emailValidator]],
        psw: ['', [Validators.minLength(7), Validators.maxLength(100)]],
        confirmPsw: ['', Validators.required],
      },
      { validators: this.checkPasswords.bind(this) }
    );
  }

  checkPasswords(formGroup: FormGroup) {
    const { value: password } = formGroup.get('psw');
    const { value: confirmPassword } = formGroup.get('confirmPsw');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  ngOnInit() {}

  signUp(email: any, password: any) {
    const data = {
      Email: email.value,
      Password: password.value,
      PasswordConfirm: password.value,
    };
    this.authService
      .RegisterUser(data)
      .pipe(timeout(60000))
      .subscribe(
        async (res) => {
          console.log(res);
          const toast = await this.toastController.create({
            message: this.translate.instant('txt.check-you-email'),
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
