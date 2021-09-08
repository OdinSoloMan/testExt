import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlackListPageRoutingModule } from './black-list-routing.module';

import { BlackListPage } from './black-list.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlackListPageRoutingModule,
    TranslateModule,
    TranslateModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  declarations: [BlackListPage]
})
export class BlackListPageModule {}
