import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ValidationService } from 'src/app/service/validation.service';

@Component({
  selector: 'app-switch-password',
  templateUrl: './switch-password.page.html',
  styleUrls: ['./switch-password.page.scss'],
})
export class SwitchPasswordPage implements OnInit {
  public userId: string;
  public code: string;
  private querySubscription: Subscription;
  forgotResetPswForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private authService: AuthenticationService,
    public formBuilder: FormBuilder,
    private toastController: ToastController,
    private translate: TranslateService,
  ) {
    let self = this;
    self.forgotResetPswForm = formBuilder.group(
      {
        email: ['', [ValidationService.emailValidator]],
        psw: ['', [Validators.minLength(7), Validators.maxLength(100)]],
        confirmPsw: ['', Validators.required],
      },
      { validators: this.checkPasswords.bind(this) }
    );
  }

  ngOnInit() {
    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        console.log(queryParam);
        this.userId = queryParam['userId'];
        this.code = queryParam['code'];
      }
    );
  }

  switchPassowd(email, password) {
    const data = {
      Email: email.value,
      Password: password.value,
      ConfirmPassword: password.value,
      Code: this.code,
    };
    console.log(data);
    this.authService
      .SwitchPassowd(data)
      .pipe(timeout(60000))
      .subscribe(
        (res) => {
          console.log(res);
          this.navCtrl.navigateRoot('login');
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

  checkPasswords(formGroup: FormGroup) {
    const { value: password } = formGroup.get('psw');
    const { value: confirmPassword } = formGroup.get('confirmPsw');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
}
