import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SwitchPasswordPageRoutingModule } from './switch-password-routing.module';

import { SwitchPasswordPage } from './switch-password.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwitchPasswordPageRoutingModule,
    TranslateModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [SwitchPasswordPage],
})
export class SwitchPasswordPageModule {}
