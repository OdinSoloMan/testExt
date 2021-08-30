import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlackListPageRoutingModule } from './black-list-routing.module';

import { BlackListPage } from './black-list.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlackListPageRoutingModule,
    TranslateModule,
  ],
  declarations: [BlackListPage]
})
export class BlackListPageModule {}
