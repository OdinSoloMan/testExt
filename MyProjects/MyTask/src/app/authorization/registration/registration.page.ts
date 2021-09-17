import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    public formBuilder: FormBuilder
  ) {
    let self = this;
    self.forgotRegistrForm = formBuilder.group({
      email: ['', [ValidationService.emailValidator]],
      psw: ['', [Validators.minLength(3), Validators.maxLength(10)]],
    });
  }

  ngOnInit() {}

  signUp(email: any, password: any) {
    // this.authService
    //   .RegisterUser(email.value, password.value)
    //   .then((res) => {
    //     this.authService.SendVerificationMail();
    //     this.router.navigate(['verify-email']);
    //   })
    //   .catch((error) => {
    //     window.alert(error.message);
    //   });
  }
}
