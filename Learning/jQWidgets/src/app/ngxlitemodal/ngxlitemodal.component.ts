import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ngxlitemodal',
  templateUrl: './ngxlitemodal.component.html',
  styleUrls: ['./ngxlitemodal.component.scss']
})
export class NgxlitemodalComponent implements OnInit {
  showStandard: boolean = false;
  showLongContent: boolean = false;
  showTemplate: boolean = false;
  showForm: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  
  modalForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]),
  })

  submit(){

  }
}
