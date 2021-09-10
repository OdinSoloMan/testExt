import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, timeout } from 'rxjs/operators';
import { LearningService } from '../service/learning.service';
import { ListCategoriesService } from '../service/list-categories.service';

@Component({
  selector: 'app-transfer-data',
  templateUrl: './transfer-data.page.html',
  styleUrls: ['./transfer-data.page.scss'],
})
export class TransferDataPage implements OnInit {
  @ViewChild('anyName') theSelectObject;

  forgotParsForm: FormGroup;
  selectList: any;
  obj: any;
  keyList: string = '';

  constructor(
    public formBuilder: FormBuilder,
    private learningService: LearningService,
    private listCategoriesService: ListCategoriesService
  ) {
    let self = this;
    self.forgotParsForm = formBuilder.group({
      // specialChart: ['', [Validators.minLength(1), Validators.maxLength(10)]],
      chartSymbol: ['', [Validators.minLength(1), Validators.maxLength(10)]],
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.listCategoriesService
      .getAll()
      .snapshotChanges()
      .pipe(
        timeout(60000),
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(
        (data) => {
          this.selectList = data;
          console.log('this.selectList', this.selectList);
        },
        (err) => {}
      );
  }

  onParseInfo(chartSymbol: any, specialChart?: any) {
    var inputValue = (<HTMLInputElement>document.getElementById('file')).value;
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
    (<HTMLInputElement>document.getElementById('parseInfo')).value = JSON.stringify(arrayJ, null, ' ');
  }

  onAddObj() {
    console.log('iiii', this.obj);
    for (let j = 0; j < this.obj.length; j++)
      this.learningService.create(this.obj[j], this.keyList).then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  anyFunc() {
    const theValue = this.theSelectObject.value;
    console.log(theValue);
    this.keyList = theValue;
  }
}
