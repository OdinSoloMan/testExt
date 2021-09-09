import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferDataPage } from './transfer-data.page';

const routes: Routes = [
  {
    path: '',
    component: TransferDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferDataPageRoutingModule {}
