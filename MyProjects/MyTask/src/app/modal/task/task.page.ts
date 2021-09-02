import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Task } from 'src/app/service/board.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  forgotTaskForm: FormGroup;
  param: any;

  actionsOnAddTask: boolean;

  constructor(
    private modalController: ModalController,
    public formBuilder: FormBuilder,
    private navParams: NavParams
  ) {
    let self = this;
    self.forgotTaskForm = formBuilder.group({
      description: ['', [Validators.minLength(3), Validators.maxLength(15)]],
      label: ['', [Validators.min(3), Validators.maxLength(10)]],
    });
  }

  ngOnInit() {
    console.log(this.navParams.data);
    this.param = this.navParams.data.paramTask;
    console.log('task', this.param.task);
    this.forgotTaskForm.get('description').setValue(this.param.task.description);
    this.forgotTaskForm.get('label').setValue(this.param.task.label);
    this.actionsOnAddTask = this.navParams.data.paramTask.isNew;
  }

  async onClose() {
    await this.modalController.dismiss('');
  }

  async test() {
    this.param.task = this.forgotTaskForm.value;
    await this.modalController.dismiss(this.param);
  }
}
