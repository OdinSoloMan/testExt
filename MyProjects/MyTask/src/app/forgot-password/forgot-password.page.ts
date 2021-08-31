import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { ValidationService } from '../service/validation.service';

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
  ) { 
    let self = this;
    self.forgotPswForm = formBuilder.group({
      email: ['', [ValidationService.emailValidator]]
    });
  }

  ngOnInit() {
  }

  PasswordRecover(val : any){
    console.log(val.value);
    this.authService.PasswordRecover(val.value)
  }
}
