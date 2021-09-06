import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WordPage } from './word.page';

const routes: Routes = [
  {
    path: '',
    component: WordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WordPageRoutingModule {}
