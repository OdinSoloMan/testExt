import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearningLanguagePage } from './learning-language.page';

const routes: Routes = [
  {
    path: '',
    component: LearningLanguagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearningLanguagePageRoutingModule {}
