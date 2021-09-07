import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestingPageRoutingModule } from './testing-routing.module';

import { TestingPage } from './testing.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestingPageRoutingModule,
    TranslateModule,
  ],
  declarations: [TestingPage]
})
export class TestingPageModule {}
