import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { LearningService } from '../service/learning.service';

@Component({
  selector: 'app-black-list',
  templateUrl: './black-list.page.html',
  styleUrls: ['./black-list.page.scss'],
})
export class BlackListPage implements OnInit {
  forgotParsForm: FormGroup;
  s: string;
  obj: any;

  constructor(
    private file: File,
    public formBuilder: FormBuilder,
    private learningService: LearningService,
  ) {
    let self = this;
    self.forgotParsForm = formBuilder.group({
      // specialChart: ['', [Validators.minLength(1), Validators.maxLength(10)]],
      chartSymbol: ['', [Validators.minLength(1), Validators.maxLength(10)]],
    });
  }

  ngOnInit() {}

  test(chartSymbol: any, specialChart?: any) {
    var inputValue = (<HTMLInputElement>document.getElementById('file')).value;
    this.s = inputValue;
    console.log(this.s);
    this.parseString(inputValue, chartSymbol);
  }

  parseString(val: any, chartSym: any) {
    var stringArray = val.split('\n');
    console.log('stringArray', stringArray);
    var arrayJ = [];
    for (let i = 0; i < stringArray.length; i++) {
      let objArr = stringArray[i].split(chartSym.value);
      arrayJ[i] = { title: objArr[0], translation: objArr[1] };
    }
    console.log('arrayJ', arrayJ);
    this.obj = arrayJ;
    let z = JSON.stringify(arrayJ, null, ' ');
    console.log(z);
    (<HTMLInputElement>document.getElementById('test')).value = z;
  }

  onAddObj() {
    var user = JSON.parse(localStorage.getItem('user'));
    let i = this.obj.map((u: { title: any; translation: any }) => ({
      title: u.title,
      translation: u.translation,
      uid: user.uid,
    }));
    console.log('iiii', i);
    for (let j = 0; j < i.length; j++)
      this.learningService.createObj(i[j]).then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
