import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestHubPageRoutingModule } from './test-hub-routing.module';

import { TestHubPage } from './test-hub.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestHubPageRoutingModule
  ],
  declarations: [TestHubPage]
})
export class TestHubPageModule {}
