import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestHubPage } from './test-hub.page';

const routes: Routes = [
  {
    path: '',
    component: TestHubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestHubPageRoutingModule {}
