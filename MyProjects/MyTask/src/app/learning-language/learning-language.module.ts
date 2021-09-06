import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LearningLanguagePageRoutingModule } from './learning-language-routing.module';

import { LearningLanguagePage } from './learning-language.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LearningLanguagePageRoutingModule,
    TranslateModule
  ],
  declarations: [LearningLanguagePage]
})
export class LearningLanguagePageModule {}
