import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WordPageRoutingModule } from './word-routing.module';

import { WordPage } from './word.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WordPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  declarations: [WordPage]
})
export class WordPageModule {}
