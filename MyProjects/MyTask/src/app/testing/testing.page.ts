import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.page.html',
  styleUrls: ['./testing.page.scss'],
})
export class TestingPage implements OnInit {
  param: any;
  title: string = this.translateService.instant('txt.error');
  index: number = 1;
  isHiddenAnswer: boolean = true;

  constructor(
    private modalController: ModalController,
    public router: Router,
    // private navParams: NavParams,
    private translateService: TranslateService
  ) {
    if (router.getCurrentNavigation().extras.state) {
      const state = (this.router.getCurrentNavigation().extras.state);
      console.log(state)
      this.mixArr(state.arr);
      this.title = state.title;
    }
  }

  ngOnInit() {
    // console.log(this.navParams.data);
    // this.title = this.navParams.data.param.title;
    // this.mixArr(this.navParams.data.param.arr);
  }

  mixArr(val: any) {
    console.log(val);
    let i = [...val];
    this.shuffle(i);
    this.param = i;
    console.log(this.param);
  }

  async onClose() {
    this.router.navigateByUrl('/learning-language')
  }

  shuffle(array: any) {
    var currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  onDecrement() {
    if (this.index > this.param.length || this.index > 1) this.index--;
    this.isHiddenAnswer ? '' : this.onOpenAnswer();
    console.log(this.index);
  }

  onIncrement() {
    if (this.index < this.param.length || this.index < 1) this.index++;
    this.isHiddenAnswer ? '' : this.onOpenAnswer();
    console.log(this.index);
  }

  onOpenAnswer() {
    this.isHiddenAnswer = !this.isHiddenAnswer;
  }
}
