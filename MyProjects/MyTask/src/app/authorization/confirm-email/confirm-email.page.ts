import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.page.html',
  styleUrls: ['./confirm-email.page.scss'],
})
export class ConfirmEmailPage implements OnInit {
  public userId: string;
  public code: string;
  private querySubscription: Subscription;
  isConfirmationEmail: boolean = false;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private auth: AuthenticationService,
    private translate: TranslateService,
    private toastController: ToastController,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        console.log(queryParam);
        this.userId = queryParam['userId'];
        this.code = queryParam['code'];
      }
    );
    this.onCorfimEmail();
  }

  async onCorfimEmail() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: this.translate.instant('txt.please-wait'),
    });
    this.auth
      .ConfirmEmail(this.userId, this.code)
      .pipe(timeout(60000))
      .subscribe(
        async (res) => {
          console.log(res);
          const toast = await this.toastController.create({
            message: this.translate.instant('txt.yu-email-is-act'),
            duration: 2000,
          });
          toast.present();
          this.isConfirmationEmail = true;
          await loading.present();
        },
        async (err) => {
          console.log(err);
          const toast = await this.toastController.create({
            message: this.translate.instant('txt.error'),
            duration: 2000,
          });
          toast.present();
          await loading.present();
        }
      );
  }

  onLoginPage() {
    this.navCtrl.navigateRoot('login');
  }
}
