import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferDataPageRoutingModule } from './transfer-data-routing.module';

import { TransferDataPage } from './transfer-data.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferDataPageRoutingModule,
    TranslateModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [TransferDataPage]
})
export class TransferDataPageModule {}
