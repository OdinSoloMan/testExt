import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
  }

  PasswordRecover(val : any){
    console.log(val.value);
    this.authService.PasswordRecover(val.value)
  }
}
