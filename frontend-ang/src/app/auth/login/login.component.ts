import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { timeout } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]),
  })

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {

  }

  async onSubmit() {
    console.log(this.form.value);
    this.api.login(this.form.value)
      .pipe(timeout(60000))
      .subscribe(
        async (responce) => {
          console.log(responce);
          if (responce != null) {
            var result = JSON.parse(JSON.stringify(responce))
            localStorage.setItem("id_users", result.id_users)
            localStorage.setItem("accessToken", result.accessToken)
            localStorage.setItem("refreshToken", result.refreshToken)
          }
        },
        async (error) => {
          console.log(error);
        },
        async () => {
          console.log("full");
        }
      )
  }
}
