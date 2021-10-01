import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  @ViewChild('anyName') theSelectObject;

  forgotTaskForm: FormGroup;
  param: any;
  keyList: string = '';
  selectList: any = [
    { key: '.txt', listName: 'txt' },
    { key: '.zip', listName: 'zip' },
    { key: '.png', listName: 'png' },
  ];
  fileName: any;
  fileExtension: any;
  fileContent: any;
  actionsOnAddTask: boolean;

  constructor(
    private modalController: ModalController,
    public formBuilder: FormBuilder,
    private navParams: NavParams
  ) {
    let self = this;
    self.forgotTaskForm = formBuilder.group({
      Name: ['', [Validators.minLength(4), Validators.maxLength(100)]],
      Description: ['', [Validators.min(4), Validators.maxLength(1000)]],
      File: [, [Validators.min(0)]],
      DateTime: ['', [Validators.required]],
      BoardId: [
        '',
        [
          Validators.required,
          Validators.minLength(36),
          Validators.maxLength(36),
          Validators.pattern(
            '[\\da-zA-Z]{8}-([\\da-zA-Z]{4}-){3}[\\da-zA-Z]{12}'
          ),
        ],
      ],
    });
  }

  ngOnInit() {
    console.log(this.navParams.data);
    this.param = this.navParams.data.paramTask;
    console.log('task', this.param.task);
    this.forgotTaskForm.get('BoardId').setValue(this.param.task.BoardId);
    this.actionsOnAddTask = this.navParams.data.paramTask.isNew;

    if (!this.param.isNew) {
      this.forgotTaskForm.get('Name').setValue(this.param.task.Name);
      this.forgotTaskForm
        .get('Description')
        .setValue(this.param.task.Description);
      this.forgotTaskForm.get('File').setValue(this.param.task.File);
      this.forgotTaskForm.get('DateTime').setValue(this.param.task.DateTime);
    }
  }

  async onClose() {
    await this.modalController.dismiss('');
  }

  async sendingData() {
    var testText = {
      Name: this.fileName,
      Content: this.fileContent,
    };
    console.log(testText);
    // this.param.task = this.forgotTaskForm.value;
    await this.modalController.dismiss(this.param);
  }

  anyFunc() {
    const theValue = this.theSelectObject.value;
    console.log(theValue);
    this.keyList = theValue;
  }

  onChange(fileList: Event): void {
    let input = fileList.target as HTMLInputElement;

    if (!input.files?.length) {
      console.log('Null');
      return;
    }

    let file = input.files[0];
    console.log(file);
    this.fileName = file.name;
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function (x) {
      self.fileContent = fileReader.result;
      self.txtCheck();
    };
    fileReader.readAsText(file);
  }

  linkFile: any;

  txtCheck() {
    let self = this;
    var resConvert = window.btoa(
      unescape(encodeURIComponent(self.fileContent))
    );
    console.log(resConvert);

    self.linkFile = resConvert;

    console.log('------');
    var resDeconvert = decodeURIComponent(escape(window.atob(resConvert)));
    console.log(resDeconvert);
  }

  handleFileInput(event) {
    console.log(event);
    console.log(event.target.files[0]);
  }

  onDowloadFile() {
    let split = this.fileName.split('.');
    this.fileExtension = split[1];
    console.log('asdada', this.fileExtension);
    const linkSource = `data:application/${this.fileExtension};base64,${this.linkFile}`;
    console.log('linkSource', linkSource);
    const downloadLink = document.createElement('a');
    const fileName = this.fileName;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
}
