import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SwitchPasswordPage } from './switch-password.page';

const routes: Routes = [
  {
    path: '',
    component: SwitchPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwitchPasswordPageRoutingModule {}
