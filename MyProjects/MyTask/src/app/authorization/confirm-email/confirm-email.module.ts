import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmEmailPageRoutingModule } from './confirm-email-routing.module';

import { ConfirmEmailPage } from './confirm-email.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmEmailPageRoutingModule,
    TranslateModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [ConfirmEmailPage]
})
export class ConfirmEmailPageModule {}
